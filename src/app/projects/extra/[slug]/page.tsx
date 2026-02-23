import { Metadata } from "next";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, MapPin, ExternalLink, TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getExtraProjects()).find((p) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.title} | Apart Guru`, description: project.summary };
}

const formatLabels: Record<string, string> = {
  apartment: "Апартаменты", "apart-hotel": "Апарт-отель", hotel: "Отель", hostel: "Хостел",
};
const statusLabels: Record<string, string> = {
  active: "Активный", construction: "Строится", planning: "Планируется",
};

function fmt(n: number) {
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(n);
}
function fmtNum(n: number, decimals = 1) {
  return n.toFixed(decimals);
}

export default async function ExtraProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = (await getExtraProjects()).find((p) => p.slug === slug);
  if (!project) notFound();

  const hasMetrics = !!(project.adr || project.occupancy || project.noiYear || project.roiYear);
  const hasConstruction = project.status === "construction" && !!(project.completionDate || project.totalUnits);

  return (
    <div className="container mx-auto py-8 px-4 space-y-8 max-w-4xl">
      <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Назад к каталогу
      </Link>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {project.city}, {project.country}
          </span>
          {project.address && <span className="text-xs">· {project.address}</span>}
          <span className="px-2 py-0.5 rounded text-xs bg-muted">{formatLabels[project.format] ?? project.format}</span>
          <span className={`px-2 py-0.5 rounded text-xs ${
            project.status === "active" ? "bg-green-500/15 text-green-600" :
            project.status === "construction" ? "bg-amber-500/15 text-amber-600" :
            "bg-muted text-muted-foreground"
          }`}>
            {statusLabels[project.status] ?? project.status}
          </span>
          {project.dataSource === "n8n-ai" && (
            <span className="px-2 py-0.5 rounded text-xs bg-primary/10 text-primary">AI-данные</span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">{project.summary}</p>
        {project.description && (
          <p className="text-muted-foreground leading-relaxed">{project.description}</p>
        )}
      </div>

      {/* Investment KPIs — показываем только если есть данные */}
      {hasMetrics && (
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Показатели доходности
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {!!project.roiYear && (
              <Card className="p-5">
                <p className="text-xs text-muted-foreground mb-1">ROI годовых</p>
                <p className="text-2xl font-bold font-mono tabular-nums text-primary">{fmtNum(project.roiYear)}%</p>
              </Card>
            )}
            {!!project.noiYear && (
              <Card className="p-5">
                <p className="text-xs text-muted-foreground mb-1">NOI в год</p>
                <p className="text-xl font-bold font-mono tabular-nums">{fmt(project.noiYear)}</p>
              </Card>
            )}
            {!!project.paybackYears && (
              <Card className="p-5">
                <p className="text-xs text-muted-foreground mb-1">Окупаемость</p>
                <p className="text-2xl font-bold font-mono tabular-nums">{fmtNum(project.paybackYears)}</p>
                <p className="text-xs text-muted-foreground mt-0.5">лет</p>
              </Card>
            )}
            {!!project.occupancy && (
              <Card className="p-5">
                <p className="text-xs text-muted-foreground mb-1">Загрузка</p>
                <p className="text-2xl font-bold font-mono tabular-nums">{fmtNum(project.occupancy, 0)}%</p>
              </Card>
            )}
            {!!project.adr && (
              <Card className="p-5">
                <p className="text-xs text-muted-foreground mb-1">ADR</p>
                <p className="text-xl font-bold font-mono tabular-nums">{fmt(project.adr)}</p>
                <p className="text-xs text-muted-foreground mt-0.5">средний чек</p>
              </Card>
            )}
            {!!project.revPerM2Month && (
              <Card className="p-5">
                <p className="text-xs text-muted-foreground mb-1">Доходность</p>
                <p className="text-xl font-bold font-mono tabular-nums">{fmt(project.revPerM2Month)}</p>
                <p className="text-xs text-muted-foreground mt-0.5">₽/м²/мес</p>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Pricing & Basic Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {!!project.price && (
          <Card className="p-5">
            <p className="text-xs text-muted-foreground mb-1">Стоимость от</p>
            <p className="font-bold text-lg font-mono tabular-nums">{fmt(project.price)}</p>
            {!!project.priceMax && (
              <p className="text-xs text-muted-foreground mt-0.5">до {fmt(project.priceMax)}</p>
            )}
          </Card>
        )}
        {!!project.area && (
          <Card className="p-5">
            <p className="text-xs text-muted-foreground mb-1">Площадь</p>
            <p className="font-bold text-lg font-mono tabular-nums">{project.area} м²</p>
            {!!project.areaMax && <p className="text-xs text-muted-foreground mt-0.5">до {project.areaMax} м²</p>}
          </Card>
        )}
        {!!project.pricePerM2 && (
          <Card className="p-5">
            <p className="text-xs text-muted-foreground mb-1">Цена за м²</p>
            <p className="font-bold text-lg font-mono tabular-nums">{fmt(project.pricePerM2)}</p>
          </Card>
        )}
        {project.developer && (
          <Card className="p-5">
            <p className="text-xs text-muted-foreground mb-1">Застройщик</p>
            <p className="font-semibold text-sm">{project.developer}</p>
          </Card>
        )}
        {project.managementCompany && (
          <Card className="p-5">
            <p className="text-xs text-muted-foreground mb-1">УК</p>
            <p className="font-semibold text-sm">{project.managementCompany}</p>
            {!!project.investorShare && (
              <p className="text-xs text-primary mt-0.5">{(project.investorShare * 100).toFixed(0)}% инвестору</p>
            )}
          </Card>
        )}
        {hasConstruction && (
          <Card className="p-5">
            <p className="text-xs text-muted-foreground mb-1">Срок сдачи</p>
            <p className="font-semibold text-sm">{project.completionDate}</p>
            {!!project.totalUnits && <p className="text-xs text-muted-foreground mt-0.5">{project.totalUnits} апартаментов</p>}
          </Card>
        )}
        {project.link && (
          <Card className="p-5">
            <p className="text-xs text-muted-foreground mb-1">Сайт</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1 text-sm">
              Открыть <ExternalLink className="h-3 w-3" />
            </a>
          </Card>
        )}
      </div>

      {/* Why invest */}
      {project.why && project.why.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-base">Факторы доходности</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {project.why.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Risks */}
      {project.risks && project.risks.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-base">Риски</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {project.risks.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

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
            <Link href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              Запросить анализ
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
