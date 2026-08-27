"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-12 items-center gap-2 rounded-sm border border-ink bg-ink px-6 py-4 text-base font-medium tracking-[0.04em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-accent hover:shadow-[4px_4px_0_0_rgba(26,31,46,0.25)]"
    >
      <Printer className="size-5" aria-hidden />
      印刷 / PDFとして保存
    </button>
  );
}
