import Link from "next/link";

const columns = [
  { title: "Product", items: ["概要", "仕様", "セキュリティ", "価格"] },
  { title: "Resources", items: ["ユースケース", "技術ドキュメント", "研究論文", "FAQ"] },
  { title: "Company", items: ["会社情報", "チーム", "お問い合わせ", "採用"] },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-brand-accent bg-ink px-6 py-12 text-white md:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 border-b border-white/10 pb-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <p className="mincho text-2xl font-bold tracking-[0.05em]">
            AD<span className="text-brand-accent-soft">REN</span>
          </p>
          <p className="mono mt-1 text-[10px] tracking-[0.2em] text-white/50">AD-HOC / DISASTER-RESILIENT / EMERGENCY NETWORK</p>
          <p className="mt-4 max-w-xs text-sm leading-7 text-white/70">
            災害時、通信が途絶えても、情報は止めない。自治体のための分散型災害情報ネットワーク。
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="mono mb-4 text-[11px] tracking-[0.2em] text-brand-accent-soft uppercase">{col.title}</p>
            <ul className="space-y-2 text-sm text-white/70">
              {col.items.map((item) => (
                <li key={item} className="transition-colors hover:text-white">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-6 flex max-w-6xl flex-col gap-2 text-[10px] tracking-[0.15em] text-white/50 sm:flex-row sm:justify-between">
        <span>© 2026 Rewave Technology</span>
        <div className="flex gap-4">
          <Link href="/contact" className="link-line transition-colors hover:text-white">
            PRIVACY
          </Link>
          <Link href="/contact" className="link-line transition-colors hover:text-white">
            TERMS
          </Link>
          <Link href="/contact" className="link-line transition-colors hover:text-white">
            SECURITY
          </Link>
        </div>
      </div>
    </footer>
  );
}
