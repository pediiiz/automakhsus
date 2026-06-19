import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDetail } from "@/components/content/content-sections";
import { academyArticles, articleSchema, faqSchema, findContent } from "@/lib/content-data";
import { cmsRowToContentCard, getPublishedCmsContentBySlug } from "@/lib/cms";
import { fetchPublicMediaByRelation } from "@/lib/media-center-public";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return academyArticles.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cmsItem = await getPublishedCmsContentBySlug("ACADEMY_ARTICLE", slug);
  const item = cmsItem ? cmsRowToContentCard(cmsItem) : findContent(academyArticles, slug);
  if (!item) return {};
  return pageMetadata({ title: `${item.title} | آکادمی Auto Makhsus`, description: item.description, path: item.path, image: item.image });
}

export default async function AcademyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cmsItem = await getPublishedCmsContentBySlug("ACADEMY_ARTICLE", slug);
  const item = cmsItem ? cmsRowToContentCard(cmsItem) : findContent(academyArticles, slug);
  if (!item) notFound();
  const [articleMedia, videoMedia] = await Promise.all([
    fetchPublicMediaByRelation({ relationType: "academy_article", relationId: slug, take: 2 }),
    fetchPublicMediaByRelation({ relationType: "academy_video", relationId: slug, take: 2 }),
  ]);
  return <ContentDetail item={item} schema={{ "@graph": [articleSchema(item), faqSchema(item)] }} media={[...videoMedia, ...articleMedia]} mediaRelationType={videoMedia.length ? "academy_video" : "academy_article"} />;
}
