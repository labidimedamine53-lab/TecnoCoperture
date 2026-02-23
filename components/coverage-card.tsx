import Image from "next/image";
import { ImageOff } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type CoverageCardProps = {
  title: string;
  description: string;
  benefits: readonly string[];
  image?: string | null;
  imageAlt?: string;
  showImageSlot?: boolean;
  emptyImageLabel?: string;
};

export function CoverageCard({
  title,
  description,
  benefits,
  image,
  imageAlt,
  showImageSlot = false,
  emptyImageLabel,
}: CoverageCardProps) {
  return (
    <Card className="group relative h-full overflow-hidden border-slate-200/90 bg-white/90 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_22px_42px_-24px_rgba(14,165,233,0.7)]">
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 opacity-75" />
      {showImageSlot ? (
        <div className="relative mx-5 mt-5 aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
          {image ? (
            <Image
              src={image}
              alt={imageAlt ?? title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-400">
              <ImageOff className="h-6 w-6" />
              <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                {emptyImageLabel ?? "Photo slot"}
              </span>
            </div>
          )}
        </div>
      ) : null}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-slate-700">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
