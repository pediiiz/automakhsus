import type { Metadata } from "next";
import { ForeignCarBrands, LeadSection, MarketplaceSection, PageHero, SeoJsonLd, ServicePillars, TechnicalServices } from "@/components/seo-page";
import { absolute, visual } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "خدمات Auto Makhsus | مرکز تخصصی خودرو",
  description: "خدمات Auto Makhsus شامل مکانیک، سرویس دوره‌ای، دیاگ، برق، گیربکس، جلوبندی، ترمز، آپشن، دیتیلینگ، PPF، سرامیک، صافکاری، نقاشی و کارشناسی قبل خرید خودرو.",
  path: "/fa/services",
});

export default function ServicesPage() {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "خدمات", url: absolute("/fa/services") }])} />
      <PageHero eyebrow="Technical Services" title="خدمات تخصصی خودرو" description="Auto Makhsus برای خودرو یک مسیر فنی، فروشگاهی و دیجیتال می‌سازد؛ از دیاگ و تعمیر تا خرید قطعه، نصب، گارانتی و سوابق خودرو." image={visual.hero} />
      <TechnicalServices />
      <ForeignCarBrands />
      <MarketplaceSection />
      <ServicePillars />
      <LeadSection sourcePage="/fa/services" interest="رزرو سرویس خودرو" />
    </main>
  );
}
