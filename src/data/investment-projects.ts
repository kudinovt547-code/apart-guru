import { Project, PropertyFormat, ProjectStatus, RiskLevel } from "@/types/project";

/**
 * Инвестиционные проекты от застройщиков
 * Источник: investment-projects-full.json
 *
 * Это проекты для продажи инвесторам:
 * - Могут быть в строительстве или готовые
 * - Имеют инвестиционные программы
 * - Контакты застройщиков
 *
 * Обновлено: 2026-01-30
 * Всего объектов: 11
 */

export const investmentProjects: Project[] = [
  {
    slug: "yes-leader-moskovsky",
    title: "YES LEADER",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.PLANNING,
    updatedAt: "2026-01-30",
    price: 5900000,
    area: 30,
    revPerM2Month: 1635,
    noiYear: 590000,
    paybackYears: 10,
    occupancy: 75,
    adr: 6540,
    riskLevel: RiskLevel.MEDIUM,
    summary: "Апарт-отель с полной отделкой | 0% рассрочка до окончания | Скидка 20%",
    description: "Флагманский проект сети YES в Московском районе Санкт-Петербурга. Современный апарт-отель с полной отделкой премиум-класса и гарантированной доходностью от управляющей компании. Расположен в 5 минутах ходьбы от метро Московская, в динамично развивающемся районе с отличной транспортной доступностью. Идеален для инвесторов, ищущих стабильный пассивный доход с минимальным входом благодаря беспроцентной рассрочке.",
    why: [
      "0% рассрочка до окончания строительства",
      "Скидка 20%",
      "Московский район, у метро Московская",
      "Полная отделка"
    ],
    risks: [
      "Объект в строительстве",
      "Срок сдачи 2026"
    ],
    seasonality: [73,71,75,78,82,85,88,87,84,80,76,73],
    pricePerM2: 196667,
    completionDate: "2026",
    developer: "YE'S",
    contacts: {
      phone: "+7 812 336 03 36"
    },
    url: "https://www.yesleader.ru",
    image: "/images/projects/yes-leader-moskovsky.webp",
    images: ["/images/projects/yes-leader-moskovsky-1.webp", "/images/projects/yes-leader-moskovsky-2.webp"]
  },
  {
    slug: "inreit-hersonskaya-39",
    title: "Апарт-отель 4* на Херсонской 39",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.PLANNING,
    updatedAt: "2026-01-30",
    price: 5000000,
    area: 22.7,
    areaMax: 38.1,
    revPerM2Month: 1764,
    noiYear: 480000,
    paybackYears: 10.4,
    occupancy: 78,
    adr: 5120,
    riskLevel: RiskLevel.MEDIUM,
    summary: "4* бизнес-класс | Bleisure-отель | 165 номеров | Рост +23% в год",
    description: "Первый в Санкт-Петербурге апарт-отель в формате Bleisure — уникальное сочетание бизнес-инфраструктуры и комфорта для отдыха. Расположен в историческом центре города в 400 метрах от Невского проспекта. Объект от проверенного девелопера Inreit с подтвержденным ростом стоимости апартаментов +23% годовых. В отеле будут конференц-залы, коворкинг, ресторан и подземный паркинг на 60 мест. Работает под управлением сети PORT Comfort.",
    why: [
      "4 звезды бизнес-класса",
      "Bleisure-отель (бизнес + отдых)",
      "ROI 10%",
      "Средний рост стоимости +23% в год",
      "500м от метро Площадь Александра Невского"
    ],
    risks: [
      "Объект в строительстве",
      "Срок сдачи II кв 2026"
    ],
    seasonality: [76,74,78,80,83,86,88,87,85,82,79,76],
    pricePerM2: 220264,
    roi: 10,
    priceGrowth: 23,
    totalUnits: 165,
    completionDate: "II квартал 2026",
    class: "4* бизнес",
    developer: "Inreit",
    contacts: {
      phone: "+7 (800) 101-05-48",
      whatsapp: "+7 911 716-41-74"
    },
    url: "https://inreit.ru/hers39",
    image: "/images/projects/inreit-hersonskaya-39-front.jpg",
    images: ["/images/projects/inreit-hersonskaya-39-front.jpg"]
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
    summary: "База отдыха на озере | ROI 13% | Загрузка 93% | Работает с декабря 2024",
    description: "Уникальная база отдыха на берегу живописного озера Отрадное в Карелии. Стильные barnhouse с панорамными окнами, собственной кухней и furako на террасе. Уже работает и приносит доход с декабря 2024! Профессиональное управление от PORT Property Management гарантирует стабильную загрузку 93%. Идеальная локация для любителей природы: лес, озеро, свежий воздух. Всего 1.5 часа от Петербурга.",
    why: [
      "Высокая загрузка 93%",
      "Отличная доходность 13%",
      "Профессиональное управление PORT Property Management",
      "Уникальная локация на озере Отрадное",
      "24 номера + 23 доходных дома"
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
    operatingSince: "декабрь 2024",
    management: "PORT Property Management",
    developer: "Inreit",
    contacts: {
      phone: "+7 (800) 101-05-48"
    },
    url: "https://inreit.ru/baza",
    image: "/images/projects/ekoport-otradnoe.webp",
    images: ["/images/projects/ekoport-otradnoe-1.webp", "/images/projects/ekoport-otradnoe-2.webp"]
  },
  {
    slug: "pro-molodost",
    title: "ПРО.Молодость",
    country: "Россия",
    city: "Санкт-Петербург",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.PLANNING,
    updatedAt: "2026-01-30",
    price: 4100000,
    area: 22.15,
    areaMax: 61.35,
    revPerM2Month: 1543,
    noiYear: 410000,
    paybackYears: 10,
    occupancy: 76,
    adr: 4500,
    riskLevel: RiskLevel.MEDIUM,
    summary: "Премиум-класс | Развитая инфраструктура | 3 мин до КАДа | 20 мин до центра",
    description: "Апарт-отель премиум-класса с развитой инфраструктурой, аналогов которой нет в Петербурге. На территории комплекса: медицинский центр, детский клуб, киберспортивная арена, ресторан, кофейня, автомойка и паркинг. Консьерж-сервис 24/7. Идеальное расположение: 3 минуты до КАДа и всего 20 минут до исторического центра. Отличный выбор для семейных инвесторов, ценящих комфорт и удобство.",
    why: [
      "Премиум-класс",
      "Консьерж, медцентр, детский клуб, киберарена",
      "Ресторан, кофейня, паркинг, автомойка",
      "3 минуты до КАДа",
      "20 минут до центра"
    ],
    risks: [
      "Объект в строительстве",
      "Срок сдачи II кв 2026"
    ],
    seasonality: [74,72,76,79,82,85,87,86,84,80,77,74],
    pricePerM2: 185203,
    completionDate: "II кв 2026",
    class: "премиум",
    developer: "Plaza Lotus Group",
    amenities: ["консьерж", "медцентр", "детский клуб", "киберарена", "ресторан", "кофейня", "паркинг", "автомойка"],
    contacts: {
      phone: "+7 (812) 777-72-72",
      email: "info@plg.group"
    },
    url: "https://plg.group/complex/promolodost/",
    image: "/images/projects/pro-molodost.webp",
    images: ["/images/projects/pro-molodost-1.webp"]
  },
  {
    slug: "more-yalta",
    title: "More.Yalta",
    country: "Россия",
    city: "Ялта",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.ACTIVE,
    updatedAt: "2026-01-30",
    price: 8500000,
    area: 28,
    revPerM2Month: 2143,
    noiYear: 720000,
    paybackYears: 11.8,
    occupancy: 70,
    adr: 8600,
    riskLevel: RiskLevel.HIGH,
    summary: "Апартаменты с видом на море в Ялте | Виртуальный тур",
    description: "Элитный комплекс апартаментов с захватывающим видом на Черное море в сердце курортной Ялты. Восемь корпусов в стиле фьюжн окружены частным парком с кипарисовой рощей. Панорамное остекление, террасы и балконы в каждом апартаменте. На территории: подогреваемый бассейн, ресторан, фитнес-центр, смотровая площадка, барбекю-зона. До моря всего 7 минут пешком. Высокий сезонный спрос обеспечивает отличную загрузку летом.",
    why: [
      "Вид на море",
      "Ялта - курортный город",
      "Высокий сезонный спрос"
    ],
    risks: [
      "Геополитические риски Крыма",
      "Высокая сезонность",
      "Валютные риски"
    ],
    seasonality: [50,48,55,65,80,95,100,98,85,70,58,52],
    pricePerM2: 303571,
    developer: "More.Yalta",
    contacts: {
      phone: "+7 365 277 71 64",
      telegram: "@more_yalta"
    },
    url: "https://moreyalta.ru/plans/search",
    image: "/images/projects/more-yalta.webp",
    images: ["/images/projects/more-yalta-1.webp", "/images/projects/more-yalta-2.webp"]
  },
  {
    slug: "nice-loft-life",
    title: "N'ICE LOFT - LIFE",
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
    summary: "Москва ЦАО | ROI 16% | Доход до 112,500 ₽/мес | ДОМ СДАН!",
    description: "Высокая доходность 16% годовых в Москве. Апарт-отель бизнес-класса на границе ЦАО, всего 5 км от Кремля. ДОМ УЖЕ СДАН И РАБОТАЕТ с 2023 года — получайте доход сразу после покупки! Ежемесячный доход до 112,500 рублей с одного апартамента. Высокая загрузка 85% круглый год благодаря идеальному расположению и профессиональному управлению Nice Loft.",
    why: [
      "Высокая доходность 16% (выше средней по Москве)",
      "Граница ЦАО, 5км от Кремля",
      "Дом сдан, работает с 2023",
      "Ежемесячный доход ~112,500 ₽",
      "Бизнес-класс, профессиональное управление"
    ],
    risks: [
      "Высокая конкуренция в Москве",
      "Высокая цена входа (8.5 млн)",
      "Доходность может снизиться при падении турпотока"
    ],
    seasonality: [83,81,85,87,90,92,94,93,91,88,85,83],
    pricePerM2: 265625,
    roi: 16,
    monthlyIncome: 112500,
    operatingSince: "2023",
    class: "бизнес",
    developer: "Nice Loft",
    contacts: {
      phone: "+7 (495) 510-16-98",
      email: "callcenter@coldy.ru"
    },
    url: "https://life.nice-loft.ru",
    image: "/images/projects/nice-loft-life.webp",
    images: ["/images/projects/nice-loft-life-1.webp", "/images/projects/nice-loft-life-2.webp"]
  },
  {
    slug: "baden-fabrika-otdyha",
    title: "Фабрика отдыха",
    country: "Россия",
    city: "Екатеринбург",
    format: PropertyFormat.RECREATION,
    status: ProjectStatus.PLANNING,
    updatedAt: "2026-01-30",
    price: 12000000,
    priceMax: 18084960,
    area: 22.8,
    areaMax: 66.6,
    revPerM2Month: 3289,
    noiYear: 900000,
    paybackYears: 13.3,
    occupancy: 75,
    occupancyWeekend: 95,
    adr: 10000,
    riskLevel: RiskLevel.MEDIUM,
    summary: "Термальный курорт | Бассейн 530м² | ROI 15.6% | Загрузка 95% в выходные",
    description: "Уникальный термальный SPA-курорт в Екатеринбурге с огромным бассейном 530 м²! Полноценный wellness-комплекс с банным комплексом, спа-центром, рестораном и детскими площадками. Загрузка достигает 95% в выходные дни благодаря высокому спросу на оздоровительный отдых. Всего 8 апартаментов в проекте — эксклюзивное предложение. Первый корпус открывается уже в марте 2025. Идеально для инвесторов, ищущих доходность выше среднего на растущем wellness-рынке.",
    why: [
      "Термальный курортный проект",
      "Бассейн 530 м²",
      "Спа-центр, банный комплекс, ресторан",
      "Загрузка 75% будни, 95% выходные",
      "ROI 15.6%"
    ],
    risks: [
      "Объект в строительстве",
      "Региональный рынок",
      "Сезонность"
    ],
    seasonality: [70,68,72,75,82,88,92,90,85,78,73,70],
    pricePerM2: 526316,
    totalUnits: 8,
    roi: 15.6,
    roiClaimed: 40,
    completionDate: "1 корпус - март 2025, 2 корпус - июнь 2026",
    developer: "Baden Apart",
    amenities: ["бассейн 530м²", "спа-центр", "банный комплекс", "ресторан", "детская площадка"],
    contacts: {
      phone: "8 800 10-11-888",
      email: "apart@baden-baden.ru",
      telegram: "@baden_apartments"
    },
    url: "https://baden-apart.ru/projects/fabrika/",
    image: "/images/projects/baden-fabrika-otdyha.webp",
    images: ["/images/projects/baden-fabrika-otdyha-1.webp", "/images/projects/baden-fabrika-otdyha-2.webp"]
  },
  {
    slug: "baden-turgoyak",
    title: "Тургояк Резорт",
    country: "Россия",
    city: "Екатеринбург",
    format: PropertyFormat.RECREATION,
    status: ProjectStatus.PLANNING,
    updatedAt: "2026-01-30",
    price: 10325070,
    priceMax: 40380001,
    area: 18.2,
    areaMax: 80.3,
    revPerM2Month: 2860,
    noiYear: 625000,
    paybackYears: 16.5,
    occupancy: 77,
    adr: 6740,
    riskLevel: RiskLevel.MEDIUM,
    summary: "Озеро Тургояк | Термальные бассейны | СПА | ROI 15.6%",
    description: "Премиальный курорт на берегу легендарного озера Тургояк — «младшего брата Байкала». Кристально чистая вода, хвойный лес и термальные источники создают идеальные условия для отдыха. Комплекс на 138 номеров с СПА-центром, термальными бассейнами, теннисными кортами и собственным пляжем. Уникальное сочетание природы и премиального сервиса. Высокий спрос круглый год: зимой — катание на лыжах, летом — пляжный отдых. Крупнейший wellness-проект Урала от проверенного девелопера Baden Apart.",
    why: [
      "Уникальная локация на озере Тургояк",
      "Термальные бассейны",
      "СПА-центр, теннисные корты",
      "ROI 15.6%",
      "138 номеров"
    ],
    risks: [
      "Объект в строительстве",
      "Региональный рынок",
      "Сезонность",
      "Долгая окупаемость"
    ],
    seasonality: [68,66,70,73,80,86,90,88,83,76,71,68],
    pricePerM2: 567586,
    totalUnits: 138,
    roi: 15.6,
    completionDate: "Корпус 3 - июнь 2026, Корпус 2 - сентябрь 2026, Корпус 1 - январь 2027",
    developer: "Baden Apart",
    amenities: ["термальные бассейны", "спа-центр", "теннисные корты", "детские площадки", "пляж"],
    contacts: {
      phone: "8 800 10-11-888",
      email: "apart@baden-baden.ru"
    },
    url: "https://baden-apart.ru/projects/turgoyak/",
    image: "/images/projects/baden-turgoyak.webp",
    images: ["/images/projects/baden-turgoyak-1.webp", "/images/projects/baden-turgoyak-2.webp"]
  },
  {
    slug: "krymsky-kvartal-katsiveli",
    title: "Крымский Квартал",
    country: "Россия",
    city: "Ялта",
    format: PropertyFormat.RECREATION,
    status: ProjectStatus.PLANNING,
    updatedAt: "2026-01-30",
    price: 6358000,
    area: 27.2,
    revPerM2Month: 1838,
    noiYear: 600000,
    paybackYears: 10.6,
    occupancy: 75,
    adr: 6680,
    riskLevel: RiskLevel.HIGH,
    summary: "Кацивели | 234 апартамента | 350м от моря | Сдача Q3 2026",
    description: "Масштабный комплекс на 234 апартамента в развивающейся локации Кацивели. Всего 350 метров до моря — 5-7 минут пешком до пляжа. Два восьмиэтажных корпуса в современном стиле с элементами средиземноморской архитектуры. Собственная благоустроенная территория с ландшафтным дизайном и двухуровневым паркингом. Большинство апартаментов ориентированы на море. Тихая локация вдали от шума центральной Ялты. Сдача в Q3 2026 — успейте купить по цене застройщика.",
    why: [
      "234 апартамента в комплексе",
      "350 метров от моря",
      "Кацивели - развивающаяся локация",
      "Срок сдачи Q3 2026"
    ],
    risks: [
      "Геополитические риски Крыма",
      "Объект в строительстве",
      "Высокая сезонность",
      "Валютные риски"
    ],
    seasonality: [48,46,53,63,78,93,100,98,83,68,56,50],
    pricePerM2: 233750,
    totalUnits: 234,
    completionDate: "Q3 2026",
    developer: "MG Group",
    contacts: {
      phone: "+7 (978) 60-66-537"
    },
    image: "/images/projects/krymsky-kvartal-katsiveli.webp",
    images: ["/images/projects/krymsky-kvartal-katsiveli-1.webp", "/images/projects/krymsky-kvartal-katsiveli-2.webp"]
  },
  {
    slug: "sky-plaza-yalta",
    title: "Sky Plaza",
    country: "Россия",
    city: "Ялта",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.PLANNING,
    updatedAt: "2026-01-30",
    price: 7200000,
    area: 25,
    revPerM2Month: 2160,
    noiYear: 648000,
    paybackYears: 11.1,
    occupancy: 75,
    adr: 7200,
    riskLevel: RiskLevel.HIGH,
    summary: "Ялта | Дражинского 48В | 80м от моря | Эскроу-счета ФЗ-214",
    description: "Премиальный апарт-отель в самом сердце Ялты, всего 80 метров от моря! Идеальное расположение: рядом с Массандровским парком (190м) и пляжем отеля «Ялта-Интурист» (240м). Всего 2 км до центра города. Строительство по ФЗ-214 с эскроу-счетами — максимальная защита ваших инвестиций. Поэтапная сдача позволяет выбрать оптимальную очередь. Высокий туристический спрос круглый год благодаря уникальному расположению. Один из немногих проектов с эскроу в Крыму.",
    why: [
      "80 метров от моря",
      "Эскроу-счета по ФЗ-214",
      "Центр Ялты",
      "Несколько очередей строительства"
    ],
    risks: [
      "Геополитические риски Крыма",
      "Объект в строительстве",
      "Высокая сезонность",
      "Валютные риски"
    ],
    seasonality: [50,48,55,65,80,95,100,98,85,70,58,52],
    pricePerM2: 288000,
    completionDate: "Поэтапно 2026-2027",
    developer: "Yalta Panorama Invest",
    contacts: {
      phone: "+7 978 922 90 90"
    },
    image: "/images/projects/sky-plaza-yalta.webp",
    images: ["/images/projects/sky-plaza-yalta-1.webp", "/images/projects/sky-plaza-yalta-2.webp"]
  },
  {
    slug: "yes-gorki-kazan",
    title: "YE'S Gorki",
    country: "Россия",
    city: "Казань",
    format: PropertyFormat.HOTEL,
    status: ProjectStatus.PLANNING,
    updatedAt: "2026-01-30",
    price: 5800000,
    area: 26,
    revPerM2Month: 1859,
    noiYear: 580000,
    paybackYears: 10,
    occupancy: 80,
    adr: 6050,
    riskLevel: RiskLevel.MEDIUM,
    summary: "25 этажей | 585 номеров | Первый YES в Казани | Сдача 2027",
    description: "Флагманский проект проверенной сети YES — первый апарт-отель бренда в Казани! Масштабный комплекс на 25 этажей с 585 номерами. Сеть YES работает с 2011 года и имеет успешный опыт управления отелями в Москве и Санкт-Петербурге. Гарантированная загрузка и профессиональное управление от федерального оператора. Крупнейший девелопер Татарстана «Юнистрой» выступает застройщиком. Удачное расположение возле метро «Горки» — 25 минут до центра Казани. Уникальная возможность войти в проект крупной сети по цене застройщика.",
    why: [
      "Первый отель сети YES в Казани",
      "Крупный проект - 25 этажей, 585 номеров",
      "Проверенная сеть с 2011 года",
      "Улица Рихарда Зорге"
    ],
    risks: [
      "Объект в строительстве",
      "Срок сдачи 2027",
      "Региональный рынок"
    ],
    seasonality: [76,74,78,80,83,86,88,87,84,81,78,76],
    pricePerM2: 223077,
    totalUnits: 585,
    completionDate: "2027",
    developer: "Unistroy",
    contacts: {
      phone: "8 (800) 222-65-95"
    },
    image: "/images/projects/yes-gorki-kazan.webp",
    images: ["/images/projects/yes-gorki-kazan-1.webp", "/images/projects/yes-gorki-kazan-2.webp"]
  }
];
