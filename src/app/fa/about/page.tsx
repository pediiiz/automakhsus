import type { Metadata } from "next";
import { BrandEcosystem, DigitalPlatform, LeadSection, PageHero, SeoJsonLd } from "@/components/seo-page";
import { absolute, visual } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "درباره Auto Makhsus | مرکز تخصصی خودرو",
  description: "Auto Makhsus هاب فنی و تجاری خودرو، فروشگاه قطعات، پلتفرم دیجیتال خودرو و اکوسیستم برندهای تهران صندلی، Tuduzi و ANI2203 است.",
  path: "/fa/about",
});

export default function AboutPage() {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "درباره", url: absolute("/fa/about") }])} />
      <PageHero eyebrow="About Auto Makhsus" title="هاب تخصصی خودرو، خدمات فنی و تجارت قطعه" description="Auto Makhsus خدمات فنی، فروشگاه قطعات، نصب، گارانتی، برندهای تخصصی و پلتفرم دیجیتال خودرو را در یک معماری واحد گرد هم می‌آورد." image={visual.network} />
      <BrandEcosystem />
      <DigitalPlatform />
      <LeadSection sourcePage="/fa/about" interest="مشاوره اکوسیستم خودرو" />
    </main>
  );
}
