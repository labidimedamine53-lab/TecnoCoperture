"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { assetPhotos } from "@/lib/constants";
import { isItalian, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type HeroProps = {
  locale: Locale;
};

export function Hero({ locale }: HeroProps) {
  const italian = isItalian(locale);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = assetPhotos.length;
  const autoScrollIntervalMs = 5000;
  const autoScrollPauseMs = 4000;
  const autoScrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoScrollResumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToSlide = (index: number) => {
    setActiveIndex((index + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % totalSlides);
  };

  const goToPrev = () => {
    setActiveIndex((current) => (current - 1 + totalSlides) % totalSlides);
  };

  const clearAutoScrollTimers = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
    if (autoScrollResumeTimeoutRef.current) {
      clearTimeout(autoScrollResumeTimeoutRef.current);
      autoScrollResumeTimeoutRef.current = null;
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    autoScrollIntervalRef.current = setInterval(() => {
      setActiveIndex((current) => (current + 1) % totalSlides);
    }, autoScrollIntervalMs);
  }, [autoScrollIntervalMs, totalSlides]);

  const pauseAutoScrollAfterArrow = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
    if (autoScrollResumeTimeoutRef.current) {
      clearTimeout(autoScrollResumeTimeoutRef.current);
    }
    autoScrollResumeTimeoutRef.current = setTimeout(() => {
      startAutoScroll();
    }, autoScrollPauseMs);
  }, [autoScrollPauseMs, startAutoScroll]);

  useEffect(() => {
    startAutoScroll();
    return () => clearAutoScrollTimers();
  }, [clearAutoScrollTimers, startAutoScroll]);

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#0ea5e9_0%,transparent_40%)] opacity-60" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
        <div className="relative z-10 space-y-6 text-center lg:text-left">
          <p className="mx-auto inline-flex rounded-full border border-sky-300/30 bg-sky-400/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-sky-200 lg:mx-0">
            {italian ? "Esperti in Coperture e Rifacimenti Tetti" : "Experts in Roofing and Roof Renovation"}
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            {italian
              ? "Specialisti in Coperture Civili e Industriali"
              : "Specialists in Civil and Industrial Roofing"}
          </h1>
          <p className="mx-auto max-w-xl text-base text-slate-200 sm:text-lg lg:mx-0">
            {italian
              ? "Progettiamo e realizziamo coperture tetti sicure, durevoli e certificate. Interveniamo su nuovi cantieri, rifacimento tetto e coperture industriali con squadre qualificate."
              : "We design and install safe, durable and certified roofing systems. We work on new buildings, roof renovation and industrial roofing with qualified teams."}
          </p>
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link href="/contatti" className={buttonVariants({ size: "lg" })}>
              {italian ? "Richiedi Preventivo" : "Request a Quote"}
            </Link>
            <Link
              href="/servizi"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
                "!border-sky-200/50 !bg-transparent !text-white hover:!bg-slate-800 hover:!text-white",
              )}
            >
              {italian ? "Scopri i Servizi" : "Discover Services"}
            </Link>
          </div>
        </div>

        <div className="relative z-10 overflow-hidden rounded-2xl border border-sky-200/20 bg-slate-900/40 shadow-2xl">
          <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/11]">
            <div
              className="flex h-full w-full transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {assetPhotos.map((photo, index) => (
                <div key={photo} className="relative h-full w-full shrink-0">
                  <Image
                    src={photo}
                    alt={
                      italian
                        ? `Copertura tetto - foto ${index + 1}`
                        : `Roofing project - photo ${index + 1}`
                    }
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-full w-full object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-sky-400/20" />

            <button
              type="button"
              onClick={() => {
                goToPrev();
                pauseAutoScrollAfterArrow();
              }}
              className="absolute left-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-slate-900/65 text-white transition hover:bg-slate-800/85"
              aria-label={italian ? "Foto precedente" : "Previous photo"}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => {
                goToNext();
                pauseAutoScrollAfterArrow();
              }}
              className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-slate-900/65 text-white transition hover:bg-slate-800/85"
              aria-label={italian ? "Foto successiva" : "Next photo"}
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2">
              {assetPhotos.map((photo, index) => (
                <button
                  key={`dot-${photo}`}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full border border-white/50 transition",
                    activeIndex === index ? "w-7 bg-sky-300" : "bg-white/45 hover:bg-white/75",
                  )}
                  aria-label={
                    italian ? `Vai alla foto ${index + 1}` : `Go to photo ${index + 1}`
                  }
                  aria-current={activeIndex === index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
