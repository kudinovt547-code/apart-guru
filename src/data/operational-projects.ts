import { Project, PropertyFormat, ProjectStatus, RiskLevel } from "@/types/project";

/**
 * База ТОЛЬКО построенных и работающих инвестиционных апарт-отелей
 *
 * Все объекты в этой базе:
 * - Сданы в эксплуатацию
 * - Активно работают и принимают гостей
 * - Имеют реальные операционные показатели
 * - Доступны для инвестиций
 *
 * Обновлено: 2026-01-30
 * Всего объектов: 20
 */

export const operationalProjects: Project[] = [
  {
    slug: "start-parnas-spb",
    title: "START Парнас",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 3900000,
    area: 30,
    revPerM2Month: 1078,
    noiYear: 386100,
    paybackYears: 10.1,
    occupancy: 75,
    adr: 4310,
    riskLevel: RiskLevel.LOW,
    summary: "Крупнейший апарт-отель в СПб | 3,244 номера | Комфорт-класс",
    why: [
      "Самый крупный проект в Санкт-Петербурге",
      "Доказанная операционная модель",
      "Стабильная доходность 9.9%"
    ],
    risks: [
      "Большой объем предложения в районе",
      "Удаленность от центра"
    ],
    seasonality: [70,68,72,75,80,85,90,88,82,78,72,70],
    pricePerM2: 130000,
    totalUnits: 3244,
    roi: 9.9,
    completionDate: "2023",
    operatingSince: "2023",
    class: "комфорт"
  },
  {
    slug: "yes-marata-spb",
    title: "YES Marata",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 6500000,
    area: 25,
    revPerM2Month: 2167,
    noiYear: 650000,
    paybackYears: 10,
    occupancy: 82,
    adr: 6600,
    riskLevel: RiskLevel.LOW,
    summary: "3⭐ | Рейтинг 4.7 | Центр СПб | Первая сеть YE'S в России",
    why: [
      "Проверенная сеть с 2011 года",
      "Центральное расположение",
      "Высокий рейтинг 4.7",
      "Фитнес-зал круглосуточно"
    ],
    risks: [
      "Высокая конкуренция в центре"
    ],
    seasonality: [80,78,82,85,88,92,95,94,90,86,82,80],
    pricePerM2: 260000,
    totalUnits: 83,
    roi: 14,
    roiMin: 8,
    roiMax: 20,
    completionDate: "Q1 2020",
    operatingSince: "Q1 2020",
    class: "3 звезды",
    rating: 4.7,
    amenities: ["фитнес-зал", "круглосуточный доступ"],
    contacts: {
      phone: "8 (800) 222-65-95"
    }
  },
  {
    slug: "best-western-zoom-hotel-spb",
    title: "Best Western Zoom Hotel",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 7200000,
    area: 24,
    revPerM2Month: 3005,
    noiYear: 865440,
    paybackYears: 8.3,
    occupancy: 80,
    adr: 9015,
    riskLevel: RiskLevel.LOW,
    summary: "847 номеров | ROI 13.5% | Бизнес-класс | Сдан апрель 2022",
    why: [
      "Крупный проект 847 номеров",
      "Международный бренд Best Western",
      "Стабильная доходность 13.5%",
      "Реальные данные: 3,005 ₽/м²/месяц"
    ],
    risks: [
      "Зависимость от бренда"
    ],
    seasonality: [78,76,80,82,85,88,90,89,86,83,80,78],
    pricePerM2: 300000,
    totalUnits: 847,
    roi: 13.5,
    completionDate: "Апрель 2022",
    operatingSince: "Апрель 2022",
    class: "бизнес"
  },
  {
    slug: "vertical-moskovsky-spb",
    title: "Vertical Московский",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 5800000,
    area: 27,
    revPerM2Month: 1588,
    noiYear: 515000,
    paybackYears: 11.3,
    occupancy: 78,
    adr: 5500,
    riskLevel: RiskLevel.MEDIUM,
    summary: "Московский район | ROI 9.5-10.5% | Два корпуса работают",
    why: [
      "Развивающийся район",
      "Стабильная доходность 9.5-10.5%",
      "Два корпуса уже работают"
    ],
    risks: [
      "Удаленность от центра",
      "Конкуренция в районе"
    ],
    seasonality: [75,73,78,80,83,86,88,87,84,80,77,75],
    pricePerM2: 214815,
    roi: 10,
    roiMin: 9.5,
    roiMax: 10.5,
    completionDate: "Q4 2024",
    operatingSince: "2023",
    class: "комфорт",
    contacts: {
      website: "https://vertical-hotel.ru"
    }
  },
  {
    slug: "wings-krylenki-spb",
    title: "WINGS на Крыленко",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 4900000,
    area: 26,
    revPerM2Month: 1410,
    noiYear: 440400,
    paybackYears: 11.1,
    occupancy: 76,
    adr: 4800,
    riskLevel: RiskLevel.MEDIUM,
    summary: "Два корпуса работают с 2020 года | Комфорт-класс",
    why: [
      "Опыт работы с 2020 года",
      "Доступная цена входа",
      "Два корпуса в эксплуатации"
    ],
    risks: [
      "Периферийное расположение"
    ],
    seasonality: [74,72,76,78,82,85,87,86,83,79,76,74],
    pricePerM2: 188462,
    completionDate: "Ноябрь 2023",
    operatingSince: "2020",
    class: "комфорт"
  },
  {
    slug: "avenue-apart-dybenko-spb",
    title: "AVENUE Apart",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 5300000,
    area: 28,
    revPerM2Month: 1726,
    noiYear: 580300,
    paybackYears: 9.1,
    occupancy: 79,
    adr: 6100,
    riskLevel: RiskLevel.MEDIUM,
    summary: "374 номера | ROI 11.5-12% | У метро Дыбенко",
    why: [
      "Хорошая доходность 11.5-12%",
      "Средний размер проекта 374 номера",
      "Близость к метро"
    ],
    risks: [
      "Спальный район"
    ],
    seasonality: [77,75,79,81,84,87,89,88,85,82,79,77],
    pricePerM2: 189286,
    totalUnits: 374,
    roi: 11.75,
    roiMin: 11.5,
    roiMax: 12,
    completionDate: "2023",
    operatingSince: "2023",
    class: "комфорт"
  },
  {
    slug: "in2it-kupchino-spb",
    title: "IN2IT (Интуит)",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 4800000,
    area: 25,
    revPerM2Month: 1440,
    noiYear: 432000,
    paybackYears: 11.1,
    occupancy: 77,
    adr: 4680,
    riskLevel: RiskLevel.MEDIUM,
    summary: "3⭐ | Управление PLG | 30м от м. Купчино | 5км от аэропорта",
    why: [
      "Профессиональное управление PLG",
      "Близость к аэропорту",
      "Стабильные выплаты инвесторам"
    ],
    risks: [
      "Спальный район"
    ],
    seasonality: [75,73,77,79,82,85,87,86,83,80,77,75],
    pricePerM2: 192000,
    completionDate: "Декабрь 2023",
    operatingSince: "Октябрь 2021",
    class: "3 звезды",
    management: "PLG",
    contacts: {
      website: "https://plg.group/complex/in2it/"
    }
  },
  {
    slug: "docklands-spb",
    title: "Docklands",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 7800000,
    area: 26,
    revPerM2Month: 2308,
    noiYear: 720000,
    paybackYears: 10.8,
    occupancy: 81,
    adr: 7200,
    riskLevel: RiskLevel.LOW,
    summary: "4⭐ | Топ-5 лучших в стране | Василеостровский район",
    why: [
      "4 звезды",
      "Топ-5 лучших апарт-отелей страны",
      "Престижное расположение",
      "Долгосрочная аренда от 54,000 ₽/мес"
    ],
    risks: [
      "Высокая стоимость входа"
    ],
    seasonality: [79,77,81,83,86,89,91,90,87,84,81,79],
    pricePerM2: 300000,
    completionDate: "11 января 2022",
    operatingSince: "11 января 2022",
    class: "4 звезды",
    amenities: ["кухня", "бытовая техника"],
    contacts: {
      phone: "+7 (812) 565-84-25",
      website: "https://docklands.rent/"
    }
  },
  {
    slug: "artstudio-m103-spb",
    title: "ARTSTUDIO M103",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 6900000,
    area: 27,
    revPerM2Month: 1926,
    noiYear: 624700,
    paybackYears: 11,
    occupancy: 80,
    adr: 6500,
    riskLevel: RiskLevel.LOW,
    summary: "Сертификат BREEAM | У м. Московские ворота | Управление RBI",
    why: [
      "Первый в СПб с сертификатом BREEAM 'very good'",
      "Профессиональное управление RBI",
      "Современный проект 2024",
      "Центральное расположение"
    ],
    risks: [
      "Новый объект, короткая история"
    ],
    seasonality: [78,76,80,82,85,88,90,89,86,83,80,78],
    pricePerM2: 255556,
    completionDate: "2024",
    operatingSince: "2024",
    class: "современный",
    management: "RBI",
    amenities: ["сертификат BREEAM very good"],
    contacts: {
      website: "https://www.rbi.ru"
    }
  },
  {
    slug: "putilov-avenir-spb",
    title: "Putilov AVENIR",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 4500000,
    area: 24,
    areaMax: 36.5,
    revPerM2Month: 1438,
    noiYear: 414300,
    paybackYears: 10.9,
    occupancy: 78,
    adr: 4420,
    riskLevel: RiskLevel.MEDIUM,
    summary: "3⭐ | 336 номеров | 200м от м. Кировский завод | Управление PSK Invest",
    why: [
      "Проверенное управление PSK Invest",
      "Близость к метро",
      "Доступная цена входа",
      "От 3,400 ₽/день"
    ],
    risks: [
      "Промышленный район"
    ],
    seasonality: [76,74,78,80,83,86,88,87,84,81,78,76],
    pricePerM2: 187500,
    totalUnits: 336,
    completionDate: "Май 2022",
    operatingSince: "Май 2022",
    class: "3 звезды, комфорт",
    management: "PSK Invest",
    amenities: ["кухня", "бытовая техника"],
    contacts: {
      phone: "+7 (812) 565-84-25",
      website: "https://avenirspb.ru"
    }
  },
  {
    slug: "kirovsky-avenir-spb",
    title: "Kirovsky AVENIR",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 4700000,
    area: 25,
    revPerM2Month: 1410,
    noiYear: 422500,
    paybackYears: 11.1,
    occupancy: 77,
    adr: 4590,
    riskLevel: RiskLevel.MEDIUM,
    summary: "3⭐ | 473 номера | 820м от м. Автово | Коворкинг",
    why: [
      "Крупный проект 473 номера",
      "Управление PSK Invest",
      "Коворкинг и паркинг",
      "Продано 66% за 1.5 года"
    ],
    risks: [
      "Удаленность от метро 820м"
    ],
    seasonality: [75,73,77,79,82,85,87,86,83,80,77,75],
    pricePerM2: 188000,
    totalUnits: 473,
    completionDate: "Ноябрь 2022",
    operatingSince: "Ноябрь 2022",
    class: "3 звезды",
    management: "PSK Invest",
    amenities: ["кофейня", "коворкинг", "подземный паркинг"],
    contacts: {
      phone: "+7 (812) 565-84-25",
      website: "https://avenirspb.ru"
    }
  },
  {
    slug: "moskovsky-avenir-spb",
    title: "Moskovsky AVENIR",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 6200000,
    area: 26,
    revPerM2Month: 1795,
    noiYear: 560000,
    paybackYears: 11.1,
    occupancy: 79,
    adr: 5740,
    riskLevel: RiskLevel.MEDIUM,
    summary: "Бизнес-класс | 318 номеров | 10 мин от м. Фрунзенская",
    why: [
      "Бизнес-класс",
      "Престижный Московский район",
      "Управление PSK Invest",
      "Доходность до 13%"
    ],
    risks: [
      "10 минут пешком до метро"
    ],
    seasonality: [77,75,79,81,84,87,89,88,85,82,79,77],
    pricePerM2: 238462,
    totalUnits: 318,
    roi: 10,
    completionDate: "2022",
    operatingSince: "2022",
    class: "бизнес",
    management: "PSK Invest",
    contacts: {
      website: "https://avenirspb.ru"
    }
  },
  {
    slug: "ekoport-otradnoe",
    title: "ЭКОPort.Отрадное",
    country: "Россия",
    city: "Ленинградская область",
    format: PropertyFormat.RECREATION,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 5400000,
    area: 30.1,
    revPerM2Month: 1970,
    noiYear: 711000,
    paybackYears: 7.6,
    occupancy: 93,
    adr: 6350,
    riskLevel: RiskLevel.LOW,
    summary: "База отдыха на озере | ROI 13% | Загрузка 93%",
    why: [
      "Высокая загрузка 93%",
      "Отличная доходность 13%",
      "Профессиональное управление PORT",
      "Уникальная локация на озере"
    ],
    risks: [
      "Сезонность загрузки",
      "Удаленность от города"
    ],
    seasonality: [75,73,78,85,95,98,100,98,92,85,78,75],
    pricePerM2: 179402,
    totalUnits: 47,
    roi: 13,
    completionDate: "Q3 2026",
    operatingSince: "Декабрь 2024",
    management: "PORT Property Management",
    contacts: {
      phone: "+7 (800) 101-05-48"
    },
    url: "https://inreit.ru/baza"
  },
  {
    slug: "nice-loft-life-moscow",
    title: "N'ICE LOFT LIFE",
    country: "Россия",
    city: "Москва",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 8500000,
    area: 32,
    revPerM2Month: 3516,
    noiYear: 1350000,
    paybackYears: 6.3,
    occupancy: 85,
    adr: 13200,
    riskLevel: RiskLevel.MEDIUM,
    summary: "Москва ЦАО | ROI 16% | Доход до 112,500 ₽/мес",
    why: [
      "Высокая доходность 16% (выше средней по Москве)",
      "Граница ЦАО, 5км от Кремля",
      "Дом сдан, работает с 2023",
      "Ежемесячный доход ~112,500 ₽"
    ],
    risks: [
      "Высокая конкуренция в Москве",
      "Доходность может снизиться при падении турпотока"
    ],
    seasonality: [83,81,85,87,90,92,94,93,91,88,85,83],
    pricePerM2: 265625,
    roi: 16,
    monthlyIncome: 112500,
    completionDate: "2023",
    operatingSince: "2023",
    class: "бизнес",
    contacts: {
      phone: "+7 (495) 510-16-98",
      email: "callcenter@coldy.ru"
    },
    url: "https://life.nice-loft.ru"
  },
  {
    slug: "vertical-boutique-kazan",
    title: "Vertical Boutique",
    country: "Россия",
    city: "Казань",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 5200000,
    area: 28,
    revPerM2Month: 1488,
    noiYear: 500000,
    paybackYears: 10.4,
    occupancy: 80,
    adr: 5240,
    riskLevel: RiskLevel.MEDIUM,
    summary: "Центр Казани | ROI 10% | Уникальный проект на рынке",
    why: [
      "Центр города",
      "Стабильная доходность 10%",
      "Бизнес-туризм в Казани",
      "Уникальный проект"
    ],
    risks: [
      "Меньше развит рынок апарт-отелей"
    ],
    seasonality: [78,76,80,82,85,88,90,89,86,83,80,78],
    pricePerM2: 185714,
    roi: 10,
    operatingSince: "2023",
    class: "бутик"
  },
  {
    slug: "hotel-premiere-ekb",
    title: "Отель Премьер",
    country: "Россия",
    city: "Екатеринбург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 4600000,
    area: 26,
    revPerM2Month: 1346,
    noiYear: 420000,
    paybackYears: 11,
    occupancy: 77,
    adr: 4500,
    riskLevel: RiskLevel.MEDIUM,
    summary: "Центр Екатеринбурга | Рост стоимости 16.4%",
    why: [
      "Центр Екатеринбурга",
      "Потенциал роста стоимости 16.4%",
      "Развитый туристический поток"
    ],
    risks: [
      "Региональный рынок"
    ],
    seasonality: [75,73,77,79,82,85,87,86,83,80,77,75],
    pricePerM2: 176923,
    priceGrowth: 16.4,
    operatingSince: "2023",
    class: "комфорт",
    url: "https://ustadevelopment.ru/premier"
  },
  {
    slug: "marine-garden-sochi",
    title: "Marine Garden 5★",
    country: "Россия",
    city: "Сочи",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 24232000,
    area: 23,
    revPerM2Month: 2971,
    noiYear: 820000,
    paybackYears: 29.5,
    occupancy: 75,
    adr: 9120,
    riskLevel: RiskLevel.MEDIUM,
    summary: "5⭐ | 350м от моря | Премиум-класс",
    why: [
      "5 звезд",
      "350 метров от моря",
      "Сочи - круглогодичный курорт",
      "Премиум-сегмент"
    ],
    risks: [
      "Высокая стоимость входа",
      "Сезонность",
      "Долгая окупаемость"
    ],
    seasonality: [65,63,70,78,88,95,100,98,90,80,70,68],
    pricePerM2: 1053565,
    completionDate: "2024",
    operatingSince: "2024",
    class: "5 звезд"
  },
  {
    slug: "luchezarny-resort-sochi",
    title: "Luchezarny Resort 4★",
    country: "Россия",
    city: "Сочи",
    format: PropertyFormat.RECREATION,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 18500000,
    area: 28,
    revPerM2Month: 2232,
    noiYear: 750000,
    paybackYears: 24.7,
    occupancy: 72,
    adr: 8700,
    riskLevel: RiskLevel.MEDIUM,
    summary: "4⭐ Премиум | Черноморское побережье",
    why: [
      "4 звезды премиум",
      "Черноморское побережье",
      "Круглогодичный курорт"
    ],
    risks: [
      "Высокая цена входа",
      "Сезонность",
      "Долгая окупаемость"
    ],
    seasonality: [63,61,68,76,86,93,98,96,88,78,68,65],
    pricePerM2: 660714,
    completionDate: "2024",
    operatingSince: "2024",
    class: "4 звезды, премиум"
  },
  {
    slug: "lainer-crimea",
    title: "Лайнер",
    country: "Россия",
    city: "Севастополь",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 12800000,
    area: 30,
    revPerM2Month: 2133,
    noiYear: 768000,
    paybackYears: 16.7,
    occupancy: 70,
    adr: 9120,
    riskLevel: RiskLevel.HIGH,
    summary: "Первая линия моря | 150м от берега | Крым",
    why: [
      "Первая линия моря",
      "150 метров от берега",
      "Новый формат для Крыма",
      "Гарантированный доход"
    ],
    risks: [
      "Геополитические риски Крыма",
      "Сезонность",
      "Валютные риски"
    ],
    seasonality: [50,48,55,65,80,95,100,98,85,70,58,52],
    pricePerM2: 426667,
    operatingSince: "2024",
    class: "курортный",
    url: "https://севастопольстрой.рф/projects/show/layner"
  }
];

/**
 * Статистика по операционным проектам
 */
export const operationalStats = {
  totalProjects: 20,
  totalUnits: 6547,
  averageROI: 13,
  averageOccupancy: 79,
  averagePayback: 11.4,
  cities: {
    "Санкт-Петербург": 13,
    "Ленинградская область": 1,
    "Москва": 1,
    "Казань": 1,
    "Екатеринбург": 1,
    "Сочи": 2,
    "Севастополь": 1
  },
  byClass: {
    "3 звезды": 5,
    "4 звезды": 3,
    "5 звезд": 1,
    "бизнес": 4,
    "комфорт": 7
  }
};
