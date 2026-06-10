import type { Metadata } from "next";
import { absolute, brands, siteUrl, visual } from "@/lib/site-data";

export function pageMetadata(args: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const image = absolute(args.image || visual.og);
  return {
    title: args.title,
    description: args.description,
    alternates: {
      canonical: absolute(args.path),
      languages: { fa: absolute(args.path) },
    },
    robots: args.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: args.title,
      description: args.description,
      url: absolute(args.path),
      siteName: "Auto Makhsus",
      locale: "fa_IR",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: args.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: args.title,
      description: args.description,
      images: [image],
    },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Auto Makhsus",
  alternateName: "اتو مخصوص",
  url: siteUrl,
  sameAs: brands.map((brand) => brand.url),
  brand: brands.map((brand) => ({
    "@type": "Brand",
    name: brand.name,
    url: brand.url,
    description: brand.description,
  })),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Auto Makhsus",
  url: siteUrl,
  inLanguage: "fa-IR",
  publisher: {
    "@type": "Organization",
    name: "Auto Makhsus",
  },
};

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
