import type { ContactSubject } from "@/lib/site";

export type DocumentAudience = "municipality" | "enterprise" | "partners";

export const DOCUMENT_AUDIENCES: readonly {
  id: DocumentAudience;
  label: string;
  subject: ContactSubject;
  headline: string;
  summary: string;
  focusTitle: string;
  focusItems: readonly string[];
  steps: readonly string[];
}[] = [
  {
    id: "municipality",
    label: "県・自治体の防災",
    subject: "県・自治体の導入相談",
    headline: "避難所・孤立地域・災害対策本部の連絡を残す",
    summary:
      "防災行政無線や衛星電話で周知した後、避難所間の個別情報や現場状況を端末間で共有する補完レイヤーとして検討できます。",
    focusTitle: "想定する活用",
    focusItems: [
      "基地局停止後の避難所間の安否・物資情報の中継",
      "孤立地域の状況を災害対策本部へ段階的に集約",
      "オフライン地図と避難経路案内による現場誘導",
    ],
    steps: [
      "対象となる避難所・孤立地域・連絡業務を整理する",
      "数拠点で通信距離と運用手順を実証する",
      "防災訓練と連動した継続運用を設計する",
    ],
  },
  {
    id: "enterprise",
    label: "企業の防災・BCP",
    subject: "企業の防災・BCP相談",
    headline: "事業所・店舗間の連絡を、通信断時にも確保する",
    summary:
      "インターネット前提の安否確認や本社連絡が使えない時間帯を補完し、工場・事業所・店舗の初動判断を支えます。",
    focusTitle: "想定する活用",
    focusItems: [
      "現場担当者から対策チームへの被害・危険情報の集約",
      "未回答と通信不能を切り分ける安否確認の補完",
      "BCP訓練に組み込んだ代替通信の検証",
    ],
    steps: [
      "本社・事業所・店舗など対象拠点と連絡業務を整理する",
      "実際の拠点で通信と操作手順を小規模実証する",
      "保管・点検・担当交代を含む運用手順へ接続する",
    ],
  },
  {
    id: "partners",
    label: "共創・事業連携",
    subject: "共創・事業連携",
    headline: "既存の防災サービスと役割分担して組み合わせる",
    summary:
      "ADREN単体の導入だけでなく、防災情報システム、通信機器、訓練サービスとの接続や共同実証を想定した資料です。",
    focusTitle: "想定する連携",
    focusItems: [
      "既存防災システムの通信断対策を共同設計",
      "通信機器・防災設備との共同実証",
      "自治体・企業向け防災事業の共同開発",
    ],
    steps: [
      "連携対象のデータと接続点を整理する",
      "役割分担と検証項目を含む共同実証を設計する",
      "継続運用まで含めた事業・提供形態を検討する",
    ],
  },
];

export const documentProblems = [
  ["基地局の停止", "東日本大震災では移動通信 14,800局以上が停止し、固定電話は100万回線以上が不通となった（総務省データ）。"],
  ["現在も残る通信途絶", "能登半島地震でも通信途絶エリアが発生し、孤立地域の情報収集が遅れ、初動判断に遅延が生じた。"],
  ["72時間の壁", "発災後72時間は人命救助の分岐点。通信断の時間は、そのまま救助可能性の低下につながる。"],
] as const;

export const documentFeatures = [
  ["スマホを災害時通信端末に拡張", "住民や現場担当者が既に持つスマートフォンに通信モジュールをBLEで接続し、そのまま中継ノードとして使う。専用端末を人数分配備する必要がない。"],
  ["高齢者も子供も使えるUI", "本文16px以上、見出し20px以上を全画面で確保し、操作を必要最小限の手数に絞っている。"],
  ["完全オフラインで動作", "避難所・道路データと防災情報を端末内に保持し、通信が一切ない状態でも地図表示と避難経路探索が動作する。"],
  ["信頼度スコアで情報を選別", "時間減衰と発信者重みでスコア化。類似情報は統合し、大きく乖離した情報は分離して表示する。"],
] as const;

export const documentSpecs = [
  ["通信方式", "LoRa (920MHz帯 LPWA) + BLE ハイブリッド"],
  ["通信距離", "1km以上 (屋外実験時) / 3km以上 (シミュレーション値)"],
  ["低消費電力", "LPWAベースで小容量データを長距離伝送"],
  ["セキュリティ (LPWA区間)", "X25519 (ECDH) で鍵交換 / AES-256-GCM で暗号化 / Ed25519 で署名"],
  ["データ圧縮", "マルチモーダルAI処理により最大 1/1000 (条件により変動)"],
  ["対応端末", "スマートフォン (BLE接続), iOS / Android"],
] as const;

export const documentAwards = [
  ["2025.12", "第4回高専防災減災コンテスト 最優秀賞", "https://www.bosai.go.jp/kosencon/contest_2025.html"],
  ["2026.02", "第3回高専起業家サミット 最優秀賞 (スタートアップ部門)", "https://startup.gekkan-kosen.com/report/3rd_2025/"],
  ["2026.03", "WiCON2025 最優秀賞", "https://wicon.jp/2025/final"],
  ["2026.05", "DCON2026 準優勝", "https://dcon.ai/results/"],
] as const;

export function documentHref(audience: DocumentAudience) {
  return `/document?audience=${audience}`;
}

export function parseDocumentAudience(value: string | null | undefined): DocumentAudience {
  if (value === "enterprise" || value === "partners" || value === "municipality") {
    return value;
  }
  return "municipality";
}
