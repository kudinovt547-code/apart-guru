"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug } from "@/data/stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AccordionItem } from "@/components/ui/accordion";
import { formatCurrency, formatNumber, formatPercent, formatDate } from "@/lib/utils";
import { formatLabels, statusLabels } from "@/types/project";
import { useCompareStore } from "@/store/useCompareStore";
import { ArrowLeft, GitCompare, Calculator, Send, ExternalLink, MapPin, Building2, TrendingUp, Calendar, Star, Newspaper } from "lucide-react";
import ConstructionForecast from "@/components/projects/ConstructionForecast";
import ProjectMentions from "@/components/projects/ProjectMentions";
import ProjectResearch from "@/components/projects/ProjectResearch";
import { RealEstateListingSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const decodedSlug = decodeURIComponent(slug);
  const project = getProjectBySlug(decodedSlug);

  if (!project) {
    notFound();
  }

  const { addProject, removeProject, isInCompare } = useCompareStore();
  const inCompare = isInCompare(project.slug);

  const monthlyIncome = Math.round(project.revPerM2Month * project.area);
  const roiPercent = formatNumber((project.noiYear / project.price) * 100, 1);

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "База данных", href: "/projects" },
          { label: project.title },
        ]}
      />

      <Link href="/projects">
        <Button variant="ghost">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад к каталогу
        </Button>
      </Link>

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
            <div className="flex items-center gap-2 text-lg text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span>{project.city}, {project.country}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">{formatLabels[project.format]}</Badge>
            <Badge variant="outline" className="text-sm bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400 border-green-200">{statusLabels[project.status]}</Badge>
            {project.class && (
              <Badge variant="outline" className="text-sm capitalize">{project.class}</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Key Metrics Strip */}
      {project.status !== "construction" && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="p-5 bg-primary/5 border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Доход в месяц</p>
            <p className="text-2xl font-bold font-mono tabular-nums text-primary">
              ~{formatCurrency(monthlyIncome)}
            </p>
            <p className="text-xs text-muted-foreground">с апартамента</p>
          </Card>

          <Card className="p-5">
            <p className="text-xs text-muted-foreground mb-1">Доходность</p>
            <p className="text-2xl font-bold font-mono tabular-nums text-primary">
              {roiPercent}%
            </p>
            <p className="text-xs text-muted-foreground">годовых</p>
          </Card>

          <Card className="p-5">
            <p className="text-xs text-muted-foreground mb-1">Загрузка</p>
            <p className="text-2xl font-bold font-mono tabular-nums">
              {formatPercent(project.occupancy)}
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-xs text-muted-foreground mb-1">ADR (чек/ночь)</p>
            <p className="text-2xl font-bold font-mono tabular-nums">
              {formatCurrency(project.adr)}
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-xs text-muted-foreground mb-1">Окупаемость</p>
            <p className="text-2xl font-bold font-mono tabular-nums">
              {formatNumber(project.paybackYears, 1)} лет
            </p>
          </Card>
        </div>
      )}

      {/* Construction KPIs */}
      {project.status === "construction" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-5">
            <p className="text-xs text-muted-foreground mb-1">Стоимость</p>
            <p className="text-2xl font-bold font-mono tabular-nums">{formatCurrency(project.price)}</p>
            <p className="text-xs text-muted-foreground">{project.area} м²</p>
          </Card>
          {project.pricePerM2 && (
            <Card className="p-5">
              <p className="text-xs text-muted-foreground mb-1">Цена за м²</p>
              <p className="text-2xl font-bold font-mono tabular-nums">{formatCurrency(project.pricePerM2)}</p>
            </Card>
          )}
          {project.completionDate && (
            <Card className="p-5">
              <p className="text-xs text-muted-foreground mb-1">Срок сдачи</p>
              <p className="text-lg font-semibold">{project.completionDate}</p>
            </Card>
          )}
          {project.developer && (
            <Card className="p-5">
              <p className="text-xs text-muted-foreground mb-1">Застройщик</p>
              <p className="text-lg font-semibold">{project.developer}</p>
            </Card>
          )}
        </div>
      )}

      {project.status === "construction" && <ConstructionForecast project={project} />}

      {/* Dossier — About the Project */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Досье объекта
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Description */}
          {project.description ? (
            <p className="text-base leading-relaxed">{project.description}</p>
          ) : (
            <p className="text-base leading-relaxed">{project.summary}</p>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            {project.address && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Адрес</p>
                <p className="text-sm font-medium">{project.address}</p>
              </div>
            )}
            {project.managementCompany && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Управляющая компания</p>
                <p className="text-sm font-medium">{project.managementCompany}</p>
              </div>
            )}
            {project.developer && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Застройщик</p>
                <p className="text-sm font-medium">{project.developer}</p>
              </div>
            )}
            {project.operatingSince && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Работает с</p>
                <p className="text-sm font-medium">{project.operatingSince}</p>
              </div>
            )}
            {project.totalUnits && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Номерной фонд</p>
                <p className="text-sm font-medium">{project.totalUnits} юнитов</p>
              </div>
            )}
            {project.managementFee && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Комиссия УК</p>
                <p className="text-sm font-medium">{formatNumber(project.managementFee * 100, 0)}%</p>
              </div>
            )}
            {project.investorShare && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Доля инвестора</p>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">{formatNumber(project.investorShare * 100, 0)}%</p>
              </div>
            )}
            <div>
              <p className="text-xs text-muted-foreground mb-1">Стоимость</p>
              <p className="text-sm font-medium">{formatCurrency(project.price)} ({project.area} м²)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Value & Economics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Why Invest */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Инвестиционная привлекательность
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {project.why.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Financial Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              Финансовые показатели
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">NOI в год</p>
                  <p className="text-lg font-bold font-mono tabular-nums">{formatCurrency(project.noiYear)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Доходность ₽/м²/мес</p>
                  <p className="text-lg font-bold font-mono tabular-nums text-primary">{formatCurrency(project.revPerM2Month)}</p>
                </div>
              </div>

              {project.currentYield2025 && (
                <div className="pt-3 border-t">
                  <p className="text-xs text-muted-foreground mb-1">Доходность 2025</p>
                  <p className="text-lg font-bold font-mono tabular-nums">
                    {formatCurrency(project.currentYield2025)} ₽/м²/мес
                  </p>
                  {project.historicalYield2024 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      2024: {formatCurrency(project.historicalYield2024)} ₽/м²/мес
                      {project.currentYield2025 > project.historicalYield2024 && (
                        <span className="text-green-600 dark:text-green-400 ml-1">
                          ↑ {formatNumber(((project.currentYield2025 - project.historicalYield2024) / project.historicalYield2024) * 100, 1)}%
                        </span>
                      )}
                    </p>
                  )}
                </div>
              )}

              <div className="pt-3 border-t bg-primary/5 -mx-6 -mb-6 px-6 py-4 rounded-b-xl">
                <p className="text-xs text-muted-foreground mb-1">Ориентировочный месячный доход</p>
                <p className="text-2xl font-bold font-mono tabular-nums text-primary">
                  ~{formatCurrency(monthlyIncome)} ₽
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  при площади {project.area} м²
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Research Notes */}
      <ProjectResearch slug={project.slug} />

      {/* Telegram Mentions */}
      <ProjectMentions slug={project.slug} />

      {/* Methodology */}
      <div className="space-y-4">
        <AccordionItem title="Методология расчёта" defaultOpen={false}>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Формула расчёта NOI</h4>
              <p className="text-muted-foreground">
                NOI (Net Operating Income) = Годовая выручка − Операционные расходы
              </p>
              <ul className="mt-2 space-y-1 text-muted-foreground ml-4">
                <li>• Годовая выручка = ADR × Занятость (дней) × 365</li>
                <li>• Операционные расходы: комиссии, налоги, обслуживание, резервы</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Источники данных</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• ADR — данные из систем бронирования и отчётов УК</li>
                <li>• Загрузка — статистика операторов за последние 12 месяцев</li>
                <li>• Расходы — реальные затраты управляющих компаний</li>
              </ul>
            </div>
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                Все расчёты основаны на актуальных данных. Итоговая доходность может отличаться в зависимости от условий конкретного договора.
              </p>
            </div>
          </div>
        </AccordionItem>
      </div>

      {/* CTA Buttons */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold">Заинтересовал объект?</h3>
          <p className="text-sm text-muted-foreground">Получите персональный расчёт доходности и помощь в проверке</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Button
            size="lg"
            onClick={() =>
              inCompare ? removeProject(project.slug) : addProject(project)
            }
            disabled={!inCompare && useCompareStore.getState().projects.length >= 5}
            className="flex-1"
          >
            <GitCompare className="h-5 w-5 mr-2" />
            {inCompare ? "Удалить из сравнения" : "Добавить в сравнение"}
          </Button>

          <Link href="/calculator" className="flex-1">
            <Button size="lg" variant="outline" className="w-full">
              <Calculator className="h-5 w-5 mr-2" />
              Калькулятор
            </Button>
          </Link>

          <Link href="/contact" className="flex-1">
            <Button size="lg" variant="secondary" className="w-full">
              <Send className="h-5 w-5 mr-2" />
              Получить подбор
            </Button>
          </Link>
        </div>
      </Card>

      {/* SEO */}
      <RealEstateListingSchema project={project} url="https://apart.guru" />
      <BreadcrumbSchema
        items={[
          { name: "Главная", url: "https://apart.guru" },
          { name: "Проекты", url: "https://apart.guru/projects" },
          { name: project.title, url: `https://apart.guru/projects/${project.slug}` }
        ]}
      />

      <p className="text-xs text-muted-foreground text-center">
        Обновлено: {formatDate(project.updatedAt)}
      </p>
    </div>
  );
}
