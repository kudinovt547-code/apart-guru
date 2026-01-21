"use client";

import { useMemo } from "react";
import Link from "next/link";
import { getProjects } from "@/data/stats";
import {
  calculateMarketIndex,
  getTopByYield,
  getTopByStability,
} from "@/utils/projectUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Building2, TrendingUp, Shield, Calculator, ArrowRight } from "lucide-react";

export default function HomePage() {
  const allProjects = getProjects();

  // Filter to only active projects for stats (exclude construction)
  const activeProjects = useMemo(
    () => allProjects.filter((p) => p.status === "active"),
    [allProjects]
  );

  const marketIndex = useMemo(
    () => calculateMarketIndex(activeProjects),
    [activeProjects]
  );

  const topByYield = useMemo(() => getTopByYield(activeProjects, 5), [activeProjects]);

  const topByStability = useMemo(
    () => getTopByStability(activeProjects, 3),
    [activeProjects]
  );

  const avgPayback = useMemo(() => {
    const sum = activeProjects.reduce((acc, p) => acc + p.paybackYears, 0);
    return sum / activeProjects.length;
  }, [activeProjects]);

  const avgOccupancy = useMemo(() => {
    const sum = activeProjects.reduce((acc, p) => acc + p.occupancy, 0);
    return sum / activeProjects.length;
  }, [activeProjects]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent/30 to-background py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Доходность апартаментов в СНГ — по фактическим данным
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Сравниваем 2–5 объектов, показываем доходность, расходы и риски без обещаний.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="text-base px-8 rounded-full">
                Подобрать 2–5 объектов
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline" className="text-base px-8 rounded-full">
                Открыть каталог
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Market Stats */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Рынок в цифрах
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground font-normal">
                  Средняя доходность
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">
                  {formatCurrency(marketIndex)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">₽/м²/мес</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground font-normal">
                  Средняя окупаемость
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {formatNumber(avgPayback, 1)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">лет</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground font-normal">
                  Средняя загрузка
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {formatNumber(avgOccupancy, 0)}%
                </p>
                <p className="text-sm text-muted-foreground mt-1">по рынку</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground font-normal">
                  Объектов в базе
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{allProjects.length}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  обновлено 01.2026
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Top Projects */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Топ-5 по доходности</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topByYield.map((project, idx) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <span className="text-2xl font-bold text-primary w-8">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <p className="font-semibold">{project.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {project.city}, {project.country}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        {formatCurrency(project.revPerM2Month)}
                      </p>
                      <p className="text-sm text-muted-foreground">₽/м²/мес</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Как это работает
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Выбираете объекты
                </h3>
                <p className="text-muted-foreground">
                  Просматриваете каталог из {allProjects.length} проектов с реальными показателями доходности
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Сравниваете 2-5 проектов
                </h3>
                <p className="text-muted-foreground">
                  Детальное сравнение метрик, рисков и окупаемости по выбранным объектам
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Принимаете решение
                </h3>
                <p className="text-muted-foreground">
                  Получаете объективные данные для взвешенного инвестиционного решения
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-semibold mb-4">
                Сравнение 2–5 объектов
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Добавляйте проекты в сравнение прямо из каталога. Смотрите детальное
                сопоставление доходности, рисков и операционных показателей в одной таблице.
              </p>
              <Link href="/compare">
                <Button variant="outline">
                  Перейти к сравнению
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div>
              <h2 className="text-3xl font-semibold mb-4">
                Калькулятор NOI
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Рассчитайте чистый операционный доход с учётом всех расходов.
                Три сценария развития событий и анализ чувствительности к изменениям рынка.
              </p>
              <Link href="/calculator">
                <Button variant="outline">
                  Открыть калькулятор
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Building2 className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-semibold mb-4">
            Получите персональный подбор
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Расскажите о ваших целях, бюджете и предпочтениях — подберём 2–5 оптимальных
            вариантов с детальным анализом.
          </p>
          <Link href="/contact">
            <Button size="lg" className="text-base px-8 rounded-full">
              Оставить заявку
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
