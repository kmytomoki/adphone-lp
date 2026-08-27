import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { PrimaryButton } from "@/components/site/Buttons";
import {
  AUDIENCE_OPTIONS,
  CONTACT_SUBJECTS,
  contactHref,
  publicContact,
  type ContactSubject,
} from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "導入・実証・共創のご相談",
  description:
    "県・自治体への導入、企業の防災・BCP、実証実験、防災事業の共創についてADREN（アドレン）へ相談できます。",
};

// 「資料が欲しいだけ」と「人に相談したい」を同じフォームに集約しない。
// 前者は登録不要で /document をその場で読める導線に分ける。
const entryPoints = [
  {
    eyebrow: "まず情報を確認する",
    title: "まず資料を読みたい",
    body: "課題・仕組み・特長・仕様・実績をまとめた製品概要資料です。登録もお問い合わせも不要で、その場でお読みいただけます。印刷・PDF保存にも対応しています。",
    cta: "製品概要資料を見る",
    href: "/document",
    highlighted: true,
    needsForm: false,
  },
  {
    eyebrow: "担当者と検討する",
    title: "担当者に相談したい",
    body: "県・自治体への導入、企業のBCP、既存防災システムとの連携、共同実証などの具体的なご相談はこちら。数営業日以内に担当者よりご連絡いたします。",
    cta: "相談フォームへ",
    href: "#contact-form",
    highlighted: false,
    needsForm: true,
  },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string | string[] }>;
}) {
  const rawSubject = (await searchParams).subject;
  const requestedSubject = Array.isArray(rawSubject) ? rawSubject[0] : rawSubject;
  const selectedSubject = CONTACT_SUBJECTS.includes(requestedSubject as ContactSubject)
    ? (requestedSubject as ContactSubject)
    : undefined;

  // 送信先が設定されていないときはフォームを出さない。
  // 押しても何も起きないフォームは、窓口が無いことより信用を損なう。
  const formEnabled = Boolean(process.env.CONTACT_FORM_ENDPOINT);

  const details = [
    { label: "EMAIL", value: publicContact.email, href: `mailto:${publicContact.email}` },
    { label: "PHONE", value: publicContact.phone, href: `tel:${publicContact.phone}` },
    { label: "ADDRESS", value: publicContact.address, href: null },
  ].filter((detail) => Boolean(detail.value));

  return (
    <main className="flex-1">
      <PageHero
        eyebrow="CONTACT"
        title="導入検討・技術相談の窓口"
        lede="県・自治体、企業の防災・BCP、防災事業の共創まで。資料を読む導線と、担当者へ相談する導線を分けています。"
      />

      <section className="px-6 py-14 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          {entryPoints.map((entry) => (
            <article
              key={entry.title}
              className={
                entry.highlighted
                  ? "hover-card frame-ticks border-2 border-ink bg-white p-8"
                  : "hover-card border border-line-soft bg-white p-8"
              }
            >
              <p className="mono mb-2 text-micro tracking-[0.15em] text-ink-soft">{entry.eyebrow}</p>
              <h2 className="mincho mb-3 text-3xl">{entry.title}</h2>
              <p className="mb-5 text-body text-ink-soft">{entry.body}</p>
              {entry.needsForm && !formEnabled ? null : (
                <PrimaryButton href={entry.href}>{entry.cta}</PrimaryButton>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-14 md:px-12">
        <div className="mx-auto max-w-3xl border border-line-soft bg-white p-8">
          <h2 className="mincho text-3xl" id="contact-form">
            お問い合わせフォーム
          </h2>
          {formEnabled ? (
            <>
              <p className="mt-3 text-body text-ink-soft">
                ご相談の立場を選ぶと、お問い合わせ種別がフォームへ反映されます。
              </p>
              <div className="my-6 grid gap-3 sm:grid-cols-3" aria-label="ご相談の立場">
                {AUDIENCE_OPTIONS.map((audience) => {
                  const selected = audience.subject === selectedSubject;
                  return (
                    <Link
                      key={audience.subject}
                      href={contactHref(audience.subject)}
                      className={
                        selected
                          ? "border border-brand-accent bg-paper p-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
                          : "border border-line-soft bg-paper p-4 transition-colors hover:border-brand-accent hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
                      }
                      aria-current={selected ? "true" : undefined}
                    >
                      <span className="mincho block text-lg">{audience.label}</span>
                      <span className="mt-1 block text-base leading-7 text-ink-soft">
                        {selected ? "選択中" : "この立場で相談する"}
                      </span>
                    </Link>
                  );
                })}
              </div>
              <ContactForm key={selectedSubject ?? "none"} defaultSubject={selectedSubject} />
            </>
          ) : (
            <p className="text-body text-ink-soft">
              お問い合わせ窓口は現在準備中です。受付を開始次第、このページでご案内します。
            </p>
          )}
        </div>
      </section>

      {details.length > 0 ? (
        <section className="px-6 pb-20 md:px-12">
          <div className="mx-auto grid max-w-6xl gap-4 border border-line-soft bg-paper-2 p-8 md:grid-cols-3">
            {details.map((detail) => (
              <div key={detail.label}>
                <p className="mono text-micro tracking-[0.15em] text-ink-soft">{detail.label}</p>
                {detail.href ? (
                  <a href={detail.href} className="text-body text-ink">
                    {detail.value}
                  </a>
                ) : (
                  <p className="text-body text-ink">{detail.value}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
