import * as fs from "fs";
import * as path from "path";

/**
 * Очистка и фильтрация данных из Telegram для основной базы
 */

interface TelegramApartment {
  slug: string;
  title: string;
  city: string;
  format: string;
  status: string;
  price?: number;
  area?: number;
  pricePerM2?: number;
  roi?: number;
  occupancy?: number;
  paybackYears?: number;
  description: string;
  photos: string[];
  sourceMessageId: string;
  sourceDate: string;
}

interface CleanedApartment {
  slug: string;
  title: string;
  city: string;
  country: string;
  format: string;
  status: string;
  updatedAt: string;
  price: number;
  area: number;
  pricePerM2: number;
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
}

/**
 * Список известных апарт-отелей Петербурга для фильтрации
 */
const KNOWN_PROJECTS = [
  "START", "НАЧАЛО", "AVENUE", "VALO", "WINGS", "YE'S", "Vertical",
  "ARTSTUDIO", "Docklands", "cOASIS", "YARD", "IN2IT", "ПРО.Молодость",
  "Putilov Apart", "STATUS", "Like", "Русские сезоны", "Royal Park",
  "Дом Балле", "ZOOM", "Industrial", "Primorsky", "Mercure", "Ramada"
];

/**
 * Проверяет, является ли название валидным проектом
 */
function isValidProject(title: string): boolean {
  // Проверка на минимальную длину
  if (title.length < 4 || title.length > 100) {
    return false;
  }

  // Проверка на стоп-слова (это не проекты, а шум)
  const stopWords = [
    "всего", "штук", "скорее", "будет", "можно", "нужно", "вот", "еще",
    "самых", "одно", "этом", "году", "года", "года", "должны", "могут",
    "занятное", "новым", "будь", "личный", "кабинет", "статистика",
    "метр", "квадратный", "оскар", "бурделки", "коммунальные",
    "инвестируете", "покупка", "доли", "сколько", "можно", "заработать"
  ];

  const lowerTitle = title.toLowerCase();
  for (const stopWord of stopWords) {
    if (lowerTitle === stopWord || lowerTitle.startsWith(stopWord + " ")) {
      return false;
    }
  }

  // Проверка на известные проекты (приоритет)
  for (const knownProject of KNOWN_PROJECTS) {
    if (lowerTitle.includes(knownProject.toLowerCase())) {
      return true;
    }
  }

  // Проверка на паттерны настоящих проектов
  const projectPatterns = [
    /МФК/i,
    /апарт-отел/i,
    /апарт-комплекс/i,
    /комплекс.*апартамент/i,
    /^[A-ZА-ЯЁ][A-ZА-ЯЁ\s&'-]+$/i, // CAPS проекты типа VALO, START
  ];

  return projectPatterns.some(pattern => pattern.test(title));
}

/**
 * Оценка качества данных (0-100)
 */
function calculateDataQuality(apt: TelegramApartment): number {
  let score = 0;

  // Название проекта (базовые 20 баллов за валидность)
  if (isValidProject(apt.title)) {
    score += 20;
  }

  // Цена (20 баллов)
  if (apt.price && apt.price > 500000 && apt.price < 50000000) {
    score += 20;
  }

  // Площадь (15 баллов)
  if (apt.area && apt.area > 10 && apt.area < 200) {
    score += 15;
  }

  // Цена за м² (15 баллов)
  if (apt.pricePerM2 && apt.pricePerM2 > 50000 && apt.pricePerM2 < 500000) {
    score += 15;
  }

  // Доходность (15 баллов)
  if (apt.roi && apt.roi > 3 && apt.roi < 25) {
    score += 15;
  }

  // Описание (10 баллов)
  if (apt.description && apt.description.length > 200) {
    score += 10;
  }

  // Фото (5 баллов)
  if (apt.photos && apt.photos.length > 0) {
    score += 5;
  }

  return score;
}

/**
 * Преобразует Telegram данные в формат базы Apart Guru
 */
function transformToApartGuruFormat(apt: TelegramApartment): CleanedApartment | null {
  // Пропускаем записи с низким качеством данных
  const quality = calculateDataQuality(apt);
  if (quality < 40) {
    return null;
  }

  // Если нет цены, пытаемся вычислить из price_m2 и area
  let price = apt.price || 0;
  if (!price && apt.pricePerM2 && apt.area) {
    price = apt.pricePerM2 * apt.area;
  }

  // Если нет площади, пытаемся вычислить из price и price_m2
  let area = apt.area || 0;
  if (!area && price && apt.pricePerM2) {
    area = price / apt.pricePerM2;
  }

  // Если нет price_m2, вычисляем
  let pricePerM2 = apt.pricePerM2 || 0;
  if (!pricePerM2 && price && area) {
    pricePerM2 = price / area;
  }

  // Пропускаем, если недостаточно данных
  if (!price || !area || !pricePerM2) {
    return null;
  }

  // Вычисляем доходность на м²/месяц
  // Формула: цена * ROI% / 12 месяцев / площадь
  let revPerM2Month = 0;
  if (apt.roi) {
    const annualRevenue = price * (apt.roi / 100);
    revPerM2Month = annualRevenue / 12 / area;
  } else {
    // Если нет ROI, используем среднюю доходность 8%
    const annualRevenue = price * 0.08;
    revPerM2Month = annualRevenue / 12 / area;
  }

  // Вычисляем NOI (годовой доход)
  const noiYear = apt.roi ? price * (apt.roi / 100) : price * 0.08;

  // Вычисляем окупаемость
  const paybackYears = apt.paybackYears || (apt.roi ? 100 / apt.roi : 12.5);

  // Определяем страну
  const country = apt.city.includes("Москва") ? "Россия" : "Россия";

  // Создаем slug (проверяем дубликаты)
  const slug = apt.slug;

  // ADR (средняя стоимость суток) - примерная оценка
  // Формула: (доход в месяц * 12) / (365 дней * загрузка)
  const occupancy = apt.occupancy || 70; // По умолчанию 70%
  const dailyRevenue = (revPerM2Month * area) / 30; // Доход в день
  const adr = occupancy > 0 ? Math.round((dailyRevenue * 100) / occupancy) : 3000;

  // Уровень риска
  let riskLevel = "medium";
  if (apt.status === "active" && apt.roi && apt.roi > 10) {
    riskLevel = "low";
  } else if (apt.status === "construction" || (apt.roi && apt.roi > 15)) {
    riskLevel = "high";
  }

  // Сезонность (для Петербурга: высокий сезон май-сентябрь)
  const seasonality = apt.city.includes("Петербург") || apt.city.includes("СПб")
    ? [65, 68, 75, 82, 90, 95, 98, 95, 88, 78, 70, 68] // Пик летом
    : [75, 75, 78, 80, 82, 85, 88, 87, 83, 80, 77, 75]; // Равномерно

  return {
    slug,
    title: apt.title,
    city: apt.city,
    country,
    format: apt.format,
    status: apt.status,
    updatedAt: apt.sourceDate || new Date().toISOString(),
    price: Math.round(price),
    area: Math.round(area * 10) / 10,
    pricePerM2: Math.round(pricePerM2),
    revPerM2Month: Math.round(revPerM2Month),
    noiYear: Math.round(noiYear),
    paybackYears: Math.round(paybackYears * 10) / 10,
    occupancy,
    adr: Math.round(adr),
    riskLevel,
    summary: apt.description.substring(0, 300) + "...",
    why: [
      "Реальные показатели доходности",
      "Проверенная управляющая компания",
      "Удобное расположение"
    ],
    risks: [
      "Колебания спроса на аренду",
      "Изменение рыночных условий",
      "Конкуренция с другими объектами"
    ],
    seasonality,
  };
}

/**
 * Основная функция очистки
 */
async function main() {
  console.log("🧹 Начинаю очистку данных из Telegram...\n");

  // Читаем спарсенные данные
  const inputPath = path.join(process.cwd(), "data/inbox/telegram-parsed.json");
  const rawData: TelegramApartment[] = JSON.parse(fs.readFileSync(inputPath, "utf-8"));

  console.log(`📊 Исходных записей: ${rawData.length}\n`);

  // Фильтруем и очищаем
  const cleanedData: CleanedApartment[] = [];
  const skipped: { title: string; reason: string; quality: number }[] = [];

  for (const apt of rawData) {
    const quality = calculateDataQuality(apt);

    if (!isValidProject(apt.title)) {
      skipped.push({ title: apt.title, reason: "Невалидное название", quality });
      continue;
    }

    if (quality < 40) {
      skipped.push({ title: apt.title, reason: `Низкое качество данных (${quality}/100)`, quality });
      continue;
    }

    const cleaned = transformToApartGuruFormat(apt);
    if (cleaned) {
      cleanedData.push(cleaned);
    } else {
      skipped.push({ title: apt.title, reason: "Недостаточно данных для расчетов", quality });
    }
  }

  // Удаляем дубликаты по slug
  const uniqueData = cleanedData.reduce((acc, item) => {
    const existing = acc.find(a => a.slug === item.slug);
    if (!existing) {
      acc.push(item);
    } else {
      // Оставляем запись с большим количеством данных
      const existingQuality = (existing.price ? 1 : 0) + (existing.area ? 1 : 0) + (existing.revPerM2Month ? 1 : 0);
      const newQuality = (item.price ? 1 : 0) + (item.area ? 1 : 0) + (item.revPerM2Month ? 1 : 0);
      if (newQuality > existingQuality) {
        acc[acc.indexOf(existing)] = item;
      }
    }
    return acc;
  }, [] as CleanedApartment[]);

  // Сортируем по качеству (сначала с большим количеством данных)
  uniqueData.sort((a, b) => {
    const aScore = (a.price ? 1 : 0) + (a.area ? 1 : 0) + (a.revPerM2Month ? 1 : 0) + (a.noiYear ? 1 : 0);
    const bScore = (b.price ? 1 : 0) + (b.area ? 1 : 0) + (b.revPerM2Month ? 1 : 0) + (b.noiYear ? 1 : 0);
    return bScore - aScore;
  });

  console.log(`✅ Очищенных записей: ${uniqueData.length}\n`);
  console.log(`❌ Пропущено записей: ${rawData.length - uniqueData.length}\n`);

  // Показываем топ-10 очищенных записей
  console.log("📋 Топ-10 очищенных записей:\n");
  uniqueData.slice(0, 10).forEach((apt, idx) => {
    console.log(`${idx + 1}. ${apt.title}`);
    console.log(`   Город: ${apt.city}`);
    console.log(`   Цена: ${apt.price.toLocaleString("ru-RU")} ₽`);
    console.log(`   Площадь: ${apt.area} м²`);
    console.log(`   Доход ₽/м²/мес: ${apt.revPerM2Month.toLocaleString("ru-RU")}`);
    console.log(`   NOI год: ${apt.noiYear.toLocaleString("ru-RU")} ₽`);
    console.log(`   Окупаемость: ${apt.paybackYears} лет`);
    console.log("");
  });

  // Показываем статистику пропущенных
  console.log("\n📉 Причины пропуска (топ-10):\n");
  const skipReasons = skipped.reduce((acc, item) => {
    acc[item.reason] = (acc[item.reason] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  Object.entries(skipReasons)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([reason, count]) => {
      console.log(`   ${reason}: ${count} записей`);
    });

  // Сохраняем очищенные данные
  const outputPath = path.join(process.cwd(), "data/inbox/telegram-cleaned.json");
  fs.writeFileSync(outputPath, JSON.stringify(uniqueData, null, 2), "utf-8");

  console.log(`\n💾 Очищенные данные сохранены: ${outputPath}`);

  // Сохраняем список пропущенных для анализа
  const skippedPath = path.join(process.cwd(), "data/inbox/telegram-skipped.json");
  fs.writeFileSync(skippedPath, JSON.stringify(skipped, null, 2), "utf-8");

  console.log(`💾 Пропущенные данные сохранены: ${skippedPath}`);
  console.log(`\n✨ Готово! Качественных записей: ${uniqueData.length}`);
}

main().catch(console.error);
