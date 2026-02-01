"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, TrendingUp } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCard } from "@/components/ui/animated-card";
import { getProjects } from "@/data/stats";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export default function ProjectsPage() {
  const [selectedCity, setSelectedCity] = useState<string>("Все города");

  // Get all projects
  const allProjects = getProjects();

  // Get unique cities
  const cities = useMemo(() => {
    const uniqueCities = Array.from(new Set(allProjects.map(p => p.city)));
    return ["Все города", ...uniqueCities.sort()];
  }, [allProjects]);

  // Filter projects by city
  const filteredProjects = useMemo(() => {
    if (selectedCity === "Все города") {
      return allProjects;
    }
    return allProjects.filter(p => p.city === selectedCity);
  }, [selectedCity, allProjects]);

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
