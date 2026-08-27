"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/product", label: "製品" },
  { href: "/usecases", label: "ユースケース" },
  { href: "/technology", label: "技術" },
  { href: "/about", label: "会社情報" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-12">
        <Link href="/" className="mincho text-xl font-extrabold tracking-[0.05em]">
          AD<span className="text-brand-accent">REN</span>
          <span className="mono block text-[9px] tracking-[0.25em] text-ink-soft">REWAVE TECHNOLOGY</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={active}
                className={cn(
                  "link-line text-sm transition-colors",
                  active ? "text-ink font-semibold" : "text-ink-soft hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Button asChild variant="outline" size="sm" className="rounded-sm border-ink/30 transition-colors hover:border-ink">
            <Link href="/contact">資料請求</Link>
          </Button>
          <Button asChild size="sm" className="rounded-sm bg-ink text-white transition-colors hover:bg-brand-accent">
            <Link href="/contact">お問い合わせ</Link>
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {open ? (
        <div className="border-t border-line-soft bg-paper px-6 py-6 md:hidden">
          <div className="flex flex-col">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-baseline gap-4 border-b border-line-soft py-4 text-base text-ink transition-colors hover:text-brand-accent"
                onClick={() => setOpen(false)}
              >
                <span className="mono text-[10px] tracking-[0.2em] text-ink-soft">0{index + 1}</span>
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 py-4 text-base font-semibold text-brand-accent"
            >
              <span className="mono text-[10px] tracking-[0.2em]">05</span>
              資料請求・お問い合わせ
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
