"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";

type RoofTypeItem = {
  name: string;
  description: string;
  image: string | null;
};

type RoofTypeShowcaseProps = {
  items: RoofTypeItem[];
  italian: boolean;
};

export function RoofTypeShowcase({ items, italian }: RoofTypeShowcaseProps) {
  const [activeItem, setActiveItem] = useState<RoofTypeItem | null>(null);

  useEffect(() => {
    if (!activeItem) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveItem(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeItem]);

  return (
    <>
      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setActiveItem(item)}
            className="group reveal-up reveal-delay-1 relative overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-[0_20px_38px_-30px_rgba(14,116,144,0.6)] transition duration-300 hover:-translate-y-1.5 hover:border-sky-200 hover:shadow-[0_26px_45px_-30px_rgba(14,165,233,0.7)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="h-full w-full bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_50%,#0c4a6e_100%)]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/25 to-transparent" />
              <h3 className="absolute bottom-3 left-4 right-4 text-lg font-bold text-white">{item.name}</h3>
            </div>
            <p className="p-4 text-sm leading-relaxed text-slate-600">{item.description}</p>
          </button>
        ))}
      </section>

      {activeItem ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/82 p-4 backdrop-blur-sm">
          <div className="w-full max-w-5xl">
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-slate-900 shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-slate-900/70 text-white transition hover:bg-slate-800"
              aria-label={italian ? "Chiudi" : "Close"}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-[16/10] w-full">
              {activeItem.image ? (
                <Image
                  src={activeItem.image}
                  alt={activeItem.name}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="h-full w-full bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_50%,#0c4a6e_100%)]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/35 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold">{activeItem.name}</h3>
                <p className="mt-2 max-w-3xl text-sm text-slate-200">{activeItem.description}</p>
              </div>
            </div>
          </div>
            <div className="mt-4 flex justify-center">
              <Link href="/contatti" className={buttonVariants({ size: "lg" })}>
                {italian ? "Richiedi Preventivo" : "Request a Quote"}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
