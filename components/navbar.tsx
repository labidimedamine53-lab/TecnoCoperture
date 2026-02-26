import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { buttonVariants } from "@/components/ui/button";
import logo from "@/assets/tecnocoperture_logo_navbar.svg";
import { isItalian, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type NavbarProps = {
  locale: Locale;
};

export function Navbar({ locale }: NavbarProps) {
  const italian = isItalian(locale);
  const navLinks = [
    { href: "/", label: italian ? "Home" : "Home" },
    { href: "/coperture", label: italian ? "Coperture" : "Roof Types" },
    { href: "/portfolio", label: italian ? "Portfolio" : "Portfolio" },
    { href: "/contatti", label: italian ? "Contatti" : "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-sky-200/20 bg-[linear-gradient(90deg,rgba(30,41,59,0.82)_0%,rgba(51,65,85,0.78)_38%,rgba(14,116,144,0.74)_72%,rgba(103,232,249,0.58)_100%)] shadow-[0_10px_30px_-18px_rgba(3,37,65,0.85)] backdrop-blur-xl supports-[backdrop-filter]:bg-[linear-gradient(90deg,rgba(30,41,59,0.72)_0%,rgba(51,65,85,0.68)_38%,rgba(14,116,144,0.65)_72%,rgba(103,232,249,0.5)_100%)]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-14 items-center md:hidden">
          <LanguageSwitcher locale={locale} />

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src={logo}
              alt="Tecnocoperture logo"
              priority
              className="h-14 w-auto max-w-[190px] object-contain transition-transform hover:scale-[1.04]"
            />
          </Link>

          <details className="relative ml-auto">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-slate-600/80 bg-slate-900/70 text-slate-100 transition hover:bg-slate-800 [&::-webkit-details-marker]:hidden">
              <Menu className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">{italian ? "Apri menu" : "Open menu"}</span>
            </summary>
            <nav className="absolute right-0 mt-2 w-48 rounded-xl border border-white/15 bg-slate-900/95 p-2 shadow-xl backdrop-blur">
              {navLinks.map((link) => (
                <Link
                  key={`mobile-${link.href}`}
                  href={link.href}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-800 hover:text-sky-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>

        <div className="hidden h-20 items-center justify-between md:flex">
          <Link href="/" className="inline-flex h-full items-center">
            <Image
              src={logo}
              alt="Tecnocoperture logo"
              priority
              className="h-11 w-auto object-contain transition-transform hover:scale-[1.03] lg:h-12 xl:h-12"
            />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-base font-medium text-slate-100 transition after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-sky-300 after:transition-all hover:text-sky-300 hover:after:w-full lg:text-[17px]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} size="lg" />
            <Link
              href="/contatti"
              className={cn(buttonVariants(), "hidden h-11 px-5 text-base md:inline-flex")}
            >
              {italian ? "Richiedi Preventivo" : "Request a Quote"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
