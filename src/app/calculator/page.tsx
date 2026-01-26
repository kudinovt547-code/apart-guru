"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { Calculator, Save } from "lucide-react";

interface CalculatorInputs {
  price: number;
  area: number;
  adr: number;
  occupancy: number;
  additionalIncome: number;
  managementFee: number;
  utilities: number;
  supplies: number;
  repairFund: number;
  taxes: number;
  marketing: number;
}

interface NOIResult {
  monthlyRevenue: number;
  yearlyRevenue: number;
  totalExpenses: number;
  noiMonth: number;
  noiYear: number;
  noiMargin: number;
  paybackYears: number;
  revPerM2Month: number;
}

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    price: 5000000,
    area: 40,
    adr: 3000,
    occupancy: 75,
    additionalIncome: 0,
    managementFee: 15,
    utilities: 5000,
    supplies: 2000,
    repairFund: 3,
    taxes: 6,
    marketing: 1000,
  });

  const calculateNOI = (
    baseInputs: CalculatorInputs,
    adrMultiplier = 1,
    occupancyMultiplier = 1
  ): NOIResult => {
    const adjustedAdr = baseInputs.adr * adrMultiplier;
    const adjustedOccupancy = Math.min(
      100,
      baseInputs.occupancy * occupancyMultiplier
    );

    const daysInMonth = 30;
    const monthlyRevenue =
      (adjustedAdr * daysInMonth * (adjustedOccupancy / 100)) +
      baseInputs.additionalIncome;

    const yearlyRevenue = monthlyRevenue * 12;

    const managementCost = monthlyRevenue * (baseInputs.managementFee / 100);
    const repairCost = monthlyRevenue * (baseInputs.repairFund / 100);
    const taxCost = monthlyRevenue * (baseInputs.taxes / 100);

    const totalExpenses =
      managementCost +
      baseInputs.utilities +
      baseInputs.supplies +
      repairCost +
      taxCost +
      baseInputs.marketing;

    const noiMonth = monthlyRevenue - totalExpenses;
    const noiYear = noiMonth * 12;
    const noiMargin = (noiMonth / monthlyRevenue) * 100;
    const paybackYears = baseInputs.price / noiYear;
    const revPerM2Month = noiMonth / baseInputs.area;

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

  const baseResult = useMemo(() => calculateNOI(inputs), [inputs]);
  const conservativeResult = useMemo(
    () => calculateNOI(inputs, 0.9, 0.9),
    [inputs]
  );
  const optimisticResult = useMemo(
    () => calculateNOI(inputs, 1.1, 1.1),
    [inputs]
  );

  const sensitivityADR = useMemo(() => {
    return {
      minus10: calculateNOI(inputs, 0.9, 1),
      plus10: calculateNOI(inputs, 1.1, 1),
    };
  }, [inputs]);

  const sensitivityOccupancy = useMemo(() => {
    return {
      minus10: calculateNOI(inputs, 1, 0.9),
      plus10: calculateNOI(inputs, 1, 1.1),
    };
  }, [inputs]);

  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const savedData = {
      inputs,
      result: baseResult,
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
          Рассчитайте чистый операционный доход и окупаемость проекта
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Параметры проекта</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Base Params */}
            <div className="space-y-4">
              <h3 className="font-semibold">Базовые параметры</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Стоимость объекта, ₽</Label>
                  <Input
                    id="price"
                    type="number"
                    value={inputs.price}
                    onChange={(e) =>
                      handleInputChange("price", Number(e.target.value))
                    }
                  />
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
              </div>
            </div>

            {/* Revenue */}
            <div className="space-y-4">
              <h3 className="font-semibold">Доходы</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="adr">ADR (средний чек за сутки), ₽</Label>
                  <Input
                    id="adr"
                    type="number"
                    value={inputs.adr}
                    onChange={(e) =>
                      handleInputChange("adr", Number(e.target.value))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="occupancy">Загрузка, %</Label>
                  <Input
                    id="occupancy"
                    type="number"
                    min="0"
                    max="100"
                    value={inputs.occupancy}
                    onChange={(e) =>
                      handleInputChange("occupancy", Number(e.target.value))
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="additionalIncome">
                    Доп. доходы в месяц, ₽
                  </Label>
                  <Input
                    id="additionalIncome"
                    type="number"
                    value={inputs.additionalIncome}
                    onChange={(e) =>
                      handleInputChange(
                        "additionalIncome",
                        Number(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            </div>

            {/* Expenses */}
            <div className="space-y-4">
              <h3 className="font-semibold">Расходы</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="managementFee">Комиссия УК, %</Label>
                  <Input
                    id="managementFee"
                    type="number"
                    value={inputs.managementFee}
                    onChange={(e) =>
                      handleInputChange("managementFee", Number(e.target.value))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="utilities">Коммуналка в месяц, ₽</Label>
                  <Input
                    id="utilities"
                    type="number"
                    value={inputs.utilities}
                    onChange={(e) =>
                      handleInputChange("utilities", Number(e.target.value))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="supplies">Расходники в месяц, ₽</Label>
                  <Input
                    id="supplies"
                    type="number"
                    value={inputs.supplies}
                    onChange={(e) =>
                      handleInputChange("supplies", Number(e.target.value))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="repairFund">Ремонтный фонд, %</Label>
                  <Input
                    id="repairFund"
                    type="number"
                    value={inputs.repairFund}
                    onChange={(e) =>
                      handleInputChange("repairFund", Number(e.target.value))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="taxes">Налоги, %</Label>
                  <Input
                    id="taxes"
                    type="number"
                    value={inputs.taxes}
                    onChange={(e) =>
                      handleInputChange("taxes", Number(e.target.value))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="marketing">Маркетинг в месяц, ₽</Label>
                  <Input
                    id="marketing"
                    type="number"
                    value={inputs.marketing}
                    onChange={(e) =>
                      handleInputChange("marketing", Number(e.target.value))
                    }
                  />
                </div>
              </div>
            </div>

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
              <CardTitle>Базовый сценарий</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Доходность в месяц</p>
                <p className="text-2xl font-bold font-mono tabular-nums text-primary">
                  {formatCurrency(baseResult.noiMonth)}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Доходность в год</p>
                <p className="text-xl font-bold font-mono tabular-nums">
                  {formatCurrency(baseResult.noiYear)}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Маржа доходности</p>
                <p className="text-xl font-bold font-mono tabular-nums">
                  {formatPercent(baseResult.noiMargin)}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Окупаемость</p>
                <p className="text-xl font-bold font-mono tabular-nums">
                  {formatNumber(baseResult.paybackYears, 1)} лет
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">₽/м²/мес</p>
                <p className="text-xl font-bold font-mono tabular-nums">
                  {formatCurrency(baseResult.revPerM2Month)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Разбивка</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Выручка</span>
                <span className="font-mono tabular-nums">
                  {formatCurrency(baseResult.monthlyRevenue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Расходы</span>
                <span className="font-mono tabular-nums">
                  -{formatCurrency(baseResult.totalExpenses)}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Доходность</span>
                <span className="font-mono tabular-nums text-primary">
                  {formatCurrency(baseResult.noiMonth)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle>Сценарии</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-yellow-500">
                Консервативный (-10%)
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Доходность/мес</span>
                  <span className="font-mono tabular-nums">
                    {formatCurrency(conservativeResult.noiMonth)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">NOI/год</span>
                  <span className="font-mono tabular-nums">
                    {formatCurrency(conservativeResult.noiYear)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Окупаемость</span>
                  <span className="font-mono tabular-nums">
                    {formatNumber(conservativeResult.paybackYears, 1)} лет
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-primary">База</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Доходность/мес</span>
                  <span className="font-mono tabular-nums">
                    {formatCurrency(baseResult.noiMonth)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">NOI/год</span>
                  <span className="font-mono tabular-nums">
                    {formatCurrency(baseResult.noiYear)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Окупаемость</span>
                  <span className="font-mono tabular-nums">
                    {formatNumber(baseResult.paybackYears, 1)} лет
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-green-500">
                Оптимистичный (+10%)
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Доходность/мес</span>
                  <span className="font-mono tabular-nums">
                    {formatCurrency(optimisticResult.noiMonth)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">NOI/год</span>
                  <span className="font-mono tabular-nums">
                    {formatCurrency(optimisticResult.noiYear)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Окупаемость</span>
                  <span className="font-mono tabular-nums">
                    {formatNumber(optimisticResult.paybackYears, 1)} лет
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sensitivity */}
      <Card>
        <CardHeader>
          <CardTitle>Анализ чувствительности</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="adr">
            <TabsList>
              <TabsTrigger value="adr">ADR ±10%</TabsTrigger>
              <TabsTrigger value="occupancy">Загрузка ±10%</TabsTrigger>
            </TabsList>

            <TabsContent value="adr" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">ADR -10%</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Доходность/год</span>
                      <span className="font-mono tabular-nums">
                        {formatCurrency(sensitivityADR.minus10.noiYear)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Изменение</span>
                      <span className="font-mono tabular-nums text-destructive">
                        {formatCurrency(
                          sensitivityADR.minus10.noiYear - baseResult.noiYear
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">ADR +10%</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Доходность/год</span>
                      <span className="font-mono tabular-nums">
                        {formatCurrency(sensitivityADR.plus10.noiYear)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Изменение</span>
                      <span className="font-mono tabular-nums text-green-500">
                        +{formatCurrency(
                          sensitivityADR.plus10.noiYear - baseResult.noiYear
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="occupancy" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Загрузка -10%</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Доходность/год</span>
                      <span className="font-mono tabular-nums">
                        {formatCurrency(sensitivityOccupancy.minus10.noiYear)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Изменение</span>
                      <span className="font-mono tabular-nums text-destructive">
                        {formatCurrency(
                          sensitivityOccupancy.minus10.noiYear -
                            baseResult.noiYear
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Загрузка +10%</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Доходность/год</span>
                      <span className="font-mono tabular-nums">
                        {formatCurrency(sensitivityOccupancy.plus10.noiYear)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Изменение</span>
                      <span className="font-mono tabular-nums text-green-500">
                        +{formatCurrency(
                          sensitivityOccupancy.plus10.noiYear -
                            baseResult.noiYear
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
