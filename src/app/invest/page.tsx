"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  Building2, MapPin, TrendingUp, TrendingDown, AlertCircle,
  CheckCircle2, Clock, Home, Calculator, ArrowRight,
  ShieldCheck, Users, FileCheck, Sparkles
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCard } from "@/components/ui/animated-card";
import { investmentProjects } from "@/data/investment-projects";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { useCompareStore } from "@/store/useCompareStore";

export default function InvestPage() {
  const router = useRouter();

  // Redirect to /services
  useEffect(() => {
    router.replace("/services");
  }, [router]);

  const { addProject, projects: compareProjects } = useCompareStore();
  const [formData, setFormData] = useState({
    budget: "",
    downPayment: "",
    city: "Санкт-Петербург",
    goal: "Пассивный доход",
    contact: "",
  });

  // Shortlist: топ проекты (не все подряд)
  const shortlistProjects = useMemo(() => {
    return investmentProjects
      .slice(0, 20) // Максимум 20 проектов
      .map(project => {
        // Вычисляем диапазон доходности (пессимист/база/оптимист)
        const baseROI = project.roi || ((project.noiYear / project.price) * 100);
        const pessimistROI = baseROI * 0.7; // -30%
        const optimistROI = baseROI * 1.2; // +20%

        return {
          ...project,
          roiRange: {
            pessimist: parseFloat(pessimistROI.toFixed(1)),
            base: parseFloat(baseROI.toFixed(1)),
            optimist: parseFloat(optimistROI.toFixed(1)),
          }
        };
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to Telegram bot / CRM
    console.log("Form submitted:", formData);
    alert("Спасибо! Мы свяжемся с вами в течение 15 минут.");
  };

  const isInCompare = (slug: string) => compareProjects.some(p => p.slug === slug);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero + Form */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16 border-b">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-4">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-semibold">ПОДБОР + ПРОВЕРКА + СОПРОВОЖДЕНИЕ</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Подберу апартаменты от застройщика под вашу цель
              </h1>
              <p className="text-xl text-muted-foreground">
                Сравнение 2–5 вариантов + расчёт доходности + план сделки
              </p>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.1}>
            <Card className="max-w-3xl mx-auto border-primary/30">
              <CardHeader>
                <CardTitle className="text-center">Получить 5 вариантов под мой бюджет</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budget">Бюджет (₽)</Label>
                      <Input
                        id="budget"
                        type="number"
                        placeholder="5 000 000"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="downPayment">Первоначальный взнос (₽)</Label>
                      <Input
                        id="downPayment"
                        type="number"
                        placeholder="1 500 000"
                        value={formData.downPayment}
                        onChange={(e) => setFormData({ ...formData, downPayment: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Город</Label>
                      <Select id="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}>
                        <option value="Санкт-Петербург">Санкт-Петербург</option>
                        <option value="Москва">Москва</option>
                        <option value="Сочи">Сочи</option>
                        <option value="Казань">Казань</option>
                        <option value="Любой">Любой город</option>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="goal">Цель инвестирования</Label>
                      <Select id="goal" value={formData.goal} onChange={(e) => setFormData({ ...formData, goal: e.target.value })}>
                        <option value="Пассивный доход">Пассивный доход</option>
                        <option value="Рост капитала">Рост капитала</option>
                        <option value="Гибрид">Доход + рост</option>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contact">Telegram или телефон</Label>
                    <Input
                      id="contact"
                      type="text"
                      placeholder="@username или +7 900 000-00-00"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Получить подборку
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      <div className="container mx-auto py-12 px-4">
        {/* Verified Projects Section */}
        <FadeIn delay={0.2}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Проверенные предложения</h2>
            <p className="text-muted-foreground">
              {shortlistProjects.length} объектов с честными расчётами доходности
            </p>
          </div>
        </FadeIn>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {shortlistProjects.map((project, idx) => (
            <AnimatedCard key={project.slug} delay={0.3 + idx * 0.05}>
              <Card className="h-full hover:border-primary/50 transition-all group">
                {/* Image */}
                {project.image && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    />
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Building2 className="h-6 w-6 text-primary flex-shrink-0" />
                    <div className="flex gap-2">
                      {project.status === "active" ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-600 dark:text-green-400">
                          Работает
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400">
                          Строится
                        </span>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{project.city}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Price */}
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-sm text-muted-foreground">Цена</span>
                    <span className="font-mono text-sm font-semibold">
                      {formatCurrency(project.price)}
                    </span>
                  </div>

                  {/* ROI Range: Pessimist / Base / Optimist */}
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-2">Доходность год (3 сценария):</div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="flex items-center justify-center gap-1 text-xs text-orange-600 dark:text-orange-400">
                          <TrendingDown className="h-3 w-3" />
                          <span>Плохо</span>
                        </div>
                        <div className="font-mono font-bold text-sm">{project.roiRange.pessimist}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-primary">База</div>
                        <div className="font-mono font-bold text-base text-primary">{project.roiRange.base}%</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center gap-1 text-xs text-green-600 dark:text-green-400">
                          <TrendingUp className="h-3 w-3" />
                          <span>Хорошо</span>
                        </div>
                        <div className="font-mono font-bold text-sm">{project.roiRange.optimist}%</div>
                      </div>
                    </div>
                  </div>

                  {/* Why in shortlist */}
                  {project.why && project.why.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Почему в подборке:
                      </div>
                      <ul className="space-y-1">
                        {project.why.slice(0, 3).map((reason, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex gap-1">
                            <span className="text-green-600 dark:text-green-400">•</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Risks */}
                  {project.risks && project.risks.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-2 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Риски:
                      </div>
                      <ul className="space-y-1">
                        {project.risks.slice(0, 2).map((risk, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex gap-1">
                            <span className="text-orange-600 dark:text-orange-400">•</span>
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Link href={`/projects/${project.slug}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Разбор
                      </Button>
                    </Link>
                    <Button
                      variant={isInCompare(project.slug) ? "secondary" : "default"}
                      size="sm"
                      className="w-full"
                      onClick={() => addProject(project)}
                      disabled={isInCompare(project.slug)}
                    >
                      {isInCompare(project.slug) ? "В сравнении" : "Сравнить"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </div>

        {/* How I Earn Section */}
        <FadeIn delay={0.5}>
          <Card className="max-w-4xl mx-auto mb-12 border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-center">Как я зарабатываю и почему вам выгодно</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Комиссию платит застройщик</p>
                      <p className="text-sm text-muted-foreground">
                        Для вас цена такая же, как при покупке напрямую. Разницы нет.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Моя ценность — отбор</p>
                      <p className="text-sm text-muted-foreground">
                        Я проверяю реальную доходность, репутацию УК, договоры. Вы не тратите месяцы на анализ.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Математика и переговоры</p>
                      <p className="text-sm text-muted-foreground">
                        Считаю NOI, окупаемость, риски. Договариваюсь о лучших условиях (скидки, рассрочка).
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Контроль 6 месяцев</p>
                      <p className="text-sm text-muted-foreground">
                        После сделки проверяю, что выплаты идут как обещано. Защищаю ваши интересы.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Process */}
        <FadeIn delay={0.6}>
          <div className="max-w-5xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Как это работает</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: Home, title: "Подбираю 2-5 вариантов", desc: "Под ваш бюджет, город, цели" },
                { icon: Calculator, title: "Считаю доходность", desc: "3 сценария + все расходы" },
                { icon: FileCheck, title: "Проверяю УК и договор", desc: "Репутация, отзывы, юридическая чистота" },
                { icon: ShieldCheck, title: "Сопровождаю сделку", desc: "От выбора до получения ключей + 6 мес" },
              ].map((step, idx) => (
                <Card key={idx} className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* CTA #2 */}
        <FadeIn delay={0.7}>
          <Card className="max-w-2xl mx-auto text-center bg-gradient-to-br from-primary/10 to-background">
            <CardContent className="p-8">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-4">Записаться на 15 минут</h2>
              <p className="text-muted-foreground mb-6">
                Разберём ваш бюджет, цели и подберём оптимальные варианты
              </p>
              <Link href="/contact">
                <Button size="lg">
                  Записаться на созвон
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
