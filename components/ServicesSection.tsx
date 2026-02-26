"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Droplets, Factory, Hammer, House, Layers, Wrench, type LucideIcon } from "lucide-react";
import { useState } from "react";

type Service = {
  title: string;
  description: string;
  points: [string, string, string, string];
  icon: LucideIcon;
};

const services: Service[] = [
  {
    title: "Lavori su tetti nuovi",
    description: "Progettazione e posa completa per nuove costruzioni civili e industriali.",
    points: [
      "Sopralluogo tecnico iniziale",
      "Stratigrafia su misura",
      "Posa professionale certificata",
      "Collaudo finale in sicurezza",
    ],
    icon: House,
  },
  {
    title: "Rifacimento tetti",
    description: "Interventi completi di rinnovo copertura con materiali ad alte prestazioni.",
    points: [
      "Rimozione manto esistente",
      "Ripristino struttura portante",
      "Nuova impermeabilizzazione",
      "Finiture precise e durevoli",
    ],
    icon: Hammer,
  },
  {
    title: "Impermeabilizzazioni",
    description: "Sistemi anti-infiltrazione affidabili per tetti piani e inclinati.",
    points: [
      "Membrane bituminose o sintetiche",
      "Trattamento punti critici",
      "Sigillature professionali",
      "Test di tenuta finale",
    ],
    icon: Droplets,
  },
  {
    title: "Grondaie e pluviali",
    description: "Installazione e sostituzione sistemi di raccolta acqua piovana.",
    points: [
      "Nuove grondaie su misura",
      "Pluviali con scarico ottimizzato",
      "Pulizia canali di gronda",
      "Verifica pendenze e deflusso",
    ],
    icon: Wrench,
  },
  {
    title: "Pannelli sandwich",
    description: "Coperture coibentate rapide da installare e altamente performanti.",
    points: [
      "Fornitura pannelli certificati",
      "Taglio e posa su progetto",
      "Fissaggi tecnici dedicati",
      "Ottimo isolamento termico",
    ],
    icon: Layers,
  },
  {
    title: "Coperture industriali",
    description: "Soluzioni robuste per capannoni e strutture produttive complesse.",
    points: [
      "Pianificazione senza fermo produzione",
      "Sicurezza operativa in quota",
      "Interventi totali o parziali",
      "Documentazione tecnica completa",
    ],
    icon: Factory,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const pointVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ServicesSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="page-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">I nostri servizi principali</h2>
          <p className="mt-3 text-slate-600">
            Interventi professionali per coperture civili e industriali, con standard tecnici elevati e tempi certi.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isOpen = expandedIndex === index || hoveredIndex === index;

            return (
              <motion.button
                key={service.title}
                type="button"
                variants={cardVariants}
                layout
                aria-expanded={isOpen}
                onClick={() =>
                  setExpandedIndex((current) => (current === index ? null : index))
                }
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex((current) => (current === index ? null : current))}
                whileTap={{ scale: 0.995 }}
                animate={{
                  y: isOpen ? -4 : 0,
                  boxShadow: isOpen
                    ? "0 26px 50px -28px rgba(15, 23, 42, 0.45)"
                    : "0 12px 28px -24px rgba(15, 23, 42, 0.32)",
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="group relative w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
              >
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-600"
                  animate={{ scaleX: isOpen ? 1 : 0.3, opacity: isOpen ? 1 : 0.75 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />

                <div className="flex items-start gap-4">
                  <div className="rounded-lg border border-sky-100 bg-sky-50 p-2.5 text-sky-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{service.description}</p>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.ul
                      key="details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                          when: "beforeChildren",
                          staggerChildren: 0.06,
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1],
                          when: "afterChildren",
                          staggerChildren: 0.03,
                          staggerDirection: -1,
                        },
                      }}
                      className="mt-5 space-y-2 overflow-hidden border-t border-slate-100 pt-4"
                    >
                      {service.points.map((point) => (
                        <motion.li
                          key={point}
                          variants={pointVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="flex items-start gap-2.5 text-sm text-slate-700"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500" />
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  ) : null}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="mx-auto mt-12 max-w-3xl rounded-2xl border border-sky-100 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-8 text-center shadow-[0_24px_50px_-28px_rgba(14,165,233,0.35)]"
        >
          <h3 className="text-2xl font-bold text-slate-900">
            Hai bisogno di un intervento sul tuo tetto?
          </h3>
          <p className="mt-2 text-slate-600">Consulenza gratuita e sopralluogo rapido</p>
          <Link
            href="/contatti"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-sky-400/40 bg-[linear-gradient(135deg,#0ea5e9_0%,#06b6d4_50%,#0ea5e9_100%)] px-7 text-sm font-semibold text-white shadow-[0_16px_34px_-16px_rgba(14,165,233,0.9)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
          >
            Richiedi una consulenza
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
