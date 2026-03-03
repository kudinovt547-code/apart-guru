"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, TrendingUp, Database, BarChart3, CheckCircle2, Star, Sparkles, Users, Home, Award, Calendar } from "lucide-react";
import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCard } from "@/components/ui/animated-card";
import { getProjects } from "@/data/stats";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { SearchBar } from "@/components/projects/SearchBar";
import { AdvancedFilters, FilterState, defaultFilters, applyFilters } from "@/components/projects/AdvancedFilters";
import { ExtraProject } from "@/app/api/admin/add-project/route";

export default function ProjectsPage() {
  const [selectedCity, setSelectedCity] = useState<string>("Все города");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [extraProjects, setExtraProjects] = useState<ExtraProject[]>([]);

  // Get all projects
  const allProjects = getProjects();

  // Load extra projects added via admin
  useEffect(() => {
    fetch("/api/projects/extra")
      .then((r) => r.json())
      .then((data: ExtraProject[]) => setExtraProjects(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  // Get unique cities
  const cities = useMemo(() => {
    const uniqueCities = Array.from(new Set(allProjects.map(p => p.city)));
    return ["Все города", ...uniqueCities.sort()];
  }, [allProjects]);

  // Calculate min/max for filters
  const priceMin = useMemo(() => Math.min(...allProjects.map(p => p.price)), [allProjects]);
  const priceMax = useMemo(() => Math.max(...allProjects.map(p => p.price)), [allProjects]);
  const paybackMin = useMemo(() => Math.min(...allProjects.map(p => p.paybackYears)), [allProjects]);
  const paybackMax = useMemo(() => Math.max(...allProjects.map(p => p.paybackYears)), [allProjects]);

  // Initialize filters with actual min/max values
  useMemo(() => {
    if (filters.priceRange[0] === 0 && filters.priceRange[1] === 100000000) {
      setFilters(prev => ({
        ...prev,
        priceRange: [priceMin, priceMax],
        paybackRange: [paybackMin, paybackMax],
      }));
    }
  }, [priceMin, priceMax, paybackMin, paybackMax, filters.priceRange]);

  // Filter projects by city, search query, and advanced filters
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

    // Apply advanced filters
    projects = applyFilters(projects, filters);

    return projects;
  }, [selectedCity, searchQuery, allProjects, filters]);

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
              База для анализа и сравнения
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              {allProjects.length} объектов с реальными показателями доходности
            </p>
            <p className="text-sm text-muted-foreground">
              Используйте эту базу для самостоятельного анализа или запросите персональный разбор
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
                  База апарт-отелей для вашего анализа
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    Мы собираем и верифицируем данные по апарт-отелям от Москвы до Сочи, от Санкт-Петербурга до Казани.
                    В базе {allProjects.length} объектов с реальными показателями загрузки, доходности и отзывами гостей.
                    Не полагаемся на маркетинг застройщиков — все цифры проверяем и актуализируем ежемесячно.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-foreground">Что в базе:</strong> не только обещания застройщика,
                    но и <strong className="text-foreground">фактические результаты</strong> работающих объектов.
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

        {/* Advanced Filters */}
        <FadeIn delay={0.15}>
          <AdvancedFilters
            projects={allProjects}
            filters={filters}
            onFiltersChange={setFilters}
            onReset={() => setFilters({
              ...defaultFilters,
              priceRange: [priceMin, priceMax],
              paybackRange: [paybackMin, paybackMax],
            })}
          />
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
          {apartmentsWithStats.map((apt, idx) => {
            const project = filteredProjects.find(p => p.slug === apt.id);
            if (!project) return null;

            const roi = (project.noiYear / project.price) * 100;
            const isInvestment = project.status === "planning" || project.status === "construction";
            const isOperational = project.status === "active";

            // Investment Project Card - Selling dream & potential
            if (isInvestment) {
              return (
                <AnimatedCard key={apt.id} delay={0.3 + idx * 0.05}>
                  <Link href={`/projects/${apt.id}`}>
                    <Card className="h-full overflow-hidden cursor-pointer group border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-primary/5 via-background to-background">
                      {/* Large Hero Image */}
                      {project.image && (
                        <div className="relative h-56 w-full overflow-hidden bg-muted">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {/* Gradient overlay for text readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />

                          {/* Status Badge on Image */}
                          <div className="absolute top-4 left-4 flex gap-2">
                            <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold border border-primary">
                              {project.status === "construction" ? "Строится" : "Планируется"}
                            </span>
                            {project.completionDate && (
                              <span className="bg-background/90 backdrop-blur-sm text-foreground px-3 py-1.5 rounded-full text-xs font-medium border border-border">
                                <Calendar className="inline h-3 w-3 mr-1" />
                                {project.completionDate}
                              </span>
                            )}
                          </div>

                          {/* ROI Badge */}
                          <div className="absolute top-4 right-4">
                            <div className="bg-amber-500/95 backdrop-blur-sm text-white px-4 py-2 rounded-full font-bold border-2 border-amber-400">
                              <span className="text-lg">{formatNumber(roi, 1)}%</span>
                              <span className="text-xs ml-1">ROI</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <CardHeader className="pb-3">
                        {/* Title */}
                        <CardTitle className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                          {apt.name}
                        </CardTitle>

                        {/* Location */}
                        <div className="flex items-start gap-2 text-sm mb-3">
                          <MapPin className="h-4 w-4 flex-shrink-0 mt-1 text-primary" />
                          <div>
                            <p className="font-semibold text-foreground">{apt.city}</p>
                            {project.address && (
                              <p className="text-xs text-muted-foreground">{project.address}</p>
                            )}
                          </div>
                        </div>

                        {/* Description - Selling the dream */}
                        {project.description && (
                          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                            {project.description}
                          </p>
                        )}
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-4">
                          {/* Investment Highlights */}
                          {project.why && project.why.length > 0 && (
                            <div className="bg-gradient-to-br from-green-500/10 to-primary/10 rounded-xl p-4 border border-green-500/20">
                              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-green-700 dark:text-green-300">
                                <Sparkles className="h-4 w-4" />
                                Преимущества
                              </h4>
                              <ul className="space-y-1.5 text-xs">
                                {project.why.slice(0, 3).map((item, i) => (
                                  <li key={i} className="flex gap-2">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                    <span className="text-foreground">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Financial Metrics */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="text-center bg-muted/50 rounded-lg p-3">
                              <p className="text-xs text-muted-foreground mb-1">Инвестиция</p>
                              <p className="font-mono text-sm font-bold tabular-nums">
                                {formatCurrency(project.price)}
                              </p>
                            </div>
                            <div className="text-center bg-muted/50 rounded-lg p-3">
                              <p className="text-xs text-muted-foreground mb-1">Доход/год</p>
                              <p className="font-mono text-sm font-bold tabular-nums text-green-600 dark:text-green-400">
                                {formatCurrency(project.noiYear)}
                              </p>
                            </div>
                          </div>

                          {/* Developer Info */}
                          {project.developer && (
                            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
                              <span className="text-xs text-muted-foreground flex items-center gap-2">
                                <Award className="h-4 w-4" />
                                Застройщик
                              </span>
                              <span className="text-sm font-semibold">{project.developer}</span>
                            </div>
                          )}

                          {/* CTA */}
                          <div className="pt-2 mt-2 border-t border-border">
                            <p className="text-sm text-center text-primary group-hover:text-primary/80 transition-colors font-bold flex items-center justify-center gap-2">
                              <Sparkles className="h-4 w-4" />
                              Узнать подробности
                              <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </AnimatedCard>
              );
            }

            // Operational Project Card - Real facts & data
            if (isOperational) {
              return (
                <AnimatedCard key={apt.id} delay={0.3 + idx * 0.05}>
                  <Link href={`/projects/${apt.id}`}>
                    <Card className="h-full overflow-hidden cursor-pointer group hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-blue-500/5 via-background to-background">
                      {/* Large Hero Image */}
                      {project.image && (
                        <div className="relative h-48 w-full overflow-hidden bg-muted">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />

                          {/* Status Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold border border-green-400">
                              ✓ Работает
                            </span>
                          </div>

                          {/* Rating if available */}
                          {project.rating && (
                            <div className="absolute top-4 right-4">
                              <div className="bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border flex items-center gap-1">
                                <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                                <span className="font-bold text-sm">{project.rating}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <CardHeader className="pb-3">
                        {/* Title */}
                        <CardTitle className="text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
                          {apt.name}
                        </CardTitle>

                        {/* Location */}
                        <div className="flex items-start gap-2 text-sm mb-2">
                          <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" />
                          <div>
                            <p className="font-semibold text-foreground">{apt.city}</p>
                            {project.address && (
                              <p className="text-xs text-muted-foreground">{project.address}</p>
                            )}
                          </div>
                        </div>

                        {/* Summary */}
                        {project.summary && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {project.summary}
                          </p>
                        )}
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-3">
                          {/* Real Performance Metrics */}
                          <div className="bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-xl p-4 border border-blue-500/20">
                            <h4 className="text-xs uppercase tracking-wide text-muted-foreground mb-3 font-semibold">Реальные показатели</h4>
                            <div className="grid grid-cols-3 gap-3">
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                  <TrendingUp className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                </div>
                                <p className="font-mono text-lg font-bold tabular-nums text-blue-600 dark:text-blue-400">
                                  {formatNumber(apt.revPerM2Month, 0)}
                                </p>
                                <p className="text-[10px] text-muted-foreground">₽/м²·мес</p>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                  <BarChart3 className="h-3 w-3 text-green-600 dark:text-green-400" />
                                </div>
                                <p className="font-mono text-lg font-bold tabular-nums text-green-600 dark:text-green-400">
                                  {project.occupancy}%
                                </p>
                                <p className="text-[10px] text-muted-foreground">Загрузка</p>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                  <Home className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                                </div>
                                <p className="font-mono text-lg font-bold tabular-nums text-amber-600 dark:text-amber-400">
                                  {formatNumber(project.paybackYears, 1)}
                                </p>
                                <p className="text-[10px] text-muted-foreground">лет</p>
                              </div>
                            </div>
                          </div>

                          {/* Financial Details */}
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-muted/30 rounded-lg p-2">
                              <p className="text-muted-foreground mb-1">Доход/год</p>
                              <p className="font-mono font-semibold tabular-nums">
                                {formatCurrency(project.noiYear)}
                              </p>
                            </div>
                            <div className="bg-muted/30 rounded-lg p-2">
                              <p className="text-muted-foreground mb-1">ADR</p>
                              <p className="font-mono font-semibold tabular-nums">
                                {formatCurrency(project.adr)}
                              </p>
                            </div>
                          </div>

                          {/* Operations Info */}
                          <div className="space-y-1.5 text-xs">
                            {project.operatingSince && (
                              <div className="flex justify-between items-center p-2 bg-muted/20 rounded">
                                <span className="text-muted-foreground flex items-center gap-2">
                                  <Calendar className="h-3 w-3" />
                                  Работает с
                                </span>
                                <span className="font-medium">{project.operatingSince}</span>
                              </div>
                            )}
                            {project.managementCompany && (
                              <div className="flex justify-between items-center p-2 bg-muted/20 rounded">
                                <span className="text-muted-foreground flex items-center gap-2">
                                  <Building2 className="h-3 w-3" />
                                  УК
                                </span>
                                <span className="font-medium text-right">{project.managementCompany}</span>
                              </div>
                            )}
                            {project.totalUnits && (
                              <div className="flex justify-between items-center p-2 bg-muted/20 rounded">
                                <span className="text-muted-foreground flex items-center gap-2">
                                  <Users className="h-3 w-3" />
                                  Номеров
                                </span>
                                <span className="font-medium">{project.totalUnits}</span>
                              </div>
                            )}
                          </div>

                          {/* CTA */}
                          <div className="pt-2 mt-2 border-t border-border">
                            <p className="text-xs text-center text-primary group-hover:text-primary/80 transition-colors font-semibold flex items-center justify-center gap-1">
                              Полный анализ проекта
                              <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </AnimatedCard>
              );
            }

            return null;
          })}
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

      {/* Extra Projects (added via admin) */}
      {extraProjects.length > 0 && (
        <div className="container mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            Расширенная база
            <span className="text-sm font-normal text-muted-foreground ml-2">
              {extraProjects.length} объект{extraProjects.length > 4 ? "ов" : extraProjects.length > 1 ? "а" : ""}
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {extraProjects.map((ep) => (
              <Link key={ep.slug} href={`/projects/extra/${ep.slug}`}>
                <Card className="h-full cursor-pointer hover:border-primary/40 transition-colors hover:-translate-y-1 duration-200">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {ep.city}, {ep.country}
                      <span className="ml-auto px-1.5 py-0.5 rounded bg-muted text-xs">
                        {ep.status === "active" ? "Активный" : ep.status === "construction" ? "Строится" : "Планируется"}
                      </span>
                    </div>
                    <h3 className="font-semibold leading-snug">{ep.title}</h3>
                    {ep.developer && (
                      <p className="text-xs text-muted-foreground">{ep.developer}</p>
                    )}
                    <p className="text-sm text-muted-foreground line-clamp-2">{ep.summary}</p>
                    {!!ep.price && (
                      <p className="text-sm font-mono font-bold">
                        от {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(ep.price)}
                      </p>
                    )}
                    <p className="text-xs text-primary font-medium">Подробнее →</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* SEO Structured Data */}
      <BreadcrumbSchema
        items={[
          { name: "Главная", url: "https://apart.guru" },
          { name: "Проекты", url: "https://apart.guru/projects" }
        ]}
      />
    </div>
  );
}
