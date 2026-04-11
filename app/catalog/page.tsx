import type { Metadata } from "next";
import Catalog from "@/screens/Catalog";
import { createPageMetadata } from "@/shared/lib/seo";
import { createBreadcrumbJsonLd, createCollectionPageJsonLd } from "@/shared/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Каталог готовых сборок ПК",
  description:
    "Готовые сборки ForgePC для игр, рабочих задач, монтажа, 3D и локального ИИ. Выберите базу и кастомизируйте под себя.",
  path: "/catalog",
});

export default function CatalogPage() {
  const collectionJsonLd = createCollectionPageJsonLd({
    title: "Каталог готовых сборок ПК",
    description:
      "Готовые сборки ForgePC для игр, рабочих задач, монтажа, 3D и локального ИИ с возможностью дальнейшей кастомизации.",
    path: "/catalog",
  });
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Главная", path: "/" },
    { name: "Каталог", path: "/catalog" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Catalog />
    </>
  );
}
