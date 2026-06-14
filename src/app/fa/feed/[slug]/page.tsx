import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDetail } from "@/components/content/content-sections";
import { articleSchema, faqSchema, feedItems, findContent } from "@/lib/content-data";
import { cmsRowToFeed, getPublishedCmsContentBySlug } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return feedItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cmsItem = await getPublishedCmsContentBySlug("FEED_POST", slug);
  const item = cmsItem ? cmsRowToFeed(cmsItem) : findContent(feedItems, slug);
  if (!item) return {};
  return pageMetadata({ title: `${item.title} | فید Auto Makhsus`, description: item.description, path: item.path, image: item.image });
}

export default async function FeedDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cmsItem = await getPublishedCmsContentBySlug("FEED_POST", slug);
  const item = cmsItem ? cmsRowToFeed(cmsItem) : findContent(feedItems, slug);
  if (!item) notFound();
  return <ContentDetail item={item} schema={{ "@graph": [articleSchema(item), faqSchema(item)] }} />;
}
