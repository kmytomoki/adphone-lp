import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_JP, Shippori_Mincho } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";

// 日本語フォントは Google 側で約75個の unicode-range サブセットに分割されている。
// next/font は既定で全サブセットを preload するため、ウェイト数 x 75 個の
// <link rel="preload"> が head に並び、初回表示が極端に遅くなる。
// preload を切ると、ブラウザは実際に使う文字が含まれるサブセットだけを取得する。
// weight は実際にページで使われているものだけに絞ってある。
// fallback には日本語フォントを明示する。next/font の自動フォールバックは
// Arial のメトリクスを基準にするため、日本語の字幅とは合わず、swap 前後で
// レイアウトがずれる。OS標準の日本語フォントを先に置いて、ずれを小さくする。
const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-mincho",
  preload: false,
  display: "swap",
  fallback: ["Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", "serif"],
});
const ibmPlexSansJp = IBM_Plex_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
  preload: false,
  display: "swap",
  fallback: ["Hiragino Sans", "Yu Gothic UI", "Meiryo", "sans-serif"],
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mono",
  preload: false,
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ADREN | 災害時オフライン通信",
    template: "%s | ADREN",
  },
  description:
    "災害時でも通信を止めない。BLEとLPWAメッシュで県・自治体、企業、防災事業者の情報伝達を支えるADREN（アドレン）の公式サイト。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={cn(
        "h-full antialiased",
        shipporiMincho.variable,
        ibmPlexSansJp.variable,
        ibmPlexMono.variable
      )}
    >
      <body className="min-h-full bg-paper text-ink flex flex-col font-sans">
        <a
          href="#main-content"
          className="fixed top-4 left-4 z-[100] -translate-y-24 bg-ink px-5 py-3 text-base font-medium text-white transition-transform focus:translate-y-0"
        >
          本文へ移動
        </a>
        <Nav />
        <div id="main-content" className="flex flex-1 flex-col" tabIndex={-1}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
