import { cn } from "@/lib/utils";

type SectionHeadProps = {
  label: string;
  title: React.ReactNode;
  lede: string;
  dark?: boolean;
  className?: string;
};

export function SectionHead({ label, title, lede, dark, className }: SectionHeadProps) {
  return (
    <div
      className={cn(
        "grid items-end gap-8 md:grid-cols-[1fr_2fr]",
        className
      )}
    >
      <div>
        <p
          className={cn(
            "mono mb-4 flex items-center gap-3 text-micro tracking-[0.25em]",
            dark ? "text-brand-accent-soft" : "text-brand-accent"
          )}
        >
          <span className={cn("inline-block h-px w-6", dark ? "bg-brand-accent-soft" : "bg-brand-accent")} />
          {label}
        </p>
        <h2 className={cn("mincho text-3xl leading-tight md:text-5xl", dark ? "text-white" : "text-ink")}>
          {title}
        </h2>
      </div>
      <p className={cn("max-w-xl text-body", dark ? "text-white/70" : "text-ink-soft")}>{lede}</p>
    </div>
  );
}
