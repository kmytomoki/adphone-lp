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
          アド<span className="text-brand-accent">フォン</span>
          <span className="mono block text-[9px] tracking-[0.25em] text-ink-soft">ADOPHONE / OFFLINE MESH</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm relative pb-1",
                  active ? "text-ink font-semibold" : "text-ink-soft hover:text-ink"
                )}
              >
                {link.label}
                <span className={cn("absolute inset-x-0 -bottom-0.5 h-px bg-ink", active ? "scale-100" : "scale-0")} />
              </Link>
            );
          })}
          <Button asChild variant="outline" size="sm" className="rounded-sm">
            <Link href="/contact">資料請求</Link>
          </Button>
          <Button asChild size="sm" className="rounded-sm bg-ink text-white hover:bg-brand-accent">
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
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base text-ink"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="text-base text-brand-accent">
              資料請求・お問い合わせ
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
