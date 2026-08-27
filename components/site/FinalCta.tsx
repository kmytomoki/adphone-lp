import { GhostButton, PrimaryButton } from "@/components/site/Buttons";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-y border-line-soft bg-ink px-6 py-24 text-center text-white md:px-12 md:py-28">
      <div
        aria-hidden
        className="paper-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
      />
      <p
        aria-hidden
        className="text-outline-light mono pointer-events-none absolute inset-x-0 -bottom-6 text-center text-[18vw] leading-none font-semibold tracking-tight whitespace-nowrap uppercase select-none md:text-[10rem]"
      >
        ADREN
      </p>

      <div className="relative mx-auto max-w-3xl">
        <p className="mono mb-5 flex items-center justify-center gap-3 text-micro tracking-[0.25em] text-brand-accent-soft uppercase">
          <span className="inline-block h-px w-8 bg-brand-accent-soft" />
          GET STARTED / 05
          <span className="inline-block h-px w-8 bg-brand-accent-soft" />
        </p>
        <h2 className="mincho mb-6 text-3xl leading-tight md:text-5xl">
          災害に備える<em className="not-italic text-brand-accent-soft">通信</em>を、
          <br />
          あなたの自治体に。
        </h2>
        <p className="mb-10 text-body text-white/70">
          製品概要はその場で読めます（登録不要）。実証実験への参加や技術相談は、担当者がご相談を承ります。
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton href="/document" className="bg-brand-accent text-white hover:bg-brand-accent-soft">
            資料を見る（登録不要）
          </PrimaryButton>
          <GhostButton
            href="/contact"
            className="border-white/40 text-white hover:border-white hover:bg-white hover:text-ink"
          >
            導入について相談する
          </GhostButton>
        </div>
      </div>
    </section>
  );
}
