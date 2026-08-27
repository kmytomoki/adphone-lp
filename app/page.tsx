import { ArchSvg } from "@/components/site/ArchSvg";
import { FinalCta } from "@/components/site/FinalCta";
import { GhostButton, PrimaryButton } from "@/components/site/Buttons";
import { SectionHead } from "@/components/site/SectionHead";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden px-6 py-18 md:px-12 md:py-28">
        {/* Decorative layers */}
        <div
          aria-hidden
          className="paper-grid absolute inset-0 [mask-image:linear-gradient(115deg,black,transparent_60%)]"
        />
        <p
          aria-hidden
          className="mono pointer-events-none absolute top-1/2 right-2 hidden -translate-y-1/2 text-micro tracking-[0.5em] text-ink/25 select-none lg:block"
          style={{ writingMode: "vertical-rl" }}
        >
          災害時通信基盤 ── ADREN / AD-HOC DISASTER-RESILIENT EMERGENCY NETWORK
        </p>
        <p
          aria-hidden
          className="text-outline mono pointer-events-none absolute -bottom-8 -left-2 text-[18vw] leading-none font-semibold tracking-tight whitespace-nowrap uppercase select-none md:text-[10rem]"
        >
          ADREN
        </p>

        <div className="relative mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <p className="fade-up mono mb-6 flex items-center gap-3 text-micro tracking-[0.25em] text-brand-accent uppercase">
              <span className="inline-block h-px w-8 bg-brand-accent" />
              DISASTER COMMUNICATION SYSTEM
            </p>
            <h1 className="fade-up fade-up-1 mincho mb-8 text-4xl leading-tight md:text-6xl">
              通信が途絶えた、
              <br />
              その先の<em className="not-italic text-brand-accent">「伝える」</em>を。
            </h1>
            {/* H1 は情緒的なコピーなので、直下の1行で「誰向けの何か」を言い切る。 */}
            <p className="fade-up fade-up-2 mb-6 max-w-xl border-l-2 border-brand-accent pl-4 text-lede font-medium text-ink">
              自治体の防災担当者向け。基地局が停止しても、避難所と現場の情報伝達を続けるオフライン通信システムです。
            </p>
            <p className="fade-up fade-up-2 mb-10 max-w-xl text-body text-ink-soft">
              通信インフラが途絶えた被災地でも、安否・物資・危険情報をつなぎ続ける。ADREN（アドレン）は、スマホを活かして現場の情報を止めない災害時通信基盤です。
            </p>
            <div className="fade-up fade-up-3 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href="/document">資料を見る（登録不要）</PrimaryButton>
              <GhostButton href="/contact">導入について相談する</GhostButton>
            </div>
          </div>
          <aside className="fade-up fade-up-4 frame-ticks border border-line-soft bg-white p-8 shadow-[8px_8px_0_0_rgba(26,31,46,0.06)]">
            <p className="mono mb-6 text-micro tracking-[0.2em] text-ink-soft">{"// 開発中の実験値"}</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["通信距離", "1", "km以上", "屋外実験時"],
                ["データ圧縮", "1/1000", "", "最大値"],
              ].map(([label, value, unit, note]) => (
                <div
                  key={label}
                  className="group border border-line-soft bg-paper p-4 transition-colors duration-300 hover:border-brand-accent"
                >
                  <p className="mono mb-2 text-micro tracking-[0.2em] text-ink-soft">{label}</p>
                  <p className="mincho text-3xl leading-none transition-colors duration-300 group-hover:text-brand-accent">
                    {value}
                    <span className="ml-1 font-sans text-base text-ink-soft">{unit}</span>
                  </p>
                  <p className="mt-1 text-micro text-ink-soft">{note}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 border-t border-line-soft pt-4 text-micro leading-6 text-ink-soft">
              いずれも開発中プロトタイプでの測定値です。第三者検証は受けていません。
            </p>
          </aside>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            label="PROBLEM / 02"
            title={
              <>
                災害時、
                <br />
                通信は<em className="not-italic text-brand-accent">真っ先に</em>失われる。
              </>
            }
            lede="基地局の停止、輻輳、停電。これらは過去の災害で繰り返し起きてきました。自治体の災害対応において、通信の確保は依然として未解決の課題です。"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              [
                "東日本大震災で通信網が大規模停止",
                "総務省データでは、移動通信 14,800局以上が停止し、固定電話は100万回線以上が不通。災害時に最も必要な通信が失われる現実がある。",
              ],
              [
                "能登半島地震でも通信途絶エリアが発生",
                "技術が進んだ現在でも、広域災害では通信途絶エリアが発生。孤立地域の情報収集が遅れ、初動判断に大きな遅延を生む。",
              ],
              [
                "発災後72時間は人命救助の分岐点",
                "72時間の壁を越える前に、現場状況を確実に届ける必要がある。通信断の時間は、そのまま救助可能性の低下につながる。",
              ],
            ].map(([title, body], index) => (
              <article key={title} className="hover-card hover-card-accent border border-line-soft bg-white p-7">
                <p className="mono mb-5 flex items-baseline justify-between text-micro tracking-[0.2em] text-brand-accent">
                  PROBLEM 0{index + 1}
                  <span className="mincho text-4xl leading-none text-line">0{index + 1}</span>
                </p>
                <h3 className="mincho mb-4 text-xl leading-snug">{title}</h3>
                <p className="text-body text-ink-soft">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink px-6 py-20 text-white md:px-12 md:py-28">
        <div
          aria-hidden
          className="paper-grid-dark absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
        />
        <div className="relative mx-auto max-w-6xl">
          <SectionHead
            dark
            label="SOLUTION / 03"
            title={
              <>
                回線に依存しない、
                <br />
                独立した通信レイヤー。
              </>
            }
            lede="スマートフォン同士をBLEで束ね、LoRaゲートウェイ経由で広域メッシュを形成。電話網が機能しなくても避難所間の情報伝達を維持します。"
          />
          <p className="mt-6 max-w-4xl text-body text-white/75">
            ADRENは、スマホとBLEで接続する小型通信モジュールです。近距離はBLE、遠距離はLPWA
            (LoRa 920MHz)で中継し、ノード間をバケツリレー式に接続。基地局が使えない環境でも、情報を次のノードへ確実に届けます。
          </p>
          <div className="frame-ticks frame-ticks-light mt-10 border border-white/10 bg-white/5 p-4 md:p-8">
            <ArchSvg dark />
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            label="FEATURES / 04"
            title={
              <>
                自治体運用を、
                <br />
                支える<em className="not-italic text-brand-accent">4つの</em>特長。
              </>
            }
            lede="単なる通信技術ではなく、自治体の災害対応フローに組み込めるよう設計しています。導入から運用までを見据えた製品です。"
          />
          <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-2">
            {[
              [
                "スマホを災害時通信端末に拡張",
                "住民が既に持っているスマートフォンに通信モジュールをBLEで接続し、そのまま中継ノードとして使います。専用端末を人数分配備する必要がありません。",
              ],
              [
                "高齢者も子供も使えるUI",
                "本文16px以上、見出し20px以上を全画面で確保し、操作を必要最小限の手数に絞りました。平常時に訓練していない住民が、その場で使えることを前提に設計しています。",
              ],
              [
                "完全オフラインでチャット・地図・カメラ",
                "避難所・道路データと防災情報を端末内に保持し、通信が一切ない状態でも地図表示と避難経路探索が動作します。撮影した画像も端末内で処理します。",
              ],
              [
                "信頼度スコアで情報の真偽を選別",
                "新しい情報ほど重みを高くする時間減衰と、公式機関か一般投稿かによる発信者重みでスコア化。類似する情報は統合し、大きく乖離した情報は分離して表示します。",
              ],
            ].map(([feature, body], index) => (
              <article key={feature} className="group bg-paper p-8 transition-colors duration-300 hover:bg-white">
                <p className="mono mb-3 flex items-center gap-3 text-micro tracking-[0.2em] text-brand-accent">
                  F.0{index + 1}
                  <span className="inline-block h-px w-0 bg-brand-accent transition-all duration-300 group-hover:w-8" />
                </p>
                <h3 className="mincho mb-3 text-2xl">{feature}</h3>
                <p className="text-body text-ink-soft">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
