import type { Metadata } from "next";
import Image from "next/image";
import { FinalCta } from "@/components/site/FinalCta";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Rewave Technologyについて",
  description:
    "災害時オフライン通信ADREN（アドレン）を開発する、沖縄工業高等専門学校発Rewave Technologyのミッション、チーム、受賞実績です。",
};

// 受賞歴には必ず主催者側の発表ページを添える。裏取りできる形にしておくことが信用に直結する。
const timeline = [
  {
    year: "2025.06",
    text: "チーム「Rewave」結成。通信途絶課題に対するLoRa通信システムの研究開発を開始",
    href: null,
  },
  {
    year: "2025.12",
    text: "第4回高専防災減災コンテスト 最優秀賞",
    href: "https://www.bosai.go.jp/kosencon/contest_2025.html",
  },
  {
    year: "2026.02",
    text: "第3回高専起業家サミット 最優秀賞 (スタートアップ部門)",
    href: "https://startup.gekkan-kosen.com/report/3rd_2025/",
  },
  { year: "2026.03", text: "WiCON2025 最優秀賞", href: "https://wicon.jp/2025/final" },
  { year: "2026.05", text: "DCON2026 準優勝", href: "https://dcon.ai/results/" },
];

const achievements = [
  {
    year: "2026.05",
    title: "DCON2026 準優勝",
    detail:
      "全国高専ディープラーニングコンテストで準優勝。審査員による想定企業評価額は4億円と評価された。",
    href: "https://dcon.ai/results/",
    highlight: true,
  },
  {
    year: "2025.12",
    title: "第4回高専防災減災コンテスト 最優秀賞",
    detail: "災害時通信の課題解決アプローチと実装検証が評価され、最優秀賞を受賞。",
    href: "https://www.bosai.go.jp/kosencon/contest_2025.html",
    highlight: false,
  },
  {
    year: "2026.02-03",
    title: "高専起業家サミット / WiCON2025 最優秀賞",
    detail: "起業性と技術性の両面で連続受賞し、プロトタイプから事業化フェーズへ進んだ。",
    href: "https://startup.gekkan-kosen.com/report/3rd_2025/",
    highlight: false,
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="会社情報"
        title="Rewave: 高専生発の技術を社会実装へ"
        lede="私たちは沖縄工業高等専門学校のチーム Rewave。災害時の通信空白という社会課題に対し、研究・開発・実証を一体で進めています。"
      />

      <section className="px-6 py-14 md:px-12">
        <div className="frame-ticks mx-auto max-w-6xl border-l-4 border-ink bg-paper-2 p-8">
          <h2 className="mincho mb-3 text-3xl">ミッション</h2>
          <p className="max-w-4xl text-body text-ink-soft">
            「通信の空白地帯を消す」を掲げ、災害時に使えなくなるスマホを再び情報インフラに変える。教育機関発のプロトタイプで終わらせず、自治体導入まで見据えた事業化を目指します。
          </p>
        </div>
      </section>

      <section className="px-6 pb-14 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mincho mb-4 text-3xl">ADRENが生まれた背景</h2>
            <p className="text-body text-ink-soft">
              東日本大震災や能登半島地震で顕在化した通信途絶の課題に対し、私たちは「72時間の壁」を越える前に情報を届ける手段が必要だと考えました。Rewaveは高専で培った通信・AI・ソフトウェア技術を統合し、現場で機能する災害支援基盤を構築しています。
            </p>
          </div>
          <div>
            <div className="relative aspect-[3/2] overflow-hidden border border-line-soft bg-paper">
              <Image
                src="/images/about-story.webp"
                alt="沖縄の港町の上空にメッシュネットワークが広がるイメージ図"
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-micro text-ink-soft">※ 生成AIによるイメージ図です</p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-14 md:px-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mincho mb-6 text-3xl">チーム</h2>
          <div className="mb-8">
            <div className="relative aspect-[883/554] w-full overflow-hidden border border-line-soft bg-paper">
              <Image
                src="/images/team-okinawa.webp"
                alt="沖縄工業高等専門学校の正門前に並ぶチームRewaveのメンバー"
                fill
                sizes="(max-width: 768px) 100vw, 1152px"
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-micro text-ink-soft">沖縄工業高等専門学校にて</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["通信システム", "LoRa/BLE ネットワーク設計・実装"],
              ["AI・データ", "YOLO推論・信頼度評価アルゴリズム"],
              ["アプリ開発", "UX設計・オフライン機能実装"],
            ].map(([member, role]) => (
              <article key={member} className="hover-card border border-line-soft bg-white p-6">
                <p className="mono mb-2 text-micro tracking-[0.15em] text-ink-soft">チーム</p>
                <h3 className="mincho text-xl">{member}</h3>
                <p className="mt-2 text-body text-ink-soft">{role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mincho mb-6 text-3xl">沿革・実績</h2>
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            {achievements.map((item) => (
              <article
                key={item.title}
                className={
                  item.highlight
                    ? "hover-card hover-card-accent frame-ticks border-2 border-brand-accent bg-white p-5"
                    : "hover-card border border-line-soft bg-white p-5"
                }
              >
                <p className="mono mb-2 text-micro tracking-[0.15em] text-brand-accent">{item.year}</p>
                <h3 className={item.highlight ? "mincho text-2xl text-brand-accent" : "mincho text-xl text-ink"}>
                  {item.title}
                </h3>
                <p className="mt-2 text-body text-ink-soft">{item.detail}</p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mono mt-3 inline-block text-micro tracking-[0.15em] text-ink-soft underline underline-offset-4 hover:text-brand-accent"
                >
                  主催者発表ページ ↗
                </a>
              </article>
            ))}
          </div>
          <div className="border-l-2 border-ink pl-6">
            {timeline.map((item) => (
              <div key={item.year} className="group relative mb-5">
                <span className="absolute top-1.5 -left-[31px] h-2 w-2 rounded-full border border-ink bg-paper transition-colors duration-200 group-hover:border-brand-accent group-hover:bg-brand-accent" />
                <p className="mono text-micro tracking-[0.15em] text-ink-soft">{item.year}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-body text-ink underline underline-offset-4 hover:text-brand-accent"
                  >
                    {item.text} ↗
                  </a>
                ) : (
                  <p className="text-body text-ink">{item.text}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
