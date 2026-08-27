// "use server" のモジュールは async 関数しかエクスポートできないため、
// フォームの状態の型と初期値はこちらに置く。
export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Record<string, string>;
};

export const initialContactFormState: ContactFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
