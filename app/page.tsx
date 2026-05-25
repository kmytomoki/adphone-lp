import { ArchSvg } from "@/components/site/ArchSvg";
import { FinalCta } from "@/components/site/FinalCta";
import { GhostButton, PrimaryButton } from "@/components/site/Buttons";
import { SectionHead } from "@/components/site/SectionHead";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="px-6 py-18 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <p className="mono mb-6 flex items-center gap-3 text-[11px] tracking-[0.25em] text-brand-accent uppercase">
              <span className="inline-block h-px w-8 bg-brand-accent" />
              DISASTER COMMUNICATION SYSTEM
            </p>
            <h1 className="mincho mb-8 text-4xl leading-tight md:text-6xl">
              通信が途絶えた、
              <br />
              その先の<em className="not-italic text-brand-accent">「伝える」</em>を。
            </h1>
            <p className="mb-10 max-w-xl text-sm leading-8 text-ink-soft md:text-base">
              通信インフラが途絶えた被災地でも、安否・物資・危険情報をつなぎ続ける。アドフォンは、スマホを活かして現場の情報を止めない災害時通信基盤です。
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href="/contact">資料を請求する</PrimaryButton>
              <GhostButton href="/technology">仕組みを見る</GhostButton>
            </div>
          </div>
          <aside className="border border-line-soft bg-white p-8">
            <p className="mono mb-6 text-[10px] tracking-[0.2em] text-ink-soft">{"// SYSTEM_STATUS_v2.4"}</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["RANGE", "3+", "km"],
                ["UPTIME", "72", "h"],
                ["ERROR", "<1", "%"],
                ["COMPRESS", "1/1000", ""],
              ].map(([label, value, unit]) => (
                <div key={label} className="border border-line-soft bg-paper p-4">
                  <p className="mono mb-2 text-[10px] tracking-[0.2em] text-ink-soft">{label}</p>
                  <p className="mincho text-3xl leading-none">
                    {value}
                    <span className="ml-1 text-base font-sans text-ink-soft">{unit}</span>
                  </p>
                </div>
              ))}
            </div>
            <p className="mono mt-6 border-t border-line-soft pt-4 text-[10px] tracking-[0.15em] text-ink-soft">
              FIELD_TEST_ACTIVE / REWAVE DCON
            </p>
          </aside>
        </div>
      </section>

      <section className="border-y border-line-soft bg-paper-2 px-6 py-12 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[240px_1fr] md:items-center">
          <p className="mono text-[10px] tracking-[0.25em] text-ink-soft uppercase">
            <strong className="block text-[11px] text-ink">研究・実証パートナー</strong>
            RESEARCH & VALIDATION
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {["KRIS Lab", "電子情報通信学会", "JST 採択", "自治体 A", "自治体 B"].map((name) => (
              <div key={name} className="border-l border-line pl-4 text-sm text-ink-soft">
                <p className="mono text-[9px] tracking-[0.15em] opacity-70">PARTNER</p>
                <p className="mincho">{name}</p>
              </div>
            ))}
          </div>
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
              <article key={title} className="border border-line-soft bg-white p-7">
                <p className="mono mb-5 text-[11px] tracking-[0.2em] text-brand-accent">PROBLEM 0{index + 1}</p>
                <h3 className="mincho mb-4 text-xl leading-snug">{title}</h3>
                <p className="text-sm leading-7 text-ink-soft">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-6 py-20 text-white md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl">
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
          <p className="mt-6 max-w-4xl text-sm leading-8 text-white/75">
            アドフォンは、スマホとBLEで接続する小型通信モジュールです。近距離はBLE、遠距離はLPWA
            (LoRa 920MHz)で中継し、ノード間をバケツリレー式に接続。基地局が使えない環境でも、情報を次のノードへ確実に届けます。
          </p>
          <div className="mt-10 border border-white/10 bg-white/5 p-4 md:p-8">
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
              "スマホを災害時通信端末に拡張",
              "3ステップで使えるシンプルUI",
              "完全オフラインでチャット・地図・カメラ",
              "信頼度スコアで情報の真偽を選別",
            ].map((feature, index) => (
              <article key={feature} className="bg-paper p-8">
                <p className="mono mb-3 text-[11px] tracking-[0.2em] text-brand-accent">F.0{index + 1}</p>
                <h3 className="mincho mb-3 text-2xl">{feature}</h3>
                <p className="text-sm leading-7 text-ink-soft">
                  DCON資料で実証した通信性・運用性をベースに、現場で使える実装へ最適化。非エンジニアでも扱える操作性と、技術的信頼性を両立します。
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
