import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../src/index.css";
import { AppProviders } from "@/providers/AppProviders";
import { Header, Footer } from "@/widgets/layout/Layout";

const siteUrl = "https://forgepc.ru";
const defaultTitle = "ForgePC - Кастомные ПК на заказ";
const defaultDescription =
  "Сборка мощных и надежных ПК под игры, стриминг, монтаж, 3D, разработку и локальный ИИ. Индивидуальная конфигурация под ваши задачи и бюджет.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | ForgePC",
  },
  description: defaultDescription,
  keywords: [
    "кастомный ПК",
    "сборка ПК на заказ",
    "игровой компьютер",
    "рабочая станция",
    "ПК для ИИ",
    "конфигуратор ПК",
    "ForgePC",
  ],
  applicationName: "ForgePC",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "ForgePC",
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/logo.svg",
        width: 512,
        height: 512,
        alt: "Логотип ForgePC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/logo.svg"],
  },
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: ["/logo.svg"],
    apple: [{ url: "/logo.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ff6a00",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="relative min-h-screen overflow-x-hidden bg-background text-foreground antialiased"
      >
        <div aria-hidden className="app-bg" />
        <div className="relative z-10">
          <AppProviders>
            <Header />
            {children}
            <Footer />
          </AppProviders>
        </div>
      </body>
    </html>
  );
}
