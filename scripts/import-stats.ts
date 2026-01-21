#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import * as XLSX from "xlsx";

// Paths
const INBOX_DIR = path.join(process.cwd(), "data/inbox");
const CONTENT_DIR = path.join(process.cwd(), "data/content");
const SRC_DATA_DIR = path.join(process.cwd(), "src/data");
const OUTPUT_FILE = path.join(CONTENT_DIR, "stats.generated.json");
const SRC_OUTPUT_FILE = path.join(SRC_DATA_DIR, "stats.generated.json");

// Function to find specific data files in inbox
function findDataFiles(): {
  json: string | null;
  readyApartments: string | null;
  constructionApartments: string | null;
} {
  const files = fs.readdirSync(INBOX_DIR);

  const jsonFile = files.find(f => f.endsWith('.json') && !f.startsWith('.') && f !== 'package.json');
  const readyFile = files.find(f => f.includes('FullCards') && (f.endsWith('.xlsx') || f.endsWith('.xls')));
  const constructionFile = files.find(f => f.includes('Construction') && (f.endsWith('.xlsx') || f.endsWith('.xls')));

  return {
    json: jsonFile ? path.join(INBOX_DIR, jsonFile) : null,
    readyApartments: readyFile ? path.join(INBOX_DIR, readyFile) : null,
    constructionApartments: constructionFile ? path.join(INBOX_DIR, constructionFile) : null,
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
  // Optional fields for construction projects
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

function normalizeData(data: any): StatsData {
  // If data already has correct structure, return it
  if (data.objects && Array.isArray(data.objects)) {
    return data as StatsData;
  }

  // If data is an array, wrap it
  if (Array.isArray(data)) {
    return {
      objects: data,
      sources: {
        updatedAt: new Date().toISOString().split("T")[0],
        source: "Imported data",
      },
    };
  }

  throw new Error("Invalid data format");
}

function parseReadyApartments(filePath: string): ProjectData[] {
  console.log(`📊 Parsing ready apartments: ${filePath}`);

  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  console.log(`✓ Found ${jsonData.length} ready apartments`);

  const objects: ProjectData[] = jsonData.map((row: any) => {
    const title = row["Объект"] || row.title || "Без названия";
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9а-я]+/gi, "-")
      .replace(/^-+|-+$/g, "");

    // Map Russian column names to our format
    const formatRaw = row["Формат"] || row.format || "apartment";
    const format = formatRaw.toLowerCase().includes("апарт") ? "apart-hotel" : "apartment";

    const price = parseFloat(row["Стоимость, ₽"] || 0);
    const area = parseFloat(row["Площадь, м²"] || 0);
    const revPerM2Month = parseFloat(row["Доходность ₽/м²/мес"] || 0);
    const noiYear = parseFloat(row["NOI в год"] || 0);
    const paybackYears = parseFloat(row["Окупаемость, лет"] || 0);
    const occupancy = parseFloat(row["Загрузка, %"] || 0);
    const adr = parseFloat(row["ADR, ₽"] || 0);

    // Map risk level
    const riskRaw = (row["Уровень риска"] || "средний").toLowerCase();
    let riskLevel = "medium";
    if (riskRaw.includes("низ") || riskRaw.includes("low")) riskLevel = "low";
    if (riskRaw.includes("выс") || riskRaw.includes("high")) riskLevel = "high";

    // Create summary from source info
    const source = row["Источник"] || "";
    const sheetId = row["Лист/ID"] || "";
    const summary = `${source ? source + " | " : ""}${sheetId || ""}`.trim();

    // Default seasonality based on occupancy
    const seasonality = Array(12).fill(occupancy || 75);

    return {
      slug,
      title,
      city: "Unknown", // No city info in ready apartments file
      country: "Россия",
      format,
      status: "active",
      updatedAt: new Date().toISOString().split("T")[0],
      price,
      area,
      revPerM2Month,
      noiYear,
      paybackYears,
      occupancy,
      adr,
      riskLevel,
      summary,
      why: [],
      risks: [],
      seasonality,
    };
  });

  return objects;
}

function parseConstructionApartments(filePath: string): ProjectData[] {
  console.log(`🏗️  Parsing construction apartments: ${filePath}`);

  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  console.log(`✓ Found ${jsonData.length} construction projects`);

  const objects: ProjectData[] = jsonData.map((row: any) => {
    const title = row["Проект"] || row.title || "Без названия";
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9а-я]+/gi, "-")
      .replace(/^-+|-+$/g, "");

    const city = row["Город"] || "Unknown";
    const formatRaw = row["Формат/класс"] || row.format || "apartment";
    const format = formatRaw.toLowerCase().includes("апарт") ? "apart-hotel" : "apartment";

    const price = parseFloat(row["Стоимость, ₽"] || 0);
    const area = parseFloat(row["Площадь, м²"] || 0);
    const pricePerM2 = parseFloat(row["Цена, ₽/м²"] || 0);

    const developer = row["Девелопер/застройщик"] || "";
    const completionDate = row["Срок сдачи (норм.)"] || row["Статус/срок"] || "";
    const link = row["Ссылка"] || "";

    // Construction projects have no operational data yet, all zeros
    return {
      slug,
      title,
      city,
      country: "Россия",
      format,
      status: "construction",
      updatedAt: new Date().toISOString().split("T")[0],
      price,
      area,
      revPerM2Month: 0, // To be forecasted
      noiYear: 0, // To be forecasted
      paybackYears: 0, // To be forecasted
      occupancy: 0, // To be forecasted
      adr: 0, // To be forecasted
      riskLevel: "medium",
      summary: `${developer ? developer + " | " : ""}Сдача: ${completionDate}`.trim(),
      why: [],
      risks: ["Проект в стадии строительства", "Требуется прогнозирование доходности"],
      seasonality: Array(12).fill(75), // Default forecast
      // Construction-specific fields
      developer,
      completionDate,
      pricePerM2,
      link,
    };
  });

  return objects;
}

function generateReport(data: StatsData) {
  console.log("\n📈 IMPORT REPORT\n");
  console.log(`Total objects: ${data.objects.length}`);

  const readyApartments = data.objects.filter(obj => obj.status === "active");
  const constructionProjects = data.objects.filter(obj => obj.status === "construction");

  console.log(`  ✓ Ready apartments: ${readyApartments.length}`);
  console.log(`  🏗️  Construction projects: ${constructionProjects.length}`);

  // Top 10 by revenue per m2 (only ready apartments)
  if (readyApartments.length > 0) {
    const sorted = [...readyApartments]
      .filter((obj) => obj.revPerM2Month > 0)
      .sort((a, b) => b.revPerM2Month - a.revPerM2Month)
      .slice(0, 10);

    console.log("\n🏆 Top 10 ready apartments by ₽/м²/мес:\n");
    sorted.forEach((obj, idx) => {
      console.log(
        `${idx + 1}. ${obj.title} — ${Math.round(obj.revPerM2Month)} ₽/м²/мес | ${Math.round(obj.paybackYears)} лет окупаемость`
      );
    });
  }

  // Show sample construction projects
  if (constructionProjects.length > 0) {
    console.log("\n🏗️  Sample construction projects:\n");
    constructionProjects.slice(0, 5).forEach((obj, idx) => {
      const pricePerM2Display = obj.pricePerM2 ? Math.round(obj.pricePerM2).toLocaleString() : "N/A";
      console.log(
        `${idx + 1}. ${obj.title} (${obj.city}) — ${pricePerM2Display} ₽/м²`
      );
    });
    console.log(`   ... and ${constructionProjects.length - 5} more`);
  }

  console.log(`\n✅ Data exported to:`);
  console.log(`   - ${OUTPUT_FILE}`);
  console.log(`   - ${SRC_OUTPUT_FILE}\n`);
}

async function main() {
  console.log("🚀 Starting data import...\n");

  // Find data files in inbox
  const { json: jsonFile, readyApartments, constructionApartments } = findDataFiles();

  let allObjects: ProjectData[] = [];

  // Check if JSON exists (priority)
  if (jsonFile) {
    console.log(`✓ Found JSON file: ${path.basename(jsonFile)}`);
    const rawData = JSON.parse(fs.readFileSync(jsonFile, "utf-8"));
    const normalizedData = normalizeData(rawData);

    // Write to both locations
    const jsonOutput = JSON.stringify(normalizedData, null, 2);
    fs.writeFileSync(OUTPUT_FILE, jsonOutput);
    fs.writeFileSync(SRC_OUTPUT_FILE, jsonOutput);
    console.log(`✓ Normalized and saved`);

    generateReport(normalizedData);
    return;
  }

  // Parse ready apartments if available
  if (readyApartments) {
    console.log(`✓ Found ready apartments: ${path.basename(readyApartments)}`);
    const readyObjects = parseReadyApartments(readyApartments);
    allObjects = allObjects.concat(readyObjects);
  }

  // Parse construction apartments if available
  if (constructionApartments) {
    console.log(`✓ Found construction projects: ${path.basename(constructionApartments)}`);
    const constructionObjects = parseConstructionApartments(constructionApartments);
    allObjects = allObjects.concat(constructionObjects);
  }

  // Check if we have any data
  if (allObjects.length === 0) {
    console.error(`❌ No data files found in ${INBOX_DIR}`);
    console.error(`\nExpected:`);
    console.error(`  - Any .json file (priority)`);
    console.error(`  - *FullCards*.xlsx (ready apartments)`);
    console.error(`  - *Construction*.xlsx (construction projects)`);
    console.error(`\nPlease add data files to the inbox directory.`);
    console.error(`\nCurrent inbox contents:`);
    const files = fs.readdirSync(INBOX_DIR);
    files.forEach(f => console.error(`  - ${f}`));
    process.exit(1);
  }

  // Create merged data structure
  const mergedData: StatsData = {
    objects: allObjects,
    sources: {
      updatedAt: new Date().toISOString().split("T")[0],
      source: `Merged import: ${readyApartments ? 'ready apartments' : ''} ${constructionApartments ? '+ construction projects' : ''}`.trim(),
    },
  };

  // Write to both locations
  const jsonOutput = JSON.stringify(mergedData, null, 2);
  fs.writeFileSync(OUTPUT_FILE, jsonOutput);
  fs.writeFileSync(SRC_OUTPUT_FILE, jsonOutput);
  console.log(`✓ Merged and saved`);

  generateReport(mergedData);
}

main().catch((error) => {
  console.error("❌ Error during import:", error);
  process.exit(1);
});
