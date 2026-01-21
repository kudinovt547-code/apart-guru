import { z } from "zod";

export const RiskLevel = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;

export const ProjectStatus = {
  ACTIVE: "active",
  PLANNING: "planning",
  CONSTRUCTION: "construction",
  COMPLETED: "completed",
} as const;

export const PropertyFormat = {
  APARTMENT: "apartment",
  HOTEL: "hotel",
  HOSTEL: "hostel",
  APART_HOTEL: "apart-hotel",
  GUESTHOUSE: "guesthouse",
} as const;

export type RiskLevelType = (typeof RiskLevel)[keyof typeof RiskLevel];
export type ProjectStatusType = (typeof ProjectStatus)[keyof typeof ProjectStatus];
export type PropertyFormatType = (typeof PropertyFormat)[keyof typeof PropertyFormat];

export const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  country: z.string(),
  city: z.string(),
  format: z.enum([
    PropertyFormat.APARTMENT,
    PropertyFormat.HOTEL,
    PropertyFormat.HOSTEL,
    PropertyFormat.APART_HOTEL,
    PropertyFormat.GUESTHOUSE,
  ]),
  status: z.enum([
    ProjectStatus.ACTIVE,
    ProjectStatus.PLANNING,
    ProjectStatus.CONSTRUCTION,
    ProjectStatus.COMPLETED,
  ]),
  updatedAt: z.string(),
  price: z.number(),
  area: z.number(),
  revPerM2Month: z.number(),
  noiYear: z.number(),
  paybackYears: z.number(),
  occupancy: z.number(),
  adr: z.number(),
  riskLevel: z.enum([RiskLevel.LOW, RiskLevel.MEDIUM, RiskLevel.HIGH]),
  summary: z.string(),
  why: z.array(z.string()),
  risks: z.array(z.string()),
  seasonality: z.array(z.number()).length(12),

  // Optional fields for construction projects
  developer: z.string().optional(),
  completionDate: z.string().optional(),
  pricePerM2: z.number().optional(),
  link: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const formatLabels: Record<PropertyFormatType, string> = {
  [PropertyFormat.APARTMENT]: "Квартира",
  [PropertyFormat.HOTEL]: "Отель",
  [PropertyFormat.HOSTEL]: "Хостел",
  [PropertyFormat.APART_HOTEL]: "Апарт-отель",
  [PropertyFormat.GUESTHOUSE]: "Гостевой дом",
};

export const statusLabels: Record<ProjectStatusType, string> = {
  [ProjectStatus.ACTIVE]: "Активный",
  [ProjectStatus.PLANNING]: "Планирование",
  [ProjectStatus.CONSTRUCTION]: "Строительство",
  [ProjectStatus.COMPLETED]: "Завершён",
};

export const riskLabels: Record<RiskLevelType, string> = {
  [RiskLevel.LOW]: "Низкий",
  [RiskLevel.MEDIUM]: "Средний",
  [RiskLevel.HIGH]: "Высокий",
};
