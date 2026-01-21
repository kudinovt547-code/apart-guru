"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RiskLevel } from "@/types/project";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    budget: "",
    city: "",
    riskProfile: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          data: formData,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: "",
            contact: "",
            budget: "",
            city: "",
            riskProfile: "",
            message: "",
          });
        }, 3000);
      } else {
        alert('Ошибка отправки. Попробуйте позже или свяжитесь через Telegram.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Ошибка отправки. Попробуйте позже или свяжитесь через Telegram.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="text-primary text-6xl mb-4">✓</div>
          <h1 className="text-4xl font-bold">Заявка отправлена!</h1>
          <p className="text-muted-foreground">
            Мы свяжемся с вами в течение 24 часов
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold">Свяжитесь с нами</h1>
          <p className="text-muted-foreground">
            Оставьте заявку, и мы подберём оптимальные проекты под ваши цели
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Заявка на подбор</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Иван Иванов"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contact">Telegram или телефон *</Label>
                  <Input
                    id="contact"
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData({ ...formData, contact: e.target.value })
                    }
                    placeholder="@username или +7 900 123-45-67"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="budget">Бюджет инвестиции</Label>
                  <Select
                    id="budget"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                  >
                    <option value="">Выберите диапазон</option>
                    <option value="3-5">3-5 млн ₽</option>
                    <option value="5-8">5-8 млн ₽</option>
                    <option value="8-12">8-12 млн ₽</option>
                    <option value="12-20">12-20 млн ₽</option>
                    <option value="20+">20+ млн ₽</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="city">Интересующие города/страны</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder="Например: Сочи, Тбилиси, Батуми"
                  />
                </div>

                <div>
                  <Label htmlFor="riskProfile">Риск-профиль</Label>
                  <Select
                    id="riskProfile"
                    value={formData.riskProfile}
                    onChange={(e) =>
                      setFormData({ ...formData, riskProfile: e.target.value })
                    }
                  >
                    <option value="">Выберите профиль</option>
                    <option value={RiskLevel.LOW}>
                      Консервативный (стабильность важнее доходности)
                    </option>
                    <option value={RiskLevel.MEDIUM}>
                      Умеренный (баланс риска и доходности)
                    </option>
                    <option value={RiskLevel.HIGH}>
                      Агрессивный (готов к рискам ради высокой доходности)
                    </option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Дополнительная информация</Label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Расскажите о ваших целях, предпочтениях, опыте инвестиций..."
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Отправка..." : "Отправить заявку"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Отправляя форму, вы соглашаетесь на обработку персональных данных
              </p>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Другие способы связи</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-1">Telegram</p>
              <p className="text-sm text-muted-foreground">@apartguru_support</p>
            </div>

            <div>
              <p className="font-semibold mb-1">Email</p>
              <p className="text-sm text-muted-foreground">info@apartguru.ru</p>
            </div>

            <div>
              <p className="font-semibold mb-1">Время работы</p>
              <p className="text-sm text-muted-foreground">
                Пн-Пт: 10:00 - 19:00 (МСК)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
