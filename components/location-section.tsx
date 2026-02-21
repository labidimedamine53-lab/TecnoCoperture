import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { isItalian, type Locale } from "@/lib/i18n";

type LocationSectionProps = {
  locale: Locale;
};

export function LocationSection({ locale }: LocationSectionProps) {
  const italian = isItalian(locale);
  const mapsUrl = siteConfig.mapsUrl;
  const mapsEmbedUrl = siteConfig.mapsEmbedUrl;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_20px_40px_-26px_rgba(15,23,42,0.45)] backdrop-blur">
      <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-sky-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-slate-900/10 blur-3xl" />

      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{italian ? "Dove Siamo" : "Our Location"}</h2>
          <p className="mt-2 text-sm text-slate-700">{siteConfig.address}</p>
          <p className="mt-1 text-sm text-slate-600">
            {italian ? siteConfig.openingHours.weekdays : "Mon - Fri: 08:00 - 18:00"}
          </p>
          <p className="text-sm text-slate-600">
            {italian ? siteConfig.openingHours.saturday : "Saturday: 08:00 - 12:00"}
          </p>
          <p className="text-sm text-slate-600">
            {italian ? siteConfig.openingHours.sunday : "Sunday: closed"}
          </p>
        </div>
        <Link
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "outline" })}
        >
          {italian ? "Apri su Google Maps" : "Open in Google Maps"}
        </Link>
      </div>

      <div className="relative mt-5 overflow-hidden rounded-xl border border-slate-200/80 shadow-[0_18px_36px_-24px_rgba(15,23,42,0.55)]">
        <iframe
          title={italian ? "Mappa sede Tecno Coperture" : "Tecno Coperture office map"}
          src={mapsEmbedUrl}
          className="h-[380px] w-full"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
