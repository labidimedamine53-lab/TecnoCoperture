import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { siteConfig } from "@/lib/constants";
import { isItalian, type Locale } from "@/lib/i18n";

type WhatsAppFloatingButtonProps = {
  locale: Locale;
};

export function WhatsAppFloatingButton({ locale }: WhatsAppFloatingButtonProps) {
  const italian = isItalian(locale);

  return (
    <Link
      href={`https://wa.me/${siteConfig.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-50 inline-flex h-12 items-center gap-2 rounded-full bg-emerald-500 px-4 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:bottom-6 sm:right-6 motion-safe:animate-[floatY_3.6s_ease-in-out_infinite]"
      aria-label={italian ? "Contattaci su WhatsApp" : "Contact us on WhatsApp"}
    >
      <MessageCircle className="h-5 w-5" />
      WhatsApp
    </Link>
  );
}
