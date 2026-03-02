import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог инвестиций | Apart Guru - Объекты от партнёра Inreit",
  description: "Инвестиционные апартаменты от партнёра Inreit. Готовые объекты с доходностью до 17.58% и новые проекты в строительстве. Полная прозрачность доходности.",
  keywords: [
    "инвестиционные апартаменты",
    "апарт отели инвестиции",
    "купить апартаменты спб",
    "инвестиции в недвижимость",
    "доходная недвижимость",
    "Inreit",
    "Apart Guru"
  ],
  openGraph: {
    title: "Каталог инвестиций | Apart Guru",
    description: "Инвестиционные апартаменты от партнёра Inreit. Готовые объекты с доходностью до 17.58% и новые проекты в строительстве.",
    images: [
      {
        url: "/og-image-sales.jpg",
        width: 1200,
        height: 630,
        alt: "Каталог инвестиций Apart Guru"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Каталог инвестиций | Apart Guru",
    description: "Инвестиционные апартаменты от партнёра Inreit с прозрачной доходностью.",
    images: ["/og-image-sales.jpg"]
  },
  alternates: {
    canonical: "https://apart.guru/sales"
  }
};

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}