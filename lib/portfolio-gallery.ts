import { assetPhotos } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

type LocalizedText = {
  it: string;
  en: string;
};

type StaticPortfolioProject = {
  id: string;
  title: LocalizedText;
  location: LocalizedText;
  description: LocalizedText;
  type: LocalizedText;
  images: string[];
  createdAt: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  location: string;
  description: string;
  type: string;
  images: string[];
  createdAt: Date;
};

const staticPortfolioProjects: StaticPortfolioProject[] = [
  {
    id: "rifacimento-tetto-modena",
    title: {
      it: "Rifacimento Tetto Completo - Modena",
      en: "Complete Roof Renovation - Modena",
    },
    location: {
      it: "Modena (MO)",
      en: "Modena (MO)",
    },
    description: {
      it: "Rimozione del vecchio manto, ripristino del pacchetto isolante e nuova copertura ad alta durata con finiture su gronde e colmi.",
      en: "Old roof removal, insulation package restoration and new long-lasting roof covering with refined gutter and ridge detailing.",
    },
    type: {
      it: "Rifacimento tetto",
      en: "Roof renovation",
    },
    images: [assetPhotos[0], assetPhotos[1]],
    createdAt: "2025-11-12",
  },
  {
    id: "copertura-industriale-bologna",
    title: {
      it: "Copertura Industriale con Pannelli Coibentati",
      en: "Industrial Roofing with Insulated Panels",
    },
    location: {
      it: "Bologna (BO)",
      en: "Bologna (BO)",
    },
    description: {
      it: "Intervento su capannone produttivo con pannelli sandwich, nuovi fissaggi certificati e gestione lavori senza fermare la produzione.",
      en: "Industrial warehouse upgrade with sandwich panels, certified fixings and site planning that kept production running.",
    },
    type: {
      it: "Coperture industriali",
      en: "Industrial roofing",
    },
    images: [assetPhotos[2], assetPhotos[3]],
    createdAt: "2025-09-03",
  },
  {
    id: "impermeabilizzazione-tetto-piano-milano",
    title: {
      it: "Impermeabilizzazione Tetto Piano",
      en: "Flat Roof Waterproofing",
    },
    location: {
      it: "Milano (MI)",
      en: "Milan (MI)",
    },
    description: {
      it: "Nuova stratigrafia impermeabile con attenzione ai nodi critici, test di tenuta finale e consegna documentazione fotografica.",
      en: "New waterproof layer system focused on critical joints, final watertight testing and full photo documentation delivery.",
    },
    type: {
      it: "Impermeabilizzazioni",
      en: "Waterproofing",
    },
    images: [assetPhotos[1], assetPhotos[2]],
    createdAt: "2025-06-21",
  },
  {
    id: "linea-vita-reggio-emilia",
    title: {
      it: "Installazione Linea Vita Certificata",
      en: "Certified Lifeline Installation",
    },
    location: {
      it: "Reggio Emilia (RE)",
      en: "Reggio Emilia (RE)",
    },
    description: {
      it: "Progettazione e posa di sistema anticaduta permanente con collaudo finale e fascicolo tecnico conforme alle normative.",
      en: "Design and installation of a permanent fall-protection system with final testing and compliant technical documentation.",
    },
    type: {
      it: "Linee vita e sicurezza",
      en: "Lifelines and safety",
    },
    images: [assetPhotos[3], assetPhotos[0]],
    createdAt: "2025-03-18",
  },
];

function pickLocale(locale: Locale, text: LocalizedText) {
  return locale === "it" ? text.it : text.en;
}

function mapProject(project: StaticPortfolioProject, locale: Locale): PortfolioProject {
  return {
    id: project.id,
    title: pickLocale(locale, project.title),
    location: pickLocale(locale, project.location),
    description: pickLocale(locale, project.description),
    type: pickLocale(locale, project.type),
    images: project.images,
    createdAt: new Date(project.createdAt),
  };
}

export function getPortfolioGallery(locale: Locale) {
  return staticPortfolioProjects
    .map((project) => mapProject(project, locale))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getPortfolioProjectById(id: string, locale: Locale) {
  const project = staticPortfolioProjects.find((entry) => entry.id === id);
  if (!project) {
    return null;
  }

  return mapProject(project, locale);
}

export function getPortfolioProjectIds() {
  return staticPortfolioProjects.map((project) => project.id);
}
