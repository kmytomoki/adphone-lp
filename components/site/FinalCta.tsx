import { GhostButton, PrimaryButton } from "@/components/site/Buttons";

export function FinalCta() {
  return (
    <section className="border-y border-line-soft bg-paper-2 px-6 py-20 text-center md:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="mono mb-4 text-[11px] tracking-[0.2em] text-brand-accent uppercase">GET STARTED / 05</p>
        <h2 className="mincho mb-6 text-3xl leading-tight md:text-5xl">
          災害に備える<em className="not-italic text-brand-accent">通信</em>を、
          <br />
          あなたの自治体に。
        </h2>
        <p className="mb-8 text-sm leading-8 text-ink-soft">
          導入検討のための資料をお送りします。実証実験への参加や技術相談など、お気軽にお問い合わせください。
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton href="/contact">資料請求</PrimaryButton>
          <GhostButton href="/contact">お問い合わせ</GhostButton>
        </div>
      </div>
    </section>
  );
}
