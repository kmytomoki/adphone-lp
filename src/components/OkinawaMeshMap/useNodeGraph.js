import { useMemo } from "react";

export function useNodeGraph({
  nodeCount = 80,
  edgeRadius = 75,
  width = 540,
  height = 800,
  landMask = null,
}) {
  return useMemo(() => {
    if (typeof landMask !== "function") {
      return { nodes: [], edges: [], adjacency: [] };
    }

    const nodes = [];
    const maxAttempts = nodeCount * 250;
    let guard = 0;
    while (nodes.length < nodeCount && guard < maxAttempts) {
      guard += 1;
      const nx = Math.random();
      const ny = Math.random();
      if (!landMask(nx, ny)) continue;
      nodes.push({ id: nodes.length, nx, ny });
    }

    const edges = [];
    const adjacency = nodes.map(() => []);
    const radiusSq = edgeRadius * edgeRadius;

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const dxPx = (nodes[i].nx - nodes[j].nx) * width;
        const dyPx = (nodes[i].ny - nodes[j].ny) * height;
        const d2Px = dxPx * dxPx + dyPx * dyPx;
        if (d2Px <= radiusSq) {
          edges.push({ a: i, b: j, active: false });
          adjacency[i].push(j);
          adjacency[j].push(i);
        }
      }
    }

    return { nodes, edges, adjacency };
  }, [nodeCount, edgeRadius, width, height, landMask]);
}
