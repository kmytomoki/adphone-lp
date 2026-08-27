"use client";

import Link from "next/link";
import { useActionState } from "react";
import { CONTACT_SUBJECTS, type ContactSubject } from "@/lib/site";
import { initialContactFormState } from "./form-state";
import { submitContact } from "./actions";

const FIELD_CLASS =
  "w-full min-h-12 border border-line bg-paper px-4 py-3 text-base transition-colors outline-none focus:border-ink focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

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
      {error ? (
        <span id={`${id}-error`} className="mt-2 block text-base text-brand-accent">
          {error}
        </span>
      ) : null}
    </label>
  );
}

export function ContactForm({ defaultSubject }: { defaultSubject?: ContactSubject }) {
  const [state, formAction, pending] = useActionState(submitContact, initialContactFormState);

  if (state.status === "success") {
    return (
      <p className="text-body text-ink" role="status">
        {state.message}
      </p>
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
          <span id="subject-error" className="mt-2 block text-base text-brand-accent">
            {state.fieldErrors.subject}
          </span>
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
        <p role="alert" className="text-base font-medium text-brand-accent">
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
