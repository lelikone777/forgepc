import type { Metadata } from "next";
import Index from "@/screens/Index";
import { faqItems } from "@/shared/data/faqItems";
import { createPageMetadata } from "@/shared/lib/seo";
import { createFaqJsonLd, createServiceJsonLd } from "@/shared/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Кастомные ПК на заказ",
  description:
    "ForgePC собирает кастомные ПК под игры, стриминг, монтаж, 3D, разработку и локальный ИИ с точным подбором комплектующих под задачи и бюджет.",
  path: "/",
});

export default function HomePage() {
  const serviceJsonLd = createServiceJsonLd();
  const faqJsonLd = createFaqJsonLd(faqItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Index />
    </>
  );
}
