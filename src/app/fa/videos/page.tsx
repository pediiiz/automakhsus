import type { Metadata } from "next";
import { ContentGrid, ContentHero } from "@/components/content/content-sections";
import { SeoJsonLd } from "@/components/seo-page";
import { contentVisual, videos } from "@/lib/content-data";
import { absolute } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "مرکز ویدئو Auto Makhsus | آموزش، دیاگ و نصب آپشن",
  description: "ویدئوهای آموزشی، خدمات، دیاگ، نصب آپشن، توضیح فرایند و ترنسکریپت برای خودروهای خارجی در Auto Makhsus.",
  path: "/fa/videos",
});

export default function VideosPage() {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "ویدئوها", url: absolute("/fa/videos") }])} />
      <ContentHero eyebrow="Video Center" title="مرکز ویدئو Auto Makhsus" description="ویدئوهای آموزشی، خدمات، دیاگ و نصب آپشن با توضیح، پوستر، ترنسکریپت و لینک مستقیم به سرویس‌های مرتبط." image={contentVisual.videos} />
      <ContentGrid items={videos} basePath="/fa/videos" />
    </main>
  );
}
