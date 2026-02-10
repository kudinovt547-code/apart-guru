"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { LeadFormData } from "./LeadFormModal";

export function InlineLeadForm() {
  const [formData, setFormData] = useState<Partial<LeadFormData>>({
    contact: "",
    city: "",
    budget: 0,
    goal: "",
    horizon: "",
    sourcePage: "homepage-hero",
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
      if (!formData.contact?.trim()) throw new Error("Укажите Telegram или телефон");
      if (!formData.city) throw new Error("Выберите город");
      if (!formData.budget || formData.budget <= 0) throw new Error("Укажите бюджет");
      if (!formData.goal) throw new Error("Выберите цель");
      if (!formData.horizon) throw new Error("Выберите горизонт");

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          event_label: "homepage-hero",
          value: formData.budget,
        });
      }
    } catch (err: any) {
      setError(err.message || "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Заявка принята!</h3>
        <p className="text-muted-foreground">
          Мы напишем в Telegram и пришлём shortlist в течение 24 часов.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card/50 backdrop-blur-sm border-2 border-primary/20 rounded-2xl p-6 md:p-8 shadow-xl">
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Город */}
        <div>
          <Label htmlFor="city" className="text-sm font-semibold mb-2 block">
            Город <span className="text-destructive">*</span>
          </Label>
          <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Санкт-Петербург">Санкт-Петербург</SelectItem>
              <SelectItem value="Москва">Москва</SelectItem>
              <SelectItem value="Сочи">Сочи</SelectItem>
              <SelectItem value="Казань">Казань</SelectItem>
              <SelectItem value="Другой">Другой</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Бюджет */}
        <div>
          <Label htmlFor="budget" className="text-sm font-semibold mb-2 block">
            Бюджет, ₽ <span className="text-destructive">*</span>
          </Label>
          <Input
            id="budget"
            type="number"
            placeholder="5 000 000"
            value={formData.budget || ""}
            onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || 0 })}
            min={0}
            step={100000}
          />
        </div>

        {/* Контакт */}
        <div>
          <Label htmlFor="contact" className="text-sm font-semibold mb-2 block">
            Telegram или телефон <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contact"
            type="text"
            placeholder="@username или +7 999..."
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          />
        </div>
      </div>

      {/* Цель */}
      <div className="mb-4">
        <Label className="text-sm font-semibold mb-2 block">
          Цель <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={formData.goal}
          onValueChange={(value) => setFormData({ ...formData, goal: value })}
          className="flex flex-col md:flex-row gap-3"
        >
          <div className="flex items-center space-x-2 flex-1">
            <RadioGroupItem value="макс доход" id="goal-income-inline" />
            <Label htmlFor="goal-income-inline" className="font-normal cursor-pointer text-sm">
              Макс доход
            </Label>
          </div>
          <div className="flex items-center space-x-2 flex-1">
            <RadioGroupItem value="рост цены" id="goal-growth-inline" />
            <Label htmlFor="goal-growth-inline" className="font-normal cursor-pointer text-sm">
              Рост цены
            </Label>
          </div>
          <div className="flex items-center space-x-2 flex-1">
            <RadioGroupItem value="гибрид" id="goal-hybrid-inline" />
            <Label htmlFor="goal-hybrid-inline" className="font-normal cursor-pointer text-sm">
              Гибрид
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Горизонт */}
      <div className="mb-4">
        <Label className="text-sm font-semibold mb-2 block">
          Горизонт <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={formData.horizon}
          onValueChange={(value) => setFormData({ ...formData, horizon: value })}
          className="flex flex-col md:flex-row gap-3"
        >
          <div className="flex items-center space-x-2 flex-1">
            <RadioGroupItem value="1-3 года" id="horizon-short-inline" />
            <Label htmlFor="horizon-short-inline" className="font-normal cursor-pointer text-sm">
              1–3 года
            </Label>
          </div>
          <div className="flex items-center space-x-2 flex-1">
            <RadioGroupItem value="3-5 лет" id="horizon-medium-inline" />
            <Label htmlFor="horizon-medium-inline" className="font-normal cursor-pointer text-sm">
              3–5 лет
            </Label>
          </div>
          <div className="flex items-center space-x-2 flex-1">
            <RadioGroupItem value="5+ лет" id="horizon-long-inline" />
            <Label htmlFor="horizon-long-inline" className="font-normal cursor-pointer text-sm">
              5+ лет
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Submit */}
      <Button type="submit" size="lg" className="w-full text-base" disabled={loading}>
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

      <p className="text-xs text-muted-foreground text-center mt-3">
        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
      </p>
    </form>
  );
}
