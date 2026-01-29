import * as fs from "fs";
import * as path from "path";

/**
 * Извлечение полезной информации из Telegram для калькулятора и базы
 */

interface TelegramMessage {
  id: string;
  date: string;
  text: string;
  photos: string[];
}

interface ProjectData {
  name: string;
  price?: number;
  pricePerM2?: number;
  area?: number;
  roi?: number;
  occupancy?: number;
  adr?: number;
  location?: string;
  developer?: string;
  managementCompany?: string;
  rooms?: number;
  date: string;
  sourceText: string;
}

interface CalculatorInsights {
  averageROI: number[];
  averageOccupancy: number[];
  averageADR: { min: number; max: number; avg: number };
  managementFees: { company: string; fee: string }[];
  utilityInfo: string[];
  paybackYears: number[];
  priceGrowth: string[];
}

// Читаем HTML файлы и парсим сообщения
function parseHTMLMessages(htmlPath: string): TelegramMessage[] {
  const html = fs.readFileSync(htmlPath, "utf-8");
  const messages: TelegramMessage[] = [];

  const messageRegex = /<div class="message default clearfix" id="message(\d+)">([\s\S]*?)<\/div>\s*(?=<div class="message|$)/g;

  let match;
  while ((match = messageRegex.exec(html)) !== null) {
    const messageId = match[1];
    const messageContent = match[2];

    const dateMatch = messageContent.match(/title="([^"]+)"/);
    const date = dateMatch ? dateMatch[1] : "";

    const textMatch = messageContent.match(/<div class="text">([\s\S]*?)<\/div>/);
    let text = textMatch ? textMatch[1] : "";

    text = text
      .replace(/<br>/g, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&laquo;/g, "«")
      .replace(/&raquo;/g, "»")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&amp;/g, "&")
      .trim();

    const photoMatches = messageContent.matchAll(/href="(photos\/[^"]+)"/g);
    const photos = Array.from(photoMatches).map(m => m[1]);

    if (text || photos.length > 0) {
      messages.push({ id: messageId, date, text, photos });
    }
  }

  return messages;
}

// Извлечь конкретные проекты с данными
function extractProjects(messages: TelegramMessage[]): ProjectData[] {
  const projects: ProjectData[] = [];

  // Известные проекты для поиска
  const knownProjects = [
    "START", "НАЧАЛО", "AVENUE", "VALO", "WINGS", "YE'S", "Vertical",
    "ARTSTUDIO", "ArtStudio", "Docklands", "cOASIS", "YARD", "IN2IT",
    "ПРО.Молодость", "ПРО.МОЛОДОСТЬ", "Putilov Apart", "STATUS", "Like",
    "Русские сезоны", "Royal Park", "Дом Балле", "ZOOM", "Industrial",
    "Primorsky", "Mercure", "Ramada", "IZZZI", "Sokroma"
  ];

  for (const msg of messages) {
    const text = msg.text;
    if (text.length < 100) continue;

    // Ищем упоминания проектов
    for (const projectName of knownProjects) {
      const regex = new RegExp(projectName, "i");
      if (regex.test(text)) {
        const project: ProjectData = {
          name: projectName,
          date: msg.date,
          sourceText: text.substring(0, 500),
        };

        // Извлекаем цену
        const priceMatches = [
          /от\s+(\d+[,.]?\d*)\s*млн\s*рублей/gi,
          /цена[й]?\s*[-–—]?\s*(\d+[,.]?\d*)\s*млн/gi,
          /стоимость[ью]?\s*[-–—]?\s*(\d+[,.]?\d*)\s*млн/gi,
        ];
        for (const priceRegex of priceMatches) {
          const match = text.match(priceRegex);
          if (match && match[1]) {
            project.price = parseFloat(match[1].replace(",", ".")) * 1_000_000;
            break;
          }
        }

        // Извлекаем цену за м²
        const priceM2Matches = [
          /(\d+)\s*тыс\.\s*руб\.?\s*[\/]?\s*кв\.\s*м/gi,
          /(\d+)\s*тысяч?\s*за\s*кв/gi,
        ];
        for (const regex of priceM2Matches) {
          const match = text.match(regex);
          if (match && match[1]) {
            project.pricePerM2 = parseInt(match[1]) * 1000;
            break;
          }
        }

        // Извлекаем площадь
        const areaMatches = [
          /площадью\s+(\d+[,.]?\d*)\s*кв\.\s*м/gi,
          /(\d+[,.]?\d*)\s*кв\.\s*м/gi,
        ];
        for (const regex of areaMatches) {
          const match = text.match(regex);
          if (match && match[1]) {
            const area = parseFloat(match[1].replace(",", "."));
            if (area > 10 && area < 200) {
              project.area = area;
              break;
            }
          }
        }

        // Извлекаем доходность (ROI)
        const roiMatches = [
          /доходность[ью]?\s*[-–—]?\s*(?:до|от)?\s*(\d+)%/gi,
          /(\d+)%\s*годовых/gi,
        ];
        for (const regex of roiMatches) {
          const match = text.match(regex);
          if (match && match[1]) {
            const roi = parseInt(match[1]);
            if (roi >= 5 && roi <= 20) {
              project.roi = roi;
              break;
            }
          }
        }

        // Извлекаем загрузку (occupancy)
        const occMatches = [
          /загрузк[аи]\s*[-–—]?\s*(\d+)%/gi,
          /occupancy[^\d]*(\d+)%/gi,
        ];
        for (const regex of occMatches) {
          const match = text.match(regex);
          if (match && match[1]) {
            project.occupancy = parseInt(match[1]);
            break;
          }
        }

        // Извлекаем ADR
        const adrMatches = [
          /ADR[^\d]*(\d+[,.]?\d*)\s*(?:тыс\.|тысяч)/gi,
          /средняя\s+цена[^\d]*(\d+[,.]?\d*)\s*тыс/gi,
        ];
        for (const regex of adrMatches) {
          const match = text.match(regex);
          if (match && match[1]) {
            project.adr = parseFloat(match[1].replace(",", ".")) * 1000;
            break;
          }
        }

        // Извлекаем расположение
        const locationMatches = [
          /на\s+([\w\s-]+(?:улиц|проспект|шоссе|набережн)[\w\s-]*)/gi,
          /в\s+районе\s+([\w\s-]+)/gi,
          /метро\s+[«"]?([^»".,\n]+)[»"]?/gi,
        ];
        for (const regex of locationMatches) {
          const match = text.match(regex);
          if (match && match[1]) {
            project.location = match[1].trim();
            break;
          }
        }

        // Извлекаем застройщика
        const devMatches = [
          /застройщик\s+[«"]?([^»".,\n]+)[»"]?/gi,
          /компани[ия]\s+[«"]?([^»".,\n]+)[»"]?/gi,
          /девелопер\s+[«"]?([^»".,\n]+)[»"]?/gi,
        ];
        for (const regex of devMatches) {
          const match = text.match(regex);
          if (match && match[1]) {
            project.developer = match[1].trim();
            break;
          }
        }

        // Добавляем проект, если есть хоть какие-то данные
        if (project.price || project.pricePerM2 || project.roi || project.occupancy) {
          projects.push(project);
        }
      }
    }
  }

  return projects;
}

// Извлечь инсайты для калькулятора
function extractCalculatorInsights(messages: TelegramMessage[]): CalculatorInsights {
  const insights: CalculatorInsights = {
    averageROI: [],
    averageOccupancy: [],
    averageADR: { min: 0, max: 0, avg: 0 },
    managementFees: [],
    utilityInfo: [],
    paybackYears: [],
    priceGrowth: [],
  };

  for (const msg of messages) {
    const text = msg.text;

    // Ищем доходность
    const roiRegex = /доходность[ью]?\s*[-–—]?\s*(?:до|от)?\s*(\d+)%/gi;
    let match;
    while ((match = roiRegex.exec(text)) !== null) {
      if (match && match[1]) {
        const roi = parseInt(match[1]);
        if (roi >= 5 && roi <= 20) {
          insights.averageROI.push(roi);
        }
      }
    }

    // Ищем загрузку
    const occRegex = /загрузк[аи]\s*[-–—]?\s*(\d+)%/gi;
    while ((match = occRegex.exec(text)) !== null) {
      if (match && match[1]) {
        const occ = parseInt(match[1]);
        if (occ >= 30 && occ <= 100) {
          insights.averageOccupancy.push(occ);
        }
      }
    }

    // Ищем информацию об управляющих компаниях
    if (/управляющ[ая]я\s+компани[ия]/i.test(text)) {
      const ukMatch = text.match(/управляющ[ая]я\s+компани[ия]\s+[«"]?([^»".,\n]+)[»"]?/i);
      if (ukMatch && ukMatch[1]) {
        const company = ukMatch[1].trim();

        // Ищем упоминание комиссии
        const feeMatch = text.match(/(?:комисси[ия]|вознаграждени[ие])[^\d]*(\d+)%/i);
        if (feeMatch && feeMatch[1]) {
          insights.managementFees.push({
            company,
            fee: feeMatch[1] + "%",
          });
        }
      }
    }

    // Ищем информацию о коммунальных платежах
    if (/коммунальн[ые]|тариф[ы]/i.test(text)) {
      if (text.length < 500) {
        insights.utilityInfo.push(text);
      }
    }

    // Ищем информацию об окупаемости
    const paybackRegex = /окупаемость[ью]?\s*[-–—]?\s*(\d+(?:[,.]\d+)?)\s*(?:лет|год)/gi;
    while ((match = paybackRegex.exec(text)) !== null) {
      if (match && match[1]) {
        const years = parseFloat(match[1].replace(",", "."));
        if (years >= 3 && years <= 20) {
          insights.paybackYears.push(years);
        }
      }
    }

    // Ищем информацию о росте цен
    if (/рост[^\d]*(\d+)%/i.test(text) && /цен|стоимост/i.test(text)) {
      const growthMatch = text.match(/рост[^\d]*(\d+)%/i);
      if (growthMatch && text.length < 300) {
        insights.priceGrowth.push(text.substring(0, 200));
      }
    }
  }

  // Вычисляем средние значения
  if (insights.averageROI.length > 0) {
    const sum = insights.averageROI.reduce((a, b) => a + b, 0);
    insights.averageROI = [Math.round(sum / insights.averageROI.length)];
  }

  if (insights.averageOccupancy.length > 0) {
    const sum = insights.averageOccupancy.reduce((a, b) => a + b, 0);
    insights.averageOccupancy = [Math.round(sum / insights.averageOccupancy.length)];
  }

  return insights;
}

async function main() {
  console.log("🔍 Анализирую данные из Telegram...\n");

  const telegramExportPath = "/Users/timofej3raze/Desktop/для клода база данных /ChatExport_2026-01-29";
  const htmlFiles = ["messages.html", "messages2.html", "messages3.html"];

  let allMessages: TelegramMessage[] = [];
  for (const file of htmlFiles) {
    const filePath = path.join(telegramExportPath, file);
    const messages = parseHTMLMessages(filePath);
    allMessages = allMessages.concat(messages);
  }

  console.log(`📊 Всего сообщений: ${allMessages.length}\n`);

  // Извлекаем проекты
  console.log("🏢 Извлекаю данные о проектах...\n");
  const projects = extractProjects(allMessages);

  // Группируем по имени и выбираем лучшие данные
  const uniqueProjects = projects.reduce((acc, project) => {
    const existing = acc.find(p => p.name.toLowerCase() === project.name.toLowerCase());
    if (!existing) {
      acc.push(project);
    } else {
      // Мержим данные
      if (project.price && !existing.price) existing.price = project.price;
      if (project.pricePerM2 && !existing.pricePerM2) existing.pricePerM2 = project.pricePerM2;
      if (project.area && !existing.area) existing.area = project.area;
      if (project.roi && !existing.roi) existing.roi = project.roi;
      if (project.occupancy && !existing.occupancy) existing.occupancy = project.occupancy;
      if (project.adr && !existing.adr) existing.adr = project.adr;
      if (project.location && !existing.location) existing.location = project.location;
      if (project.developer && !existing.developer) existing.developer = project.developer;
    }
    return acc;
  }, [] as ProjectData[]);

  console.log(`✅ Найдено проектов: ${uniqueProjects.length}\n`);

  // Показываем топ-10 проектов с полными данными
  const completeProjects = uniqueProjects
    .filter(p => p.price && p.area && (p.roi || p.occupancy))
    .sort((a, b) => {
      const aScore = (a.price ? 1 : 0) + (a.area ? 1 : 0) + (a.roi ? 1 : 0) + (a.occupancy ? 1 : 0) + (a.adr ? 1 : 0);
      const bScore = (b.price ? 1 : 0) + (b.area ? 1 : 0) + (b.roi ? 1 : 0) + (b.occupancy ? 1 : 0) + (b.adr ? 1 : 0);
      return bScore - aScore;
    });

  console.log("📋 Топ-10 проектов с полными данными:\n");
  completeProjects.slice(0, 10).forEach((p, idx) => {
    console.log(`${idx + 1}. ${p.name}`);
    if (p.price) console.log(`   Цена: ${p.price.toLocaleString("ru-RU")} ₽`);
    if (p.pricePerM2) console.log(`   Цена/м²: ${p.pricePerM2.toLocaleString("ru-RU")} ₽/м²`);
    if (p.area) console.log(`   Площадь: ${p.area} м²`);
    if (p.roi) console.log(`   ROI: ${p.roi}%`);
    if (p.occupancy) console.log(`   Загрузка: ${p.occupancy}%`);
    if (p.adr) console.log(`   ADR: ${p.adr.toLocaleString("ru-RU")} ₽`);
    if (p.location) console.log(`   Локация: ${p.location}`);
    if (p.developer) console.log(`   Застройщик: ${p.developer}`);
    console.log("");
  });

  // Извлекаем инсайты для калькулятора
  console.log("\n💡 Извлекаю инсайты для калькулятора...\n");
  const insights = extractCalculatorInsights(allMessages);

  console.log("📊 Статистика для калькулятора:\n");
  if (insights.averageROI.length > 0) {
    console.log(`   Средняя доходность: ${insights.averageROI[0]}%`);
  }
  if (insights.averageOccupancy.length > 0) {
    console.log(`   Средняя загрузка: ${insights.averageOccupancy[0]}%`);
  }
  if (insights.managementFees.length > 0) {
    console.log(`\n   Управляющие компании:`);
    insights.managementFees.forEach(mf => {
      console.log(`   - ${mf.company}: комиссия ${mf.fee}`);
    });
  }
  if (insights.paybackYears.length > 0) {
    const avgPayback = insights.paybackYears.reduce((a, b) => a + b, 0) / insights.paybackYears.length;
    console.log(`\n   Средняя окупаемость: ${avgPayback.toFixed(1)} лет`);
  }

  // Сохраняем результаты
  const outputPath = path.join(process.cwd(), "data/inbox/telegram-useful-data.json");
  fs.writeFileSync(
    outputPath,
    JSON.stringify(
      {
        projects: completeProjects,
        calculatorInsights: insights,
        extractedAt: new Date().toISOString(),
      },
      null,
      2
    ),
    "utf-8"
  );

  console.log(`\n💾 Данные сохранены: ${outputPath}`);
  console.log(`\n✨ Готово!`);
  console.log(`   - Проектов для базы: ${completeProjects.length}`);
  console.log(`   - Инсайтов для калькулятора: собрано`);
}

main().catch(console.error);
