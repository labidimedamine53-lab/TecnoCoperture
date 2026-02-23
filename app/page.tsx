import Link from "next/link";

import { CTASection } from "@/components/cta-section";
import { Hero } from "@/components/hero";
import { LocationSection } from "@/components/location-section";
import { ServiceCard } from "@/components/service-card";
import { buttonVariants } from "@/components/ui/button";
import {
  getServiceCategories,
  getSiteDescription,
  getTestimonials,
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
  const testimonials = getTestimonials(locale);
  const whyChooseUs = getWhyChooseUs(locale);

  return (
    <main>
      <Hero locale={locale} />

      <section className="page-shell py-16">
        <div className="reveal-up mb-8 flex items-end justify-between gap-4">
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
          <Link href="/servizi" className={buttonVariants({ variant: "outline" })}>
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
                locale={locale}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell py-16">
        <h2 className="reveal-up text-3xl font-bold text-slate-900">
          {italian ? "Perche scegliere TecnoCoperture" : "Why Choose Tecno Coperture"}
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {whyChooseUs.map((item) => (
            <li
              key={item}
              className="reveal-up reveal-delay-1 rounded-xl border border-slate-200 bg-white p-5 text-slate-700 shadow-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="relative overflow-hidden bg-slate-900 py-16 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.4),transparent_35%)]" />
        <div className="page-shell">
          <h2 className="reveal-up text-3xl font-bold">{italian ? "Testimonianze Clienti" : "Client Testimonials"}</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="reveal-up reveal-delay-2 rounded-xl border border-slate-700 bg-slate-800/70 p-5 backdrop-blur"
              >
                <p className="text-sm text-slate-200">{testimonial.text}</p>
                <p className="mt-4 text-sm font-semibold text-sky-200">{testimonial.name}</p>
              </article>
            ))}
          </div>
        </div>
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



