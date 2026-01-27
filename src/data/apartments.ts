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
  { id: 101, city_code: 1, city: "Санкт-Петербург", name: "17/33 Петровский остров", class: "Comfort", price_m2: 262500, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 102, city_code: 1, city: "Санкт-Петербург", name: "BEREG.Курортный (БЕРЕГ.Курортный)", class: "Comfort", price_m2: 293100, adr_low: 6750, adr_high: 13000, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 103, city_code: 1, city: "Санкт-Петербург", name: "МФК Морская ривьера", class: "Comfort", price_m2: 571429, adr_low: 6750, adr_high: 13000, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 104, city_code: 1, city: "Санкт-Петербург", name: "МОСКО", class: "Comfort", price_m2: 383920, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 105, city_code: 1, city: "Санкт-Петербург", name: "МФК SAAN", class: "Comfort", price_m2: 370318, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 106, city_code: 1, city: "Санкт-Петербург", name: "Северная Корона", class: "Comfort", price_m2: 429990, adr_low: 6750, adr_high: 13000, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 107, city_code: 1, city: "Санкт-Петербург", name: "YE'S Primorsky Комплекс Апартаментов (Йес Приморский)", class: "Comfort", price_m2: 303597, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 108, city_code: 1, city: "Санкт-Петербург", name: "Industrial AVENIR", class: "Comfort", price_m2: 241262, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 109, city_code: 1, city: "Санкт-Петербург", name: "Апарт-комплекс Zoom на Неве (Зум на Неве)", class: "Comfort", price_m2: 250000, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 110, city_code: 1, city: "Санкт-Петербург", name: "Апарт-отель Vertical Лесная", class: "Comfort", price_m2: 358108, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 111, city_code: 1, city: "Санкт-Петербург", name: "iD Polytech (АйДи Политех)", class: "Comfort", price_m2: 349930, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 112, city_code: 1, city: "Санкт-Петербург", name: "Апарт-отель GloraX Заневский", class: "Comfort", price_m2: 287324, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 113, city_code: 1, city: "Санкт-Петербург", name: "Апарт-отель ARTSTUDIO М103", class: "Comfort", price_m2: 262500, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 114, city_code: 1, city: "Санкт-Петербург", name: "НИГИЛИСТ", class: "Comfort", price_m2: 309267, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 115, city_code: 1, city: "Санкт-Петербург", name: "Апарт-комплекс Zoom Черная Речка (Зум Черная Речка)", class: "Comfort", price_m2: 269147, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 116, city_code: 1, city: "Санкт-Петербург", name: "Ladozhsky AVENIR (Ладожский АВЕНИР)", class: "Comfort", price_m2: 242462, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 117, city_code: 1, city: "Санкт-Петербург", name: "Вольта", class: "Comfort", price_m2: 307075, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 118, city_code: 1, city: "Санкт-Петербург", name: "Апарт-отель Vertical Московская", class: "Comfort", price_m2: 322271, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 119, city_code: 1, city: "Санкт-Петербург", name: "АпАртОтель ПРО. Молодость (Апартаменты Про.Молодость)", class: "Comfort", price_m2: 126892, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 120, city_code: 1, city: "Санкт-Петербург", name: "AVENUE APART на Дыбенко (Авеню Апарт)", class: "Comfort", price_m2: 262500, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 121, city_code: 1, city: "Санкт-Петербург", name: "Promenade", class: "Comfort", price_m2: 291896, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 122, city_code: 1, city: "Санкт-Петербург", name: "Апарт-комплекс на Гороховой, 47", class: "Comfort", price_m2: 293100, adr_low: 6750, adr_high: 13000, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 123, city_code: 1, city: "Санкт-Петербург", name: "YE'S Leader", class: "Comfort", price_m2: 299847, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 124, city_code: 1, city: "Санкт-Петербург", name: "Резиденция Рощино", class: "Comfort", price_m2: 262500, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 125, city_code: 1, city: "Санкт-Петербург", name: "Наследие на Марата", class: "Comfort", price_m2: 262500, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 126, city_code: 1, city: "Санкт-Петербург", name: "Shine (Шайн)", class: "Comfort", price_m2: 262500, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 127, city_code: 1, city: "Санкт-Петербург", name: "Апартаменты AVENUE-APART ПУЛКОВО (Авеню-Апарт Пулково)", class: "Comfort", price_m2: 436970, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 128, city_code: 1, city: "Санкт-Петербург", name: "Zen Garden (Зен Гарден)", class: "Comfort", price_m2: 262500, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 129, city_code: 1, city: "Санкт-Петербург", name: "Апарт-отель Well Московский", class: "Comfort", price_m2: 354505, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 130, city_code: 1, city: "Санкт-Петербург", name: "IN2IT (Апартаменты Интуит)", class: "Comfort", price_m2: 270721, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 131, city_code: 1, city: "Санкт-Петербург", name: "Life Apart Октябрьская (Лайф Апарт Октябрьская)", class: "Comfort", price_m2: 276371, adr_low: 6750, adr_high: 13000, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 132, city_code: 1, city: "Санкт-Петербург", name: "Апарт-отель Well (Апарт-отель Велл)", class: "Comfort", price_m2: 391000, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 133, city_code: 1, city: "Санкт-Петербург", name: "е.квартал Мир внутри", class: "Comfort", price_m2: 293100, adr_low: 6750, adr_high: 13000, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 134, city_code: 1, city: "Санкт-Петербург", name: "Апарт-отель Лиговский, 127", class: "Comfort", price_m2: 391114, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 135, city_code: 1, city: "Санкт-Петербург", name: "WINGS апартаменты на Крыленко (Вингс апартаменты на Крыленко)", class: "Comfort", price_m2: 214717, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 136, city_code: 1, city: "Санкт-Петербург", name: "Комплекс апартаментов Valo City (Комплекс апартаментов Вало Сити)", class: "Comfort", price_m2: 262500, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 137, city_code: 1, city: "Санкт-Петербург", name: "Апартаменты VIDI (Апартаменты ВИДИ)", class: "Comfort", price_m2: 262500, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 138, city_code: 1, city: "Санкт-Петербург", name: "Апарт-отель Uno (Уно)", class: "Comfort", price_m2: 262500, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 139, city_code: 1, city: "Санкт-Петербург", name: "Апарт-отель Начало", class: "Comfort", price_m2: 215451, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 140, city_code: 1, city: "Санкт-Петербург", name: "Inreit — Лиговский 29", class: "Comfort", price_m2: 262500, adr_low: 2892.36, adr_high: 9050.68, occ_avg: 0.901825, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 141, city_code: 1, city: "Санкт-Петербург", name: "Inreit — Садовая 53", class: "Comfort", price_m2: 262500, adr_low: 2612.15215904868, adr_high: 8780.66382435379, occ_avg: 0.9017053, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 142, city_code: 1, city: "Санкт-Петербург", name: "Inreit — Гривцова (1-й корпус)", class: "Comfort", price_m2: 262500, adr_low: 6250, adr_high: 12000, occ_avg: 0.9, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 143, city_code: 1, city: "Санкт-Петербург", name: "Inreit — Гривцова (2-й корпус)", class: "Comfort", price_m2: 262500, adr_low: 2612.15, adr_high: 8780.66, occ_avg: 0.9, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 144, city_code: 1, city: "Санкт-Петербург", name: "Inreit — Садовая 28", class: "Comfort", price_m2: 262500, adr_low: 2118.35, adr_high: 7029.43211574953, occ_avg: 0.8866179263, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 145, city_code: 1, city: "Санкт-Петербург", name: "Inreit — Александра Невского", class: "Comfort", price_m2: 262500, adr_low: 1848.24307304786, adr_high: 5579.5503, occ_avg: 0.8867792958, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 146, city_code: 1, city: "Санкт-Петербург", name: "Inreit — Подьяческая", class: "Comfort", price_m2: 262500, adr_low: 1905.6823521682, adr_high: 7183.56532887403, occ_avg: 0.9018774844, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 147, city_code: 1, city: "Санкт-Петербург", name: "Inreit — Блохина (Петроградка)", class: "Comfort", price_m2: 262500, adr_low: 2016.66333333334, adr_high: 6112.72463302752, occ_avg: 0.8744900884, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 148, city_code: 1, city: "Санкт-Петербург", name: "Inreit — Блохина (Нева)", class: "Comfort", price_m2: 262500, adr_low: 2257.18036535859, adr_high: 6700.55952214452, occ_avg: 0.8688026255, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 149, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort on Ligovskiy", class: "Business", price_m2: 328300, adr_low: 7750, adr_high: 14900, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 150, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Sennaya Square", class: "Business", price_m2: 328300, adr_low: 7750, adr_high: 14900, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 151, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Moyka", class: "Comfort", price_m2: 293100, adr_low: 6750, adr_high: 13000, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 152, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Gostiny Dvor", class: "Business", price_m2: 328300, adr_low: 7750, adr_high: 14900, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 153, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by The Griboedov", class: "Comfort", price_m2: 293100, adr_low: 6750, adr_high: 13000, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 154, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort on Petrogradka", class: "Comfort", price_m2: 262500, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 155, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Smolnyy", class: "Comfort", price_m2: 262500, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 156, city_code: 1, city: "Санкт-Петербург", name: "Port Comfort by Mariinsky", class: "Comfort", price_m2: 262500, adr_low: 6250, adr_high: 12000, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 157, city_code: 1, city: "Санкт-Петербург", name: "iZZZi 3* у Владимирской", class: "Comfort", price_m2: 293100, adr_low: 6750, adr_high: 13000, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 158, city_code: 1, city: "Санкт-Петербург", name: "iZZZi 3* на Банковском", class: "Comfort", price_m2: 293100, adr_low: 6750, adr_high: 13000, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 159, city_code: 1, city: "Санкт-Петербург", name: "iZZZi 3* у Гостиного двора", class: "Comfort", price_m2: 293100, adr_low: 6750, adr_high: 13000, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 160, city_code: 1, city: "Санкт-Петербург", name: "iZZZi Гороховая 47", class: "Business", price_m2: 328300, adr_low: 7750, adr_high: 14900, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },

  { id: 201, city_code: 2, city: "Москва", name: "NEVA TOWERS (Нева Тауэрс)", class: "Comfort", price_m2: 963206, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 202, city_code: 2, city: "Москва", name: "Зорге 9", class: "Comfort", price_m2: 562921, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 203, city_code: 2, city: "Москва", name: "A.Residence (А.Резиденс)", class: "Comfort", price_m2: 1264301, adr_low: 9050, adr_high: 14200, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 204, city_code: 2, city: "Москва", name: "Slava (Слава)", class: "Comfort", price_m2: 519700, adr_low: 9050, adr_high: 14200, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 205, city_code: 2, city: "Москва", name: "SkyView", class: "Comfort", price_m2: 906355, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 206, city_code: 2, city: "Москва", name: "AHEAD", class: "Comfort", price_m2: 723830, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 207, city_code: 2, city: "Москва", name: "D'ORO MILLE (Доро Милле)", class: "Comfort", price_m2: 1175098, adr_low: 9050, adr_high: 14200, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 208, city_code: 2, city: "Москва", name: "МФК DIUS (Диус)", class: "Comfort", price_m2: 528592, adr_low: 6550, adr_high: 10250, occ_avg: 0.65, uk_fee: 0.15, model: "Long", loc_class: "Hub" },
  { id: 209, city_code: 2, city: "Москва", name: "Сервисные резиденции в клубных особняках Ильинка 3/8", class: "Comfort", price_m2: 2573250, adr_low: 9050, adr_high: 14200, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 210, city_code: 2, city: "Москва", name: "N'ICE LOFT (НАЙС ЛОФТ)", class: "Comfort", price_m2: 430337, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 211, city_code: 2, city: "Москва", name: "Резиденции Архитекторов", class: "Comfort", price_m2: 493706, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 212, city_code: 2, city: "Москва", name: "Резиденция 1864", class: "Comfort", price_m2: 1048936, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 213, city_code: 2, city: "Москва", name: "Квартал апартаментов Match Point (Матч Поинт)", class: "Comfort", price_m2: 559942, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 214, city_code: 2, city: "Москва", name: "Дом Chkalov (Чкалов)", class: "Comfort", price_m2: 1016026, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 215, city_code: 2, city: "Москва", name: "Долгоруковская 25", class: "Comfort", price_m2: 1138243, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 216, city_code: 2, city: "Москва", name: "МФК ОКО", class: "Comfort", price_m2: 740695, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 217, city_code: 2, city: "Москва", name: "Титул на Серебрянической", class: "Comfort", price_m2: 1020060, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 218, city_code: 2, city: "Москва", name: "Звёзды Арбата", class: "Comfort", price_m2: 1074867, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 219, city_code: 2, city: "Москва", name: "Малевич (Malevich)", class: "Comfort", price_m2: 372289, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 220, city_code: 2, city: "Москва", name: "West Tower (Апартаменты бизнес-класса) (Вест Тауэр)", class: "Business", price_m2: 439960, adr_low: 9650, adr_high: 15100, occ_avg: 0.72, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 221, city_code: 2, city: "Москва", name: "Emotion (Эмоушен)", class: "Comfort", price_m2: 690608, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 222, city_code: 2, city: "Москва", name: "МФК CITIMIX (Ситимикс)", class: "Comfort", price_m2: 407444, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 223, city_code: 2, city: "Москва", name: "Апарт-комплекс Akvilon Signal (Аквилон Сигнал)", class: "Comfort", price_m2: 478302, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 224, city_code: 2, city: "Москва", name: "Дом на набережной INSIDER (Инсайдер)", class: "Comfort", price_m2: 611413, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 225, city_code: 2, city: "Москва", name: "Большая Дмитровка IX", class: "Comfort", price_m2: 2660595, adr_low: 9050, adr_high: 14200, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 226, city_code: 2, city: "Москва", name: "Резиденции Замоскворечье", class: "Comfort", price_m2: 438786, adr_low: 9050, adr_high: 14200, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 227, city_code: 2, city: "Москва", name: "Саввинская 27 от Level", class: "Comfort", price_m2: 3060606, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 228, city_code: 2, city: "Москва", name: "RED7 (РЕД7)", class: "Comfort", price_m2: 775345, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 229, city_code: 2, city: "Москва", name: "МФК Варшавские ворота", class: "Comfort", price_m2: 469231, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 230, city_code: 2, city: "Москва", name: "МФК CITIMIX Новокосино", class: "Comfort", price_m2: 289474, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 231, city_code: 2, city: "Москва", name: "Маршал", class: "Comfort", price_m2: 495505, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 232, city_code: 2, city: "Москва", name: "EvoPark Сокольники (ЭвоПарк)", class: "Comfort", price_m2: 463445, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 233, city_code: 2, city: "Москва", name: "Nametkin Tower (Наметкин Тауэр)", class: "Comfort", price_m2: 452586, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 234, city_code: 2, city: "Москва", name: "MainStreet (Мейнстрит)", class: "Comfort", price_m2: 344910, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 235, city_code: 2, city: "Москва", name: "МИРАПОЛИС", class: "Comfort", price_m2: 467337, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 236, city_code: 2, city: "Москва", name: "Level Южнопортовая", class: "Comfort", price_m2: 507447, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 237, city_code: 2, city: "Москва", name: "EvoPark Измайлово (ЭвоПарк)", class: "Comfort", price_m2: 335892, adr_low: 6550, adr_high: 10250, occ_avg: 0.65, uk_fee: 0.15, model: "Long", loc_class: "Hub" },
  { id: 238, city_code: 2, city: "Москва", name: "Большая Академическая 85", class: "Comfort", price_m2: 335714, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 239, city_code: 2, city: "Москва", name: "ФизтехСити", class: "Comfort", price_m2: 427916, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 240, city_code: 2, city: "Москва", name: "Волоколамское 24", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 241, city_code: 2, city: "Москва", name: "GloraX Premium Белорусская", class: "Comfort", price_m2: 519700, adr_low: 9050, adr_high: 14200, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 242, city_code: 2, city: "Москва", name: "Roza Rossa (Роза Росса)", class: "Comfort", price_m2: 519700, adr_low: 9050, adr_high: 14200, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 243, city_code: 2, city: "Москва", name: "Апартаментный комплекс Level Стрешнево (Левел Стрешнево)", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 244, city_code: 2, city: "Москва", name: "Движение.Говорово Апарт-комплекс", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 245, city_code: 2, city: "Москва", name: "Тропарево Парк", class: "Comfort", price_m2: 373002, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 246, city_code: 2, city: "Москва", name: "Комплекс апартаментов AIST RESIDENCE (Аист Резиденс)", class: "Comfort", price_m2: 354737, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 247, city_code: 2, city: "Москва", name: "Стремянный 2", class: "Comfort", price_m2: 519700, adr_low: 9050, adr_high: 14200, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 248, city_code: 2, city: "Москва", name: "Поклонная 9", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 249, city_code: 2, city: "Москва", name: "Ривер Парк Коломенское", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 250, city_code: 2, city: "Москва", name: "Комплекс апартаментов LES (Лес)", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 251, city_code: 2, city: "Москва", name: "Резиденция Сокольники", class: "Comfort", price_m2: 520684, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 252, city_code: 2, city: "Москва", name: "Невский", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 253, city_code: 2, city: "Москва", name: "Досфлота, 10", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 254, city_code: 2, city: "Москва", name: "Sole Hills (Соле Хиллс)", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 255, city_code: 2, city: "Москва", name: "Клубный дом CULT (Клубный дом Культ)", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 256, city_code: 2, city: "Москва", name: "Voxhall (Воксхолл)", class: "Comfort", price_m2: 738053, adr_low: 9050, adr_high: 14200, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 257, city_code: 2, city: "Москва", name: "Комплекс апартаментов Alcon Tower (Алкон Тауэр)", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 258, city_code: 2, city: "Москва", name: "Пятницкое 58", class: "Comfort", price_m2: 322261, adr_low: 6550, adr_high: 10250, occ_avg: 0.65, uk_fee: 0.15, model: "Long", loc_class: "Hub" },
  { id: 259, city_code: 2, city: "Москва", name: "Новоданиловская 8", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 260, city_code: 2, city: "Москва", name: "Апарт-комплекс Monodom Lake (Монодом Лейк)", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 261, city_code: 2, city: "Москва", name: "Logos (Логос)", class: "Comfort", price_m2: 679092, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 262, city_code: 2, city: "Москва", name: "Комплекс апартаментов Королёва 13", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 263, city_code: 2, city: "Москва", name: "Clementine (Клементин)", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 264, city_code: 2, city: "Москва", name: "Комплекс апартаментов Wellbe (МФК Вэллби)", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 265, city_code: 2, city: "Москва", name: "Сокольнический вал 1", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 266, city_code: 2, city: "Москва", name: "Сити-комплекс Мята", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 267, city_code: 2, city: "Москва", name: "Апарт-комплекс Легендарный квартал", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 268, city_code: 2, city: "Москва", name: "Клубный дом Рублево", class: "Comfort", price_m2: 450000, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 269, city_code: 2, city: "Москва", name: "River Residences (Ривер Резиденсес)", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 270, city_code: 2, city: "Москва", name: "The Patricks (Патрикс)", class: "Comfort", price_m2: 519700, adr_low: 9050, adr_high: 14200, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 271, city_code: 2, city: "Москва", name: "Allegoria Mosca (Аллегория Моска)", class: "Comfort", price_m2: 519700, adr_low: 9050, adr_high: 14200, occ_avg: 0.75, uk_fee: 0.23, model: "Hybrid", loc_class: "Prime" },
  { id: 272, city_code: 2, city: "Москва", name: "Любовь и Голуби", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 273, city_code: 2, city: "Москва", name: "HighWay (ХайВей)", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 274, city_code: 2, city: "Москва", name: "Измайловский Парк (Апартаменты бизнес-класса)", class: "Business", price_m2: 521300, adr_low: 9650, adr_high: 15100, occ_avg: 0.72, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 275, city_code: 2, city: "Москва", name: "Клубный дом Октябрь", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 276, city_code: 2, city: "Москва", name: "MONODOM FAMILY (Монодом Фэмили)", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 277, city_code: 2, city: "Москва", name: "Din Haus (Дин Хаус)", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 278, city_code: 2, city: "Москва", name: "Kuznetsky Most 12 by Lalique (Кузнецкий Мост 12)", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 279, city_code: 2, city: "Москва", name: "Inreit — Москва", class: "Comfort", price_m2: 465500, adr_low: 8400, adr_high: 13100, occ_avg: 0.73, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },

  { id: 301, city_code: 3, city: "Сочи", name: "Гостиничный комплекс Нескучный сад", class: "Comfort", price_m2: 1175521, adr_low: 7500, adr_high: 20600, occ_avg: 0.77, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 302, city_code: 3, city: "Сочи", name: "Livingston (Ливингстон)", class: "Comfort", price_m2: 1694083, adr_low: 6950, adr_high: 19050, occ_avg: 0.75, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 303, city_code: 3, city: "Сочи", name: "Marine Garden Sochi (Маринэ Гарден Сочи)", class: "Comfort", price_m2: 633088, adr_low: 6950, adr_high: 19050, occ_avg: 0.75, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 304, city_code: 3, city: "Сочи", name: "Аркадия", class: "Comfort", price_m2: 849846, adr_low: 6950, adr_high: 19050, occ_avg: 0.75, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 305, city_code: 3, city: "Сочи", name: "MANTERA Residence (Мантера Резиденс)", class: "Comfort", price_m2: 2750784, adr_low: 7500, adr_high: 20600, occ_avg: 0.77, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 306, city_code: 3, city: "Сочи", name: "Flavium - Luciano (Флавиум Лучиано)", class: "Comfort", price_m2: 1584566, adr_low: 6950, adr_high: 19050, occ_avg: 0.75, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 307, city_code: 3, city: "Сочи", name: "Гостиничный комплекс ROYAL BEACH", class: "Comfort", price_m2: 484949, adr_low: 7500, adr_high: 20600, occ_avg: 0.77, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 308, city_code: 3, city: "Сочи", name: "Белые Ночи", class: "Comfort", price_m2: 879884, adr_low: 6950, adr_high: 19050, occ_avg: 0.75, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 309, city_code: 3, city: "Сочи", name: "Горка", class: "Comfort", price_m2: 508696, adr_low: 6400, adr_high: 17550, occ_avg: 0.72, uk_fee: 0.25, model: "Short", loc_class: "Hub" },
  { id: 310, city_code: 3, city: "Сочи", name: "Grand Hotel Marine Garden Sochi", class: "Comfort", price_m2: 531800, adr_low: 6400, adr_high: 17550, occ_avg: 0.72, uk_fee: 0.25, model: "Short", loc_class: "Hub" },
  { id: 311, city_code: 3, city: "Сочи", name: "МАНДАРИН ГАРДЕН", class: "Comfort", price_m2: 608600, adr_low: 6950, adr_high: 19050, occ_avg: 0.75, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 312, city_code: 3, city: "Сочи", name: "Marine Garden Sochi Hotel & Spa", class: "Comfort", price_m2: 531800, adr_low: 6400, adr_high: 17550, occ_avg: 0.72, uk_fee: 0.25, model: "Short", loc_class: "Hub" },

  { id: 401, city_code: 4, city: "Калининград", name: "Atlantis (Зеленоградск)", class: "Business", price_m2: 182600, adr_low: 6350, adr_high: 15650, occ_avg: 0.67, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 402, city_code: 4, city: "Калининград", name: "Royal Atlantis", class: "Business", price_m2: 182600, adr_low: 6350, adr_high: 15650, occ_avg: 0.67, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 403, city_code: 4, city: "Калининград", name: "Park House", class: "Business", price_m2: 163600, adr_low: 5900, adr_high: 14500, occ_avg: 0.65, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 404, city_code: 4, city: "Калининград", name: "Midgard Club", class: "Business", price_m2: 182600, adr_low: 6350, adr_high: 15650, occ_avg: 0.67, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 405, city_code: 4, city: "Калининград", name: "Кранц-Парк", class: "Comfort", price_m2: 127600, adr_low: 4700, adr_high: 11600, occ_avg: 0.64, uk_fee: 0.25, model: "Short", loc_class: "Hub" },
  { id: 406, city_code: 4, city: "Калининград", name: "Baden-Baden (Светлогорск)", class: "Business", price_m2: 182600, adr_low: 6350, adr_high: 15650, occ_avg: 0.67, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 407, city_code: 4, city: "Калининград", name: "Alt-Platz", class: "Business", price_m2: 163600, adr_low: 5900, adr_high: 14500, occ_avg: 0.65, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 408, city_code: 4, city: "Калининград", name: "Раушен-Престиж", class: "Business", price_m2: 182600, adr_low: 6350, adr_high: 15650, occ_avg: 0.67, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 409, city_code: 4, city: "Калининград", name: "European Hotel & Apartments", class: "Business", price_m2: 163600, adr_low: 5900, adr_high: 14500, occ_avg: 0.65, uk_fee: 0.25, model: "Short", loc_class: "Center" },
  { id: 410, city_code: 4, city: "Калининград", name: "Crystal House Suite Hotel & SPA", class: "Business", price_m2: 182600, adr_low: 6350, adr_high: 15650, occ_avg: 0.67, uk_fee: 0.25, model: "Short", loc_class: "Prime" },

  { id: 501, city_code: 5, city: "Казань", name: "Кремлевская 44", class: "Business", price_m2: 345100, adr_low: 8500, adr_high: 15300, occ_avg: 0.69, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 502, city_code: 5, city: "Казань", name: "Odette", class: "Business", price_m2: 345100, adr_low: 8500, adr_high: 15300, occ_avg: 0.69, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 503, city_code: 5, city: "Казань", name: "Savin House", class: "Business", price_m2: 309000, adr_low: 7500, adr_high: 13500, occ_avg: 0.68, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 504, city_code: 5, city: "Казань", name: "Art City", class: "Comfort", price_m2: 241100, adr_low: 6000, adr_high: 10800, occ_avg: 0.67, uk_fee: 0.23, model: "Hybrid", loc_class: "Hub" },
  { id: 505, city_code: 5, city: "Казань", name: "Европейский", class: "Business", price_m2: 309000, adr_low: 7500, adr_high: 13500, occ_avg: 0.68, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 506, city_code: 5, city: "Казань", name: "Clover House", class: "Business", price_m2: 309000, adr_low: 7500, adr_high: 13500, occ_avg: 0.68, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 507, city_code: 5, city: "Казань", name: "Ramada by Wyndham Kazan City Centre (apartments)", class: "Business", price_m2: 309000, adr_low: 7500, adr_high: 13500, occ_avg: 0.68, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
  { id: 508, city_code: 5, city: "Казань", name: "ApartHotel on Bauman", class: "Comfort", price_m2: 308100, adr_low: 7400, adr_high: 13300, occ_avg: 0.7, uk_fee: 0.25, model: "Short", loc_class: "Prime" },
  { id: 509, city_code: 5, city: "Казань", name: "Korston Tower (apartments)", class: "Business", price_m2: 270000, adr_low: 6900, adr_high: 12450, occ_avg: 0.65, uk_fee: 0.23, model: "Hybrid", loc_class: "Hub" },
  { id: 510, city_code: 5, city: "Казань", name: "Neo Kazan Palace (apartments)", class: "Business", price_m2: 309000, adr_low: 7500, adr_high: 13500, occ_avg: 0.68, uk_fee: 0.23, model: "Hybrid", loc_class: "Center" },
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
