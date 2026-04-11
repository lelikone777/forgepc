import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../src/index.css";
import { AppProviders } from "@/providers/AppProviders";
import { Header, Footer } from "@/widgets/layout/Layout";
import { siteConfig } from "@/shared/config/site";
import { createSiteJsonLd, getAbsoluteUrl } from "@/shared/lib/seo";

const defaultTitle = "ForgePC - Кастомные ПК на заказ";
const siteJsonLd = createSiteJsonLd();

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: "%s | ForgePC",
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
    images: [
      {
        url: getAbsoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
    images: [getAbsoluteUrl("/twitter-image")],
  },
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: ["/logo.svg"],
    apple: [{ url: "/logo.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteConfig.themeColor,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="relative min-h-screen overflow-x-hidden bg-background text-foreground antialiased"
      >
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
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
