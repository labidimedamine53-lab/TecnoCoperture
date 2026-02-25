"use client";

import { useRouter } from "next/navigation";

import { type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  locale: Locale;
  theme?: "dark" | "light";
  size?: "md" | "lg";
};

const options: { value: Locale; label: string }[] = [
  { value: "it", label: "IT" },
  { value: "en", label: "EN" },
];

export function LanguageSwitcher({ locale, theme = "dark", size = "md" }: LanguageSwitcherProps) {
  const router = useRouter();

  const setLocale = async (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    await fetch("/api/locale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ locale: nextLocale }),
    });
    router.refresh();
  };

  return (
    <div
      className={cn(
        "inline-flex rounded-full p-1",
        theme === "dark"
          ? "border border-slate-600/80 bg-slate-900/70"
          : "border border-slate-300/90 bg-white/80 backdrop-blur-sm",
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setLocale(option.value)}
          className={cn(
            "rounded-full font-semibold transition duration-300",
            size === "lg" ? "px-3.5 py-2 text-sm" : "px-3 py-1.5 text-xs",
            locale === option.value
              ? "bg-[linear-gradient(135deg,#0ea5e9_0%,#06b6d4_50%,#0ea5e9_100%)] text-white shadow-[0_10px_20px_-12px_rgba(14,165,233,0.95)]"
              : theme === "dark"
                ? "text-slate-200 hover:bg-slate-800 hover:text-white"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
          )}
          aria-label={`Switch language to ${option.value === "it" ? "Italian" : "English"}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
