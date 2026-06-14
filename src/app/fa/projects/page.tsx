import type { Metadata } from "next";
import { ContentGrid, ContentHero } from "@/components/content/content-sections";
import { SeoJsonLd } from "@/components/seo-page";
import { contentVisual, projects } from "@/lib/content-data";
import { cmsRowToProject, listCmsContent, mergeCmsWithStatic } from "@/lib/cms";
import { absolute } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "نمونه‌کارهای Auto Makhsus | قبل، حین و بعد خدمات خودروهای خارجی",
  description: "نمونه‌کارهای Auto Makhsus برای دیاگ، خدمات فنی، دیتیلینگ، نصب آپشن، بدنه، رنگ و پروژه‌های خودروهای خارجی.",
  path: "/fa/projects",
});

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const cmsItems = (await listCmsContent({ type: "PROJECT_SHOWCASE" })).map(cmsRowToProject);
  const items = mergeCmsWithStatic(cmsItems, projects);
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "نمونه‌کارها", url: absolute("/fa/projects") }])} />
      <ContentHero eyebrow="Project Showcase" title="نمونه‌کارها و پروژه‌های Auto Makhsus" description="نمایش کنترل‌شده و عمومی از قبل، حین و بعد خدمات؛ بدون اطلاعات خصوصی مشتری و با لینک به سرویس، برند خودرو و درخواست مشاوره." image={contentVisual.projects} />
      <ContentGrid items={items} basePath="/fa/projects" />
    </main>
  );
}
