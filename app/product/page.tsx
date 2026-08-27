import type { Metadata } from "next";
import Image from "next/image";
import { FinalCta } from "@/components/site/FinalCta";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "製品概要",
  description:
    "スマートフォン、BLE、LoRaを組み合わせ、通信断時にも安否・物資・危険情報を端末間で届けるADREN（アドレン）の製品概要です。",
};

const specs = [
  ["通信方式", "LoRa (920MHz帯 LPWA) + BLE ハイブリッド"],
  ["通信距離", "1km以上 (屋外実験時) / 3km以上 (シミュレーション値)"],
  ["低消費電力", "LPWAベースで小容量データを長距離伝送"],
  ["セキュリティ (LPWA区間)", "X25519 (ECDH) で鍵交換 / AES-256-GCM で暗号化 / Ed25519 で署名"],
  ["データ圧縮", "マルチモーダルAI処理により最大 1/1000 (条件により変動)"],
  ["対応端末", "スマートフォン (BLE接続), iOS / Android"],
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

      <section className="px-6 py-14 md:px-12">
        <div className="frame-ticks mx-auto max-w-6xl border border-line-soft bg-white p-8 text-center md:p-16">
          <p className="mono mb-3 text-micro tracking-[0.2em] text-ink-soft">製品イメージ</p>          <p className="mx-auto mb-6 max-w-3xl text-body text-ink-soft">
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
            {specs.map(([key, value]) => (
              <div
                key={key}
                className="group grid border-b border-line-soft last:border-b-0 md:grid-cols-[220px_1fr]"
              >
                <div className="bg-paper-2 px-4 py-3 text-body text-ink transition-colors duration-200 group-hover:bg-line-soft">
                  {key}
                </div>
                <div className="bg-white px-4 py-3 text-body text-ink-soft transition-colors duration-200 group-hover:bg-paper group-hover:text-ink">
                  {value}
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
