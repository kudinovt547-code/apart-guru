"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Handshake,
  Building2,
  Users,
  TrendingUp,
  Target,
  CheckCircle2,
  Mail,
  Phone
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCard } from "@/components/ui/animated-card";
import { useState } from "react";

export default function PartnershipPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    partnershipType: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Send to backend/telegram
    console.log("Partnership request:", formData);

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const partnershipTypes = [
    {
      icon: Building2,
      title: "Застройщики",
      description: "Добавим ваш объект в базу, проведём аудит показателей и привлечём инвесторов",
      benefits: [
        "Размещение в базе 54+ объектов",
        "Аудит реальной доходности",
        "Привлечение целевых инвесторов",
        "Прозрачность для покупателей"
      ]
    },
    {
      icon: Users,
      title: "Управляющие компании",
      description: "Покажем ваши реальные результаты инвесторам, которые ищут надёжное управление",
      benefits: [
        "Демонстрация track record",
        "Реальная статистика выплат",
        "Привлечение новых инвесторов",
        "Репутация надёжной УК"
      ]
    },
    {
      icon: TrendingUp,
      title: "Инвестиционные платформы",
      description: "Интеграция данных, совместные аналитические продукты и кросс-промо",
      benefits: [
        "Обмен данными и аналитикой",
        "Совместные исследования",
        "Кросс-промоция аудиторий",
        "API интеграция"
      ]
    },
    {
      icon: Target,
      title: "Агентства и брокеры",
      description: "Доступ к проверенной базе объектов для ваших клиентов с партнёрским вознаграждением",
      benefits: [
        "База проверенных объектов",
        "Партнёрская комиссия",
        "Инструменты для клиентов",
        "Поддержка сделок"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
              <Handshake className="h-5 w-5" />
              <span className="text-sm font-semibold">ПАРТНЁРСТВО</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Сотрудничество с Apart Guru
            </h1>
            <p className="text-xl text-muted-foreground">
              Мы работаем с застройщиками, управляющими компаниями, платформами и агентствами,
              чтобы создавать прозрачный рынок инвестиций в недвижимость
            </p>
          </div>
        </FadeIn>

        {/* Partnership Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-6xl mx-auto">
          {partnershipTypes.map((type, idx) => (
            <AnimatedCard key={idx} delay={0.1 + idx * 0.05}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <type.icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground">
                    {type.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold mb-2">Что вы получите:</p>
                  <ul className="space-y-2">
                    {type.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <CheckCircle2 className="h-4 w-4 text-accent mr-2 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </div>

        {/* Why Partner With Us */}
        <FadeIn delay={0.3}>
          <Card className="mb-12 max-w-4xl mx-auto bg-gradient-to-br from-accent/5 to-background">
            <CardHeader>
              <CardTitle className="text-2xl">Почему с нами выгодно работать</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    Качественная аудитория
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Инвесторы с бюджетом от 5 млн ₽</li>
                    <li>• Фокус на долгосрочные инвестиции</li>
                    <li>• Понимание рисков и доходности</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-accent" />
                    Прозрачность данных
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Проверяем все показатели</li>
                    <li>• Открытая методология расчётов</li>
                    <li>• Реальные отзывы инвесторов</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-accent" />
                    Активное сообщество
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Telegram группа инвесторов</li>
                    <li>• Обмен опытом и кейсами</li>
                    <li>• Постоянная обратная связь</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-accent" />
                    База 54+ объектов
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 9 городов России</li>
                    <li>• Реальные метрики доходности</li>
                    <li>• Постоянное пополнение базы</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Contact Form */}
        <FadeIn delay={0.4}>
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Оставьте заявку на сотрудничество</CardTitle>
              <p className="text-muted-foreground">
                Заполните форму, и мы свяжемся с вами в течение 24 часов
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Ваше имя *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Иван Иванов"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Компания *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="ООО Застройщик"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ivan@company.ru"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="partnershipType">Тип сотрудничества *</Label>
                  <select
                    id="partnershipType"
                    value={formData.partnershipType}
                    onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    required
                  >
                    <option value="">Выберите...</option>
                    <option value="developer">Застройщик</option>
                    <option value="management">Управляющая компания</option>
                    <option value="platform">Инвестиционная платформа</option>
                    <option value="broker">Агентство/Брокер</option>
                    <option value="other">Другое</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="message">Сообщение *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Расскажите о вашем предложении..."
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={submitted}>
                  {submitted ? (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Заявка отправлена!
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-5 w-5" />
                      Отправить заявку
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-3">Или свяжитесь напрямую:</p>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href="mailto:partnership@apart-guru.ru" className="text-primary hover:underline">
                      partnership@apart-guru.ru
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href="https://t.me/Timofeykudinov" target="_blank" className="text-primary hover:underline">
                      Telegram: @Timofeykudinov
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
