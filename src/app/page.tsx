"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatNumber } from "@/lib/utils";
import Image from "next/image";
import { TrendingUp, Shield, Calculator, ArrowRight, Building2, Percent, Clock, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCard } from "@/components/ui/animated-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/JsonLd";
import {
  calculateMarketRevPerM2,
  calculateAverageOccupancy,
  calculateAveragePayback,
  getApartmentsCount,
  getTopApartmentsByRevenue,
  getCitiesStats,
  getMarketMetrics,
  getRevenueDistribution
} from "@/utils/apartmentStats";

export default function HomePage() {
  const marketRevPerM2 = calculateMarketRevPerM2();
  const avgOccupancy = calculateAverageOccupancy();
  const avgPayback = calculateAveragePayback();
  const apartmentsCount = getApartmentsCount();
  const topApartments = getTopApartmentsByRevenue(5);
  const citiesStats = useMemo(() => getCitiesStats(), []);
  const marketMetrics = useMemo(() => getMarketMetrics(), []);
  const revenueDistribution = useMemo(() => getRevenueDistribution(), []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent/30 to-background py-20 overflow-hidden">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Подбор апартаментов с реальной доходностью
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Сравниваем 2–5 объектов по фактическим данным, показываем реальную доходность, операционные расходы и риски. Сопровождаем сделку и помогаем контролировать выплаты первые 6 месяцев.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="text-base px-8 rounded-full">
                    Подобрать 2–5 объектов
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/projects">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="text-base px-8 rounded-full">
                    Открыть каталог
                  </Button>
                </motion.div>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Market Statistics */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-semibold text-center mb-12">
              Статистика рынка
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            <AnimatedCard delay={0.1}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <div className="font-mono text-3xl font-bold tabular-nums mb-1">
                    <AnimatedCounter value={marketRevPerM2} duration={2} />
                    <span className="text-lg text-muted-foreground ml-1">₽</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Доходность ₽/м²/мес
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <Percent className="h-8 w-8 text-primary" />
                  </div>
                  <div className="font-mono text-3xl font-bold tabular-nums mb-1">
                    <AnimatedCounter value={avgOccupancy} duration={2} />
                    <span className="text-lg text-muted-foreground ml-1">%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Средняя загрузка
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.3}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <div className="font-mono text-3xl font-bold tabular-nums mb-1">
                    <AnimatedCounter value={avgPayback} decimals={1} duration={2} />
                    <span className="text-lg text-muted-foreground ml-1">лет</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Средняя окупаемость
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.4}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <div className="font-mono text-3xl font-bold tabular-nums mb-1">
                    <AnimatedCounter value={apartmentsCount} duration={2} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Объектов в базе
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>

          {/* Top 5 Table */}
          <FadeIn delay={0.5}>
            <Card className="max-w-5xl mx-auto">
              <CardHeader>
                <CardTitle>Топ-5 по доходности</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Название
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Город
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Класс
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                          ADR
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                          Загрузка
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                          ₽/м²/мес
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {topApartments.map((apt, idx) => (
                        <motion.tr
                          key={apt.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + idx * 0.1 }}
                          className="border-b border-border/50 hover:bg-accent/30 transition-colors"
                        >
                          <td className="py-3 px-4 text-sm">{apt.name}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {apt.city}
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {apt.class}
                          </td>
                          <td className="py-3 px-4 text-sm text-right font-mono tabular-nums">
                            {formatCurrency(apt.adr_avg)}
                          </td>
                          <td className="py-3 px-4 text-sm text-right font-mono tabular-nums">
                            {Math.round(apt.occ_avg * 100)}%
                          </td>
                          <td className="py-3 px-4 text-sm text-right font-mono tabular-nums font-semibold text-primary">
                            {formatNumber(apt.revPerM2Month, 0)}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 text-center">
                  <Link href="/projects">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline">
                        Смотреть все проекты
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* Additional Market Metrics */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-semibold text-center mb-12">
              Расширенная аналитика рынка
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            <AnimatedCard delay={0.1}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <div className="font-mono text-2xl font-bold tabular-nums mb-1">
                    {formatCurrency(marketMetrics.avgPrice)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Средняя цена объекта
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <div className="font-mono text-2xl font-bold tabular-nums mb-1">
                    {formatCurrency(marketMetrics.avgNoi)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Средний NOI в год
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.3}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <ArrowRight className="h-8 w-8 text-muted-foreground rotate-180" />
                  </div>
                  <div className="font-mono text-2xl font-bold tabular-nums mb-1">
                    {formatCurrency(marketMetrics.minPrice)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Минимальная цена входа
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.4}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <ArrowRight className="h-8 w-8 text-primary" />
                  </div>
                  <div className="font-mono text-2xl font-bold tabular-nums mb-1">
                    {formatCurrency(marketMetrics.maxPrice)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Максимальная цена
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>

          {/* Cities Stats Table */}
          <FadeIn delay={0.5}>
            <Card className="max-w-6xl mx-auto">
              <CardHeader>
                <CardTitle>Статистика по городам</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Город
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                          Объектов
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                          Средняя доходность
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                          Средняя цена
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                          Окупаемость
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                          Диапазон цен
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {citiesStats.slice(0, 10).map((city, idx) => (
                        <motion.tr
                          key={city.city}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + idx * 0.05 }}
                          className="border-b border-border/50 hover:bg-accent/30 transition-colors"
                        >
                          <td className="py-3 px-4 text-sm font-medium">{city.city}</td>
                          <td className="py-3 px-4 text-sm text-center font-mono tabular-nums">
                            {city.count}
                          </td>
                          <td className="py-3 px-4 text-sm text-right font-mono tabular-nums text-primary font-semibold">
                            {formatNumber(city.avgRevPerM2, 0)} ₽/м²
                          </td>
                          <td className="py-3 px-4 text-sm text-right font-mono tabular-nums">
                            {formatCurrency(city.avgPrice)}
                          </td>
                          <td className="py-3 px-4 text-sm text-right font-mono tabular-nums">
                            {city.avgPayback > 0 ? `${city.avgPayback} лет` : '—'}
                          </td>
                          <td className="py-3 px-4 text-sm text-right font-mono tabular-nums text-muted-foreground">
                            {formatNumber(city.minPrice / 1000000, 1)}М - {formatNumber(city.maxPrice / 1000000, 1)}М
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Revenue Distribution */}
          <FadeIn delay={0.7}>
            <Card className="max-w-4xl mx-auto mt-8">
              <CardHeader>
                <CardTitle>Распределение по доходности (₽/м²/мес)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueDistribution.map((item, idx) => {
                    const maxCount = Math.max(...revenueDistribution.map(r => r.count));
                    const widthPercent = maxCount > 0 ? (item.count / maxCount) * 100 : 0;

                    return (
                      <motion.div
                        key={item.range}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + idx * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <div className="w-32 text-sm font-medium">{item.range} ₽</div>
                        <div className="flex-1 bg-muted rounded-full h-8 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${widthPercent}%` }}
                            transition={{ delay: 0.8 + idx * 0.1, duration: 0.8 }}
                            className="h-full bg-primary flex items-center justify-end pr-3"
                          >
                            {item.count > 0 && (
                              <span className="text-sm font-mono tabular-nums text-primary-foreground">
                                {item.count}
                              </span>
                            )}
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-semibold text-center mb-12">
              Как это работает
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedCard delay={0.1}>
              <Card>
                <CardContent className="pt-6">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-2">
                    Выбираете объекты
                  </h3>
                  <p className="text-muted-foreground">
                    Просматриваете каталог из {apartmentsCount} проектов с реальными показателями доходности
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <Card>
                <CardContent className="pt-6">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Calculator className="h-6 w-6 text-primary" />
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-2">
                    Сравниваете 2-5 проектов
                  </h3>
                  <p className="text-muted-foreground">
                    Детальное сравнение метрик, рисков и окупаемости по выбранным объектам
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.3}>
              <Card>
                <CardContent className="pt-6">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Shield className="h-6 w-6 text-primary" />
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-2">
                    Принимаете решение
                  </h3>
                  <p className="text-muted-foreground">
                    Получаете объективные данные для взвешенного инвестиционного решения
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <FadeIn direction="right" delay={0.1}>
              <div>
                <h2 className="text-3xl font-semibold mb-4">
                  Сравнение 2–5 объектов
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Добавляйте проекты в сравнение прямо из каталога. Смотрите детальное
                  сопоставление доходности, рисков и операционных показателей в одной таблице.
                </p>
                <Link href="/compare">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline">
                      Перейти к сравнению
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div>
                <h2 className="text-3xl font-semibold mb-4">
                  Калькулятор доходности
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Рассчитайте чистый операционный доход с учётом всех расходов.
                  Три сценария развития событий и анализ чувствительности к изменениям рынка.
                </p>
                <Link href="/calculator">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline">
                      Открыть калькулятор
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-semibold text-center mb-4">
              Что делает Apart Guru уникальным?
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Первый в России специализированный аналитический сервис для инвесторов в апарт-отели.
              Объединяем данные, технологии и экспертизу для принятия взвешенных решений.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <AnimatedCard delay={0.1}>
              <Card>
                <CardContent className="pt-6">
                  <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    Полная база апарт-отелей
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    От Москвы до Сочи, от Санкт-Петербурга до Казани — собираем и верифицируем
                    информацию по каждому значимому проекту. База постоянно пополняется.
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <Card>
                <CardContent className="pt-6">
                  <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    Реальные метрики эффективности
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    ADR, RevPAR, загрузка, чистая доходность, рейтинги на Yandex и Ostrovok —
                    всё в одном месте. Никаких обещаний, только факты.
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.3}>
              <Card>
                <CardContent className="pt-6">
                  <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    Прогнозная аналитика
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Наши модели учитывают локацию, концепцию отеля, репутацию УК,
                    конкурентную среду и дают обоснованный прогноз доходности.
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.4}>
              <Card>
                <CardContent className="pt-6">
                  <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    Данные от инвесторов
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Не полагаемся только на маркетинг застройщиков. Реальные цифры приходят
                    от владельцев апартаментов — тех, кто уже получает доход.
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.5}>
              <Card>
                <CardContent className="pt-6">
                  <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    Прозрачные отзывы гостей
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Агрегированные отзывы позволяют оценить качество управления, сервис
                    и соответствие заявленной концепции реальности.
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.6}>
              <Card>
                <CardContent className="pt-6">
                  <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    Персональный подбор
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Учитываем ваш бюджет, цели и предпочтения. Подбираем 2–5 оптимальных
                    вариантов с детальным анализом каждого проекта.
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <FadeIn>
            <motion.div
              initial={{ opacity: 0, scale: 0.3, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                scale: 1.15,
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.5 }
              }}
              whileTap={{ scale: 0.95 }}
              className="mx-auto mb-6 w-48 h-48 relative"
            >
              <Image
                src="/logo.png"
                alt="Apart Guru"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl font-semibold mb-4">
              Получите персональный подбор
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-muted-foreground mb-8">
              Расскажите о ваших целях, бюджете и предпочтениях — подберём 2–5 оптимальных
              вариантов с детальным анализом.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="text-base px-8 rounded-full">
                  Оставить заявку
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* SEO Structured Data */}
      <OrganizationSchema url="https://apart-guru.vercel.app" />
      <WebsiteSchema url="https://apart-guru.vercel.app" />
    </div>
  );
}
