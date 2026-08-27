/**
 * サイト全体で使う公開情報。
 *
 * ここに入れた値はそのまま外部に公開される。実在する値だけを入れること。
 * 未確定の項目は null のままにしておけば、その欄は画面に描画されない。
 * ダミー値（example.jp のアドレス、00-0000-0000 のような番号、仮の所在地）は
 * 置かないこと。導入検討中の自治体・企業はここを必ず確認する。
 */
export const publicContact: {
  email: string | null;
  phone: string | null;
  address: string | null;
} = {
  email: null,
  phone: null,
  address: null,
};

/** お問い合わせ種別。フォームの選択肢とサーバー側の検証で共用する。 */
export const CONTACT_SUBJECTS = [
  "県・自治体の導入相談",
  "企業の防災・BCP相談",
  "共創・事業連携",
  "実証実験の相談",
  "学校・避難所の配備相談",
  "その他",
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

/** トップ・ナビ・相談ページで共用する、読み手別の入口。 */
export const AUDIENCE_OPTIONS: readonly {
  label: string;
  description: string;
  subject: ContactSubject;
  usecasesHref: string;
  documentAudience: "municipality" | "enterprise" | "partners";
}[] = [
  {
    label: "県・自治体の防災",
    description: "避難所と災害対策本部の情報伝達、孤立地域への備えを検討する方",
    subject: "県・自治体の導入相談",
    usecasesHref: "/usecases#municipality",
    documentAudience: "municipality",
  },
  {
    label: "企業の防災・BCP",
    description: "工場・事業所・店舗間の通信確保や従業員の安否確認を検討する方",
    subject: "企業の防災・BCP相談",
    usecasesHref: "/usecases#enterprise",
    documentAudience: "enterprise",
  },
  {
    label: "共創・事業連携",
    description: "防災サービスとの連携、共同実証、技術提携を検討する企業の方",
    subject: "共創・事業連携",
    usecasesHref: "/usecases#partners",
    documentAudience: "partners",
  },
];

/** 会社情報ページと同じ受賞歴。主催者発表ページへのリンク必須。 */
export const TRUST_AWARDS: readonly {
  year: string;
  title: string;
  href: string;
}[] = [
  {
    year: "2026.05",
    title: "DCON2026 準優勝",
    href: "https://dcon.ai/results/",
  },
  {
    year: "2025.12",
    title: "第4回高専防災減災コンテスト 最優秀賞",
    href: "https://www.bosai.go.jp/kosencon/contest_2025.html",
  },
  {
    year: "2026.02",
    title: "第3回高専起業家サミット 最優秀賞",
    href: "https://startup.gekkan-kosen.com/report/3rd_2025/",
  },
];

export function contactHref(subject: ContactSubject) {
  return `/contact?subject=${encodeURIComponent(subject)}#contact-form`;
}
