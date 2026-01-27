/**
 * Утилиты для расчёта рыночной статистики на основе 86 объектов из калькулятора
 * Эти данные используются только для показа общей статистики на главной странице
 */

// База данных из калькулятора (86 объектов) - только для статистики рынка
const MARKET_DATA = [
  // САНКТ-ПЕТЕРБУРГ (32 объекта)
  { city: "Санкт-Петербург", class: "Business", adr_avg: 5650, occ_avg: 0.84, price_m2: 290000 },
  { city: "Санкт-Петербург", class: "Comfort", adr_avg: 5000, occ_avg: 0.88, price_m2: 310000 },
  { city: "Санкт-Петербург", class: "Business", adr_avg: 7150, occ_avg: 0.78, price_m2: 360000 },
  { city: "Санкт-Петербург", class: "Business", adr_avg: 6500, occ_avg: 0.80, price_m2: 340000 },
  { city: "Санкт-Петербург", class: "Comfort", adr_avg: 4350, occ_avg: 0.85, price_m2: 240000 },
  { city: "Санкт-Петербург", class: "Comfort", adr_avg: 3800, occ_avg: 0.85, price_m2: 220000 },
  { city: "Санкт-Петербург", class: "Comfort", adr_avg: 3350, occ_avg: 0.82, price_m2: 195000 },
  { city: "Санкт-Петербург", class: "Comfort", adr_avg: 3600, occ_avg: 0.80, price_m2: 210000 },
  { city: "Санкт-Петербург", class: "Comfort", adr_avg: 4000, occ_avg: 0.83, price_m2: 230000 },
  { city: "Санкт-Петербург", class: "Comfort", adr_avg: 4150, occ_avg: 0.83, price_m2: 240000 },
  { city: "Санкт-Петербург", class: "Comfort", adr_avg: 4550, occ_avg: 0.84, price_m2: 260000 },
  { city: "Санкт-Петербург", class: "Business", adr_avg: 5450, occ_avg: 0.86, price_m2: 290000 },
  { city: "Санкт-Петербург", class: "Comfort", adr_avg: 4250, occ_avg: 0.89, price_m2: 250000 },
  { city: "Санкт-Петербург", class: "Business", adr_avg: 8000, occ_avg: 0.75, price_m2: 400000 },
  { city: "Санкт-Петербург", class: "Business", adr_avg: 6650, occ_avg: 0.85, price_m2: 350000 },
  { city: "Санкт-Петербург", class: "Business", adr_avg: 10750, occ_avg: 0.82, price_m2: 480000 },
  { city: "Санкт-Петербург", class: "Business", adr_avg: 13000, occ_avg: 0.70, price_m2: 550000 },
  { city: "Санкт-Петербург", class: "Comfort", adr_avg: 5500, occ_avg: 0.80, price_m2: 320000 },
  { city: "Санкт-Петербург", class: "Business", adr_avg: 52500, occ_avg: 0.60, price_m2: 1100000 },
  { city: "Санкт-Петербург", class: "Comfort", adr_avg: 4350, occ_avg: 0.83, price_m2: 260000 },
  { city: "Санкт-Петербург", class: "Business", adr_avg: 5750, occ_avg: 0.80, price_m2: 310000 },
  { city: "Санкт-Петербург", class: "Business", adr_avg: 7000, occ_avg: 0.75, price_m2: 380000 },
  { city: "Санкт-Петербург", class: "Business", adr_avg: 5650, occ_avg: 0.88, price_m2: 300000 },
  { city: "Санкт-Петербург", class: "Business", adr_avg: 5400, occ_avg: 0.87, price_m2: 290000 },
  { city: "Санкт-Петербург", class: "Comfort", adr_avg: 4850, occ_avg: 0.90, price_m2: 270000 },
  { city: "Санкт-Петербург", class: "Comfort", adr_avg: 6000, occ_avg: 0.92, price_m2: 310000 },
  { city: "Санкт-Петербург", class: "Comfort", adr_avg: 4500, occ_avg: 0.85, price_m2: 260000 },
  { city: "Санкт-Петербург", class: "Comfort", adr_avg: 4350, occ_avg: 0.86, price_m2: 250000 },
  { city: "Санкт-Петербург", class: "Comfort", adr_avg: 4650, occ_avg: 0.88, price_m2: 265000 },
  { city: "Санкт-Петербург", class: "Comfort", adr_avg: 4450, occ_avg: 0.84, price_m2: 255000 },
  { city: "Санкт-Петербург", class: "Comfort", adr_avg: 4400, occ_avg: 0.85, price_m2: 260000 },
  { city: "Санкт-Петербург", class: "Comfort", adr_avg: 4150, occ_avg: 0.89, price_m2: 240000 },

  // МОСКВА (23 объекта)
  { city: "Москва", class: "Comfort", adr_avg: 5250, occ_avg: 0.88, price_m2: 400000 },
  { city: "Москва", class: "Comfort", adr_avg: 4850, occ_avg: 0.86, price_m2: 380000 },
  { city: "Москва", class: "Comfort", adr_avg: 4150, occ_avg: 0.90, price_m2: 320000 },
  { city: "Москва", class: "Comfort", adr_avg: 7000, occ_avg: 0.92, price_m2: 550000 },
  { city: "Москва", class: "Business", adr_avg: 9250, occ_avg: 0.78, price_m2: 480000 },
  { city: "Москва", class: "Comfort", adr_avg: 5000, occ_avg: 0.82, price_m2: 350000 },
  { city: "Москва", class: "Business", adr_avg: 20000, occ_avg: 0.72, price_m2: 950000 },
  { city: "Москва", class: "Business", adr_avg: 27500, occ_avg: 0.65, price_m2: 1100000 },
  { city: "Москва", class: "Business", adr_avg: 24000, occ_avg: 0.65, price_m2: 900000 },
  { city: "Москва", class: "Business", adr_avg: 25500, occ_avg: 0.68, price_m2: 950000 },
  { city: "Москва", class: "Business", adr_avg: 22000, occ_avg: 0.70, price_m2: 850000 },
  { city: "Москва", class: "Business", adr_avg: 8000, occ_avg: 0.80, price_m2: 430000 },
  { city: "Москва", class: "Business", adr_avg: 15000, occ_avg: 0.75, price_m2: 650000 },
  { city: "Москва", class: "Business", adr_avg: 12500, occ_avg: 0.74, price_m2: 600000 },
  { city: "Москва", class: "Business", adr_avg: 62500, occ_avg: 0.55, price_m2: 1800000 },
  { city: "Москва", class: "Business", adr_avg: 18000, occ_avg: 0.70, price_m2: 800000 },
  { city: "Москва", class: "Business", adr_avg: 16500, occ_avg: 0.72, price_m2: 750000 },
  { city: "Москва", class: "Business", adr_avg: 35000, occ_avg: 0.60, price_m2: 1200000 },
  { city: "Москва", class: "Business", adr_avg: 8000, occ_avg: 0.82, price_m2: 490000 },
  { city: "Москва", class: "Business", adr_avg: 7750, occ_avg: 0.83, price_m2: 460000 },
  { city: "Москва", class: "Comfort", adr_avg: 5500, occ_avg: 0.85, price_m2: 380000 },
  { city: "Москва", class: "Comfort", adr_avg: 4650, occ_avg: 0.88, price_m2: 300000 },
  { city: "Москва", class: "Business", adr_avg: 6750, occ_avg: 0.87, price_m2: 410000 },

  // СОЧИ (17 объектов)
  { city: "Сочи", class: "Business", adr_avg: 16500, occ_avg: 0.68, price_m2: 750000 },
  { city: "Сочи", class: "Business", adr_avg: 13250, occ_avg: 0.72, price_m2: 680000 },
  { city: "Сочи", class: "Business", adr_avg: 10500, occ_avg: 0.70, price_m2: 550000 },
  { city: "Сочи", class: "Business", adr_avg: 47500, occ_avg: 0.55, price_m2: 1900000 },
  { city: "Сочи", class: "Business", adr_avg: 100000, occ_avg: 0.50, price_m2: 3800000 },
  { city: "Сочи", class: "Business", adr_avg: 62500, occ_avg: 0.45, price_m2: 2500000 },
  { city: "Сочи", class: "Business", adr_avg: 22500, occ_avg: 0.65, price_m2: 900000 },
  { city: "Сочи", class: "Business", adr_avg: 19500, occ_avg: 0.65, price_m2: 800000 },
  { city: "Сочи", class: "Business", adr_avg: 58500, occ_avg: 0.58, price_m2: 2200000 },
  { city: "Сочи", class: "Business", adr_avg: 42500, occ_avg: 0.60, price_m2: 1500000 },
  { city: "Сочи", class: "Business", adr_avg: 15000, occ_avg: 0.68, price_m2: 650000 },
  { city: "Сочи", class: "Business", adr_avg: 12500, occ_avg: 0.70, price_m2: 600000 },
  { city: "Сочи", class: "Business", adr_avg: 8750, occ_avg: 0.75, price_m2: 500000 },
  { city: "Сочи", class: "Business", adr_avg: 8000, occ_avg: 0.73, price_m2: 480000 },
  { city: "Сочи", class: "Business", adr_avg: 20000, occ_avg: 0.69, price_m2: 950000 },
  { city: "Сочи", class: "Comfort", adr_avg: 5250, occ_avg: 0.80, price_m2: 350000 },
  { city: "Сочи", class: "Comfort", adr_avg: 5100, occ_avg: 0.78, price_m2: 320000 },

  // КАЛИНИНГРАД (8 объектов)
  { city: "Калининград", class: "Business", adr_avg: 10750, occ_avg: 0.76, price_m2: 360000 },
  { city: "Калининград", class: "Business", adr_avg: 15500, occ_avg: 0.70, price_m2: 450000 },
  { city: "Калининград", class: "Business", adr_avg: 8750, occ_avg: 0.75, price_m2: 320000 },
  { city: "Калининград", class: "Business", adr_avg: 11500, occ_avg: 0.72, price_m2: 380000 },
  { city: "Калининград", class: "Comfort", adr_avg: 6500, occ_avg: 0.80, price_m2: 250000 },
  { city: "Калининград", class: "Comfort", adr_avg: 9250, occ_avg: 0.88, price_m2: 300000 },
  { city: "Калининград", class: "Business", adr_avg: 8000, occ_avg: 0.78, price_m2: 310000 },
  { city: "Калининград", class: "Business", adr_avg: 8350, occ_avg: 0.77, price_m2: 330000 },

  // КАЗАНЬ (6 объектов)
  { city: "Казань", class: "Business", adr_avg: 7500, occ_avg: 0.76, price_m2: 340000 },
  { city: "Казань", class: "Business", adr_avg: 15000, occ_avg: 0.65, price_m2: 500000 },
  { city: "Казань", class: "Business", adr_avg: 6300, occ_avg: 0.82, price_m2: 290000 },
  { city: "Казань", class: "Comfort", adr_avg: 4850, occ_avg: 0.88, price_m2: 230000 },
  { city: "Казань", class: "Business", adr_avg: 6000, occ_avg: 0.78, price_m2: 270000 },
  { city: "Казань", class: "Business", adr_avg: 6300, occ_avg: 0.80, price_m2: 280000 },
];

/**
 * Расчёт средней доходности рынка (₽/м²/мес)
 * Формула: (ADR × Загрузка × 365) / 12 / площадь условного объекта (40м²)
 * Убираем экстремальные объекты (ADR > 15000₽) чтобы не искажать среднее
 */
export function calculateMarketIndex(): number {
  const AVERAGE_AREA = 40; // Условная площадь для расчёта
  const MAX_ADR = 15000; // Максимальный ADR для "нормальных" объектов

  // Фильтруем только массовый сегмент (без элитных объектов)
  const normalMarket = MARKET_DATA.filter((obj) => obj.adr_avg <= MAX_ADR);

  const revPerM2Month = normalMarket.map((obj) => {
    const yearlyRevenue = obj.adr_avg * obj.occ_avg * 365;
    const monthlyRevenue = yearlyRevenue / 12;
    return monthlyRevenue / AVERAGE_AREA;
  });

  const sum = revPerM2Month.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / revPerM2Month.length);
}

/**
 * Расчёт средней загрузки по рынку (%)
 * Считаем только по массовому сегменту (без элитных объектов)
 */
export function calculateAverageOccupancy(): number {
  const MAX_ADR = 15000;
  const normalMarket = MARKET_DATA.filter((obj) => obj.adr_avg <= MAX_ADR);

  const sum = normalMarket.reduce((acc, obj) => acc + obj.occ_avg, 0);
  return Math.round((sum / normalMarket.length) * 100);
}

/**
 * Расчёт средней окупаемости по рынку (лет)
 * Упрощённая формула: Стоимость / Годовой доход
 * Считаем только по массовому сегменту (без элитных объектов)
 */
export function calculateAveragePayback(): number {
  const AVERAGE_AREA = 40;
  const MAX_ADR = 15000;
  const normalMarket = MARKET_DATA.filter((obj) => obj.adr_avg <= MAX_ADR);

  const paybacks = normalMarket.map((obj) => {
    const totalPrice = obj.price_m2 * AVERAGE_AREA;
    const yearlyRevenue = obj.adr_avg * obj.occ_avg * 365;
    // Вычитаем примерно 40% на расходы (упрощённо)
    const netIncome = yearlyRevenue * 0.6;
    return totalPrice / netIncome;
  });

  const sum = paybacks.reduce((acc, val) => acc + val, 0);
  return parseFloat((sum / paybacks.length).toFixed(1));
}

/**
 * Количество объектов в базе данных рынка (массовый сегмент)
 * Считаем только объекты с ADR <= 15000₽
 */
export function getMarketObjectsCount(): number {
  const MAX_ADR = 15000;
  return MARKET_DATA.filter((obj) => obj.adr_avg <= MAX_ADR).length;
}

/**
 * Получить распределение по городам
 */
export function getCitiesDistribution(): Record<string, number> {
  const distribution: Record<string, number> = {};

  MARKET_DATA.forEach((obj) => {
    distribution[obj.city] = (distribution[obj.city] || 0) + 1;
  });

  return distribution;
}
