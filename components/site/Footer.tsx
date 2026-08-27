import Link from "next/link";

// 実在するページだけを並べる。行き先の無い項目は置かない（ダミーリンクは信用を損なう）。
const columns: { title: string; items: { label: string; href: string }[] }[] = [
  {
    title: "製品",
    items: [
      { label: "製品概要", href: "/product" },
      { label: "技術構成", href: "/technology" },
      { label: "ユースケース", href: "/usecases" },
    ],
  },
  {
    title: "資料",
    items: [
      { label: "製品概要資料（登録不要）", href: "/document" },
      { label: "セキュリティ設計", href: "/technology" },
    ],
  },
  {
    title: "会社情報",
    items: [
      { label: "会社情報・沿革", href: "/about" },
      { label: "導入・実証・共創のご相談", href: "/contact" },
      { label: "プライバシーポリシー", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-brand-accent bg-ink px-6 py-12 text-white md:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 border-b border-white/10 pb-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <p className="mincho text-2xl font-bold tracking-[0.05em]">
            AD<span className="text-brand-accent-soft">REN</span>
          </p>
          <p className="mono mt-1 text-micro tracking-[0.2em] text-white/50">
            災害時オフライン通信ネットワーク
          </p>
          <p className="mt-4 max-w-xs text-body text-white/75">
            災害時、通信が途絶えても、情報は止めない。自治体・企業・防災事業をつなぐ分散型災害情報ネットワーク。
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="mono mb-3 text-micro tracking-[0.2em] text-brand-accent-soft">{col.title}</p>
            <ul className="text-base text-white/75">
              {col.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex min-h-11 items-center transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-4 flex max-w-6xl flex-col gap-1 text-micro tracking-[0.15em] text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <span className="flex min-h-11 items-center">© 2026 Rewave Technology</span>
        <Link href="/privacy" className="link-line flex min-h-11 items-center transition-colors hover:text-white">
          プライバシーポリシー
        </Link>
      </div>
    </footer>
  );
}
