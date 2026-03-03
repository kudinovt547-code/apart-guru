export interface SalesProject {
  id: string;
  name: string;
  address: string;
  city: string;
  class: string;
  priceFrom: number;
  yield: number;
  monthlyPayout?: number;
  rating?: number;
  status: "for-sale" | "operational";
  completionDate?: string;
  description?: string;
  features?: string[];
  image?: string;
}

export const salesProjects: SalesProject[] = [
  // ОБЪЕКТЫ В ПРОДАЖЕ
  {
    id: "hersons-39",
    name: "Херсонская 39",
    address: "Херсонская ул., 39",
    city: "Санкт-Петербург",
    class: "4★ бизнес-класс",
    priceFrom: 10_800_000,
    yield: 10,
    status: "for-sale",
    completionDate: "II кв. 2026",
    description: "Апарт-отель бизнес-класса в самом центре Петербурга — 400м от Невского проспекта. Высокий туристический трафик круглый год. Ожидаемая доходность 10% при стабильной загрузке благодаря премиальной локации и профессиональному управлению.",
    features: [
      "400м от Невского проспекта",
      "Бизнес-класс, высокий ADR",
      "Профессиональное управление",
      "Ввод II кв. 2026"
    ],
    image: "/projects/hersons-39.jpg"
  },
  {
    id: "ecoport-otradnoe",
    name: "ЭКОPort.Отрадное",
    address: "о. Отрадное",
    city: "Ленинградская область",
    class: "База отдыха",
    priceFrom: 8_400_000,
    yield: 13,
    status: "for-sale",
    completionDate: "III кв. 2026",
    description: "Загородная база отдыха на берегу озера Отрадное — растущий сегмент эко-туризма. Доходность 13% за счёт высокого спроса на загородный отдых. Сезонность компенсируется корпоративными мероприятиями в межсезонье.",
    features: [
      "Берег озера Отрадное",
      "Эко-туризм — растущий тренд",
      "Круглогодичная загрузка",
      "Ввод III кв. 2026"
    ],
    image: "/projects/ecoport-otradnoe.jpg"
  },

  {
    id: "saan-park",
    name: "SAAN Park",
    address: "Коломяжский пр., 19А",
    city: "Санкт-Петербург",
    class: "Доходная недвижимость нового поколения",
    priceFrom: 7_900_000,
    yield: 14.4,
    status: "for-sale",
    completionDate: "2026",
    description: "Первый в Петербурге проект доходной недвижимости нового поколения у метро Пионерская. Инвест-юниты с готовой отделкой и потенциальным доходом до 206 000 руб./мес. 3 этажа деловой и клубной инфраструктуры, собственный вход в Удельный парк.",
    features: [
      "300м от метро Пионерская",
      "Окупаемость 8.5 лет",
      "Доход до 206 000 руб./мес",
      "Готовая отделка",
      "Удельный парк в 1 минуте",
      "Инфраструктура мирового уровня",
      "Дизайн от AA Partners и L.BURO"
    ],
    image: "/projects/saan-park.jpg"
  },

  // ГОТОВЫЕ ОБЪЕКТЫ (работающие)
  {
    id: "ligovsky-29",
    name: "Лиговский 29",
    address: "Лиговский пр., 29",
    city: "Санкт-Петербург",
    class: "4★ апарт-отель",
    priceFrom: 9_500_000,
    yield: 12.97,
    monthlyPayout: 62_833,
    rating: 4.5,
    status: "operational",
    description: "Крупный апарт-отель на 129 номеров у Московского вокзала — одна из самых проходимых локаций Петербурга. Стабильная загрузка за счёт транзитных туристов и делового потока. Средняя выплата 62 833 руб./мес подтверждена отчётностью.",
    features: [
      "129 номеров — масштаб = стабильность",
      "500м от Московского вокзала",
      "Транзитный туристический поток",
      "Подтверждённая выплата 62 833₽/мес"
    ],
    image: "/projects/ligovsky-29.jpg"
  },
  {
    id: "sadovaya-53",
    name: "Садовая 53",
    address: "Садовая ул., 53",
    city: "Санкт-Петербург",
    class: "4★ апарт-отель",
    priceFrom: 8_500_000,
    yield: 10.3,
    monthlyPayout: 52_522,
    rating: 4.9,
    status: "operational",
    description: "Высший рейтинг 4.9 на Яндексе среди апарт-отелей Петербурга. 118 номеров в культурном центре города — 700м от Мариинского театра. Высокий рейтинг = стабильная загрузка и лояльные гости.",
    features: [
      "Рейтинг 4.9 — лучший в классе",
      "Культурный центр Петербурга",
      "118 номеров, профессиональное УК",
      "Стабильная выплата 52 522₽/мес"
    ],
    image: "/projects/sadovaya-53.jpg"
  },
  {
    id: "grivtsova-4",
    name: "Гривцова 4",
    address: "Гривцова ул., 4",
    city: "Санкт-Петербург",
    class: "3★ апарт-отель",
    priceFrom: 7_800_000,
    yield: 15.85,
    monthlyPayout: 57_924,
    rating: 4.8,
    status: "operational",
    description: "Топовая локация у Исаакиевского собора — главный туристический магнит Петербурга. 90 номеров, рейтинг 4.8. Один из самых доходных объектов — 15.85% годовых при стабильной загрузке 80-98%.",
    features: [
      "600м от Исаакиевского собора",
      "Доходность 15.85% — топ в классе",
      "Загрузка 80-98%",
      "Рейтинг 4.8, выплата 57 924₽/мес"
    ],
    image: "/projects/grivtsova-4.jpg"
  },
  {
    id: "al-nevsky-9v",
    name: "Ал.Невского 9В",
    address: "Александра Невского пл., 9В",
    city: "Санкт-Петербург",
    class: "3★ апарт-отель",
    priceFrom: 5_700_000,
    yield: 11.9,
    monthlyPayout: 62_842,
    rating: 4.2,
    status: "operational",
    description: "Камерный бутик-отель на 18 номеров у площади Александра Невского. Компактный формат = более персональный сервис и высокие оценки гостей. Максимальная выплата среди объектов — 62 842 руб./мес.",
    features: [
      "Бутик-формат, 18 номеров",
      "Центр города, Невский проспект",
      "Макс. выплата 62 842₽/мес",
      "Доходность 11.9% годовых"
    ],
    image: "/projects/al-nevsky-9v.jpg"
  },
  {
    id: "blokhina-20-7",
    name: "Блохина 20/7",
    address: "Блохина ул., 20/7",
    city: "Санкт-Петербург",
    class: "3★ апарт-отель",
    priceFrom: 6_100_000,
    yield: 12.66,
    monthlyPayout: 62_268,
    rating: 4.3,
    status: "operational",
    description: "Петроградская сторона — один из самых атмосферных районов Петербурга. 41 номер, 1 км от Петропавловской крепости. Район привлекает и туристов, и деловых путешественников. Стабильная выплата 62 268 руб./мес.",
    features: [
      "Петроградская сторона",
      "1 км от Петропавловской крепости",
      "Туризм + деловой поток",
      "Выплата 62 268₽/мес"
    ],
    image: "/projects/blokhina-20-7.jpg"
  },
  {
    id: "sadovaya-28-30",
    name: "Садовая 28-30",
    address: "Садовая ул., 28-30",
    city: "Санкт-Петербург",
    class: "3★ апарт-отель",
    priceFrom: 4_100_000,
    yield: 17.58,
    monthlyPayout: 41_691,
    rating: 4.6,
    status: "operational",
    description: "Самый доступный вход — от 4.1 млн руб. при доходности 17.58% годовых. 600м от Невского проспекта. Идеальный вариант для первой инвестиции — низкий порог входа с высокой отдачей. 42 номера, загрузка 80-98%.",
    features: [
      "Самый низкий порог входа — от 4.1 млн",
      "Доходность 17.58% — лидер",
      "600м от Невского проспекта",
      "Загрузка 80-98%"
    ],
    image: "/projects/sadovaya-28-30.jpg"
  }
];

export const getSalesProjects = () => salesProjects;

export const getSalesProjectsByStatus = (status: "for-sale" | "operational" | "all") => {
  if (status === "all") return salesProjects;
  return salesProjects.filter(project => project.status === status);
};

export const getSalesProjectById = (id: string) => {
  return salesProjects.find(project => project.id === id);
};

export const sortSalesProjects = (projects: SalesProject[], sortBy: "price" | "yield") => {
  return [...projects].sort((a, b) => {
    if (sortBy === "price") {
      return a.priceFrom - b.priceFrom;
    } else if (sortBy === "yield") {
      return b.yield - a.yield;
    }
    return 0;
  });
};