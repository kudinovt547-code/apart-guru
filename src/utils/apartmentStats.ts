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
