"use client";

import { useActionState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { isItalian, type Locale } from "@/lib/i18n";
import { adminLoginAction, type AdminLoginState } from "@/lib/actions/admin";
import { cn } from "@/lib/utils";

const initialState: AdminLoginState = {};

type AdminLoginFormProps = {
  locale: Locale;
};

export function AdminLoginForm({ locale }: AdminLoginFormProps) {
  const italian = isItalian(locale);
  const [state, formAction, isPending] = useActionState(adminLoginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="locale" value={locale} />
      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium text-slate-800">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-slate-800">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </div>

      {state.error ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className={cn(buttonVariants(), "w-full disabled:opacity-70")}
      >
        {isPending
          ? italian
            ? "Accesso in corso..."
            : "Signing in..."
          : italian
            ? "Accedi all'area admin"
            : "Sign in to admin area"}
      </button>
    </form>
  );
}
