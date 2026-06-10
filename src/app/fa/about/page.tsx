import type { Metadata } from "next";
import { BrandEcosystem, DigitalPlatform, LeadSection, PageHero, SeoJsonLd } from "@/components/seo-page";
import { absolute, visual } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "درباره Auto Makhsus | هلدینگ تخصصی خودرو",
  description: "Auto Makhsus هسته مادر برندهای تخصصی خودرو، طراحی داخلی، صندلی، تودوزی، سرویس مولتی‌برند و پلتفرم دیجیتال مشتریان است.",
  path: "/fa/about",
});

export default function AboutPage() {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "درباره", url: absolute("/fa/about") }])} />
      <PageHero eyebrow="About Auto Makhsus" title="هلدینگ تخصصی برای آینده خدمات خودرو" description="Auto Makhsus برندهای تخصصی، عملیات میدانی و پلتفرم دیجیتال را در یک معماری واحد گرد هم می‌آورد." image={visual.network} />
      <BrandEcosystem />
      <DigitalPlatform />
      <LeadSection sourcePage="/fa/about" interest="مشاوره اکوسیستم خودرو" />
    </main>
  );
}
