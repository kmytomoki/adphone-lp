"use client";

import Link from "next/link";
import { useActionState } from "react";
import { CONTACT_SUBJECTS, type ContactSubject } from "@/lib/site";
import { initialContactFormState } from "./form-state";
import { submitContact } from "./actions";

const FIELD_CLASS =
  "w-full min-h-12 border border-line bg-paper px-4 py-3 text-base transition-colors outline-none focus:border-ink focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

// エラーは brand-accent（見出しや矢印にも使う赤）ではなく danger で出す。
// 装飾の赤とエラーの赤が同じだと、実際の警告が装飾に埋もれる。
// 色だけに意味を持たせないよう、アイコンと背景も併用する。
function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <span
      id={id}
      className="mt-2 flex items-start gap-2 border-l-2 border-danger bg-danger-wash px-3 py-2 text-base text-danger"
    >
      <svg aria-hidden viewBox="0 0 20 20" className="mt-1 size-4 flex-none" fill="currentColor">
        <path d="M10 1.5 19 18H1L10 1.5Zm0 5.5a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-1-1Zm0 8.5a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Z" />
      </svg>
      <span>{children}</span>
    </span>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
};

function TextField({ id, label, type = "text", autoComplete, required, error }: TextFieldProps) {
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-2 block text-base font-medium text-ink">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={FIELD_CLASS}
      />
      {error ? <FieldError id={`${id}-error`}>{error}</FieldError> : null}
    </label>
  );
}

export function ContactForm({ defaultSubject }: { defaultSubject?: ContactSubject }) {
  const [state, formAction, pending] = useActionState(submitContact, initialContactFormState);

  // 送信後に一行だけ返して終わると、読み手はページを閉じるしかない。
  // 返信を待つ間に読めるものへ繋ぐ。
  if (state.status === "success") {
    return (
      <div role="status" className="border-l-2 border-ink bg-paper p-6">
        <p className="text-body text-ink">{state.message}</p>
        <p className="mt-4 text-compact text-ink-soft">
          ご返信をお待ちいただく間に、製品概要資料をご覧いただけます。登録は不要です。
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6">
          <Link
            href="/document"
            className="flex min-h-11 items-center text-base text-brand-accent underline underline-offset-4 hover:text-ink"
          >
            製品概要資料を読む
          </Link>
          <Link
            href="/usecases"
            className="flex min-h-11 items-center text-base text-brand-accent underline underline-offset-4 hover:text-ink"
          >
            活用例を見る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {/* ボット避け。スクリーンリーダーと視覚の両方から外す。 */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <TextField
        id="organization"
        label="組織名（自治体・企業名）"
        autoComplete="organization"
        required
        error={state.fieldErrors.organization}
      />
      <TextField
        id="name"
        label="ご担当者氏名"
        autoComplete="name"
        required
        error={state.fieldErrors.name}
      />
      <TextField id="department" label="部署・役職" autoComplete="organization-title" />
      <TextField
        id="email"
        label="メールアドレス"
        type="email"
        autoComplete="email"
        required
        error={state.fieldErrors.email}
      />
      {/* 自治体は電話で折り返す運用が根強い。メールだけだと確認が滞る。 */}
      <TextField
        id="phone"
        label="電話番号"
        type="tel"
        autoComplete="tel"
        error={state.fieldErrors.phone}
      />

      <fieldset className="block border-0 p-0">
        <legend className="mb-2 block text-base font-medium text-ink">ご希望の連絡方法</legend>
        <div className="flex flex-wrap gap-x-6">
          {["メール", "電話", "どちらでも"].map((method, index) => (
            <label key={method} className="flex min-h-12 items-center gap-2 text-base text-ink">
              <input
                type="radio"
                name="contactMethod"
                value={method}
                defaultChecked={index === 0}
                className="size-5 accent-ink"
              />
              {method}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block" htmlFor="subject">
        <span className="mb-2 block text-base font-medium text-ink">お問い合わせ種別 *</span>
        <select
          id="subject"
          name="subject"
          required
          defaultValue={defaultSubject ?? ""}
          aria-invalid={state.fieldErrors.subject ? true : undefined}
          aria-describedby={state.fieldErrors.subject ? "subject-error" : undefined}
          className={FIELD_CLASS}
        >
          <option value="" disabled>
            選択してください
          </option>
          {CONTACT_SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        {state.fieldErrors.subject ? (
          <FieldError id="subject-error">{state.fieldErrors.subject}</FieldError>
        ) : null}
      </label>

      <label className="block" htmlFor="message">
        <span className="mb-2 block text-base font-medium text-ink">ご質問・ご相談内容</span>
        <textarea id="message" name="message" className={`${FIELD_CLASS} h-28`} />
      </label>

      <p className="text-body text-ink-soft">
        ご記入いただいた内容は、お問い合わせへの回答のためにのみ利用します。取り扱いの詳細は
        <Link href="/privacy" className="underline underline-offset-4 hover:text-brand-accent">
          プライバシーポリシー
        </Link>
        をご確認ください。
      </p>

      {state.status === "error" ? (
        <p
          role="alert"
          className="border-l-2 border-danger bg-danger-wash px-4 py-3 text-base font-medium text-danger"
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="min-h-12 rounded-sm border border-ink bg-ink px-6 py-4 text-base font-medium tracking-[0.04em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-accent hover:shadow-[4px_4px_0_0_rgba(26,31,46,0.25)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-ink disabled:hover:shadow-none"
      >
        {pending ? "送信中..." : "送信する"}
      </button>
    </form>
  );
}
