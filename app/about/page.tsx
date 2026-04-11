import type { Metadata } from "next";
import About from "@/screens/About";
import { createPageMetadata } from "@/shared/lib/seo";
import { createBreadcrumbJsonLd, createWebPageJsonLd } from "@/shared/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "О компании",
  description:
    "О ForgePC: подход к подбору комплектующих, качество сборки, тестирование и фокус на реальных задачах клиентов.",
  path: "/about",
});

export default function AboutPage() {
  const webPageJsonLd = createWebPageJsonLd({
    title: "О компании ForgePC",
    description:
      "Информация о ForgePC: как подбираются комплектующие, как строится процесс сборки, тестирования и выдачи кастомных ПК.",
    path: "/about",
  });
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Главная", path: "/" },
    { name: "О компании", path: "/about" },
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
      <About />
    </>
  );
}
