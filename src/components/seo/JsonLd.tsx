import { Project } from "@/types/project";

interface OrganizationSchemaProps {
  url: string;
}

export function OrganizationSchema({ url }: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Apart Guru",
    "url": url,
    "logo": `${url}/logo.png`,
    "description": "Аналитическая платформа для инвестиций в апарт-отели и доходную недвижимость России",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+7-981-738-91-97",
      "contactType": "Customer Service",
      "availableLanguage": ["Russian"]
    },
    "sameAs": [
      "https://t.me/apartdotpro",
      "https://t.me/Timofeykudinov"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface RealEstateListingSchemaProps {
  project: Project;
  url: string;
}

export function RealEstateListingSchema({ project, url }: RealEstateListingSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": project.title,
    "description": project.description || project.summary,
    "url": `${url}/projects/${project.slug}`,
    "image": project.image ? `${url}${project.image}` : undefined,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": project.city,
      "addressCountry": project.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "addressCountry": project.country
    },
    "offers": {
      "@type": "Offer",
      "price": project.price,
      "priceCurrency": "RUB",
      "availability": "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": project.price,
        "priceCurrency": "RUB"
      }
    },
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": project.area,
      "unitCode": "MTK"
    },
    "accommodationCategory": project.format,
    "aggregateRating": project.rating ? {
      "@type": "AggregateRating",
      "ratingValue": project.rating,
      "ratingCount": 1
    } : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebsiteSchemaProps {
  url: string;
}

export function WebsiteSchema({ url }: WebsiteSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Apart Guru",
    "url": url,
    "description": "Аналитическая платформа для инвестиций в апарт-отели и доходную недвижимость России",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/projects?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Как работает подбор апартаментов для инвестиций?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Мы собираем ваши требования (бюджет, цель, горизонт), подбираем 3-5 вариантов апарт-отелей, считаем доходность по сценариям, проверяем договоры и УК, и ведём до сделки с контролем выплат 6 месяцев."
        }
      },
      {
        "@type": "Question",
        "name": "Какая доходность у апарт-отелей?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Средняя доходность на рынке составляет 1500-3500 ₽/м² в месяц. Окупаемость варьируется от 8 до 20 лет в зависимости от проекта, локации и управляющей компании."
        }
      },
      {
        "@type": "Question",
        "name": "Берёте ли вы комиссию за подбор?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Нет, мы не берём комиссию за подбор апартаментов. Наш доход — партнёрские выплаты от застройщиков, которые уже заложены в цену объекта."
        }
      },
      {
        "@type": "Question",
        "name": "Какие риски при инвестициях в апарт-отели?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Основные риски: недобросовестная УК, банкротство застройщика, падение спроса на аренду, изменение законодательства. Мы проверяем договоры, УК и помогаем минимизировать риски."
        }
      },
      {
        "@type": "Question",
        "name": "Можно ли купить апартамент в ипотеку?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Да, многие банки выдают ипотеку на апартаменты. Ставки обычно выше, чем на квартиры (от 12-15%). Также доступна рассрочка от застройщиков без процентов."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
