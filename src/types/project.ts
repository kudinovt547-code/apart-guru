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
  RECREATION: "recreation-complex",
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
    PropertyFormat.RECREATION,
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
  image: z.string().optional(),
  images: z.array(z.string()).optional(),

  // Optional fields for operational projects
  class: z.string().optional(),
  rating: z.number().optional(),
  management: z.string().optional(),
  totalUnits: z.number().optional(),
  operatingSince: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  contacts: z.object({
    phone: z.string().optional(),
    email: z.string().optional(),
    website: z.string().optional(),
    whatsapp: z.string().optional(),
    telegram: z.string().optional(),
  }).optional(),
  url: z.string().optional(),

  // Optional fields for investment projects
  roi: z.number().optional(),
  roiMin: z.number().optional(),
  roiMax: z.number().optional(),
  roiClaimed: z.number().optional(),
  priceGrowth: z.number().optional(),
  monthlyIncome: z.number().optional(),
  areaMax: z.number().optional(),
  priceMax: z.number().optional(),
  occupancyWeekend: z.number().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const formatLabels: Record<PropertyFormatType, string> = {
  [PropertyFormat.APARTMENT]: "Квартира",
  [PropertyFormat.HOTEL]: "Отель",
  [PropertyFormat.HOSTEL]: "Хостел",
  [PropertyFormat.APART_HOTEL]: "Апарт-отель",
  [PropertyFormat.GUESTHOUSE]: "Гостевой дом",
  [PropertyFormat.RECREATION]: "База отдыха",
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
