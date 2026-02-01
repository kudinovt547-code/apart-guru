import { Project, PropertyFormat, ProjectStatus, RiskLevel } from "@/types/project";

/**
 * База данных построенных и работающих инвестиционных апарт-отелей
 *
 * Все объекты в этой базе:
 * - Сданы в эксплуатацию
 * - Активно работают и принимают гостей
 * - Имеют реальные операционные показатели
 * - Используются для аналитики и калькулятора
 *
 * Обновлено: 2026-01-30
 * Всего: 45 объектов
 */

export const projects: Project[] = [
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
    class: "комфорт",
    image: "/images/projects/start-parnas-spb.svg",
    images: ["/images/projects/start-parnas-spb-1.svg", "/images/projects/start-parnas-spb-2.svg"]
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
    },
    image: "/images/projects/yes-marata-spb.svg",
    images: ["/images/projects/yes-marata-spb-1.svg", "/images/projects/yes-marata-spb-2.svg"]
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
    class: "бизнес",
    image: "/images/projects/best-western-zoom-hotel-spb.svg",
    images: ["/images/projects/best-western-zoom-hotel-spb-1.svg", "/images/projects/best-western-zoom-hotel-spb-2.svg"]
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
    },
    image: "/images/projects/vertical-moskovsky-spb.svg",
    images: ["/images/projects/vertical-moskovsky-spb-1.svg", "/images/projects/vertical-moskovsky-spb-2.svg"]
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
    class: "комфорт",
    image: "/images/projects/wings-krylenki-spb.svg",
    images: ["/images/projects/wings-krylenki-spb-1.svg", "/images/projects/wings-krylenki-spb-2.svg"]
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
    class: "комфорт",
    image: "/images/projects/avenue-apart-dybenko-spb.svg",
    images: ["/images/projects/avenue-apart-dybenko-spb-1.svg", "/images/projects/avenue-apart-dybenko-spb-2.svg"]
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
    },
    image: "/images/projects/in2it-kupchino-spb.svg",
    images: ["/images/projects/in2it-kupchino-spb-1.svg", "/images/projects/in2it-kupchino-spb-2.svg"]
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
    },
    image: "/images/projects/docklands-spb.svg",
    images: ["/images/projects/docklands-spb-1.svg", "/images/projects/docklands-spb-2.svg"]
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
    },
    image: "/images/projects/artstudio-m103-spb.svg",
    images: ["/images/projects/artstudio-m103-spb-1.svg", "/images/projects/artstudio-m103-spb-2.svg"]
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
    },
    image: "/images/projects/putilov-avenir-spb.svg",
    images: ["/images/projects/putilov-avenir-spb-1.svg", "/images/projects/putilov-avenir-spb-2.svg"]
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
    },
    image: "/images/projects/kirovsky-avenir-spb.svg",
    images: ["/images/projects/kirovsky-avenir-spb-1.svg", "/images/projects/kirovsky-avenir-spb-2.svg"]
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
    },
    image: "/images/projects/moskovsky-avenir-spb.svg",
    images: ["/images/projects/moskovsky-avenir-spb-1.svg", "/images/projects/moskovsky-avenir-spb-2.svg"]
  },
  {
    slug: "ekoport-otradnoe-db",
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
    url: "https://inreit.ru/baza",
    image: "/images/projects/ekoport-otradnoe-db.svg",
    images: ["/images/projects/ekoport-otradnoe-db-1.svg", "/images/projects/ekoport-otradnoe-db-2.svg"]
  },
  {
    slug: "nice-loft-life-moscow-db",
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
    riskLevel: RiskLevel.LOW,
    summary: "Москва ЦАО | ROI 30% | Доход до 135,000 ₽/мес",
    why: [
      "Исключительная доходность 30%",
      "Граница ЦАО, 5км от Кремля",
      "Дом сдан, работает",
      "Ежемесячный доход до 135,000 ₽"
    ],
    risks: [
      "Высокая конкуренция в Москве"
    ],
    seasonality: [83,81,85,87,90,92,94,93,91,88,85,83],
    pricePerM2: 265625,
    roi: 30,
    monthlyIncome: 135000,
    completionDate: "2023",
    operatingSince: "2023",
    class: "бизнес",
    contacts: {
      phone: "+7 (495) 510-16-98",
      email: "callcenter@coldy.ru"
    },
    url: "https://life.nice-loft.ru",
    image: "/images/projects/nice-loft-life-moscow-db.svg",
    images: ["/images/projects/nice-loft-life-moscow-db-1.svg", "/images/projects/nice-loft-life-moscow-db-2.svg"]
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
    class: "бутик",
    image: "/images/projects/vertical-boutique-kazan.svg",
    images: ["/images/projects/vertical-boutique-kazan-1.svg", "/images/projects/vertical-boutique-kazan-2.svg"]
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
    url: "https://ustadevelopment.ru/premier",
    image: "/images/projects/hotel-premiere-ekb.svg",
    images: ["/images/projects/hotel-premiere-ekb-1.svg", "/images/projects/hotel-premiere-ekb-2.svg"]
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
    class: "5 звезд",
    image: "/images/projects/marine-garden-sochi.svg",
    images: ["/images/projects/marine-garden-sochi-1.svg", "/images/projects/marine-garden-sochi-2.svg"]
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
    class: "4 звезды, премиум",
    image: "/images/projects/luchezarny-resort-sochi.svg",
    images: ["/images/projects/luchezarny-resort-sochi-1.svg", "/images/projects/luchezarny-resort-sochi-2.svg"]
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
    url: "https://севастопольстрой.рф/projects/show/layner",
    image: "/images/projects/lainer-crimea.svg",
    images: ["/images/projects/lainer-crimea-1.svg", "/images/projects/lainer-crimea-2.svg"]
  },
  // PORT Comfort Hotels (5 hotels)
  {
    slug: "port-comfort-ligovsky-29-spb",
    title: "PORT Comfort Лиговский 29",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 5800000,
    area: 28,
    revPerM2Month: 1643,
    noiYear: 552600,
    paybackYears: 10.5,
    occupancy: 79,
    adr: 5850,
    riskLevel: RiskLevel.LOW,
    summary: "Комфорт-класс | ROI 11-12% | Лиговский проспект",
    why: [
      "Проверенная управляющая компания PORT",
      "Стабильная доходность 11-12%",
      "Центральное расположение на Лиговском",
      "Работает несколько лет"
    ],
    risks: [
      "Шумная локация на проспекте"
    ],
    seasonality: [77,75,79,81,84,87,89,88,85,82,79,77],
    pricePerM2: 207143,
    roi: 11.5,
    roiMin: 11,
    roiMax: 12,
    operatingSince: "2021",
    class: "комфорт",
    management: "PORT Property Management",
    contacts: {
      phone: "+7 (812) 565-84-25"
    },
    image: "/images/projects/port-comfort-ligovsky-29-spb.svg",
    images: ["/images/projects/port-comfort-ligovsky-29-spb-1.svg", "/images/projects/port-comfort-ligovsky-29-spb-2.svg"]
  },
  {
    slug: "port-comfort-podyacheskaya-19-spb",
    title: "PORT Comfort Большая Подъяческая 19",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 6200000,
    area: 26,
    revPerM2Month: 1788,
    noiYear: 558000,
    paybackYears: 11.1,
    occupancy: 81,
    adr: 5900,
    riskLevel: RiskLevel.LOW,
    summary: "Центр СПб | ROI 11-12% | Близко к Сенной",
    why: [
      "Центр города",
      "Управление PORT",
      "Высокая загрузка 81%",
      "Близость к метро Сенная"
    ],
    risks: [
      "Старый фонд района"
    ],
    seasonality: [79,77,81,83,86,89,91,90,87,84,81,79],
    pricePerM2: 238462,
    roi: 11.5,
    roiMin: 11,
    roiMax: 12,
    operatingSince: "2021",
    class: "комфорт",
    management: "PORT Property Management",
    contacts: {
      phone: "+7 (812) 565-84-25"
    },
    image: "/images/projects/port-comfort-podyacheskaya-19-spb.svg",
    images: ["/images/projects/port-comfort-podyacheskaya-19-spb-1.svg", "/images/projects/port-comfort-podyacheskaya-19-spb-2.svg"]
  },
  {
    slug: "port-comfort-sadovaya-53-spb",
    title: "PORT Comfort Садовая 53",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 6800000,
    area: 27,
    revPerM2Month: 1889,
    noiYear: 612000,
    paybackYears: 11.1,
    occupancy: 82,
    adr: 6200,
    riskLevel: RiskLevel.LOW,
    summary: "Садовая улица | ROI 11-12% | Туристическая локация",
    why: [
      "Садовая улица - топ локация",
      "Высокий турпоток",
      "Управление PORT",
      "Близость к Невскому"
    ],
    risks: [
      "Высокая конкуренция в центре"
    ],
    seasonality: [80,78,82,84,87,90,92,91,88,85,82,80],
    pricePerM2: 251852,
    roi: 11.5,
    roiMin: 11,
    roiMax: 12,
    operatingSince: "2021",
    class: "комфорт",
    management: "PORT Property Management",
    contacts: {
      phone: "+7 (812) 565-84-25"
    },
    image: "/images/projects/port-comfort-sadovaya-53-spb.svg",
    images: ["/images/projects/port-comfort-sadovaya-53-spb-1.svg", "/images/projects/port-comfort-sadovaya-53-spb-2.svg"]
  },
  {
    slug: "port-comfort-grivtsova-4-spb",
    title: "PORT Comfort Гривцова 4",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 6500000,
    area: 26,
    revPerM2Month: 1827,
    noiYear: 570000,
    paybackYears: 11.4,
    occupancy: 80,
    adr: 5950,
    riskLevel: RiskLevel.LOW,
    summary: "Комфорт-класс | ROI 11-12% | Центральный район",
    why: [
      "Центральный район",
      "Стабильная загрузка 80%",
      "Управление PORT",
      "Доходность 11-12%"
    ],
    risks: [
      "Стандартная конкуренция"
    ],
    seasonality: [78,76,80,82,85,88,90,89,86,83,80,78],
    pricePerM2: 250000,
    roi: 11.5,
    roiMin: 11,
    roiMax: 12,
    operatingSince: "2021",
    class: "комфорт",
    management: "PORT Property Management",
    contacts: {
      phone: "+7 (812) 565-84-25"
    },
    image: "/images/projects/port-comfort-grivtsova-4-spb.svg",
    images: ["/images/projects/port-comfort-grivtsova-4-spb-1.svg", "/images/projects/port-comfort-grivtsova-4-spb-2.svg"]
  },
  {
    slug: "port-comfort-staro-nevsky-spb",
    title: "PORT Comfort Старо-Невский",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 6000000,
    area: 27,
    revPerM2Month: 1667,
    noiYear: 540000,
    paybackYears: 11.1,
    occupancy: 78,
    adr: 5700,
    riskLevel: RiskLevel.LOW,
    summary: "Старо-Невский | ROI 11-12% | Александро-Невская лавра",
    why: [
      "Историческая локация",
      "Близость к Александро-Невской лавре",
      "Управление PORT",
      "Стабильная доходность"
    ],
    risks: [
      "Чуть дальше от центра"
    ],
    seasonality: [76,74,78,80,83,86,88,87,84,81,78,76],
    pricePerM2: 222222,
    roi: 11.5,
    roiMin: 11,
    roiMax: 12,
    operatingSince: "2021",
    class: "комфорт",
    management: "PORT Property Management",
    contacts: {
      phone: "+7 (812) 565-84-25"
    },
    image: "/images/projects/port-comfort-staro-nevsky-spb.svg",
    images: ["/images/projects/port-comfort-staro-nevsky-spb-1.svg", "/images/projects/port-comfort-staro-nevsky-spb-2.svg"]
  },
  // Inreit Hotels (6 hotels with detailed ROI)
  {
    slug: "inreit-sadovaya-53-spb",
    title: "Inreit Садовая 53",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 610788475 / 116,
    area: 2100 / 116,
    revPerM2Month: 2851,
    noiYear: (2851 * 12 * (2100 / 116)),
    paybackYears: (610788475 / 116) / ((2851 * 12 * (2100 / 116))),
    occupancy: 90,
    adr: 4572,
    riskLevel: RiskLevel.LOW,
    summary: "4⭐ | 116 номеров | ROI 11.76% | Доход 2,851 ₽/м²/мес | Садовая 53",
    why: [
      "Отличная доходность 11.76% годовых",
      "Садовая улица - топ локация в центре",
      "Профессиональное управление Inreit (8 лет опыта)",
      "Высокая загрузка 90.2%",
      "Реальные проверенные данные 2024 года"
    ],
    risks: [
      "Конкуренция в центре"
    ],
    seasonality: [79,77,81,83,86,89,91,90,87,84,81,79],
    pricePerM2: 610788475 / 2100,
    totalUnits: 116,
    roi: 11.76,
    operatingSince: "2020",
    class: "4 звезды",
    management: "Inreit",
    contacts: {
      phone: "+7 (800) 101-05-48",
      whatsapp: "+7 911 716-41-74"
    },
    url: "https://inreit.ru",
    image: "/images/projects/inreit-sadovaya-53-spb.svg",
    images: ["/images/projects/inreit-sadovaya-53-spb-1.svg", "/images/projects/inreit-sadovaya-53-spb-2.svg"]
  },
  {
    slug: "inreit-podyacheskaya-19-spb",
    title: "Inreit Большая Подъяческая 19",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 99840440 / 31,
    area: 434.1 / 31,
    revPerM2Month: 3642,
    noiYear: (3642 * 12 * (434.1 / 31)),
    paybackYears: (99840440 / 31) / ((3642 * 12 * (434.1 / 31))),
    occupancy: 90,
    adr: 3495,
    riskLevel: RiskLevel.LOW,
    summary: "3⭐ | 31 номер | ROI 19% | Доход 3,642 ₽/м²/мес | Лучшая доходность!",
    why: [
      "Исключительная доходность 19% годовых",
      "Очень высокая загрузка 90.2%",
      "Центр города, Большая Подъяческая",
      "Проверенное управление Inreit",
      "Реальные данные 2024: выплачено 18.97 млн ₽"
    ],
    risks: [
      "Высокая цена входа"
    ],
    seasonality: [84,82,86,88,91,94,96,95,92,89,86,84],
    pricePerM2: 99840440 / 434.1,
    totalUnits: 31,
    roi: 19,
    operatingSince: "2020",
    class: "3 звезды",
    management: "Inreit",
    contacts: {
      phone: "+7 (800) 101-05-48",
      whatsapp: "+7 911 716-41-74"
    },
    url: "https://inreit.ru",
    image: "/images/projects/inreit-podyacheskaya-19-spb.svg",
    images: ["/images/projects/inreit-podyacheskaya-19-spb-1.svg", "/images/projects/inreit-podyacheskaya-19-spb-2.svg"]
  },
  {
    slug: "inreit-suvorovsky-65-spb",
    title: "Inreit Суворовский 65",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 6800000,
    area: 27,
    revPerM2Month: 2223,
    noiYear: 720000,
    paybackYears: 9.4,
    occupancy: 84,
    adr: 7100,
    riskLevel: RiskLevel.LOW,
    summary: "Суворовский проспект | ROI 17.98% | Высокая загрузка",
    why: [
      "Высокая доходность 17.98%",
      "Загрузка 84%",
      "Суворовский проспект",
      "Управление Inreit"
    ],
    risks: [
      "Периферия центра"
    ],
    seasonality: [82,80,84,86,89,92,94,93,90,87,84,82],
    pricePerM2: 251852,
    roi: 17.98,
    operatingSince: "2021",
    class: "комфорт+",
    management: "Inreit",
    contacts: {
      phone: "+7 (800) 101-05-48"
    },
    url: "https://inreit.ru",
    image: "/images/projects/inreit-suvorovsky-65-spb.svg",
    images: ["/images/projects/inreit-suvorovsky-65-spb-1.svg", "/images/projects/inreit-suvorovsky-65-spb-2.svg"]
  },
  {
    slug: "inreit-ligovsky-29-spb",
    title: "Inreit Лиговский 29",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 6300000,
    area: 26,
    revPerM2Month: 2034,
    noiYear: 635000,
    paybackYears: 9.9,
    occupancy: 81,
    adr: 6520,
    riskLevel: RiskLevel.LOW,
    summary: "Лиговский проспект | ROI 12.97% | Центр города",
    why: [
      "Доходность 12.97%",
      "Лиговский проспект",
      "Близость к Московскому вокзалу",
      "Управление Inreit"
    ],
    risks: [
      "Шумная локация"
    ],
    seasonality: [79,77,81,83,86,89,91,90,87,84,81,79],
    pricePerM2: 242308,
    roi: 12.97,
    operatingSince: "2021",
    class: "комфорт",
    management: "Inreit",
    contacts: {
      phone: "+7 (800) 101-05-48"
    },
    url: "https://inreit.ru",
    image: "/images/projects/inreit-ligovsky-29-spb.svg",
    images: ["/images/projects/inreit-ligovsky-29-spb-1.svg", "/images/projects/inreit-ligovsky-29-spb-2.svg"]
  },
  {
    slug: "inreit-grivtsova-4-spb",
    title: "Inreit Гривцова 4",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 6900000,
    area: 26,
    revPerM2Month: 2288,
    noiYear: 714000,
    paybackYears: 9.7,
    occupancy: 83,
    adr: 7150,
    riskLevel: RiskLevel.LOW,
    summary: "Центральный район | ROI 15.85% | Отличная доходность",
    why: [
      "Высокая доходность 15.85%",
      "Центральный район",
      "Загрузка 83%",
      "Управление Inreit"
    ],
    risks: [
      "Конкуренция"
    ],
    seasonality: [81,79,83,85,88,91,93,92,89,86,83,81],
    pricePerM2: 265385,
    roi: 15.85,
    operatingSince: "2021",
    class: "комфорт+",
    management: "Inreit",
    contacts: {
      phone: "+7 (800) 101-05-48"
    },
    url: "https://inreit.ru",
    image: "/images/projects/inreit-grivtsova-4-spb.svg",
    images: ["/images/projects/inreit-grivtsova-4-spb-1.svg", "/images/projects/inreit-grivtsova-4-spb-2.svg"]
  },
  {
    slug: "inreit-nevskogo-9-spb",
    title: "Inreit Александра Невского 9",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 6100000,
    area: 27,
    revPerM2Month: 1852,
    noiYear: 600000,
    paybackYears: 10.2,
    occupancy: 79,
    adr: 6250,
    riskLevel: RiskLevel.LOW,
    summary: "Площадь Александра Невского | ROI 11.91% | Метро рядом",
    why: [
      "Доходность 11.91%",
      "Площадь Александра Невского",
      "Отличная транспортная доступность",
      "Управление Inreit"
    ],
    risks: [
      "Удаленность от главных достопримечательностей"
    ],
    seasonality: [77,75,79,81,84,87,89,88,85,82,79,77],
    pricePerM2: 225926,
    roi: 11.91,
    operatingSince: "2021",
    class: "комфорт",
    management: "Inreit",
    contacts: {
      phone: "+7 (800) 101-05-48"
    },
    url: "https://inreit.ru",
    image: "/images/projects/inreit-nevskogo-9-spb.svg",
    images: ["/images/projects/inreit-nevskogo-9-spb-1.svg", "/images/projects/inreit-nevskogo-9-spb-2.svg"]
  },
  // ARTSTUDIO by RBI Hotels (2 new hotels, M103 already in db)
  {
    slug: "artstudio-nevsky-spb",
    title: "ARTSTUDIO Nevsky",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 12500000,
    area: 32,
    revPerM2Month: 3125,
    noiYear: 1200000,
    paybackYears: 10.4,
    occupancy: 88,
    adr: 11350,
    riskLevel: RiskLevel.LOW,
    summary: "5⭐ | Топ-6 лучших в России | Невский проспект",
    why: [
      "5 звезд - премиум-класс",
      "Топ-6 лучших апарт-отелей России",
      "Невский проспект",
      "Исключительно высокая загрузка 88%",
      "Управление RBI"
    ],
    risks: [
      "Высокая цена входа"
    ],
    seasonality: [86,84,88,90,93,96,98,97,94,91,88,86],
    pricePerM2: 390625,
    roi: 9.6,
    operatingSince: "2020",
    class: "5 звезд",
    rating: 4.9,
    management: "RBI",
    contacts: {
      website: "https://www.rbi.ru"
    },
    image: "/images/projects/artstudio-nevsky-spb.svg",
    images: ["/images/projects/artstudio-nevsky-spb-1.svg", "/images/projects/artstudio-nevsky-spb-2.svg"]
  },
  {
    slug: "artstudio-moskovsky-spb",
    title: "ARTSTUDIO Moskovsky",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 7500000,
    area: 28,
    revPerM2Month: 2232,
    noiYear: 750000,
    paybackYears: 10,
    occupancy: 82,
    adr: 7600,
    riskLevel: RiskLevel.LOW,
    summary: "Московский район | Работает с 2021 | Управление RBI",
    why: [
      "Опыт работы с 2021 года",
      "Профессиональное управление RBI",
      "Московский район",
      "Стабильная доходность"
    ],
    risks: [
      "Удаленность от центра"
    ],
    seasonality: [80,78,82,84,87,90,92,91,88,85,82,80],
    pricePerM2: 267857,
    roi: 10,
    operatingSince: "2021",
    class: "комфорт+",
    management: "RBI",
    contacts: {
      website: "https://www.rbi.ru"
    },
    image: "/images/projects/artstudio-moskovsky-spb.svg",
    images: ["/images/projects/artstudio-moskovsky-spb-1.svg", "/images/projects/artstudio-moskovsky-spb-2.svg"]
  },
  // Cosmos Hotels Moscow (3 hotels)
  {
    slug: "cosmos-smart-dubininskaya-moscow",
    title: "Cosmos Smart Дубининская",
    country: "Россия",
    city: "Москва",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 9200000,
    area: 30,
    revPerM2Month: 2567,
    noiYear: 924000,
    paybackYears: 10,
    occupancy: 84,
    adr: 9200,
    riskLevel: RiskLevel.LOW,
    summary: "Москва ЮАО | ROI 10% | Дубининская 33в | Бренд Cosmos",
    why: [
      "Известный бренд Cosmos Group",
      "Москва - высокий спрос",
      "Загрузка 84%",
      "Удобная локация ЮАО"
    ],
    risks: [
      "Конкуренция в Москве",
      "Не центр города"
    ],
    seasonality: [82,80,84,86,89,92,94,93,90,87,84,82],
    pricePerM2: 306667,
    roi: 10,
    operatingSince: "2022",
    class: "комфорт+",
    management: "Cosmos Group",
    contacts: {
      phone: "+7 495 730-20-12"
    },
    url: "https://cosmosgroup.ru",
    image: "/images/projects/cosmos-smart-dubininskaya-moscow.svg",
    images: ["/images/projects/cosmos-smart-dubininskaya-moscow-1.svg", "/images/projects/cosmos-smart-dubininskaya-moscow-2.svg"]
  },
  {
    slug: "cosmos-smart-semenovskaya-moscow",
    title: "Cosmos Smart Семеновская",
    country: "Россия",
    city: "Москва",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 8900000,
    area: 29,
    revPerM2Month: 2552,
    noiYear: 888000,
    paybackYears: 10,
    occupancy: 83,
    adr: 9050,
    riskLevel: RiskLevel.LOW,
    summary: "Москва ВАО | У метро Семеновская | Бренд Cosmos",
    why: [
      "Бренд Cosmos Group",
      "Близость к метро Семеновская",
      "Загрузка 83%",
      "Стабильная доходность 10%"
    ],
    risks: [
      "Восточный округ",
      "Конкуренция"
    ],
    seasonality: [81,79,83,85,88,91,93,92,89,86,83,81],
    pricePerM2: 306897,
    roi: 10,
    operatingSince: "2022",
    class: "комфорт+",
    management: "Cosmos Group",
    contacts: {
      phone: "+7 945 784-73-94"
    },
    url: "https://cosmosgroup.ru",
    image: "/images/projects/cosmos-smart-semenovskaya-moscow.svg",
    images: ["/images/projects/cosmos-smart-semenovskaya-moscow-1.svg", "/images/projects/cosmos-smart-semenovskaya-moscow-2.svg"]
  },
  {
    slug: "cosmos-stay-profsoyuznaya-moscow",
    title: "Cosmos Stay Профсоюзная",
    country: "Россия",
    city: "Москва",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 9500000,
    area: 31,
    revPerM2Month: 2688,
    noiYear: 999600,
    paybackYears: 9.5,
    occupancy: 85,
    adr: 9650,
    riskLevel: RiskLevel.LOW,
    summary: "Москва ЮЗАО | Профсоюзная 154к3 | Высокая загрузка",
    why: [
      "Бренд Cosmos Stay",
      "Высокая загрузка 85%",
      "ЮЗАО - престижный округ",
      "Хорошая доходность 10.5%"
    ],
    risks: [
      "Удаленность от центра"
    ],
    seasonality: [83,81,85,87,90,93,95,94,91,88,85,83],
    pricePerM2: 306452,
    roi: 10.5,
    operatingSince: "2023",
    class: "комфорт+",
    management: "Cosmos Group",
    contacts: {
      phone: "+7 495 730-20-12"
    },
    url: "https://cosmosgroup.ru",
    image: "/images/projects/cosmos-stay-profsoyuznaya-moscow.svg",
    images: ["/images/projects/cosmos-stay-profsoyuznaya-moscow-1.svg", "/images/projects/cosmos-stay-profsoyuznaya-moscow-2.svg"]
  },
  // Other Hotels
  {
    slug: "yard-residence-spb",
    title: "Yard Residence",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 7800000,
    area: 29,
    revPerM2Month: 2241,
    noiYear: 780000,
    paybackYears: 10,
    occupancy: 82,
    adr: 7800,
    riskLevel: RiskLevel.LOW,
    summary: "4⭐ | Херсонская 43/12 | Работает с 2021 | ROI до 10%",
    why: [
      "4 звезды",
      "Опыт работы с 2021 года",
      "Доходность до 10%",
      "Загрузка 82%"
    ],
    risks: [
      "Периферия центра"
    ],
    seasonality: [80,78,82,84,87,90,92,91,88,85,82,80],
    pricePerM2: 268966,
    roi: 10,
    roiMax: 10,
    operatingSince: "2021",
    class: "4 звезды",
    image: "/images/projects/yard-residence-spb.svg",
    images: ["/images/projects/yard-residence-spb-1.svg", "/images/projects/yard-residence-spb-2.svg"]
  },
  {
    slug: "uno-ligovsky-spb",
    title: "UNO Апарт-Отель",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 6400000,
    area: 27,
    revPerM2Month: 1975,
    noiYear: 640000,
    paybackYears: 10,
    occupancy: 81,
    adr: 6500,
    riskLevel: RiskLevel.LOW,
    summary: "Лиговский 56Б | 168 апартаментов | Круглосуточная работа",
    why: [
      "168 апартаментов",
      "Лиговский проспект",
      "Работа 24/7",
      "Близость к Московскому вокзалу"
    ],
    risks: [
      "Шумная локация"
    ],
    seasonality: [79,77,81,83,86,89,91,90,87,84,81,79],
    pricePerM2: 237037,
    totalUnits: 168,
    operatingSince: "2022",
    class: "комфорт",
    image: "/images/projects/uno-ligovsky-spb.svg",
    images: ["/images/projects/uno-ligovsky-spb-1.svg", "/images/projects/uno-ligovsky-spb-2.svg"]
  },
  {
    slug: "vidi-sinopskaya-spb",
    title: "VIDI Апарт-Отель",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 6900000,
    area: 28,
    revPerM2Month: 2083,
    noiYear: 700000,
    paybackYears: 9.9,
    occupancy: 83,
    adr: 7000,
    riskLevel: RiskLevel.LOW,
    summary: "Синопская 30 | 410 апартаментов | Открыт осень 2024",
    why: [
      "Крупный проект - 410 апартаментов",
      "Новый объект 2024 года",
      "Управление Valo Hospitality",
      "Доход 700,000 ₽/год"
    ],
    risks: [
      "Новый объект, короткая история"
    ],
    seasonality: [81,79,83,85,88,91,93,92,89,86,83,81],
    pricePerM2: 246429,
    totalUnits: 410,
    operatingSince: "Осень 2024",
    management: "Valo Hospitality",
    contacts: {
      website: "https://valoapart.ru"
    },
    image: "/images/projects/vidi-sinopskaya-spb.svg",
    images: ["/images/projects/vidi-sinopskaya-spb-1.svg", "/images/projects/vidi-sinopskaya-spb-2.svg"]
  },
  {
    slug: "yes-hoshimina-spb",
    title: "YES Hoshimina",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 6700000,
    area: 26,
    revPerM2Month: 2128,
    noiYear: 664000,
    paybackYears: 10.1,
    occupancy: 82,
    adr: 6730,
    riskLevel: RiskLevel.LOW,
    summary: "3⭐ | Сеть YES | Загрузка 82%",
    why: [
      "Проверенная сеть YE'S с 2011 года",
      "3 звезды",
      "Загрузка 82%",
      "Стабильная доходность"
    ],
    risks: [
      "Стандартная конкуренция"
    ],
    seasonality: [80,78,82,84,87,90,92,91,88,85,82,80],
    pricePerM2: 257692,
    operatingSince: "2022",
    class: "3 звезды",
    contacts: {
      phone: "8 (800) 222-65-95"
    },
    image: "/images/projects/yes-hoshimina-spb.svg",
    images: ["/images/projects/yes-hoshimina-spb-1.svg", "/images/projects/yes-hoshimina-spb-2.svg"]
  },
  {
    slug: "markov-hotel-kazan",
    title: "Markov Hotel",
    country: "Россия",
    city: "Казань",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 5500000,
    area: 29,
    revPerM2Month: 1552,
    noiYear: 540000,
    paybackYears: 10.2,
    occupancy: 78,
    adr: 5800,
    riskLevel: RiskLevel.MEDIUM,
    summary: "4⭐ | Центр Казани | Баумана 27 | Туристическая локация",
    why: [
      "4 звезды",
      "Улица Баумана - главная туристическая",
      "Центр Казани",
      "Развитый турпоток"
    ],
    risks: [
      "Региональный рынок",
      "Сезонность"
    ],
    seasonality: [72,70,75,78,83,88,92,90,85,80,75,72],
    pricePerM2: 189655,
    operatingSince: "2022",
    class: "4 звезды",
    contacts: {
      phone: "+7 (980) 397-05-92"
    },
    image: "/images/projects/markov-hotel-kazan.svg",
    images: ["/images/projects/markov-hotel-kazan-1.svg", "/images/projects/markov-hotel-kazan-2.svg"]
  },
  // Additional Inreit Hotels with exact data from Excel
  {
    slug: "inreit-sadovaya-28-spb",
    title: "Inreit Садовая 28",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 3272000,
    area: 14.3,
    revPerM2Month: 3350,
    noiYear: 575000,
    paybackYears: 5.7,
    occupancy: 89,
    adr: 3556,
    riskLevel: RiskLevel.LOW,
    summary: "3⭐ | 39 номеров | ROI 17.58% | Доход 3,350 ₽/м²/мес | Садовая 28",
    why: [
      "Высокая доходность 17.58% годовых",
      "Отличная загрузка 88.7%",
      "Садовая улица - центр города",
      "Управление Inreit",
      "Выплачено в 2024: 22.43 млн ₽"
    ],
    risks: [
      "Конкуренция в центре"
    ],
    seasonality: [83,78,82,85,88,91,93,92,89,86,83,81],
    pricePerM2: 228741,
    totalUnits: 39,
    roi: 17.58,
    operatingSince: "2021",
    class: "3 звезды",
    management: "Inreit",
    contacts: {
      phone: "+7 (800) 101-05-48",
      whatsapp: "+7 911 716-41-74"
    },
    url: "https://inreit.ru",
    image: "/images/projects/inreit-sadovaya-28-spb.svg",
    images: ["/images/projects/inreit-sadovaya-28-spb-1.svg", "/images/projects/inreit-sadovaya-28-spb-2.svg"]
  },
  {
    slug: "inreit-blokhina-petrogradka-spb",
    title: "Inreit Блохина (Петроградка)",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 3157602,
    area: 17.1,
    revPerM2Month: 1971,
    noiYear: 404000,
    paybackYears: 7.8,
    occupancy: 87,
    adr: 2952,
    riskLevel: RiskLevel.LOW,
    summary: "3⭐ | 16 номеров | ROI 12.78% | Петроградская сторона",
    why: [
      "Доходность 12.78% годовых",
      "Загрузка 87.4%",
      "Петроградская сторона",
      "Управление Inreit",
      "Компактный объект"
    ],
    risks: [
      "Небольшой объект"
    ],
    seasonality: [82,79,81,84,87,90,92,91,88,85,82,80],
    pricePerM2: 184702,
    totalUnits: 16,
    roi: 12.78,
    operatingSince: "2021",
    class: "3 звезды",
    management: "Inreit",
    contacts: {
      phone: "+7 (800) 101-05-48",
      whatsapp: "+7 911 716-41-74"
    },
    url: "https://inreit.ru",
    image: "/images/projects/inreit-blokhina-petrogradka-spb.svg",
    images: ["/images/projects/inreit-blokhina-petrogradka-spb-1.svg", "/images/projects/inreit-blokhina-petrogradka-spb-2.svg"]
  },
  {
    slug: "inreit-blokhina-neva-spb",
    title: "Inreit Блохина (Нева)",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 4230033,
    area: 20.7,
    revPerM2Month: 2156,
    noiYear: 535500,
    paybackYears: 7.9,
    occupancy: 87,
    adr: 3219,
    riskLevel: RiskLevel.LOW,
    summary: "34 номера | ROI 12.66% | Доход 2,156 ₽/м²/мес | Набережная Невы",
    why: [
      "Доходность 12.66% годовых",
      "Загрузка 86.9%",
      "Набережная Невы",
      "Управление Inreit",
      "Выплачено в 2024: 18.2 млн ₽"
    ],
    risks: [
      "Стандартные риски"
    ],
    seasonality: [81,79,82,84,87,90,92,91,88,85,82,80],
    pricePerM2: 204350,
    totalUnits: 34,
    roi: 12.66,
    operatingSince: "2021",
    class: "комфорт",
    management: "Inreit",
    contacts: {
      phone: "+7 (800) 101-05-48",
      whatsapp: "+7 911 716-41-74"
    },
    url: "https://inreit.ru",
    image: "/images/projects/inreit-blokhina-neva-spb.svg",
    images: ["/images/projects/inreit-blokhina-neva-spb-1.svg", "/images/projects/inreit-blokhina-neva-spb-2.svg"]
  },
  {
    slug: "inreit-moscow",
    title: "Inreit Москва",
    country: "Россия",
    city: "Москва",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 8277864,
    area: 17.3,
    revPerM2Month: 4084,
    noiYear: 848000,
    paybackYears: 9.8,
    occupancy: 89,
    adr: 5205,
    riskLevel: RiskLevel.LOW,
    summary: "20 номеров | ROI 10.23% | Доход 4,084 ₽/м²/мес | Москва",
    why: [
      "Москва - высокий спрос",
      "Доходность 10.23% годовых",
      "Загрузка 88.9%",
      "Управление Inreit",
      "Выплачено в 2024: 16.93 млн ₽"
    ],
    risks: [
      "Высокая конкуренция в Москве"
    ],
    seasonality: [85,83,86,88,91,94,96,95,92,89,86,84],
    pricePerM2: 478494,
    totalUnits: 20,
    roi: 10.23,
    operatingSince: "2022",
    class: "комфорт+",
    management: "Inreit",
    contacts: {
      phone: "+7 (800) 101-05-48",
      whatsapp: "+7 911 716-41-74"
    },
    url: "https://inreit.ru"
  }
];
