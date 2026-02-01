"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, TrendingUp, ExternalLink, Star, Award, Construction, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCard } from "@/components/ui/animated-card";
import { investmentProjects } from "@/data/investment-projects";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export default function InvestPage() {
  const [selectedCity, setSelectedCity] = useState<string>("Все города");

  // Инвестиционные проекты от застройщиков
  const forSaleProjects = investmentProjects;

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

      return {
        id: project.slug,
        name: project.title,
        city: project.city,
        class: project.class || "комфорт",
        price_m2,
        price: project.price,
        area: project.area,
        areaMax: project.areaMax,
        revPerM2Month: Math.round(project.revPerM2Month),
        roi: project.roi || (project.noiYear > 0 ? ((project.noiYear / project.price) * 100).toFixed(1) : "N/A"),
        paybackYears: project.paybackYears,
        occupancy: project.occupancy,
        rating: project.rating,
        management: project.management,
        operatingSince: project.operatingSince,
        totalUnits: project.totalUnits,
      };
    });
  }, [filteredProjects]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <Award className="h-5 w-5" />
              <span className="text-sm font-semibold">ИНВЕСТИЦИОННЫЕ ПРЕДЛОЖЕНИЯ ОТ ЗАСТРОЙЩИКОВ</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Инвестиции в апарт-отели
            </h1>
            <p className="text-xl text-muted-foreground">
              {forSaleProjects.length} объектов доступны для инвестирования
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Прямые предложения от застройщиков • Инвестиционные программы • Юридическая поддержка
            </p>
          </div>
        </FadeIn>

        {/* Detailed Information Section */}
        <FadeIn delay={0.15}>
          <div className="max-w-5xl mx-auto mb-12 space-y-6">
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-background">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Building2 className="h-6 w-6 text-primary" />
                  Что такое инвестиционные апартаменты?
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    <strong className="text-foreground">Инвестиционные апартаменты</strong> — это апартаменты в апарт-отелях,
                    которые вы покупаете у застройщика для получения пассивного дохода от аренды. Застройщик или управляющая
                    компания берёт на себя всю операционную работу: размещение объявлений, работу с гостями, уборку, ремонт.
                    Вы получаете ежемесячные выплаты без участия в процессе.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-foreground">Ключевое отличие от обычной квартиры:</strong> вы не можете жить в
                    апартаментах сами — они предназначены только для коммерческого использования (сдача в посуточную аренду).
                    Зато доходность, как правило, выше: от 8% до 15% годовых в зависимости от локации и концепции.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-5 w-5" />
                    Преимущества
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Пассивный доход</strong>
                      <p className="text-muted-foreground">
                        Не нужно искать арендаторов, убирать, решать бытовые вопросы. Всё делает УК.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Высокая доходность</strong>
                      <p className="text-muted-foreground">
                        8-15% годовых против 4-6% от долгосрочной аренды обычной квартиры.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Профессиональное управление</strong>
                      <p className="text-muted-foreground">
                        Опытные отельеры максимизируют загрузку и доход через динамическое ценообразование.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Ликвидность</strong>
                      <p className="text-muted-foreground">
                        Апартаменты можно продать другому инвестору, часто с наценкой за счёт доказанной доходности.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Налоговые преимущества</strong>
                      <p className="text-muted-foreground">
                        Возможность работы по УСН 6%, что снижает налоговую нагрузку по сравнению с НДФЛ 13%.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                    <Award className="h-5 w-5" />
                    На что обратить внимание
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <Star className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Локация</strong>
                      <p className="text-muted-foreground">
                        Туристические города (Сочи, Казань, Калининград) приносят больше дохода, но имеют сезонность.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Star className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Управляющая компания</strong>
                      <p className="text-muted-foreground">
                        От неё зависит 80% успеха. Проверьте репутацию, отзывы гостей, опыт работы с похожими объектами.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Star className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Операционные расходы</strong>
                      <p className="text-muted-foreground">
                        УК обычно берёт 20-30% от выручки. Уточните, что входит: коммуналка, ремонт, маркетинг, страхование.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Star className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Реальная vs. обещанная доходность</strong>
                      <p className="text-muted-foreground">
                        Застройщики часто завышают прогнозы. Мы показываем фактические цифры от работающих объектов.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Star className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Этап строительства</strong>
                      <p className="text-muted-foreground">
                        Покупка на стадии котлована дешевле, но рискованнее. Готовые объекты дороже, зато доход идёт сразу.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Как работает модель доходности?</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><strong className="text-foreground">Выручка:</strong> Гости бронируют номера через Яндекс Путешествия, Ostrovok, Booking.com и платят за проживание. Управляющая компания собирает выручку.</p>
                  <p><strong className="text-foreground">Расходы УК:</strong> Из выручки вычитаются комиссии площадок (10-15%), операционные расходы (уборка, стирка, ремонт), коммунальные платежи, зарплата персонала.</p>
                  <p><strong className="text-foreground">Ваш доход:</strong> Оставшаяся сумма (обычно 70-80% от выручки) распределяется между всеми владельцами пропорционально площади их апартаментов. Вы получаете выплаты ежемесячно на счёт.</p>
                  <p><strong className="text-foreground">Прозрачность:</strong> Хорошие УК предоставляют личный кабинет, где видна статистика: сколько ночей сдано, по какой цене, какие расходы, итоговый доход.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-500/5">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Почему стоит инвестировать через Apart Guru?
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Мы проверяем <strong className="text-foreground">фактическую доходность</strong> работающих объектов, а не верим маркетингу застройщиков.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Анализируем <strong className="text-foreground">репутацию УК</strong>: отзывы гостей, качество сервиса, историю выплат инвесторам.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Сопровождаем сделку от подбора до получения ключей, помогаем <strong className="text-foreground">контролировать выплаты первые 6 месяцев</strong>.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Подбираем <strong className="text-foreground">2-5 оптимальных вариантов</strong> под ваш бюджет и цели, чтобы вы сравнили и выбрали лучший.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
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
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group overflow-hidden">
                  {filteredProjects.find(p => p.slug === apt.id)?.image && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={filteredProjects.find(p => p.slug === apt.id)?.image || ''}
                        alt={apt.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        quality={95}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Building2 className="h-6 w-6 text-primary flex-shrink-0" />
                      <div className="flex gap-2">
                        {filteredProjects.find(p => p.slug === apt.id)?.status === "active" ? (
                          <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Работает
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center gap-1">
                            <Construction className="h-3 w-3" />
                            Строится
                          </span>
                        )}
                        {apt.class && (
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                            {apt.class}
                          </span>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {apt.name}
                    </CardTitle>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{apt.city}</span>
                      </div>
                      {filteredProjects.find(p => p.slug === apt.id)?.developer && (
                        <span className="text-xs text-muted-foreground font-medium">
                          {filteredProjects.find(p => p.slug === apt.id)?.developer}
                        </span>
                      )}
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
                          {apt.area} м² {apt.areaMax && `- ${apt.areaMax} м²`}
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

                      {/* Occupancy */}
                      {apt.occupancy && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Загрузка</span>
                          <span className="font-mono text-sm font-bold text-green-600 dark:text-green-400 tabular-nums">
                            {apt.occupancy}%
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

                      {/* Management & Units */}
                      {(apt.management || apt.totalUnits) && (
                        <div className="pt-3 border-t border-border/50 space-y-2">
                          {apt.management && (
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">Управление</span>
                              <span className="text-xs font-medium">{apt.management}</span>
                            </div>
                          )}
                          {apt.totalUnits && (
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">Всего номеров</span>
                              <span className="text-xs font-medium tabular-nums">{apt.totalUnits}</span>
                            </div>
                          )}
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
          <div className="mt-12 max-w-4xl mx-auto">
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

      {/* SEO Structured Data */}
      <BreadcrumbSchema
        items={[
          { name: "Главная", url: "https://apart-guru.vercel.app" },
          { name: "Инвестиции", url: "https://apart-guru.vercel.app/invest" }
        ]}
      />
    </div>
  );
}
