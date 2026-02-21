import { createMetadata } from "@/lib/metadata";
import { getLocale } from "@/lib/i18n-server";
import { isItalian } from "@/lib/i18n";

export async function generateMetadata() {
  const locale = await getLocale();
  const italian = isItalian(locale);

  return createMetadata({
    title: "Cookie Policy",
    description: italian
      ? "Informativa sull'utilizzo dei cookie del sito TecnoCoperture."
      : "Cookie usage policy for Tecno Coperture website.",
    path: "/cookie-policy",
  });
}

export default async function CookiePolicyPage() {
  const locale = await getLocale();
  const italian = isItalian(locale);

  return (
    <main className="page-shell py-14">
      <h1 className="text-4xl font-bold text-slate-900">Cookie Policy</h1>
      <div className="prose prose-slate mt-6 max-w-4xl">
        {italian ? (
          <>
            <p>
              Questo sito utilizza cookie tecnici necessari al funzionamento della piattaforma e alla
              sicurezza della navigazione.
            </p>
            <h2>1. Cookie tecnici</h2>
            <p>
              Sono utilizzati per garantire il corretto funzionamento delle pagine, la gestione della
              sessione amministrativa e la protezione da accessi non autorizzati.
            </p>
            <h2>2. Cookie di terze parti</h2>
            <p>
              Eventuali integrazioni esterne (ad esempio link a WhatsApp) possono impostare cookie
              secondo le rispettive policy dei provider.
            </p>
            <h2>3. Gestione del consenso</h2>
            <p>
              L&apos;utente puo gestire le preferenze cookie dalle impostazioni del browser. La
              disabilitazione dei cookie tecnici puo compromettere il funzionamento del sito.
            </p>
          </>
        ) : (
          <>
            <p>
              This website uses technical cookies required for platform operation and secure navigation.
            </p>
            <h2>1. Technical cookies</h2>
            <p>
              They are used to ensure proper page operation, manage admin sessions and protect against
              unauthorized access.
            </p>
            <h2>2. Third-party cookies</h2>
            <p>
              External integrations (for example WhatsApp links) may set cookies according to their
              providers&apos; policies.
            </p>
            <h2>3. Consent management</h2>
            <p>
              Users can manage cookie preferences in browser settings. Disabling technical cookies may
              affect website functionality.
            </p>
          </>
        )}
      </div>
    </main>
  );
}



