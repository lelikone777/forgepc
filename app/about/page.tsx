import type { Metadata } from "next";
import About from "@/screens/About";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "О ForgePC: подход к подбору комплектующих, качество сборки, тестирование и фокус на реальных задачах клиентов.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <About />;
}
