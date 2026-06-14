import type { Metadata } from "next";
import { CmsAdminPage } from "@/app/fa/admin/cms/cms-admin";

export const metadata: Metadata = {
  title: "مدیریت فید Auto Makhsus",
  robots: { index: false, follow: false },
};

export default async function CmsFeedPage({ searchParams }: { searchParams: Promise<{ token?: string; query?: string; status?: string }> }) {
  const params = await searchParams;
  return <CmsAdminPage section="feed" token={params.token} query={params.query} status={params.status} />;
}
