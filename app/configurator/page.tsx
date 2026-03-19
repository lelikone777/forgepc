import type { Metadata } from "next";
import Configurator from "@/screens/Configurator";

export const metadata: Metadata = {
  title: "Конфигуратор ПК",
  description:
    "Соберите персональную конфигурацию ПК под свои задачи и бюджет. Подбор комплектующих в реальном времени.",
  alternates: {
    canonical: "/configurator",
  },
};

export default function ConfiguratorPage() {
  return <Configurator />;
}
