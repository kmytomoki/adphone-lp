"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BASE_STATION,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CITIES,
  EDGE_ACTIVE,
  EDGE_IDLE,
  ISLAND_FILL_RGB,
  MAP_IMAGE_CROP,
  MAP_IMAGE_SRC,
  NODE_ACTIVE,
  NODE_IDLE,
  NODE_RELAY,
  NODE_SOURCE,
  RIPPLE_COLOR,
  SEA_COLOR,
  toCanvasPoint,
} from "./constants";
import { useNodeGraph } from "./useNodeGraph";
import { usePropagation } from "./usePropagation";

const LAND_ALPHA_THRESHOLD = 40;

export default function OkinawaMeshMap({
  nodeCount = 80,
  edgeRadius = 75,
  hopDelay = 420,
  autoPlay = true,
}) {
  const width = CANVAS_WIDTH;
  const height = CANVAS_HEIGHT;

  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const reachedElRef = useRef(null);
  const rafRef = useRef(0);
  const observerRef = useRef(null);
  const autoTriggeredRef = useRef(false);
  const scheduleRef = useRef([]);
  const sourceRef = useRef(null);
  const ripplesRef = useRef([]);
  const runtimeRef = useRef({ nodes: [], edges: [] });
  const mapCanvasRef = useRef(null);
  const pendingTimersRef = useRef([]);

  const [landMask, setLandMask] = useState(null);
  const [baseDown, setBaseDown] = useState(false);
  const [showOutageText, setShowOutageText] = useState(false);

  const graph = useNodeGraph({ nodeCount, edgeRadius, width, height, landMask });
  const { scheduleFromSource } = usePropagation({
    adjacency: graph.adjacency,
    hopDelay,
  });

  const cityCanvasPoints = useMemo(
    () =>
      CITIES.map((city) => ({
        ...city,
        ...toCanvasPoint(city.nx, city.ny, width, height),
      })),
    [height, width]
  );

  // Load the map PNG once, recolor land pixels and build a land mask used for
  // node placement.
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.src = MAP_IMAGE_SRC;
    img.onload = () => {
      if (cancelled) return;
      const naturalW = img.naturalWidth;
      const naturalH = img.naturalHeight;

      const off = document.createElement("canvas");
      off.width = naturalW;
      off.height = naturalH;
      const offCtx = off.getContext("2d");
      if (!offCtx) return;
      offCtx.drawImage(img, 0, 0);

      const imgData = offCtx.getImageData(0, 0, naturalW, naturalH);
      const data = imgData.data;
      const mask = new Uint8Array(naturalW * naturalH);

      for (let i = 0, j = 0; i < data.length; i += 4, j += 1) {
        const a = data[i + 3];
        if (a > LAND_ALPHA_THRESHOLD) {
          mask[j] = 1;
          // Recolor land pixels to spec island fill while keeping the
          // anti-aliased alpha so the coastline stays soft against the sea.
          data[i] = ISLAND_FILL_RGB[0];
          data[i + 1] = ISLAND_FILL_RGB[1];
          data[i + 2] = ISLAND_FILL_RGB[2];
        } else {
          mask[j] = 0;
          data[i + 3] = 0;
        }
      }
      offCtx.putImageData(imgData, 0, 0);

      mapCanvasRef.current = off;

      const { sx, sy, sw, sh } = MAP_IMAGE_CROP;
      const sampler = (nx, ny) => {
        if (nx < 0 || nx > 1 || ny < 0 || ny > 1) return false;
        const ix = Math.floor(sx + nx * sw);
        const iy = Math.floor(sy + ny * sh);
        if (ix < 0 || iy < 0 || ix >= naturalW || iy >= naturalH) return false;
        return mask[iy * naturalW + ix] === 1;
      };
      setLandMask(() => sampler);
    };

    return () => {
      cancelled = true;
      mapCanvasRef.current = null;
    };
  }, []);

  // Reset the per-frame runtime whenever the graph regenerates.
  useEffect(() => {
    pendingTimersRef.current.forEach((t) => clearTimeout(t));
    pendingTimersRef.current = [];
    scheduleRef.current = [];
    ripplesRef.current = [];
    sourceRef.current = null;

    runtimeRef.current = {
      nodes: graph.nodes.map((node) => ({ ...node, state: "idle", glow: 0 })),
      edges: graph.edges.map((edge) => ({ ...edge, active: false })),
    };
  }, [graph]);

  const resetRuntime = useCallback(() => {
    pendingTimersRef.current.forEach((t) => clearTimeout(t));
    pendingTimersRef.current = [];
    scheduleRef.current = [];
    ripplesRef.current = [];
    sourceRef.current = null;
    runtimeRef.current.nodes.forEach((node) => {
      node.state = "idle";
      node.glow = 0;
    });
    runtimeRef.current.edges.forEach((edge) => {
      edge.active = false;
    });
  }, []);

  const startPropagationFrom = useCallback(
    (sourceId) => {
      const runtime = runtimeRef.current;
      if (!runtime.nodes[sourceId]) return;
      const now = performance.now();

      resetRuntime();

      scheduleRef.current = scheduleFromSource(sourceId, now);
      sourceRef.current = sourceId;
      runtime.nodes[sourceId].state = "active";
      runtime.nodes[sourceId].glow = 1;

      ripplesRef.current = [0, 1, 2, 3].map((i) => ({
        r: 6,
        alpha: 1,
        delayUntil: now + i * 300,
      }));
    },
    [resetRuntime, scheduleFromSource]
  );

  const nearestNodeId = useCallback(
    (x, y) => {
      const runtime = runtimeRef.current;
      if (runtime.nodes.length === 0) return null;
      let best = null;
      let bestD = Infinity;
      for (const node of runtime.nodes) {
        const px = node.nx * width;
        const py = node.ny * height;
        const dx = px - x;
        const dy = py - y;
        const d2 = dx * dx + dy * dy;
        if (d2 < bestD) {
          bestD = d2;
          best = node.id;
        }
      }
      return best;
    },
    [height, width]
  );

  const startFromNaha = useCallback(() => {
    const naha = cityCanvasPoints.find((c) => c.name === "那覇市");
    if (!naha) return;
    const id = nearestNodeId(naha.x, naha.y);
    if (id !== null) startPropagationFrom(id);
  }, [cityCanvasPoints, nearestNodeId, startPropagationFrom]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const drawIsland = () => {
      const off = mapCanvasRef.current;
      if (!off) return;
      const { sx, sy, sw, sh } = MAP_IMAGE_CROP;

      // Soft dark-green halo around the coastline by drawing the recolored
      // island multiple times offset (cheap pseudo-stroke).
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.filter = "brightness(0.55) saturate(1.6)";
      const offsets = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      for (const [dx, dy] of offsets) {
        ctx.drawImage(off, sx, sy, sw, sh, dx, dy, width, height);
      }
      ctx.restore();
      ctx.drawImage(off, sx, sy, sw, sh, 0, 0, width, height);
    };

    const drawBaseOverlay = () => {
      if (baseDown) return;
      const bx = BASE_STATION.nx * width;
      const by = BASE_STATION.ny * height;
      const radius = 220;

      ctx.save();
      ctx.fillStyle = "rgba(55,138,221,0.10)";
      const fans = [
        [-0.75, -0.20],
        [0.20, 0.75],
        [Math.PI - 0.75, Math.PI - 0.20],
        [Math.PI + 0.20, Math.PI + 0.75],
      ];
      fans.forEach(([a0, a1]) => {
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.arc(bx, by, radius, a0, a1);
        ctx.closePath();
        ctx.fill();
      });

      // Antenna icon (tower base + signal dot)
      ctx.fillStyle = "#FFFFFF";
      ctx.strokeStyle = "#378ADD";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(bx, by, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#378ADD";
      ctx.beginPath();
      ctx.arc(bx, by, 4.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#2F5E9A";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("基地局", bx, by - 14);
      ctx.restore();
    };

    const animate = (now) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = SEA_COLOR;
      ctx.fillRect(0, 0, width, height);

      drawIsland();
      drawBaseOverlay();

      const runtime = runtimeRef.current;

      const activations = scheduleRef.current;
      while (activations.length > 0 && activations[0].at <= now) {
        const hit = activations.shift();
        const node = runtime.nodes[hit.nodeId];
        if (!node) continue;
        node.state = "relay";
        node.glow = 1;
        const timerId = setTimeout(() => {
          node.state = "active";
        }, 170);
        pendingTimersRef.current.push(timerId);
      }

      runtime.edges.forEach((edge) => {
        const a = runtime.nodes[edge.a];
        const b = runtime.nodes[edge.b];
        if (!a || !b) return;
        const ax = a.nx * width;
        const ay = a.ny * height;
        const bxp = b.nx * width;
        const byp = b.ny * height;
        edge.active = a.state !== "idle" && b.state !== "idle";

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bxp, byp);
        ctx.lineWidth = edge.active ? 1.7 : 1;
        ctx.strokeStyle = edge.active ? EDGE_ACTIVE : EDGE_IDLE;
        ctx.stroke();
      });

      if (sourceRef.current !== null) {
        const s = runtime.nodes[sourceRef.current];
        if (s) {
          const spX = s.nx * width;
          const spY = s.ny * height;
          ripplesRef.current = ripplesRef.current.filter((r) => r.alpha > 0.01);
          ripplesRef.current.forEach((ring) => {
            if (now < ring.delayUntil) return;
            ring.r = Math.min(ring.r + 2.2, 240);
            ring.alpha *= 0.982;
            ctx.beginPath();
            ctx.arc(spX, spY, ring.r, 0, Math.PI * 2);
            ctx.lineWidth = 2;
            ctx.strokeStyle = `rgba(${RIPPLE_COLOR},${ring.alpha})`;
            ctx.stroke();
          });
        }
      }

      // City markers and labels
      cityCanvasPoints.forEach((city) => {
        ctx.beginPath();
        ctx.arc(city.x, city.y, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = "#1a1f2e";
        ctx.fill();
        ctx.font = "10px 'Hiragino Sans', 'Yu Gothic', sans-serif";
        ctx.fillStyle = "rgba(26,31,46,0.72)";
        ctx.textAlign = "left";
        ctx.fillText(city.name, city.x + 7, city.y + 3);
      });

      runtime.nodes.forEach((node) => {
        const px = node.nx * width;
        const py = node.ny * height;
        node.glow = Math.max(0, node.glow - 0.008);

        if (node.glow > 0.35) {
          ctx.beginPath();
          ctx.arc(px, py, 10 * node.glow + 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(29,158,117,${0.25 * node.glow})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(px, py, 4.2, 0, Math.PI * 2);
        if (node.id === sourceRef.current) ctx.fillStyle = NODE_SOURCE;
        else if (node.state === "relay") ctx.fillStyle = NODE_RELAY;
        else if (node.state === "active") ctx.fillStyle = NODE_ACTIVE;
        else ctx.fillStyle = NODE_IDLE;
        ctx.fill();
      });

      // Reached-node counter (updated outside React state to avoid re-renders)
      if (reachedElRef.current && runtime.nodes.length > 0) {
        let reached = 0;
        for (const node of runtime.nodes) {
          if (node.state !== "idle") reached += 1;
        }
        reachedElRef.current.textContent = `${reached} / ${runtime.nodes.length}`;
      }

      if (showOutageText) {
        ctx.save();
        ctx.fillStyle = "rgba(200,54,45,0.94)";
        ctx.font = "bold 16px 'Hiragino Sans', 'Yu Gothic', sans-serif";
        ctx.textAlign = "right";
        ctx.fillText("電波途絶", width - 16, 30);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [baseDown, cityCanvasPoints, height, showOutageText, width]);

  // Scroll-triggered auto-start
  useEffect(() => {
    if (!autoPlay || !wrapRef.current) return undefined;
    if (graph.nodes.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.5 &&
            !autoTriggeredRef.current
          ) {
            autoTriggeredRef.current = true;
            setBaseDown(true);
            setShowOutageText(true);
            const t = setTimeout(() => {
              startFromNaha();
              setShowOutageText(false);
            }, 600);
            pendingTimersRef.current.push(t);
          }
        });
      },
      { threshold: [0.5] }
    );
    observer.observe(wrapRef.current);
    observerRef.current = observer;
    return () => observer.disconnect();
  }, [autoPlay, graph.nodes.length, startFromNaha]);

  useEffect(
    () => () => {
      pendingTimersRef.current.forEach((t) => clearTimeout(t));
      pendingTimersRef.current = [];
    },
    []
  );

  const handleClick = useCallback(
    (event) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((event.clientX - rect.left) / rect.width) * width;
      const y = ((event.clientY - rect.top) / rect.height) * height;
      const id = nearestNodeId(x, y);
      if (id !== null) startPropagationFrom(id);
    },
    [height, nearestNodeId, startPropagationFrom, width]
  );

  const replay = useCallback(() => {
    setBaseDown(true);
    setShowOutageText(true);
    const t = setTimeout(() => {
      startFromNaha();
      setShowOutageText(false);
    }, 600);
    pendingTimersRef.current.push(t);
  }, [startFromNaha]);

  const legend = [
    ["発信源", NODE_SOURCE],
    ["中継中", NODE_RELAY],
    ["受信済", NODE_ACTIVE],
    ["未受信", NODE_IDLE],
  ];

  return (
    <div ref={wrapRef} className="w-full">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-base font-medium text-ink">沖縄本島 アドホックメッシュ伝搬シミュレーション</p>
          <p className="mono mt-1 text-micro tracking-[0.15em] text-ink-soft">
            REACHED NODES: <span ref={reachedElRef} className="text-brand-accent">0 / 0</span>
          </p>
        </div>
        <button
          type="button"
          onClick={replay}
          className="min-h-11 rounded-sm border border-line px-4 py-2 text-base tracking-[0.04em] text-ink-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-accent hover:text-brand-accent"
        >
          那覇市から再生
        </button>
      </div>
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onClick={handleClick}
          className="block w-full max-w-[440px] cursor-pointer rounded-md border border-line-soft transition-shadow duration-300 hover:shadow-[6px_6px_0_0_rgba(26,31,46,0.08)]"
          style={{ aspectRatio: `${width} / ${height}`, backgroundColor: SEA_COLOR }}
        />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {legend.map(([label, color]) => (
          <span key={label} className="flex items-center gap-1.5 text-micro text-ink-soft">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
            {label}
          </span>
        ))}
      </div>
      <p className="mt-2 text-center text-base text-ink-soft">
        地図上をクリックすると、その地点を起点にメッシュ伝搬が広がります。
      </p>
    </div>
  );
}
