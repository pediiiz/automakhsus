import type { Metadata } from "next";
import { CommunityHome } from "@/components/content/content-sections";
import { questions } from "@/lib/content-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "کامیونیتی Auto Makhsus | پرسش‌وپاسخ خودروهای خارجی",
  description: "فوندیشن خواندنی کامیونیتی Auto Makhsus برای دسته‌بندی سوالات، پرسش‌وپاسخ، پاسخ پذیرفته‌شده و مسیر درخواست خدمات خودروهای خارجی.",
  path: "/fa/community",
});

export default function CommunityPage() {
  return <CommunityHome questions={questions} />;
}
