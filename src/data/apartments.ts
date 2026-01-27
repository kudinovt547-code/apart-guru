/**
 * База готовых инвестиционных апартаментов
 * Все показатели ADR, OCC и Price приведены к актуальным рыночным значениям 2026г.
 */

export interface Apartment {
  id: number;
  city_code: number;
  city: string;
  name: string;
  class: "Comfort" | "Business";
  price_m2: number;
  adr_low: number;
  adr_high: number;
  occ_avg: number;
  uk_fee: number;
  model: "Short" | "Long" | "Hybrid";
  loc_class: "Prime" | "Center" | "Hub";
}

// Полная база инвестиционных апартаментов с классом локации (Топ-5 городов РФ)
export const APARTMENTS_DB: Apartment[] = [
  // --- САНКТ-ПЕТЕРБУРГ ---
  { id: 101, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Moyka-1", class: "Business", price_m2: 480000, adr_low: 4500, adr_high: 9800, occ_avg: 0.82, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 102, city_code: 1, city: "Санкт-Петербург", name: "iZZZi у Гостиного двора", class: "Business", price_m2: 540000, adr_low: 5200, adr_high: 11500, occ_avg: 0.86, uk_fee: 0.20, model: "Short", loc_class: "Center" },
  { id: 103, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Sennaya Square", class: "Business", price_m2: 430000, adr_low: 4200, adr_high: 8800, occ_avg: 0.81, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 104, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort on Ligovskiy", class: "Business", price_m2: 395000, adr_low: 3800, adr_high: 7800, occ_avg: 0.79, uk_fee: 0.25, model: "Hybrid", loc_class: "Center" },
  { id: 105, city_code: 1, city: "Санкт-Петербург", name: "iZZZi на Банковском", class: "Business", price_m2: 510000, adr_low: 4900, adr_high: 10800, occ_avg: 0.84, uk_fee: 0.20, model: "Short", loc_class: "Center" },
  { id: 106, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Griboedov", class: "Business", price_m2: 460000, adr_low: 4600, adr_high: 9200, occ_avg: 0.83, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 107, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Smolnyy", class: "Business", price_m2: 410000, adr_low: 4000, adr_high: 8200, occ_avg: 0.77, uk_fee: 0.25, model: "Hybrid", loc_class: "Center" },
  { id: 108, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Mariinsky", class: "Business", price_m2: 425000, adr_low: 4100, adr_high: 8500, occ_avg: 0.79, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 109, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Old Nevsky", class: "Business", price_m2: 490000, adr_low: 4800, adr_high: 10500, occ_avg: 0.84, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 110, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort on Petrogradka", class: "Business", price_m2: 470000, adr_low: 4500, adr_high: 9400, occ_avg: 0.81, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 111, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Marata", class: "Business", price_m2: 440000, adr_low: 4300, adr_high: 8900, occ_avg: 0.80, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 112, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Ligovskiy", class: "Business", price_m2: 405000, adr_low: 3900, adr_high: 8000, occ_avg: 0.78, uk_fee: 0.25, model: "Hybrid", loc_class: "Center" },
  { id: 113, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Neva", class: "Business", price_m2: 415000, adr_low: 4100, adr_high: 8400, occ_avg: 0.77, uk_fee: 0.25, model: "Hybrid", loc_class: "Center" },
  { id: 114, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Moyka", class: "Business", price_m2: 500000, adr_low: 5000, adr_high: 11000, occ_avg: 0.85, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 115, city_code: 1, city: "Санкт-Петербург", name: "YE'S Marata", class: "Business", price_m2: 420000, adr_low: 4500, adr_high: 9500, occ_avg: 0.83, uk_fee: 0.20, model: "Hybrid", loc_class: "Center" },
  { id: 116, city_code: 1, city: "Санкт-Петербург", name: "IN2IT (Интуит)", class: "Comfort", price_m2: 250000, adr_low: 3200, adr_high: 6200, occ_avg: 0.78, uk_fee: 0.15, model: "Long", loc_class: "Hub" },
  { id: 117, city_code: 1, city: "Санкт-Петербург", name: "Salut! (Салют)", class: "Comfort", price_m2: 220000, adr_low: 2900, adr_high: 5800, occ_avg: 0.74, uk_fee: 0.15, model: "Long", loc_class: "Hub" },
  { id: 118, city_code: 1, city: "Санкт-Петербург", name: "VALO Hotel City", class: "Business", price_m2: 310000, adr_low: 3900, adr_high: 7800, occ_avg: 0.84, uk_fee: 0.25, model: "Hybrid", loc_class: "Hub" },
  { id: 119, city_code: 1, city: "Санкт-Петербург", name: "Docklands", class: "Business", price_m2: 380000, adr_low: 5500, adr_high: 12000, occ_avg: 0.75, uk_fee: 0.20, model: "Hybrid", loc_class: "Center" },
  { id: 120, city_code: 1, city: "Санкт-Петербург", name: "Artstudio Nevsky", class: "Business", price_m2: 550000, adr_low: 6500, adr_high: 15000, occ_avg: 0.82, uk_fee: 0.20, model: "Short", loc_class: "Prime" },
  { id: 121, city_code: 1, city: "Санкт-Петербург", name: "Artstudio Moskovsky", class: "Business", price_m2: 340000, adr_low: 4200, adr_high: 8500, occ_avg: 0.80, uk_fee: 0.20, model: "Hybrid", loc_class: "Center" },
  { id: 122, city_code: 1, city: "Санкт-Петербург", name: "Avenue Apart на Малом", class: "Business", price_m2: 360000, adr_low: 4000, adr_high: 8800, occ_avg: 0.78, uk_fee: 0.20, model: "Hybrid", loc_class: "Center" },
  { id: 123, city_code: 1, city: "Санкт-Петербург", name: "Avenue-Apart Pulkovo", class: "Comfort", price_m2: 235000, adr_low: 3100, adr_high: 5900, occ_avg: 0.76, uk_fee: 0.15, model: "Long", loc_class: "Hub" },
  { id: 124, city_code: 1, city: "Санкт-Петербург", name: "Moskovsky Avenir", class: "Comfort", price_m2: 295000, adr_low: 3600, adr_high: 7200, occ_avg: 0.79, uk_fee: 0.20, model: "Hybrid", loc_class: "Hub" },
  { id: 125, city_code: 1, city: "Санкт-Петербург", name: "Kirovsky Avenir", class: "Comfort", price_m2: 260000, adr_low: 3300, adr_high: 6500, occ_avg: 0.77, uk_fee: 0.20, model: "Long", loc_class: "Hub" },
  { id: 126, city_code: 1, city: "Санкт-Петербург", name: "Putilov Avenir", class: "Comfort", price_m2: 250000, adr_low: 3200, adr_high: 6200, occ_avg: 0.76, uk_fee: 0.20, model: "Long", loc_class: "Hub" },
  { id: 127, city_code: 1, city: "Санкт-Петербург", name: "Vertical Московская", class: "Business", price_m2: 320000, adr_low: 4000, adr_high: 8200, occ_avg: 0.81, uk_fee: 0.25, model: "Hybrid", loc_class: "Center" },
  { id: 128, city_code: 1, city: "Санкт-Петербург", name: "We&I by Vertical", class: "Comfort", price_m2: 330000, adr_low: 4100, adr_high: 8500, occ_avg: 0.84, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 129, city_code: 1, city: "Санкт-Петербург", name: "Well", class: "Business", price_m2: 390000, adr_low: 5200, adr_high: 10500, occ_avg: 0.82, uk_fee: 0.20, model: "Hybrid", loc_class: "Center" },
  { id: 130, city_code: 1, city: "Санкт-Петербург", name: "Next", class: "Business", price_m2: 350000, adr_low: 4400, adr_high: 9000, occ_avg: 0.79, uk_fee: 0.20, model: "Hybrid", loc_class: "Center" },

  // --- МОСКВА ---
  { id: 201, city_code: 2, city: "Москва", name: "YE'S Technopark", class: "Business", price_m2: 480000, adr_low: 5800, adr_high: 9500, occ_avg: 0.85, uk_fee: 0.20, model: "Hybrid", loc_class: "Center" },
  { id: 202, city_code: 2, city: "Москва", name: "YE'S Botanika", class: "Business", price_m2: 430000, adr_low: 5200, adr_high: 8800, occ_avg: 0.83, uk_fee: 0.20, model: "Hybrid", loc_class: "Hub" },
  { id: 203, city_code: 2, city: "Москва", name: "YE'S Mitino", class: "Comfort", price_m2: 320000, adr_low: 4200, adr_high: 7200, occ_avg: 0.80, uk_fee: 0.20, model: "Long", loc_class: "Hub" },
  { id: 204, city_code: 2, city: "Москва", name: "Apartville Fitness&Spa", class: "Comfort", price_m2: 340000, adr_low: 4500, adr_high: 7800, occ_avg: 0.78, uk_fee: 0.20, model: "Hybrid", loc_class: "Hub" },
  { id: 205, city_code: 2, city: "Москва", name: "Aerolofts", class: "Business", price_m2: 410000, adr_low: 5000, adr_high: 9000, occ_avg: 0.81, uk_fee: 0.20, model: "Short", loc_class: "Hub" },
  { id: 206, city_code: 2, city: "Москва", name: "Cleverland", class: "Comfort", price_m2: 290000, adr_low: 3800, adr_high: 6800, occ_avg: 0.79, uk_fee: 0.20, model: "Long", loc_class: "Hub" },

  // --- СОЧИ ---
  { id: 301, city_code: 3, city: "Сочи", name: "Brevis Apartments", class: "Business", price_m2: 780000, adr_low: 8000, adr_high: 28000, occ_avg: 0.72, uk_fee: 0.30, model: "Short", loc_class: "Center" },
  { id: 302, city_code: 3, city: "Сочи", name: "Volna Residence", class: "Business", price_m2: 850000, adr_low: 9500, adr_high: 35000, occ_avg: 0.68, uk_fee: 0.35, model: "Short", loc_class: "Center" },
  { id: 303, city_code: 3, city: "Сочи", name: "Отель Фрегат (Адлер)", class: "Business", price_m2: 450000, adr_low: 5500, adr_high: 18000, occ_avg: 0.74, uk_fee: 0.30, model: "Short", loc_class: "Center" },
  { id: 304, city_code: 3, city: "Сочи", name: "Нескучный сад (Адлер)", class: "Business", price_m2: 520000, adr_low: 6500, adr_high: 22000, occ_avg: 0.70, uk_fee: 0.35, model: "Short", loc_class: "Center" },
  { id: 305, city_code: 3, city: "Сочи", name: "Лучезарный (Дагомыс)", class: "Business", price_m2: 950000, adr_low: 10000, adr_high: 42000, occ_avg: 0.66, uk_fee: 0.35, model: "Short", loc_class: "Prime" },
  { id: 306, city_code: 3, city: "Сочи", name: "Белые Ночи (Уч-Дере)", class: "Business", price_m2: 480000, adr_low: 5800, adr_high: 19500, occ_avg: 0.64, uk_fee: 0.35, model: "Short", loc_class: "Prime" },

  // --- КАЛИНИНГРАД ---
  { id: 401, city_code: 4, city: "Калининград", name: "Lazur (Светлогорск)", class: "Business", price_m2: 360000, adr_low: 5500, adr_high: 16500, occ_avg: 0.69, uk_fee: 0.30, model: "Short", loc_class: "Prime" },
  { id: 402, city_code: 4, city: "Калининград", name: "Baden-Baden (Светлогорск)", class: "Business", price_m2: 380000, adr_low: 6000, adr_high: 18000, occ_avg: 0.71, uk_fee: 0.30, model: "Short", loc_class: "Prime" },
  { id: 403, city_code: 4, city: "Калининград", name: "Nebo (Зеленоградск)", class: "Business", price_m2: 340000, adr_low: 5000, adr_high: 14500, occ_avg: 0.70, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 404, city_code: 4, city: "Калининград", name: "Atlantis (Зеленоградск)", class: "Business", price_m2: 355000, adr_low: 5200, adr_high: 15500, occ_avg: 0.72, uk_fee: 0.25, model: "Short", loc_class: "Prime" },

  // --- КАЗАНЬ ---
  { id: 501, city_code: 5, city: "Казань", name: "YES Горки", class: "Comfort", price_m2: 275000, adr_low: 4200, adr_high: 8500, occ_avg: 0.79, uk_fee: 0.20, model: "Hybrid", loc_class: "Hub" },
  { id: 502, city_code: 5, city: "Казань", name: "Vertical Boutique", class: "Business", price_m2: 395000, adr_low: 5800, adr_high: 12500, occ_avg: 0.83, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 503, city_code: 5, city: "Казань", name: "Апарт-отель у Kazan Mall", class: "Business", price_m2: 310000, adr_low: 4800, adr_high: 9500, occ_avg: 0.81, uk_fee: 0.20, model: "Hybrid", loc_class: "Center" },
];

/**
 * Получить все апартаменты
 */
export function getApartments(): Apartment[] {
  return APARTMENTS_DB;
}

/**
 * Получить апартамент по ID
 */
export function getApartmentById(id: number): Apartment | undefined {
  return APARTMENTS_DB.find((apt) => apt.id === id);
}

/**
 * Получить уникальные города
 */
export function getUniqueCities(): string[] {
  return Array.from(new Set(APARTMENTS_DB.map((apt) => apt.city))).sort();
}

/**
 * Получить апартаменты по городу
 */
export function getApartmentsByCity(city: string): Apartment[] {
  return APARTMENTS_DB.filter((apt) => apt.city === city);
}

/**
 * Получить количество объектов
 */
export function getApartmentsCount(): number {
  return APARTMENTS_DB.length;
}
