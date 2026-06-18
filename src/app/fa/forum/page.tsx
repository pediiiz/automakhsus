import type { Metadata } from "next";
import { ForumHome } from "@/components/forum/forum-sections";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "انجمن Auto Makhsus | Forum خودرو",
  description: "انجمن کنترل‌شده Auto Makhsus برای گروه‌ها، موضوعات، پرسش‌وپاسخ، moderation، pin/lock و مسیر امن مشاوره خودرو.",
  path: "/fa/forum",
});

export default function ForumPage() {
  return <ForumHome />;
}
