import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FinalCta } from "@/components/site/FinalCta";
import { PageHero } from "@/components/site/PageHero";
import { UsageSteps } from "@/components/site/UsageSteps";

export const metadata: Metadata = {
  title: "製品概要",
  description:
    "スマートフォン、BLE、LoRaを組み合わせ、通信断時にも安否・物資・危険情報を端末間で届けるADREN（アドレン）の製品概要です。",
};

// 「通信距離」は誤読されやすい行。1台あたりの数字だけを見た読み手は、
// 自分の市域と比べて「足りない」と判断して離脱する。note で中継の話に繋ぐ。
const specs: readonly { key: string; value: string; note?: string }[] = [
  { key: "通信方式", value: "LoRa (920MHz帯 LPWA) + BLE ハイブリッド" },
  {
    key: "通信距離",
    value: "1km以上 (屋外実験時) / 3km以上 (シミュレーション値)",
    note: "いずれも1ノードあたりの距離です。ノード同士が中継するため、到達範囲は配備台数に応じて広がります。",
  },
  { key: "低消費電力", value: "LPWAベースで小容量データを長距離伝送" },
  {
    key: "セキュリティ (LPWA区間)",
    value: "X25519 (ECDH) で鍵交換 / AES-256-GCM で暗号化 / Ed25519 で署名",
  },
  { key: "データ圧縮", value: "マルチモーダルAI処理により最大 1/1000 (条件により変動)" },
  { key: "対応端末", value: "スマートフォン (BLE接続), iOS / Android" },
];

const productFeatures = [
  {
    title: "オフライン地図で危険情報を共有",
    body: "住民投稿や被害報告を端末内の地図に反映。インターネットが使えない状態でも、避難所・危険箇所・支援導線を確認し、現場判断を支えます。",
    image: "/images/app-map.webp",
    note: "実際のアプリ画面（沖縄県名護市 辺野古周辺）",
  },
  {
    title: "緊急メッセージを端末間で中継",
    body: "送り先を選んで送信すると、複数のノードがメッセージを次の端末へ中継。基地局が使えない状態でも、安否・要請情報の搬送を支えます。",
    image: "/images/feature-relay.webp",
    note: "※ 生成AIによる利用イメージです",
  },
  {
    title: "画像・音声を軽量な情報へ変換",
    body: "画像認識と音声処理を組み合わせ、建物の被害状況や被災者情報をテキスト化。低帯域のLPWAでも送れる情報量へ圧縮します。",
    image: "/images/feature-ai.webp",
    note: "※ 生成AIによる利用イメージです",
  },
];

export default function ProductPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="製品"
        title="スマホを活かして通信を復活させる、ADREN"
        lede="ADRENはスマートフォンとBLEで接続する通信モジュールです。基地局停止時にも、LPWAで端末から端末へ現場情報を中継します。"
      />

      {/* 製品名の由来。何の略か分からない名前は、読み手の中で意味のない記号のまま残る。
          5文字それぞれが製品の性質を言っているので、名前自体を説明として使う。 */}
      <section className="border-b border-line-soft px-6 py-12 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 max-w-3xl">
            <p className="mono mb-3 flex items-center gap-3 text-micro tracking-[0.2em] text-brand-accent">
              <span className="inline-block h-px w-6 bg-brand-accent" />
              製品名の由来
            </p>
            <h2 className="mincho text-3xl md:text-4xl">
              ADREN（アドレン）は、
              <br className="hidden sm:block" />
              5つの言葉の頭文字です。
            </h2>
          </div>
          <dl className="grid gap-px border border-line bg-line sm:grid-cols-5">
            {[
              ["A", "Ad-hoc", "アドホック", "基地局に頼らず、その場で端末同士がつながる"],
              ["D", "Disaster", "災害", "災害時に使われることを前提に設計する"],
              ["R", "Resilient", "途切れに強い", "一部が使えなくなっても、別の経路で運ぶ"],
              ["E", "Emergency", "緊急", "命に関わる情報を優先して届ける"],
              ["N", "Network", "ネットワーク", "端末が互いにつながり、網として働く"],
            ].map(([letter, en, ja, note]) => (
              <div key={letter} className="flex gap-4 bg-white p-5 sm:flex-col sm:gap-0">
                <p
                  aria-hidden
                  className="mincho w-8 flex-none text-4xl leading-none text-brand-accent sm:w-auto"
                >
                  {letter}
                </p>
                <div className="sm:mt-3">
                  <dt className="text-base font-medium text-ink">
                    {en}
                    <span className="ml-2 text-ink-soft">{ja}</span>
                  </dt>
                  <dd className="mt-1 text-base leading-7 text-ink-soft">{note}</dd>
                </div>
              </div>
            ))}
          </dl>
          <p className="mt-5 max-w-3xl text-body text-ink-soft">
            つなげると <strong className="font-medium text-ink">Ad-hoc Disaster-Resilient Emergency Network</strong>、
            「災害時に、その場で立ち上がる、途切れに強い緊急通信ネットワーク」という意味になります。
          </p>
        </div>
      </section>

      {/* 仕様や構成より先に「何をする物なのか」を置く。
          初めて見た人は、BLE接続の小型モジュールと言われても手元の絵が浮かばない。 */}
      <section className="border-b border-line-soft bg-paper-2 px-6 py-14 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mono mb-3 flex items-center gap-3 text-micro tracking-[0.2em] text-brand-accent">
              <span className="inline-block h-px w-6 bg-brand-accent" />
              使い方
            </p>
            <h2 className="mincho text-3xl md:text-4xl">持ち歩いて、つないで、送るだけ。</h2>
            <p className="mt-3 text-body text-ink-soft">
              専用の無線機を覚え直す必要はありません。手持ちのスマートフォンに小さな端末をつなぐだけで、
              携帯電話が使えない場所でも連絡ができるようになります。
            </p>
          </div>
          <UsageSteps />
        </div>
      </section>

      <section className="px-6 py-14 md:px-12">
        <div className="frame-ticks mx-auto max-w-6xl border border-line-soft bg-white p-8 text-center md:p-16">
          <p className="mono mb-3 text-micro tracking-[0.2em] text-ink-soft">製品イメージ</p>
          <p className="mx-auto mb-6 max-w-3xl text-body text-ink-soft">
            スマートフォンにADRENを接続し、近距離はBLE、遠距離はLoRaで中継。通信が切れた現場でも、手元のスマートフォンを災害時の通信端末として活用できます。
          </p>
          <div className="relative mx-auto aspect-[3/2] w-full max-w-4xl overflow-hidden border border-line-soft bg-paper">
            <Image
              src="/images/device.webp"
              alt="ADREN本体（通信モジュール）の外観"
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
          <p className="mt-3 text-micro text-ink-soft">
            ※ 製品デザインの3Dレンダリングです。ロゴは旧称のものを使用しています。
          </p>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12">
        <div className="mx-auto max-w-6xl space-y-10">
          {productFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="grid items-center gap-8 border-b border-line-soft pb-10 md:grid-cols-2"
            >
              <div className={index % 2 === 0 ? "order-1" : "order-2 md:order-1"}>
                <p className="mono mb-2 flex items-center gap-3 text-micro tracking-[0.2em] text-brand-accent">
                  <span className="inline-block h-px w-6 bg-brand-accent" />
                  機能 0{index + 1}
                </p>
                <h2 className="mincho mb-3 text-3xl">{feature.title}</h2>
                <p className="text-body text-ink-soft">{feature.body}</p>
              </div>
              <div className={index % 2 === 0 ? "order-2" : "order-1 md:order-2"}>
                <div className="hover-card relative aspect-[3/2] overflow-hidden border border-line-soft bg-paper">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 560px"
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 text-micro text-ink-soft">{feature.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mono mb-4 text-micro tracking-[0.2em] text-ink-soft uppercase">仕様</h2>
          <div className="frame-ticks border border-line">
            {specs.map((spec) => (
              <div
                key={spec.key}
                className="group grid border-b border-line-soft last:border-b-0 md:grid-cols-[220px_1fr]"
              >
                <div className="bg-paper-2 px-4 py-3 text-body text-ink transition-colors duration-200 group-hover:bg-line-soft">
                  {spec.key}
                </div>
                <div className="bg-white px-4 py-3 text-compact text-ink-soft transition-colors duration-200 group-hover:bg-paper group-hover:text-ink">
                  {spec.value}
                  {spec.note ? (
                    <span className="mt-1 block text-base leading-7 text-ink-soft">
                      {spec.note}
                      <Link
                        href="/#mesh"
                        className="ml-1 text-brand-accent underline underline-offset-4 hover:text-ink"
                      >
                        到達範囲の説明を見る
                      </Link>
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
