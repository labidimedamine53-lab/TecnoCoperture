import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { assetPhotos } from "@/lib/constants";
import { isItalian, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type HeroProps = {
  locale: Locale;
};

export function Hero({ locale }: HeroProps) {
  const italian = isItalian(locale);

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#0ea5e9_0%,transparent_40%)] opacity-60" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
        <div className="relative z-10 space-y-6">
          <p className="inline-flex rounded-full border border-sky-300/30 bg-sky-400/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-sky-200">
            {italian ? "Coperture civili e industriali" : "Civil and industrial roofing"}
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            {italian
              ? "Specialisti in Coperture Civili e Industriali"
              : "Specialists in Civil and Industrial Roofing"}
          </h1>
          <p className="max-w-xl text-base text-slate-200 sm:text-lg">
            {italian
              ? "Progettiamo e realizziamo coperture tetti sicure, durevoli e certificate. Interveniamo su nuovi cantieri, rifacimento tetto e coperture industriali con squadre qualificate."
              : "We design and install safe, durable and certified roofing systems. We work on new buildings, roof renovation and industrial roofing with qualified teams."}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contatti" className={buttonVariants({ size: "lg" })}>
              {italian ? "Richiedi Preventivo" : "Request a Quote"}
            </Link>
            <Link
              href="/servizi"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
                "!border-sky-200/50 !bg-transparent !text-white hover:!bg-slate-800 hover:!text-white",
              )}
            >
              {italian ? "Scopri i Servizi" : "Discover Services"}
            </Link>
          </div>
        </div>

        <div className="relative z-10 overflow-hidden rounded-2xl border border-sky-200/20 bg-slate-900/40 shadow-2xl">
          <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/11]">
            {assetPhotos.map((photo, index) => (
              <Image
                key={photo}
                src={photo}
                alt={
                  italian
                    ? `Copertura tetto - foto ${index + 1}`
                    : `Roofing project - photo ${index + 1}`
                }
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={cn(
                  "hero-slide absolute inset-0 h-full w-full object-cover",
                  `hero-slide-${index + 1}`,
                )}
                priority={index === 0}
              />
            ))}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-sky-400/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
