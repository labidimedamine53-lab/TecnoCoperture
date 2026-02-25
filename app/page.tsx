import Link from "next/link";
import { ShieldCheck, TimerReset, BadgeCheck, FileCheck2 } from "lucide-react";

import { CTASection } from "@/components/cta-section";
import { Hero } from "@/components/hero";
import { LocationSection } from "@/components/location-section";
import { ServiceCard } from "@/components/service-card";
import {
  getServiceCategories,
  getSiteDescription,
  getWhyChooseUs,
} from "@/lib/constants";
import { getLocale } from "@/lib/i18n-server";
import { isItalian } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const locale = await getLocale();
  const italian = isItalian(locale);

  return createMetadata({
    title: italian
      ? "Specialisti in Coperture Civili e Industriali"
      : "Specialists in Civil and Industrial Roofing",
    description: getSiteDescription(locale),
    path: "/",
  });
}

export default async function HomePage() {
  const locale = await getLocale();
  const italian = isItalian(locale);
  const highlightedServices = getServiceCategories(locale).slice(0, 6);
  const whyChooseUs = getWhyChooseUs(locale);
  const serviceImageByName: Record<string, string> = {
    "Lavori su tetti nuovi": "/images/assets/service-lavori-tetti-nuovi.png",
    "New Roof Construction": "/images/assets/service-lavori-tetti-nuovi.png",
    "Rifacimento tetti": "/images/assets/service-rifacimento-tetti.png",
    "Roof Renovation": "/images/assets/service-rifacimento-tetti.png",
    "Impermeabilizzazioni": "/images/assets/service-impermeabilizzazioni.png",
    Waterproofing: "/images/assets/service-impermeabilizzazioni.png",
    "Grondaie e pluviali": "/images/assets/service-grondaie-pluviali.png",
    "Gutters and Downpipes": "/images/assets/service-grondaie-pluviali.png",
    "Pannelli sandwich": "/images/assets/1.png",
    "Sandwich Panels": "/images/assets/1.png",
    "Coperture industriali": "/images/assets/service-coperture-industriali.png",
    "Industrial Roofing": "/images/assets/service-coperture-industriali.png",
  };
  const whyChooseIcons = [TimerReset, ShieldCheck, BadgeCheck, FileCheck2];

  return (
    <main>
      <Hero locale={locale} />

      <section className="page-shell py-16">
        <div className="reveal-up mb-8 flex flex-col items-center gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              {italian ? "I nostri servizi principali" : "Our Main Services"}
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              {italian
                ? "Copriamo l'intero ciclo dei lavori su tetto: nuova posa, manutenzione e rifacimento tetto con squadre specializzate."
                : "We cover the full roofing lifecycle: new installations, maintenance and roof renovation with specialized teams."}
            </p>
          </div>
          <Link
            href="/servizi"
            className="group relative mx-auto inline-flex h-12 items-center justify-center overflow-hidden rounded-xl border border-sky-200 bg-[linear-gradient(135deg,#0ea5e9_0%,#06b6d4_52%,#0284c7_100%)] px-7 text-base font-semibold text-white shadow-[0_14px_32px_-18px_rgba(14,165,233,0.95)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-18px_rgba(14,165,233,0.95)] active:scale-[0.98] md:mx-0"
          >
            <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.28)_50%,transparent_65%)] transition duration-700 group-hover:translate-x-full" />
            {italian ? "Tutti i servizi" : "All services"}
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {highlightedServices.map((service) => (
            <div key={service.name} className="reveal-up reveal-delay-1">
              <ServiceCard
                title={service.name}
                description={service.description}
                items={service.includedWorks}
                image={serviceImageByName[service.name] ?? null}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell py-16">
        <h2 className="reveal-up text-center text-3xl font-bold text-slate-900 md:text-left">
          {italian ? "Perche scegliere TecnoCoperture" : "Why Choose Tecno Coperture"}
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {whyChooseUs.map((item, index) => {
            const Icon = whyChooseIcons[index % whyChooseIcons.length];
            return (
              <li
                key={item}
                className="group reveal-up reveal-delay-1 rounded-2xl border border-slate-200/80 bg-white/95 p-5 text-center text-slate-700 shadow-[0_20px_38px_-30px_rgba(14,116,144,0.55)] transition duration-300 hover:-translate-y-1.5 hover:border-sky-200 hover:bg-[linear-gradient(165deg,#ffffff_0%,#f0f9ff_100%)] hover:shadow-[0_24px_45px_-28px_rgba(14,165,233,0.6)] md:text-left"
              >
                <span className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 text-sky-700 transition group-hover:scale-110 group-hover:bg-sky-100 md:mx-0">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="font-medium">{item}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="page-shell py-16">
        <LocationSection locale={locale} />
      </section>

      <CTASection
        title={italian ? "Hai bisogno di un intervento su misura?" : "Need a custom roofing solution?"}
        description={
          italian
            ? "Raccontaci il tuo progetto: analizziamo la copertura e ti inviamo un preventivo dettagliato senza impegno."
            : "Tell us about your project: we analyze your roof and provide a detailed, no-obligation quote."
        }
        locale={locale}
      />
    </main>
  );
}



