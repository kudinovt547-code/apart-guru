"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X, SlidersHorizontal } from "lucide-react";
import { Project } from "@/types/project";

export interface FilterState {
  priceRange: [number, number];
  paybackRange: [number, number];
  riskLevels: ("low" | "medium" | "high")[];
  managementCompanies: string[];
  statuses: ("active" | "construction")[];
  sortBy: "yield" | "payback" | "price" | "city";
  sortOrder: "asc" | "desc";
}

interface AdvancedFiltersProps {
  projects: Project[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
}

export function AdvancedFilters({
  projects,
  filters,
  onFiltersChange,
  onReset,
}: AdvancedFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate min/max values from projects
  const priceMin = Math.min(...projects.map(p => p.price));
  const priceMax = Math.max(...projects.map(p => p.price));
  const paybackMin = Math.min(...projects.map(p => p.paybackYears));
  const paybackMax = Math.max(...projects.map(p => p.paybackYears));

  // Get unique management companies
  const managementCompanies = Array.from(
    new Set(projects.map(p => p.managementCompany).filter(Boolean))
  ).sort() as string[];

  const toggleRiskLevel = (level: "low" | "medium" | "high") => {
    const newLevels = filters.riskLevels.includes(level)
      ? filters.riskLevels.filter(l => l !== level)
      : [...filters.riskLevels, level];
    onFiltersChange({ ...filters, riskLevels: newLevels });
  };

  const toggleManagementCompany = (company: string) => {
    const newCompanies = filters.managementCompanies.includes(company)
      ? filters.managementCompanies.filter(c => c !== company)
      : [...filters.managementCompanies, company];
    onFiltersChange({ ...filters, managementCompanies: newCompanies });
  };

  const toggleStatus = (status: "active" | "construction") => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter(s => s !== status)
      : [...filters.statuses, status];
    onFiltersChange({ ...filters, statuses: newStatuses });
  };

  const activeFiltersCount =
    (filters.riskLevels.length > 0 ? 1 : 0) +
    (filters.managementCompanies.length > 0 ? 1 : 0) +
    (filters.statuses.length > 0 ? 1 : 0) +
    (filters.priceRange[0] !== priceMin || filters.priceRange[1] !== priceMax ? 1 : 0) +
    (filters.paybackRange[0] !== paybackMin || filters.paybackRange[1] !== paybackMax ? 1 : 0);

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            <CardTitle>Расширенные фильтры</CardTitle>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">{activeFiltersCount} активных</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={onReset}>
                <X className="h-4 w-4 mr-1" />
                Сбросить
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Скрыть" : "Показать"}
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div>
            <Label className="mb-3 block">
              Цена: {filters.priceRange[0].toLocaleString('ru-RU')} - {filters.priceRange[1].toLocaleString('ru-RU')} ₽
            </Label>
            <Slider
              min={priceMin}
              max={priceMax}
              step={100000}
              value={filters.priceRange}
              onValueChange={(value) => onFiltersChange({ ...filters, priceRange: value as [number, number] })}
              className="mb-2"
            />
          </div>

          {/* Payback Range */}
          <div>
            <Label className="mb-3 block">
              Окупаемость: {filters.paybackRange[0].toFixed(1)} - {filters.paybackRange[1].toFixed(1)} лет
            </Label>
            <Slider
              min={paybackMin}
              max={paybackMax}
              step={0.1}
              value={filters.paybackRange}
              onValueChange={(value) => onFiltersChange({ ...filters, paybackRange: value as [number, number] })}
              className="mb-2"
            />
          </div>

          {/* Risk Level */}
          <div>
            <Label className="mb-3 block">Уровень риска</Label>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={filters.riskLevels.includes("low") ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleRiskLevel("low")}
              >
                🟢 Низкий
              </Badge>
              <Badge
                variant={filters.riskLevels.includes("medium") ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleRiskLevel("medium")}
              >
                🟡 Средний
              </Badge>
              <Badge
                variant={filters.riskLevels.includes("high") ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleRiskLevel("high")}
              >
                🔴 Высокий
              </Badge>
            </div>
          </div>

          {/* Status */}
          <div>
            <Label className="mb-3 block">Статус</Label>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={filters.statuses.includes("active") ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleStatus("active")}
              >
                Действует
              </Badge>
              <Badge
                variant={filters.statuses.includes("construction") ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleStatus("construction")}
              >
                Строится
              </Badge>
            </div>
          </div>

          {/* Management Companies */}
          {managementCompanies.length > 0 && (
            <div>
              <Label className="mb-3 block">Управляющая компания</Label>
              <div className="flex flex-wrap gap-2">
                {managementCompanies.slice(0, 10).map((company) => (
                  <Badge
                    key={company}
                    variant={filters.managementCompanies.includes(company) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleManagementCompany(company)}
                  >
                    {company}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Sort By */}
          <div>
            <Label className="mb-3 block">Сортировка</Label>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={filters.sortBy === "yield" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, sortBy: "yield", sortOrder: "desc" })}
              >
                По доходности ↓
              </Badge>
              <Badge
                variant={filters.sortBy === "payback" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, sortBy: "payback", sortOrder: "asc" })}
              >
                По окупаемости ↑
              </Badge>
              <Badge
                variant={filters.sortBy === "price" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, sortBy: "price", sortOrder: filters.sortOrder === "asc" ? "desc" : "asc" })}
              >
                По цене {filters.sortBy === "price" && (filters.sortOrder === "asc" ? "↑" : "↓")}
              </Badge>
              <Badge
                variant={filters.sortBy === "city" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, sortBy: "city", sortOrder: "asc" })}
              >
                По городу А-Я
              </Badge>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

// Default filter state
export const defaultFilters: FilterState = {
  priceRange: [0, 100000000],
  paybackRange: [0, 20],
  riskLevels: [],
  managementCompanies: [],
  statuses: [],
  sortBy: "yield",
  sortOrder: "desc",
};

// Helper function to apply filters
export function applyFilters(projects: Project[], filters: FilterState): Project[] {
  let filtered = projects.filter(project => {
    // Price range
    if (project.price < filters.priceRange[0] || project.price > filters.priceRange[1]) {
      return false;
    }

    // Payback range
    if (project.paybackYears < filters.paybackRange[0] || project.paybackYears > filters.paybackRange[1]) {
      return false;
    }

    // Risk levels
    if (filters.riskLevels.length > 0 && !filters.riskLevels.includes(project.riskLevel)) {
      return false;
    }

    // Management companies
    if (filters.managementCompanies.length > 0) {
      if (!project.managementCompany || !filters.managementCompanies.includes(project.managementCompany)) {
        return false;
      }
    }

    // Statuses
    if (filters.statuses.length > 0 && !filters.statuses.includes(project.status as "active" | "construction")) {
      return false;
    }

    return true;
  });

  // Apply sorting
  filtered.sort((a, b) => {
    let comparison = 0;

    switch (filters.sortBy) {
      case "yield":
        comparison = b.revPerM2Month - a.revPerM2Month;
        break;
      case "payback":
        comparison = a.paybackYears - b.paybackYears;
        break;
      case "price":
        comparison = a.price - b.price;
        break;
      case "city":
        comparison = a.city.localeCompare(b.city, 'ru');
        break;
    }

    return filters.sortOrder === "asc" ? comparison : -comparison;
  });

  return filtered;
}
