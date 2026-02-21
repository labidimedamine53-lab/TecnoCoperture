import type { MetadataRoute } from "next";

import { prisma } from "@/lib/prisma";

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

  if (!process.env.DATABASE_URL) {
    return staticEntries;
  }

  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        updatedAt: true,
      },
    });

    const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
      url: `${baseUrl}/portfolio/${project.id}`,
      lastModified: project.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    return [...staticEntries, ...projectEntries];
  } catch {
    return staticEntries;
  }
}
