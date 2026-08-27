import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "ADREN（アドレン）公式サイトにおける個人情報の取り扱いについて。取得する情報、利用目的、第三者提供、開示請求の窓口を記載しています。",
};

// 記載できるのは実際の運用と一致することだけ。
// 送信基盤（Formspree）やホスティング（Vercel）を変えたときは、この文面も必ず更新する。
const REVISED = "2026年8月27日";

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "1. 事業者",
    body: (
      <p>
        本ポリシーは、Rewave Technology（沖縄工業高等専門学校発のチーム。以下「当チーム」）が運営する
        ADREN 公式サイト（https://adren-lp.vercel.app）における個人情報の取り扱いを定めるものです。
      </p>
    ),
  },
  {
    title: "2. 取得する情報",
    body: (
      <>
        <p>お問い合わせフォームの送信時に、以下の情報を取得します。</p>
        <ul className="mt-3 space-y-1">
          <li>・自治体名・組織名（必須）</li>
          <li>・ご担当者氏名（必須）</li>
          <li>・部署・役職（任意）</li>
          <li>・メールアドレス（必須）</li>
          <li>・お問い合わせ種別（必須）</li>
          <li>・ご質問・ご相談内容（任意）</li>
        </ul>
        <p className="mt-3">
          このほか、サイトの提供に用いるサーバー基盤において、アクセス日時・IPアドレス・ブラウザ情報などの
          アクセスログが技術的に記録されます。
        </p>
      </>
    ),
  },
  {
    title: "3. 利用目的",
    body: (
      <>
        <p>取得した情報は、次の目的にのみ利用します。</p>
        <ul className="mt-3 space-y-1">
          <li>・お問い合わせ・資料請求へのご回答およびご連絡</li>
          <li>・導入検討・実証実験に関するご相談への対応</li>
          <li>・サイトの不正利用防止および安定運用</li>
        </ul>
        <p className="mt-3">
          ご本人の同意なく、上記以外の目的で利用することはありません。営業目的の広告配信や、
          第三者へのリスト提供は行いません。
        </p>
      </>
    ),
  },
  {
    title: "4. 外部サービスへの委託",
    body: (
      <>
        <p>サイトの運用にあたり、以下の外部サービスを利用しています。送信内容はこれらのサービス上でも取り扱われます。</p>
        <ul className="mt-3 space-y-1">
          <li>
            ・フォーム送信基盤: Formspree（米国）—{" "}
            <a
              href="https://formspree.io/legal/privacy-policy/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-brand-accent"
            >
              プライバシーポリシー ↗
            </a>
          </li>
          <li>
            ・ホスティング: Vercel Inc.（米国）—{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-brand-accent"
            >
              プライバシーポリシー ↗
            </a>
          </li>
        </ul>
        <p className="mt-3">
          いずれも米国に所在する事業者であり、送信された情報は国外のサーバーで処理・保管されます。
          これらの利用目的の達成に必要な範囲を超えて、第三者へ個人情報を提供することはありません。
        </p>
      </>
    ),
  },
  {
    title: "5. Cookie・アクセス解析",
    body: (
      <p>
        当サイトでは、広告配信およびアクセス解析を目的とした Cookie を使用していません。行動ターゲティング広告の
        配信事業者への情報提供も行っていません。
      </p>
    ),
  },
  {
    title: "6. 保存期間",
    body: (
      <p>
        お問い合わせいただいた内容および連絡先は、対応の完了後、その後のご連絡に必要な期間を経過した時点で
        削除します。法令により保存が求められる場合は、その期間に従います。
      </p>
    ),
  },
  {
    title: "7. 開示・訂正・削除のご請求",
    body: (
      <p>
        ご自身の個人情報の開示・訂正・利用停止・削除をご希望の場合は、お問い合わせフォームよりご連絡ください。
        ご本人であることを確認のうえ、合理的な期間内に対応します。
      </p>
    ),
  },
  {
    title: "8. 改定",
    body: (
      <p>
        本ポリシーの内容は、法令の変更や運用の見直しに応じて改定することがあります。改定した場合は、
        本ページに改定日を明記して公表します。
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="PRIVACY"
        title="プライバシーポリシー"
        lede="お問い合わせフォームでお預かりする情報の取り扱いについて記載しています。"
      />

      <section className="px-6 py-14 md:px-12">
        <div className="mx-auto max-w-3xl border border-line-soft bg-white p-8 md:p-12">
          <p className="mono mb-8 text-micro tracking-[0.15em] text-ink-soft">最終改定日: {REVISED}</p>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="mincho mb-3 text-2xl">{section.title}</h2>
                <div className="text-body text-ink-soft">{section.body}</div>
              </section>
            ))}
          </div>

          <div className="mt-12 border-t border-line pt-6">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center rounded-sm border border-ink bg-ink px-6 py-4 text-base font-medium text-white transition-colors hover:bg-brand-accent"
            >
              お問い合わせフォームへ
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
