import type { Metadata } from "next";
import { ArchSvg } from "@/components/site/ArchSvg";
import { FinalCta } from "@/components/site/FinalCta";
import { PageHero } from "@/components/site/PageHero";
import OkinawaMeshMap from "@/src/components/OkinawaMeshMap";

export const metadata: Metadata = {
  title: "技術・セキュリティ",
  description:
    "ADREN（アドレン）のBLE・LoRa通信構成、オフラインデータ、暗号化、信頼度評価、オフライン地図の技術設計を紹介します。",
};

export default function TechnologyPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="技術"
        title="実装可能性と運用性を両立した技術構成"
        lede="オンライン時の拡張性と、オフライン時の継続運用を両立するために、通信・保存・AI推論を役割分離して設計しています。"
      />

      <section className="px-6 py-14 md:px-12">
        <div className="frame-ticks mx-auto max-w-6xl border border-line-soft bg-white p-4 md:p-8">
          <h2 className="mono mb-4 text-micro tracking-[0.2em] text-ink-soft">システム構成</h2>          <p className="mb-6 text-body text-ink-soft">
            ADREN (ESP32 / LoRa) がスマホとBLEで接続し、端末同士はLoRaでアドホック中継。必要に応じて5Gへブリッジし、通信断環境でも情報流通を維持します。
          </p>
          <ArchSvg />
        </div>
      </section>

      <section className="px-6 pb-14 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {[
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
              "AI",              "YOLOv11 + 軽量化モデル",
              "被害画像から崩壊度や対象物を抽出。軽量化モデルで端末処理を可能にし、低帯域でも扱える情報へ圧縮。",
            ],
          ].map(([label, title, text]) => (
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
          </h2>          <p className="border-b border-line-soft px-6 py-4 text-body text-ink-soft">
            以下の暗号処理は LPWA (LoRa) 中継区間に実装しています。ノード起動時に鍵ペアを生成し、
            公開鍵を配布したうえで、ペアごとに導出した共通鍵で通信します。
          </p>
          {[
            "X25519 (ECDH) による鍵交換。共通鍵は電波に乗せない",
            "AES-256-GCM による暗号化と改ざん検知",
            "Ed25519 による送信者認証・なりすまし防止",
            "信頼度スコアに基づく情報統合・フェイク情報の抑制",
            "圧縮・軽量化したAI推論による低帯域向け最適化",
          ].map((paper) => (
            <div
              key={paper}
              className="border-b border-line-soft px-6 py-4 transition-colors duration-200 last:border-b-0 hover:bg-paper"
            >
              <p className="text-body text-ink">{paper}</p>
            </div>
          ))}        </div>
      </section>

      <section className="px-6 pb-14 md:px-12">
        <div className="mx-auto max-w-6xl grid gap-4 md:grid-cols-2">
          <article className="hover-card border border-line-soft bg-white p-6">
            <h2 className="mono mb-4 text-micro tracking-[0.2em] text-ink-soft">信頼度評価</h2>            <p className="mb-4 text-body text-ink-soft">
              複数の投稿を比較し、時間経過と発信者信頼度を加味してスコア化。明らかに乖離した情報は優先度を下げ、防災センターでの判断負荷を下げます。
            </p>
            <ul className="space-y-2 text-body text-ink-soft">
              <li>・時間減衰: 新しい情報ほど重みを高く評価</li>
              <li>・発信者重み: 公式機関を高く、一般投稿は履歴で補正</li>
              <li>・統合処理: 類似情報を統合し、フェイク候補は分離表示</li>
            </ul>
          </article>

          <article className="hover-card border border-line-soft bg-white p-6">
            <h2 className="mono mb-4 text-micro tracking-[0.2em] text-ink-soft">オフライン地図・経路探索</h2>            <p className="mb-4 text-body text-ink-soft">
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
          <h2 className="mono mb-4 text-micro tracking-[0.2em] text-ink-soft">沖縄メッシュ通信デモ</h2>          <OkinawaMeshMap nodeCount={80} edgeRadius={75} hopDelay={420} autoPlay />
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
