"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type ServiceCardProps = {
  title: string;
  description: string;
  items: readonly string[];
  image?: string | null;
};

export function ServiceCard({ title, description, items, image }: ServiceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_20px_40px_-30px_rgba(14,116,144,0.55)] transition"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500" />

      <div className="relative aspect-[16/9] overflow-hidden border-b border-slate-200/80">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_20%_15%,#67e8f9_0%,transparent_35%),linear-gradient(135deg,#0f172a_0%,#1e293b_50%,#0c4a6e_100%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/10 to-transparent" />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>

        <ul className="mt-4 space-y-2.5">
          {items.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.35 }}
              className={cn(
                "flex items-start gap-2.5 rounded-lg px-2 py-1.5 text-sm text-slate-700 transition",
                "hover:bg-sky-50 hover:text-slate-900",
              )}
            >
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
