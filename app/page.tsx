import type { Metadata } from "next";
import Index from "@/screens/Index";

export const metadata: Metadata = {
  title: "Кастомные ПК на заказ",
  description:
    "ForgePC собирает кастомные ПК под игры, работу, стриминг, монтаж, 3D и локальный ИИ с точным подбором комплектующих.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <Index />;
}
