import Link from "next/link";

import { siteConfig } from "@/lib/constants";
import { LanguageSwitcher } from "@/components/language-switcher";
import { buttonVariants } from "@/components/ui/button";
import { isItalian, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type NavbarProps = {
  locale: Locale;
};

export function Navbar({ locale }: NavbarProps) {
  const italian = isItalian(locale);
  const navLinks = [
    { href: "/", label: italian ? "Home" : "Home" },
    { href: "/servizi", label: italian ? "Servizi" : "Services" },
    { href: "/coperture", label: italian ? "Coperture" : "Roof Types" },
    { href: "/portfolio", label: italian ? "Portfolio" : "Portfolio" },
    { href: "/contatti", label: italian ? "Contatti" : "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-slate-950/90 backdrop-blur supports-[backdrop-filter]:bg-slate-950/75">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold tracking-wide text-white">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-slate-100 transition after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-sky-300 after:transition-all hover:text-sky-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <Link
            href="/contatti"
            className={cn(buttonVariants(), "hidden md:inline-flex")}
          >
            {italian ? "Richiedi Preventivo" : "Request a Quote"}
          </Link>
        </div>
      </div>
    </header>
  );
}
