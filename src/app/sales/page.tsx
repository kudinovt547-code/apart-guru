"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, MapPin, TrendingUp, Star, CheckCircle2, Sparkles, Calendar, RussianRuble, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCard } from "@/components/ui/animated-card";
import { LeadFormModal } from "@/components/lead/LeadFormModal";
import { getSalesProjects, getSalesProjectsByStatus, sortSalesProjects, SalesProject } from "@/data/sales-projects";
import { formatCurrency } from "@/lib/utils";

export default function SalesPage() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | "for-sale" | "operational">("all");
  const [sortBy, setSortBy] = useState<"price" | "yield">("price");

  const allProjects = getSalesProjects();

  const filteredProjects = useMemo(() => {
    const filtered = getSalesProjectsByStatus(statusFilter);
    return sortSalesProjects(filtered, sortBy);
  }, [statusFilter, sortBy]);

  const handleLeadFormOpen = (projectName?: string) => {
    if (projectName) {
      setSelectedProject(projectName);
    }
    setLeadFormOpen(true);
  };

  const stats = {
    total: allProjects.length,
    forSale: allProjects.filter(p => p.status === "for-sale").length,
    operational: allProjects.filter(p => p.status === "operational").length,
    maxYield: Math.max(...allProjects.map(p => p.yield)),
    minPrice: Math.min(...allProjects.map(p => p.priceFrom))
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Каталог инвестиций
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Проверенные апарт-отели и доходная недвижимость с подтверждённой доходностью. 
              Каждый объект — с детальной аналитикой и реальными показателями.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <div className="text-2xl font-bold text-primary">{stats.total}</div>
                <div className="text-sm text-muted-foreground">объектов</div>
              </div>
              <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.maxYield}%</div>
                <div className="text-sm text-muted-foreground">макс доходность</div>
              </div>
              <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.forSale}</div>
                <div className="text-sm text-muted-foreground">в продаже</div>
              </div>
              <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.operational}</div>
                <div className="text-sm text-muted-foreground">работают</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Info Block */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="border-border/50 bg-background/50">
                <CardContent className="p-6 text-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
                  <div className="font-semibold text-foreground mb-1">Проверенные данные</div>
                  <div className="text-sm text-muted-foreground">Реальные показатели доходности и загрузки</div>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-background/50">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                  <div className="font-semibold text-foreground mb-1">Аналитика</div>
                  <div className="text-sm text-muted-foreground">Детальный разбор каждого объекта</div>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-background/50">
                <CardContent className="p-6 text-center">
                  <Building2 className="h-8 w-8 text-amber-600 dark:text-amber-400 mx-auto mb-3" />
                  <div className="font-semibold text-foreground mb-1">Качество</div>
                  <div className="text-sm text-muted-foreground">Только объекты с прозрачной отчётностью</div>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <div className="w-full md:w-auto">
              <Select value={statusFilter} onValueChange={(value: "all" | "for-sale" | "operational") => setStatusFilter(value)}>
                <SelectTrigger className="min-w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все объекты ({stats.total})</SelectItem>
                  <SelectItem value="for-sale">В продаже ({stats.forSale})</SelectItem>
                  <SelectItem value="operational">Работающие ({stats.operational})</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-auto">
              <Select value={sortBy} onValueChange={(value: "price" | "yield") => setSortBy(value)}>
                <SelectTrigger className="min-w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">По цене (возрастание)</SelectItem>
                  <SelectItem value="yield">По доходности (убывание)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredProjects.map((project, idx) => (
              <AnimatedCard key={project.id} delay={0.1 + idx * 0.05}>
                <Card className={`h-full overflow-hidden cursor-pointer group border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                  project.status === "for-sale" 
                    ? "border-primary/20 hover:border-primary/50 bg-gradient-to-br from-primary/5 via-background to-background" 
                    : "border-green-500/20 hover:border-green-500/50 bg-gradient-to-br from-green-500/5 via-background to-background"
                }`}>
                  <CardHeader className="pb-3">
                    {/* Status Badge */}
                    <div className="flex justify-between items-start mb-3">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                        project.status === "for-sale" 
                          ? "bg-primary/10 text-primary border-primary" 
                          : "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500"
                      }`}>
                        {project.status === "for-sale" ? "В продаже" : "Работает"}
                      </span>
                      {project.completionDate && (
                        <span className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs border">
                          <Calendar className="inline h-3 w-3 mr-1" />
                          {project.completionDate}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <CardTitle className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                      {project.name}
                    </CardTitle>

                    {/* Location */}
                    <div className="flex items-start gap-2 text-sm mb-3">
                      <MapPin className="h-4 w-4 flex-shrink-0 mt-1 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">{project.city}</p>
                        <p className="text-xs text-muted-foreground">{project.address}</p>
                      </div>
                    </div>

                    {/* Class and Rating */}
                    <div className="flex items-center gap-4 mb-3">
                      <span className="bg-muted/50 px-2 py-1 rounded text-xs font-medium">
                        {project.class}
                      </span>
                      {project.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">{project.rating}</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {project.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    )}
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      {/* Features */}
                      {project.features && project.features.length > 0 && (
                        <div className="space-y-2">
                          {project.features.slice(0, 3).map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs">
                              <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Financial Metrics */}
                      <div className={`rounded-xl p-4 border ${
                        project.status === "for-sale"
                          ? "bg-gradient-to-br from-primary/10 to-blue-500/10 border-primary/20"
                          : "bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/20"
                      }`}>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <RussianRuble className="h-3 w-3 text-primary" />
                            </div>
                            <p className="font-mono text-sm font-bold tabular-nums text-primary">
                              от {formatCurrency(project.priceFrom)}
                            </p>
                            <p className="text-[10px] text-muted-foreground">Цена</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
                            </div>
                            <p className="font-mono text-sm font-bold tabular-nums text-green-600 dark:text-green-400">
                              {project.yield}%
                            </p>
                            <p className="text-[10px] text-muted-foreground">Доходность</p>
                          </div>
                        </div>
                        
                        {/* Monthly Payout for Operational */}
                        {project.monthlyPayout && (
                          <div className="mt-3 pt-3 border-t border-border/50 text-center">
                            <p className="text-xs text-muted-foreground mb-1">Выплата в месяц</p>
                            <p className="font-mono text-base font-bold tabular-nums text-amber-600 dark:text-amber-400">
                              {formatCurrency(project.monthlyPayout)}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* CTA Button */}
                      <Button
                        className="w-full"
                        onClick={() => handleLeadFormOpen(project.name)}
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        Узнать подробнее
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <FadeIn>
              <Card className="max-w-md mx-auto text-center py-12">
                <CardContent>
                  <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg text-muted-foreground">
                    Объектов не найдено
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Попробуйте изменить фильтры
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Нужна персональная консультация?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Получите детальный анализ объекта и помощь в выборе оптимального варианта для ваших целей
            </p>
            <Button size="lg" onClick={() => handleLeadFormOpen()} className="text-base">
              Получить консультацию
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Lead Form Modal */}
      <LeadFormModal
        open={leadFormOpen}
        onOpenChange={setLeadFormOpen}
        defaultProjectId={selectedProject}
        sourcePage="sales"
      />
    </div>
  );
}