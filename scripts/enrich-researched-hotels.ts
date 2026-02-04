import * as fs from 'fs';
import * as path from 'path';

/**
 * Обогащение данных 3 исследованных отелей информацией из deep research
 */

const statsPath = path.join(__dirname, '..', 'src', 'data', 'stats.generated.json');
const statsData = JSON.parse(fs.readFileSync(statsPath, 'utf-8'));

console.log(`📊 Обогащение данных ${statsData.objects.length} проектов\n`);

// Данные из исследования
const enrichmentData = {
  'port-comfort-ligovskiy': {
    rating: 9.0,
    reviewsCount: '502+ на Booking',
    coordinates: { lat: 59.9311, lng: 30.3609 },
    nearbyAttractions: [
      'Пл. Восстания (241-300м)',
      'Московский вокзал (500м)',
      'Невский проспект (300м)',
      'ТЦ Галерея',
      'Казанский собор (1.9км)',
    ],
    photos: [
      'https://2gis.ru/spb/firm/70000001033554988',
      'https://port-comfort.pro/hotels/spb/ligovskiy/',
    ],
    managementContacts: {
      phone: '+7 (921) 951-82-06',
      email: 'info@inreit.ru',
      telegram: '@kudinov_inreit',
      website: 'https://inreit.ru/',
    },
    awards: ['Лучший апарт-отель России 2023 (CRE Federal Awards)'],
    yearOpened: 2016,
    totalRooms: 126,
    infrastructure: ['Ресторан "Хачо и Пури"', 'Wi-Fi', 'Завтраки', 'Стойка 24/7'],
    positiveReviews: [
      'Расположение и чистота номеров отличные',
      'Номера красиво оформлены и чистые',
      'Дружелюбный персонал',
      'Хороший ресторан в здании',
    ],
    bookingLinks: {
      booking: 'https://www.booking.com/hotel/ru/ligovskii-29.en-gb.html',
      ostrovok: 'https://ostrovok.ru/hotel/russia/st._petersburg/mid9291780/vox_hotel_2/',
      tripadvisor: 'https://www.tripadvisor.com/Hotel_Review-g298507-d15052392',
    },
  },
  'iq-aparts-kirova': {
    rating: 8.9,
    reviewsCount: '66 на Ostrovok',
    coordinates: { lat: 55.0415, lng: 82.9346 },
    nearbyAttractions: [
      'М. Октябрьская (5-10 мин)',
      'М. Речной вокзал (793м)',
      'ГПНТБ',
      'НГАСУ',
      '100+ ресторанов в радиусе 15 мин',
    ],
    photos: [
      'https://2gis.ru/novosibirsk/firm/70000001087616127',
      'https://iqaparts.ru/',
    ],
    managementContacts: {
      phone: '+7 921 950-87-21',
      email: 'best@bestgroup.ru',
      website: 'https://mtlapart.ru/',
    },
    awards: ['Urban Awards 2023'],
    yearOpened: 2024,
    totalRooms: 200,
    infrastructure: [
      'Лобби с ресепшен 24/7',
      'Кофейня',
      '6 скоростных лифтов',
      '2-уровневый паркинг',
      'Консьерж',
      'Охрана',
    ],
    positiveReviews: [
      'Все новое и чистое',
      'Удобное расположение',
      'Отличные виды',
      'Вежливый персонал',
    ],
    negativeReviews: ['Интернет работает с перебоями'],
    bookingLinks: {
      ostrovok: 'https://ostrovok.ru/hotel/russia/novosibirsk/mid11290861/apartotel_iq_aparts/',
      yandex: 'https://travel.yandex.ru/hotels/novosibirsk/iq-aparts/',
    },
  },
  'gorki-gorod-540': {
    rating: 8.0,
    reviewsCount: '502 на Booking',
    coordinates: { lat: 43.682363, lng: 40.262725 },
    nearbyAttractions: [
      'Канатная дорога Горная Карусель',
      'ТРЦ Горки Город',
      'Marriott 5*',
      'Горнолыжные трассы',
      'Казино Сочи',
      'Аквапарк',
    ],
    photos: [
      'https://www.tripadvisor.com/Hotel_Review-g3206479-d5213306',
      'https://gorki-apartamenty.ru/',
    ],
    managementContacts: {
      phone: '+7 (800) 550-20-20',
      email: 'infocenter@kpresort.ru',
      website: 'https://krasnayapolyanaresort.ru/',
    },
    yearOpened: 2013,
    totalRooms: 1338,
    infrastructure: [
      'Прокат лыж',
      'Ресторан',
      'Детская комната',
      'Канатные дороги',
      'Прямой доступ к склонам',
    ],
    positiveReviews: [
      'Отличная локация рядом с подъемниками',
      'Просторные апартаменты',
      'Все рядом - ТЦ, рестораны',
      'Теплые и уютные номера',
    ],
    negativeReviews: [
      'Качество уборки снизилось',
      'Мебель "уставшая"',
      'Проблемы с персоналом на ресепшен',
    ],
    bookingLinks: {
      booking: 'https://www.booking.com/reviews/ru/hotel/apartamenty-gorki-gorod-540.ru.html',
      ostrovok: 'https://ostrovok.ru/hotel/russia/esto-sadok/mid9259895/premium_apartments_gorki_gorod_540/',
      tripadvisor: 'https://www.tripadvisor.com/Hotel_Review-g3206479-d5213306',
    },
  },
};

// Обогащаем проекты
let enrichedCount = 0;
statsData.objects = statsData.objects.map((project: any) => {
  const enrichment = enrichmentData[project.slug as keyof typeof enrichmentData];

  if (enrichment) {
    enrichedCount++;
    console.log(`✅ Обогащаю: ${project.title}`);
    console.log(`   + Рейтинг: ${enrichment.rating}/10`);
    console.log(`   + Координаты: ${enrichment.coordinates.lat}, ${enrichment.coordinates.lng}`);
    console.log(`   + Что рядом: ${enrichment.nearbyAttractions.length} локаций`);
    console.log(`   + Контакты УК: телефон, email${('telegram' in enrichment.managementContacts) ? ', telegram' : ''}`);
    console.log('');

    return {
      ...project,
      // Рейтинги и отзывы
      rating: enrichment.rating,
      reviewsCount: enrichment.reviewsCount,

      // Локация
      coordinates: enrichment.coordinates,
      nearbyAttractions: enrichment.nearbyAttractions,

      // Фото
      photoLinks: enrichment.photos,

      // Контакты УК
      managementContacts: enrichment.managementContacts,

      // Дополнительно
      ...('awards' in enrichment && enrichment.awards ? { awards: enrichment.awards } : {}),
      ...('yearOpened' in enrichment && enrichment.yearOpened ? { yearOpened: enrichment.yearOpened } : {}),
      ...('totalRooms' in enrichment && enrichment.totalRooms ? { totalRooms: enrichment.totalRooms } : {}),
      ...('infrastructure' in enrichment && enrichment.infrastructure ? { infrastructure: enrichment.infrastructure } : {}),

      // Отзывы
      ...('positiveReviews' in enrichment && enrichment.positiveReviews ? { positiveReviews: enrichment.positiveReviews } : {}),
      ...('negativeReviews' in enrichment && enrichment.negativeReviews ? { negativeReviews: enrichment.negativeReviews } : {}),

      // Ссылки на booking
      bookingLinks: enrichment.bookingLinks,
    };
  }

  return project;
});

// Обновляем sources
statsData.sources.updatedAt = new Date().toISOString().split('T')[0];
statsData.sources.source += ' | Enriched with deep research data for 3 hotels (ratings, coords, reviews, contacts)';

// Сохраняем
fs.writeFileSync(statsPath, JSON.stringify(statsData, null, 2));

console.log(`\n✅ Обогащено ${enrichedCount} проектов`);
console.log(`📂 Сохранено: ${statsPath}`);
console.log('\n🎉 Готово!');
