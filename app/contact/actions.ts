"use server";

import { CONTACT_SUBJECTS } from "@/lib/site";
import type { ContactFormState } from "./form-state";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // ボット避け。人間には見えない項目なので、埋まっていれば送信せず成功だけ返す。
  if (text(formData, "website")) {
    return { status: "success", message: "お問い合わせを受け付けました。", fieldErrors: {} };
  }

  const organization = text(formData, "organization");
  const name = text(formData, "name");
  const department = text(formData, "department");
  const email = text(formData, "email");
  const subject = text(formData, "subject");
  const message = text(formData, "message");

  const fieldErrors: Record<string, string> = {};
  if (!organization) fieldErrors.organization = "自治体名・組織名を入力してください。";
  if (!name) fieldErrors.name = "ご担当者氏名を入力してください。";
  if (!email) fieldErrors.email = "メールアドレスを入力してください。";
  else if (!EMAIL_PATTERN.test(email)) fieldErrors.email = "メールアドレスの形式が正しくありません。";
  if (!CONTACT_SUBJECTS.includes(subject as (typeof CONTACT_SUBJECTS)[number])) {
    fieldErrors.subject = "お問い合わせ種別を選択してください。";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "入力内容をご確認ください。", fieldErrors };
  }

  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  if (!endpoint) {
    // 送信先が未設定のままフォームを公開しないための保険。
    // 通常は page.tsx 側でフォーム自体が描画されない。
    console.error("CONTACT_FORM_ENDPOINT is not set; contact submission was dropped.");
    return {
      status: "error",
      message: "現在お問い合わせフォームをご利用いただけません。お手数ですが時間をおいてお試しください。",
      fieldErrors: {},
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        organization,
        name,
        department: department || "(未記入)",
        email,
        subject,
        message: message || "(未記入)",
        _subject: `[サイト経由] ${subject} / ${organization}`,
      }),
    });

    if (!response.ok) {
      console.error(`Contact form endpoint responded with ${response.status}`);
      return {
        status: "error",
        message: "送信に失敗しました。お手数ですが時間をおいて再度お試しください。",
        fieldErrors: {},
      };
    }
  } catch (error) {
    console.error("Contact form submission failed", error);
    return {
      status: "error",
      message: "送信に失敗しました。通信環境をご確認のうえ、再度お試しください。",
      fieldErrors: {},
    };
  }

  return {
    status: "success",
    message: "お問い合わせを受け付けました。担当者より数営業日以内にご連絡いたします。",
    fieldErrors: {},
  };
}
