import type { Metadata } from "next";
import { DigitalPlatform, LeadSection, PageHero, SeoJsonLd } from "@/components/seo-page";
import { absolute, visual } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "پلتفرم دیجیتال Auto Makhsus | CRM، پرتال مشتریان و عملیات",
  description: "پلتفرم دیجیتال Auto Makhsus شامل CRM، پرتال مشتریان، رزرو، کتابخانه رسانه، سفارش کار و رهگیری پیشرفت پروژه‌ها است.",
  path: "/fa/digital-platform",
});

export default function DigitalPlatformPage() {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "پلتفرم دیجیتال", url: absolute("/fa/digital-platform") }])} />
      <PageHero eyebrow="Digital Platform" title="زیرساخت دیجیتال CRM و مدیریت مشتریان" description="از لید و رزرو تا سفارش کار، رسانه، پیشرفت پروژه و پرتال مشتریان، Auto Makhsus عملیات برندها را دیجیتال می‌کند." image={visual.platform} />
      <DigitalPlatform />
      <LeadSection sourcePage="/fa/digital-platform" interest="CRM و پلتفرم دیجیتال" />
    </main>
  );
}
