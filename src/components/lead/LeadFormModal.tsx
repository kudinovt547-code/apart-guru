"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export interface LeadFormData {
  // Обязательные поля
  contact: string;           // Telegram @username или телефон
  city: string;              // СПб / Москва / другое
  budget: number;            // Бюджет
  downPayment: number;       // Первоначальный взнос
  goal: string;              // макс доход / рост цены / гибрид
  horizon: string;           // 1-3 / 3-5 / 5+ лет

  // Опциональные поля
  risk?: string;             // низкий / средний / высокий
  mortgageNeeded?: boolean;  // Рассрочка/ипотека
  selectedProjectIds?: string[]; // ID выбранных проектов
  calculatorInputs?: any;    // Данные из калькулятора
  sourcePage?: string;       // Откуда пришел лид
  utm?: any;                 // UTM метки
}

interface LeadFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultProjectId?: string;
  defaultCalculatorInputs?: any;
  sourcePage?: string;
}

export function LeadFormModal({
  open,
  onOpenChange,
  defaultProjectId,
  defaultCalculatorInputs,
  sourcePage = "unknown"
}: LeadFormModalProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    contact: "",
    city: "",
    budget: 0,
    downPayment: 0,
    goal: "",
    horizon: "",
    risk: "средний",
    mortgageNeeded: false,
    selectedProjectIds: defaultProjectId ? [defaultProjectId] : [],
    calculatorInputs: defaultCalculatorInputs,
    sourcePage,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Валидация
      if (!formData.contact.trim()) {
        throw new Error("Укажите Telegram или телефон");
      }
      if (!formData.city) {
        throw new Error("Выберите город");
      }
      if (!formData.budget || formData.budget <= 0) {
        throw new Error("Укажите бюджет");
      }
      if (!formData.downPayment || formData.downPayment < 0) {
        throw new Error("Укажите первоначальный взнос");
      }
      if (!formData.goal) {
        throw new Error("Выберите цель");
      }
      if (!formData.horizon) {
        throw new Error("Выберите горизонт");
      }

      // Отправка на API
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Ошибка отправки");
      }

      setSuccess(true);

      // Событие аналитики
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "lead_submit", {
          event_category: "Lead",
          event_label: sourcePage,
          value: formData.budget,
        });
      }

      // Закрыть модал через 3 секунды
      setTimeout(() => {
        onOpenChange(false);
        setSuccess(false);
        // Сброс формы
        setFormData({
          contact: "",
          city: "",
          budget: 0,
          downPayment: 0,
          goal: "",
          horizon: "",
          risk: "средний",
          mortgageNeeded: false,
          selectedProjectIds: defaultProjectId ? [defaultProjectId] : [],
          calculatorInputs: defaultCalculatorInputs,
          sourcePage,
        });
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  // Событие открытия формы
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "lead_open", {
        event_category: "Lead",
        event_label: sourcePage,
      });
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {success ? (
          // Success Screen
          <div className="py-12 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <DialogTitle className="text-2xl font-bold mb-2">
              Заявка принята!
            </DialogTitle>
            <DialogDescription className="text-base">
              Я напишу в Telegram и пришлю shortlist в течение 24 часов.
            </DialogDescription>
          </div>
        ) : (
          // Form
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Получить shortlist
              </DialogTitle>
              <DialogDescription>
                Заполните анкету — я подберу 3–5 вариантов под вашу цель и математику
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              {/* Контакт */}
              <div>
                <Label htmlFor="contact" className="text-base font-semibold">
                  Telegram или телефон <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contact"
                  type="text"
                  placeholder="@username или +7 999 123-45-67"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="mt-2"
                  required
                />
              </div>

              {/* Город */}
              <div>
                <Label htmlFor="city" className="text-base font-semibold">
                  Город <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) => setFormData({ ...formData, city: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Санкт-Петербург">Санкт-Петербург</SelectItem>
                    <SelectItem value="Москва">Москва</SelectItem>
                    <SelectItem value="Сочи">Сочи</SelectItem>
                    <SelectItem value="Казань">Казань</SelectItem>
                    <SelectItem value="Другой">Другой город</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Бюджет */}
              <div>
                <Label htmlFor="budget" className="text-base font-semibold">
                  Бюджет, ₽ <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="Например: 5000000"
                  value={formData.budget || ""}
                  onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || 0 })}
                  className="mt-2"
                  min={0}
                  step={100000}
                  required
                />
              </div>

              {/* Первоначальный взнос */}
              <div>
                <Label htmlFor="downPayment" className="text-base font-semibold">
                  Первоначальный взнос, ₽ <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="downPayment"
                  type="number"
                  placeholder="Например: 1500000"
                  value={formData.downPayment || ""}
                  onChange={(e) => setFormData({ ...formData, downPayment: parseInt(e.target.value) || 0 })}
                  className="mt-2"
                  min={0}
                  step={100000}
                  required
                />
              </div>

              {/* Цель */}
              <div>
                <Label className="text-base font-semibold">
                  Цель инвестиций <span className="text-destructive">*</span>
                </Label>
                <RadioGroup
                  value={formData.goal}
                  onValueChange={(value) => setFormData({ ...formData, goal: value })}
                  className="mt-3 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="макс доход" id="goal-income" />
                    <Label htmlFor="goal-income" className="font-normal cursor-pointer">
                      Максимальный доход (приоритет — кешфлоу)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="рост цены" id="goal-growth" />
                    <Label htmlFor="goal-growth" className="font-normal cursor-pointer">
                      Рост цены (приоритет — апресиация актива)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="гибрид" id="goal-hybrid" />
                    <Label htmlFor="goal-hybrid" className="font-normal cursor-pointer">
                      Гибрид (доход + рост)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Горизонт */}
              <div>
                <Label className="text-base font-semibold">
                  Горизонт инвестиций <span className="text-destructive">*</span>
                </Label>
                <RadioGroup
                  value={formData.horizon}
                  onValueChange={(value) => setFormData({ ...formData, horizon: value })}
                  className="mt-3 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-3 года" id="horizon-short" />
                    <Label htmlFor="horizon-short" className="font-normal cursor-pointer">
                      1–3 года
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3-5 лет" id="horizon-medium" />
                    <Label htmlFor="horizon-medium" className="font-normal cursor-pointer">
                      3–5 лет
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5+ лет" id="horizon-long" />
                    <Label htmlFor="horizon-long" className="font-normal cursor-pointer">
                      5+ лет
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Риск (опционально) */}
              <div>
                <Label className="text-base font-semibold">
                  Приемлемый риск
                </Label>
                <RadioGroup
                  value={formData.risk}
                  onValueChange={(value) => setFormData({ ...formData, risk: value })}
                  className="mt-3 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="низкий" id="risk-low" />
                    <Label htmlFor="risk-low" className="font-normal cursor-pointer">
                      Низкий (работающие объекты, стабильность)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="средний" id="risk-medium" />
                    <Label htmlFor="risk-medium" className="font-normal cursor-pointer">
                      Средний (сбалансированный подход)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="высокий" id="risk-high" />
                    <Label htmlFor="risk-high" className="font-normal cursor-pointer">
                      Высокий (новые проекты, макс. потенциал)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Рассрочка/ипотека */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="mortgage"
                  checked={formData.mortgageNeeded}
                  onChange={(e) =>
                    setFormData({ ...formData, mortgageNeeded: e.target.checked })
                  }
                />
                <Label htmlFor="mortgage" className="font-normal cursor-pointer">
                  Интересует рассрочка или ипотека
                </Label>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full text-base"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Получить shortlist
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
