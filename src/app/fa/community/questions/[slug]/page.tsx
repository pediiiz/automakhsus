import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuestionDetail } from "@/components/content/content-sections";
import { findContent, qaSchema, questions } from "@/lib/content-data";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return questions.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = findContent(questions, slug);
  if (!item) return {};
  return pageMetadata({ title: `${item.title} | پرسش‌وپاسخ Auto Makhsus`, description: item.description, path: item.path, image: item.image });
}

export default async function QuestionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = findContent(questions, slug);
  if (!item) notFound();
  return <QuestionDetail item={item} schema={qaSchema(item)} />;
}
