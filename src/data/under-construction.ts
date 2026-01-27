import { UnderConstruction } from "@/types/under-construction";

/**
 * База данных строящихся проектов с прогнозными данными
 *
 * Эти проекты показываются в таблице "Прогнозы по новостройкам" на главной
 * Данные основаны на расчётах калькулятора для привлечения покупателей
 */

export const underConstructionProjects: UnderConstruction[] = [
  // САНКТ-ПЕТЕРБУРГ
  {
    id: 1,
    title: "Riverside Residence",
    developer: "Capital Group",
    city: "Санкт-Петербург",
    country: "Россия",
    completionDate: "Q3 2026",
    pricePerM2: 320000,
    projectedADR: 5200,
    projectedOccupancy: 0.82,
    projectedRevPerM2Month: 3550,
    projectedPaybackYears: 9.2,
    projectedROI: 10.9,
    riskNote: "Средний риск: опытный девелопер, финансирование подтверждено",
  },
  {
    id: 2,
    title: "Nevsky Quarter",
    developer: "PIK Group",
    city: "Санкт-Петербург",
    country: "Россия",
    completionDate: "Q4 2026",
    pricePerM2: 380000,
    projectedADR: 6500,
    projectedOccupancy: 0.88,
    projectedRevPerM2Month: 4750,
    projectedPaybackYears: 8.1,
    projectedROI: 12.3,
    riskNote: "Низкий риск: топ-девелопер, prime локация",
  },
  {
    id: 3,
    title: "Baltika Towers",
    developer: "Setl Group",
    city: "Санкт-Петербург",
    country: "Россия",
    completionDate: "Q1 2027",
    pricePerM2: 290000,
    projectedADR: 4500,
    projectedOccupancy: 0.80,
    projectedRevPerM2Month: 3000,
    projectedPaybackYears: 10.5,
    projectedROI: 9.5,
    riskNote: "Средний риск: район развивается, транспортная доступность",
  },

  // МОСКВА
  {
    id: 4,
    title: "Moscow City View",
    developer: "Invest AG",
    city: "Москва",
    country: "Россия",
    completionDate: "Q2 2026",
    pricePerM2: 550000,
    projectedADR: 8500,
    projectedOccupancy: 0.75,
    projectedRevPerM2Month: 5300,
    projectedPaybackYears: 10.8,
    projectedROI: 9.3,
    riskNote: "Средний риск: premium сегмент, высокая конкуренция",
  },
  {
    id: 5,
    title: "Garden Residences",
    developer: "MR Group",
    city: "Москва",
    country: "Россия",
    completionDate: "Q3 2026",
    pricePerM2: 420000,
    projectedADR: 6000,
    projectedOccupancy: 0.85,
    projectedRevPerM2Month: 4250,
    projectedPaybackYears: 9.9,
    projectedROI: 10.1,
    riskNote: "Низкий риск: стабильный район, хорошая инфраструктура",
  },

  // СОЧИ
  {
    id: 6,
    title: "Seaside Paradise",
    developer: "Кортос",
    city: "Сочи",
    country: "Россия",
    completionDate: "Q4 2026",
    pricePerM2: 750000,
    projectedADR: 12000,
    projectedOccupancy: 0.65,
    projectedRevPerM2Month: 6500,
    projectedPaybackYears: 11.8,
    projectedROI: 8.5,
    riskNote: "Высокий риск: курортная сезонность, зависимость от туризма",
  },
  {
    id: 7,
    title: "Olympic Park Residence",
    developer: "Gorki City",
    city: "Сочи",
    country: "Россия",
    completionDate: "Q2 2027",
    pricePerM2: 620000,
    projectedADR: 9500,
    projectedOccupancy: 0.70,
    projectedRevPerM2Month: 5550,
    projectedPaybackYears: 11.2,
    projectedROI: 8.9,
    riskNote: "Средний риск: развитый район, круглогодичный спрос",
  },

  // КАЛИНИНГРАД
  {
    id: 8,
    title: "Baltic Breeze",
    developer: "Baltic Development",
    city: "Калининград",
    country: "Россия",
    completionDate: "Q1 2027",
    pricePerM2: 380000,
    projectedADR: 7000,
    projectedOccupancy: 0.72,
    projectedRevPerM2Month: 4200,
    projectedPaybackYears: 9.5,
    projectedROI: 10.5,
    riskNote: "Средний риск: растущий туристический спрос",
  },

  // КАЗАНЬ
  {
    id: 9,
    title: "Kazan Arena Residences",
    developer: "Унистрой",
    city: "Казань",
    country: "Россия",
    completionDate: "Q3 2026",
    pricePerM2: 280000,
    projectedADR: 5000,
    projectedOccupancy: 0.78,
    projectedRevPerM2Month: 3250,
    projectedPaybackYears: 9.8,
    projectedROI: 10.2,
    riskNote: "Низкий риск: спортивная инфраструктура, деловой туризм",
  },
  {
    id: 10,
    title: "Kremlin View",
    developer: "ТатИнвестГражданПроект",
    city: "Казань",
    country: "Россия",
    completionDate: "Q4 2026",
    pricePerM2: 340000,
    projectedADR: 6500,
    projectedOccupancy: 0.82,
    projectedRevPerM2Month: 4450,
    projectedPaybackYears: 8.5,
    projectedROI: 11.8,
    riskNote: "Низкий риск: историческ ий центр, стабильный спрос",
  },
];

/**
 * Получить топ строящихся проектов по прогнозной доходности
 */
export function getTopUnderConstruction(limit: number = 5): UnderConstruction[] {
  return [...underConstructionProjects]
    .sort((a, b) => b.projectedRevPerM2Month - a.projectedRevPerM2Month)
    .slice(0, limit);
}

/**
 * Получить строящиеся проекты по городу
 */
export function getUnderConstructionByCity(city: string): UnderConstruction[] {
  return underConstructionProjects.filter((p) => p.city === city);
}
