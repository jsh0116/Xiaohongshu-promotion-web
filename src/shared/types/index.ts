export type ActionResult<T = void> =
  | { ok: true; data?: T }
  | { ok: false; error: string };

export type UserType = "biz" | "inf";

export type Locale = "ko" | "zh";
