export const localeCookieName = "site-locale";
export const supportedLocales = ["it", "en"] as const;

export type Locale = (typeof supportedLocales)[number];

export function normalizeLocale(value: string | undefined | null): Locale {
  return value === "en" ? "en" : "it";
}

export function isItalian(locale: Locale) {
  return locale === "it";
}
