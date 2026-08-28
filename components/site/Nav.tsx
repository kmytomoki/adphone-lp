"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { AUDIENCE_OPTIONS } from "@/lib/site";
import { cn } from "@/lib/utils";

// 「ユースケース」は入れない。行き先が /usecases で「対象から探す」と重複するため、
// 対象別の入口に一本化してある。
const links = [
  { href: "/product", label: "製品" },
  { href: "/technology", label: "技術" },
  { href: "/about", label: "会社情報" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [audienceOpen, setAudienceOpen] = useState(false);
  const [mobileAudienceOpen, setMobileAudienceOpen] = useState(false);
  const audienceRef = useRef<HTMLDivElement>(null);
  const audienceButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (audienceRef.current && !audienceRef.current.contains(event.target as Node)) {
        setAudienceOpen(false);
      }
    }
    // Esc で閉じられないポップアップはキーボード利用者を閉じ込める。
    // フォーカスは開いたボタンへ戻す。
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setAudienceOpen((prev) => {
        if (prev) audienceButtonRef.current?.focus();
        return false;
      });
      setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-12">
        <Link
          href="/"
          aria-label="ADREN ホーム"
          className="mincho text-xl font-extrabold tracking-[0.05em]"
        >
          AD<span className="text-brand-accent">REN</span>
          <span className="mono block text-micro tracking-[0.25em] text-ink-soft">REWAVE TECHNOLOGY</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.slice(0, 1).map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={active}
                onClick={() => setAudienceOpen(false)}
                className={cn(
                  "link-line flex min-h-11 items-center text-body transition-colors",
                  active ? "text-ink font-semibold" : "text-ink-soft hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <div ref={audienceRef} className="relative">
            <button
              ref={audienceButtonRef}
              type="button"
              aria-expanded={audienceOpen}
              aria-controls="audience-menu"
              className={cn(
                "link-line flex min-h-11 items-center gap-1 text-body transition-colors",
                pathname === "/usecases" ? "text-ink font-semibold" : "text-ink-soft hover:text-ink"
              )}
              onClick={() => setAudienceOpen((prev) => !prev)}
            >
              対象から探す
              <ChevronDown
                aria-hidden
                className={cn("size-4 transition-transform", audienceOpen && "rotate-180")}
              />
            </button>
            {audienceOpen ? (
              // role="menu" は付けない。↑↓/Home/End のメニュー操作を実装していない以上、
              // role だけ名乗るとスクリーンリーダーに嘘の操作方法を伝えることになる。
              // 素のリンクリストなら支援技術が正しく扱う。
              <ul
                id="audience-menu"
                className="absolute top-full left-0 z-50 mt-2 w-88 border border-line-soft bg-white shadow-[8px_8px_0_0_rgba(26,31,46,0.06)]"
              >
                {AUDIENCE_OPTIONS.map((audience) => (
                  <li key={audience.subject} className="border-b border-line-soft p-4 last:border-b-0">
                    <p className="mincho text-lg text-ink">{audience.label}</p>
                    <p className="mt-1 text-base leading-7 text-ink-soft">{audience.description}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-5">
                      <Link
                        href={audience.usecasesHref}
                        className="flex min-h-11 items-center text-base text-brand-accent underline underline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
                        onClick={() => setAudienceOpen(false)}
                      >
                        活用例を見る
                      </Link>
                      <Link
                        href={`/document?audience=${audience.documentAudience}`}
                        className="flex min-h-11 items-center text-base text-brand-accent underline underline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
                        onClick={() => setAudienceOpen(false)}
                      >
                        資料を読む
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {links.slice(1).map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={active}
                onClick={() => setAudienceOpen(false)}
                className={cn(
                  "link-line flex min-h-11 items-center text-body transition-colors",
                  active ? "text-ink font-semibold" : "text-ink-soft hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-sm border-ink/30 px-4 text-base transition-colors hover:border-ink"
          >
            <Link href="/document" onClick={() => setAudienceOpen(false)}>資料を見る</Link>
          </Button>
          <Button asChild className="h-11 rounded-sm bg-ink px-4 text-base text-white transition-colors hover:bg-brand-accent">
            <Link href="/contact" onClick={() => setAudienceOpen(false)}>導入・共創を相談</Link>
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
            <Link
              href="/product"
              className="flex min-h-14 items-center border-b border-line-soft py-4 text-base text-ink transition-colors hover:text-brand-accent"
              onClick={() => setOpen(false)}
            >
              製品
            </Link>

            <button
              type="button"
              aria-expanded={mobileAudienceOpen}
              aria-controls="mobile-audience-menu"
              className="flex min-h-14 w-full items-center justify-between border-b border-line-soft py-4 text-base text-ink transition-colors hover:text-brand-accent"
              onClick={() => setMobileAudienceOpen((prev) => !prev)}
            >
              対象から探す
              <ChevronDown
                aria-hidden
                className={cn("size-5 transition-transform", mobileAudienceOpen && "rotate-180")}
              />
            </button>
            {mobileAudienceOpen ? (
              <ul id="mobile-audience-menu" className="border-b border-line-soft bg-paper-2 px-4 py-2">
                {AUDIENCE_OPTIONS.map((audience) => (
                  <li key={audience.subject} className="border-b border-line-soft py-3 last:border-b-0">
                    <p className="mincho text-lg">{audience.label}</p>
                    <p className="mt-0.5 text-base leading-7 text-ink-soft">{audience.description}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-5">
                      <Link
                        href={audience.usecasesHref}
                        className="flex min-h-11 items-center text-base text-brand-accent underline underline-offset-4"
                        onClick={() => setOpen(false)}
                      >
                        活用例を見る
                      </Link>
                      <Link
                        href={`/document?audience=${audience.documentAudience}`}
                        className="flex min-h-11 items-center text-base text-brand-accent underline underline-offset-4"
                        onClick={() => setOpen(false)}
                      >
                        資料を読む
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}

            {links.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex min-h-14 items-center border-b border-line-soft py-4 text-base text-ink transition-colors hover:text-brand-accent"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/document"
              onClick={() => setOpen(false)}
              className="flex min-h-14 items-center border-b border-line-soft py-4 text-base text-ink transition-colors hover:text-brand-accent"
            >
              資料を見る（登録不要）
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex min-h-14 items-center py-4 text-base font-semibold text-brand-accent"
            >
              導入・実証・共創を相談する
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
