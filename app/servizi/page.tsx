import { ServiceCard } from "@/components/service-card";
import { getServiceCategories } from "@/lib/constants";
import { getLocale } from "@/lib/i18n-server";
import { isItalian } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const locale = await getLocale();
  const italian = isItalian(locale);

  return createMetadata({
    title: italian ? "Servizi di Copertura Tetti e Rifacimento" : "Roofing and Roof Renovation Services",
    description: italian
      ? "Servizi professionali per coperture tetti: rifacimento tetto, impermeabilizzazioni, grondaie, coperture industriali e sicurezza."
      : "Professional roofing services: roof renovation, waterproofing, gutters, industrial roofing and safety systems.",
    path: "/servizi",
    keywords: ["coperture tetti", "rifacimento tetto", "impermeabilizzazione tetti"],
  });
}

export default async function ServiziPage() {
  const locale = await getLocale();
  const italian = isItalian(locale);
  const serviceCategories = getServiceCategories(locale);

  return (
    <main className="page-shell py-14">
      <header className="reveal-up max-w-3xl space-y-3 text-center md:text-left">
        <h1 className="text-4xl font-bold text-slate-900">
          {italian ? "Servizi su Coperture Tetti" : "Roofing Services"}
        </h1>
        <p className="text-slate-600">
          {italian
            ? "Interventi completi su tetti civili e industriali. Ogni lavorazione e gestita con standard elevati di sicurezza, materiali certificati e pianificazione operativa."
            : "Complete services for civil and industrial roofs. Every project is managed with high safety standards, certified materials and structured planning."}
        </p>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {serviceCategories.map((service) => (
          <div key={service.name} className="reveal-up reveal-delay-1">
            <ServiceCard
              title={service.name}
              description={service.description}
              items={service.includedWorks}
            />
          </div>
        ))}
      </section>
    </main>
  );
}



