import Link from "next/link";
import Image from "next/image";
import { ArchSvg } from "@/components/site/ArchSvg";
import { FinalCta } from "@/components/site/FinalCta";
import { GhostButton, PrimaryButton } from "@/components/site/Buttons";
import { SectionHead } from "@/components/site/SectionHead";
import { AUDIENCE_OPTIONS, TRUST_AWARDS, contactHref } from "@/lib/site";

const existingSystems = [
  {
    name: "防災行政無線",
    role: "住民へ避難情報や警報を一斉に周知する",
    complement: "周知後の避難所・現場・災害対策本部間で、個別情報を双方向に共有する",
  },
  {
    name: "衛星電話",
    role: "限られた拠点間で音声連絡を確保する",
    complement: "複数のスマートフォンから安否・物資・危険情報を集め、端末間で中継する",
  },
  {
    name: "安否確認サービス",
    role: "インターネット接続時に従業員や関係者へ一斉確認する",
    complement: "基地局が使えない時間帯に、事業所や現場の端末間通信を補完する",
  },
];

const implementationSteps = [
  {
    title: "対象業務を決める",
    body: "避難所間連絡、事業所の安否確認、既存システム連携など、通信を残したい業務と場所を整理します。",
    output: "対象シナリオ・拠点・評価項目",
  },
  {
    title: "小規模に実証する",
    body: "数拠点で通信距離、建物や地形の影響、担当者の操作手順を確認し、導入判断に必要な記録を残します。",
    output: "通信結果・運用課題・改善案",
  },
  {
    title: "訓練と運用に組み込む",
    body: "既存の防災訓練やBCP手順と接続し、保管、点検、担当交代を含む継続運用を設計します。",
    output: "運用手順・訓練計画・配備案",
  },
];

const faqs = [
  {
    question: "既存の防災行政無線や衛星電話を置き換える製品ですか？",
    answer:
      "置き換えを前提としていません。ADRENは、既存手段では集めにくい避難所・事業所・現場の個別情報を、通信断時にも端末間で届ける補完レイヤーです。",
  },
  {
    question: "インターネットが完全に使えない状態でも利用できますか？",
    answer:
      "事前に端末へ保存した地図・避難所データを使い、BLEとLoRaによる中継、チャット、地図表示、避難経路探索を継続する設計です。利用地域のデータと運用設定は平常時に準備します。",
  },
  {
    question: "企業のBCPや工場・店舗でも相談できますか？",
    answer:
      "相談できます。本社と事業所、工場、店舗などの通信確保や、既存の安否確認サービスが使えない時間帯の補完を想定し、対象拠点に合わせて実証内容を整理します。",
  },
  {
    question: "既存の防災サービスとの連携や共同実証は可能ですか？",
    answer:
      "可能です。防災情報システム、訓練サービス、通信機器などとの接続を想定し、データ連携範囲、役割分担、検証項目からご相談を承ります。",
  },
  {
    question: "現在の開発・検証段階を教えてください。",
    answer:
      "現在は開発中のプロトタイプです。屋外実験で1km以上の通信を確認していますが、第三者検証は未実施です。導入前に利用環境での実証と運用確認を行う前提でご案内します。",
  },
];

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
            <p className="fade-up mono mb-6 flex items-center gap-3 text-micro tracking-[0.25em] text-brand-accent">
              <span className="inline-block h-px w-8 bg-brand-accent" />
              災害時通信システム
            </p>
            <h1 className="fade-up fade-up-1 mincho mb-8 text-4xl leading-tight md:text-6xl">
              通信が途絶えても、
              <br />
              現場の<em className="not-italic text-brand-accent">情報</em>を止めない。
            </h1>
            <p className="fade-up fade-up-2 mb-6 max-w-xl border-l-2 border-brand-accent pl-4 text-lede font-medium text-ink">
              携帯電話が使えない時間帯に、避難所・事業所・現場をつなぐオフライン通信システムです。
            </p>
            <p className="fade-up fade-up-2 mb-10 max-w-xl text-body text-ink-soft">
              ADREN（アドレン）は、スマートフォンと小型通信モジュールを活用し、安否・物資・危険情報を端末から端末へ中継します。自治体、企業、防災事業者の既存体制に追加できる災害時通信基盤です。
            </p>
            <div className="fade-up fade-up-3 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href="/document">資料を見る（登録不要）</PrimaryButton>
              <GhostButton href="/contact">立場を選んで相談する</GhostButton>
            </div>
          </div>
          <aside
            aria-labelledby="audience-heading"
            className="fade-up fade-up-4 frame-ticks border border-line-soft bg-white p-6 shadow-[8px_8px_0_0_rgba(26,31,46,0.06)] md:p-8"
          >
            <p className="mono mb-2 text-micro tracking-[0.2em] text-brand-accent">立場から</p>
            <h2 id="audience-heading" className="mincho mb-2 text-2xl">
              立場から探す
            </h2>
            <p className="mb-6 text-body text-ink-soft">検討内容に合わせて、相談フォームへ進めます。</p>
            <div className="space-y-3">
              {AUDIENCE_OPTIONS.map((audience) => (
                <Link
                  key={audience.subject}
                  href={contactHref(audience.subject)}
                  className="group block border border-line-soft bg-paper p-4 transition-colors hover:border-brand-accent hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="mincho text-xl transition-colors group-hover:text-brand-accent">
                      {audience.label}
                    </span>
                    <span aria-hidden className="text-brand-accent">
                      →
                    </span>
                  </span>
                  <span className="mt-1 block text-base leading-7 text-ink-soft">{audience.description}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            label="課題"
            title={
              <>
                災害時、
                <br />
                通信は<em className="not-italic text-brand-accent">真っ先に</em>失われる。
              </>
            }
            lede="基地局の停止、輻輳、停電。これらは過去の災害で繰り返し起きてきました。自治体や企業の災害対応において、通信の確保は依然として未解決の課題です。"
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
            ].map(([title, body]) => (
              <article key={title} className="hover-card hover-card-accent border border-line-soft bg-white p-7">
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
            label="解決策"
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
            label="既存手段との関係"
            title={
              <>
                置き換えず、
                <br />
                <em className="not-italic text-brand-accent">通信断の隙間</em>を補う。
              </>
            }
            lede="ADRENは既存の防災・BCP手段と競合させるのではなく、それぞれが届きにくい現場の個別情報を補完します。"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {existingSystems.map((system) => (
              <article key={system.name} className="border border-line-soft bg-white p-6">
                <p className="mono mb-2 text-micro tracking-[0.18em] text-ink-soft">既存手段</p>
                <h3 className="mincho text-2xl">{system.name}</h3>
                <div className="mt-5 border-t border-line-soft pt-5">
                  <p className="mb-1 text-base font-medium text-ink">主な役割</p>
                  <p className="text-body text-ink-soft">{system.role}</p>
                </div>
                <div className="mt-5 border-l-2 border-brand-accent bg-paper p-4">
                  <p className="mb-1 text-base font-medium text-ink">ADRENが補う範囲</p>
                  <p className="text-body text-ink-soft">{system.complement}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-base leading-7 text-ink-soft">
            ※ 実際の構成は、既存設備、対象地域、運用体制を確認したうえで個別に設計します。
          </p>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            label="特長"
            title={
              <>
                災害対応を、
                <br />
                支える<em className="not-italic text-brand-accent">4つの</em>特長。
              </>
            }
            lede="単なる通信技術ではなく、自治体・企業・防災事業者の既存フローに組み込めるよう設計しています。導入から運用までを見据えた製品です。"
          />
          <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-2">
            {[
              [
                "スマホを災害時通信端末に拡張",
                "住民や現場担当者が既に持っているスマートフォンに通信モジュールをBLEで接続し、そのまま中継ノードとして使います。専用端末を人数分配備する必要がありません。",
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
            ].map(([feature, body]) => (
              <article key={feature} className="group bg-paper p-8 transition-colors duration-300 hover:bg-white">
                <h3 className="mincho mb-3 text-2xl">{feature}</h3>
                <p className="text-body text-ink-soft">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line-soft bg-paper-2 px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            label="導入の進め方"
            title={
              <>
                小さく確かめ、
                <br />
                運用へつなげる。
              </>
            }
            lede="製品を置くだけでは、災害時には使えません。対象業務を絞った実証から始め、訓練と保守まで段階的に設計します。"
          />
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {implementationSteps.map((step, index) => (
              <li key={step.title} className="frame-ticks border border-line-soft bg-white p-7">
                <p className="mono text-micro tracking-[0.2em] text-brand-accent">ステップ {index + 1}</p>
                <h3 className="mincho mt-3 text-2xl">{step.title}</h3>
                <p className="mt-3 text-body text-ink-soft">{step.body}</p>
                <div className="mt-5 border-t border-line-soft pt-4">
                  <p className="text-base font-medium text-ink">確認する成果物</p>
                  <p className="mt-1 text-base leading-7 text-ink-soft">{step.output}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-line-soft bg-paper px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            label="開発と実証"
            title={
              <>
                現場で検証を重ね、
                <em className="not-italic text-brand-accent">公開できる範囲</em>で示す。
              </>
            }
            lede="沖縄工業高等専門学校発のチームが、プロトタイプの実装・屋外実験・コンテスト評価を積み重ねています。数値や受賞内容は主催者発表に基づき、裏取りできる形で掲載しています。"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="relative aspect-[883/554] overflow-hidden border border-line-soft bg-paper">
                <Image
                  src="/images/team-okinawa.webp"
                  alt="沖縄工業高等専門学校の正門前に並ぶチームRewaveのメンバー"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="pointer-events-none object-cover select-none"
                />
              </div>
              <p className="mt-2 text-micro text-ink-soft">沖縄工業高等専門学校にて</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  src: "/images/device.webp",
                  alt: "ADREN本体（通信モジュール）の外観",
                  note: "通信モジュール本体",
                },
                {
                  src: "/images/app-map.webp",
                  alt: "ADRENアプリのオフライン地図画面",
                  note: "オフライン地図（実画面）",
                },
                {
                  src: "/images/app-route.webp",
                  alt: "ADRENアプリの避難ルート案内画面",
                  note: "避難ルート案内（実画面）",
                },
              ].map((item) => (
                <figure key={item.src} className="border border-line-soft bg-white p-3">
                  <div className="relative aspect-[4/3] overflow-hidden bg-paper">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="280px"
                      className="pointer-events-none object-cover select-none"
                    />
                  </div>
                  <figcaption className="mt-2 text-micro text-ink-soft">{item.note}</figcaption>
                </figure>
              ))}
              <Link
                href="/about"
                className="group relative z-10 flex min-h-44 flex-col justify-center border border-line-soft bg-white p-5 transition-colors hover:border-brand-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
              >
                <p className="text-base font-medium text-ink">現在の段階</p>
                <p className="mt-2 text-body text-ink-soft">
                  開発中のプロトタイプです。屋外実験で1km以上の通信を確認していますが、第三者検証は未実施です。
                </p>
                <span className="mt-4 inline-flex min-h-11 items-center text-base font-medium text-brand-accent group-hover:text-ink">
                  会社情報・沿革を見る →
                </span>
              </Link>
            </div>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {TRUST_AWARDS.map((award) => (
              <li key={award.title} className="border border-line-soft bg-white p-5">
                <p className="mono text-micro tracking-[0.15em] text-brand-accent">{award.year}</p>
                <p className="mincho mt-2 text-xl">{award.title}</p>
                <a
                  href={award.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mono mt-3 inline-block text-micro tracking-[0.15em] text-ink-soft underline underline-offset-4 hover:text-brand-accent"
                >
                  主催者発表ページ ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            label="よくある質問"
            title="導入検討で、よくある質問。"
            lede="現段階でお伝えできる範囲を明確にしています。利用環境により変わる内容は、実証前に個別確認します。"
          />
          <div className="mt-10 border-t border-line">
            {faqs.map((item) => (
              <details key={item.question} className="group border-b border-line">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent">
                  <span className="mincho text-xl leading-8 text-ink">{item.question}</span>
                  <span
                    aria-hidden
                    className="text-2xl leading-none text-brand-accent transition-transform group-open:rotate-45"
                  >
                    ＋
                  </span>
                </summary>
                <p className="max-w-4xl pb-6 pr-10 text-body text-ink-soft">{item.answer}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-body text-ink-soft">
            その他の条件は、<Link href="/contact" className="underline underline-offset-4 hover:text-brand-accent">導入・実証・共創の相談窓口</Link>
            からお問い合わせください。
          </p>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
