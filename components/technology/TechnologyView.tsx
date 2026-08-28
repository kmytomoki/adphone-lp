"use client";

import { useState } from "react";
import { ArchSvg } from "@/components/site/ArchSvg";
import OkinawaMeshMap from "@/src/components/OkinawaMeshMap";
import { cn } from "@/lib/utils";

type ViewMode = "overview" | "detail";

const overviewPillars = [
  {
    title: "現場で使うアプリ",
    body: "チャット、地図、カメラを一体提供。高齢者や子供でも操作しやすい画面設計を重視しています。",
  },
  {
    title: "平時と災害時のデータ運用",
    body: "オンライン時はクラウドで同期し、通信断時は端末内データで継続。復旧後に再同期しやすい構成です。",
  },
  {
    title: "画像・音声の軽量化",
    body: "被害写真や音声から必要な情報だけを抽出し、限られた帯域でも共有しやすい形へ変換します。",
  },
];

const overviewSecurity = [
  "端末間の通信は暗号化し、改ざんを検知できる設計です。",
  "送信者のなりすましを抑止する認証を組み込んでいます。",
  "類似情報の統合と乖離情報の分離で、判断負荷を下げます。",
];

const detailStacks = [
  [
    "アプリ",
    "React Native (Expo)",
    "現場で扱いやすいクロスプラットフォームUIを短サイクルで改善可能。チャット・地図・カメラを一体提供。",
  ],
  [
    "データ",
    "Firebase + SQLite",
    "平時/オンライン時はFirebaseで同期、災害時/オフライン時はSQLiteで継続運用。通信復帰後に再同期しやすい構成。",
  ],
  [
    "AI",
    "YOLOv11 + 軽量化モデル",
    "被害画像から崩壊度や対象物を抽出。軽量化モデルで端末処理を可能にし、低帯域でも扱える情報へ圧縮。",
  ],
] as const;

const detailSecurity = [
  "X25519 (ECDH) による鍵交換。共通鍵は電波に乗せない",
  "AES-256-GCM による暗号化と改ざん検知",
  "Ed25519 による送信者認証・なりすまし防止",
  "信頼度スコアに基づく情報統合・フェイク情報の抑制",
  "圧縮・軽量化したAI推論による低帯域向け最適化",
];

export function TechnologyView() {
  const [view, setView] = useState<ViewMode>("overview");

  return (
    <>
      <section className="border-b border-line-soft bg-paper-2 px-6 py-6 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-body text-ink-soft">
            導入判断に必要な要点と、実装・連携を検討する方向けの詳細を切り替えて読めます。
          </p>
          <div
            role="tablist"
            aria-label="技術情報の表示切替"
            className="inline-flex w-full border border-line-soft bg-white sm:w-auto"
          >
            {(
              [
                ["overview", "導入検討向け"],
                ["detail", "技術詳細"],
              ] as const
            ).map(([id, label]) => {
              const selected = view === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`technology-panel-${id}`}
                  id={`technology-tab-${id}`}
                  className={cn(
                    "min-h-12 flex-1 px-5 py-3 text-base transition-colors sm:flex-none sm:px-6",
                    selected
                      ? "bg-ink font-medium text-white"
                      : "text-ink-soft hover:bg-paper hover:text-ink"
                  )}
                  onClick={() => setView(id)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {view === "overview" ? (
        <div
          id="technology-panel-overview"
          role="tabpanel"
          aria-labelledby="technology-tab-overview"
          className="space-y-0"
        >
          <section className="px-6 py-14 md:px-12">
            <div className="frame-ticks mx-auto max-w-6xl border border-line-soft bg-white p-4 md:p-8">
              <h2 className="mono mb-4 text-micro tracking-[0.2em] text-ink-soft">全体像</h2>
              <p className="mb-6 text-body text-ink-soft">
                スマートフォンと小型通信モジュールをBLEで接続し、端末同士が中継して情報を届けます。基地局が使えない時間帯でも、避難所・事業所・現場の連絡を継続するための補完レイヤーです。
              </p>
              <ArchSvg />
            </div>
          </section>

          <section className="px-6 pb-14 md:px-12">
            <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
              {overviewPillars.map((item) => (
                <article key={item.title} className="border border-line-soft bg-white p-6">
                  <h3 className="mincho mb-3 text-2xl">{item.title}</h3>
                  <p className="text-body text-ink-soft">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="px-6 pb-14 md:px-12">
            <div className="mx-auto max-w-6xl border border-line-soft bg-white p-6 md:p-8">
              <h2 className="mono mb-4 text-micro tracking-[0.2em] text-ink-soft">セキュリティと情報の扱い</h2>
              <ul className="space-y-3 text-body text-ink-soft">
                {overviewSecurity.map((item) => (
                  <li key={item} className="border-l-2 border-brand-accent pl-4">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-body text-ink-soft">
                暗号方式や実装スタックなど、技術連携に必要な詳細は「技術詳細」タブにまとめています。
              </p>
              <button
                type="button"
                className="mt-4 inline-flex min-h-12 items-center border border-ink bg-ink px-6 py-3 text-base font-medium text-white transition-colors hover:bg-brand-accent"
                onClick={() => setView("detail")}
              >
                技術詳細を見る →
              </button>
            </div>
          </section>
        </div>
      ) : (
        <div
          id="technology-panel-detail"
          role="tabpanel"
          aria-labelledby="technology-tab-detail"
          className="space-y-0"
        >
          <section className="px-6 py-14 md:px-12">
            <div className="frame-ticks mx-auto max-w-6xl border border-line-soft bg-white p-4 md:p-8">
              <h2 className="mono mb-4 text-micro tracking-[0.2em] text-ink-soft">システム構成</h2>
              <p className="mb-6 text-body text-ink-soft">
                ADREN (ESP32 / LoRa) がスマホとBLEで接続し、端末同士はLoRaでアドホック中継。必要に応じて5Gへブリッジし、通信断環境でも情報流通を維持します。
              </p>
              <ArchSvg />
            </div>
          </section>

          <section className="px-6 pb-14 md:px-12">
            <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
              {detailStacks.map(([label, title, text]) => (
                <article key={label} className="hover-card hover-card-accent border border-line-soft bg-paper p-6">
                  <p className="mono mb-2 text-micro tracking-[0.2em] text-brand-accent">{label}</p>
                  <h3 className="mincho mb-3 text-2xl">{title}</h3>
                  <p className="text-body text-ink-soft">{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="px-6 pb-14 md:px-12">
            <div className="mx-auto max-w-6xl border border-line-soft bg-white">
              <h2 className="mono border-b border-line-soft px-6 py-4 text-micro tracking-[0.2em] text-ink-soft">
                セキュリティと独自性
              </h2>
              <p className="border-b border-line-soft px-6 py-4 text-body text-ink-soft">
                以下の暗号処理は LPWA (LoRa) 中継区間に実装しています。ノード起動時に鍵ペアを生成し、公開鍵を配布したうえで、ペアごとに導出した共通鍵で通信します。
              </p>
              {detailSecurity.map((paper) => (
                <div
                  key={paper}
                  className="border-b border-line-soft px-6 py-4 transition-colors duration-200 last:border-b-0 hover:bg-paper"
                >
                  <p className="text-body text-ink">{paper}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="px-6 pb-14 md:px-12">
            <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
              <article className="hover-card border border-line-soft bg-white p-6">
                <h2 className="mono mb-4 text-micro tracking-[0.2em] text-ink-soft">信頼度評価</h2>
                <p className="mb-4 text-body text-ink-soft">
                  複数の投稿を比較し、時間経過と発信者信頼度を加味してスコア化。明らかに乖離した情報は優先度を下げ、防災センターでの判断負荷を下げます。
                </p>
                <ul className="space-y-2 text-body text-ink-soft">
                  <li>・時間減衰: 新しい情報ほど重みを高く評価</li>
                  <li>・発信者重み: 公式機関を高く、一般投稿は履歴で補正</li>
                  <li>・統合処理: 類似情報を統合し、フェイク候補は分離表示</li>
                </ul>
              </article>

              <article className="hover-card border border-line-soft bg-white p-6">
                <h2 className="mono mb-4 text-micro tracking-[0.2em] text-ink-soft">オフライン地図・経路探索</h2>
                <p className="mb-4 text-body text-ink-soft">
                  完全オフライン時でも、地図表示と避難ルート探索を継続します。A*探索をベースに、危険エリアを回避する運用ロジックを重ねています。
                </p>
                <ul className="space-y-2 text-body text-ink-soft">
                  <li>・Pass 1: 危険エリアを避ける安全迂回ルート</li>
                  <li>・Pass 2: 到達不可時に複数候補避難所へ代替探索</li>
                  <li>・Pass 3: 危険エッジへ高ペナルティを付与し経路を返す</li>
                </ul>
              </article>
            </div>
          </section>

          <section className="px-6 pb-20 md:px-12">
            <div className="frame-ticks mx-auto max-w-6xl border border-line-soft bg-white p-4 md:p-8">
              <h2 className="mono mb-4 text-micro tracking-[0.2em] text-ink-soft">中継デモ（名護市）</h2>
              <p className="mb-4 text-compact text-ink-soft">
                14台を約1km間隔で配置した場合の想定です。図の縮尺とノード間隔は一致させています。
                この台数で覆えるのは市内の一部の区間で、名護市の全域ではありません。
              </p>
              <OkinawaMeshMap nodeCount={14} hopDelay={420} autoPlay />
            </div>
          </section>
        </div>
      )}
    </>
  );
}
