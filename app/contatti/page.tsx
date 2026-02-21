import { ContactForm } from "@/components/contact-form";
import { LocationSection } from "@/components/location-section";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";
import { getLocale } from "@/lib/i18n-server";
import { isItalian } from "@/lib/i18n";

export async function generateMetadata() {
  const locale = await getLocale();
  const italian = isItalian(locale);

  return createMetadata({
    title: italian ? "Contatti e Richiesta Preventivo" : "Contact and Quote Request",
    description: italian
      ? "Richiedi ora un preventivo per coperture tetti, rifacimento tetto e coperture industriali. Invia foto e dettagli del tuo intervento."
      : "Request a quote for roofing, roof renovation and industrial roofing. Send photos and project details.",
    path: "/contatti",
    keywords: ["preventivo coperture tetti", "richiesta rifacimento tetto", "contatti coperture industriali"],
  });
}

export default async function ContattiPage() {
  const locale = await getLocale();
  const italian = isItalian(locale);

  return (
    <main className="page-shell py-14">
      <header className="reveal-up max-w-3xl space-y-3">
        <h1 className="text-4xl font-bold text-slate-900">
          {italian ? "Contatti e Preventivi" : "Contact and Quotes"}
        </h1>
        <p className="text-slate-600">
          {italian
            ? "Compila il modulo con i dettagli del tuo intervento. Puoi allegare fotografie per velocizzare la valutazione tecnica."
            : "Fill in the form with your project details. You can upload photos to speed up technical evaluation."}
        </p>
      </header>

      <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <ContactForm locale={locale} />

        <aside className="reveal-up reveal-delay-1 space-y-4 rounded-xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
          <h2 className="text-xl font-bold text-slate-900">
            {italian ? "Contatti diretti" : "Direct Contacts"}
          </h2>
          <p className="text-sm text-slate-600">
            {italian
              ? "Per urgenze su infiltrazioni o danni da maltempo, chiamaci direttamente."
              : "For leak emergencies or weather-related roof damage, call us directly."}
          </p>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>
              <span className="font-semibold">{italian ? "Telefono 1" : "Phone 1"}:</span>{" "}
              {siteConfig.phones[0]}
            </li>
            <li>
              <span className="font-semibold">{italian ? "Telefono 2" : "Phone 2"}:</span>{" "}
              {siteConfig.phones[1]}
            </li>
            <li>
              <span className="font-semibold">Email:</span> {siteConfig.email}
            </li>
            <li>
              <span className="font-semibold">{italian ? "Sede" : "Office"}:</span> {siteConfig.address}
            </li>
            <li>
              <span className="font-semibold">{italian ? "Orari" : "Hours"}:</span>{" "}
              {italian ? siteConfig.openingHours.weekdays : "Mon - Fri: 08:00 - 18:00"}
            </li>
            <li>
              <span className="font-semibold">{italian ? "Sabato" : "Saturday"}:</span>{" "}
              {italian ? siteConfig.openingHours.saturday.replace("Sabato: ", "") : "08:00 - 12:00"}
            </li>
          </ul>
        </aside>
      </section>

      <section className="reveal-up reveal-delay-2 mt-8">
        <LocationSection locale={locale} />
      </section>
    </main>
  );
}



