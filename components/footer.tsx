import Link from "next/link";

import { siteConfig } from "@/lib/constants";
import { isItalian, type Locale } from "@/lib/i18n";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const italian = isItalian(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-semibold text-slate-900">{siteConfig.legalName}</p>
          <p className="mt-2 text-sm text-slate-600">
            {italian
              ? "Coperture tetti, rifacimento tetto e coperture industriali in tutta Italia."
              : "Roofing, roof renovation and industrial roofing services across Italy."}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-800">
            {italian ? "Contatti" : "Contacts"}
          </p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li>{italian ? "Telefono 1" : "Phone 1"}: {siteConfig.phones[0]}</li>
            <li>{italian ? "Telefono 2" : "Phone 2"}: {siteConfig.phones[1]}</li>
            <li>Email: {siteConfig.email}</li>
            <li>{italian ? "Sede operativa" : "Office"}: {siteConfig.address}</li>
            <li>{italian ? "Orari" : "Hours"}: {italian ? siteConfig.openingHours.weekdays : "Mon - Fri: 08:00 - 18:00"}</li>
            <li>{italian ? siteConfig.openingHours.saturday : "Saturday: 08:00 - 12:00"}</li>
            <li>
              <Link
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 underline hover:text-slate-900"
              >
                {italian ? "Apri posizione su Google Maps" : "Open location on Google Maps"}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-800">Legal</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <Link href="/privacy-policy" className="text-slate-600 hover:text-slate-900">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/cookie-policy" className="text-slate-600 hover:text-slate-900">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        {year} {siteConfig.legalName}.{" "}
        {italian ? "Tutti i diritti riservati." : "All rights reserved."}
      </div>
    </footer>
  );
}
