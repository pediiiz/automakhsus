import type { Metadata } from "next";
import { ContentGrid, ContentHero } from "@/components/content/content-sections";
import { SeoJsonLd } from "@/components/seo-page";
import { academyArticles, contentVisual } from "@/lib/content-data";
import { absolute } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "آکادمی Auto Makhsus | مقالات فنی خودروهای خارجی",
  description: "آکادمی Auto Makhsus شامل مقالات فنی، ویدئو آموزشی، راهنمای نگهداری، عیب‌یابی و راهنمای برند و مدل خودروهای خارجی است.",
  path: "/fa/academy",
});

export default function AcademyPage() {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "آکادمی", url: absolute("/fa/academy") }])} />
      <ContentHero eyebrow="Academy" title="آکادمی خودروهای خارجی Auto Makhsus" description="مقالات فنی، راهنمای نگهداری، عیب‌یابی و آموزش‌های کاربردی برای مالکان خودروهای وارداتی؛ با مسیر روشن به رزرو سرویس، قطعه و مشاوره." image={contentVisual.academy} />
      <ContentGrid items={academyArticles} basePath="/fa/academy" />
    </main>
  );
}
