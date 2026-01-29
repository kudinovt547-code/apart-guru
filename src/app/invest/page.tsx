"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, TrendingUp, ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCard } from "@/components/ui/animated-card";
import { getProjects } from "@/data/stats";
import { formatCurrency, formatNumber } from "@/lib/utils";

export default function InvestPage() {
  const [selectedCity, setSelectedCity] = useState<string>("Все города");

  // Get all projects
  const allProjects = getProjects();

  // Filter: показываем только объекты в продаже (for_sale)
  // Для демо используем все active проекты
  const forSaleProjects = useMemo(() => {
    return allProjects.filter(p => p.status === "active");
  }, [allProjects]);

  // Get unique cities
  const cities = useMemo(() => {
    const uniqueCities = Array.from(new Set(forSaleProjects.map(p => p.city)));
    return ["Все города", ...uniqueCities.sort()];
  }, [forSaleProjects]);

  // Filter projects by city
  const filteredProjects = useMemo(() => {
    if (selectedCity === "Все города") {
      return forSaleProjects;
    }
    return forSaleProjects.filter(p => p.city === selectedCity);
  }, [selectedCity, forSaleProjects]);

  // Transform projects for display
  const investmentsWithStats = useMemo(() => {
    return filteredProjects.map(project => {
      const price_m2 = Math.round(project.price / project.area);
      const adr_avg = project.adr;
      const occ_avg = project.occupancy / 100;

      // Calculate ADR range (±15% from average)
      const adr_low = Math.round(adr_avg * 0.85);
      const adr_high = Math.round(adr_avg * 1.15);

      return {
        id: project.slug,
        name: project.title,
        city: project.city,
        class: project.format === "apart-hotel" ? "Business" : "Comfort",
        price_m2,
        price: project.price,
        area: project.area,
        adr_low,
        adr_high,
        adr_avg,
        occ_avg,
        revPerM2Month: Math.round(project.revPerM2Month),
        roi: project.noiYear > 0 ? ((project.noiYear / project.price) * 100).toFixed(1) : "N/A",
        paybackYears: project.paybackYears,
        loc_class: "Center",
        model: "Short",
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
              Инвестиции в апартаменты
            </h1>
            <p className="text-xl text-muted-foreground">
              {forSaleProjects.length} объектов доступны для покупки
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Реальная доходность • Проверенные застройщики • Юридическая поддержка
            </p>
          </div>
        </FadeIn>

        {/* City Filter */}
        <FadeIn delay={0.1}>
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
            Найдено объектов: {investmentsWithStats.length}
          </p>
        </FadeIn>

        {/* Investments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investmentsWithStats.map((apt, idx) => (
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
                      {/* Price */}
                      <div className="flex justify-between items-center pb-3 border-b border-border/50">
                        <span className="text-sm text-muted-foreground">Цена объекта</span>
                        <span className="font-mono text-sm font-semibold tabular-nums">
                          {formatCurrency(apt.price)}
                        </span>
                      </div>

                      {/* Price per m² */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Цена за м²</span>
                        <span className="font-mono text-sm tabular-nums">
                          {formatCurrency(apt.price_m2)}
                        </span>
                      </div>

                      {/* Area */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Площадь</span>
                        <span className="font-mono text-sm tabular-nums">
                          {apt.area} м²
                        </span>
                      </div>

                      {/* ROI */}
                      {apt.roi !== "N/A" && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Годовая доходность</span>
                          <span className="font-mono text-sm font-bold text-primary tabular-nums">
                            {apt.roi}%
                          </span>
                        </div>
                      )}

                      {/* Revenue per m² */}
                      <div className="flex justify-between items-center pt-3 border-t border-border/50">
                        <span className="text-sm font-medium">Доход ₽/м²/мес</span>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <span className="font-mono text-base font-bold text-primary tabular-nums">
                            {formatNumber(apt.revPerM2Month, 0)}
                          </span>
                        </div>
                      </div>

                      {/* Payback */}
                      {apt.paybackYears > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Окупаемость</span>
                          <span className="font-mono text-sm tabular-nums">
                            {apt.paybackYears.toFixed(1)} лет
                          </span>
                        </div>
                      )}

                      {/* CTA Button */}
                      <div className="pt-3">
                        <Button
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          variant="outline"
                          size="sm"
                        >
                          Подробнее
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </AnimatedCard>
          ))}
        </div>

        {/* Empty State */}
        {investmentsWithStats.length === 0 && (
          <FadeIn>
            <Card className="max-w-md mx-auto text-center py-12">
              <CardContent>
                <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">
                  Объектов не найдено в выбранном городе
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        )}

        {/* Info Section */}
        <FadeIn delay={0.4}>
          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Как купить апартамент?
                </h2>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">1</div>
                    <h3 className="font-semibold mb-2">Выберите объект</h3>
                    <p className="text-sm text-muted-foreground">
                      Изучите характеристики и доходность проектов
                    </p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">2</div>
                    <h3 className="font-semibold mb-2">Получите консультацию</h3>
                    <p className="text-sm text-muted-foreground">
                      Наши эксперты проверят объект и ответят на вопросы
                    </p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">3</div>
                    <h3 className="font-semibold mb-2">Оформите сделку</h3>
                    <p className="text-sm text-muted-foreground">
                      Сопровождаем на всех этапах до получения ключей
                    </p>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Link href="/contact">
                    <Button size="lg">
                      Получить консультацию
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
