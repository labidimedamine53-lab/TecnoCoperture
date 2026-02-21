import Image from "next/image";
import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { buttonVariants } from "@/components/ui/button";
import { deleteProjectAction } from "@/lib/actions/admin";
import { requireAdmin } from "@/lib/guards";
import { getLocale } from "@/lib/i18n-server";
import { isItalian } from "@/lib/i18n";
import { projectFallbackPhoto } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";

export async function generateMetadata() {
  const locale = await getLocale();
  const italian = isItalian(locale);

  return createMetadata({
    title: italian ? "Gestione Progetti Portfolio" : "Portfolio Projects Management",
    description: italian
      ? "Aggiungi, modifica o rimuovi i progetti visibili nel portfolio."
      : "Add, edit or delete projects visible in the portfolio.",
    path: "/admin/projects",
  });
}

export default async function AdminProjectsPage() {
  const locale = await getLocale();
  const italian = isItalian(locale);
  await requireAdmin();

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminShell currentPath="/admin/projects" locale={locale}>
      <div className="space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {italian ? "Progetti Portfolio" : "Portfolio Projects"}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              {italian
                ? "Gestisci i progetti pubblicati nella sezione portfolio."
                : "Manage projects published in the portfolio section."}
            </p>
          </div>
          <Link href="/admin/projects/new" className={buttonVariants()}>
            {italian ? "Nuovo Progetto" : "New Project"}
          </Link>
        </header>

        {projects.length ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex gap-4">
                  <div className="relative hidden h-24 w-32 overflow-hidden rounded-md bg-slate-100 sm:block">
                    <Image
                      src={project.images[0] ?? projectFallbackPhoto}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-slate-900">{project.title}</h2>
                    <p className="text-sm text-slate-600">
                      {project.location} - {project.type}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-700">{project.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                      >
                        {italian ? "Modifica" : "Edit"}
                      </Link>
                      <form action={deleteProjectAction}>
                        <input type="hidden" name="projectId" value={project.id} />
                        <button
                          type="submit"
                          className={buttonVariants({ variant: "destructive", size: "sm" })}
                        >
                          {italian ? "Elimina" : "Delete"}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <section className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-slate-600">
              {italian ? "Nessun progetto presente." : "No projects found."}
            </p>
          </section>
        )}
      </div>
    </AdminShell>
  );
}



