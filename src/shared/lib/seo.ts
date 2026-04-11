import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";

type CreatePageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
};

export function getAbsoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

function getMetadataImage(image?: string) {
  return image ? getAbsoluteUrl(image) : getAbsoluteUrl("/opengraph-image");
}

export function createPageMetadata({
  title,
  description,
  path,
  image,
  keywords,
  type = "website",
  noIndex = false,
}: CreatePageMetadataOptions): Metadata {
  const url = getAbsoluteUrl(path);
  const metadataImage = getMetadataImage(image);

  return {
    title,
    description,
    keywords: keywords ?? [...siteConfig.keywords],
    alternates: {
      canonical: path,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: metadataImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [metadataImage],
    },
  };
}

export function createSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        logo: getAbsoluteUrl("/logo.svg"),
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.city,
          addressCountry: siteConfig.country,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: "ru-RU",
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
    ],
  };
}
