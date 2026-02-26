import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { buttonVariants } from "@/components/ui/button";
import { deleteQuoteRequestAction } from "@/lib/actions/admin";
import { requireAdmin } from "@/lib/guards";
import { getLocale } from "@/lib/i18n-server";
import { isItalian } from "@/lib/i18n";
import { createMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export async function generateMetadata() {
  const locale = await getLocale();
  const italian = isItalian(locale);

  return createMetadata({
    title: italian ? "Gestione Richieste Consulenza" : "Consultation Requests Management",
    description: italian
      ? "Elenco richieste di consulenza ricevute dal sito."
      : "List of consultation requests received from the website.",
    path: "/admin/requests",
  });
}

export default async function AdminRequestsPage() {
  const locale = await getLocale();
  const italian = isItalian(locale);
  await requireAdmin();

  const requests = await prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminShell currentPath="/admin/requests" locale={locale}>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-slate-900">
            {italian ? "Richieste Consulenza" : "Consultation Requests"}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {italian
              ? "Visualizza e gestisci le richieste ricevute dal modulo contatti."
              : "View and manage requests received from the contact form."}
          </p>
        </header>

        {requests.length ? (
          <div className="space-y-4">
            {requests.map((request) => (
              <article
                key={request.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-slate-900">
                      {request.name} - {request.serviceType}
                    </h2>
                    <p className="text-sm text-slate-600">
                      {request.city} - {formatDate(request.createdAt)}
                    </p>
                    <p className="text-sm text-slate-700">
                      Tel: {request.phone} | Email: {request.email}
                    </p>
                  </div>
                  <form action={deleteQuoteRequestAction}>
                    <input type="hidden" name="requestId" value={request.id} />
                    <button
                      type="submit"
                      className={buttonVariants({ variant: "destructive", size: "sm" })}
                    >
                      {italian ? "Elimina" : "Delete"}
                    </button>
                  </form>
                </div>

                <p className="mt-4 whitespace-pre-line text-sm text-slate-700">{request.message}</p>

                {request.images.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {request.images.map((imagePath) => (
                      <Link
                        key={imagePath}
                        href={imagePath}
                        target="_blank"
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                      >
                        {italian ? "Apri foto" : "Open photo"}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <section className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-slate-600">
              {italian ? "Nessuna richiesta disponibile." : "No requests available."}
            </p>
          </section>
        )}
      </div>
    </AdminShell>
  );
}



