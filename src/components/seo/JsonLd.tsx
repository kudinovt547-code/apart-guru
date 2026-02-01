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
      "https://t.me/apartgurus",
      "https://t.me/apartdotpro"
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
