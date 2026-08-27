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

/** トップと相談ページで共用する、読み手別の入口。 */
export const AUDIENCE_OPTIONS: readonly {
  label: string;
  description: string;
  subject: ContactSubject;
}[] = [
  {
    label: "県・自治体の防災",
    description: "避難所と災害対策本部の情報伝達、孤立地域への備えを検討する方",
    subject: "県・自治体の導入相談",
  },
  {
    label: "企業の防災・BCP",
    description: "工場・事業所・店舗間の通信確保や従業員の安否確認を検討する方",
    subject: "企業の防災・BCP相談",
  },
  {
    label: "共創・事業連携",
    description: "防災サービスとの連携、共同実証、技術提携を検討する企業の方",
    subject: "共創・事業連携",
  },
];

export function contactHref(subject: ContactSubject) {
  return `/contact?subject=${encodeURIComponent(subject)}#contact-form`;
}
