import type { MetadataRoute } from "next";
import { blogArticles } from "@/shared/data/blogArticles";
import { catalogBuilds } from "@/shared/data/catalogBuilds";
import { siteConfig } from "@/shared/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes = ["/", "/configurator", "/catalog", "/about", "/blog", "/contacts"];
  const blogRoutes = blogArticles.map((article) => `/blog/${article.slug}`);
  const buildRoutes = catalogBuilds.map((build) => `/build/${build.id}`);

  return [...staticRoutes, ...blogRoutes, ...buildRoutes].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === "/" ? "weekly" : route.startsWith("/blog/") ? "monthly" : "weekly",
    priority: route === "/" ? 1 : route.startsWith("/build/") ? 0.85 : route.startsWith("/blog/") ? 0.7 : 0.8,
  }));
}
