import { z } from "zod";

/**
 * Тип для строящихся проектов с прогнозными данными из калькулятора
 * Используется для таблицы "Прогнозы по новостройкам" на главной
 */

export const UnderConstructionSchema = z.object({
  id: z.number(),
  title: z.string(),
  developer: z.string(),
  city: z.string(),
  country: z.string(),
  completionDate: z.string(), // Квартал и год, например "Q2 2026"
  pricePerM2: z.number(), // Цена за м² в рублях

  // Прогнозные данные из калькулятора
  projectedADR: z.number(), // Прогноз ADR (₽/сутки)
  projectedOccupancy: z.number(), // Прогноз загрузки (0-1)
  projectedRevPerM2Month: z.number(), // Прогноз доходности (₽/м²/мес)
  projectedPaybackYears: z.number(), // Прогноз окупаемости (лет)
  projectedROI: z.number(), // Прогноз процента годовых (%)

  // Дополнительно
  link: z.string().optional(), // Ссылка на проект
  riskNote: z.string().optional(), // Примечание о рисках стройки
});

export type UnderConstruction = z.infer<typeof UnderConstructionSchema>;
