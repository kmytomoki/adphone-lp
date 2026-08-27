import Image from "next/image";
import { FinalCta } from "@/components/site/FinalCta";
import { PageHero } from "@/components/site/PageHero";

const scenarios = [
  {
    title: "基地局ダウン時の安否確認 (LoRa通信)",
    problem: "地震直後に基地局が停止し、避難所間の通話・データ通信が断絶する。",
    solution: "ADRENノードがLoRa(920MHz)で中継し、安否情報をバケツリレーで搬送する。",
    effect: "通信空白時間を短縮し、72時間以内の救助判断に必要な情報を維持できる。",
    image: "/images/usecase-safety.webp",
    imageNote: "※ 生成AIによるイメージ図です",
  },
  {
    title: "建物倒壊現場でのAI判定と情報共有",
    problem: "現場画像・音声の生データは重く、回線断環境では共有が難しい。",
    solution: "YOLOv11等のAIで崩壊度・被災者情報を抽出し、テキストへ圧縮して送信する。",
    effect: "情報量を抑えつつ状況把握を加速し、優先救助対象の選定精度を高める。",
    image: "/images/usecase-collapse.webp",
    imageNote: "※ 生成AIによるイメージ図です",
  },
  {
    title: "避難所での要救護者 (属性AI) の可視化",
    problem: "避難者属性の集約が紙ベースだと遅く、医療・介護リソース配分が後手になる。",
    solution: "入力情報とAI解析結果から要救護者属性を地図/一覧で可視化し、避難所間で共有する。",
    effect: "優先支援対象を早期に抽出し、限られた人的資源を適切に配分できる。",
    image: "/images/usecase-shelter.webp",
    imageNote: "※ 生成AIによるイメージ図です",
  },
  {
    title: "オフライン環境での避難ルート案内 (A*アルゴリズム)",
    problem: "通信断時はクラウド地図に依存できず、安全な避難経路を即時提示しづらい。",
    solution: "端末内地図とA*アルゴリズムで最短/安全ルートを算出し、オフラインで提示する。",
    effect: "避難誘導の判断を標準化し、現場スタッフの負荷と誘導ミスを削減する。",
    image: "/images/app-route.webp",
    imageNote: "実際のアプリ画面。危険エリアを避ける迂回ルートを表示している。",
  },
];

export default function UseCasesPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="USE CASES"
        title="災害シナリオ別に、ADRENの実運用を可視化"
        lede="通信断の状況下で想定される運用フローを、「課題 → 解決 → 効果」の順に整理しています。"
      />

      <section className="px-6 py-14 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-3">
          {["地震", "豪雨・水害", "孤立集落", "避難所運営"].map((tag) => (
            <span
              key={tag}
              className="border border-line bg-white px-4 py-2 text-body text-ink-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-accent hover:text-brand-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12">
        <div className="mx-auto max-w-6xl space-y-6">
          {scenarios.map((item, index) => (
            <article
              key={item.title}
              className="hover-card grid gap-6 border border-line-soft bg-white p-6 md:grid-cols-2 md:p-8"
            >
              <div className={index % 2 === 0 ? "order-1" : "order-2 md:order-1"}>
                <p className="mono mb-2 flex items-baseline gap-3 text-micro tracking-[0.2em] text-brand-accent">
                  SCENARIO 0{index + 1}
                  <span className="mincho text-3xl leading-none text-line">0{index + 1}</span>
                </p>
                <h2 className="mincho mb-4 text-3xl">{item.title}</h2>
                <div className="space-y-3">
                  <div className="border-l-2 border-ink bg-paper-2 p-3">
                    <p className="mono mb-1 text-micro tracking-[0.15em] text-ink-soft uppercase">課題</p>
                    <p className="text-body text-ink-soft">{item.problem}</p>
                  </div>
                  <div className="border-l-2 border-brand-accent bg-paper p-3">
                    <p className="mono mb-1 text-micro tracking-[0.15em] text-ink-soft uppercase">解決</p>
                    <p className="text-body text-ink-soft">{item.solution}</p>
                  </div>
                  <div className="border-l-2 border-line bg-white p-3">
                    <p className="mono mb-1 text-micro tracking-[0.15em] text-ink-soft uppercase">効果</p>
                    <p className="text-body text-ink-soft">{item.effect}</p>
                  </div>
                </div>
              </div>
              <div className={index % 2 === 0 ? "order-2" : "order-1 md:order-2"}>
                <div className="relative h-full min-h-72 overflow-hidden border border-line-soft bg-paper">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 560px"
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 text-micro text-ink-soft">{item.imageNote}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
