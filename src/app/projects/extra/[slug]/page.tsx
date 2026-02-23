import { Metadata } from "next";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectResearch from "@/components/projects/ProjectResearch";
import ProjectMentions from "@/components/projects/ProjectMentions";
import { ExtraProject } from "@/app/api/admin/add-project/route";

const EXTRA_FILE = path.join(process.cwd(), "src/data/projects-extra.json");

async function getExtraProjects(): Promise<ExtraProject[]> {
  try {
    const raw = await fs.readFile(EXTRA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getExtraProjects();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | Apart Guru`,
    description: project.summary,
  };
}

const formatLabels: Record<string, string> = {
  apartment: "Апартаменты",
  "apart-hotel": "Апарт-отель",
  hotel: "Отель",
  hostel: "Хостел",
};

const statusLabels: Record<string, string> = {
  active: "Активный",
  construction: "Строительство",
  planning: "Планирование",
};

function formatPrice(n: number) {
  if (!n) return null;
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(n);
}

export default async function ExtraProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await getExtraProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <div className="container mx-auto py-8 px-4 space-y-8 max-w-4xl">
      <Link href="/projects">
        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Назад к каталогу
        </span>
      </Link>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {project.city}, {project.country}
          <span className="ml-2 px-2 py-0.5 rounded text-xs bg-muted">
            {formatLabels[project.format] ?? project.format}
          </span>
          <span className="px-2 py-0.5 rounded text-xs bg-muted">
            {statusLabels[project.status] ?? project.status}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
        <p className="text-muted-foreground leading-relaxed">{project.summary}</p>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {project.developer && (
          <Card className="p-5">
            <p className="text-xs text-muted-foreground mb-1">Застройщик</p>
            <p className="font-semibold text-sm">{project.developer}</p>
          </Card>
        )}
        {!!project.price && (
          <Card className="p-5">
            <p className="text-xs text-muted-foreground mb-1">Стоимость от</p>
            <p className="font-bold text-lg font-mono tabular-nums">
              {formatPrice(project.price)}
            </p>
          </Card>
        )}
        {!!project.area && (
          <Card className="p-5">
            <p className="text-xs text-muted-foreground mb-1">Площадь от</p>
            <p className="font-bold text-lg font-mono tabular-nums">
              {project.area} м²
            </p>
          </Card>
        )}
        {project.link && (
          <Card className="p-5">
            <p className="text-xs text-muted-foreground mb-1">Сайт проекта</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1 text-sm"
            >
              Открыть
              <ExternalLink className="h-3 w-3" />
            </a>
          </Card>
        )}
      </div>

      {/* Research Notes */}
      <ProjectResearch slug={project.slug} />

      {/* Telegram Mentions */}
      <ProjectMentions slug={project.slug} />

      {/* CTA */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <Building2 className="h-8 w-8 text-primary mt-1 shrink-0" />
          <div>
            <p className="font-semibold mb-1">Хотите подробный анализ этого объекта?</p>
            <p className="text-sm text-muted-foreground mb-4">
              Команда Apart Guru проведёт полный due diligence: доходность, юридика, управляющая компания.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Запросить анализ
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
