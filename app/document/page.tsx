import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = {
  title: "製品概要資料",
  description:
    "ADREN（アドレン）の製品概要資料。課題・仕組み・特長・仕様・実績をまとめた1枚資料です。登録不要でそのまま閲覧・印刷・PDF保存できます。",
};

// このページの記載は、すべて他ページで公開済みの内容から構成している。
// ここだけで新しい数値・実績を足さないこと（裏取りの取れない記述が資料として配布される）。
const problems = [
  ["基地局の停止", "東日本大震災では移動通信 14,800局以上が停止し、固定電話は100万回線以上が不通となった（総務省データ）。"],
  ["現在も残る通信途絶", "能登半島地震でも通信途絶エリアが発生し、孤立地域の情報収集が遅れ、初動判断に遅延が生じた。"],
  ["72時間の壁", "発災後72時間は人命救助の分岐点。通信断の時間は、そのまま救助可能性の低下につながる。"],
];

const features = [
  ["スマホを災害時通信端末に拡張", "住民が既に持つスマートフォンに通信モジュールをBLEで接続し、そのまま中継ノードとして使う。専用端末を人数分配備する必要がない。"],
  ["高齢者も子供も使えるUI", "本文16px以上、見出し20px以上を全画面で確保し、操作を必要最小限の手数に絞っている。"],
  ["完全オフラインで動作", "避難所・道路データと防災情報を端末内に保持し、通信が一切ない状態でも地図表示と避難経路探索が動作する。"],
  ["信頼度スコアで情報を選別", "時間減衰と発信者重みでスコア化。類似情報は統合し、大きく乖離した情報は分離して表示する。"],
];

const specs = [
  ["通信方式", "LoRa (920MHz帯 LPWA) + BLE ハイブリッド"],
  ["通信距離", "1km以上 (屋外実験時) / 3km以上 (シミュレーション値)"],
  ["低消費電力", "LPWAベースで小容量データを長距離伝送"],
  ["セキュリティ (LPWA区間)", "X25519 (ECDH) で鍵交換 / AES-256-GCM で暗号化 / Ed25519 で署名"],
  ["データ圧縮", "マルチモーダルAI処理により最大 1/1000 (条件により変動)"],
  ["対応端末", "スマートフォン (BLE接続), iOS / Android"],
];

const awards = [
  ["2025.12", "第4回高専防災減災コンテスト 最優秀賞", "https://www.bosai.go.jp/kosencon/contest_2025.html"],
  ["2026.02", "第3回高専起業家サミット 最優秀賞 (スタートアップ部門)", "https://startup.gekkan-kosen.com/report/3rd_2025/"],
  ["2026.03", "WiCON2025 最優秀賞", "https://wicon.jp/2025/final"],
  ["2026.05", "DCON2026 準優勝", "https://dcon.ai/results/"],
];

function Block({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <section className="break-inside-avoid border-t border-line pt-6">
      <p className="mono mb-2 text-micro tracking-[0.2em] text-brand-accent uppercase">{label}</p>
      <h2 className="mincho mb-4 text-2xl">{title}</h2>
      {children}
    </section>
  );
}

export default function DocumentPage() {
  return (
    <main className="flex-1 px-6 py-12 md:px-12 print:px-0 print:py-0">
      <div className="print-hide mx-auto mb-8 flex max-w-4xl flex-col gap-4 border border-line-soft bg-paper-2 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-base font-semibold text-ink">製品概要資料（登録不要）</p>
          <p className="mt-1 text-body text-ink-soft">
            そのままお読みいただけます。印刷ダイアログの「PDFとして保存」でPDF化できます。
          </p>
        </div>
        <PrintButton />
      </div>

      <article className="mx-auto max-w-4xl border border-line-soft bg-white p-8 md:p-12 print:border-0 print:p-0">
        <header className="mb-8 border-b-2 border-ink pb-6">
          <p className="mincho text-3xl font-extrabold tracking-[0.05em]">
            AD<span className="text-brand-accent">REN</span>
          </p>
          <p className="mono mt-1 text-micro tracking-[0.2em] text-ink-soft">
            AD-HOC / DISASTER-RESILIENT / EMERGENCY NETWORK
          </p>
          <h1 className="mincho mt-6 text-3xl leading-tight md:text-4xl">
            基地局が停止しても、避難所と現場の情報伝達を続ける
          </h1>
          <p className="mt-4 text-lede text-ink-soft">
            自治体の防災担当者向け 製品概要資料 ／ 開発: Rewave Technology（沖縄工業高等専門学校発）
          </p>
        </header>

        <div className="space-y-8">
          <Block label="Problem" title="災害時、通信は真っ先に失われる">
            <dl className="space-y-3">
              {problems.map(([title, body]) => (
                <div key={title} className="border-l-2 border-line pl-4">
                  <dt className="text-base font-semibold text-ink">{title}</dt>
                  <dd className="text-body text-ink-soft">{body}</dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block label="Solution" title="回線に依存しない、独立した通信レイヤー">
            <p className="text-body text-ink-soft">
              ADRENは、スマホとBLEで接続する小型通信モジュールです。近距離はBLE、遠距離はLPWA (LoRa
              920MHz)で中継し、ノード間をバケツリレー式に接続。基地局が使えない環境でも、情報を次のノードへ確実に届けます。
              オンライン時はFirebaseで同期し、オフライン時はSQLiteで継続運用します。
            </p>
          </Block>

          <Block label="Features" title="自治体運用を支える4つの特長">
            <dl className="grid gap-4 sm:grid-cols-2">
              {features.map(([title, body]) => (
                <div key={title} className="border border-line-soft bg-paper p-4">
                  <dt className="mincho mb-2 text-xl">{title}</dt>
                  <dd className="text-body text-ink-soft">{body}</dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block label="Specifications" title="仕様">
            <div className="border border-line">
              {specs.map(([key, value]) => (
                <div key={key} className="grid border-b border-line-soft last:border-b-0 sm:grid-cols-[220px_1fr]">
                  <div className="bg-paper-2 px-4 py-3 text-body text-ink">{key}</div>
                  <div className="px-4 py-3 text-body text-ink-soft">{value}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-body text-ink-soft">
              通信距離・データ圧縮率は、いずれも開発中プロトタイプでの測定値およびシミュレーション値です。第三者検証は受けていません。
            </p>
          </Block>

          <Block label="Awards" title="受賞歴">
            <ul className="space-y-2">
              {awards.map(([year, title, href]) => (
                <li key={title} className="flex flex-wrap items-baseline gap-x-4 border-b border-line-soft pb-2">
                  <span className="mono text-micro tracking-[0.15em] text-brand-accent">{year}</span>
                  <span className="text-body text-ink">{title}</span>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="mono text-micro text-ink-soft underline underline-offset-4 hover:text-brand-accent"
                  >
                    主催者発表ページ ↗
                  </a>
                </li>
              ))}
            </ul>
          </Block>

          <Block label="Next Step" title="導入検討・実証のご相談">
            <p className="text-body text-ink-soft">
              実証実験、既存システム連携、学校・避難所配備、導入スケジュールなどの具体的なご相談は、
              サイトのお問い合わせフォームより承ります。数営業日以内に担当者よりご連絡いたします。
            </p>
            <p className="mt-2 text-body text-ink-soft">
              お問い合わせ: https://adren-lp.vercel.app/contact
            </p>
            <div className="print-hide mt-5">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center rounded-sm border border-ink bg-ink px-6 py-4 text-base font-medium text-white transition-colors hover:bg-brand-accent"
              >
                導入について相談する
              </Link>
            </div>
          </Block>
        </div>

        <footer className="mt-10 border-t border-line pt-4 text-micro text-ink-soft">
          <p>ADREN 製品概要資料 ／ Rewave Technology ／ 本資料の内容は開発中の仕様であり、予告なく変更される場合があります。</p>
        </footer>
      </article>
    </main>
  );
}
