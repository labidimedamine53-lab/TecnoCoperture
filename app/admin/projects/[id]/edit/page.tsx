import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { ProjectForm } from "@/components/admin/project-form";
import { updateProjectAction } from "@/lib/actions/admin";
import { requireAdmin } from "@/lib/guards";
import { getLocale } from "@/lib/i18n-server";
import { isItalian } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";

type EditProjectPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: EditProjectPageProps) {
  const locale = await getLocale();
  const italian = isItalian(locale);

  return createMetadata({
    title: italian ? `Modifica Progetto ${params.id}` : `Edit Project ${params.id}`,
    description: italian
      ? "Aggiorna i dati di un progetto portfolio."
      : "Update a portfolio project details.",
    path: `/admin/projects/${params.id}/edit`,
  });
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const locale = await getLocale();
  const italian = isItalian(locale);
  await requireAdmin();

  const project = await prisma.project.findUnique({ where: { id: params.id } });
  if (!project) {
    notFound();
  }

  return (
    <AdminShell currentPath="/admin/projects" locale={locale}>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">
          {italian ? "Modifica Progetto" : "Edit Project"}
        </h1>
        <ProjectForm
          action={updateProjectAction}
          project={project}
          submitLabel={italian ? "Salva Modifiche" : "Save Changes"}
          locale={locale}
        />
      </div>
    </AdminShell>
  );
}



