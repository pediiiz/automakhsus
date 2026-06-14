import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoreCategoryDetail } from "@/components/store/store-sections";
import { SeoJsonLd } from "@/components/seo-page";
import { absolute } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { findStoreCategory, productsByCategory, storeCategories, storeCategoryPath } from "@/lib/store-data";

export function generateStaticParams() {
  return storeCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = findStoreCategory(slug);
  if (!category) return {};
  return pageMetadata({ title: category.seoTitle, description: category.metaDescription, path: storeCategoryPath(category.slug) });
}

export default async function StoreCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = findStoreCategory(slug);
  if (!category) notFound();
  return (
    <>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "فروشگاه", url: absolute("/fa/store") }, { name: category.title, url: absolute(storeCategoryPath(category.slug)) }])} />
      <StoreCategoryDetail category={category} products={productsByCategory(category.slug)} />
    </>
  );
}
