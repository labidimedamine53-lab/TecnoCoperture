import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { projectFallbackPhoto } from "@/lib/constants";
import { hasDatabaseUrl } from "@/lib/database";
import { getLocale } from "@/lib/i18n-server";
import { isItalian } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type ProjectDetailPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const locale = await getLocale();
  const italian = isItalian(locale);
  if (!hasDatabaseUrl()) {
    return createMetadata({
      title: italian ? "Portfolio non disponibile" : "Portfolio unavailable",
      description: italian
        ? "Configura DATABASE_URL per visualizzare il dettaglio progetto."
        : "Configure DATABASE_URL to view project details.",
      path: `/portfolio/${params.id}`,
    });
  }

  let project: Awaited<ReturnType<typeof prisma.project.findUnique>> = null;
  try {
    project = await prisma.project.findUnique({ where: { id: params.id } });
  } catch {
    return createMetadata({
      title: italian ? "Portfolio non disponibile" : "Portfolio unavailable",
      description: italian
        ? "Connessione database non disponibile al momento."
        : "Database connection is currently unavailable.",
      path: `/portfolio/${params.id}`,
    });
  }

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

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const locale = await getLocale();
  const italian = isItalian(locale);
  if (!hasDatabaseUrl()) {
    return (
      <main className="page-shell py-14">
        <section className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            {italian ? "Portfolio temporaneamente non disponibile" : "Portfolio temporarily unavailable"}
          </h1>
          <p className="mt-2 text-slate-600">
            {italian
              ? "Configura la variabile DATABASE_URL nel file .env per abilitare i dettagli progetto."
              : "Configure the DATABASE_URL variable in your .env file to enable project details."}
          </p>
          <div className="mt-6">
            <Link href="/portfolio" className={buttonVariants({ variant: "outline" })}>
              {italian ? "Torna al Portfolio" : "Back to Portfolio"}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  let project: Awaited<ReturnType<typeof prisma.project.findUnique>> = null;
  try {
    project = await prisma.project.findUnique({
      where: { id: params.id },
    });
  } catch {
    return (
      <main className="page-shell py-14">
        <section className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            {italian ? "Errore di connessione database" : "Database connection error"}
          </h1>
          <p className="mt-2 text-slate-600">
            {italian
              ? "Impossibile caricare il progetto in questo momento."
              : "Unable to load this project at the moment."}
          </p>
          <div className="mt-6">
            <Link href="/portfolio" className={buttonVariants({ variant: "outline" })}>
              {italian ? "Torna al Portfolio" : "Back to Portfolio"}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (!project) {
    notFound();
  }

  return (
    <main className="page-shell py-14">
      <header className="max-w-4xl space-y-3">
        <h1 className="text-4xl font-bold text-slate-900">{project.title}</h1>
        <p className="text-slate-600">
          {project.location} - {project.type}
        </p>
        <p className="text-sm text-slate-500">
          {italian ? "Pubblicato il" : "Published on"} {formatDate(project.createdAt)}
        </p>
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
        <h2 className="text-2xl font-bold text-slate-900">
          {italian ? "Dettagli intervento" : "Project Details"}
        </h2>
        <p className="mt-3 whitespace-pre-line text-slate-700">{project.description}</p>
      </section>

      <div className="mt-8">
        <Link href="/portfolio" className={buttonVariants({ variant: "outline" })}>
          {italian ? "Torna al Portfolio" : "Back to Portfolio"}
        </Link>
      </div>
    </main>
  );
}



