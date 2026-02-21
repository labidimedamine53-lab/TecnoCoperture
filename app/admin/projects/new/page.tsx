import { AdminShell } from "@/components/admin/admin-shell";
import { ProjectForm } from "@/components/admin/project-form";
import { createProjectAction } from "@/lib/actions/admin";
import { requireAdmin } from "@/lib/guards";
import { getLocale } from "@/lib/i18n-server";
import { isItalian } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const locale = await getLocale();
  const italian = isItalian(locale);

  return createMetadata({
    title: italian ? "Nuovo Progetto" : "New Project",
    description: italian ? "Crea un nuovo progetto portfolio." : "Create a new portfolio project.",
    path: "/admin/projects/new",
  });
}

export default async function NewProjectPage() {
  const locale = await getLocale();
  const italian = isItalian(locale);
  await requireAdmin();

  return (
    <AdminShell currentPath="/admin/projects" locale={locale}>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">
          {italian ? "Nuovo Progetto" : "New Project"}
        </h1>
        <ProjectForm
          action={createProjectAction}
          submitLabel={italian ? "Crea Progetto" : "Create Project"}
          locale={locale}
        />
      </div>
    </AdminShell>
  );
}



