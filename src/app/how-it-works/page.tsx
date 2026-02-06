"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calculator, Shield, FileText, Scale, TrendingUp, Handshake, DollarSign, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCard } from "@/components/ui/animated-card";
import { LeadFormModal } from "@/components/lead/LeadFormModal";

const steps = [
  {
    number: 1,
    title: "Сбор профиля инвестора",
    description: "Заполняете анкету: бюджет, первоначальный взнос, цель (доход/рост), горизонт, риск-профиль. Это база для подбора.",
    icon: <FileText className="h-6 w-6" />,
  },
  {
    number: 2,
    title: "Формирование shortlist 3–5 вариантов",
    description: "Мы отбираем объекты, которые соответствуют вашим критериям по бюджету, городу, формату и потенциалу. Не больше 5 — чтобы не потеряться в выборе.",
    icon: <Scale className="h-6 w-6" />,
  },
  {
    number: 3,
    title: "Финмодель по 3 сценариям",
    description: "Для каждого объекта считаем доходность в пессимистичном, базовом и оптимистичном сценариях. Учитываем ADR, загрузку, сезонность, расходы УК.",
    icon: <Calculator className="h-6 w-6" />,
  },
  {
    number: 4,
    title: "Проверка УК и договора",
    description: "Анализируем условия договора: схему выплат, комиссии УК, штрафы, обязательства сторон. Ищем красные флаги и невыгодные условия.",
    icon: <Shield className="h-6 w-6" />,
  },
  {
    number: 5,
    title: "Сравнение и выбор",
    description: "Сравниваем все варианты по единой таблице метрик. Даём рекомендацию: какой объект выбрать и почему, какие вопросы задать застройщику/УК.",
    icon: <TrendingUp className="h-6 w-6" />,
  },
  {
    number: 6,
    title: "Переговоры, условия, документы",
    description: "Помогаем с переговорами по цене и условиям. Проверяем итоговый договор перед подписанием. Сопровождаем до закрытия сделки.",
    icon: <Handshake className="h-6 w-6" />,
  },
  {
    number: 7,
    title: "Сделка + контроль",
    description: "После покупки контролируем первые 6 месяцев: проверяем отчёты УК, соответствие выплат ожиданиям, помогаем решать возникающие вопросы.",
    icon: <CheckCircle2 className="h-6 w-6" />,
  },
];

const checklistCategories = [
  {
    title: "Финансы",
    icon: <DollarSign className="h-5 w-5" />,
    items: [
      "ADR (средний чек) и его динамика по месяцам",
      "Загрузка (occupancy) — средняя и по сезонам",
      "RevPAR (доход с доступного номера)",
      "Операционные расходы: УК, коммуналка, ремонтный фонд",
      "NOI (чистая операционная доходность) после всех расходов",
      "Окупаемость (payback period) и IRR",
    ],
  },
  {
    title: "Юридическое",
    icon: <FileText className="h-5 w-5" />,
    items: [
      "Условия договора с УК: схема выплат, комиссии, штрафы",
      "Кто несёт риски пустых периодов (инвестор или УК)",
      "Обязательства сторон: ремонт, мебель, техника",
      "Возможность расторжения договора и условия выхода",
      "Гарантии доходности (если есть) и их реальность",
    ],
  },
  {
    title: "Управляющая компания",
    icon: <Shield className="h-5 w-5" />,
    items: [
      "Прозрачность отчётов: как часто, какие метрики показывают",
      "Схема выплат: фиксированная или от фактической выручки",
      "Репутация УК: отзывы инвесторов, история работы",
      "Процент УК: сколько берут и что входит в комиссию",
      "Красные флаги: задержки выплат, непрозрачные условия",
    ],
  },
  {
    title: "Ликвидность",
    icon: <TrendingUp className="h-5 w-5" />,
    items: [
      "Локация: центр / районы / окраина, транспортная доступность",
      "Формат: апарт-отель / база отдыха / гостиница",
      "Спрос: туристический / деловой / сезонный",
      "Конкуренция: сколько похожих объектов рядом",
      "Перспективы роста цены: развитие района, инфраструктура",
    ],
  },
];

export default function HowItWorksPage() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Как мы работаем
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              7 шагов от анкеты до сделки и контроля первых 6 месяцев. Без обещаний — только проверенная методология и реальные цифры.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 7 Steps */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Наш процесс работы
            </h2>
          </FadeIn>

          <div className="max-w-4xl mx-auto space-y-6">
            {steps.map((step, idx) => (
              <AnimatedCard key={idx} delay={0.1 + idx * 0.05}>
                <Card className="overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-6">
                      {/* Number */}
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                          {step.number}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            {step.icon}
                          </div>
                          <h3 className="text-xl font-bold">{step.title}</h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* What I Check - Checklist */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Что именно мы проверяем
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Полный чек-лист анализа объекта по 4 ключевым категориям
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {checklistCategories.map((category, idx) => (
              <AnimatedCard key={idx} delay={0.1 + idx * 0.1}>
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-bold">{category.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* How I Earn */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-background">
                <CardContent className="pt-8 pb-8 px-8">
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    Как мы зарабатываем
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="leading-relaxed">
                      Наша мотивация — подобрать вариант, который <strong className="text-foreground">реально сходится по цифрам и рискам</strong>. Мы не зарабатываем на откатах от застройщиков или УК — это противоречит нашей задаче защищать ваши интересы.
                    </p>
                    <p className="leading-relaxed">
                      <strong className="text-foreground">В зависимости от кейса</strong> это может быть:
                    </p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Фиксированная оплата за подбор и анализ (shortlist, сравнение)</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Комиссия на сделке (если сопровождаю покупку)</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Оплата сопровождения (контроль первых 6 месяцев)</span>
                      </li>
                    </ul>
                    <p className="leading-relaxed pt-4 border-t border-border">
                      <strong className="text-foreground">Главное:</strong> мы заинтересованы в том, чтобы вы получили объект с реальной доходностью, а не красивой презентацией. Наш доход зависит от качества нашей работы, а не от того, какой объект вы купите.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Готовы начать работу?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Заполните анкету, и мы пришлём shortlist подходящих вариантов
            </p>
            <Button size="lg" onClick={() => setLeadFormOpen(true)} className="text-base">
              Получить shortlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Lead Form Modal */}
      <LeadFormModal
        open={leadFormOpen}
        onOpenChange={setLeadFormOpen}
        sourcePage="how-it-works"
      />
    </div>
  );
}
