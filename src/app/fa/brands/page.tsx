import type { Metadata } from "next";
import { BrandEcosystem, LeadSection, PageHero, SeoJsonLd } from "@/components/seo-page";
import { absolute, visual } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "برندهای Auto Makhsus | TehranSandali، MrSeat، TehranSeat، Tuduzi و ANI2203",
  description: "معرفی برندهای اکوسیستم Auto Makhsus شامل تهران صندلی، MrSeat، TehranSeat، Tuduzi و ANI2203.",
  path: "/fa/brands",
});

export default function BrandsPage() {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "برندها", url: absolute("/fa/brands") }])} />
      <PageHero eyebrow="Brand Portfolio" title="برندهای اکوسیستم Auto Makhsus" description="پنج برند تخصصی با جایگاه مستقل، اما زیر یک معماری مادر برای خودرو، خدمات، طراحی داخلی و پلتفرم دیجیتال." image={visual.network} />
      <BrandEcosystem />
      <LeadSection sourcePage="/fa/brands" interest="ورود به شبکه برندها" />
    </main>
  );
}
