import * as fs from "fs";
import * as path from "path";

/**
 * Парсер для извлечения данных с сайтов застройщиков
 */

interface ApartmentProject {
  name: string;
  url: string;
  city: string;
  developer?: string;
  price?: number;
  pricePerM2?: number;
  area?: number;
  roi?: number;
  occupancy?: number;
  adr?: number;
  description?: string;
  images?: string[];
  status: string;
  contacts?: {
    phone?: string;
    email?: string;
  };
}

// Список URL для парсинга
const URLS = {
  "Санкт-Петербург": [
    "https://www.yesleader.ru",
    "https://inreit.ru/hers39",
    "https://inreit.ru/baza",
    "https://psk-info.ru/projects/sezony-vidovoj-kompleks",
    "https://psk-info.ru/projects",
    "https://plg.group/complex/promolodost/",
  ],
  "Крым": [
    "https://moreyalta.ru/plans/search",
    "https://акваделюкс.рф/?utm_source=chatgpt.com#slide-6",
    "https://hiddenapt.ru/?utm_source=chatgpt.com",
  ],
  "Москва": [
    "https://life.nice-loft.ru",
    "https://akvilon-signal.ru/signal-dlya-investicij",
  ],
  "Казань": [
    "https://yesgorki.ru",
    "https://markov-aparts.ru",
  ],
  "Екатеринбург": [
    "https://baden-apart.ru/projects/fabrika/",
    "https://baden-apart.ru/projects/turgoyak/",
  ],
};

/**
 * Извлечь название проекта из URL
 */
function extractProjectName(url: string): string {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace("www.", "");
    const pathSegments = urlObj.pathname.split("/").filter(s => s && s !== "projects" && s !== "complex");

    if (pathSegments.length > 0) {
      return pathSegments[pathSegments.length - 1]
        .replace(/-/g, " ")
        .replace(/_/g, " ")
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }

    return hostname.split(".")[0].toUpperCase();
  } catch {
    return url;
  }
}

/**
 * Определить застройщика по URL
 */
function extractDeveloper(url: string): string {
  const developerMap: Record<string, string> = {
    "yesleader.ru": "YE'S",
    "inreit.ru": "Inreit",
    "psk-info.ru": "ПСК",
    "plg.group": "Plaza Lotus Group",
    "moreyalta.ru": "Море Ялты",
    "акваделюкс.рф": "Аквалюкс",
    "hiddenapt.ru": "Hidden",
    "life.nice-loft.ru": "Nice Loft",
    "akvilon-signal.ru": "Akvilon",
    "yesgorki.ru": "YE'S",
    "markov-aparts.ru": "Markov",
    "baden-apart.ru": "Baden",
  };

  for (const [domain, developer] of Object.entries(developerMap)) {
    if (url.includes(domain)) {
      return developer;
    }
  }

  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    return hostname.split(".")[0].charAt(0).toUpperCase() + hostname.split(".")[0].slice(1);
  } catch {
    return "Unknown";
  }
}

/**
 * Основная функция парсинга
 */
async function main() {
  console.log("🔍 Начинаю парсинг сайтов застройщиков...\n");

  const allProjects: ApartmentProject[] = [];

  for (const [city, urls] of Object.entries(URLS)) {
    console.log(`\n📍 Город: ${city}`);
    console.log(`   Ссылок для парсинга: ${urls.length}\n`);

    for (const url of urls) {
      const projectName = extractProjectName(url);
      const developer = extractDeveloper(url);

      console.log(`   ⏳ Парсинг: ${projectName} (${developer})`);
      console.log(`      URL: ${url}`);

      const project: ApartmentProject = {
        name: projectName,
        url,
        city,
        developer,
        status: "for_sale", // Все объекты из списка - в продаже
        description: `Апарт-отель ${projectName} от застройщика ${developer}. Расположен в городе ${city}.`,
      };

      // В реальной версии здесь будет WebFetch для извлечения данных
      // Пока добавляем базовую информацию
      allProjects.push(project);

      console.log(`      ✅ Добавлен в базу\n`);
    }
  }

  console.log(`\n✅ Всего проектов собрано: ${allProjects.length}\n`);

  // Группировка по городам
  const projectsByCity: Record<string, number> = {};
  allProjects.forEach(p => {
    projectsByCity[p.city] = (projectsByCity[p.city] || 0) + 1;
  });

  console.log("📊 Распределение по городам:\n");
  Object.entries(projectsByCity).forEach(([city, count]) => {
    console.log(`   ${city}: ${count} проектов`);
  });

  // Сохраняем результаты
  const outputPath = path.join(process.cwd(), "data/inbox/websites-parsed.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(allProjects, null, 2), "utf-8");

  console.log(`\n💾 Данные сохранены: ${outputPath}`);

  // Создаем отчет для пользователя
  const reportPath = path.join(process.cwd(), "data/inbox/parsing-report.txt");
  const report = `
📊 ОТЧЕТ О ПАРСИНГЕ САЙТОВ ЗАСТРОЙЩИКОВ
Дата: ${new Date().toISOString()}

Всего ссылок: ${Object.values(URLS).flat().length}
Успешно обработано: ${allProjects.length}

Распределение по городам:
${Object.entries(projectsByCity).map(([city, count]) => `  ${city}: ${count} проектов`).join("\n")}

Следующий шаг:
Для извлечения детальных данных (цены, площади, доходности) необходимо:
1. Использовать WebFetch для каждого URL
2. Извлечь структурированные данные со страниц
3. Добавить данные в основную базу

Список застройщиков:
${Array.from(new Set(allProjects.map(p => p.developer))).join(", ")}
`;

  fs.writeFileSync(reportPath, report, "utf-8");
  console.log(`📄 Отчет сохранен: ${reportPath}\n`);

  console.log("✨ Готово! Базовая структура создана.");
  console.log("\n💡 Для извлечения детальных данных используйте WebFetch для каждого URL.");
}

main().catch(console.error);
