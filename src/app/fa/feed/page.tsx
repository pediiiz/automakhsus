import type { Metadata } from "next";
import { ContentGrid, ContentHero } from "@/components/content/content-sections";
import { SeoJsonLd } from "@/components/seo-page";
import { contentVisual, feedItems } from "@/lib/content-data";
import { absolute } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "فید روزانه Auto Makhsus | فعالیت، پروژه و خدمات خودروهای خارجی",
  description: "فید روزانه Auto Makhsus برای پست‌های کنترل‌شده درباره خدمات، پروژه‌ها، قطعات، خودروهای خارجی و درخواست مشاوره.",
  path: "/fa/feed",
});

export default function FeedPage() {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "فید روزانه", url: absolute("/fa/feed") }])} />
      <ContentHero eyebrow="Daily Feed" title="فید روزانه Auto Makhsus" description="یک جریان محتوایی سبک شبیه شبکه اجتماعی داخلی برای پروژه‌ها، خدمات، ویدئوها، قطعات و CTA مشاوره؛ بدون ارسال عمومی کاربران در فاز اول." image={contentVisual.feed} />
      <ContentGrid items={feedItems} basePath="/fa/feed" />
    </main>
  );
}
