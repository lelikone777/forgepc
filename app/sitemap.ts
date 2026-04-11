import type { MetadataRoute } from "next";
import { blogArticles } from "@/shared/data/blogArticles";

const siteUrl = "https://forgepc.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = ["/", "/configurator", "/catalog", "/about", "/blog", "/contacts"];
  const blogRoutes = blogArticles.map((article) => `/blog/${article.slug}`);

  return [...routes, ...blogRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : route.startsWith("/blog/") ? 0.7 : 0.8,
  }));
}
