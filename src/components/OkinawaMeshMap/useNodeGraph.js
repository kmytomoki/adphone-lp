import { useMemo } from "react";

/**
 * ノードを陸地に沿って一列に並べる。
 *
 * 以前はランダムに散らしていたが、それだと「面が塗りつぶされる」絵になる。
 * 1ホップ約1kmで市全域を面で覆うには数百台が要るので、少ない台数で面が
 * 埋まる絵は台数の実態と合わない。実際に配備できる台数で描ける正直な絵は
 * 「拠点から拠点へ中継が連なる」形なので、陸地をたどる一本の列にしている。
 *
 * 進む向きは陸地を追って少しずつ曲げる。海に出たら角度を振って陸へ戻す。
 * 戻れなければそこで打ち切るので、指定した台数より少なくなることがある。
 */
function snapToLand(nx, ny, landMask) {
  if (landMask(nx, ny)) return { nx, ny };
  for (let ring = 1; ring <= 60; ring += 1) {
    const r = ring * 0.004;
    for (let a = 0; a < 24; a += 1) {
      const t = (a / 24) * Math.PI * 2;
      const cx = nx + Math.cos(t) * r;
      const cy = ny + Math.sin(t) * r;
      if (landMask(cx, cy)) return { nx: cx, ny: cy };
    }
  }
  return null;
}

/** heading の向きに、陸地が途切れるまで何歩進めるかを数える。 */
function runLength(start, heading, stepNx, stepNy, landMask, limit) {
  let { nx, ny } = start;
  let steps = 0;
  while (steps < limit) {
    nx += Math.cos(heading) * stepNx;
    ny += Math.sin(heading) * stepNy;
    if (!landMask(nx, ny)) break;
    steps += 1;
  }
  return steps;
}

/** start から heading 方向へ、陸地をたどりながら count 個の点を置く。 */
function walk(start, heading, count, stepNx, stepNy, landMask) {
  const points = [];
  let cur = { ...start };
  let dir = heading;

  // 中心ほど素直に、外側ほど大きく曲がることを許す。
  const corrections = [0, 0.18, -0.18, 0.36, -0.36, 0.55, -0.55, 0.75, -0.75];

  for (let i = 0; i < count; i += 1) {
    let placed = null;
    for (const delta of corrections) {
      const test = dir + delta;
      const nx = cur.nx + Math.cos(test) * stepNx;
      const ny = cur.ny + Math.sin(test) * stepNy;
      if (nx < 0.02 || nx > 0.98 || ny < 0.02 || ny > 0.98) continue;
      if (!landMask(nx, ny)) continue;
      placed = { nx, ny, dir: test };
      break;
    }
    if (!placed) break;
    points.push({ nx: placed.nx, ny: placed.ny });
    cur = { nx: placed.nx, ny: placed.ny };
    // 急に折れ曲がらないよう、向きの変化は半分だけ引き継ぐ。
    dir = dir + (placed.dir - dir) * 0.5;
  }

  return points;
}

export function useNodeGraph({
  nodeCount = 14,
  edgeRadius = 18,
  width = 560,
  height = 560,
  landMask = null,
  spacingPx = 13.3,
  origin = { nx: 0.5, ny: 0.5 },
}) {
  return useMemo(() => {
    if (typeof landMask !== "function") {
      return { nodes: [], edges: [], adjacency: [] };
    }

    const start = snapToLand(origin.nx, origin.ny, landMask);
    if (!start) return { nodes: [], edges: [], adjacency: [] };

    const stepNx = spacingPx / width;
    const stepNy = spacingPx / height;

    // 陸地がいちばん長く続く向きを初期方向にする。
    let bestHeading = 0;
    let bestRun = -1;
    for (let a = 0; a < 36; a += 1) {
      const heading = (a / 36) * Math.PI * 2;
      const run = runLength(start, heading, stepNx, stepNy, landMask, nodeCount);
      if (run > bestRun) {
        bestRun = run;
        bestHeading = heading;
      }
    }

    const forwardCount = Math.ceil((nodeCount - 1) / 2);
    const backwardCount = nodeCount - 1 - forwardCount;

    const forward = walk(start, bestHeading, forwardCount, stepNx, stepNy, landMask);
    const backward = walk(start, bestHeading + Math.PI, backwardCount, stepNx, stepNy, landMask);

    const ordered = [...backward.reverse(), start, ...forward];
    const nodes = ordered.map((p, id) => ({ id, nx: p.nx, ny: p.ny }));

    const edges = [];
    const adjacency = nodes.map(() => []);
    const radiusSq = edgeRadius * edgeRadius;

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const dxPx = (nodes[i].nx - nodes[j].nx) * width;
        const dyPx = (nodes[i].ny - nodes[j].ny) * height;
        if (dxPx * dxPx + dyPx * dyPx <= radiusSq) {
          edges.push({ a: i, b: j, active: false });
          adjacency[i].push(j);
          adjacency[j].push(i);
        }
      }
    }

    return { nodes, edges, adjacency };
  }, [nodeCount, edgeRadius, width, height, landMask, spacingPx, origin.nx, origin.ny]);
}
