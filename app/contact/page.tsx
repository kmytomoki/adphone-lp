import { PageHero } from "@/components/site/PageHero";
import { PrimaryButton } from "@/components/site/Buttons";

export default function ContactPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="CONTACT"
        title="導入検討・技術相談の窓口"
        lede="資料請求・自治体導入相談・実証実験相談を分けた導線を用意しています。検討段階に応じてご相談ください。"
      />

      <section className="px-6 py-14 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          <article className="border-2 border-ink bg-white p-8">
            <p className="mono mb-2 text-[11px] tracking-[0.15em] text-ink-soft">FOR EVALUATION</p>
            <h2 className="mincho mb-3 text-3xl">資料請求</h2>
            <p className="mb-5 text-sm leading-8 text-ink-soft">
              導入検討向けの概要資料をお送りします。まずは情報収集から始めたい自治体・教育機関担当者向けです。
            </p>
            <PrimaryButton href="mailto:contact@adophone.example.jp?subject=資料請求">
              メールで資料請求
            </PrimaryButton>
          </article>

          <article className="border border-line-soft bg-white p-8">
            <p className="mono mb-2 text-[11px] tracking-[0.15em] text-ink-soft">FOR DETAILED INQUIRY</p>
            <h2 className="mincho mb-3 text-3xl">自治体導入・実証相談</h2>
            <p className="mb-5 text-sm leading-8 text-ink-soft">
              実証実験、既存システム連携、学校・避難所配備、導入スケジュールなどの具体的なご相談はこちら。
            </p>
            <PrimaryButton href="mailto:contact@adophone.example.jp?subject=自治体導入・実証相談">
              メールで相談する
            </PrimaryButton>
          </article>
        </div>
      </section>

      <section className="px-6 pb-14 md:px-12">
        <div className="mx-auto max-w-3xl border border-line-soft bg-white p-8">
          <h2 className="mincho mb-6 text-3xl">お問い合わせフォーム</h2>
          <div className="space-y-4">
            {/* TODO: Replace with Server Actions or external form service */}
            {[
              "自治体名・組織名 *",
              "ご担当者氏名 *",
              "部署・役職",
              "メールアドレス *",
            ].map((label) => (
              <label key={label} className="block">
                <span className="mb-1 block text-xs text-ink-soft">{label}</span>
                <input
                  type="text"
                  className="w-full border border-line bg-paper px-3 py-2 text-sm"
                  placeholder={label}
                />
              </label>
            ))}

            <label className="block">
              <span className="mb-1 block text-xs text-ink-soft">お問い合わせ種別 *</span>
              <select className="w-full border border-line bg-paper px-3 py-2 text-sm">
                <option>資料請求</option>
                <option>自治体導入相談</option>
                <option>実証実験相談</option>
                <option>学校・避難所配備検討</option>
                <option>その他</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-xs text-ink-soft">ご質問・ご相談内容</span>
              <textarea className="h-28 w-full border border-line bg-paper px-3 py-2 text-sm" />
            </label>

            <button
              type="button"
              className="rounded-sm border border-ink bg-ink px-5 py-3 text-xs tracking-[0.08em] text-white uppercase"
            >
              送信する（準備中）
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-4 border border-line-soft bg-paper-2 p-8 md:grid-cols-3">
          <div>
            <p className="mono text-[10px] tracking-[0.15em] text-ink-soft">EMAIL</p>
            <a href="mailto:contact@adophone.example.jp" className="text-sm text-ink">
              contact@adophone.example.jp
            </a>
          </div>
          <div>
            <p className="mono text-[10px] tracking-[0.15em] text-ink-soft">PHONE</p>
            <p className="text-sm text-ink">00-0000-0000</p>
          </div>
          <div>
            <p className="mono text-[10px] tracking-[0.15em] text-ink-soft">ADDRESS</p>
            <p className="text-sm text-ink">Tokyo, Japan (placeholder)</p>
          </div>
        </div>
      </section>
    </main>
  );
}
