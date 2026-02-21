import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { isItalian, type Locale } from "@/lib/i18n";

type ServiceCardProps = {
  title: string;
  description: string;
  items: readonly string[];
  locale: Locale;
};

export function ServiceCard({ title, description, items, locale }: ServiceCardProps) {
  const italian = isItalian(locale);

  return (
    <Card className="group relative h-full overflow-hidden border-slate-200/90 bg-white/90 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_22px_42px_-24px_rgba(14,165,233,0.7)]">
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 opacity-75" />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-slate-700">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link
          href="/contatti"
          className={buttonVariants({
            variant: "secondary",
            className: "flex w-full items-center justify-center gap-2",
          })}
        >
          {italian ? "Richiedi Preventivo" : "Request a Quote"} <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
