"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProjects } from "@/data/stats";
import { getTopUnderConstruction } from "@/data/under-construction";
import {
  calculateMarketIndex as calculateMarketIndexOld,
  getTopByYield,
  getTopByStability,
} from "@/utils/projectUtils";
import {
  calculateMarketIndex,
  calculateAverageOccupancy,
  calculateAveragePayback,
  getMarketObjectsCount,
  getTopMarketApartments,
} from "@/utils/marketStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatNumber } from "@/lib/utils";
import Image from "next/image";
import { TrendingUp, Shield, Calculator, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCard } from "@/components/ui/animated-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export default function HomePage() {
  const allProjects = getProjects();

  // Filter to only active projects for top list (готовые объекты)
  const activeProjects = useMemo(
    () => allProjects.filter((p) => p.status === "active"),
    [allProjects]
  );

  // Статистика рынка из 86 объектов калькулятора
  const marketIndex = useMemo(() => calculateMarketIndex(), []);
  const avgOccupancy = useMemo(() => calculateAverageOccupancy(), []);
  const avgPayback = useMemo(() => calculateAveragePayback(), []);
  const marketObjectsCount = useMemo(() => getMarketObjectsCount(), []);

  // Топы для таблиц
  const topMarketApartments = useMemo(() => getTopMarketApartments(5), []);
  const topUnderConstruction = useMemo(() => getTopUnderConstruction(5), []);

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

      {/* Market Stats */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-semibold text-center mb-12">
              Рынок в цифрах
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <AnimatedCard delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground font-normal">
                    Средняя доходность
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary font-mono tabular-nums">
                    <AnimatedCounter value={marketIndex} decimals={0} /> ₽
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">₽/м²/мес</p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground font-normal">
                    Средняя окупаемость
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold font-mono tabular-nums">
                    <AnimatedCounter value={avgPayback} decimals={1} />
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">лет</p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.3}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground font-normal">
                    Средняя загрузка
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold font-mono tabular-nums">
                    <AnimatedCounter value={avgOccupancy} decimals={0} />%
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">по рынку</p>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.4}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground font-normal">
                    Объектов в базе
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold font-mono tabular-nums">
                    <AnimatedCounter value={marketObjectsCount} decimals={0} />
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    обновлено 01.2026
                  </p>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>

          {/* Top Projects - Two Tables Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Рыночные объекты */}
            <FadeIn>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Топ-5 по доходности
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Рыночные данные по {getMarketObjectsCount()} объектам
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topMarketApartments.map((apartment, idx) => (
                      <motion.div
                        key={`${apartment.city}-${idx}`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-center justify-between p-3 rounded-lg bg-accent/30 transition-colors border border-primary/10">
                          <div className="flex items-center space-x-3 flex-1">
                            <span className="text-xl font-bold text-primary w-6 flex-shrink-0">
                              {idx + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold truncate">{apartment.city}</p>
                              <p className="text-xs text-muted-foreground">
                                {apartment.class} • {formatCurrency(apartment.price_m2)}/м²
                              </p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0 ml-3">
                            <p className="font-bold font-mono tabular-nums">
                              {formatCurrency(apartment.revPerM2Month)}
                            </p>
                            <p className="text-xs text-muted-foreground">₽/м²/мес</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Строящиеся объекты */}
            <FadeIn delay={0.2}>
              <Card className="h-full border-dashed border-2 border-primary/30 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    Прогнозы по новостройкам
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Расчёты на основе рыночных данных
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topUnderConstruction.map((project, idx) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ x: -4 }}
                      >
                        <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-primary/20 hover:bg-background transition-colors">
                          <div className="flex items-center space-x-3 flex-1">
                            <span className="text-xl font-bold text-primary w-6 flex-shrink-0">
                              {idx + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold truncate">{project.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {project.city} • {project.completionDate}
                              </p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0 ml-3">
                            <p className="font-bold font-mono tabular-nums">
                              {formatCurrency(project.projectedRevPerM2Month)}
                            </p>
                            <p className="text-xs text-muted-foreground">₽/м²/мес*</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 italic">
                    * Прогнозные значения на основе калькулятора
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
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
                    Просматриваете каталог из {allProjects.length} проектов с реальными показателями доходности
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
    </div>
  );
}
