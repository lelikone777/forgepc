import type { BlogArticle } from "@/shared/data/blogArticles";
import type { CatalogBuild } from "@/shared/data/catalogBuilds";
import type { FaqItem } from "@/shared/data/faqItems";
import { siteConfig } from "@/shared/config/site";
import { getAbsoluteUrl } from "@/shared/lib/seo";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type WebPageSchemaOptions = {
  title: string;
  description: string;
  path: string;
};

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path),
    })),
  };
}

export function createFaqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function createServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Сборка ПК на заказ",
    serviceType: "Custom PC Building Service",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Country",
      name: siteConfig.country,
    },
    description: siteConfig.description,
    url: siteConfig.url,
  };
}

export function createArticleJsonLd(article: BlogArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: [article.thumbnail],
    mainEntityOfPage: getAbsoluteUrl(`/blog/${article.slug}`),
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: getAbsoluteUrl("/logo.svg"),
      },
    },
    articleSection: article.category,
    inLanguage: "ru-RU",
  };
}

export function createProductJsonLd(build: CatalogBuild) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: build.name,
    description: `${build.description}. Конфигурация: ${build.cpu}, ${build.gpu}, ${build.ram}, ${build.ssd}.`,
    category: build.category,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    sku: build.id,
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: build.price,
      availability: "https://schema.org/InStock",
      url: getAbsoluteUrl(`/build/${build.id}`),
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "CPU", value: build.cpu },
      { "@type": "PropertyValue", name: "GPU", value: build.gpu },
      { "@type": "PropertyValue", name: "RAM", value: build.ram },
      { "@type": "PropertyValue", name: "SSD", value: build.ssd },
    ],
  };
}

export function createCollectionPageJsonLd({ title, description, path }: WebPageSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: getAbsoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function createWebPageJsonLd({ title, description, path }: WebPageSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: getAbsoluteUrl(path),
    inLanguage: "ru-RU",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
