import type { MetadataRoute } from "next";

import { getPortfolioProjectIds } from "@/lib/portfolio-gallery";

const staticRoutes = [
  "",
  "/servizi",
  "/coperture",
  "/portfolio",
  "/contatti",
  "/privacy-policy",
  "/cookie-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = getPortfolioProjectIds().map((id) => ({
    url: `${baseUrl}/portfolio/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...projectEntries];
}
