"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { Calculator, Save, AlertCircle } from "lucide-react";

// ============================================
// БАЗА ДАННЫХ БЕНЧМАРКОВ
// ============================================
const APARTMENTS_DB = [
  { id: 101, city_code: 1, city: "Санкт-Петербург", name: "VALO Hotel City", class: "Business", price_m2: 280000, adr_low: 3800, adr_high: 7500, occ_avg: 0.82, uk_fee: 0.25, model: "Hybrid" },
  { id: 102, city_code: 1, city: "Санкт-Петербург", name: "YE'S Marata", class: "Comfort+", price_m2: 290000, adr_low: 3500, adr_high: 6500, occ_avg: 0.85, uk_fee: 0.20, model: "Hybrid" },
  { id: 103, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort", class: "Comfort", price_m2: 250000, adr_low: 2800, adr_high: 5500, occ_avg: 0.88, uk_fee: 0.25, model: "Short" },
  { id: 104, city_code: 1, city: "Санкт-Петербург", name: "Docklands", class: "Business", price_m2: 350000, adr_low: 4500, adr_high: 9000, occ_avg: 0.75, uk_fee: 0.25, model: "Hybrid" },
  { id: 105, city_code: 1, city: "Санкт-Петербург", name: "Avenue Apart", class: "Business", price_m2: 320000, adr_low: 4200, adr_high: 8500, occ_avg: 0.78, uk_fee: 0.20, model: "Hybrid" },
  { id: 106, city_code: 1, city: "Санкт-Петербург", name: "IN2IT", class: "Comfort", price_m2: 210000, adr_low: 2500, adr_high: 4500, occ_avg: 0.80, uk_fee: 0.15, model: "Hybrid" },
  { id: 110, city_code: 1, city: "Санкт-Петербург", name: "Well", class: "Business", price_m2: 380000, adr_low: 5000, adr_high: 9500, occ_avg: 0.70, uk_fee: 0.25, model: "Hybrid" },
  { id: 201, city_code: 2, city: "Москва", name: "YE'S Technopark", class: "Comfort+", price_m2: 380000, adr_low: 4200, adr_high: 5500, occ_avg: 0.85, uk_fee: 0.20, model: "Hybrid" },
  { id: 202, city_code: 2, city: "Москва", name: "YE'S Botanika", class: "Comfort+", price_m2: 360000, adr_low: 4000, adr_high: 5200, occ_avg: 0.82, uk_fee: 0.20, model: "Hybrid" },
  { id: 203, city_code: 2, city: "Москва", name: "Adagio Paveletskaya", class: "Business", price_m2: 450000, adr_low: 7000, adr_high: 10000, occ_avg: 0.75, uk_fee: 0.25, model: "Short" },
  { id: 205, city_code: 2, city: "Москва", name: "Neva Towers", class: "Premium", price_m2: 950000, adr_low: 18000, adr_high: 25000, occ_avg: 0.65, uk_fee: 0.20, model: "Long/Short" },
  { id: 301, city_code: 3, city: "Сочи", name: "Adagio Le Rond", class: "Premium", price_m2: 700000, adr_low: 8000, adr_high: 22000, occ_avg: 0.65, uk_fee: 0.30, model: "Short" },
  { id: 302, city_code: 3, city: "Сочи", name: "Mantera Seaview", class: "Deluxe", price_m2: 3500000, adr_low: 45000, adr_high: 120000, occ_avg: 0.50, uk_fee: 0.40, model: "Short" },
  { id: 303, city_code: 3, city: "Сочи", name: "Monet", class: "Premium", price_m2: 900000, adr_low: 10000, adr_high: 28000, occ_avg: 0.70, uk_fee: 0.30, model: "Short" },
  { id: 401, city_code: 4, city: "Калининград", name: "Baden-Baden", class: "Comfort+", price_m2: 290000, adr_low: 5000, adr_high: 12000, occ_avg: 0.85, uk_fee: 0.25, model: "Short" },
  { id: 402, city_code: 4, city: "Калининград", name: "Atlantis", class: "Premium", price_m2: 350000, adr_low: 6000, adr_high: 14000, occ_avg: 0.75, uk_fee: 0.25, model: "Short" },
  { id: 501, city_code: 5, city: "Казань", name: "Savin House", class: "Business", price_m2: 280000, adr_low: 4500, adr_high: 7500, occ_avg: 0.80, uk_fee: 0.15, model: "Hybrid" }
];

// Уникальные города и классы
const CITIES = Array.from(new Set(APARTMENTS_DB.map(a => a.city)));
const CLASSES = ["Comfort", "Comfort+", "Business", "Premium", "Deluxe"];

// Константа: эксплуатационные расходы (₽/м² в месяц)
const EXPLOITATION_COST_PER_M2 = 200;

interface CalculatorInputs {
  city: string;
  propertyClass: string;
  area: number;
  budget: number;
}

interface NOIResult {
  grossRevenue: number; // Валовый доход (год)
  ukFee: number; // Комиссия УК (год)
  exploitationCost: number; // Эксплуатация (год)
  netIncome: number; // Чистый доход (год)
  paybackYears: number; // Окупаемость (лет)
  roi: number; // ROI (%)
  adr: number; // ADR использованный
  occupancy: number; // Загрузка использованная
}

interface CompSetInfo {
  apartments: typeof APARTMENTS_DB;
  avgAdrLow: number;
  avgAdrHigh: number;
  avgOccupancy: number;
  avgUkFee: number;
  usedNeighborClass: boolean;
}

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    city: "Санкт-Петербург",
    propertyClass: "Business",
    area: 40,
    budget: 5000000,
  });

  // ============================================
  // ФОРМИРОВАНИЕ COMPSET (конкурентная группа)
  // ============================================
  const compSet: CompSetInfo = useMemo(() => {
    // 1. Фильтруем по городу
    const cityApartments = APARTMENTS_DB.filter(a => a.city === inputs.city);

    // 2. Пытаемся найти по точному классу
    let filteredApartments = cityApartments.filter(a => a.class === inputs.propertyClass);
    let usedNeighborClass = false;

    // 3. Если не нашли - берем все классы в городе
    if (filteredApartments.length === 0) {
      filteredApartments = cityApartments;
      usedNeighborClass = true;
    }

    // 4. Считаем средние значения
    const avgAdrLow = filteredApartments.reduce((sum, a) => sum + a.adr_low, 0) / filteredApartments.length || 0;
    const avgAdrHigh = filteredApartments.reduce((sum, a) => sum + a.adr_high, 0) / filteredApartments.length || 0;
    const avgOccupancy = filteredApartments.reduce((sum, a) => sum + a.occ_avg, 0) / filteredApartments.length || 0;
    const avgUkFee = filteredApartments.reduce((sum, a) => sum + a.uk_fee, 0) / filteredApartments.length || 0;

    return {
      apartments: filteredApartments,
      avgAdrLow,
      avgAdrHigh,
      avgOccupancy,
      avgUkFee,
      usedNeighborClass,
    };
  }, [inputs.city, inputs.propertyClass]);

  // ============================================
  // РАСЧЕТ СЦЕНАРИЕВ
  // ============================================
  const calculateScenario = (
    adr: number,
    occupancy: number
  ): NOIResult => {
    // Gross Revenue = ADR * Occupancy * 365
    const grossRevenue = adr * occupancy * 365;

    // UK Fee (комиссия УК)
    const ukFee = grossRevenue * compSet.avgUkFee;

    // Эксплуатация: 200₽/м² в месяц * 12 месяцев
    const exploitationCost = EXPLOITATION_COST_PER_M2 * inputs.area * 12;

    // Net Income = Gross Revenue - UK Fee - Эксплуатация
    const netIncome = grossRevenue - ukFee - exploitationCost;

    // Окупаемость (лет) = Бюджет / Чистый доход
    const paybackYears = inputs.budget / netIncome;

    // ROI (%) = Чистый доход / Бюджет * 100
    const roi = (netIncome / inputs.budget) * 100;

    return {
      grossRevenue,
      ukFee,
      exploitationCost,
      netIncome,
      paybackYears,
      roi,
      adr,
      occupancy,
    };
  };

  // Три сценария:
  // Пессимист: adr_low, occupancy * 0.85
  const pessimisticResult = useMemo(() => {
    return calculateScenario(
      compSet.avgAdrLow,
      compSet.avgOccupancy * 0.85
    );
  }, [compSet, inputs.area, inputs.budget]);

  // Реалист: среднее между High и Low, occupancy средняя
  const realisticResult = useMemo(() => {
    const avgAdr = (compSet.avgAdrLow + compSet.avgAdrHigh) / 2;
    return calculateScenario(
      avgAdr,
      compSet.avgOccupancy
    );
  }, [compSet, inputs.area, inputs.budget]);

  // Оптимист: adr_high * 0.9, occupancy * 1.1
  const optimisticResult = useMemo(() => {
    return calculateScenario(
      compSet.avgAdrHigh * 0.9,
      Math.min(1, compSet.avgOccupancy * 1.1)
    );
  }, [compSet, inputs.area, inputs.budget]);

  const handleInputChange = (field: keyof CalculatorInputs, value: string | number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const savedData = {
      inputs,
      result: realisticResult,
      compSet: compSet.apartments.map(a => a.name),
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("calculator-last-calc", JSON.stringify(savedData));
    alert("Расчёт сохранён в локальное хранилище");
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Калькулятор доходности</h1>
        <p className="text-muted-foreground">
          Расчёт на основе реальных рыночных данных (Benchmarking)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Параметры вашего объекта</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Base Params */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Город</Label>
                  <Select
                    value={inputs.city}
                    onValueChange={(value) => handleInputChange("city", value)}
                  >
                    <SelectTrigger id="city">
                      <SelectValue placeholder="Выберите город" />
                    </SelectTrigger>
                    <SelectContent>
                      {CITIES.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="propertyClass">Класс объекта</Label>
                  <Select
                    value={inputs.propertyClass}
                    onValueChange={(value) => handleInputChange("propertyClass", value)}
                  >
                    <SelectTrigger id="propertyClass">
                      <SelectValue placeholder="Выберите класс" />
                    </SelectTrigger>
                    <SelectContent>
                      {CLASSES.map((cls) => (
                        <SelectItem key={cls} value={cls}>
                          {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="area">Площадь, м²</Label>
                  <Input
                    id="area"
                    type="number"
                    value={inputs.area}
                    onChange={(e) =>
                      handleInputChange("area", Number(e.target.value))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="budget">Бюджет (стоимость), ₽</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={inputs.budget}
                    onChange={(e) =>
                      handleInputChange("budget", Number(e.target.value))
                    }
                  />
                </div>
              </div>
            </div>

            {/* CompSet Info */}
            {compSet.apartments.length > 0 && (
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg border">
                <div className="flex items-start gap-2">
                  <Calculator className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <p className="font-semibold text-sm">
                      Мы сравниваем ваш объект с:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {compSet.apartments.map((apt) => (
                        <span
                          key={apt.id}
                          className="text-xs px-2 py-1 bg-background rounded border"
                        >
                          {apt.name}
                        </span>
                      ))}
                    </div>

                    {compSet.usedNeighborClass && (
                      <div className="flex items-start gap-2 mt-3 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded">
                        <AlertCircle className="h-4 w-4 mt-0.5 text-yellow-600 flex-shrink-0" />
                        <p className="text-xs text-yellow-700 dark:text-yellow-500">
                          В выбранном городе нет объектов класса &quot;{inputs.propertyClass}&quot;.
                          Используем данные по всем классам в городе.
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                      <div>
                        <span className="text-muted-foreground">Средняя загрузка:</span>
                        <span className="ml-1 font-mono tabular-nums font-semibold">
                          {formatPercent(compSet.avgOccupancy * 100)}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Средняя комиссия УК:</span>
                        <span className="ml-1 font-mono tabular-nums font-semibold">
                          {formatPercent(compSet.avgUkFee * 100)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Button onClick={handleSave} variant="outline" className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Сохранить расчёт
            </Button>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Реалистичный сценарий</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Чистый доход (год)</p>
                <p className="text-2xl font-bold font-mono tabular-nums text-primary">
                  {formatCurrency(realisticResult.netIncome)}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Окупаемость</p>
                <p className="text-xl font-bold font-mono tabular-nums">
                  {formatNumber(realisticResult.paybackYears, 1)} лет
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">ROI</p>
                <p className="text-xl font-bold font-mono tabular-nums">
                  {formatPercent(realisticResult.roi)}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">ADR / Загрузка</p>
                <p className="text-lg font-mono tabular-nums">
                  {formatCurrency(realisticResult.adr)} / {formatPercent(realisticResult.occupancy * 100)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Разбивка расходов</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Валовый доход</span>
                <span className="font-mono tabular-nums">
                  {formatCurrency(realisticResult.grossRevenue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Комиссия УК ({formatPercent(compSet.avgUkFee * 100)})</span>
                <span className="font-mono tabular-nums text-destructive">
                  -{formatCurrency(realisticResult.ukFee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Эксплуатация ({EXPLOITATION_COST_PER_M2}₽/м²/мес)</span>
                <span className="font-mono tabular-nums text-destructive">
                  -{formatCurrency(realisticResult.exploitationCost)}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Чистый доход</span>
                <span className="font-mono tabular-nums text-primary">
                  {formatCurrency(realisticResult.netIncome)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle>Сценарии развития</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Пессимистичный */}
            <div className="space-y-3 p-4 border rounded-lg bg-red-500/5 border-red-500/20">
              <h3 className="font-semibold text-red-600 dark:text-red-500">
                Пессимистичный
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">ADR</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatCurrency(pessimisticResult.adr)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Загрузка</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatPercent(pessimisticResult.occupancy * 100)}
                  </p>
                </div>
                <div className="border-t pt-2">
                  <p className="text-xs text-muted-foreground">Чистый доход/год</p>
                  <p className="font-mono tabular-nums font-bold text-base">
                    {formatCurrency(pessimisticResult.netIncome)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Окупаемость</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatNumber(pessimisticResult.paybackYears, 1)} лет
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">ROI</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatPercent(pessimisticResult.roi)}
                  </p>
                </div>
              </div>
            </div>

            {/* Реалистичный */}
            <div className="space-y-3 p-4 border rounded-lg bg-primary/5 border-primary/20">
              <h3 className="font-semibold text-primary">
                Реалистичный
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">ADR</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatCurrency(realisticResult.adr)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Загрузка</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatPercent(realisticResult.occupancy * 100)}
                  </p>
                </div>
                <div className="border-t pt-2">
                  <p className="text-xs text-muted-foreground">Чистый доход/год</p>
                  <p className="font-mono tabular-nums font-bold text-base">
                    {formatCurrency(realisticResult.netIncome)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Окупаемость</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatNumber(realisticResult.paybackYears, 1)} лет
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">ROI</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatPercent(realisticResult.roi)}
                  </p>
                </div>
              </div>
            </div>

            {/* Оптимистичный */}
            <div className="space-y-3 p-4 border rounded-lg bg-green-500/5 border-green-500/20">
              <h3 className="font-semibold text-green-600 dark:text-green-500">
                Оптимистичный
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">ADR</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatCurrency(optimisticResult.adr)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Загрузка</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatPercent(optimisticResult.occupancy * 100)}
                  </p>
                </div>
                <div className="border-t pt-2">
                  <p className="text-xs text-muted-foreground">Чистый доход/год</p>
                  <p className="font-mono tabular-nums font-bold text-base">
                    {formatCurrency(optimisticResult.netIncome)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Окупаемость</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatNumber(optimisticResult.paybackYears, 1)} лет
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">ROI</p>
                  <p className="font-mono tabular-nums font-semibold">
                    {formatPercent(optimisticResult.roi)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg border text-sm space-y-2">
            <p className="font-semibold">Описание сценариев:</p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>
                <strong className="text-red-600 dark:text-red-500">Пессимистичный:</strong>{" "}
                ADR = низкий сезон, загрузка -15%
              </li>
              <li>
                <strong className="text-primary">Реалистичный:</strong>{" "}
                ADR = среднее между высоким и низким сезоном, средняя загрузка
              </li>
              <li>
                <strong className="text-green-600 dark:text-green-500">Оптимистичный:</strong>{" "}
                ADR = высокий сезон × 0.9 (с учётом скидок), загрузка +10%
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
