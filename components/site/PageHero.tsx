type PageHeroProps = {
  eyebrow: string;
  title: string;
  lede: string;
};

export function PageHero({ eyebrow, title, lede }: PageHeroProps) {
  return (
    <section className="border-b border-line-soft bg-paper px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mono mb-4 text-[11px] tracking-[0.2em] text-brand-accent uppercase">{eyebrow}</p>
        <h1 className="mincho mb-6 text-4xl leading-tight md:text-6xl">{title}</h1>
        <p className="max-w-3xl text-base leading-8 text-ink-soft">{lede}</p>
      </div>
    </section>
  );
}
