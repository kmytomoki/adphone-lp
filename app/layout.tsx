import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_JP, Shippori_Mincho } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";

const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-mincho",
});
const ibmPlexSansJp = IBM_Plex_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
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
