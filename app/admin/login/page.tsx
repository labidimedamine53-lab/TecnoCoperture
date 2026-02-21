import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AdminLoginForm } from "@/components/admin/login-form";
import { getLocale } from "@/lib/i18n-server";
import { isItalian } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const locale = await getLocale();
  const italian = isItalian(locale);

  return createMetadata({
    title: italian ? "Login Admin" : "Admin Login",
    description: italian
      ? "Accesso riservato area amministrativa TecnoCoperture."
      : "Restricted access to Tecno Coperture administrative area.",
    path: "/admin/login",
  });
}

export default async function AdminLoginPage() {
  const locale = await getLocale();
  const italian = isItalian(locale);
  const session = await auth();
  if (session?.user?.role === "ADMIN") {
    redirect("/admin/dashboard");
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-120px)] max-w-md items-center px-4 py-16">
      <section className="w-full rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
        <h1 className="text-3xl font-bold text-slate-900">
          {italian ? "Accesso Admin" : "Admin Access"}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {italian
            ? "Inserisci le credenziali per gestire richieste e portfolio."
            : "Enter your credentials to manage requests and portfolio items."}
        </p>
        <div className="mt-6">
          <AdminLoginForm locale={locale} />
        </div>
      </section>
    </main>
  );
}



