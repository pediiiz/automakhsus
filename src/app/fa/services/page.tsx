import type { Metadata } from "next";
import { LeadSection, PageHero, SeoJsonLd, ServicePillars } from "@/components/seo-page";
import { absolute, visual } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "خدمات Auto Makhsus | طراحی داخلی، صندلی، تودوزی، سرویس و CRM",
  description: "ستون‌های خدماتی Auto Makhsus شامل طراحی داخلی خودرو، صندلی و ارتقا، تودوزی، ون VIP، سرویس مولتی‌برند و پلتفرم دیجیتال CRM.",
  path: "/fa/services",
});

export default function ServicesPage() {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "خدمات", url: absolute("/fa/services") }])} />
      <PageHero eyebrow="Service Pillars" title="ستون‌های خدماتی Auto Makhsus" description="Auto Makhsus حوزه‌های تخصصی خودرو را در قالب برندهای مستقل و زیرساخت دیجیتال یکپارچه مدیریت می‌کند." image={visual.hero} />
      <ServicePillars />
      <LeadSection sourcePage="/fa/services" interest="مشاوره اکوسیستم خودرو" />
    </main>
  );
}
