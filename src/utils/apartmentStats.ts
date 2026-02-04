import { getProjects } from "@/data/stats";
import type { Project } from "@/types/project";

/**
 * Интерфейс для апартамента с расчётной доходностью для таблицы
 */
export interface ApartmentWithStats {
  id: string;
  city: string;
  name: string;
  class: string;
  adr_avg: number;
  occ_avg: number;
  revPerM2Month: number;
}

/**
 * Рассчитать среднюю доходность по рынку (₽/м²/мес)
 * Используем данные из новой базы (getProjects)
 */
export function calculateMarketRevPerM2(): number {
  const projects = getProjects().filter(p => p.status === "active" && p.revPerM2Month > 0);

  if (projects.length === 0) return 0;

  const sum = projects.reduce((acc, p) => acc + p.revPerM2Month, 0);
  return Math.round(sum / projects.length);
}

/**
 * Рассчитать среднюю загрузку по рынку (%)
 */
export function calculateAverageOccupancy(): number {
  const projects = getProjects().filter(p => p.status === "active" && p.occupancy > 0);

  if (projects.length === 0) return 0;

  const sum = projects.reduce((acc, p) => acc + p.occupancy, 0);
  return Math.round(sum / projects.length);
}

/**
 * Рассчитать среднюю окупаемость по рынку (лет)
 */
export function calculateAveragePayback(): number {
  const projects = getProjects().filter(p => p.status === "active" && p.paybackYears > 0 && p.paybackYears < 100);

  if (projects.length === 0) return 0;

  const sum = projects.reduce((acc, p) => acc + p.paybackYears, 0);
  return parseFloat((sum / projects.length).toFixed(1));
}

/**
 * Получить количество объектов в базе
 */
export function getApartmentsCount(): number {
  return getProjects().length;
}

/**
 * Получить топ апартаментов по доходности
 */
export function getTopApartmentsByRevenue(limit: number = 5): ApartmentWithStats[] {
  const projects = getProjects()
    .filter(p => p.status === "active" && p.revPerM2Month > 0)
    .sort((a, b) => b.revPerM2Month - a.revPerM2Month)
    .slice(0, limit);

  return projects.map((p) => ({
    id: p.slug,
    city: p.city,
    name: p.title,
    class: p.format === "apart-hotel" ? "Business" : "Comfort",
    adr_avg: p.adr,
    occ_avg: p.occupancy / 100, // Convert from percentage to decimal
    revPerM2Month: Math.round(p.revPerM2Month),
  }));
}

/**
 * Получить распределение по городам
 */
export function getCitiesDistribution(): Record<string, number> {
  const distribution: Record<string, number> = {};
  const projects = getProjects();

  projects.forEach((p) => {
    distribution[p.city] = (distribution[p.city] || 0) + 1;
  });

  return distribution;
}

/**
 * Получить распределение по форматам (классам)
 */
export function getClassesDistribution(): Record<string, number> {
  const distribution: Record<string, number> = {};
  const projects = getProjects();

  projects.forEach((p) => {
    const className = p.format === "apart-hotel" ? "Business" : "Comfort";
    distribution[className] = (distribution[className] || 0) + 1;
  });

  return distribution;
}

/**
 * Интерфейс для статистики по городу
 */
export interface CityStats {
  city: string;
  count: number;
  avgRevPerM2: number;
  avgPrice: number;
  avgPayback: number;
  minPrice: number;
  maxPrice: number;
}

/**
 * Получить статистику по каждому городу
 */
export function getCitiesStats(): CityStats[] {
  const projects = getProjects().filter(p => p.status === "active");
  const cityGroups: Record<string, Project[]> = {};

  // Группируем по городам
  projects.forEach((p) => {
    if (!cityGroups[p.city]) {
      cityGroups[p.city] = [];
    }
    cityGroups[p.city].push(p);
  });

  // Вычисляем статистику для каждого города
  const stats: CityStats[] = Object.entries(cityGroups).map(([city, cityProjects]) => {
    const validRevProjects = cityProjects.filter(p => p.revPerM2Month > 0);
    const validPaybackProjects = cityProjects.filter(p => p.paybackYears > 0 && p.paybackYears < 100);
    const validPriceProjects = cityProjects.filter(p => p.price > 0);

    const avgRevPerM2 = validRevProjects.length > 0
      ? Math.round(validRevProjects.reduce((acc, p) => acc + p.revPerM2Month, 0) / validRevProjects.length)
      : 0;

    const avgPrice = validPriceProjects.length > 0
      ? Math.round(validPriceProjects.reduce((acc, p) => acc + p.price, 0) / validPriceProjects.length)
      : 0;

    const avgPayback = validPaybackProjects.length > 0
      ? parseFloat((validPaybackProjects.reduce((acc, p) => acc + p.paybackYears, 0) / validPaybackProjects.length).toFixed(1))
      : 0;

    const prices = validPriceProjects.map(p => p.price);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

    return {
      city,
      count: cityProjects.length,
      avgRevPerM2,
      avgPrice,
      avgPayback,
      minPrice,
      maxPrice,
    };
  });

  // Сортируем по доходности (убыв)
  return stats.sort((a, b) => b.avgRevPerM2 - a.avgRevPerM2);
}

/**
 * Получить дополнительные рыночные метрики
 */
export function getMarketMetrics() {
  const projects = getProjects().filter(p => p.status === "active");
  const validPriceProjects = projects.filter(p => p.price > 0);
  const validNoiProjects = projects.filter(p => p.noiYear && p.noiYear > 0);

  const avgPrice = validPriceProjects.length > 0
    ? Math.round(validPriceProjects.reduce((acc, p) => acc + p.price, 0) / validPriceProjects.length)
    : 0;

  const avgNoi = validNoiProjects.length > 0
    ? Math.round(validNoiProjects.reduce((acc, p) => acc + (p.noiYear || 0), 0) / validNoiProjects.length)
    : 0;

  const prices = validPriceProjects.map(p => p.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  return {
    avgPrice,
    avgNoi,
    minPrice,
    maxPrice,
    totalProjects: projects.length,
  };
}

/**
 * Распределение проектов по диапазонам доходности
 */
export function getRevenueDistribution(): Array<{ range: string; count: number }> {
  const projects = getProjects().filter(p => p.status === "active" && p.revPerM2Month > 0);

  const ranges = [
    { range: "< 1500", min: 0, max: 1500, count: 0 },
    { range: "1500-2000", min: 1500, max: 2000, count: 0 },
    { range: "2000-2500", min: 2000, max: 2500, count: 0 },
    { range: "2500-3000", min: 2500, max: 3000, count: 0 },
    { range: "> 3000", min: 3000, max: Infinity, count: 0 },
  ];

  projects.forEach((p) => {
    const range = ranges.find(r => p.revPerM2Month >= r.min && p.revPerM2Month < r.max);
    if (range) {
      range.count++;
    }
  });

  return ranges;
}
