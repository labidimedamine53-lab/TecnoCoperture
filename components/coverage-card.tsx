import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type CoverageCardProps = {
  title: string;
  description: string;
  benefits: readonly string[];
};

export function CoverageCard({ title, description, benefits }: CoverageCardProps) {
  return (
    <Card className="group relative h-full overflow-hidden border-slate-200/90 bg-white/90 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_22px_42px_-24px_rgba(14,165,233,0.7)]">
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 opacity-75" />
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
