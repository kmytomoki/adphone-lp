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
const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-mincho",
  preload: false,
  display: "swap",
});
const ibmPlexSansJp = IBM_Plex_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
  preload: false,
  display: "swap",
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
    "災害時でも通信を止めない。BLEとLPWAメッシュで自治体の情報伝達を支えるADREN（アドレン）の公式サイト。Rewave Technology が開発しています。",
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
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
