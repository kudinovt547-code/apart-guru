"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCard } from "@/components/ui/animated-card";

const services = [
  {
    id: 1,
    title: "Выбор из 2–5 вариантов",
    subtitle: "Сравнение и рекомендация",
    description:
      "Когда у вас есть 2–5 объектов (или ссылок/презентаций) и нужно понять, какой реально лучше по цифрам и рискам.",
    features: [
      "Приводим все варианты к единому стандарту метрик (₽/м², доходность/год, окупаемость, ADR, загрузка, сезонность)",
      "Сравниваем на одной линейке с диапазонами (консервативный/базовый/оптимистичный сценарии)",
      "Выдаём вывод: какой объект брать и почему, какие вопросы/документы требовать",
    ],
    result:
      "Краткий отчёт + рекомендация + список рисков и «что спросить у продавца/девелопера»",
    color: "from-green-500/10 to-green-500/5",
    delay: 0.1,
  },
  {
    id: 2,
    title: "Сопровождение сделки + 6 месяцев",
    subtitle: "Контроль доходности после покупки",
    description:
      "Для тех, кто хочет не только выбрать, но и дойти до понятной и контролируемой доходности.",
    features: [
      "Проверяем условия, которые влияют на реальные выплаты (УК, комиссии, распределение выручки, обязательства сторон)",
      "Разбираем риски по объекту и модели управления (сезонность, демпинг, качество спроса, операционные расходы)",
      "Сопровождаем первые 6 месяцев: вопросы к УК, контроль логики выплат, корректировка ожиданий и стратегии",
    ],
    result:
      "Минимизация ошибок на входе и защита доходности в первые месяцы владения",
    color: "from-blue-500/10 to-blue-500/5",
    delay: 0.2,
  },
  {
    id: 3,
    title: "Комбо: Выбор 2–5 + сопровождение",
    subtitle: "Полный цикл «под ключ»",
    description:
      "Полный формат «под ключ»: от сравнения вариантов до сделки и последующей стабилизации дохода.",
    features: [
      "Все преимущества сравнительного анализа 2–5 объектов",
      "Полное сопровождение сделки с проверкой всех условий",
      "6 месяцев поддержки после покупки для контроля выплат",
      "Максимальная защита инвестиций на всех этапах",
    ],
    result:
      "Максимальная уверенность и минимальный риск «купил — а по факту не так»",
    color: "from-primary/10 to-primary/5",
    delay: 0.3,
    featured: true,
  },
  {
    id: 4,
    title: "Инвестиционный туризм",
    subtitle: "В разработке",
    description:
      "Формат «посмотреть и понять на месте»: туры по объектам и локациям с фокусом на доходность, спрос, управление и реальные цифры.",
    features: [
      "Маршруты по городам/районам, встречи с УК/девелоперами",
      "Разбор объектов вживую: входные цены, экономика, риски, сравнение альтернатив",
      "Итог тура: shortlist объектов + расчёты + следующий шаг (сделка/отсев)",
    ],
    result: "Глубокое понимание рынка и объектов через личный опыт и экспертизу",
    color: "from-orange-500/10 to-orange-500/5",
    delay: 0.4,
    comingSoon: true,
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-accent/30 to-background py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Услуги Apart Guru
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Подбираем объекты по реальным данным, сопровождаем сделки и защищаем
              доходность первые 6 месяцев владения. Без обещаний — только проверенные цифры
              и прозрачные условия.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {services.map((service) => (
              <AnimatedCard key={service.id} delay={service.delay}>
                <Card
                  className={`relative overflow-hidden ${
                    service.featured ? "border-primary/50" : ""
                  }`}
                >
                  {service.featured && (
                    <div className="absolute top-4 right-4">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: service.delay + 0.2,
                        }}
                      >
                        <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          Популярное
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {service.comingSoon && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-semibold">
                        В разработке
                      </div>
                    </div>
                  )}

                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color}`} />

                  <CardHeader className="relative">
                    <CardTitle className="text-2xl mb-2">
                      {service.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">
                      {service.subtitle}
                    </p>
                  </CardHeader>

                  <CardContent className="relative space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>

                    <div>
                      <h4 className="font-semibold mb-3">Что делаем:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: service.delay + idx * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground leading-relaxed">
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm">
                        <span className="font-semibold">Результат: </span>
                        <span className="text-muted-foreground">{service.result}</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <FadeIn>
            <h2 className="text-4xl font-semibold mb-4">
              Готовы начать?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-muted-foreground mb-8">
              Расскажите о ваших целях и бюджете — подберём оптимальный формат
              работы и объекты с проверенной доходностью.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="text-base px-8 rounded-full">
                  Оставить заявку
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
