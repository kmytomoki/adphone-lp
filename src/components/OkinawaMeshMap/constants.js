export const SEA_COLOR = "#E6F1FB";
export const ISLAND_FILL = "#EAF3DE";
export const ISLAND_FILL_RGB = [234, 243, 222];
export const ISLAND_STROKE = "#639922";
export const ISLAND_STROKE_RGB = [99, 153, 34];
export const NODE_IDLE = "rgba(29,158,117,0.42)";
export const NODE_RELAY = "#EF9F27";
export const NODE_ACTIVE = "#1D9E75";
export const NODE_SOURCE = "#378ADD";
export const EDGE_ACTIVE = "rgba(29,158,117,0.55)";
export const EDGE_IDLE = "rgba(99,153,34,0.20)";
export const RIPPLE_COLOR = "55,138,221";

export const MAP_IMAGE_SRC = "/okinawa-prefecture.png";

// Original PNG is 1000x1000. The Okinawa main island and the surrounding small
// islands sit inside this crop, so the canvas only renders that sub-region.
export const MAP_IMAGE_CROP = { sx: 540, sy: 158, sw: 375, sh: 552 };

// Canvas drawing resolution. Aspect ratio matches the crop (0.679) so the
// island is rendered without horizontal distortion.
export const CANVAS_WIDTH = 540;
export const CANVAS_HEIGHT = 800;

// City positions are normalized to the canvas (which is the cropped main
// island), with the geographic locations matched against the source PNG.
export const CITIES = [
  { name: "名護市", nx: 0.507, ny: 0.456 },
  { name: "沖縄市", nx: 0.547, ny: 0.601 },
  { name: "那覇市", nx: 0.160, ny: 0.828 },
  { name: "糸満市", nx: 0.093, ny: 0.928 },
];

// Position of the simulated base-station icon (in normalized canvas coords).
// Placed near the central narrow part of the island so the cellular fan
// reaches both north and south halves.
export const BASE_STATION = { nx: 0.50, ny: 0.36 };

export function toCanvasPoint(nx, ny, width, height) {
  return { x: nx * width, y: ny * height };
}
