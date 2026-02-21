import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";
import { getLocale } from "@/lib/i18n-server";
import { isItalian } from "@/lib/i18n";

export async function generateMetadata() {
  const locale = await getLocale();
  const italian = isItalian(locale);

  return createMetadata({
    title: "Privacy Policy",
    description: italian
      ? "Informativa privacy GDPR per i servizi di TecnoCoperture."
      : "GDPR privacy policy for Tecno Coperture services.",
    path: "/privacy-policy",
  });
}

export default async function PrivacyPolicyPage() {
  const locale = await getLocale();
  const italian = isItalian(locale);

  return (
    <main className="page-shell py-14">
      <h1 className="text-4xl font-bold text-slate-900">Privacy Policy</h1>
      <div className="prose prose-slate mt-6 max-w-4xl">
        {italian ? (
          <>
            <p>
              Questa informativa descrive come {siteConfig.legalName} tratta i dati personali raccolti
              tramite il sito web e i moduli di richiesta preventivo.
            </p>
            <h2>1. Titolare del trattamento</h2>
            <p>
              Il titolare del trattamento e {siteConfig.legalName}, contattabile all&apos;indirizzo{" "}
              {siteConfig.email}.
            </p>
            <h2>2. Dati trattati</h2>
            <p>
              Raccogliamo dati anagrafici e di contatto (nome, telefono, email, citta), dettagli
              dell&apos;intervento richiesto, eventuali immagini caricate e metadati tecnici necessari
              alla sicurezza del servizio.
            </p>
            <h2>3. Finalita</h2>
            <p>
              I dati sono trattati esclusivamente per rispondere alle richieste di preventivo, fornire
              assistenza tecnica e adempiere agli obblighi di legge.
            </p>
            <h2>4. Base giuridica</h2>
            <p>
              Il trattamento e basato sul consenso espresso nel modulo e/o su misure precontrattuali
              richieste dall&apos;interessato.
            </p>
            <h2>5. Conservazione</h2>
            <p>
              I dati sono conservati per il tempo strettamente necessario alla gestione della richiesta
              e comunque in conformita alle normative applicabili.
            </p>
            <h2>6. Diritti dell&apos;interessato</h2>
            <p>
              Puoi richiedere accesso, rettifica, cancellazione, limitazione e portabilita dei dati,
              scrivendo a {siteConfig.email}.
            </p>
          </>
        ) : (
          <>
            <p>
              This policy explains how {siteConfig.legalName} processes personal data collected through
              the website and quote request forms.
            </p>
            <h2>1. Data controller</h2>
            <p>
              The data controller is {siteConfig.legalName}, reachable at {siteConfig.email}.
            </p>
            <h2>2. Data processed</h2>
            <p>
              We collect contact data (name, phone, email, city), project details, uploaded images,
              and technical metadata required for security and service management.
            </p>
            <h2>3. Purpose</h2>
            <p>
              Data is processed only to respond to quote requests, provide technical support, and comply
              with legal obligations.
            </p>
            <h2>4. Legal basis</h2>
            <p>
              Processing is based on user consent and/or pre-contractual measures requested by the data
              subject.
            </p>
            <h2>5. Data retention</h2>
            <p>
              Data is stored only for the time necessary to manage the request and in compliance with
              applicable regulations.
            </p>
            <h2>6. Data subject rights</h2>
            <p>
              You may request access, rectification, deletion, restriction and portability by writing to{" "}
              {siteConfig.email}.
            </p>
          </>
        )}
      </div>
    </main>
  );
}



