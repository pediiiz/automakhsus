import type { Metadata } from "next";
import { BrandEcosystem, DigitalPlatform, ForeignCarBrands, LeadSection, MarketplaceSection, PageHero, SeoJsonLd, ServicePillars, TechnicalServices } from "@/components/seo-page";
import { absolute, visual } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "اکوسیستم Auto Makhsus | هاب فنی، فروشگاه قطعات و پلتفرم خودرو",
  description: "اکوسیستم Auto Makhsus شامل هاب فنی خودرو، فروشگاه قطعات، تهران صندلی، Tuduzi، ANI2203 و پلتفرم دیجیتال خودرو است.",
  path: "/fa/ecosystem",
});

export default function EcosystemPage() {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "اکوسیستم", url: absolute("/fa/ecosystem") }])} />
      <PageHero eyebrow="Projects / Ecosystem" title="اکوسیستم فنی، تجاری و دیجیتال Auto Makhsus" description="Auto Makhsus برندها، خدمات فنی، فروشگاه قطعات، نصب، گارانتی و سوابق دیجیتال خودرو را به یک سیستم قابل توسعه برای بازار خودرو تبدیل می‌کند." image={visual.network} />
      <BrandEcosystem />
      <TechnicalServices />
      <ForeignCarBrands />
      <MarketplaceSection />
      <ServicePillars />
      <DigitalPlatform />
      <LeadSection sourcePage="/fa/ecosystem" interest="مشاوره هاب فنی و فروشگاهی Auto Makhsus" />
    </main>
  );
}
