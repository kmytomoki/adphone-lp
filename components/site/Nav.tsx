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
          <span className="mono block text-micro tracking-[0.25em] text-ink-soft">REWAVE TECHNOLOGY</span>
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
                  "link-line flex min-h-11 items-center text-body transition-colors",
                  active ? "text-ink font-semibold" : "text-ink-soft hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          {/* 資料は登録不要でその場で読める /document へ。人と話す導線は /contact に分ける。 */}
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-sm border-ink/30 px-4 text-base transition-colors hover:border-ink"
          >
            <Link href="/document">資料を見る</Link>
          </Button>
          <Button asChild className="h-11 rounded-sm bg-ink px-4 text-base text-white transition-colors hover:bg-brand-accent">
            <Link href="/contact">相談する</Link>
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          className="size-11 p-0 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </Button>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t border-line-soft bg-paper px-6 py-4 md:hidden">
          <div className="flex flex-col">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex min-h-14 items-center gap-4 border-b border-line-soft py-4 text-base text-ink transition-colors hover:text-brand-accent"
                onClick={() => setOpen(false)}
              >
                <span className="mono text-micro tracking-[0.2em] text-ink-soft">0{index + 1}</span>
                {link.label}
              </Link>
            ))}
            <Link
              href="/document"
              onClick={() => setOpen(false)}
              className="flex min-h-14 items-center gap-4 border-b border-line-soft py-4 text-base text-ink transition-colors hover:text-brand-accent"
            >
              <span className="mono text-micro tracking-[0.2em] text-ink-soft">05</span>
              資料を見る（登録不要）
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex min-h-14 items-center gap-4 py-4 text-base font-semibold text-brand-accent"
            >
              <span className="mono text-micro tracking-[0.2em]">06</span>
              導入・実証について相談する
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
