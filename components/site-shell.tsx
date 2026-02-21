"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { StickyQuoteButton } from "@/components/sticky-quote-button";
import { WhatsAppFloatingButton } from "@/components/whatsapp-floating-button";
import type { Locale } from "@/lib/i18n";

type SiteShellProps = {
  locale: Locale;
  children: React.ReactNode;
};

export function SiteShell({ locale, children }: SiteShellProps) {
  const pathname = usePathname();
  const isAdminPath = pathname.startsWith("/admin");

  if (isAdminPath) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar locale={locale} />
      {children}
      <Footer locale={locale} />
      <WhatsAppFloatingButton locale={locale} />
      <StickyQuoteButton locale={locale} />
    </>
  );
}
