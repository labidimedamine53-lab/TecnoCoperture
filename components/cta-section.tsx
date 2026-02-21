import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { isItalian, type Locale } from "@/lib/i18n";

type CTASectionProps = {
  title: string;
  description: string;
  locale: Locale;
};

export function CTASection({ title, description, locale }: CTASectionProps) {
  const italian = isItalian(locale);

  return (
    <section className="relative overflow-hidden bg-slate-900 py-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(56,189,248,0.25),transparent_40%),radial-gradient(circle_at_85%_82%,rgba(15,23,42,0.5),transparent_40%)]" />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-200">{description}</p>
        <div className="mt-8">
          <Link href="/contatti" className={buttonVariants({ size: "lg" })}>
            {italian ? "Richiedi Preventivo" : "Request a Quote"}
          </Link>
        </div>
      </div>
    </section>
  );
}
