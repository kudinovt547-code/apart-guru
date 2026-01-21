"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { Calculator, TrendingUp, AlertTriangle } from "lucide-react";
import { Project } from "@/types/project";

interface ForecastInputs {
  adr: number;
  occupancy: number;
  managementFee: number;
  utilities: number;
  supplies: number;
  repairFund: number;
  taxes: number;
  marketing: number;
}

interface ForecastResult {
  monthlyRevenue: number;
  yearlyRevenue: number;
  totalExpenses: number;
  noiMonth: number;
  noiYear: number;
  noiMargin: number;
  paybackYears: number;
  revPerM2Month: number;
}

interface ConstructionForecastProps {
  project: Project;
}

export default function ConstructionForecast({ project }: ConstructionForecastProps) {
  const [inputs, setInputs] = useState<ForecastInputs>({
    adr: 3000,
    occupancy: 75,
    managementFee: 15,
    utilities: 5000,
    supplies: 2000,
    repairFund: 3,
    taxes: 6,
    marketing: 1000,
  });

  const calculateForecast = (forecastInputs: ForecastInputs): ForecastResult => {
    const daysInMonth = 30;
    const monthlyRevenue =
      (forecastInputs.adr * daysInMonth * (forecastInputs.occupancy / 100));

    const yearlyRevenue = monthlyRevenue * 12;

    const managementCost = monthlyRevenue * (forecastInputs.managementFee / 100);
    const repairCost = monthlyRevenue * (forecastInputs.repairFund / 100);
    const taxCost = monthlyRevenue * (forecastInputs.taxes / 100);

    const totalExpenses =
      managementCost +
      forecastInputs.utilities +
      forecastInputs.supplies +
      repairCost +
      taxCost +
      forecastInputs.marketing;

    const noiMonth = monthlyRevenue - totalExpenses;
    const noiYear = noiMonth * 12;
    const noiMargin = monthlyRevenue > 0 ? (noiMonth / monthlyRevenue) * 100 : 0;
    const paybackYears = noiYear > 0 ? project.price / noiYear : 0;
    const revPerM2Month = project.area > 0 ? noiMonth / project.area : 0;

    return {
      monthlyRevenue,
      yearlyRevenue,
      totalExpenses,
      noiMonth,
      noiYear,
      noiMargin,
      paybackYears,
      revPerM2Month,
    };
  };

  const baseResult = useMemo(() => calculateForecast(inputs), [inputs, project]);

  const conservativeResult = useMemo(
    () =>
      calculateForecast({
        ...inputs,
        adr: inputs.adr * 0.9,
        occupancy: inputs.occupancy * 0.9,
      }),
    [inputs]
  );

  const optimisticResult = useMemo(
    () =>
      calculateForecast({
        ...inputs,
        adr: inputs.adr * 1.1,
        occupancy: Math.min(100, inputs.occupancy * 1.1),
      }),
    [inputs]
  );

  const updateInput = (key: keyof ForecastInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs((prev) => ({ ...prev, [key]: numValue }));
  };

  return (
    <div className="space-y-6">
      {/* Warning Banner */}
      <Card className="border-amber-500/50 bg-amber-500/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-amber-200 mb-1">Проект в строительстве</h4>
              <p className="text-sm text-muted-foreground">
                Этот объект находится в стадии строительства. Используйте калькулятор ниже
                для прогнозирования доходности после сдачи. Все расчёты являются прогнозными
                и зависят от ваших предположений.
              </p>
              {project.completionDate && (
                <p className="text-sm text-amber-200 mt-2">
                  Планируемая сдача: <strong>{project.completionDate}</strong>
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Данные объекта
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Стоимость</Label>
              <p className="text-lg font-mono tabular-nums">
                {formatCurrency(project.price)}
              </p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Площадь</Label>
              <p className="text-lg font-mono tabular-nums">
                {formatNumber(project.area, 1)} м²
              </p>
            </div>
            {project.pricePerM2 && (
              <div>
                <Label className="text-xs text-muted-foreground">Цена за м²</Label>
                <p className="text-lg font-mono tabular-nums">
                  {formatCurrency(project.pricePerM2)}
                </p>
              </div>
            )}
            {project.developer && (
              <div>
                <Label className="text-xs text-muted-foreground">Застройщик</Label>
                <p className="text-sm">{project.developer}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Forecast Inputs */}
      <Card>
        <CardHeader>
          <CardTitle>Прогнозные параметры</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Revenue Inputs */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-primary">Доходы</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="adr">ADR (средний чек за сутки), ₽</Label>
                <Input
                  id="adr"
                  type="number"
                  value={inputs.adr}
                  onChange={(e) => updateInput("adr", e.target.value)}
                  className="font-mono"
                />
              </div>
              <div>
                <Label htmlFor="occupancy">Загрузка, %</Label>
                <Input
                  id="occupancy"
                  type="number"
                  value={inputs.occupancy}
                  onChange={(e) => updateInput("occupancy", e.target.value)}
                  min="0"
                  max="100"
                  className="font-mono"
                />
              </div>
            </div>
          </div>

          {/* Expense Inputs */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-primary">Расходы</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="managementFee">Управление, % от выручки</Label>
                <Input
                  id="managementFee"
                  type="number"
                  value={inputs.managementFee}
                  onChange={(e) => updateInput("managementFee", e.target.value)}
                  className="font-mono"
                />
              </div>
              <div>
                <Label htmlFor="utilities">Коммунальные услуги, ₽/мес</Label>
                <Input
                  id="utilities"
                  type="number"
                  value={inputs.utilities}
                  onChange={(e) => updateInput("utilities", e.target.value)}
                  className="font-mono"
                />
              </div>
              <div>
                <Label htmlFor="supplies">Расходники, ₽/мес</Label>
                <Input
                  id="supplies"
                  type="number"
                  value={inputs.supplies}
                  onChange={(e) => updateInput("supplies", e.target.value)}
                  className="font-mono"
                />
              </div>
              <div>
                <Label htmlFor="repairFund">Ремонтный фонд, % от выручки</Label>
                <Input
                  id="repairFund"
                  type="number"
                  value={inputs.repairFund}
                  onChange={(e) => updateInput("repairFund", e.target.value)}
                  className="font-mono"
                />
              </div>
              <div>
                <Label htmlFor="taxes">Налоги, % от выручки</Label>
                <Input
                  id="taxes"
                  type="number"
                  value={inputs.taxes}
                  onChange={(e) => updateInput("taxes", e.target.value)}
                  className="font-mono"
                />
              </div>
              <div>
                <Label htmlFor="marketing">Маркетинг, ₽/мес</Label>
                <Input
                  id="marketing"
                  type="number"
                  value={inputs.marketing}
                  onChange={(e) => updateInput("marketing", e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results - Three Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Conservative */}
        <Card className="border-amber-500/30">
          <CardHeader>
            <CardTitle className="text-base text-amber-200">
              Консервативный (-10%)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Выручка в месяц</Label>
              <p className="text-lg font-mono tabular-nums text-amber-200">
                {formatCurrency(conservativeResult.monthlyRevenue)}
              </p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">NOI в год</Label>
              <p className="text-lg font-mono tabular-nums text-amber-200">
                {formatCurrency(conservativeResult.noiYear)}
              </p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Окупаемость</Label>
              <p className="text-lg font-mono tabular-nums text-amber-200">
                {formatNumber(conservativeResult.paybackYears, 1)} лет
              </p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">₽/м²/мес</Label>
              <p className="text-lg font-mono tabular-nums text-amber-200">
                {formatNumber(conservativeResult.revPerM2Month, 0)} ₽
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Base */}
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="text-base text-primary">
              Базовый сценарий
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Выручка в месяц</Label>
              <p className="text-lg font-mono tabular-nums text-primary">
                {formatCurrency(baseResult.monthlyRevenue)}
              </p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">NOI в год</Label>
              <p className="text-lg font-mono tabular-nums text-primary">
                {formatCurrency(baseResult.noiYear)}
              </p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Окупаемость</Label>
              <p className="text-lg font-mono tabular-nums text-primary">
                {formatNumber(baseResult.paybackYears, 1)} лет
              </p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">₽/м²/мес</Label>
              <p className="text-lg font-mono tabular-nums text-primary">
                {formatNumber(baseResult.revPerM2Month, 0)} ₽
              </p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">NOI маржа</Label>
              <p className="text-lg font-mono tabular-nums text-primary">
                {formatPercent(baseResult.noiMargin)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Optimistic */}
        <Card className="border-green-500/30">
          <CardHeader>
            <CardTitle className="text-base text-green-400">
              Оптимистичный (+10%)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Выручка в месяц</Label>
              <p className="text-lg font-mono tabular-nums text-green-400">
                {formatCurrency(optimisticResult.monthlyRevenue)}
              </p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">NOI в год</Label>
              <p className="text-lg font-mono tabular-nums text-green-400">
                {formatCurrency(optimisticResult.noiYear)}
              </p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Окупаемость</Label>
              <p className="text-lg font-mono tabular-nums text-green-400">
                {formatNumber(optimisticResult.paybackYears, 1)} лет
              </p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">₽/м²/мес</Label>
              <p className="text-lg font-mono tabular-nums text-green-400">
                {formatNumber(optimisticResult.revPerM2Month, 0)} ₽
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Резюме прогноза
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3 text-sm">
            <p>
              При базовых предположениях (ADR: {formatCurrency(inputs.adr)}, загрузка:{" "}
              {inputs.occupancy}%), ожидаемая окупаемость составит{" "}
              <strong className="text-primary">
                {formatNumber(baseResult.paybackYears, 1)} лет
              </strong>{" "}
              с годовым NOI в{" "}
              <strong className="text-primary">{formatCurrency(baseResult.noiYear)}</strong>.
            </p>
            <p>
              Диапазон окупаемости при изменении параметров на ±10%:{" "}
              <strong className="text-amber-200">
                {formatNumber(conservativeResult.paybackYears, 1)}
              </strong>{" "}
              —{" "}
              <strong className="text-green-400">
                {formatNumber(optimisticResult.paybackYears, 1)}
              </strong>{" "}
              лет.
            </p>
          </div>

          <div className="pt-4 border-t space-y-3">
            <h4 className="font-semibold text-sm">Хотите более детальный расчёт?</h4>
            <p className="text-sm text-muted-foreground">
              Используйте наш полный калькулятор для более точного прогнозирования с учётом
              дополнительных доходов, детализацией расходов и анализом чувствительности к изменению
              параметров. Вы сможете рассчитать три сценария развития и сохранить результаты.
            </p>
            <Link href="/calculator">
              <Button className="w-full sm:w-auto">
                <Calculator className="h-4 w-4 mr-2" />
                Открыть полный калькулятор NOI
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
