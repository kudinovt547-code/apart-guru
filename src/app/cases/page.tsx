"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, MapPin, DollarSign, Clock, Target } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCard } from "@/components/ui/animated-card";
import { LeadFormModal } from "@/components/lead/LeadFormModal";

const cases = [
  {
    id: 1,
    title: "Студия 24 м², СПб, цель: максимальный доход",
    city: "Санкт-Петербург",
    goal: "доход",
    inputs: {
      budget: "5 000 000 ₽",
      downPayment: "1 500 000 ₽",
      horizon: "3-5 лет",
      risk: "средний",
    },
    scenarios: [
      { name: "Пессимистичный", noi: "320 000 ₽/год", roi: "6.4%", payback: "15.6 лет" },
      { name: "Базовый", noi: "450 000 ₽/год", roi: "9.0%", payback: "11.1 лет" },
      { name: "Оптимистичный", noi: "580 000 ₽/год", roi: "11.6%", payback: "8.6 лет" },
    ],
    risks: [
      "Высокая конкуренция в центре — демпинг по ценам",
      "УК берёт 25% — выше среднего по рынку",
      "Договор предусматривает штрафы за досрочный выход",
    ],
    conclusion: {
      decision: "Брать с оговоркой",
      reasoning: "Объект в центре с хорошей загрузкой (78%), но высокая комиссия УК снижает доходность. Рекомендую попробовать снизить комиссию УК до 20% или выбрать другой объект с более выгодными условиями.",
    },
    color: "from-blue-500/10 to-blue-500/5",
    borderColor: "border-blue-500/20",
  },
  {
    id: 2,
    title: "1-комнатная 32 м², Москва, цель: рост цены",
    city: "Москва",
    goal: "рост",
    inputs: {
      budget: "12 000 000 ₽",
      downPayment: "3 500 000 ₽",
      horizon: "5+ лет",
      risk: "высокий",
    },
    scenarios: [
      { name: "Пессимистичный", noi: "720 000 ₽/год", roi: "6.0%", payback: "16.7 лет" },
      { name: "Базовый", noi: "1 080 000 ₽/год", roi: "9.0%", payback: "11.1 лет" },
      { name: "Оптимистичный", noi: "1 440 000 ₽/год", roi: "12.0%", payback: "8.3 лет" },
    ],
    risks: [
      "Объект в строительстве — риск переноса сроков сдачи",
      "Застройщик обещает 10% гарантированной доходности, но условия непрозрачные",
      "Высокая цена за м² (375 000 ₽) — сложно продать с прибылью в первые 2-3 года",
    ],
    conclusion: {
      decision: "Не брать",
      reasoning: "Слишком высокая цена входа при непрозрачных гарантиях от застройщика. Гарантированная доходность 10% вызывает сомнения — нужно запросить образец договора и проверить, как УК выполняет обязательства на других объектах.",
    },
    color: "from-red-500/10 to-red-500/5",
    borderColor: "border-red-500/20",
  },
  {
    id: 3,
    title: "Студия 26 м², Сочи, цель: гибрид (доход + рост)",
    city: "Сочи",
    goal: "гибрид",
    inputs: {
      budget: "7 500 000 ₽",
      downPayment: "2 500 000 ₽",
      horizon: "3-5 лет",
      risk: "низкий",
    },
    scenarios: [
      { name: "Пессимистичный", noi: "600 000 ₽/год", roi: "8.0%", payback: "12.5 лет" },
      { name: "Базовый", noi: "825 000 ₽/год", roi: "11.0%", payback: "9.1 лет" },
      { name: "Оптимистичный", noi: "1 050 000 ₽/год", roi: "14.0%", payback: "7.1 лет" },
    ],
    risks: [
      "Сильная сезонность: зима -40%, лето +60%",
      "Зависимость от туристического потока (санкции, кризис)",
      "УК работает 2 года — короткая история, нет долгосрочных данных",
    ],
    conclusion: {
      decision: "Брать",
      reasoning: "Хороший баланс доходности и потенциала роста. Локация в центре Сочи, рядом с морем. УК показывает прозрачные отчёты, несмотря на короткую историю. Рекомендую уточнить механизм компенсации в низкий сезон.",
    },
    color: "from-green-500/10 to-green-500/5",
    borderColor: "border-green-500/20",
  },
  {
    id: 4,
    title: "Студия 22 м², Казань, цель: пассивный доход",
    city: "Казань",
    goal: "доход",
    inputs: {
      budget: "4 200 000 ₽",
      downPayment: "1 200 000 ₽",
      horizon: "5+ лет",
      risk: "низкий",
    },
    scenarios: [
      { name: "Пессимистичный", noi: "300 000 ₽/год", roi: "7.1%", payback: "14.0 лет" },
      { name: "Базовый", noi: "420 000 ₽/год", roi: "10.0%", payback: "10.0 лет" },
      { name: "Оптимистичный", noi: "540 000 ₽/год", roi: "12.9%", payback: "7.8 лет" },
    ],
    risks: [
      "Удалённость от центра — может быть низкая загрузка",
      "Комиссия УК 20% — в норме, но можно найти и ниже",
      "Нет данных о сезонности — неизвестно, как ведёт себя объект зимой",
    ],
    conclusion: {
      decision: "Брать с условием",
      reasoning: "Доступная цена входа и приемлемая доходность. Рекомендую запросить у УК данные о загрузке по месяцам за последний год и уточнить, есть ли гарантия минимальной загрузки в низкий сезон.",
    },
    color: "from-amber-500/10 to-amber-500/5",
    borderColor: "border-amber-500/20",
  },
  {
    id: 5,
    title: "2-комнатная 45 м², СПб, цель: семейная инвестиция",
    city: "Санкт-Петербург",
    goal: "гибрид",
    inputs: {
      budget: "9 500 000 ₽",
      downPayment: "3 000 000 ₽",
      horizon: "5+ лет",
      risk: "низкий",
    },
    scenarios: [
      { name: "Пессимистичный", noi: "665 000 ₽/год", roi: "7.0%", payback: "14.3 лет" },
      { name: "Базовый", noi: "950 000 ₽/год", roi: "10.0%", payback: "10.0 лет" },
      { name: "Оптимистичный", noi: "1 235 000 ₽/год", roi: "13.0%", payback: "7.7 лет" },
    ],
    risks: [
      "Большая площадь — меньший спрос, чем на студии",
      "ADR выше, но загрузка может быть ниже (65-70%)",
      "УК специализируется на студиях — опыта с большими квартирами меньше",
    ],
    conclusion: {
      decision: "Брать, если нужна ликвидность",
      reasoning: "2-комнатная квартира легче продаётся на вторичке, чем студия. Если цель — не только доход, но и возможность продать с прибылью через 3-5 лет, это хороший вариант. Доходность ниже, чем у студии, но ликвидность выше.",
    },
    color: "from-purple-500/10 to-purple-500/5",
    borderColor: "border-purple-500/20",
  },
];

export default function CasesPage() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedGoal, setSelectedGoal] = useState<string>("all");

  const filteredCases = cases.filter(c => {
    if (selectedCity !== "all" && c.city !== selectedCity) return false;
    if (selectedGoal !== "all" && c.goal !== selectedGoal) return false;
    return true;
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Разборы проектов
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Реальные примеры анализа объектов: от входных данных до финального решения. Вот так я работаю с каждым кейсом.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1">
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Все города" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все города</SelectItem>
                  <SelectItem value="Санкт-Петербург">Санкт-Петербург</SelectItem>
                  <SelectItem value="Москва">Москва</SelectItem>
                  <SelectItem value="Сочи">Сочи</SelectItem>
                  <SelectItem value="Казань">Казань</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={selectedGoal} onValueChange={setSelectedGoal}>
                <SelectTrigger>
                  <SelectValue placeholder="Все цели" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все цели</SelectItem>
                  <SelectItem value="доход">Максимальный доход</SelectItem>
                  <SelectItem value="рост">Рост цены</SelectItem>
                  <SelectItem value="гибрид">Гибрид</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Найдено кейсов: {filteredCases.length}
          </p>
        </div>
      </section>

      {/* Cases */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            {filteredCases.map((caseItem, idx) => (
              <AnimatedCard key={caseItem.id} delay={0.1 + idx * 0.05}>
                <Card className={`bg-gradient-to-br ${caseItem.color} border-2 ${caseItem.borderColor}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <CardTitle className="text-2xl">{caseItem.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {caseItem.city}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Inputs */}
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        Входные данные
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-background/50 rounded-lg p-3 border border-border">
                          <p className="text-xs text-muted-foreground mb-1">Бюджет</p>
                          <p className="font-semibold text-sm">{caseItem.inputs.budget}</p>
                        </div>
                        <div className="bg-background/50 rounded-lg p-3 border border-border">
                          <p className="text-xs text-muted-foreground mb-1">Взнос</p>
                          <p className="font-semibold text-sm">{caseItem.inputs.downPayment}</p>
                        </div>
                        <div className="bg-background/50 rounded-lg p-3 border border-border">
                          <p className="text-xs text-muted-foreground mb-1">Горизонт</p>
                          <p className="font-semibold text-sm">{caseItem.inputs.horizon}</p>
                        </div>
                        <div className="bg-background/50 rounded-lg p-3 border border-border">
                          <p className="text-xs text-muted-foreground mb-1">Риск</p>
                          <p className="font-semibold text-sm capitalize">{caseItem.inputs.risk}</p>
                        </div>
                      </div>
                    </div>

                    {/* Scenarios */}
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        3 сценария доходности
                      </h3>
                      <div className="grid md:grid-cols-3 gap-3">
                        {caseItem.scenarios.map((scenario, sidx) => (
                          <div key={sidx} className="bg-background/50 rounded-lg p-4 border border-border">
                            <p className="text-sm font-semibold mb-2 text-muted-foreground">{scenario.name}</p>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">NOI/год:</span>
                                <span className="font-semibold">{scenario.noi}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">ROI:</span>
                                <span className="font-semibold">{scenario.roi}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Окупаемость:</span>
                                <span className="font-semibold">{scenario.payback}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Risks */}
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        Риски и замечания
                      </h3>
                      <ul className="space-y-2">
                        {caseItem.risks.map((risk, ridx) => (
                          <li key={ridx} className="flex gap-2 text-sm">
                            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Conclusion */}
                    <div className="bg-primary/10 rounded-xl p-4 border-2 border-primary/20">
                      <h3 className="font-bold mb-2 flex items-center gap-2 text-lg">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        Вердикт: {caseItem.conclusion.decision}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {caseItem.conclusion.reasoning}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="pt-4 border-t border-border">
                      <Button className="w-full" onClick={() => setLeadFormOpen(true)}>
                        Хочу такой же разбор
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Нужен разбор вашего объекта?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Я проанализирую ваш вариант по такой же методологии и дам чёткое заключение
            </p>
            <Button size="lg" onClick={() => setLeadFormOpen(true)} className="text-base">
              Заказать разбор
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Lead Form Modal */}
      <LeadFormModal
        open={leadFormOpen}
        onOpenChange={setLeadFormOpen}
        sourcePage="cases"
      />
    </div>
  );
}
