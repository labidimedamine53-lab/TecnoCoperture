import type { Locale } from "@/lib/i18n";

const mapsQuery = "Via Giuseppe Di Vittorio 13, Bomporto, Modena, Italy";
const encodedMapsQuery = encodeURIComponent(mapsQuery);

export const siteConfig = {
  name: "Tecno Coperture",
  legalName: "Tecno Coperture",
  descriptions: {
    it: "Azienda specializzata in coperture tetti civili e industriali, rifacimento tetto, impermeabilizzazioni e sicurezza in quota in tutta Italia.",
    en: "Roofing company specialized in civil and industrial roofing, roof renovation, waterproofing and working-at-height safety across Italy.",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: process.env.CONTACT_EMAIL ?? "info@tecnocoperture.it",
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "3512324954",
  phones: ["3512324954", "3806968696"],
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "393512324954",
  address: "Via Giuseppe Di Vittorio 13, Bomporto (MO), Italia",
  location: "Via Giuseppe Di Vittorio 13, Bomporto (MO), Italia",
  openingHours: {
    weekdays: "Lunedi - Venerdi: 08:00 - 18:00",
    saturday: "Sabato: 08:00 - 12:00",
    sunday: "Domenica: chiuso",
  },
  mapsQuery,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodedMapsQuery}`,
  mapsEmbedUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ??
    `https://www.google.com/maps?q=${encodedMapsQuery}&output=embed`,
  keywords: ["coperture tetti", "rifacimento tetto", "coperture industriali"],
};

export const assetPhotos = [
  "/images/assets/1.png",
  "/images/assets/2.png",
  "/images/assets/3.png",
  "/images/assets/4.png",
] as const;

export const heroPhoto = assetPhotos[0];
export const projectFallbackPhoto = assetPhotos[1];

const serviceCategoriesIt = [
  {
    name: "Lavori su tetti nuovi",
    description: "Progettazione e posa completa di coperture per nuove costruzioni.",
    includedWorks: [
      "Sopralluogo tecnico e rilievi",
      "Posa struttura portante",
      "Installazione pacchetto isolante",
      "Finiture e collaudo finale",
    ],
  },
  {
    name: "Rifacimento tetti",
    description:
      "Interventi completi di rifacimento tetto su edifici civili, industriali e condomini.",
    includedWorks: [
      "Smontaggio manto esistente",
      "Verifica e ripristino struttura",
      "Nuova impermeabilizzazione",
      "Nuovo manto di copertura certificato",
    ],
  },
  {
    name: "Impermeabilizzazioni",
    description: "Soluzioni anti-infiltrazione per tetti piani e inclinati.",
    includedWorks: [
      "Membrane bituminose o sintetiche",
      "Sigillature nodi critici",
      "Ripristino stratigrafie danneggiate",
      "Test di tenuta finale",
    ],
  },
  {
    name: "Grondaie e pluviali",
    description: "Fornitura e posa di sistemi di raccolta acqua piovana.",
    includedWorks: [
      "Sostituzione grondaie usurate",
      "Nuovi pluviali e raccordi",
      "Pulizia canali di gronda",
      "Verifica pendenze e scarichi",
    ],
  },
  {
    name: "Pannelli sandwich",
    description:
      "Coperture veloci e performanti con pannelli coibentati per edifici residenziali e produttivi.",
    includedWorks: [
      "Fornitura pannelli certificati",
      "Taglio e posa su misura",
      "Fissaggi e guarnizioni tecniche",
      "Rifiniture di bordo",
    ],
  },
  {
    name: "Coperture industriali",
    description:
      "Interventi su capannoni, opifici e strutture produttive con piani di lavoro sicuri.",
    includedWorks: [
      "Pianificazione per continuita produttiva",
      "Sistemi anticaduta temporanei",
      "Rifacimento totale o parziale",
      "Documentazione tecnica di fine lavori",
    ],
  },
  {
    name: "Linee vita e sicurezza",
    description:
      "Installazione sistemi permanenti per lavori in quota conformi alle normative vigenti.",
    includedWorks: [
      "Progettazione linea vita",
      "Installazione ancoraggi certificati",
      "Collaudo e dichiarazioni",
      "Assistenza per pratiche tecniche",
    ],
  },
  {
    name: "Lavori su comignoli",
    description: "Ripristino, ricostruzione e messa in sicurezza di comignoli e canne fumarie.",
    includedWorks: [
      "Ripristino murature lesionate",
      "Rivestimenti protettivi",
      "Sigillature antipioggia",
      "Controllo tiraggio e funzionalita",
    ],
  },
  {
    name: "Manutenzione",
    description:
      "Piani di manutenzione programmata per allungare la vita della copertura e ridurre i guasti.",
    includedWorks: [
      "Ispezioni periodiche",
      "Pulizia gronde e scarichi",
      "Interventi rapidi su criticita",
      "Report tecnico fotografico",
    ],
  },
] as const;

const serviceCategoriesEn = [
  {
    name: "New Roof Construction",
    description: "Complete design and installation for new building roofs.",
    includedWorks: [
      "Technical on-site inspection and measurements",
      "Load-bearing structure installation",
      "Insulation package setup",
      "Final finishes and testing",
    ],
  },
  {
    name: "Roof Renovation",
    description:
      "Full roof replacement for residential, industrial and condominium buildings.",
    includedWorks: [
      "Existing roof covering removal",
      "Structural check and restoration",
      "New waterproofing system",
      "Certified new roofing installation",
    ],
  },
  {
    name: "Waterproofing",
    description: "Anti-leak solutions for flat and pitched roofs.",
    includedWorks: [
      "Bituminous or synthetic membranes",
      "Critical joint sealing",
      "Damaged layer restoration",
      "Final water-tightness testing",
    ],
  },
  {
    name: "Gutters and Downpipes",
    description: "Supply and installation of rainwater drainage systems.",
    includedWorks: [
      "Worn-out gutter replacement",
      "New downpipes and joints",
      "Gutter channel cleaning",
      "Slope and drainage checks",
    ],
  },
  {
    name: "Sandwich Panels",
    description: "Fast, high-performance insulated roofing for homes and industrial buildings.",
    includedWorks: [
      "Certified panel supply",
      "Custom cutting and fitting",
      "Technical fasteners and gaskets",
      "Edge finishing details",
    ],
  },
  {
    name: "Industrial Roofing",
    description:
      "Work on warehouses and production facilities with safe site planning.",
    includedWorks: [
      "Work planning for business continuity",
      "Temporary fall-protection systems",
      "Partial or full roof replacement",
      "Final technical documentation",
    ],
  },
  {
    name: "Lifelines and Safety",
    description:
      "Permanent safety systems for work-at-height in compliance with regulations.",
    includedWorks: [
      "Lifeline system design",
      "Certified anchor installation",
      "Testing and certifications",
      "Support for technical paperwork",
    ],
  },
  {
    name: "Chimney Works",
    description: "Repair, rebuilding and securing of chimneys and flues.",
    includedWorks: [
      "Damaged masonry restoration",
      "Protective cladding",
      "Rainproof sealing",
      "Draft and functionality checks",
    ],
  },
  {
    name: "Maintenance",
    description:
      "Scheduled maintenance plans to extend roof life and prevent failures.",
    includedWorks: [
      "Periodic inspections",
      "Gutter and drainage cleaning",
      "Rapid critical-fault intervention",
      "Photo-based technical reporting",
    ],
  },
] as const;

const roofingTypesIt = [
  {
    name: "Tetto a falda",
    description: "Classica copertura inclinata con elevata capacita di smaltimento delle acque.",
    benefits: ["Ottimo drenaggio", "Lunga durata", "Facile manutenzione"],
  },
  {
    name: "Tetto Piano",
    description: "Soluzione moderna ideale per edifici residenziali contemporanei e capannoni.",
    benefits: ["Superficie sfruttabile", "Impianti tecnici integrabili", "Design minimal"],
  },
  {
    name: "Tetto ventilato",
    description: "Sistema con camera d'aria per migliorare comfort e salubrita interna.",
    benefits: ["Riduce surriscaldamento estivo", "Migliora efficienza energetica", "Riduce condensa"],
  },
  {
    name: "Copertura in tegole",
    description: "Soluzione tradizionale in laterizio con ottimo equilibrio tra estetica e resistenza.",
    benefits: ["Stile classico", "Ricambi disponibili", "Elevata durabilita"],
  },
  {
    name: "Copertura in lamiera",
    description: "Copertura leggera e resistente per edifici civili e industriali.",
    benefits: ["Posa rapida", "Basso peso strutturale", "Resistenza agli agenti atmosferici"],
  },
  {
    name: "Copertura in rame",
    description: "Materiale nobile con lunga vita utile e alto valore architettonico.",
    benefits: ["Massima durata", "Eleganza", "Ottima resistenza alla corrosione"],
  },
  {
    name: "Copertura in pannelli sandwich",
    description: "Sistema coibentato ad alte prestazioni per nuove costruzioni e riqualificazioni.",
    benefits: ["Isolamento termico", "Montaggio veloce", "Riduzione ponti termici"],
  },
  {
    name: "Copertura industriale",
    description: "Coperture pensate per grandi luci e continuita operativa dell'attivita.",
    benefits: ["Alta produttivita in cantiere", "Affidabilita", "Manutenzione programmabile"],
  },
  {
    name: "Copertura coibentata",
    description: "Sistema pensato per limitare dispersioni e ridurre i consumi energetici.",
    benefits: ["Risparmio energetico", "Comfort abitativo", "Valorizzazione immobile"],
  },
  {
    name: "Tetto con isolamento termico",
    description: "Soluzioni ad alto isolamento per migliorare classe energetica dell'edificio.",
    benefits: ["Riduzione bollette", "Maggiore comfort", "Incentivi e detrazioni"],
  },
  {
    name: "Tetto con barriera al vapore",
    description: "Protezione del pacchetto di copertura dalla migrazione di umidita interna.",
    benefits: ["Previene condense", "Migliora durata stratigrafia", "Prestazioni costanti"],
  },
] as const;

const roofingTypesEn = [
  {
    name: "Pitched Roof",
    description: "Traditional sloped roof with excellent rainwater drainage.",
    benefits: ["Great drainage", "Long service life", "Easy maintenance"],
  },
  {
    name: "Flat Roof",
    description: "Modern solution for contemporary homes and industrial buildings.",
    benefits: ["Usable surface", "Easy technical system integration", "Minimal design"],
  },
  {
    name: "Ventilated Roof",
    description: "Air-gap system to improve indoor comfort and roof durability.",
    benefits: ["Reduces summer overheating", "Improves energy performance", "Controls condensation"],
  },
  {
    name: "Tile Roof",
    description: "Traditional roof tiles with balanced aesthetics and durability.",
    benefits: ["Classic appearance", "Spare parts availability", "High durability"],
  },
  {
    name: "Metal Sheet Roof",
    description: "Lightweight and durable solution for civil and industrial buildings.",
    benefits: ["Fast installation", "Low structural weight", "Weather resistance"],
  },
  {
    name: "Copper Roof",
    description: "Premium material with long lifespan and high architectural value.",
    benefits: ["Maximum durability", "Elegant look", "Excellent corrosion resistance"],
  },
  {
    name: "Sandwich Panel Roof",
    description: "High-performance insulated system for new builds and renovations.",
    benefits: ["Thermal insulation", "Quick installation", "Reduced thermal bridges"],
  },
  {
    name: "Industrial Roof",
    description: "Roofing systems designed for large-span and production continuity.",
    benefits: ["High site productivity", "Reliable performance", "Plannable maintenance"],
  },
  {
    name: "Insulated Roof",
    description: "System designed to reduce heat loss and energy consumption.",
    benefits: ["Energy savings", "Indoor comfort", "Property value increase"],
  },
  {
    name: "Thermally Insulated Roof",
    description: "High-insulation solutions to improve a building's energy class.",
    benefits: ["Lower utility bills", "More comfort", "Tax incentives eligibility"],
  },
  {
    name: "Vapor Barrier Roof",
    description: "Protects roof layers from indoor moisture migration.",
    benefits: ["Prevents condensation", "Longer roof-layer lifespan", "Stable performance"],
  },
] as const;

const whyChooseUsIt = [
  "Sopralluoghi rapidi in tutta Italia",
  "Tecnici qualificati e certificati per lavori in quota",
  "Materiali garantiti e fornitori selezionati",
  "Proposte chiare con tempi certi di consegna",
] as const;

const whyChooseUsEn = [
  "Fast on-site inspections across Italy",
  "Qualified and certified technicians for work at height",
  "Guaranteed materials and selected suppliers",
  "Clear proposals with reliable delivery times",
] as const;

const testimonialsIt = [
  {
    name: "Condominio Aurora - Milano",
    text: "Intervento di rifacimento tetto eseguito in tempi rapidi e con cantiere sempre in sicurezza.",
  },
  {
    name: "Azienda Logistica Nord - Brescia",
    text: "Copertura industriale sostituita senza bloccare la produzione. Team organizzato e affidabile.",
  },
  {
    name: "Villa Privata - Bergamo",
    text: "Ottimo supporto tecnico, comunicazione trasparente e risultato finale molto curato.",
  },
] as const;

const testimonialsEn = [
  {
    name: "Aurora Condominium - Milan",
    text: "Full roof renovation completed quickly with high on-site safety standards.",
  },
  {
    name: "North Logistics Company - Brescia",
    text: "Industrial roof replaced without stopping production. Reliable and organized team.",
  },
  {
    name: "Private Villa - Bergamo",
    text: "Excellent technical guidance, transparent communication and a high-quality final result.",
  },
] as const;

export const serviceCategoriesByLocale = {
  it: serviceCategoriesIt,
  en: serviceCategoriesEn,
} as const;

export const roofingTypesByLocale = {
  it: roofingTypesIt,
  en: roofingTypesEn,
} as const;

export const whyChooseUsByLocale = {
  it: whyChooseUsIt,
  en: whyChooseUsEn,
} as const;

export const testimonialsByLocale = {
  it: testimonialsIt,
  en: testimonialsEn,
} as const;

export const interventionOptionsByLocale = {
  it: serviceCategoriesIt.map((service) => service.name),
  en: serviceCategoriesEn.map((service) => service.name),
} as const;

export function getServiceCategories(locale: Locale) {
  return serviceCategoriesByLocale[locale];
}

export function getRoofingTypes(locale: Locale) {
  return roofingTypesByLocale[locale];
}

export function getWhyChooseUs(locale: Locale) {
  return whyChooseUsByLocale[locale];
}

export function getTestimonials(locale: Locale) {
  return testimonialsByLocale[locale];
}

export function getInterventionOptions(locale: Locale) {
  return interventionOptionsByLocale[locale];
}

export function getSiteDescription(locale: Locale) {
  return siteConfig.descriptions[locale];
}

export const serviceCategories = serviceCategoriesIt;
export const roofingTypes = roofingTypesIt;
export const whyChooseUs = whyChooseUsIt;
export const testimonials = testimonialsIt;
export const interventionOptions = interventionOptionsByLocale.it;
