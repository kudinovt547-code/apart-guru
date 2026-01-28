#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";

// Paths
const INBOX_DIR = path.join(process.cwd(), "data/inbox");
const CONTENT_DIR = path.join(process.cwd(), "data/content");
const SRC_DATA_DIR = path.join(process.cwd(), "src/data");
const OUTPUT_FILE = path.join(CONTENT_DIR, "stats.generated.json");
const SRC_OUTPUT_FILE = path.join(SRC_DATA_DIR, "stats.generated.json");

interface RawCompletedObject {
  id: number;
  city_code: number;
  city: string;
  name: string;
  class: string;
  price_m2: number;
  adr_low: number;
  adr_high: number;
  occ_avg: number;
  uk_fee: number;
  model: string;
  loc_class: string;
}

interface RawForSaleObject {
  id: number;
  city_code: number;
  city: string;
  project: string;
  address: string;
  unit_no: string;
  area_m2: number;
  price_rub: number;
  price_m2: number;
  status: string;
  commissioning: string;
  yield_claim_pct: number | string;
  uk_operator: string;
  source: string;
  payout_2024_rub_per_month?: number;
  occ_off_season?: number;
  occ_in_season?: number;
  developer?: string;
  format?: string;
  metro_location?: string;
  metro_time?: string;
  data_source?: string;
  notes?: string;
}

interface RawData {
  updatedAt: string;
  completed_60: RawCompletedObject[];
  for_sale_20: {
    inreit_only: RawForSaleObject[];
    other_regions: RawForSaleObject[];
  };
  counts: {
    completed_60: number;
    for_sale_20: number;
    total_records: number;
  };
}

interface ProjectData {
  slug: string;
  title: string;
  city: string;
  country: string;
  format: string;
  status: string;
  updatedAt: string;
  price: number;
  area: number;
  revPerM2Month: number;
  noiYear: number;
  paybackYears: number;
  occupancy: number;
  adr: number;
  riskLevel: string;
  summary: string;
  why: string[];
  risks: string[];
  seasonality: number[];
  // Optional fields
  developer?: string;
  completionDate?: string;
  pricePerM2?: number;
  link?: string;
}

interface StatsData {
  objects: ProjectData[];
  sources: {
    updatedAt: string;
    source: string;
  };
}

// Helper functions
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9а-яё\s-]/gi, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getCityCountry(cityCode: number, cityName: string): { city: string; country: string } {
  const cityMap: Record<number, { city: string; country: string }> = {
    1: { city: "Санкт-Петербург", country: "Россия" },
    2: { city: "Москва", country: "Россия" },
    4: { city: "Калининград", country: "Россия" },
    6: { city: "Екатеринбург", country: "Россия" },
    7: { city: "Крым", country: "Россия" },
  };

  return cityMap[cityCode] || { city: cityName, country: "Россия" };
}

function getRiskLevel(locClass: string, classType: string): string {
  // Prime locations = lower risk
  if (locClass === "Prime") return "low";
  // Business class = medium risk
  if (classType === "Business") return "medium";
  // Comfort class in Center = medium risk
  if (locClass === "Center") return "medium";
  // Hub or other = higher risk
  return "high";
}

function getFormat(classType: string, model: string): string {
  if (model === "Short") return "hotel";
  if (classType === "Business") return "apart-hotel";
  return "apartment";
}

function calculateMetrics(obj: RawCompletedObject) {
  // Средняя площадь апартаментов
  const area = 30; // стандартная площадь для апартаментов в м²

  // Цена объекта
  const price = obj.price_m2 * area;

  // Средний ADR
  const adr = (obj.adr_low + obj.adr_high) / 2;

  // Загрузка в процентах
  const occupancy = obj.occ_avg * 100;

  // Годовой валовый доход
  const grossYearlyRevenue = adr * 365 * obj.occ_avg;

  // Операционные расходы (обычно 15-20% от валового дохода, не включая комиссию УК)
  const operationalCostsRate = 0.18;
  const operationalCosts = grossYearlyRevenue * operationalCostsRate;

  // Чистая операционная прибыль (NOI)
  // NOI = Валовый доход - Комиссия УК - Операционные расходы
  const noiYear = grossYearlyRevenue * (1 - obj.uk_fee) - operationalCosts;

  // Доходность на м² в месяц
  const monthlyRevenue = adr * 30 * obj.occ_avg;
  const monthlyRevenueAfterFees = monthlyRevenue * (1 - obj.uk_fee);
  const monthlyOperationalCosts = operationalCosts / 12;
  const revPerM2Month = (monthlyRevenueAfterFees - monthlyOperationalCosts) / area;

  // Окупаемость в годах
  const paybackYears = noiYear > 0 ? price / noiYear : 999;

  return {
    area,
    price,
    adr,
    occupancy,
    revPerM2Month,
    noiYear,
    paybackYears: Math.min(paybackYears, 999), // cap at 999 years
  };
}

function convertCompletedObject(obj: RawCompletedObject, updatedAt: string): ProjectData {
  const { city, country } = getCityCountry(obj.city_code, obj.city);
  const metrics = calculateMetrics(obj);
  const riskLevel = getRiskLevel(obj.loc_class, obj.class);
  const format = getFormat(obj.class, obj.model);

  // Seasonality based on location and model
  let seasonality: number[];
  if (obj.model === "Short" && (obj.city === "Калининград" || obj.city === "Крым")) {
    // Курортные города - сезонность
    seasonality = [45, 50, 60, 70, 85, 95, 100, 100, 90, 70, 55, 50];
  } else {
    // Городские апартаменты - стабильная загрузка
    seasonality = Array(12).fill(obj.occ_avg * 100);
  }

  // Why invest reasons
  const why: string[] = [];
  if (metrics.paybackYears < 10) {
    why.push("Быстрая окупаемость инвестиций");
  }
  if (obj.occ_avg >= 0.75) {
    why.push("Высокая средняя загрузка");
  }
  if (obj.loc_class === "Prime") {
    why.push("Премиальная локация");
  }
  if (metrics.revPerM2Month > 2000) {
    why.push("Высокая доходность на квадратный метр");
  }
  if (obj.model === "Hybrid") {
    why.push("Гибридная модель управления");
  }

  // Risk factors
  const risks: string[] = [];
  if (obj.uk_fee >= 0.25) {
    risks.push("Высокая комиссия управляющей компании");
  }
  if (obj.model === "Short") {
    risks.push("Сезонность загрузки");
  }
  if (obj.class === "Comfort") {
    risks.push("Высокая конкуренция в сегменте Comfort");
  }
  if (obj.occ_avg < 0.70) {
    risks.push("Загрузка ниже среднерыночной");
  }

  return {
    slug: createSlug(obj.name),
    title: obj.name,
    city,
    country,
    format,
    status: "active",
    updatedAt,
    price: metrics.price,
    area: metrics.area,
    revPerM2Month: metrics.revPerM2Month,
    noiYear: metrics.noiYear,
    paybackYears: metrics.paybackYears,
    occupancy: metrics.occupancy,
    adr: metrics.adr,
    riskLevel,
    summary: `${obj.class} класс | ${obj.loc_class} локация | Модель: ${obj.model}`,
    why,
    risks,
    seasonality,
    pricePerM2: obj.price_m2,
  };
}

function convertForSaleObject(obj: RawForSaleObject, updatedAt: string): ProjectData {
  const { city, country } = getCityCountry(obj.city_code, obj.city);

  // For sale objects - use actual area if available
  const area = obj.area_m2 || 25;
  const price = obj.price_rub;
  const pricePerM2 = obj.price_m2;

  // Check if it's completed (has operational data) or under construction
  const isCompleted = obj.commissioning.includes("сдан") || obj.commissioning.includes("Работающий");

  let metrics;
  if (isCompleted && obj.payout_2024_rub_per_month) {
    // Calculate from actual payout data
    const monthlyPayout = obj.payout_2024_rub_per_month;
    const yearlyPayout = monthlyPayout * 12;
    const avgOccupancy = obj.occ_off_season && obj.occ_in_season
      ? (obj.occ_off_season + obj.occ_in_season) / 2
      : 0.75;

    // Estimate ADR from payout and occupancy
    const estimatedMonthlyRevenue = monthlyPayout / (1 - 0.23); // Add back UK fee
    const adr = estimatedMonthlyRevenue / (30 * avgOccupancy);

    metrics = {
      adr,
      occupancy: avgOccupancy * 100,
      revPerM2Month: monthlyPayout / area,
      noiYear: yearlyPayout,
      paybackYears: price / yearlyPayout,
    };
  } else {
    // Under construction or no data - use zeros or estimates
    const yieldClaimPct = typeof obj.yield_claim_pct === 'number' ? obj.yield_claim_pct : 0;
    const estimatedNOI = yieldClaimPct > 0 ? (price * yieldClaimPct) / 100 : 0;

    metrics = {
      adr: 0,
      occupancy: 0,
      revPerM2Month: estimatedNOI > 0 ? estimatedNOI / 12 / area : 0,
      noiYear: estimatedNOI,
      paybackYears: estimatedNOI > 0 ? 100 / yieldClaimPct : 0,
    };
  }

  const status = isCompleted ? "active" : "construction";
  const format = obj.format?.includes("апарт") ? "apart-hotel" : "apartment";
  const riskLevel = isCompleted ? "medium" : "high";

  // Seasonality
  let seasonality: number[];
  if (obj.occ_off_season && obj.occ_in_season) {
    // Create seasonal pattern from off/in season data
    const offSeason = obj.occ_off_season * 100;
    const inSeason = obj.occ_in_season * 100;
    seasonality = [
      offSeason, offSeason, offSeason,
      (offSeason + inSeason) / 2,
      inSeason, inSeason, inSeason, inSeason, inSeason,
      (offSeason + inSeason) / 2,
      offSeason, offSeason
    ];
  } else {
    seasonality = Array(12).fill(metrics.occupancy || 75);
  }

  const why: string[] = [];
  if (isCompleted) {
    why.push("Работающий отель с фактическими выплатами");
  }
  if (obj.uk_operator && obj.uk_operator !== "не указано") {
    why.push(`Управление: ${obj.uk_operator}`);
  }
  if (typeof obj.yield_claim_pct === 'number' && obj.yield_claim_pct >= 10) {
    why.push(`Заявленная доходность ${obj.yield_claim_pct}%`);
  }

  const risks: string[] = [];
  if (!isCompleted) {
    risks.push("Объект в стадии строительства");
    risks.push("Фактическая доходность может отличаться от прогнозной");
  }
  if (obj.notes && obj.notes.includes("не указано")) {
    risks.push("Отсутствует детальная информация о проекте");
  }

  return {
    slug: createSlug(obj.project || obj.address),
    title: obj.project,
    city,
    country,
    format,
    status,
    updatedAt,
    price,
    area,
    revPerM2Month: metrics.revPerM2Month,
    noiYear: metrics.noiYear,
    paybackYears: metrics.paybackYears,
    occupancy: metrics.occupancy,
    adr: metrics.adr,
    riskLevel,
    summary: `${obj.address} | ${obj.commissioning}`,
    why,
    risks,
    seasonality,
    pricePerM2,
    developer: obj.developer,
    completionDate: obj.commissioning,
    link: obj.source,
  };
}

async function main() {
  console.log("🚀 Starting new data conversion...\n");

  // Read the new data file
  const dataFilePath = path.join(INBOX_DIR, "new_data_2026-01-28.json");

  if (!fs.existsSync(dataFilePath)) {
    console.error(`❌ Data file not found: ${dataFilePath}`);
    process.exit(1);
  }

  const rawData: RawData = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
  console.log(`✓ Loaded data from ${dataFilePath}`);
  console.log(`  - Completed objects: ${rawData.completed_60.length}`);
  console.log(`  - For sale (Inreit): ${rawData.for_sale_20.inreit_only.length}`);
  console.log(`  - For sale (Other): ${rawData.for_sale_20.other_regions.length}\n`);

  const allObjects: ProjectData[] = [];

  // Convert completed objects
  console.log("📊 Converting completed objects...");
  for (const obj of rawData.completed_60) {
    const converted = convertCompletedObject(obj, rawData.updatedAt);
    allObjects.push(converted);
  }
  console.log(`✓ Converted ${rawData.completed_60.length} completed objects\n`);

  // Convert for sale objects
  console.log("🏗️  Converting for sale objects...");
  for (const obj of rawData.for_sale_20.inreit_only) {
    const converted = convertForSaleObject(obj, rawData.updatedAt);
    allObjects.push(converted);
  }
  for (const obj of rawData.for_sale_20.other_regions) {
    const converted = convertForSaleObject(obj, rawData.updatedAt);
    allObjects.push(converted);
  }
  console.log(`✓ Converted ${rawData.for_sale_20.inreit_only.length + rawData.for_sale_20.other_regions.length} for sale objects\n`);

  // Create final data structure
  const statsData: StatsData = {
    objects: allObjects,
    sources: {
      updatedAt: rawData.updatedAt,
      source: "Apart Guru Database (Converted from new format)",
    },
  };

  // Write to both locations
  const jsonOutput = JSON.stringify(statsData, null, 2);
  fs.writeFileSync(OUTPUT_FILE, jsonOutput);
  fs.writeFileSync(SRC_OUTPUT_FILE, jsonOutput);

  console.log("✅ Database updated successfully!\n");
  console.log(`📈 STATISTICS:`);
  console.log(`  Total objects: ${allObjects.length}`);
  console.log(`  - Active: ${allObjects.filter(o => o.status === "active").length}`);
  console.log(`  - Construction: ${allObjects.filter(o => o.status === "construction").length}`);
  console.log(`\n📍 Cities:`);
  const cities = [...new Set(allObjects.map(o => o.city))];
  cities.forEach(city => {
    const count = allObjects.filter(o => o.city === city).length;
    console.log(`  - ${city}: ${count} objects`);
  });

  console.log(`\n💾 Files updated:`);
  console.log(`  - ${OUTPUT_FILE}`);
  console.log(`  - ${SRC_OUTPUT_FILE}\n`);

  // Show top 10 by revenue per m2
  const topProjects = allObjects
    .filter(o => o.status === "active" && o.revPerM2Month > 0)
    .sort((a, b) => b.revPerM2Month - a.revPerM2Month)
    .slice(0, 10);

  console.log(`🏆 Top 10 by ₽/м²/мес:\n`);
  topProjects.forEach((obj, idx) => {
    console.log(
      `${idx + 1}. ${obj.title} (${obj.city}) — ${Math.round(obj.revPerM2Month)} ₽/м²/мес | ${Math.round(obj.paybackYears)} лет`
    );
  });
}

main().catch((error) => {
  console.error("❌ Error during conversion:", error);
  process.exit(1);
});
