import type { Metadata } from "next";
import { StoreCategoryGrid, StoreHero, StoreProductGrid } from "@/components/store/store-sections";
import { LeadSection, SeoJsonLd } from "@/components/seo-page";
import { absolute } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata, technicalServiceSchema } from "@/lib/seo";
import { storeCategories, storeProducts } from "@/lib/store-data";

export const metadata: Metadata = pageMetadata({
  title: "فروشگاه قطعات خودروهای خارجی | Auto Makhsus",
  description: "فروشگاه Auto Makhsus برای قطعات مصرفی، فنی، برق، آپشن، دیتیلینگ، بدنه، OEM، Aftermarket، استوک و سفارش خارجی با مسیر خرید + نصب.",
  path: "/fa/store",
});

export default function StorePage() {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "فروشگاه", url: absolute("/fa/store") }])} />
      <SeoJsonLd data={technicalServiceSchema} />
      <StoreHero />
      <StoreCategoryGrid categories={storeCategories} />
      <StoreProductGrid products={storeProducts} />
      <LeadSection sourcePage="/fa/store" interest="خرید قطعه" />
    </main>
  );
}
