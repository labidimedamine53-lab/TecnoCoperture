import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { projectFallbackPhoto } from "@/lib/constants";

type ProjectCardProps = {
  id: string;
  title: string;
  location: string;
  description: string;
  type: string;
  image?: string | null;
};

export function ProjectCard({ id, title, location, description, type, image }: ProjectCardProps) {
  return (
    <Card className="group h-full overflow-hidden border-slate-200/90 bg-white/90 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_24px_44px_-24px_rgba(14,165,233,0.75)]">
      <Link href={`/portfolio/${id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <Image
            src={image ?? projectFallbackPhoto}
            alt={title}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent opacity-70" />
        </div>
      </Link>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {location} - {type}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-slate-700">{description}</p>
      </CardContent>
    </Card>
  );
}
