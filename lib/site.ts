/**
 * サイト全体で使う公開情報。
 *
 * ここに入れた値はそのまま外部に公開される。実在する値だけを入れること。
 * 未確定の項目は null のままにしておけば、その欄は画面に描画されない。
 * ダミー値（example.jp のアドレス、00-0000-0000 のような番号、仮の所在地）は
 * 置かないこと。導入検討中の自治体はここを必ず確認する。
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
  "資料請求",
  "自治体導入相談",
  "実証実験相談",
  "学校・避難所配備検討",
  "その他",
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];
