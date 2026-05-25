import { FinalCta } from "@/components/site/FinalCta";
import { PageHero } from "@/components/site/PageHero";

const timeline = [
  ["2025.06", "チーム「Rewave」結成。通信途絶課題に対するLoRa通信システムの研究開発を開始"],
  ["2025.12", "第4回高専防災減災コンテスト 最優秀賞"],
  ["2026.02", "第3回高専起業家サミット 最優秀賞 (スタートアップ部門)"],
  ["2026.03", "WiCON2025 最優秀賞"],
  ["2026.05", "DCON2026 総合2位・企業評価額4億円"],
];

const achievements = [
  {
    year: "2026.05",
    title: "DCON2026 総合2位",
    detail: "企業評価額4億円を獲得。AdPhoneの技術性・社会実装性・事業性が総合的に評価された。",
    highlight: true,
  },
  {
    year: "2025.12",
    title: "第4回高専防災減災コンテスト 最優秀賞",
    detail: "災害時通信の課題解決アプローチと実装検証が評価され、最優秀賞を受賞。",
    highlight: false,
  },
  {
    year: "2026.02-03",
    title: "高専起業家サミット / WiCON2025 最優秀賞",
    detail: "起業性と技術性の両面で連続受賞し、プロトタイプから事業化フェーズへの進展を証明。",
    highlight: false,
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="ABOUT"
        title="Rewave: 高専生発の技術を社会実装へ"
        lede="私たちは沖縄工業高等専門学校のチーム Rewave。災害時の通信空白という社会課題に対し、研究・開発・実証を一体で進めています。"
      />

      <section className="px-6 py-14 md:px-12">
        <div className="mx-auto max-w-6xl border-l-4 border-ink bg-paper-2 p-8">
          <h2 className="mincho mb-3 text-3xl">ミッション</h2>
          <p className="max-w-4xl text-sm leading-8 text-ink-soft">
            「通信の空白地帯を消す」を掲げ、災害時に使えなくなるスマホを再び情報インフラに変える。教育機関発のプロトタイプで終わらせず、自治体導入まで見据えた事業化を目指します。
          </p>
        </div>
      </section>

      <section className="px-6 pb-14 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mincho mb-4 text-3xl">アドフォンが生まれた背景</h2>
            <p className="text-sm leading-8 text-ink-soft">
              東日本大震災や能登半島地震で顕在化した通信途絶の課題に対し、私たちは「72時間の壁」を越える前に情報を届ける手段が必要だと考えました。Rewaveは高専で培った通信・AI・ソフトウェア技術を統合し、現場で機能する災害支援基盤を構築しています。
            </p>
          </div>
          <div className="paper-grid h-72 border border-line-soft bg-paper" />
        </div>
      </section>

      <section className="px-6 pb-14 md:px-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mincho mb-6 text-3xl">チーム</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["通信システム", "LoRa/BLE ネットワーク設計・実装"],
              ["AI・データ", "YOLO推論・信頼度評価アルゴリズム"],
              ["アプリ開発", "UX設計・オフライン機能実装"],
            ].map(([member, role]) => (
              <article key={member} className="text-center">
                <div className="paper-grid mx-auto h-40 w-40 rounded-full border border-line-soft bg-paper" />
                <h3 className="mt-4 mincho text-xl">{member}</h3>
                <p className="text-sm text-ink-soft">{role}</p>
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
                    ? "border-2 border-brand-accent bg-white p-5"
                    : "border border-line-soft bg-white p-5"
                }
              >
                <p className="mono mb-2 text-[11px] tracking-[0.15em] text-brand-accent">{item.year}</p>
                <h3 className={item.highlight ? "mincho text-2xl text-brand-accent" : "mincho text-xl text-ink"}>
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-ink-soft">{item.detail}</p>
              </article>
            ))}
          </div>
          <div className="border-l-2 border-ink pl-6">
            {timeline.map(([year, text]) => (
              <div key={year} className="mb-5">
                <p className="mono text-[11px] tracking-[0.15em] text-ink-soft">{year}</p>
                <p className="text-sm text-ink">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
