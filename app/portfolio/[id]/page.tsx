import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { projectFallbackPhoto } from "@/lib/constants";
import { getLocale } from "@/lib/i18n-server";
import { isItalian } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";
import { getPortfolioProjectById, getPortfolioProjectIds } from "@/lib/portfolio-gallery";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-static";

type ProjectDetailPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const locale = await getLocale();
  const italian = isItalian(locale);
  const project = getPortfolioProjectById(params.id, locale);

  if (!project) {
    return createMetadata({
      title: italian ? "Progetto non trovato" : "Project not found",
      description: italian ? "Il progetto richiesto non e disponibile." : "The requested project is not available.",
      path: `/portfolio/${params.id}`,
    });
  }

  return createMetadata({
    title: `${project.title} - ${italian ? "Portfolio" : "Portfolio"}`,
    description: project.description,
    path: `/portfolio/${project.id}`,
  });
}

export function generateStaticParams() {
  return getPortfolioProjectIds().map((id) => ({ id }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const locale = await getLocale();
  const italian = isItalian(locale);
  const project = getPortfolioProjectById(params.id, locale);

  if (!project) {
    notFound();
  }

  return (
    <main className="page-shell py-14">
      <header className="max-w-4xl space-y-3 text-center md:text-left">
        <h1 className="text-4xl font-bold text-slate-900">{project.title}</h1>
        <p className="text-slate-600">
          {project.location} - {project.type}
        </p>
        {italian ? (
          <p className="text-sm text-slate-500">Pubblicato il {formatDate(project.createdAt)}</p>
        ) : (
          <p className="text-sm text-slate-500">
            Published on{" "}
            {new Intl.DateTimeFormat("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }).format(project.createdAt)}
          </p>
        )}
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {project.images.length ? (
          project.images.map((imagePath) => (
            <div key={imagePath} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
              <Image
                src={imagePath}
                alt={`${project.title} - ${italian ? "immagine progetto" : "project image"}`}
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          ))
        ) : (
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
            <Image
              src={projectFallbackPhoto}
              alt={`${project.title} - ${italian ? "placeholder" : "placeholder"}`}
              fill
              className="object-cover"
            />
          </div>
        )}
      </section>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-center text-2xl font-bold text-slate-900 md:text-left">
          {italian ? "Dettagli intervento" : "Project Details"}
        </h2>
        <p className="mt-3 whitespace-pre-line text-center text-slate-700 md:text-left">{project.description}</p>
      </section>

      <div className="mt-8 text-center md:text-left">
        <Link href="/portfolio" className={buttonVariants({ variant: "outline" })}>
          {italian ? "Torna al Portfolio" : "Back to Portfolio"}
        </Link>
      </div>
    </main>
  );
}



