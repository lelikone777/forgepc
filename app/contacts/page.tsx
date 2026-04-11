import type { Metadata } from "next";
import Contacts from "@/screens/Contacts";
import { createPageMetadata } from "@/shared/lib/seo";
import { createBreadcrumbJsonLd, createWebPageJsonLd } from "@/shared/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Контакты",
  description:
    "Свяжитесь с ForgePC: консультация по сборке ПК, подбор под бюджет и задачи, ответы на технические вопросы.",
  path: "/contacts",
});

export default function ContactsPage() {
  const webPageJsonLd = createWebPageJsonLd({
    title: "Контакты ForgePC",
    description:
      "Страница контактов ForgePC для заявок на сборку ПК, консультаций по конфигурациям и вопросов по подбору системы.",
    path: "/contacts",
  });
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Главная", path: "/" },
    { name: "Контакты", path: "/contacts" },
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
      <Contacts />
    </>
  );
}
