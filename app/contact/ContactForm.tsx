"use client";

import { useActionState } from "react";
import { CONTACT_SUBJECTS } from "@/lib/site";
import { initialContactFormState } from "./form-state";
import { submitContact } from "./actions";

const FIELD_CLASS =
  "w-full border border-line bg-paper px-3 py-2 text-sm transition-colors outline-none focus:border-ink focus:bg-white";

type TextFieldProps = {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
};

function TextField({ id, label, type = "text", required, error }: TextFieldProps) {
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-1 block text-xs text-ink-soft">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={FIELD_CLASS}
      />
      {error ? (
        <span id={`${id}-error`} className="mt-1 block text-xs text-brand-accent">
          {error}
        </span>
      ) : null}
    </label>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialContactFormState);

  if (state.status === "success") {
    return (
      <p className="text-sm leading-8 text-ink" role="status">
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

      <TextField id="organization" label="自治体名・組織名" required error={state.fieldErrors.organization} />
      <TextField id="name" label="ご担当者氏名" required error={state.fieldErrors.name} />
      <TextField id="department" label="部署・役職" />
      <TextField id="email" label="メールアドレス" type="email" required error={state.fieldErrors.email} />

      <label className="block" htmlFor="subject">
        <span className="mb-1 block text-xs text-ink-soft">お問い合わせ種別 *</span>
        <select id="subject" name="subject" required defaultValue={CONTACT_SUBJECTS[0]} className={FIELD_CLASS}>
          {CONTACT_SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        {state.fieldErrors.subject ? (
          <span className="mt-1 block text-xs text-brand-accent">{state.fieldErrors.subject}</span>
        ) : null}
      </label>

      <label className="block" htmlFor="message">
        <span className="mb-1 block text-xs text-ink-soft">ご質問・ご相談内容</span>
        <textarea id="message" name="message" className={`${FIELD_CLASS} h-28`} />
      </label>

      <p className="text-xs leading-6 text-ink-soft">
        ご記入いただいた内容は、お問い合わせへの回答のためにのみ利用します。
      </p>

      {state.status === "error" ? (
        <p role="alert" className="text-xs text-brand-accent">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-sm border border-ink bg-ink px-5 py-3 text-xs tracking-[0.08em] text-white uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-accent hover:shadow-[4px_4px_0_0_rgba(26,31,46,0.25)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-ink disabled:hover:shadow-none"
      >
        {pending ? "送信中..." : "送信する"}
      </button>
    </form>
  );
}
