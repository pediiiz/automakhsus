import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoreProductDetail } from "@/components/store/store-sections";
import { SeoJsonLd } from "@/components/seo-page";
import { absolute } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { findStoreCategory, findStoreProduct, storeProductPath, storeProductSchema, storeProducts } from "@/lib/store-data";

export function generateStaticParams() {
  return storeProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = findStoreProduct(slug);
  if (!product) return {};
  return pageMetadata({
    title: `${product.title} | فروشگاه Auto Makhsus`,
    description: `${product.shortDescription} استعلام قیمت، مشاوره قطعه و ${product.installOption ? "خرید + نصب در Auto Makhsus" : "خرید قطعه"} برای خودرو.`,
    path: storeProductPath(product.slug),
  });
}

export default async function StoreProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = findStoreProduct(slug);
  if (!product) notFound();
  const category = findStoreCategory(product.category);
  return (
    <>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "فروشگاه", url: absolute("/fa/store") }, { name: category?.title || "محصول", url: absolute(`/fa/store/categories/${product.category}`) }, { name: product.title, url: absolute(storeProductPath(product.slug)) }])} />
      <StoreProductDetail product={product} schema={storeProductSchema(product)} />
    </>
  );
}
