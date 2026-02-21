import Image from "next/image";
import Link from "next/link";

import type { Project } from "@prisma/client";
import { buttonVariants } from "@/components/ui/button";
import { isItalian, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ProjectFormProps = {
  action: (formData: FormData) => Promise<void>;
  project?: Project;
  submitLabel: string;
  locale: Locale;
};

export function ProjectForm({ action, project, submitLabel, locale }: ProjectFormProps) {
  const italian = isItalian(locale);

  return (
    <form action={action} className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {project ? <input type="hidden" name="projectId" value={project.id} /> : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-slate-800">
            {italian ? "Titolo progetto" : "Project title"}
          </label>
          <input
            id="title"
            name="title"
            defaultValue={project?.title ?? ""}
            required
            className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium text-slate-800">
            {italian ? "Localita" : "Location"}
          </label>
          <input
            id="location"
            name="location"
            defaultValue={project?.location ?? ""}
            required
            className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="type" className="text-sm font-medium text-slate-800">
          {italian ? "Tipologia (es. Copertura industriale)" : "Type (e.g. Industrial roofing)"}
        </label>
        <input
          id="type"
          name="type"
          defaultValue={project?.type ?? ""}
          required
          className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-slate-800">
          {italian ? "Descrizione" : "Description"}
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={project?.description ?? ""}
          required
          rows={6}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </div>

      {project?.images.length ? (
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-800">
            {italian ? "Immagini attuali (seleziona per mantenere)" : "Current images (select to keep)"}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.images.map((image) => (
              <label key={image} className="space-y-2 rounded-lg border border-slate-200 p-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-slate-100">
                  <Image src={image} alt={project.title} fill className="object-cover" />
                </div>
                <span className="flex items-center gap-2 text-xs text-slate-700">
                  <input type="checkbox" name="existingImages" value={image} defaultChecked />
                  {italian ? "Mantieni immagine" : "Keep image"}
                </span>
              </label>
            ))}
          </div>
        </div>
      ) : null}

      <div className="space-y-2">
        <label htmlFor="images" className="text-sm font-medium text-slate-800">
          {italian ? "Nuove immagini" : "New images"} {project ? (italian ? "(opzionale)" : "(optional)") : italian ? "(obbligatorio)" : "(required)"}
        </label>
        <input
          id="images"
          name="images"
          type="file"
          accept="image/*"
          multiple
          required={!project}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-200 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-slate-800"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className={buttonVariants()}
        >
          {submitLabel}
        </button>
        <Link
          href="/admin/projects"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          {italian ? "Annulla" : "Cancel"}
        </Link>
      </div>
    </form>
  );
}
