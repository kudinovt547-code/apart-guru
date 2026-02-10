import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CompareBar from "@/components/layout/CompareBar";
import { BuildingsBackground } from "@/components/ui/buildings-background";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { YandexMetrika } from "@/components/YandexMetrika";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Apart Guru - Инвестиции в апарт-отели и доходную недвижимость СНГ",
    template: "%s | Apart Guru"
  },
  description: "Аналитическая платформа для инвестиций в апарт-отели России. Сравнивайте доходность, ROI, окупаемость 50+ проектов. Калькулятор NOI, методология анализа, готовые инвестиционные решения.",
  keywords: ["апарт-отели", "инвестиции в недвижимость", "доходная недвижимость", "апартаменты для инвестиций", "ROI", "пассивный доход", "недвижимость России", "apart-hotel", "инвестиции СПБ", "инвестиции Москва", "окупаемость недвижимости", "база отдыха", "термальные курорты"],
  authors: [{ name: "Apart Guru" }],
  creator: "Apart Guru",
  publisher: "Apart Guru",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://apart.guru'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/logo.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/logo.png',
    shortcut: '/logo.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://apart.guru',
    siteName: 'Apart Guru',
    title: 'Apart Guru - Инвестиции в апарт-отели и доходную недвижимость',
    description: 'Аналитическая платформа для инвестиций в апарт-отели России. Сравнивайте 50+ проектов, калькулятор доходности, проверенные объекты.',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Apart Guru - Биржа доходной недвижимости',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apart Guru - Инвестиции в апарт-отели',
    description: 'Сравнивайте доходность 50+ апарт-отелей России. Калькулятор NOI, готовые инвестрешения.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Добавьте сюда коды верификации когда получите
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#16a34a" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider defaultTheme="light" storageKey="apart-guru-theme">
          <BuildingsBackground />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CompareBar />
        </ThemeProvider>
        <Analytics />
        <YandexMetrika />
      </body>
    </html>
  );
}
