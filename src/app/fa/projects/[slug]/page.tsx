import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/content/content-sections";
import { articleSchema, faqSchema, findContent, projects } from "@/lib/content-data";
import { SeoJsonLd } from "@/components/seo-page";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = findContent(projects, slug);
  if (!item) return {};
  return pageMetadata({ title: `${item.title} | نمونه‌کار Auto Makhsus`, description: item.description, path: item.path, image: item.image });
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findContent(projects, slug);
  if (!item) notFound();
  return (
    <>
      <SeoJsonLd data={{ "@graph": [articleSchema(item), faqSchema(item)] }} />
      <ProjectDetail item={item} />
    </>
  );
}
