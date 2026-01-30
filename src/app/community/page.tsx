"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageCircle,
  BookOpen,
  TrendingUp,
  Award,
  Target,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCard } from "@/components/ui/animated-card";

export default function CommunityPage() {
  const features = [
    {
      icon: Users,
      title: "Сообщество инвесторов",
      description: "Общайтесь с опытными инвесторами в недвижимость, делитесь опытом и получайте советы",
      link: "https://t.me/apartguru_community"
    },
    {
      icon: MessageCircle,
      title: "Чат поддержки",
      description: "Получайте быстрые ответы на вопросы об инвестициях в апарт-отели",
      link: "https://t.me/apartguru_support"
    },
    {
      icon: BookOpen,
      title: "База знаний",
      description: "Обучающие материалы, гайды и чек-листы для инвесторов",
      link: "/methodology"
    },
    {
      icon: TrendingUp,
      title: "Аналитика рынка",
      description: "Еженедельные обзоры рынка апарт-отелей и инвестиционных возможностей",
      link: "#analytics"
    },
    {
      icon: Award,
      title: "Успешные кейсы",
      description: "Реальные истории инвесторов и их результаты",
      link: "#cases"
    },
    {
      icon: Target,
      title: "Инвестиционные стратегии",
      description: "Разбор различных подходов к инвестированию в доходную недвижимость",
      link: "#strategies"
    }
  ];

  const stats = [
    { value: "1000+", label: "Участников сообщества" },
    { value: "50+", label: "Проверенных объектов" },
    { value: "15%", label: "Средняя доходность" },
    { value: "24/7", label: "Поддержка инвесторов" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-semibold">ПРИСОЕДИНЯЙТЕСЬ К СООБЩЕСТВУ</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Сообщество инвесторов
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Общайтесь с единомышленниками, получайте экспертные советы и растите вместе с нами
            </p>
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
              >
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, idx) => (
            <AnimatedCard key={idx} delay={0.2 + idx * 0.05}>
              <Link href={feature.link} target={feature.link.startsWith('http') ? "_blank" : undefined}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </AnimatedCard>
          ))}
        </div>

        {/* CTA Section */}
        <FadeIn delay={0.4}>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Готовы присоединиться?
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Вступайте в наше сообщество инвесторов и получите доступ ко всем материалам,
                аналитике и поддержке опытных экспертов
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="https://t.me/apartguru_community" target="_blank">
                  <Button size="lg" className="min-w-[200px]">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Telegram-сообщество
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="min-w-[200px]">
                    Связаться с нами
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Additional Info */}
        <FadeIn delay={0.5}>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Что вы получите</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Доступ к закрытой аналитике рынка</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Консультации от опытных инвесторов</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Ранний доступ к новым объектам</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Обучающие вебинары и мастер-классы</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Networking с другими инвесторами</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Правила сообщества</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Уважительное общение</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Делитесь реальным опытом</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Запрещена реклама без согласования</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Проверяйте информацию перед инвестициями</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Помогайте новичкам</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
