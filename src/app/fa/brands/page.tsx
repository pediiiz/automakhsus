import type { Metadata } from "next";
import { BrandEcosystem, LeadSection, PageHero, SeoJsonLd } from "@/components/seo-page";
import { absolute, visual } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "برندهای Auto Makhsus | TehranSandali، ANI2203 و Tuduzi",
  description: "معرفی سه برند اصلی Auto Makhsus شامل تهران صندلی، ANI2203 و Tuduzi؛ با MrSeat و TehranSeat به عنوان زیر برندهای تهران صندلی.",
  path: "/fa/brands",
});

export default function BrandsPage() {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "برندها", url: absolute("/fa/brands") }])} />
      <PageHero eyebrow="Brand Portfolio" title="برندهای اصلی Auto Makhsus" description="در معماری رسمی Auto Makhsus سه برند اصلی در سطح مادر دیده می‌شوند: تهران صندلی، ANI2203 و Tuduzi. MrSeat و TehranSeat زیر برندهای تهران صندلی هستند." image={visual.network} />
      <BrandEcosystem />
      <LeadSection sourcePage="/fa/brands" interest="ورود به شبکه برندها" />
    </main>
  );
}
