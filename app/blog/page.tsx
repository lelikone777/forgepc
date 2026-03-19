import type { Metadata } from "next";
import Blog from "@/screens/Blog";

export const metadata: Metadata = {
  title: "Блог",
  description:
    "Статьи ForgePC о выборе комплектующих, производительности, игровых и профессиональных сценариях использования ПК.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return <Blog />;
}
