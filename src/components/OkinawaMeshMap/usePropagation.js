import { useCallback, useMemo } from "react";

export function usePropagation({ adjacency, hopDelay = 420 }) {
  const buildHopMap = useCallback(
    (sourceId) => {
      const hops = new Array(adjacency.length).fill(Infinity);
      const queue = [sourceId];
      hops[sourceId] = 0;

      while (queue.length > 0) {
        const cur = queue.shift();
        const nextHop = hops[cur] + 1;
        for (const nxt of adjacency[cur]) {
          if (nextHop < hops[nxt]) {
            hops[nxt] = nextHop;
            queue.push(nxt);
          }
        }
      }
      return hops;
    },
    [adjacency]
  );

  const scheduleFromSource = useCallback(
    (sourceId, now) => {
      const hops = buildHopMap(sourceId);
      return hops
        .map((hop, nodeId) => ({ nodeId, hop, at: now + hop * hopDelay }))
        .filter((item) => Number.isFinite(item.hop))
        .sort((a, b) => a.at - b.at);
    },
    [buildHopMap, hopDelay]
  );

  return useMemo(
    () => ({
      buildHopMap,
      scheduleFromSource,
    }),
    [buildHopMap, scheduleFromSource]
  );
}
