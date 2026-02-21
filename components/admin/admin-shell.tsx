import Link from "next/link";
import { LayoutDashboard, FolderKanban, FileSpreadsheet } from "lucide-react";

import { adminLogoutAction } from "@/lib/actions/admin";
import { LanguageSwitcher } from "@/components/language-switcher";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { isItalian, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type AdminShellProps = {
  currentPath: string;
  locale: Locale;
  children: React.ReactNode;
};

export function AdminShell({ currentPath, locale, children }: AdminShellProps) {
  const italian = isItalian(locale);
  const links = [
    { href: "/admin/dashboard", label: italian ? "Dashboard" : "Dashboard", icon: LayoutDashboard },
    { href: "/admin/requests", label: italian ? "Richieste" : "Requests", icon: FileSpreadsheet },
    { href: "/admin/projects", label: italian ? "Progetti" : "Projects", icon: FolderKanban },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Admin</p>
            <p className="text-lg font-bold text-slate-900">{siteConfig.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} theme="light" />
            <form action={adminLogoutAction}>
              <button
                type="submit"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                {italian ? "Esci" : "Sign out"}
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8">
        <aside className="rounded-xl border border-slate-200 bg-white p-4">
          <nav className="space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              const active = currentPath.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition",
                    active
                      ? "bg-sky-50 text-sky-700"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
