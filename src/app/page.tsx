"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProjects } from "@/data/stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatNumber } from "@/lib/utils";
import Image from "next/image";
import { TrendingUp, Shield, Calculator, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCard } from "@/components/ui/animated-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export default function HomePage() {
  // Пока без данных - будут загружены позже
  const allProjects = getProjects();

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

      {/* Coming Soon - Data */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn>
            <Card className="max-w-2xl mx-auto text-center py-12">
              <CardContent>
                <Calculator className="h-16 w-16 mx-auto mb-6 text-primary" />
                <h2 className="text-3xl font-semibold mb-4">
                  База данных в разработке
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Мы собираем и верифицируем данные по апарт-отелям России.
                  Статистика по рынку и каталог проектов появятся совсем скоро.
                </p>
                <Link href="/calculator">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg">
                      Попробовать калькулятор
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
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
