import * as fs from "fs";
import * as path from "path";

/**
 * Парсер для извлечения данных об апартаментах из HTML экспорта Telegram канала
 */

interface TelegramMessage {
  id: string;
  date: string;
  text: string;
  photos: string[];
}

interface ApartmentData {
  slug: string;
  title: string;
  city: string;
  format: string;
  status: string;
  price?: number;
  area?: number;
  pricePerM2?: number;
  roi?: number; // Return on investment (доходность в %)
  occupancy?: number;
  paybackYears?: number;
  description: string;
  photos: string[];
  sourceMessageId: string;
  sourceDate: string;
}

/**
 * Читает HTML файл и извлекает сообщения
 */
function parseHTMLMessages(htmlPath: string): TelegramMessage[] {
  const html = fs.readFileSync(htmlPath, "utf-8");
  const messages: TelegramMessage[] = [];

  // Регулярка для поиска сообщений с id
  const messageRegex = /<div class="message default clearfix" id="message(\d+)">([\s\S]*?)<\/div>\s*(?=<div class="message|$)/g;

  let match;
  while ((match = messageRegex.exec(html)) !== null) {
    const messageId = match[1];
    const messageContent = match[2];

    // Извлечь дату
    const dateMatch = messageContent.match(/title="([^"]+)"/);
    const date = dateMatch ? dateMatch[1] : "";

    // Извлечь текст
    const textMatch = messageContent.match(/<div class="text">([\s\S]*?)<\/div>/);
    let text = textMatch ? textMatch[1] : "";

    // Очистить HTML теги из текста
    text = text
      .replace(/<br>/g, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&laquo;/g, "«")
      .replace(/&raquo;/g, "»")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&amp;/g, "&")
      .trim();

    // Извлечь фото
    const photoMatches = messageContent.matchAll(/href="(photos\/[^"]+)"/g);
    const photos = Array.from(photoMatches).map(m => m[1]);

    if (text || photos.length > 0) {
      messages.push({
        id: messageId,
        date,
        text,
        photos,
      });
    }
  }

  return messages;
}

/**
 * Извлекает данные об апартаментах из сообщений
 */
function extractApartmentData(messages: TelegramMessage[]): ApartmentData[] {
  const apartments: ApartmentData[] = [];

  // Ключевые слова для поиска сообщений об апартаментах
  const apartmentKeywords = [
    /МФК|апарт-отел|сервисных апартаментов|апарт-комплекс|комплекс апартаментов/i,
    /от \d+[,.]?\d*\s*млн\s*рублей/i,
    /площадью \d+[,.]?\d*\s*кв\.\s*м/i,
  ];

  for (const message of messages) {
    // Проверка, содержит ли сообщение информацию об апартаментах
    const hasApartmentInfo = apartmentKeywords.some(keyword => keyword.test(message.text));

    if (!hasApartmentInfo || message.text.length < 100) {
      continue;
    }

    // Извлечь название проекта
    const titleMatches = [
      /МФК\s+[«""]([^»""]+)[»""]/i,
      /апарт-отел[ь]?\s+[«""]?([А-ЯЁ][^»"".,\n]+)[»"".,]?/i,
      /комплекс[а]?\s+[«""]([^»""]+)[»""]/i,
      /проект[е]?\s+[«""]?([А-ЯЁ][^»"".,\n]+)[»"".,]?/i,
      /[«""]([А-ЯЁ][А-ЯЁа-яё\s\-]+)[»""]/,
    ];

    let title = "";
    for (const regex of titleMatches) {
      const match = message.text.match(regex);
      if (match) {
        title = match[1].trim();
        if (title.length > 5 && title.length < 50) {
          break;
        }
      }
    }

    if (!title) {
      // Попробовать извлечь из первых слов
      const firstLine = message.text.split("\n")[0];
      const boldMatch = firstLine.match(/([А-ЯЁ][А-ЯЁа-яё\s\-]{3,40})/);
      if (boldMatch) {
        title = boldMatch[1].trim();
      }
    }

    // Извлечь цену
    let price: number | undefined;
    const priceMatch = message.text.match(/от\s+(\d+[,.]?\d*)\s*млн\s*рублей/i);
    if (priceMatch) {
      price = parseFloat(priceMatch[1].replace(",", ".")) * 1_000_000;
    }

    // Извлечь площадь
    let area: number | undefined;
    const areaMatch = message.text.match(/площадью\s+(\d+[,.]?\d*)\s*кв\.\s*м/i);
    if (areaMatch) {
      area = parseFloat(areaMatch[1].replace(",", "."));
    }

    // Извлечь цену за м²
    let pricePerM2: number | undefined;
    const pricePerM2Match = message.text.match(/(\d+)\s*тыс\.\s*руб\.\s*[\/]?\s*кв\.\s*м/i);
    if (pricePerM2Match) {
      pricePerM2 = parseInt(pricePerM2Match[1]) * 1000;
    }

    // Извлечь доходность
    let roi: number | undefined;
    const roiMatches = [
      /доходность[ью]?\s*[-–—]?\s*(?:до|от)?\s*(\d+)%/i,
      /(\d+)%\s*годовых/i,
    ];
    for (const regex of roiMatches) {
      const match = message.text.match(regex);
      if (match) {
        roi = parseInt(match[1]);
        break;
      }
    }

    // Извлечь город
    let city = "Санкт-Петербург"; // По умолчанию
    if (/Москв/i.test(message.text)) {
      city = "Москва";
    } else if (/Ленобласт|Выборг|Всеволож/i.test(message.text)) {
      city = "Ленинградская область";
    }

    // Определить статус
    let status = "active";
    if (/строит|возводит|планирует/i.test(message.text)) {
      status = "construction";
    } else if (/продан|завершен|закрыт/i.test(message.text)) {
      status = "sold";
    }

    // Создать slug
    const slug = title
      .toLowerCase()
      .replace(/[«»"".]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-zа-яё0-9\-]/g, "")
      .substring(0, 50);

    if (!slug || slug.length < 3) {
      continue;
    }

    // Рассчитать окупаемость
    let paybackYears: number | undefined;
    if (roi && roi > 0) {
      paybackYears = Math.round((100 / roi) * 10) / 10;
    }

    const apartment: ApartmentData = {
      slug,
      title,
      city,
      format: "apart-hotel",
      status,
      price,
      area,
      pricePerM2,
      roi,
      paybackYears,
      description: message.text.substring(0, 500),
      photos: message.photos,
      sourceMessageId: message.id,
      sourceDate: message.date,
    };

    apartments.push(apartment);
  }

  return apartments;
}

/**
 * Основная функция парсинга
 */
async function main() {
  const telegramExportPath = "/Users/timofej3raze/Desktop/для клода база данных /ChatExport_2026-01-29";

  console.log("🔍 Начинаю парсинг Telegram экспорта...\n");

  // Парсим все HTML файлы
  const htmlFiles = ["messages.html", "messages2.html", "messages3.html"];
  let allMessages: TelegramMessage[] = [];

  for (const file of htmlFiles) {
    const filePath = path.join(telegramExportPath, file);
    console.log(`📄 Читаю ${file}...`);
    const messages = parseHTMLMessages(filePath);
    console.log(`   Найдено сообщений: ${messages.length}`);
    allMessages = allMessages.concat(messages);
  }

  console.log(`\n📊 Всего сообщений: ${allMessages.length}\n`);

  // Извлекаем данные об апартаментах
  console.log("🏢 Извлекаю данные об апартаментах...\n");
  const apartments = extractApartmentData(allMessages);

  console.log(`✅ Найдено апартаментов: ${apartments.length}\n`);

  // Показываем найденные объекты
  console.log("📋 Найденные объекты:\n");
  apartments.forEach((apt, idx) => {
    console.log(`${idx + 1}. ${apt.title}`);
    console.log(`   Город: ${apt.city}`);
    if (apt.price) console.log(`   Цена: ${apt.price.toLocaleString("ru-RU")} ₽`);
    if (apt.area) console.log(`   Площадь: ${apt.area} м²`);
    if (apt.pricePerM2) console.log(`   Цена за м²: ${apt.pricePerM2.toLocaleString("ru-RU")} ₽/м²`);
    if (apt.roi) console.log(`   Доходность: ${apt.roi}% годовых`);
    console.log(`   Фото: ${apt.photos.length} шт.`);
    console.log(`   Статус: ${apt.status}`);
    console.log("");
  });

  // Сохраняем в JSON
  const outputPath = path.join(process.cwd(), "data/inbox/telegram-parsed.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(apartments, null, 2), "utf-8");

  console.log(`\n💾 Данные сохранены в: ${outputPath}`);
}

main().catch(console.error);
