import type { Metadata } from "next";
import { FinalCta } from "@/components/site/FinalCta";
import { PageHero } from "@/components/site/PageHero";
import { TechnologyView } from "@/components/technology/TechnologyView";

export const metadata: Metadata = {
  title: "技術・セキュリティ",
  description:
    "ADREN（アドレン）のBLE・LoRa通信構成、オフラインデータ、暗号化、信頼度評価、オフライン地図の技術設計を紹介します。",
};

export default function TechnologyPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="技術"
        title="実装可能性と運用性を両立した技術構成"
        lede="導入検討に必要な要点と、技術連携に必要な詳細を分けて整理しています。オンライン時の拡張性と、オフライン時の継続運用を両立する設計です。"
      />
      <TechnologyView />
      <FinalCta />
    </main>
  );
}
