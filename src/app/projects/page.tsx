"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { underConstructionProjects } from "@/data/under-construction";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Calculator, TrendingUp, AlertCircle, MapPin, Calendar } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCard } from "@/components/ui/animated-card";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  // Фильтрация
  const filteredProjects = useMemo(() => {
    return underConstructionProjects.filter((project) => {
      const matchesSearch =
        !search ||
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.city.toLowerCase().includes(search.toLowerCase()) ||
        project.developer.toLowerCase().includes(search.toLowerCase());

      const matchesCity = !selectedCity || project.city === selectedCity;

      return matchesSearch && matchesCity;
    });
  }, [search, selectedCity]);

  const cities = useMemo(() => {
    return Array.from(new Set(underConstructionProjects.map((p) => p.city))).sort();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4 space-y-8">
        <FadeIn>
          <div className="space-y-3 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold">Каталог новостроек</h1>
            <p className="text-lg text-muted-foreground">
              {filteredProjects.length} строящихся проектов с прогнозными расчётами
            </p>
          </div>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.1}>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Поиск по названию, городу, девелоперу..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-11"
                  />
                </div>

                <Select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="h-11"
                >
                  <option value="">Все города</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </Select>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Info Banner */}
        <FadeIn delay={0.15}>
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold">Прогнозные данные</p>
                  <p className="text-sm text-muted-foreground">
                    Все показатели рассчитаны на основе нашего калькулятора и рыночных данных по
                    аналогичным объектам. Фактическая доходность может отличаться.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <AnimatedCard key={project.id} delay={0.05 * idx}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full border-dashed border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {project.completionDate}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-primary/10 text-primary"
                      >
                        Строится
                      </Badge>
                    </div>
                    <CardTitle className="text-xl leading-tight">
                      {project.title}
                    </CardTitle>
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground pt-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{project.city}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{project.developer}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Main Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Цена за м²</p>
                        <p className="font-bold font-mono tabular-nums text-sm">
                          {formatCurrency(project.pricePerM2)}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Прогноз ₽/м²/мес</p>
                        <p className="font-bold font-mono tabular-nums text-primary text-sm">
                          {formatCurrency(project.projectedRevPerM2Month)}
                        </p>
                      </div>
                    </div>

                    {/* Projected Stats */}
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">ADR</p>
                        <p className="font-mono tabular-nums text-xs font-semibold">
                          {formatCurrency(project.projectedADR)}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Загрузка</p>
                        <p className="font-mono tabular-nums text-xs font-semibold">
                          {Math.round(project.projectedOccupancy * 100)}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Окупаемость</p>
                        <p className="font-mono tabular-nums text-xs font-semibold">
                          {formatNumber(project.projectedPaybackYears, 1)} лет
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Процент годовых</span>
                        <span className="font-bold font-mono tabular-nums text-primary">
                          {formatNumber(project.projectedROI, 1)}%
                        </span>
                      </div>
                    </div>

                    {/* Risk Note */}
                    {project.riskNote && (
                      <div className="pt-3 border-t">
                        <p className="text-xs text-muted-foreground italic">
                          {project.riskNote}
                        </p>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      <Calculator className="h-4 w-4 mr-2" />
                      Рассчитать
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </AnimatedCard>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <FadeIn>
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  Проекты не найдены. Попробуйте изменить параметры поиска.
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
