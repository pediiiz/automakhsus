import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VideoDetail } from "@/components/content/content-sections";
import { faqSchema, findContent, videoSchema, videos } from "@/lib/content-data";
import { cmsRowToVideo, getPublishedCmsContentBySlug } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return videos.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cmsItem = await getPublishedCmsContentBySlug("VIDEO", slug);
  const item = cmsItem ? cmsRowToVideo(cmsItem) : findContent(videos, slug);
  if (!item) return {};
  return pageMetadata({ title: `${item.title} | مرکز ویدئو Auto Makhsus`, description: item.description, path: item.path, image: item.poster });
}

export default async function VideoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cmsItem = await getPublishedCmsContentBySlug("VIDEO", slug);
  const item = cmsItem ? cmsRowToVideo(cmsItem) : findContent(videos, slug);
  if (!item) notFound();
  return <VideoDetail item={item} schema={{ "@graph": [videoSchema(item), faqSchema(item)] }} />;
}
