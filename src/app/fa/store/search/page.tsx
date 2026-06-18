import type { Metadata } from "next";
import { StoreSearch } from "@/components/store/store-sections";
import { SeoJsonLd } from "@/components/seo-page";
import { absolute } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { storeProducts } from "@/lib/store-data";

export const metadata: Metadata = pageMetadata({
  title: "جست‌وجوی قطعه خودرو | Auto Makhsus",
  description: "جست‌وجوی قطعه، بررسی سازگاری برند و مدل، استعلام قیمت و خرید + نصب در Auto Makhsus برای خودرو.",
  path: "/fa/store/search",
});

export default function StoreSearchPage() {
  return (
    <>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "فروشگاه", url: absolute("/fa/store") }, { name: "جست‌وجوی قطعه", url: absolute("/fa/store/search") }])} />
      <StoreSearch products={storeProducts} />
    </>
  );
}
