import type { Metadata } from "next";
import { BrandEcosystem, DigitalPlatform, LeadSection, PageHero, SeoJsonLd, ServicePillars } from "@/components/seo-page";
import { absolute, visual } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "پروژه‌ها و اکوسیستم Auto Makhsus",
  description: "اکوسیستم Auto Makhsus از برندهای تخصصی خودرو، خدمات طراحی داخلی، سرویس مولتی‌برند و پلتفرم دیجیتال مشتریان تشکیل شده است.",
  path: "/fa/ecosystem",
});

export default function EcosystemPage() {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "اکوسیستم", url: absolute("/fa/ecosystem") }])} />
      <PageHero eyebrow="Projects / Ecosystem" title="اکوسیستم برندها، خدمات و عملیات دیجیتال" description="Auto Makhsus برندهای تخصصی و پلتفرم عملیاتی را به یک شبکه قابل توسعه برای بازار خودرو تبدیل می‌کند." image={visual.network} />
      <BrandEcosystem />
      <ServicePillars />
      <DigitalPlatform />
      <LeadSection sourcePage="/fa/ecosystem" interest="مشاوره اکوسیستم خودرو" />
    </main>
  );
}
