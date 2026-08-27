import type { Metadata } from "next";
import { Suspense } from "react";
import { DocumentView } from "@/components/document/DocumentView";

export const metadata: Metadata = {
  title: "製品概要資料",
  description:
    "ADREN（アドレン）の製品概要資料。自治体・企業・防災事業者向けに、課題・仕組み・特長・仕様・実績をまとめています。登録不要で閲覧・印刷・PDF保存できます。",
};

export default function DocumentPage() {
  return (
    <main className="flex-1 px-6 py-12 md:px-12 print:px-0 print:py-0">
      <Suspense
        fallback={
          <div className="mx-auto max-w-4xl border border-line-soft bg-white p-8 text-body text-ink-soft">
            資料を読み込んでいます…
          </div>
        }
      >
        <DocumentView />
      </Suspense>
    </main>
  );
}
