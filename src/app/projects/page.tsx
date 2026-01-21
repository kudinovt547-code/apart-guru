"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProjects } from "@/data/stats";
import {
  filterProjects,
  getUniqueCountries,
  getUniqueCities,
} from "@/utils/projectUtils";
import type { ProjectFilters } from "@/utils/projectUtils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { PropertyFormat, ProjectStatus, formatLabels, statusLabels } from "@/types/project";
import { useCompareStore } from "@/store/useCompareStore";
import { Eye, GitCompare, Calculator } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCard } from "@/components/ui/animated-card";

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false);
  const allProjects = getProjects();
  const [filters, setFilters] = useState<ProjectFilters>({});

  const filteredProjects = useMemo(
    () => filterProjects(allProjects, filters),
    [allProjects, filters]
  );

  const countries = getUniqueCountries(allProjects);
  const cities = getUniqueCities(allProjects);

  const { addProject, removeProject, isInCompare } = useCompareStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4 space-y-8">
        <FadeIn>
          <div className="space-y-3 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold">Каталог проектов</h1>
            <p className="text-lg text-muted-foreground">
              {filteredProjects.length} проектов доходной недвижимости в СНГ
            </p>
          </div>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.1}>
          <Card>
            <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Поиск по названию, городу..."
                  value={filters.search || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                  className="h-11"
                />
              </div>

              <Select
                value={filters.status || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    status: (e.target.value as any) || undefined,
                  })
                }
                className="h-11"
              >
                <option value="">Все статусы</option>
                <option value={ProjectStatus.ACTIVE}>Готовые апартаменты</option>
                <option value={ProjectStatus.CONSTRUCTION}>В строительстве</option>
              </Select>

              <Select
                value={filters.country || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    country: e.target.value || undefined,
                    city: undefined,
                  })
                }
                className="h-11"
              >
                <option value="">Все страны</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </Select>

              <Select
                value={filters.format || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    format: (e.target.value as any) || undefined,
                  })
                }
                className="h-11"
              >
                <option value="">Все форматы</option>
                {Object.values(PropertyFormat).map((format) => (
                  <option key={format} value={format}>
                    {formatLabels[format]}
                  </option>
                ))}
              </Select>
            </div>
          </CardContent>
        </Card>
        </FadeIn>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const inCompare = isInCompare(project.slug);

            return (
              <AnimatedCard key={project.slug} delay={idx * 0.05}>
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <CardTitle className="text-lg leading-tight">
                      {project.title}
                    </CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {project.city}, {project.country}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="outline">{formatLabels[project.format]}</Badge>
                    <Badge variant="outline">{statusLabels[project.status]}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  {project.status === "construction" ? (
                    /* Construction Project Card */
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Стоимость</p>
                        <p className="text-2xl font-bold text-primary">
                          {formatCurrency(project.price)}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-3 border-t text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">Площадь</p>
                          <p className="font-semibold">
                            {formatNumber(project.area, 1)} м²
                          </p>
                        </div>
                        {project.pricePerM2 && (
                          <div>
                            <p className="text-muted-foreground mb-1">₽/м²</p>
                            <p className="font-semibold">
                              {formatCurrency(project.pricePerM2)}
                            </p>
                          </div>
                        )}
                        {project.completionDate && (
                          <div className="col-span-2">
                            <p className="text-muted-foreground mb-1">Срок сдачи</p>
                            <p className="font-semibold">
                              {project.completionDate}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs flex-shrink-0">
                          🏗️ Требуется прогноз доходности
                        </Badge>
                        <Link href="/calculator" className="ml-auto">
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            <Calculator className="h-3 w-3 mr-1" />
                            Калькулятор
                          </Button>
                        </Link>
                      </div>
                    </>
                  ) : (
                    /* Active Project Card */
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Доходность</p>
                        <p className="text-2xl font-bold text-primary">
                          {formatCurrency(project.revPerM2Month)}
                          <span className="text-sm font-normal text-muted-foreground ml-1">
                            /м²/мес
                          </span>
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-3 border-t text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">NOI/год</p>
                          <p className="font-semibold">
                            {formatCurrency(project.noiYear)}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Окупаемость</p>
                          <p className="font-semibold">
                            {formatNumber(project.paybackYears, 1)} лет
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Загрузка</p>
                          <p className="font-semibold">{project.occupancy}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">ADR</p>
                          <p className="font-semibold">
                            {formatCurrency(project.adr)}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 pt-2">
                        {project.summary}
                      </p>
                    </>
                  )}
                </CardContent>

                <CardFooter className="flex gap-2 pt-4">
                  <Link href={`/projects/${project.slug}`} className="flex-1">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                      <Button variant="outline" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        Открыть
                      </Button>
                    </motion.div>
                  </Link>
                  {mounted && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant={inCompare ? "default" : "outline"}
                        onClick={() =>
                          inCompare ? removeProject(project.slug) : addProject(project)
                        }
                        disabled={!inCompare && useCompareStore.getState().projects.length >= 5}
                        className="px-3"
                      >
                        <GitCompare className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </CardFooter>
              </Card>
              </AnimatedCard>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-muted-foreground text-lg">Проекты не найдены</p>
            <p className="text-sm text-muted-foreground mt-2">
              Попробуйте изменить параметры поиска
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
