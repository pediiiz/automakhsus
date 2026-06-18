import type { Metadata } from "next";
import { StoreCategoryGrid, StoreHero } from "@/components/store/store-sections";
import { SeoJsonLd } from "@/components/seo-page";
import { absolute } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { storeCategories } from "@/lib/store-data";

export const metadata: Metadata = pageMetadata({
  title: "دسته‌بندی فروشگاه قطعات خودرو | Auto Makhsus",
  description: "دسته‌بندی‌های فروشگاه Auto Makhsus شامل قطعات مصرفی، فنی، برق، آپشن، مواد دیتیلینگ، بدنه، ابزار، OEM، Aftermarket، استوک و سفارش خارجی.",
  path: "/fa/store/categories",
});

export default function StoreCategoriesPage() {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "فروشگاه", url: absolute("/fa/store") }, { name: "دسته‌بندی‌ها", url: absolute("/fa/store/categories") }])} />
      <StoreHero />
      <StoreCategoryGrid categories={storeCategories} />
    </main>
  );
}
