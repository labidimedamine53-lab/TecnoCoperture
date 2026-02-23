import { ProjectCard } from "@/components/project-card";
import { getLocale } from "@/lib/i18n-server";
import { isItalian } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";
import { getPortfolioGallery } from "@/lib/portfolio-gallery";

export const dynamic = "force-static";

export async function generateMetadata() {
  const locale = await getLocale();
  const italian = isItalian(locale);

  return createMetadata({
    title: italian ? "Portfolio Lavori Coperture" : "Roofing Project Portfolio",
    description: italian
      ? "Portfolio di lavori su coperture civili e industriali: rifacimento tetto, impermeabilizzazioni e progetti custom."
      : "Portfolio of civil and industrial roofing projects: roof renovation, waterproofing and custom installations.",
    path: "/portfolio",
    keywords: ["portfolio coperture tetti", "rifacimento tetto", "coperture industriali"],
  });
}

export default async function PortfolioPage() {
  const locale = await getLocale();
  const italian = isItalian(locale);
  const projects = getPortfolioGallery(locale);

  return (
    <main className="page-shell py-14">
      <header className="reveal-up max-w-3xl space-y-3">
        <h1 className="text-4xl font-bold text-slate-900">
          {italian ? "Portfolio Progetti" : "Project Portfolio"}
        </h1>
        <p className="text-slate-600">
          {italian
            ? "Una selezione di interventi realizzati su coperture tetti civili e coperture industriali in diverse localita italiane."
            : "A selection of civil and industrial roofing projects completed across Italy."}
        </p>
      </header>

      <section className="relative mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-5 shadow-2xl sm:p-8">
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-sky-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <article className="overflow-hidden rounded-2xl border border-white/20 bg-black/30 p-3 backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
                {italian ? "Riprese dal cantiere" : "Live site footage"}
              </p>
              <span className="rounded-full border border-white/30 px-3 py-1 text-xs text-white/90">
                Video 01
              </span>
            </div>
            <video
              className="aspect-[16/10] w-full rounded-xl object-cover"
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              src="/videos/portfolio-main.mp4"
            />
          </article>

          <div className="grid gap-4">
            <article className="rounded-2xl border border-white/20 bg-white/10 p-6 text-white backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-200">
                {italian ? "Portfolio in movimento" : "Portfolio in motion"}
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight">
                {italian ? "Una presentazione video piu elegante dei nostri interventi" : "A more refined video presentation of our completed work"}
              </h2>
              <p className="mt-3 text-sm text-slate-100/90">
                {italian
                  ? "Due inquadrature reali mostrano precisione, materiali e qualita esecutiva dei nostri lavori su coperture civili e industriali."
                  : "Two real on-site angles highlight precision, materials, and execution quality across civil and industrial roofing projects."}
              </p>
            </article>

            <article className="overflow-hidden rounded-2xl border border-white/20 bg-black/30 p-3 backdrop-blur-sm">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
                  {italian ? "Dettagli esecutivi" : "Execution details"}
                </p>
                <span className="rounded-full border border-white/30 px-3 py-1 text-xs text-white/90">
                  Video 02
                </span>
              </div>
              <video
                className="aspect-[16/10] w-full rounded-xl object-cover"
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                src="/videos/portfolio-detail.mp4"
              />
            </article>
          </div>
        </div>
      </section>

      {projects.length ? (
        <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="reveal-up reveal-delay-1">
              <ProjectCard
                id={project.id}
                title={project.title}
                location={project.location}
                description={project.description}
                type={project.type}
                image={project.images[0] ?? null}
              />
            </div>
          ))}
        </section>
      ) : (
        <section className="mt-10 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            {italian ? "Nessun progetto disponibile" : "No projects available"}
          </h2>
          <p className="mt-2 text-slate-600">
            {italian
              ? "La galleria verra aggiornata presto con nuovi interventi."
              : "The gallery will be updated soon with new projects."}
          </p>
        </section>
      )}
    </main>
  );
}



