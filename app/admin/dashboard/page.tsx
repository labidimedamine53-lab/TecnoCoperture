import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { buttonVariants } from "@/components/ui/button";
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
    title: italian ? "Dashboard Admin" : "Admin Dashboard",
    description: italian
      ? "Panoramica richieste di consulenza e portfolio progetti."
      : "Overview of consultation requests and portfolio projects.",
    path: "/admin/dashboard",
  });
}

export default async function AdminDashboardPage() {
  const locale = await getLocale();
  const italian = isItalian(locale);
  await requireAdmin();

  const [requestsCount, projectsCount, latestRequests] = await Promise.all([
    prisma.quoteRequest.count(),
    prisma.project.count(),
    prisma.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <AdminShell currentPath="/admin/dashboard" locale={locale}>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">
            {italian
              ? "Panoramica operativa di richieste di consulenza e progetti pubblicati."
              : "Operational overview of consultation requests and published projects."}
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              {italian ? "Richieste di consulenza" : "Consultation requests"}
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{requestsCount}</p>
            <Link href="/admin/requests" className={buttonVariants({ variant: "outline", size: "sm", className: "mt-4" })}>
              {italian ? "Gestisci richieste" : "Manage requests"}
            </Link>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              {italian ? "Progetti portfolio" : "Portfolio projects"}
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{projectsCount}</p>
            <Link href="/admin/projects" className={buttonVariants({ variant: "outline", size: "sm", className: "mt-4" })}>
              {italian ? "Gestisci progetti" : "Manage projects"}
            </Link>
          </article>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            {italian ? "Ultime richieste ricevute" : "Latest received requests"}
          </h2>
          <div className="mt-4 space-y-3">
            {latestRequests.length ? (
              latestRequests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
                >
                  <p className="font-semibold text-slate-900">
                    {request.name} - {request.serviceType}
                  </p>
                  <p className="text-slate-600">
                    {request.city} - {formatDate(request.createdAt)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-600">
                {italian ? "Nessuna richiesta disponibile." : "No requests available."}
              </p>
            )}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}



