import { FinalCta } from "@/components/site/FinalCta";
import { PageHero } from "@/components/site/PageHero";

const specs = [
  ["通信方式", "LoRa (920MHz帯 LPWA) + BLE ハイブリッド"],
  ["想定通信距離", "1km以上 (実験) / 3km以上 (シミュレーション)"],
  ["低消費電力", "LPWAベースで小容量データを長距離伝送"],
  ["セキュリティ", "X25519 (ECDH) / AES-256-GCM / Ed25519"],
  ["データ圧縮", "マルチモーダルAI処理により最大 1/1000 圧縮"],
  ["対応端末", "スマートフォン (BLE接続), iOS / Android"],
];

export default function ProductPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="PRODUCT"
        title="スマホを活かして通信を復活させる、AdPhone"
        lede="AdPhoneはスマホとBLE接続して使う通信モジュールです。基地局ダウン時でも、LPWAのバケツリレー通信で現場情報を届けます。"
      />

      <section className="px-6 py-14 md:px-12">
        <div className="mx-auto max-w-6xl border border-line-soft bg-white p-8 text-center md:p-16">
          <p className="mono mb-3 text-[11px] tracking-[0.2em] text-ink-soft">PRODUCT VISUAL</p>
          <p className="mx-auto mb-6 max-w-3xl text-sm leading-8 text-ink-soft">
            スマートフォンにAdPhoneを接続し、近距離はBLE、遠距離はLoRaで中継。通信が切れた現場でも、既存スマホ資産をそのまま災害通信ノードとして活用できます。
          </p>
          <div className="paper-grid mx-auto h-72 w-full border border-line-soft bg-paper md:h-96" />
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12">
        <div className="mx-auto max-w-6xl space-y-10">
          {[
            "情報のデジタル化 (AI崩壊度判定)",
            "オフライン地図 (危険情報の可視化)",
            "緊急メッセージ送信 (アドホック中継)",
          ].map((title, index) => (
            <div
              key={title}
              className="grid items-center gap-8 border-b border-line-soft pb-10 md:grid-cols-2"
            >
              <div className={index % 2 === 0 ? "order-1" : "order-2 md:order-1"}>
                <p className="mono mb-2 text-[11px] tracking-[0.2em] text-brand-accent">機能 0{index + 1}</p>
                <h2 className="mincho mb-3 text-3xl">{title}</h2>
                <p className="text-sm leading-8 text-ink-soft">
                  {index === 0
                    ? "画像認識 (YOLOv11) と音声処理を組み合わせ、建物崩壊度や被災者属性をテキスト化。重いデータを圧縮し、LPWAでも送信可能な形に変換します。"
                    : index === 1
                      ? "住民投稿や被害報告をオフライン地図に即時反映。ネット断でも避難所・危険箇所・支援導線を共有し、現場判断を支えます。"
                      : "送り先を選んで送信するだけで、ノード間のバケツリレーで自動配送。基地局不要で安否・要請メッセージを広域に届けます。"}
                </p>
              </div>
              <div className={index % 2 === 0 ? "order-2" : "order-1 md:order-2"}>
                <div className="paper-grid h-56 border border-line-soft bg-paper md:h-72" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mono mb-4 text-[12px] tracking-[0.2em] text-ink-soft uppercase">仕様</h2>
          <div className="border border-line">
            {specs.map(([key, value]) => (
              <div key={key} className="grid border-b border-line-soft last:border-b-0 md:grid-cols-[220px_1fr]">
                <div className="bg-paper-2 px-4 py-3 text-sm text-ink">{key}</div>
                <div className="bg-white px-4 py-3 text-sm text-ink-soft">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
