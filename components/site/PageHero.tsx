type PageHeroProps = {
  eyebrow: string;
  title: string;
  lede: string;
};

export function PageHero({ eyebrow, title, lede }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line-soft bg-paper px-6 py-20 md:px-12 md:py-24">
      {/* Decorative layers */}
      <div
        aria-hidden
        className="paper-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
      />
      <p
        aria-hidden
        className="text-outline mono pointer-events-none absolute -right-4 -bottom-7 text-[20vw] leading-none font-semibold tracking-tight whitespace-nowrap uppercase select-none md:text-[11rem]"
      >
        {eyebrow}
      </p>

      <div className="relative mx-auto max-w-6xl">
        <p className="fade-up mono mb-4 flex items-center gap-3 text-[11px] tracking-[0.2em] text-brand-accent uppercase">
          <span className="inline-block h-px w-8 bg-brand-accent" />
          {eyebrow}
        </p>
        <h1 className="fade-up fade-up-1 mincho mb-6 max-w-4xl text-4xl leading-tight md:text-6xl">{title}</h1>
        <p className="fade-up fade-up-2 max-w-3xl text-base leading-8 text-ink-soft">{lede}</p>
      </div>
    </section>
  );
}
