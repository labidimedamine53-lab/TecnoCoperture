import type { Metadata } from "next";

import { siteConfig } from "@/lib/constants";

type MetadataParams = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function createMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: MetadataParams): Metadata {
  const mergedKeywords = Array.from(new Set([...siteConfig.keywords, ...keywords]));

  return {
    title,
    description,
    keywords: mergedKeywords,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "it_IT",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
  };
}
