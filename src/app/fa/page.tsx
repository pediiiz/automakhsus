import type { Metadata } from "next";
import { EcosystemContentLinks } from "@/components/content/content-sections";
import {
  BrandEcosystem,
  DigitalPlatform,
  EcosystemMap,
  ForeignCarBrands,
  LeadSection,
  MarketplaceSection,
  PageHero,
  SeoJsonLd,
  ServicePillars,
  TechnicalServices,
  TrustStats,
  WhatWeDoSection,
  PromotionSupportSection,
} from "@/components/seo-page";
import { absolute, visual } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata, technicalServiceSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Auto Makhsus | مرکز تخصصی خودروهای خارجی و فروشگاه قطعات",
  description: "Auto Makhsus مرکز تخصصی خودروهای خارجی برای خدمات فنی، دیاگ، برق، آپشن، دیتیلینگ، صافکاری، نقاشی، فروشگاه قطعات و پلتفرم دیجیتال خودرو است.",
  path: "/fa",
  image: visual.og,
});

export default function HomePage() {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }])} />
      <SeoJsonLd data={technicalServiceSchema} />
      <PageHero
        eyebrow="Foreign Car Technical + Commerce Hub"
        title="Auto Makhsus"
        subtitle="مرکز تخصصی خودروهای خارجی"
        description="خدمات فنی، دیاگ، برق، آپشن، دیتیلینگ، صافکاری، نقاشی، فروشگاه قطعات و پلتفرم دیجیتال خودرو."
        image={visual.hero}
      />
      <WhatWeDoSection />
      <EcosystemMap />
      <BrandEcosystem />
      <TechnicalServices />
      <ForeignCarBrands />
      <EcosystemContentLinks />
      <MarketplaceSection />
      <ServicePillars />
      <PromotionSupportSection />
      <TrustStats />
      <DigitalPlatform />
      <LeadSection sourcePage="/fa" interest="درخواست مشاوره خودروهای خارجی" />
    </main>
  );
}
