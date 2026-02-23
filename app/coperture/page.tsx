import { CoverageCard } from "@/components/coverage-card";
import { getRoofingTypes } from "@/lib/constants";
import { getLocale } from "@/lib/i18n-server";
import { isItalian } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const locale = await getLocale();
  const italian = isItalian(locale);

  return createMetadata({
    title: italian ? "Tipi di Copertura: Civile e Industriale" : "Roof Types: Residential and Industrial",
    description: italian
      ? "Scopri i principali tipi di copertura: tetto a falda, tetto piano, coperture coibentate, in lamiera, rame e pannelli sandwich."
      : "Discover the main roof types: pitched roof, flat roof, insulated systems, metal sheets, copper and sandwich panels.",
    path: "/coperture",
    keywords: ["coperture industriali", "tetto ventilato", "copertura coibentata"],
  });
}

export default async function CoperturePage() {
  const locale = await getLocale();
  const italian = isItalian(locale);
  const roofingTypes = getRoofingTypes(locale);
  const coveragePhotoByTypeName: Record<string, string> = {
    "Tetto a falda": "/images/coperture/tetto-falda.png",
    "Pitched Roof": "/images/coperture/tetto-falda.png",
    "Tetto piano": "/images/coperture/tetto-piano.png",
    "Flat Roof": "/images/coperture/tetto-piano.png",
    "Tetto ventilato": "/images/coperture/tetto-ventilato.png",
    "Ventilated Roof": "/images/coperture/tetto-ventilato.png",
    "Copertura in tegole": "/images/coperture/copertura-tegole.png",
    "Tile Roof": "/images/coperture/copertura-tegole.png",
    "Copertura in lamiera": "/images/coperture/copertura-lamiera.png",
    "Metal Sheet Roof": "/images/coperture/copertura-lamiera.png",
    "Copertura in rame": "/images/coperture/copertura-rame.png",
    "Copper Roof": "/images/coperture/copertura-rame.png",
    "Copertura in pannelli sandwich": "/images/coperture/copertura-pannelli-sandwich.png",
    "Sandwich Panel Roof": "/images/coperture/copertura-pannelli-sandwich.png",
    "Copertura industriale": "/images/coperture/copertura-industriale.png",
    "Industrial Roof": "/images/coperture/copertura-industriale.png",
    "Copertura coibentata": "/images/coperture/copertura-coibentata.png",
    "Insulated Roof": "/images/coperture/copertura-coibentata.png",
    "Tetto con isolamento termico": "/images/coperture/tetto-isolamento-termico.png",
    "Thermally Insulated Roof": "/images/coperture/tetto-isolamento-termico.png",
    "Tetto con barriera al vapore": "/images/coperture/tetto-barriera-vapore.png",
    "Vapor Barrier Roof": "/images/coperture/tetto-barriera-vapore.png",
  };

  return (
    <main className="page-shell py-14">
      <header className="reveal-up max-w-3xl space-y-3">
        <h1 className="text-4xl font-bold text-slate-900">
          {italian ? "Tipi di Copertura" : "Roof Types"}
        </h1>
        <p className="text-slate-600">
          {italian
            ? "Progettiamo e realizziamo soluzioni adatte a ogni edificio: dal tetto a falda tradizionale alle coperture industriali ad alte prestazioni."
            : "We design and install solutions for every building: from traditional pitched roofs to high-performance industrial roofs."}
        </p>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {roofingTypes.map((coverage) => (
          <div key={coverage.name} className="reveal-up reveal-delay-1">
            <CoverageCard
              title={coverage.name}
              description={coverage.description}
              benefits={coverage.benefits}
              image={coveragePhotoByTypeName[coverage.name] ?? null}
              imageAlt={`${coverage.name} - ${italian ? "foto copertura" : "roof photo"}`}
              showImageSlot
              emptyImageLabel={italian ? "Foto non disponibile" : "Photo not available"}
            />
          </div>
        ))}
      </section>
    </main>
  );
}



