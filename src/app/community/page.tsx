"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageCircle,
  HeadphonesIcon,
  Handshake,
  Sparkles
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-semibold">ПРИСОЕДИНЯЙТЕСЬ К СООБЩЕСТВУ</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Сообщество инвесторов Apart Guru
            </h1>
            <p className="text-xl text-muted-foreground">
              Общайтесь с единомышленниками, делитесь опытом и принимайте решения на основе реальных данных
            </p>
          </div>
        </FadeIn>

        {/* Main Actions - Simplified */}
        <div className="grid gap-6 mb-12">
          {/* Telegram Group for Investors */}
          <FadeIn delay={0.1}>
            <Link href="https://t.me/apartdotpro" target="_blank">
              <Card className="hover:border-primary/50 transition-all cursor-pointer group hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                        Группа для инвесторов
                      </CardTitle>
                      <p className="text-muted-foreground">
                        Обсуждение объектов, обмен опытом, реальные кейсы от участников сообщества
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button size="lg" className="w-full">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Присоединиться к Telegram
                  </Button>
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground font-semibold mb-2">Что внутри:</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Реальные истории инвесторов и их доходность</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Обсуждение управляющих компаний (кому доверять, кого избегать)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Ранний доступ к новым объектам в базе</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Помощь с анализом инвестиций от опытных участников</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </FadeIn>

          {/* Support */}
          <FadeIn delay={0.2}>
            <Link href="/contact">
              <Card className="hover:border-primary/50 transition-all cursor-pointer group hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-success/10 rounded-xl group-hover:bg-success/20 transition-colors">
                      <HeadphonesIcon className="h-8 w-8 text-success" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-2 group-hover:text-success transition-colors">
                        Поддержка
                      </CardTitle>
                      <p className="text-muted-foreground">
                        Нужна помощь с подбором, анализом или проверкой объекта? Мы на связи
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button size="lg" variant="outline" className="w-full group-hover:border-success group-hover:text-success">
                    <HeadphonesIcon className="mr-2 h-5 w-5" />
                    Связаться с поддержкой
                  </Button>
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground font-semibold mb-2">Мы поможем:</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <span className="text-success mr-2">•</span>
                        <span>Подобрать 2-5 объектов под ваш бюджет и риск-профиль</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-success mr-2">•</span>
                        <span>Проверить управляющую компанию и реальность показателей</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-success mr-2">•</span>
                        <span>Сопровождение сделки и контроль выплат первые 6 месяцев</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </FadeIn>

          {/* Collaboration */}
          <FadeIn delay={0.3}>
            <Link href="/partnership">
              <Card className="hover:border-accent/50 transition-all cursor-pointer group hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
                      <Handshake className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-2 group-hover:text-accent transition-colors">
                        Сотрудничество
                      </CardTitle>
                      <p className="text-muted-foreground">
                        Застройщик, УК или площадка? Давайте работать вместе
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button size="lg" variant="outline" className="w-full group-hover:border-accent group-hover:text-accent">
                    <Handshake className="mr-2 h-5 w-5" />
                    Предложить сотрудничество
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </FadeIn>
        </div>

        {/* Community Stats */}
        <FadeIn delay={0.4}>
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">54</div>
                  <div className="text-sm text-muted-foreground">Объектов в базе</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">9</div>
                  <div className="text-sm text-muted-foreground">Городов</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">2.7к</div>
                  <div className="text-sm text-muted-foreground">₽/м² средняя доходность</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-sm text-muted-foreground">Поддержка</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
