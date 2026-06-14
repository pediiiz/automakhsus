"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireCmsToken, redirectWithToken } from "@/lib/cms-auth";
import { cmsContentTypes, cmsStatuses, parseServiceTags, updateCmsStatus, upsertCmsContent } from "@/lib/cms";

const contentSchema = z.object({
  token: z.string().optional(),
  id: z.string().optional(),
  businessUnit: z.string().min(1),
  contentType: z.enum(cmsContentTypes),
  status: z.enum(cmsStatuses),
  title: z.string().trim().min(2).max(180),
  slug: z.string().trim().min(2).max(160),
  excerpt: z.string().trim().max(600).optional(),
  body: z.string().trim().max(20000).optional(),
  coverImage: z.string().trim().max(400).optional(),
  videoUrl: z.string().trim().max(400).optional(),
  duration: z.string().trim().max(40).optional(),
  transcript: z.string().trim().max(20000).optional(),
  vehicleBrand: z.string().trim().max(120).optional(),
  vehicleModel: z.string().trim().max(120).optional(),
  serviceTags: z.string().trim().max(600).optional(),
  seoTitle: z.string().trim().max(180).optional(),
  metaDescription: z.string().trim().max(320).optional(),
  canonicalPath: z.string().trim().max(240).optional(),
  ogTitle: z.string().trim().max(180).optional(),
  ogDescription: z.string().trim().max(320).optional(),
  ogImage: z.string().trim().max(400).optional(),
  authorName: z.string().trim().max(120).optional(),
  reviewerName: z.string().trim().max(120).optional(),
  returnPath: z.string().trim().min(1),
});

const statusSchema = z.object({
  token: z.string().optional(),
  id: z.string().min(1),
  status: z.enum(cmsStatuses),
  returnPath: z.string().trim().min(1),
});

export async function saveContentAction(formData: FormData) {
  const parsed = contentSchema.parse(Object.fromEntries(formData.entries()));
  requireCmsToken(parsed.token);
  await upsertCmsContent({
    ...parsed,
    serviceTags: parseServiceTags(parsed.serviceTags),
  });
  revalidateCmsRoutes();
  redirectWithToken(parsed.returnPath, parsed.token);
}

export async function updateContentStatusAction(formData: FormData) {
  const parsed = statusSchema.parse(Object.fromEntries(formData.entries()));
  requireCmsToken(parsed.token);
  await updateCmsStatus(parsed.id, parsed.status);
  revalidateCmsRoutes();
  redirectWithToken(parsed.returnPath, parsed.token);
}

function revalidateCmsRoutes() {
  for (const path of ["/fa/academy", "/fa/videos", "/fa/projects", "/fa/feed", "/sitemap.xml"]) {
    revalidatePath(path);
  }
}
