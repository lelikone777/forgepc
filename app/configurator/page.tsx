import type { Metadata } from "next";
import Configurator from "@/screens/Configurator";
import { createPageMetadata } from "@/shared/lib/seo";
import { createBreadcrumbJsonLd, createWebPageJsonLd } from "@/shared/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Конфигуратор ПК",
  description:
    "Соберите персональную конфигурацию ПК под свои задачи и бюджет. Подбор комплектующих и расчёт стоимости в реальном времени.",
  path: "/configurator",
});

export default function ConfiguratorPage() {
  const webPageJsonLd = createWebPageJsonLd({
    title: "Конфигуратор ПК",
    description:
      "Конфигуратор ПК под игры, работу, монтаж, 3D, разработку и локальный ИИ с расчётом стоимости и подбором комплектующих.",
    path: "/configurator",
  });
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Главная", path: "/" },
    { name: "Конфигуратор", path: "/configurator" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Configurator />
    </>
  );
}
