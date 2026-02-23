import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { StickyQuoteButton } from "@/components/sticky-quote-button";
import { WhatsAppFloatingButton } from "@/components/whatsapp-floating-button";
import type { Locale } from "@/lib/i18n";

type SiteShellProps = {
  locale: Locale;
  currentYear: number;
  isAdminPath: boolean;
  children: React.ReactNode;
};

export function SiteShell({ locale, currentYear, isAdminPath, children }: SiteShellProps) {
  if (isAdminPath) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar locale={locale} />
      {children}
      <Footer locale={locale} currentYear={currentYear} />
      <WhatsAppFloatingButton locale={locale} />
      <StickyQuoteButton locale={locale} />
    </>
  );
}
