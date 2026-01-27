import { APARTMENTS_DB, type Apartment } from "@/data/apartments";

/**
 * Константы для расчётов
 */
const AVERAGE_AREA = 40; // Условная площадь апартамента для расчётов (м²)

/**
 * Интерфейс для апартамента с расчётной доходностью
 */
export interface ApartmentWithStats extends Apartment {
  adr_avg: number; // Средний ADR
  revPerM2Month: number; // Доходность ₽/м²/мес
}

/**
 * Рассчитать среднюю доходность по рынку (₽/м²/мес)
 */
export function calculateMarketRevPerM2(): number {
  const apartments = APARTMENTS_DB.map((apt) => {
    const adr_avg = (apt.adr_low + apt.adr_high) / 2;
    const yearlyRevenue = adr_avg * apt.occ_avg * 365;
    const monthlyRevenue = yearlyRevenue / 12;
    return monthlyRevenue / AVERAGE_AREA;
  });

  const sum = apartments.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / apartments.length);
}

/**
 * Рассчитать среднюю загрузку по рынку (%)
 */
export function calculateAverageOccupancy(): number {
  const sum = APARTMENTS_DB.reduce((acc, apt) => acc + apt.occ_avg, 0);
  return Math.round((sum / APARTMENTS_DB.length) * 100);
}

/**
 * Рассчитать среднюю окупаемость по рынку (лет)
 * Упрощённая формула: (Цена за м² × площадь) / (Годовой доход × 0.55)
 * 0.55 = примерно 45% расходов (УК, ЖКХ, клининг, ремонт, налоги)
 */
export function calculateAveragePayback(): number {
  const paybacks = APARTMENTS_DB.map((apt) => {
    const adr_avg = (apt.adr_low + apt.adr_high) / 2;
    const totalPrice = apt.price_m2 * AVERAGE_AREA;
    const yearlyRevenue = adr_avg * apt.occ_avg * 365;
    const netIncome = yearlyRevenue * 0.55; // 55% чистого после расходов
    return totalPrice / netIncome;
  });

  const sum = paybacks.reduce((acc, val) => acc + val, 0);
  return parseFloat((sum / paybacks.length).toFixed(1));
}

/**
 * Получить количество объектов в базе
 */
export function getApartmentsCount(): number {
  return APARTMENTS_DB.length;
}

/**
 * Получить топ апартаментов по доходности
 */
export function getTopApartmentsByRevenue(limit: number = 5): ApartmentWithStats[] {
  return APARTMENTS_DB
    .map((apt) => {
      const adr_avg = (apt.adr_low + apt.adr_high) / 2;
      const yearlyRevenue = adr_avg * apt.occ_avg * 365;
      const monthlyRevenue = yearlyRevenue / 12;
      const revPerM2Month = Math.round(monthlyRevenue / AVERAGE_AREA);

      return {
        ...apt,
        adr_avg,
        revPerM2Month,
      };
    })
    .sort((a, b) => b.revPerM2Month - a.revPerM2Month)
    .slice(0, limit);
}

/**
 * Получить распределение по городам
 */
export function getCitiesDistribution(): Record<string, number> {
  const distribution: Record<string, number> = {};

  APARTMENTS_DB.forEach((apt) => {
    distribution[apt.city] = (distribution[apt.city] || 0) + 1;
  });

  return distribution;
}

/**
 * Получить распределение по классам
 */
export function getClassesDistribution(): Record<string, number> {
  const distribution: Record<string, number> = {};

  APARTMENTS_DB.forEach((apt) => {
    distribution[apt.class] = (distribution[apt.class] || 0) + 1;
  });

  return distribution;
}
