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

// 元PNGは1000x1000で、市町村界が白線で入っている。
//
// 以前は沖縄本島全体（sx540 sy158 sw375 sh552）を映していたが、
// 本島全域がメッシュで繋がる絵は、実際に配備できる台数を大きく超えており
// 誇張になっていた。名護市とその周辺だけを映す範囲に狭めている。
//
// 中心の求め方（目分量で置かないこと）:
// 本島の最北端＝辺戸岬(26.8703N,128.2586E)が元PNGの(885,288)、
// 最南端＝喜屋武岬(26.0836N,127.6862E)が(560,711)。この2点から
// 緯度経度→ピクセルの線形写像を出し、名護市役所(26.5917N,127.9775E)を
// 逆算すると約(725,438)。ここを中心に210px四方を切り出している。
// ※ 初版は(730,410)としていたが、これは約6km北の本部半島側だった。
export const MAP_IMAGE_CROP = { sx: 620, sy: 333, sw: 210, sh: 210 };

// 描画解像度。クロップが正方形なので canvas も正方形にして歪ませない。
export const CANVAS_WIDTH = 560;
export const CANVAS_HEIGHT = 560;

// 縮尺。上記2点間は実距離104.3km、元PNG上で533.4pxだったので 1px ≈ 0.196km。
// この値は「1ホップ＝約1km」を画面上の距離として正しく描くために使う。
// 図に縮尺バーを出しているので、ここがずれると絵と数字が食い違う。
export const SOURCE_PX_PER_KM = 5.11;

/** canvas上の1kmが何pxにあたるか。 */
export const PX_PER_KM = (CANVAS_WIDTH / MAP_IMAGE_CROP.sw) * SOURCE_PX_PER_KM;

// クロップの中心が名護市。周辺自治体は位置を確認できていないので載せない。
//
// 逆算した名護市役所は元PNGの(725,438)＝正規化(0.500,0.500)だが、名護湾の
// 海岸線上にあり、この地図の解像度では海側の画素に落ちる。マーカーが海に
// 浮くのを避けるため、最も近い陸地(726,436)へ寄せてある。ずれは約0.4kmで、
// 元地図の精度の内側。
export const CITIES = [{ name: "名護市", nx: 0.505, ny: 0.49 }];

// 停止する基地局の位置（正規化座標）。
export const BASE_STATION = { nx: 0.52, ny: 0.24 };

export function kmToPx(km) {
  return km * PX_PER_KM;
}

export function toCanvasPoint(nx, ny, width, height) {
  return { x: nx * width, y: ny * height };
}
