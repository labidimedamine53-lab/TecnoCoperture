import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { getLocale } from "@/lib/i18n-server";
import { isItalian } from "@/lib/i18n";

export default async function NotFound() {
  const locale = await getLocale();
  const italian = isItalian(locale);

  return (
    <main className="page-shell py-20 text-center">
      <h1 className="text-4xl font-bold text-slate-900">
        {italian ? "Pagina non trovata" : "Page not found"}
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-slate-600">
        {italian
          ? "La risorsa richiesta non e disponibile. Torna alla home o contattaci per assistenza."
          : "The requested resource is not available. Go back home or contact us for support."}
      </p>
      <div className="mt-8">
        <Link href="/" className={buttonVariants()}>
          {italian ? "Torna alla Home" : "Back to Home"}
        </Link>
      </div>
    </main>
  );
}



