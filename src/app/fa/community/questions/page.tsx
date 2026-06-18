import type { Metadata } from "next";
import { ContentGrid, ContentHero } from "@/components/content/content-sections";
import { questions } from "@/lib/content-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "پرسش‌وپاسخ Auto Makhsus | سوالات فنی خودرو",
  description: "سوالات فنی، نگهداری، دیاگ، قطعات و سرویس خودرو با پاسخ پذیرفته‌شده و لینک رزرو سرویس.",
  path: "/fa/community/questions",
});

export default function QuestionsPage() {
  return (
    <main>
      <ContentHero eyebrow="Q&A Foundation" title="پرسش‌وپاسخ خودرو" description="فاز اول Q&A خواندنی و کنترل‌شده است؛ سوالات SEO-friendly با پاسخ پذیرفته‌شده و CTA برای مشاوره یا رزرو سرویس." image="/uploads/automakhsus/hero/brand-network.svg" />
      <ContentGrid items={questions} basePath="/fa/community/questions" />
    </main>
  );
}
