import { ArchSvg } from "@/components/site/ArchSvg";
import { FinalCta } from "@/components/site/FinalCta";
import { PageHero } from "@/components/site/PageHero";
import OkinawaMeshMap from "@/src/components/OkinawaMeshMap";

export default function TechnologyPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="TECHNOLOGY"
        title="実装可能性と運用性を両立した技術構成"
        lede="オンライン時の拡張性と、オフライン時の継続運用を両立するために、通信・保存・AI推論を役割分離して設計しています。"
      />

      <section className="px-6 py-14 md:px-12">
        <div className="frame-ticks mx-auto max-w-6xl border border-line-soft bg-white p-4 md:p-8">
          <h2 className="mono mb-4 text-[12px] tracking-[0.2em] text-ink-soft uppercase">SYSTEM ARCHITECTURE</h2>
          <p className="mb-6 text-sm leading-8 text-ink-soft">
            ADREN (ESP32 / LoRa) がスマホとBLEで接続し、端末同士はLoRaでアドホック中継。必要に応じて5Gへブリッジし、通信断環境でも情報流通を維持します。
          </p>
          <ArchSvg />
        </div>
      </section>

      <section className="px-6 pb-14 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {[
            [
              "APP",
              "React Native (Expo)",
              "現場で扱いやすいクロスプラットフォームUIを短サイクルで改善可能。チャット・地図・カメラを一体提供。",
            ],
            [
              "DATA",
              "Firebase + SQLite",
              "平時/オンライン時はFirebaseで同期、災害時/オフライン時はSQLiteで継続運用。通信復帰後に再同期しやすい構成。",
            ],
            [
              "AI",
              "YOLOv11 + 軽量化モデル",
              "被害画像から崩壊度や対象物を抽出。軽量化モデルで端末処理を可能にし、低帯域でも扱える情報へ圧縮。",
            ],
          ].map(([label, title, text]) => (
            <article key={label} className="hover-card hover-card-accent border border-line-soft bg-paper p-6">
              <p className="mono mb-2 text-[11px] tracking-[0.2em] text-brand-accent">{label}</p>
              <h3 className="mincho mb-3 text-2xl">{title}</h3>
              <p className="text-sm leading-7 text-ink-soft">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-14 md:px-12">
        <div className="mx-auto max-w-6xl border border-line-soft bg-white">
          <h2 className="mono border-b border-line-soft px-6 py-4 text-[12px] tracking-[0.2em] text-ink-soft uppercase">
            SECURITY & UNIQUENESS
          </h2>
          <p className="border-b border-line-soft px-6 py-4 text-sm leading-7 text-ink-soft">
            以下の暗号処理は LPWA (LoRa) 中継区間に実装しています。ノード起動時に鍵ペアを生成し、
            公開鍵を配布したうえで、ペアごとに導出した共通鍵で通信します。
          </p>
          {[
            "X25519 (ECDH) による鍵交換。共通鍵は電波に乗せない",
            "AES-256-GCM による暗号化と改ざん検知",
            "Ed25519 による送信者認証・なりすまし防止",
            "信頼度スコアに基づく情報統合・フェイク情報の抑制",
            "圧縮・軽量化したAI推論による低帯域向け最適化",
          ].map((paper, index) => (
            <div
              key={paper}
              className="grid gap-3 border-b border-line-soft px-6 py-4 transition-colors duration-200 last:border-b-0 hover:bg-paper md:grid-cols-[100px_1fr_90px] md:items-center"
            >
              <p className="mono text-[10px] tracking-[0.15em] text-ink-soft">POINT 0{index + 1}</p>
              <p className="text-sm text-ink">{paper}</p>
              <span className="mono text-[10px] tracking-[0.15em] text-brand-accent">TECH</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-14 md:px-12">
        <div className="mx-auto max-w-6xl grid gap-4 md:grid-cols-2">
          <article className="hover-card border border-line-soft bg-white p-6">
            <h2 className="mono mb-4 text-[12px] tracking-[0.2em] text-ink-soft uppercase">TRUST SCORE ENGINE</h2>
            <p className="mb-4 text-sm leading-8 text-ink-soft">
              複数の投稿を比較し、時間経過と発信者信頼度を加味してスコア化。明らかに乖離した情報は優先度を下げ、防災センターでの判断負荷を下げます。
            </p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li>・時間減衰: 新しい情報ほど重みを高く評価</li>
              <li>・発信者重み: 公式機関を高く、一般投稿は履歴で補正</li>
              <li>・統合処理: 類似情報を統合し、フェイク候補は分離表示</li>
            </ul>
          </article>

          <article className="hover-card border border-line-soft bg-white p-6">
            <h2 className="mono mb-4 text-[12px] tracking-[0.2em] text-ink-soft uppercase">OFFLINE MAP & ROUTING</h2>
            <p className="mb-4 text-sm leading-8 text-ink-soft">
              完全オフライン時でも、地図表示と避難ルート探索を継続します。A*探索をベースに、危険エリアを回避する運用ロジックを重ねています。
            </p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li>・Pass 1: 危険エリアを避ける安全迂回ルート</li>
              <li>・Pass 2: 到達不可時に複数候補避難所へ代替探索</li>
              <li>・Pass 3: 危険エッジへ高ペナルティを付与し経路を返す</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12">
        <div className="frame-ticks mx-auto max-w-6xl border border-line-soft bg-white p-4 md:p-8">
          <h2 className="mono mb-4 text-[12px] tracking-[0.2em] text-ink-soft uppercase">OKINAWA MESH DEMO</h2>
          <OkinawaMeshMap nodeCount={80} edgeRadius={75} hopDelay={420} autoPlay />
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
