"use client";

import { useState } from "react";
import Link from "next/link";
import { useCompareStore } from "@/store/useCompareStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "@/components/ui/risk-badge";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { formatLabels } from "@/types/project";
import { X, FileText, Send } from "lucide-react";

export default function ComparePage() {
  const { projects, removeProject, clearAll } = useCompareStore();
  const [showReportModal, setShowReportModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  if (projects.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h1 className="text-4xl font-bold">Сравнение проектов</h1>
          <p className="text-muted-foreground">
            Добавьте проекты в сравнение, чтобы увидеть детальный анализ
          </p>
          <Link href="/projects">
            <Button size="lg">Перейти к каталогу</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Report request:", {
      ...formData,
      projects: projects.map((p) => p.slug),
    });
    setFormSubmitted(true);
    setTimeout(() => {
      setShowReportModal(false);
      setFormSubmitted(false);
      setFormData({ name: "", contact: "" });
    }, 2000);
  };

  const bestYield = projects.reduce((best, p) =>
    p.revPerM2Month > best.revPerM2Month ? p : best
  );
  const fastestPayback = projects.reduce((best, p) =>
    p.paybackYears < best.paybackYears ? p : best
  );
  const lowestRisk = projects.find((p) => p.riskLevel === "low") || projects[0];

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Сравнение проектов</h1>
          <p className="text-muted-foreground">
            Сравниваете {projects.length} из 5 проектов
          </p>
        </div>
        <Button variant="outline" onClick={clearAll}>
          Очистить всё
        </Button>
      </div>

      {/* Comparison Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium w-48">
                  Параметр
                </th>
                {projects.map((project) => (
                  <th key={project.slug} className="px-4 py-3 text-left min-w-[200px]">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="font-medium hover:text-primary"
                        >
                          {project.title}
                        </Link>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeProject(project.slug)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground font-normal">
                        {project.city}, {project.country}
                      </p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-muted/30">
                <td className="px-4 py-3 text-sm font-medium">Формат</td>
                {projects.map((project) => (
                  <td key={project.slug} className="px-4 py-3">
                    <Badge variant="outline">{formatLabels[project.format]}</Badge>
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-muted/30">
                <td className="px-4 py-3 text-sm font-medium">Доходность ₽/м²/мес</td>
                {projects.map((project) => (
                  <td
                    key={project.slug}
                    className={`px-4 py-3 font-mono tabular-nums ${
                      project.slug === bestYield.slug
                        ? "text-primary font-bold"
                        : ""
                    }`}
                  >
                    {formatCurrency(project.revPerM2Month)}
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-muted/30">
                <td className="px-4 py-3 text-sm font-medium">NOI в год</td>
                {projects.map((project) => (
                  <td key={project.slug} className="px-4 py-3 font-mono tabular-nums">
                    {formatCurrency(project.noiYear)}
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-muted/30">
                <td className="px-4 py-3 text-sm font-medium">Окупаемость</td>
                {projects.map((project) => (
                  <td
                    key={project.slug}
                    className={`px-4 py-3 font-mono tabular-nums ${
                      project.slug === fastestPayback.slug
                        ? "text-primary font-bold"
                        : ""
                    }`}
                  >
                    {formatNumber(project.paybackYears, 1)} лет
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-muted/30">
                <td className="px-4 py-3 text-sm font-medium">Загрузка</td>
                {projects.map((project) => (
                  <td key={project.slug} className="px-4 py-3 font-mono tabular-nums">
                    {formatPercent(project.occupancy)}
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-muted/30">
                <td className="px-4 py-3 text-sm font-medium">ADR</td>
                {projects.map((project) => (
                  <td key={project.slug} className="px-4 py-3 font-mono tabular-nums">
                    {formatCurrency(project.adr)}
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-muted/30">
                <td className="px-4 py-3 text-sm font-medium">Стоимость</td>
                {projects.map((project) => (
                  <td key={project.slug} className="px-4 py-3 font-mono tabular-nums">
                    {formatCurrency(project.price)}
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-muted/30">
                <td className="px-4 py-3 text-sm font-medium">Площадь</td>
                {projects.map((project) => (
                  <td key={project.slug} className="px-4 py-3 font-mono tabular-nums">
                    {project.area} м²
                  </td>
                ))}
              </tr>

              <tr className="border-b hover:bg-muted/30">
                <td className="px-4 py-3 text-sm font-medium">Уровень риска</td>
                {projects.map((project) => (
                  <td key={project.slug} className="px-4 py-3">
                    <RiskBadge level={project.riskLevel} />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Выводы</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium mb-2">Максимальная доходность:</p>
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-bold">{bestYield.title}</span>{" "}
              показывает лучшую доходность на м² ({formatCurrency(bestYield.revPerM2Month)}/м²/мес).
              {bestYield.riskLevel !== "low" &&
                " Однако, стоит учитывать повышенные риски этого проекта."}
            </p>
          </div>

          <div>
            <p className="font-medium mb-2">Быстрая окупаемость:</p>
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-bold">{fastestPayback.title}</span>{" "}
              имеет самую быструю окупаемость ({formatNumber(fastestPayback.paybackYears, 1)}{" "}
              лет), что делает его привлекательным для инвесторов, ориентированных
              на краткосрочную перспективу.
            </p>
          </div>

          <div>
            <p className="font-medium mb-2">Стабильность:</p>
            <p className="text-sm text-muted-foreground">
              {lowestRisk.riskLevel === "low" ? (
                <>
                  <span className="text-primary font-bold">{lowestRisk.title}</span>{" "}
                  обладает низким уровнем риска, подходит для консервативных
                  инвесторов и первых инвестиций в недвижимость.
                </>
              ) : (
                "Среди выбранных проектов нет вариантов с низким уровнем риска. Рекомендуем рассмотреть более стабильные альтернативы."
              )}
            </p>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Выбор оптимального проекта зависит от ваших инвестиционных целей,
              бюджета, толерантности к риску и временного горизонта. Рекомендуем
              получить персональную консультацию для подробного анализа.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Button
            size="lg"
            onClick={() => setShowReportModal(true)}
            className="flex-1"
          >
            <FileText className="h-5 w-5 mr-2" />
            Получить PDF-отчёт сравнения
          </Button>

          <Link href="/contact" className="flex-1">
            <Button size="lg" variant="outline" className="w-full">
              <Send className="h-5 w-5 mr-2" />
              Получить консультацию
            </Button>
          </Link>
        </div>
      </Card>

      {/* Report Modal */}
      <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
        <DialogContent onClose={() => setShowReportModal(false)}>
          {formSubmitted ? (
            <div className="text-center py-8">
              <div className="mb-4 text-primary text-6xl">✓</div>
              <DialogTitle className="mb-2">Запрос принят!</DialogTitle>
              <DialogDescription>
                Отчёт будет отправлен на указанный контакт в течение 24 часов.
              </DialogDescription>
            </div>
          ) : (
            <form onSubmit={handleSubmitReport}>
              <DialogHeader>
                <DialogTitle>Получить PDF-отчёт сравнения</DialogTitle>
                <DialogDescription>
                  Заполните форму, и мы отправим детальный отчёт на ваш контакт
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="name">Имя</Label>
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
                  <Label htmlFor="contact">Telegram или телефон</Label>
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
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowReportModal(false)}
                >
                  Отмена
                </Button>
                <Button type="submit">Отправить запрос</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
