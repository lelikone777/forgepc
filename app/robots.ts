import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    host: "https://forgepc.ru",
    sitemap: "https://forgepc.ru/sitemap.xml",
  };
}
