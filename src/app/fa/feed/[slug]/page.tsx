import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDetail } from "@/components/content/content-sections";
import { articleSchema, faqSchema, feedItems, findContent } from "@/lib/content-data";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return feedItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = findContent(feedItems, slug);
  if (!item) return {};
  return pageMetadata({ title: `${item.title} | فید Auto Makhsus`, description: item.description, path: item.path, image: item.image });
}

export default async function FeedDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findContent(feedItems, slug);
  if (!item) notFound();
  return <ContentDetail item={item} schema={{ "@graph": [articleSchema(item), faqSchema(item)] }} />;
}
