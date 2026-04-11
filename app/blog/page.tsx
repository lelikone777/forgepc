import type { Metadata } from "next";
import Blog from "@/screens/Blog";
import { createPageMetadata } from "@/shared/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Блог",
  description:
    "Статьи ForgePC о выборе комплектующих, производительности, игровых и профессиональных сценариях использования ПК.",
  path: "/blog",
});

export default function BlogPage() {
  return <Blog />;
}
