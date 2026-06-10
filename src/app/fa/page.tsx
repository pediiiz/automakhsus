import type { Metadata } from "next";
import { BrandEcosystem, DigitalPlatform, EcosystemMap, LeadSection, PageHero, SeoJsonLd, ServicePillars, TrustStats } from "@/components/seo-page";
import { absolute, visual } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Auto Makhsus | اکوسیستم تخصصی خودرو، سرویس و طراحی داخلی",
  description: "Auto Makhsus اکوسیستم مادر تهران صندلی، MrSeat، TehranSeat، Tuduzi و ANI2203 برای طراحی داخلی خودرو، صندلی، تودوزی، سرویس مولتی‌برند، ون VIP، کمپر و CRM.",
  path: "/fa",
  image: visual.og,
});

export default function HomePage() {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }])} />
      <PageHero
        eyebrow="Parent Automotive Ecosystem"
        title="Auto Makhsus"
        subtitle="اکوسیستم تخصصی خودرو، سرویس و طراحی داخلی"
        description="از صندلی و تودوزی تا سرویس مولتی‌برند، آپشن، دیتیلینگ، ون VIP، کمپر و مدیریت دیجیتال مشتریان."
        image={visual.hero}
      />
      <EcosystemMap />
      <BrandEcosystem />
      <ServicePillars />
      <TrustStats />
      <DigitalPlatform />
      <LeadSection sourcePage="/fa" interest="درخواست همکاری" />
    </main>
  );
}
