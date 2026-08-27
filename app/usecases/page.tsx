import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FinalCta } from "@/components/site/FinalCta";
import { PageHero } from "@/components/site/PageHero";
import { contactHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "活用例",
  description:
    "県・自治体、企業の防災・BCP、防災事業者の共創におけるADREN（アドレン）の活用シナリオを紹介します。",
};

const municipalityScenarios = [
  {
    title: "基地局停止後の避難所間の安否確認",
    problem: "地震直後に基地局が停止し、避難所間の通話・データ通信が断絶する。",
    solution: "ADRENノードが端末間で安否情報を中継し、災害対策本部へ届ける。",
    effect: "通信空白時間を短縮し、72時間以内の救助判断に必要な情報を維持できる。",
    image: "/images/usecase-safety.webp",
    imageNote: "※ 生成AIによるイメージ図です",
  },
  {
    title: "建物倒壊現場の情報を軽量化して共有",
    problem: "現場画像・音声の生データは重く、回線断環境では共有が難しい。",
    solution: "画像・音声から崩壊度や被災者情報を抽出し、低帯域で送れるテキストへ変換する。",
    effect: "情報量を抑えつつ状況把握を加速し、優先救助対象の選定精度を高める。",
    image: "/images/usecase-collapse.webp",
    imageNote: "※ 生成AIによるイメージ図です",
  },
  {
    title: "避難所で要救護者を可視化",
    problem: "避難者属性の集約が紙ベースだと遅く、医療・介護リソース配分が後手になる。",
    solution: "入力情報とAI解析結果から要救護者属性を地図/一覧で可視化し、避難所間で共有する。",
    effect: "優先支援対象を早期に抽出し、限られた人的資源を適切に配分できる。",
    image: "/images/usecase-shelter.webp",
    imageNote: "※ 生成AIによるイメージ図です",
  },
  {
    title: "オフラインで安全な避難ルートを案内",
    problem: "通信断時はクラウド地図に依存できず、安全な避難経路を即時提示しづらい。",
    solution: "端末内地図を使って危険エリアを避ける経路を算出し、オフラインで提示する。",
    effect: "避難誘導の判断を標準化し、現場スタッフの負荷と誘導ミスを削減する。",
    image: "/images/app-route.webp",
    imageNote: "実際のアプリ画面。危険エリアを避ける迂回ルートを表示している。",
  },
];

const enterpriseScenarios = [
  {
    title: "工場・事業所内の被害状況を集約",
    problem: "停電や基地局停止により、現場担当者から対策チームへの報告が届かない。",
    solution: "各担当者のスマートフォンから、けが人、設備被害、危険箇所の情報を端末間で中継する。",
    effect: "限られた通信手段を音声連絡だけで占有せず、初動判断に必要な情報を整理できる。",
  },
  {
    title: "既存の安否確認が使えない時間帯を補完",
    problem: "インターネット前提の安否確認サービスへ、孤立した拠点から回答できない。",
    solution: "拠点内で安否メッセージを集め、通信可能なノードまで中継して搬送する。",
    effect: "未回答と通信不能を切り分け、本社と拠点の確認作業を支援できる。",
  },
  {
    title: "BCP訓練で代替通信を検証",
    problem: "代替通信手段を導入しても、担当者交代や保管場所の変更で災害時に使えない。",
    solution: "既存のBCP訓練に接続・送信・集約の手順を組み込み、実際の拠点で検証する。",
    effect: "機器性能だけでなく、点検・保管・引き継ぎを含む運用課題を平常時に確認できる。",
  },
];

const partnerScenarios = [
  {
    title: "既存防災システムの通信断対策を共同設計",
    body: "既存サービスが扱う情報とADRENが中継する情報を整理し、データ形式、接続点、復旧後の同期方法を共同で検討します。",
  },
  {
    title: "通信機器・防災設備との共同実証",
    body: "対象地域や施設に合わせ、通信機器、電源、設置方法、運用担当を含めた実証項目と役割分担を設計します。",
  },
  {
    title: "自治体・企業向け防災事業を共同開発",
    body: "防災訓練、地域実証、BCP支援など既存の顧客接点と組み合わせ、単体機器ではなく継続運用まで含む事業を検討します。",
  },
];

export default function UseCasesPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="USE CASES"
        title="立場と現場から、ADRENの使い方を確認する"
        lede="県・自治体、企業の防災・BCP、防災事業の共創に分け、通信断時に想定する課題・対応・効果を整理しています。"
      />

      <section className="px-6 py-14 md:px-12">
        <nav aria-label="対象別の活用例" className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-3">
          {[
            ["#municipality", "県・自治体の防災", "避難所・孤立地域・災害対策本部"],
            ["#enterprise", "企業の防災・BCP", "工場・事業所・店舗・従業員安否"],
            ["#partners", "共創・事業連携", "既存サービス連携・共同実証"],
          ].map(([href, label, note]) => (
            <Link
              key={href}
              href={href}
              className="group flex min-h-24 items-center justify-between gap-4 border border-line bg-white p-5 transition-colors hover:border-brand-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
            >
              <span>
                <span className="mincho block text-xl group-hover:text-brand-accent">{label}</span>
                <span className="mt-1 block text-base leading-7 text-ink-soft">{note}</span>
              </span>
              <span aria-hidden className="text-brand-accent">
                ↓
              </span>
            </Link>
          ))}
        </nav>
      </section>

      <section id="municipality" className="scroll-mt-24 px-6 pb-20 md:px-12">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="max-w-3xl pb-4">
            <p className="mono mb-3 text-micro tracking-[0.2em] text-brand-accent">FOR GOVERNMENT</p>
            <h2 className="mincho text-3xl md:text-4xl">県・自治体の防災</h2>
            <p className="mt-3 text-body text-ink-soft">
              避難所、孤立地域、災害対策本部の間で、安否・物資・危険情報を継続して共有する想定です。
            </p>
          </div>
          {municipalityScenarios.map((item, index) => (
            <article
              key={item.title}
              className="hover-card grid gap-6 border border-line-soft bg-white p-6 md:grid-cols-2 md:p-8"
            >
              <div className={index % 2 === 0 ? "order-1" : "order-2 md:order-1"}>
                <p className="mono mb-2 text-micro tracking-[0.2em] text-brand-accent">SCENARIO 0{index + 1}</p>
                <h3 className="mincho mb-4 text-3xl">{item.title}</h3>
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
          <Link
            href={contactHref("県・自治体の導入相談")}
            className="inline-flex min-h-12 items-center border border-ink bg-ink px-6 py-4 text-base font-medium text-white transition-colors hover:bg-brand-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
          >
            県・自治体での導入・実証を相談する →
          </Link>
        </div>
      </section>

      <section id="enterprise" className="scroll-mt-24 border-y border-line-soft bg-paper-2 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mono mb-3 text-micro tracking-[0.2em] text-brand-accent">FOR ENTERPRISE</p>
            <h2 className="mincho text-3xl md:text-4xl">企業の防災・BCP</h2>
            <p className="mt-3 text-body text-ink-soft">
              工場・事業所・店舗で、インターネット前提の連絡手段が使えない時間帯を補完する想定です。
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {enterpriseScenarios.map((item, index) => (
              <article key={item.title} className="border border-line-soft bg-white p-6">
                <p className="mono mb-3 text-micro tracking-[0.2em] text-brand-accent">
                  BCP SCENARIO 0{index + 1}
                </p>
                <h3 className="mincho text-2xl">{item.title}</h3>
                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="text-base font-medium text-ink">通信断時の課題</dt>
                    <dd className="mt-1 text-body text-ink-soft">{item.problem}</dd>
                  </div>
                  <div className="border-l-2 border-brand-accent bg-paper p-4">
                    <dt className="text-base font-medium text-ink">想定する対応</dt>
                    <dd className="mt-1 text-body text-ink-soft">{item.solution}</dd>
                  </div>
                  <div>
                    <dt className="text-base font-medium text-ink">期待する効果</dt>
                    <dd className="mt-1 text-body text-ink-soft">{item.effect}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          <Link
            href={contactHref("企業の防災・BCP相談")}
            className="mt-8 inline-flex min-h-12 items-center border border-ink bg-ink px-6 py-4 text-base font-medium text-white transition-colors hover:bg-brand-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
          >
            企業の防災・BCPを相談する →
          </Link>
        </div>
      </section>

      <section id="partners" className="scroll-mt-24 px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mono mb-3 text-micro tracking-[0.2em] text-brand-accent">FOR PARTNERS</p>
            <h2 className="mincho text-3xl md:text-4xl">共創・事業連携</h2>
            <p className="mt-3 text-body text-ink-soft">
              ADREN単体の導入だけでなく、既存の顧客基盤・防災サービス・通信機器を組み合わせる事業開発を想定しています。
            </p>
          </div>
          <div className="mt-8 grid gap-px border border-line bg-line md:grid-cols-3">
            {partnerScenarios.map((item, index) => (
              <article key={item.title} className="bg-white p-7">
                <p className="mono mb-3 text-micro tracking-[0.2em] text-brand-accent">CO-CREATION 0{index + 1}</p>
                <h3 className="mincho text-2xl">{item.title}</h3>
                <p className="mt-3 text-body text-ink-soft">{item.body}</p>
              </article>
            ))}
          </div>
          <Link
            href={contactHref("共創・事業連携")}
            className="mt-8 inline-flex min-h-12 items-center border border-ink bg-ink px-6 py-4 text-base font-medium text-white transition-colors hover:bg-brand-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
          >
            共創・事業連携を相談する →
          </Link>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
