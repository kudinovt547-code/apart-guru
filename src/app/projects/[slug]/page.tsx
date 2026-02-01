"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug } from "@/data/stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AccordionItem } from "@/components/ui/accordion";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { formatCurrency, formatNumber, formatPercent, formatDate } from "@/lib/utils";
import { formatLabels, statusLabels } from "@/types/project";
import { useCompareStore } from "@/store/useCompareStore";
import { ArrowLeft, GitCompare, Calculator, Send, ExternalLink } from "lucide-react";
import ConstructionForecast from "@/components/projects/ConstructionForecast";
import { RealEstateListingSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  // Декодируем URL-encoded slug (например %D0%BB%D0%B8%D0%B3%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9-29 → лиговский-29)
  const decodedSlug = decodeURIComponent(slug);
  const project = getProjectBySlug(decodedSlug);

  if (!project) {
    notFound();
  }

  const { addProject, removeProject, isInCompare } = useCompareStore();
  const inCompare = isInCompare(project.slug);

  const suitableFor = [];
  const notSuitableFor = [];

  if (project.paybackYears <= 6) {
    suitableFor.push("Инвесторы, ориентированные на быструю окупаемость");
  } else if (project.paybackYears > 9) {
    notSuitableFor.push("Краткосрочные инвестиции");
  }

  if (project.occupancy >= 80) {
    suitableFor.push("Те, кто ценит стабильный денежный поток");
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      {/* Back Button */}
      <Link href="/projects">
        <Button variant="ghost">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад к каталогу
        </Button>
      </Link>

      {/* Project Image Carousel */}
      {project.image && (
        <ImageCarousel
          images={[project.image, ...(project.images || [])]}
          alt={project.title}
        />
      )}

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
            <p className="text-lg text-muted-foreground">
              {project.city}, {project.country}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{formatLabels[project.format]}</Badge>
            <Badge variant="outline">{statusLabels[project.status]}</Badge>
          </div>
        </div>
        <p className="text-muted-foreground">{project.summary}</p>
        <p className="text-xs text-muted-foreground">
          Обновлено: {formatDate(project.updatedAt)}
        </p>
      </div>

      {/* KPI Cards - Different layouts for construction vs active */}
      {project.status === "construction" ? (
        /* Construction Project - Limited KPIs + Link */
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Стоимость</p>
            <p className="text-2xl font-bold font-mono tabular-nums">
              {formatCurrency(project.price)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {project.area} м²
            </p>
          </Card>

          {project.pricePerM2 && (
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Цена за м²</p>
              <p className="text-2xl font-bold font-mono tabular-nums">
                {formatCurrency(project.pricePerM2)}
              </p>
            </Card>
          )}

          {project.completionDate && (
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Срок сдачи</p>
              <p className="text-lg font-semibold">
                {project.completionDate}
              </p>
            </Card>
          )}

          {project.developer && (
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Застройщик</p>
              <p className="text-lg font-semibold">
                {project.developer}
              </p>
            </Card>
          )}

          {project.link && (
            <Card className="p-6 md:col-span-2">
              <p className="text-sm text-muted-foreground mb-2">Ссылка на объект</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1 text-sm"
              >
                Посмотреть на сайте застройщика
                <ExternalLink className="h-3 w-3" />
              </a>
            </Card>
          )}
        </div>
      ) : (
        /* Active Project - Full KPIs */
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Доходность</p>
            <p className="text-2xl font-bold font-mono tabular-nums text-primary">
              {formatCurrency(project.revPerM2Month)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">/м²/мес</p>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">NOI в год</p>
            <p className="text-2xl font-bold font-mono tabular-nums">
              {formatCurrency(project.noiYear)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatNumber((project.noiYear / project.price) * 100, 1)}% годовых
            </p>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Окупаемость</p>
            <p className="text-2xl font-bold font-mono tabular-nums">
              {formatNumber(project.paybackYears, 1)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">лет</p>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Стоимость</p>
            <p className="text-2xl font-bold font-mono tabular-nums">
              {formatCurrency(project.price)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {project.area} м² • {formatCurrency(project.price / project.area)}/м²
            </p>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Загрузка</p>
            <p className="text-2xl font-bold font-mono tabular-nums">
              {formatPercent(project.occupancy)}
            </p>
          </Card>

          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">ADR</p>
            <p className="text-2xl font-bold font-mono tabular-nums">
              {formatCurrency(project.adr)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">средний чек</p>
          </Card>
        </div>
      )}

      {/* Construction Forecast Calculator - Only for construction projects */}
      {project.status === "construction" && (
        <ConstructionForecast project={project} />
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Suitable For */}
        <Card>
          <CardHeader>
            <CardTitle>Кому подходит</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {suitableFor.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Not Suitable For */}
        {notSuitableFor.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Не подходит</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {notSuitableFor.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-destructive mr-2">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Why Invest */}
      <Card>
        <CardHeader>
          <CardTitle>Факторы доходности</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {project.why.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Risks */}
      <Card>
        <CardHeader>
          <CardTitle>Риски</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {project.risks.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-yellow-500 mr-2">!</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Methodology & Due Diligence Accordions */}
      <div className="space-y-4">
          <AccordionItem title="Как мы считали доходность" defaultOpen={false}>
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
                <h4 className="font-semibold mb-2">Откуда данные</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• ADR (средний чек) — данные из систем бронирования</li>
                  <li>• Загрузка — статистика операторов за последние 12 месяцев</li>
                  <li>• Расходы — реальные затраты управляющих компаний</li>
                  <li>• Сезонность — помесячная загрузка за прошлый год</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Что учитывается в расходах</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Комиссия УК: 15-25% от выручки</li>
                  <li>• Коммунальные платежи: ~5-8% от выручки</li>
                  <li>• Налог на имущество: 0.1-0.5% от кадастра</li>
                  <li>• Резерв на ремонт: 3-5% от выручки</li>
                  <li>• Маркетинг и OTA комиссии: ~10-15%</li>
                </ul>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  Все расчёты основаны на актуальных данных управляющих компаний и систем бронирования.
                  Итоговая доходность может отличаться в зависимости от условий конкретного договора.
                </p>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem title="Что проверить перед покупкой" defaultOpen={false}>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Юридическая чистота</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Выписка из ЕГРН — проверить отсутствие обременений</li>
                  <li>• Проверка застройщика — финансовое состояние, репутация</li>
                  <li>• Документы БТИ — соответствие планировки</li>
                  <li>• История сделок — отсутствие споров и претензий</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Управляющая компания</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Опыт работы на рынке — минимум 3 года</li>
                  <li>• Реальная статистика загрузки по объектам</li>
                  <li>• Условия договора — прозрачность отчётности</li>
                  <li>• Отзывы собственников — проверить на независимых площадках</li>
                  <li>• Система бронирования — интеграция с Booking, Airbnb</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Локация и инфраструктура</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Близость к центру, достопримечательностям</li>
                  <li>• Транспортная доступность — до аэропорта, вокзала</li>
                  <li>• Окружение — рестораны, магазины, парки</li>
                  <li>• Конкуренция — плотность похожих объектов в районе</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Финансовые риски</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Сезонность — как меняется загрузка по месяцам</li>
                  <li>• Минимальная загрузка — расчёт при пессимистичном сценарии</li>
                  <li>• Резервный фонд — запас на 3-6 месяцев расходов</li>
                  <li>• Налоговая нагрузка — учёт всех обязательств</li>
                </ul>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  Рекомендуем запросить полный Due Diligence отчёт перед принятием решения о покупке.
                  Мы поможем проверить все аспекты и минимизировать риски.
                </p>
              </div>
            </div>
          </AccordionItem>
      </div>

      {/* CTA Buttons */}
      <Card className="p-6">
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
              Рассчитать в калькуляторе
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

      {/* SEO Structured Data */}
      <RealEstateListingSchema
        project={project}
        url="https://apart-guru.vercel.app"
      />
      <BreadcrumbSchema
        items={[
          { name: "Главная", url: "https://apart-guru.vercel.app" },
          { name: "Проекты", url: "https://apart-guru.vercel.app/projects" },
          { name: project.title, url: `https://apart-guru.vercel.app/projects/${project.slug}` }
        ]}
      />
    </div>
  );
}
