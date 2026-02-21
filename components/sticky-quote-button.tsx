import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isItalian, type Locale } from "@/lib/i18n";

type StickyQuoteButtonProps = {
  locale: Locale;
};

export function StickyQuoteButton({ locale }: StickyQuoteButtonProps) {
  const italian = isItalian(locale);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/80 bg-white/90 px-4 py-3 shadow-[0_-10px_28px_rgba(2,6,23,0.16)] backdrop-blur md:hidden">
      <Link
        href="/contatti"
        className={cn(
          buttonVariants({ size: "lg" }),
          "w-full motion-safe:animate-[floatY_3.8s_ease-in-out_infinite]",
        )}
      >
        {italian ? "Richiedi Preventivo" : "Request a Quote"}
      </Link>
    </div>
  );
}
