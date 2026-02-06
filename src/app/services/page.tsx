"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles, FileText, Scale, Handshake, Shield, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCard } from "@/components/ui/animated-card";
import { LeadFormModal } from "@/components/lead/LeadFormModal";

const packages = [
  {
    id: "shortlist",
    title: "Shortlist 3–5 вариантов",
    subtitle: "Входной пакет",
    price: "По запросу",
    description: "Мы соберём для вас 3–5 подходящих вариантов под ваш бюджет и цель, с кратким разбором плюсов и минусов каждого.",
    features: [
      "Shortlist 3–5 объектов под бюджет и цель",
      "Краткий разбор плюсы/минусы каждого",
      "Базовые сценарии доходности",
      "Таблица сравнения по ключевым метрикам",
    ],
    cta: "Получить shortlist",
    color: "from-blue-500/10 to-blue-500/5",
    borderColor: "border-blue-500/20",
    delay: 0.1,
  },
  {
    id: "analysis",
    title: "Разбор 1 объекта",
    subtitle: "Инвест-паспорт",
    price: "По запросу",
    description: "Глубокий анализ одного конкретного объекта: 3 сценария доходности, риски договора, вопросы для УК и застройщика.",
    features: [
      "3 сценария доходности: пессимистичный / базовый / оптимистичный",
      "Анализ рисков договора и условий УК",
      "Список вопросов застройщику/УК",
      "Вердикт: брать / не брать / на каких условиях",
    ],
    cta: "Запросить разбор",
    color: "from-green-500/10 to-green-500/5",
    borderColor: "border-green-500/20",
    delay: 0.2,
  },
  {
    id: "compare",
    title: "Сравнение 2–5 объектов",
    subtitle: "Выбор лучшего варианта",
    price: "По запросу",
    description: "Детальное сравнение нескольких вариантов с расчётами, таблицей и итоговой рекомендацией — что выбрать и почему.",
    features: [
      "Детальная таблица сравнения 2–5 объектов",
      "Финансовая модель для каждого варианта",
      "Сравнение рисков и потенциала",
      "Итоговая рекомендация: что выбрать и почему",
    ],
    cta: "Сравнить варианты",
    color: "from-purple-500/10 to-purple-500/5",
    borderColor: "border-purple-500/20",
    delay: 0.3,
  },
  {
    id: "fullcycle",
    title: "Сделка + контроль 6 месяцев",
    subtitle: "Полное сопровождение",
    price: "По запросу",
    description: "Мы ведём вас от выбора объекта до закрытия сделки и контролируем выплаты и отчёты УК первые 6 месяцев.",
    features: [
      "Сопровождение сделки (документы, переговоры)",
      "Проверка договора и условий УК",
      "Контроль выплат и отчётов УК 6 месяцев",
      "Поддержка и консультации на всех этапах",
    ],
    cta: "Обсудить сопровождение",
    color: "from-amber-500/10 to-amber-500/5",
    borderColor: "border-amber-500/20",
    featured: true,
    delay: 0.4,
  },
];

const benefits = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Персональный подход",
    description: "Работаем только с вашим профилем и целями. Никаких шаблонов.",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Проверка документов",
    description: "Анализируем договоры, ищем скрытые риски и невыгодные условия.",
  },
  {
    icon: <Scale className="h-6 w-6" />,
    title: "Реальные расчёты",
    description: "Считаю по 3 сценариям: консервативный, базовый, оптимистичный.",
  },
  {
    icon: <Handshake className="h-6 w-6" />,
    title: "Сопровождение сделки",
    description: "Ведём переговоры, помогаем с документами, контролируем условия.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Контроль выплат",
    description: "Проверяем отчёты УК и соответствие обещанной доходности.",
  },
];

const howItWorks = [
  { step: 1, title: "Собираем профиль", description: "Анкета: бюджет, цель, горизонт, риск-профиль" },
  { step: 2, title: "Формируем shortlist", description: "Подбираем 3–5 вариантов под ваши критерии" },
  { step: 3, title: "Считаем финмодель", description: "3 сценария доходности для каждого объекта" },
  { step: 4, title: "Проверяем УК и договор", description: "Ищем красные флаги и скрытые риски" },
  { step: 5, title: "Сравниваем и рекомендуем", description: "Показываем лучший вариант и объясняем почему" },
  { step: 6, title: "Ведём сделку", description: "Переговоры, документы, контроль условий" },
];

const faq = [
  {
    question: "Сколько стоят ваши услуги?",
    answer: "Стоимость зависит от объёма работы и сложности объекта. Shortlist — от одной суммы, полное сопровождение — от другой. Напишите мне, обсудим конкретно ваш кейс.",
  },
  {
    question: "Как вы зарабатываете? Есть ли откаты от застройщиков?",
    answer: "Мы зарабатываем на оплате наших услуг. Никаких откатов от застройщиков или УК — это противоречит нашей задаче найти для вас лучший вариант, а не самый выгодный для продавца.",
  },
  {
    question: "Вы продаёте объекты или помогаете выбирать?",
    answer: "Мы не продаём объекты. Мы помогаем вам выбрать лучший вариант среди тех, что вы нашли, или среди тех, что мы подобрали по вашим критериям. Наша задача — защитить ваши интересы, а не интересы продавца.",
  },
  {
    question: "Почему я должен вам платить, если застройщик предоставляет презентацию бесплатно?",
    answer: "Презентация застройщика — это маркетинг. Там красивые картинки и обещания, но нет реальных рисков, скрытых расходов и честных сценариев. Мы даём независимый анализ и защищаем ваши деньги.",
  },
  {
    question: "Вы работаете только с новыми объектами или и со вторичкой?",
    answer: "Работаем и с новыми, и с работающими объектами. Главное — чтобы была прозрачность данных и возможность проверить реальную доходность.",
  },
  {
    question: "Что если объект не оправдает ожиданий после покупки?",
    answer: "Именно для этого мы контролируем первые 6 месяцев. Если УК не выполняет обязательства или цифры не сходятся — мы поможем разобраться и скорректировать ситуацию.",
  },
  {
    question: "Можно ли сначала получить shortlist, а потом заказать полное сопровождение?",
    answer: "Да, конечно. Можете начать с shortlist, а потом при необходимости заказать разбор конкретного объекта или полное сопровождение сделки.",
  },
  {
    question: "Вы помогаете с ипотекой или рассрочкой?",
    answer: "Мы не оформляем ипотеку, но поможем оценить условия рассрочки от застройщика и подскажем, выгодно ли это с точки зрения доходности.",
  },
];

export default function ServicesPage() {
  const [leadFormOpen, setLeadFormOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Подбор под вашу цель
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              Мы подберём 3–5 вариантов, посчитаем доходность по сценариям, проверим договор и УК, и проведём вас до сделки.
              Без агентских обещаний — только математика и риски.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Button size="lg" onClick={() => setLeadFormOpen(true)} className="text-base">
              Получить shortlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Что вы получите
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, idx) => (
              <AnimatedCard key={idx} delay={0.1 + idx * 0.1}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Пакеты услуг
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Выберите формат работы — от быстрого shortlist до полного сопровождения
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <AnimatedCard key={pkg.id} delay={pkg.delay}>
                <Card className={`h-full bg-gradient-to-br ${pkg.color} border-2 ${pkg.borderColor} ${pkg.featured ? "md:col-span-2 lg:col-span-1" : ""}`}>
                  <CardHeader>
                    {pkg.featured && (
                      <div className="mb-2">
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                          Рекомендуем
                        </span>
                      </div>
                    )}
                    <CardTitle className="text-2xl">{pkg.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{pkg.subtitle}</p>
                    <p className="text-lg font-bold mt-2">{pkg.price}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{pkg.description}</p>
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={pkg.featured ? "default" : "outline"}
                      onClick={() => setLeadFormOpen(true)}
                    >
                      {pkg.cta}
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Как мы работаем
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              6 шагов от анкеты до сделки
            </p>
          </FadeIn>

          <div className="max-w-3xl mx-auto space-y-6">
            {howItWorks.map((item, idx) => (
              <AnimatedCard key={idx} delay={0.1 + idx * 0.05}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>

          <FadeIn delay={0.5}>
            <div className="text-center mt-8">
              <Button variant="link" asChild>
                <a href="/how-it-works">
                  Подробнее о методологии →
                </a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Частые вопросы
            </h2>
          </FadeIn>

          <div className="max-w-3xl mx-auto space-y-4">
            {faq.map((item, idx) => (
              <AnimatedCard key={idx} delay={0.05 + idx * 0.03}>
                <Card>
                  <CardContent className="pt-6">
                    <button
                      className="w-full flex items-start justify-between text-left gap-4"
                      onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    >
                      <h3 className="font-semibold text-base">{item.question}</h3>
                      {expandedFaq === idx ? (
                        <ChevronUp className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                      )}
                    </button>
                    {expandedFaq === idx && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm text-muted-foreground mt-3"
                      >
                        {item.answer}
                      </motion.p>
                    )}
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Готовы начать?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Заполните анкету, и мы пришлём shortlist в течение 24 часов
            </p>
            <Button size="lg" onClick={() => setLeadFormOpen(true)} className="text-base">
              <Sparkles className="mr-2 h-5 w-5" />
              Получить shortlist
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Lead Form Modal */}
      <LeadFormModal
        open={leadFormOpen}
        onOpenChange={setLeadFormOpen}
        sourcePage="services"
      />
    </div>
  );
}
