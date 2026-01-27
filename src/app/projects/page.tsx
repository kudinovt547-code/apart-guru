"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, ArrowRight, Database } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="inline-block"
              >
                <Database className="h-24 w-24 mx-auto mb-6 text-primary" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Каталог в разработке
              </h1>
              <p className="text-xl text-muted-foreground">
                Мы формируем полную базу данных апарт-отелей России
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Что будет в каталоге:</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Полная база строящихся и готовых апарт-отелей</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Реальные показатели доходности и загрузки</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Прогнозная аналитика для новостроек</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Детальные карточки с фото и описаниями</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Фильтры по городам, классам и доходности</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-semibold mb-2">А пока:</h3>
                    <p className="text-muted-foreground mb-4">
                      Используйте наш калькулятор для расчёта доходности вашего объекта
                      на основе рыночных данных по 86 апартаментам.
                    </p>
                    <Link href="/calculator">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button size="lg" className="w-full">
                          Открыть калькулятор
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Хотите добавить свой проект в базу?{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Свяжитесь с нами
                </Link>
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
