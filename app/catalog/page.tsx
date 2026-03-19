import type { Metadata } from "next";
import Catalog from "@/screens/Catalog";

export const metadata: Metadata = {
  title: "Каталог сборок",
  description:
    "Готовые сборки ForgePC для игр, рабочих задач, монтажа, 3D и локального ИИ. Выберите базу и кастомизируйте.",
  alternates: {
    canonical: "/catalog",
  },
};

export default function CatalogPage() {
  return <Catalog />;
}
