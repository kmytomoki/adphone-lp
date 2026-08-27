"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PrintButton } from "@/app/document/PrintButton";
import {
  DOCUMENT_AUDIENCES,
  documentAwards,
  documentFeatures,
  documentProblems,
  documentSpecs,
  parseDocumentAudience,
} from "@/lib/document-content";
import { contactHref } from "@/lib/site";
import { cn } from "@/lib/utils";

function Block({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <section className="break-inside-avoid border-t border-line pt-6">
      <p className="mono mb-2 text-micro tracking-[0.2em] text-brand-accent">{label}</p>
      <h2 className="mincho mb-4 text-2xl">{title}</h2>
      {children}
    </section>
  );
}

export function DocumentView() {
  const searchParams = useSearchParams();
  const audience = parseDocumentAudience(searchParams.get("audience"));

  const current = DOCUMENT_AUDIENCES.find((item) => item.id === audience) ?? DOCUMENT_AUDIENCES[0];

  return (
    <>
      <div className="print-hide mx-auto mb-8 max-w-4xl space-y-4">
        <div className="flex flex-col gap-4 border border-line-soft bg-paper-2 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-base font-semibold text-ink">製品概要資料（登録不要）</p>
            <p className="mt-1 text-body text-ink-soft">
              立場に合わせて読み分けられます。印刷ダイアログの「PDFとして保存」でPDF化できます。
            </p>
          </div>
          <PrintButton />
        </div>

        <div
          role="tablist"
          aria-label="資料の読み手"
          className="grid gap-2 border border-line-soft bg-white p-2 sm:grid-cols-3"
        >
          {DOCUMENT_AUDIENCES.map((item) => {
            const selected = item.id === audience;
            return (
              <Link
                key={item.id}
                href={`/document?audience=${item.id}`}
                role="tab"
                aria-selected={selected}
                className={cn(
                  "min-h-16 px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent",
                  selected ? "bg-ink text-white" : "bg-paper text-ink hover:bg-paper-2"
                )}
              >
                <span className="mincho block text-lg">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <article className="mx-auto max-w-4xl border border-line-soft bg-white p-8 md:p-12 print:border-0 print:p-0">
        <header className="mb-8 border-b-2 border-ink pb-6">
          <p className="mincho text-3xl font-extrabold tracking-[0.05em]">
            AD<span className="text-brand-accent">REN</span>
          </p>
          <p className="mono mt-1 text-micro tracking-[0.2em] text-ink-soft">災害時オフライン通信ネットワーク</p>
          <p className="mono mt-3 text-micro tracking-[0.15em] text-brand-accent">{current.label}</p>
          <h1 className="mincho mt-4 text-3xl leading-tight md:text-4xl">{current.headline}</h1>
          <p className="mt-4 text-lede text-ink-soft">{current.summary}</p>
          <p className="mt-3 text-body text-ink-soft">
            開発: Rewave Technology（沖縄工業高等専門学校発）
          </p>
        </header>

        <div className="space-y-8">
          <Block label="この立場での着眼点" title={current.focusTitle}>
            <ul className="space-y-3">
              {current.focusItems.map((item) => (
                <li key={item} className="border-l-2 border-brand-accent pl-4 text-body text-ink-soft">
                  {item}
                </li>
              ))}
            </ul>
            <p className="print-hide mt-4 text-body text-ink-soft">
              詳しい活用例は
              <Link href={`/usecases#${audience}`} className="mx-1 underline underline-offset-4 hover:text-brand-accent">
                ユースケース
              </Link>
              をご覧ください。
            </p>
          </Block>

          <Block label="課題" title="災害時、通信は真っ先に失われる">
            <dl className="space-y-3">
              {documentProblems.map(([title, body]) => (
                <div key={title} className="border-l-2 border-line pl-4">
                  <dt className="text-base font-semibold text-ink">{title}</dt>
                  <dd className="text-body text-ink-soft">{body}</dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block label="解決策" title="回線に依存しない、独立した通信レイヤー">
            <p className="text-body text-ink-soft">
              ADRENは、スマホとBLEで接続する小型通信モジュールです。近距離はBLE、遠距離はLPWA (LoRa
              920MHz)で中継し、ノード間をバケツリレー式に接続。基地局が使えない環境でも、情報を次のノードへ確実に届けます。
              オンライン時はFirebaseで同期し、オフライン時はSQLiteで継続運用します。
            </p>
          </Block>

          <Block label="特長" title="災害対応を支える4つの特長">
            <dl className="grid gap-4 sm:grid-cols-2">
              {documentFeatures.map(([title, body]) => (
                <div key={title} className="border border-line-soft bg-paper p-4">
                  <dt className="mincho mb-2 text-xl">{title}</dt>
                  <dd className="text-body text-ink-soft">{body}</dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block label="導入の進め方" title="小さく確かめ、運用へつなげる">
            <ol className="space-y-3">
              {current.steps.map((step, index) => (
                <li key={step} className="flex gap-4 border border-line-soft bg-paper p-4">
                  <span className="mono text-micro tracking-[0.15em] text-brand-accent">STEP {index + 1}</span>
                  <span className="text-body text-ink-soft">{step}</span>
                </li>
              ))}
            </ol>
          </Block>

          <Block label="仕様" title="仕様">
            <div className="border border-line">
              {documentSpecs.map(([key, value]) => (
                <div key={key} className="grid border-b border-line-soft last:border-b-0 sm:grid-cols-[220px_1fr]">
                  <div className="bg-paper-2 px-4 py-3 text-body text-ink">{key}</div>
                  <div className="px-4 py-3 text-body text-ink-soft">{value}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-body text-ink-soft">
              通信距離・データ圧縮率は、いずれも開発中プロトタイプでの測定値およびシミュレーション値です。第三者検証は受けていません。
            </p>
          </Block>

          <Block label="受賞歴" title="受賞歴">
            <ul className="space-y-2">
              {documentAwards.map(([year, title, href]) => (
                <li key={title} className="flex flex-wrap items-baseline gap-x-4 border-b border-line-soft pb-2">
                  <span className="mono text-micro tracking-[0.15em] text-brand-accent">{year}</span>
                  <span className="text-body text-ink">{title}</span>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="mono text-micro text-ink-soft underline underline-offset-4 hover:text-brand-accent"
                  >
                    主催者発表ページ ↗
                  </a>
                </li>
              ))}
            </ul>
          </Block>

          <Block label="次のステップ" title="導入・実証・共創のご相談">
            <p className="text-body text-ink-soft">
              {current.label}に関する導入、実証実験、既存システムとの連携などのご相談は、サイトのお問い合わせフォームより承ります。数営業日以内に担当者よりご連絡いたします。
            </p>
            <div className="print-hide mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href={contactHref(current.subject)}
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-ink bg-ink px-6 py-4 text-base font-medium text-white transition-colors hover:bg-brand-accent"
              >
                {current.label}について相談する
              </Link>
              <Link
                href={`/usecases#${audience}`}
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-line px-6 py-4 text-base font-medium text-ink transition-colors hover:border-brand-accent hover:text-brand-accent"
              >
                活用例を見る
              </Link>
            </div>
          </Block>
        </div>

        <footer className="mt-10 border-t border-line pt-4 text-micro text-ink-soft">
          <p>ADREN 製品概要資料 ／ Rewave Technology ／ 本資料の内容は開発中の仕様であり、予告なく変更される場合があります。</p>
        </footer>
      </article>
    </>
  );
}
