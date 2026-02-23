import type { Metadata } from "next";
import { headers } from "next/headers";
import { Merriweather, Plus_Jakarta_Sans } from "next/font/google";

import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/lib/constants";
import { getLocale } from "@/lib/i18n-server";
import { createMetadata } from "@/lib/metadata";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["400", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const italian = locale === "it";

  return createMetadata({
    title: italian
      ? "Coperture Tetti Civili e Industriali in Italia"
      : "Civil and Industrial Roofing in Italy",
    description: siteConfig.descriptions[locale],
    path: "/",
  });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const headerStore = await headers();
  const isAdminPath = headerStore.get("x-admin-path") === "1";
  const currentYear = new Date().getFullYear();

  return (
    <html lang={locale}>
      <body className={`${jakartaSans.variable} ${merriweather.variable} antialiased`}>
        <div className="min-h-screen bg-white text-slate-900">
          <SiteShell locale={locale} currentYear={currentYear} isAdminPath={isAdminPath}>
            {children}
          </SiteShell>
        </div>
      </body>
    </html>
  );
}

