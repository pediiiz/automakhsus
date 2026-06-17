import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ForumTopicDetail } from "@/components/forum/forum-sections";
import { findForumTopic, forumTopics } from "@/lib/forum-data";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return forumTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = findForumTopic(slug);
  if (!topic) return {};
  return pageMetadata({
    title: `${topic.title} | انجمن Auto Makhsus`,
    description: topic.excerpt,
    path: `/fa/forum/topics/${topic.slug}`,
  });
}

export default async function ForumTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = findForumTopic(slug);
  if (!topic) notFound();
  return <ForumTopicDetail topic={topic} />;
}
