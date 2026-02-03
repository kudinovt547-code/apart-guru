"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, TrendingUp, Database, BarChart3, CheckCircle2, Star } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCard } from "@/components/ui/animated-card";
import { getProjects } from "@/data/stats";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { SearchBar } from "@/components/projects/SearchBar";

export default function ProjectsPage() {
  const [selectedCity, setSelectedCity] = useState<string>("Все города");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Get all projects
  const allProjects = getProjects();

  // Get unique cities
  const cities = useMemo(() => {
    const uniqueCities = Array.from(new Set(allProjects.map(p => p.city)));
    return ["Все города", ...uniqueCities.sort()];
  }, [allProjects]);

  // Filter projects by city and search query
  const filteredProjects = useMemo(() => {
    let projects = allProjects;

    // Filter by city
    if (selectedCity !== "Все города") {
      projects = projects.filter(p => p.city === selectedCity);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      projects = projects.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.city.toLowerCase().includes(query) ||
        p.country.toLowerCase().includes(query) ||
        p.summary?.toLowerCase().includes(query)
      );
    }

    return projects;
  }, [selectedCity, searchQuery, allProjects]);

  // Transform projects to apartment format for display
  const apartmentsWithStats = useMemo(() => {
    return filteredProjects.map(project => {
      const price_m2 = Math.round(project.price / project.area);
      const adr_avg = project.adr;
      const occ_avg = project.occupancy / 100; // Convert from percentage to decimal

      // Calculate ADR range (±15% from average)
      const adr_low = Math.round(adr_avg * 0.85);
      const adr_high = Math.round(adr_avg * 1.15);

      return {
        id: project.slug,
        name: project.title,
        city: project.city,
        class: project.format === "apart-hotel" ? "Business" : "Comfort",
        price_m2,
        adr_low,
        adr_high,
        adr_avg,
        occ_avg,
        revPerM2Month: Math.round(project.revPerM2Month),
        loc_class: "Center", // Default value
        model: "Short", // Default value
      };
    });
  }, [filteredProjects]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              База данных апартаментов
            </h1>
            <p className="text-xl text-muted-foreground">
              {allProjects.length} объектов с реальными показателями доходности
            </p>
          </div>
        </FadeIn>

        {/* Database Information Section */}
        <FadeIn delay={0.15}>
          <div className="max-w-5xl mx-auto mb-12 space-y-6">
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-background">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Database className="h-6 w-6 text-primary" />
                  Самая полная база апарт-отелей в России
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    <strong className="text-foreground">Apart Guru</strong> собирает и верифицирует данные по всем значимым
                    апарт-отелям от Москвы до Сочи, от Санкт-Петербурга до Казани. В нашей базе {allProjects.length} объектов
                    с реальными показателями загрузки, доходности и отзывами гостей. Мы не полагаемся на маркетинг застройщиков —
                    все цифры проверены и актуализируются ежемесячно.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-foreground">Что отличает нашу базу:</strong> мы показываем не только обещания
                    застройщика, но и <strong className="text-foreground">фактические результаты</strong> работающих объектов.
                    ADR (средний чек), загрузка, сезонность, рейтинги на Яндекс Путешествиях и Ostrovok — всё в одном месте.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <BarChart3 className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    Реальные метрики
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    ADR, RevPAR, загрузка, чистая доходность — все показатели основаны на фактических данных,
                    а не на прогнозах застройщика.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <CheckCircle2 className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    Проверенные данные
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Каждый объект проходит верификацию: мы сверяем данные с площадками бронирования,
                    отзывами гостей и отчётами управляющих компаний.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Star className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    Отзывы гостей
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Агрегируем отзывы с Яндекс, Остров ок и Booking, чтобы вы могли оценить качество
                    управления и соответствие заявленной концепции.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Как мы собираем данные?</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong className="text-foreground block mb-1">1. Парсинг площадок бронирования</strong>
                      <p className="text-muted-foreground">
                        Автоматически отслеживаем цены, загрузку и отзывы на Яндекс Путешествиях, Ostrovok, Booking.com.
                      </p>
                    </div>
                    <div>
                      <strong className="text-foreground block mb-1">2. Данные от инвесторов</strong>
                      <p className="text-muted-foreground">
                        Владельцы апартаментов делятся с нами реальными выплатами, операционными расходами, проблемами УК.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong className="text-foreground block mb-1">3. Анализ конкурентов</strong>
                      <p className="text-muted-foreground">
                        Оцениваем локацию, конкурентную среду, туристическую привлекательность района.
                      </p>
                    </div>
                    <div>
                      <strong className="text-foreground block mb-1">4. Ручная верификация</strong>
                      <p className="text-muted-foreground">
                        Наша команда проверяет каждый объект: звоним в УК, запрашиваем отчёты, ездим на объекты лично.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-500/5">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Что можно найти в базе?
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-foreground">Работающие объекты</strong> с историей выплат инвесторам</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-foreground">Строящиеся проекты</strong> с прогнозами доходности</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-foreground">Объекты от застройщиков</strong> доступные для инвестирования</span>
                    </li>
                  </ul>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-foreground">Апартаменты на вторичке</strong> с действующими договорами УК</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-foreground">Все классы отелей</strong> от эконома до премиума</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-foreground">Все города</strong> от Москвы до Владивостока</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeIn>

        {/* Search Bar */}
        <FadeIn delay={0.1}>
          <div className="mb-6 max-w-2xl mx-auto">
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="Поиск по названию, городу, стране..."
            />
          </div>
        </FadeIn>

        {/* City Filter */}
        <FadeIn delay={0.15}>
          <div className="mb-8 flex flex-wrap gap-3 justify-center">
            {cities.map((city, idx) => (
              <motion.div
                key={city}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
              >
                <Button
                  variant={selectedCity === city ? "default" : "outline"}
                  onClick={() => setSelectedCity(city)}
                >
                  {city}
                </Button>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Results Count */}
        <FadeIn delay={0.2}>
          <p className="text-center text-muted-foreground mb-8">
            Найдено объектов: {apartmentsWithStats.length}
          </p>
        </FadeIn>

        {/* Apartments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartmentsWithStats.map((apt, idx) => (
            <AnimatedCard key={apt.id} delay={0.3 + idx * 0.05}>
              <Link href={`/projects/${apt.id}`}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group">
                  <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Building2 className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      apt.class === "Business"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {apt.class}
                    </span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {apt.name}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{apt.city}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Price per m² */}
                    <div className="flex justify-between items-center pb-3 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">Цена за м²</span>
                      <span className="font-mono text-sm font-semibold tabular-nums">
                        {formatCurrency(apt.price_m2)}
                      </span>
                    </div>

                    {/* ADR Range */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">ADR</span>
                      <span className="font-mono text-sm tabular-nums">
                        {formatCurrency(apt.adr_low)} - {formatCurrency(apt.adr_high)}
                      </span>
                    </div>

                    {/* Occupancy */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Загрузка</span>
                      <span className="font-mono text-sm tabular-nums">
                        {Math.round(apt.occ_avg * 100)}%
                      </span>
                    </div>

                    {/* Revenue per m² */}
                    <div className="flex justify-between items-center pt-3 border-t border-border/50">
                      <span className="text-sm font-medium">Доходность</span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="font-mono text-base font-bold text-primary tabular-nums">
                          {formatNumber(apt.revPerM2Month, 0)} ₽/м²
                        </span>
                      </div>
                    </div>

                    {/* Location & Model */}
                    <div className="flex gap-2 pt-3">
                      <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                        {apt.loc_class === "Prime" ? "Топ-локация" : apt.loc_class === "Center" ? "Центр" : "Район"}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                        {apt.model === "Short" ? "Посуточно" : apt.model === "Long" ? "Долгосрок" : "Гибрид"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </Link>
            </AnimatedCard>
          ))}
        </div>

        {/* Empty State */}
        {apartmentsWithStats.length === 0 && (
          <FadeIn>
            <Card className="max-w-md mx-auto text-center py-12">
              <CardContent>
                <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">
                  Объектов не найдено
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        )}
      </div>

      {/* SEO Structured Data */}
      <BreadcrumbSchema
        items={[
          { name: "Главная", url: "https://apart-guru.vercel.app" },
          { name: "Проекты", url: "https://apart-guru.vercel.app/projects" }
        ]}
      />
    </div>
  );
}
