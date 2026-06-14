import { randomUUID } from "node:crypto";
import { getPool } from "@/lib/db";
import type { ContentCard, FeedContent, ProjectContent, VideoContent } from "@/lib/content-data";
import { contentVisual } from "@/lib/content-data";
import type { CrmBusinessUnit } from "@/lib/lead-routing";
import { normalizeCrmBusinessUnit } from "@/lib/lead-routing";

export const cmsContentTypes = ["ACADEMY_ARTICLE", "VIDEO", "PROJECT_SHOWCASE", "FEED_POST"] as const;
export type CmsContentType = (typeof cmsContentTypes)[number];

export const cmsStatuses = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;
export type CmsStatus = (typeof cmsStatuses)[number];

export type CmsContentRow = {
  id: string;
  businessUnit: CrmBusinessUnit;
  contentType: CmsContentType;
  status: CmsStatus;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  coverImage: string | null;
  videoUrl: string | null;
  duration: string | null;
  transcript: string | null;
  vehicleBrand: string | null;
  vehicleModel: string | null;
  serviceTags: string[];
  mediaJson: unknown;
  seoTitle: string | null;
  metaDescription: string | null;
  canonicalPath: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  authorName: string | null;
  reviewerName: string | null;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type CmsUpsertInput = {
  id?: string;
  businessUnit: string;
  contentType: CmsContentType;
  status: CmsStatus;
  title: string;
  slug: string;
  excerpt?: string;
  body?: string;
  coverImage?: string;
  videoUrl?: string;
  duration?: string;
  transcript?: string;
  vehicleBrand?: string;
  vehicleModel?: string;
  serviceTags?: string[];
  mediaJson?: unknown;
  seoTitle?: string;
  metaDescription?: string;
  canonicalPath?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  authorName?: string;
  reviewerName?: string;
};

const contentBasePaths: Record<CmsContentType, string> = {
  ACADEMY_ARTICLE: "/fa/academy",
  VIDEO: "/fa/videos",
  PROJECT_SHOWCASE: "/fa/projects",
  FEED_POST: "/fa/feed",
};

const defaultCategory: Record<CmsContentType, string> = {
  ACADEMY_ARTICLE: "آکادمی",
  VIDEO: "ویدئو",
  PROJECT_SHOWCASE: "نمونه‌کار",
  FEED_POST: "فید روزانه",
};

const defaultService: Record<CmsContentType, string> = {
  ACADEMY_ARTICLE: "مشاوره فنی خودروهای خارجی",
  VIDEO: "درخواست مشاوره ویدئو",
  PROJECT_SHOWCASE: "درخواست نمونه‌کار مشابه",
  FEED_POST: "درخواست پیگیری",
};

export function cmsContentPath(type: CmsContentType, slug: string) {
  return `${contentBasePaths[type]}/${slug}`;
}

export function normalizeCmsSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff-]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function parseServiceTags(value?: string | null) {
  return (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function listCmsContent(filters: { type?: CmsContentType; status?: CmsStatus; query?: string; includeDrafts?: boolean } = {}) {
  try {
    const clauses = ['"deletedAt" IS NULL'];
    const values: unknown[] = [];
    if (filters.type) {
      values.push(filters.type);
      clauses.push(`"contentType" = $${values.length}::"ContentType"`);
    }
    if (filters.status) {
      values.push(filters.status);
      clauses.push(`"status" = $${values.length}::"ContentStatus"`);
    } else if (!filters.includeDrafts) {
      clauses.push(`"status" = 'PUBLISHED'`);
    }
    if (filters.query) {
      values.push(`%${filters.query}%`);
      clauses.push(`("title" ILIKE $${values.length} OR "slug" ILIKE $${values.length} OR "excerpt" ILIKE $${values.length})`);
    }
    const result = await getPool().query<CmsContentRow>(
      `SELECT * FROM "ContentItem"
       WHERE ${clauses.join(" AND ")}
       ORDER BY COALESCE("publishedAt", "updatedAt") DESC, "createdAt" DESC`,
      values,
    );
    return result.rows;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("CMS content list unavailable; using static fallback.", error);
    }
    return [];
  }
}

export async function getPublishedCmsContentBySlug(type: CmsContentType, slug: string) {
  try {
    const result = await getPool().query<CmsContentRow>(
      `SELECT * FROM "ContentItem"
       WHERE "contentType" = $1::"ContentType"
         AND "slug" = $2
         AND "status" = 'PUBLISHED'
         AND "deletedAt" IS NULL
       LIMIT 1`,
      [type, slug],
    );
    return result.rows[0] || null;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("CMS content detail unavailable; using static fallback.", error);
    }
    return null;
  }
}

export async function getCmsContentById(id: string) {
  const result = await getPool().query<CmsContentRow>(
    `SELECT * FROM "ContentItem" WHERE "id" = $1 AND "deletedAt" IS NULL LIMIT 1`,
    [id],
  );
  return result.rows[0] || null;
}

export async function upsertCmsContent(input: CmsUpsertInput) {
  const businessUnit = normalizeCrmBusinessUnit(input.businessUnit) || "AUTOMAKHSUS_TECHNICAL";
  const slug = normalizeCmsSlug(input.slug || input.title);
  const id = input.id || `cms_${randomUUID().replaceAll("-", "")}`;
  const publishedAt = input.status === "PUBLISHED" ? new Date() : null;

  await getPool().query(
    `INSERT INTO "ContentItem" (
      "id", "businessUnit", "contentType", "status", "title", "slug", "excerpt", "body",
      "coverImage", "videoUrl", "duration", "transcript", "vehicleBrand", "vehicleModel",
      "serviceTags", "mediaJson", "seoTitle", "metaDescription", "canonicalPath", "ogTitle",
      "ogDescription", "ogImage", "authorName", "reviewerName", "publishedAt", "createdAt", "updatedAt"
    )
    VALUES (
      $1, $2::"BusinessUnit", $3::"ContentType", $4::"ContentStatus", $5, $6, $7, $8,
      $9, $10, $11, $12, $13, $14, $15, $16::jsonb, $17, $18, $19, $20, $21, $22, $23, $24,
      $25, now(), now()
    )
    ON CONFLICT ("contentType", "slug") DO UPDATE SET
      "businessUnit" = EXCLUDED."businessUnit",
      "status" = EXCLUDED."status",
      "title" = EXCLUDED."title",
      "excerpt" = EXCLUDED."excerpt",
      "body" = EXCLUDED."body",
      "coverImage" = EXCLUDED."coverImage",
      "videoUrl" = EXCLUDED."videoUrl",
      "duration" = EXCLUDED."duration",
      "transcript" = EXCLUDED."transcript",
      "vehicleBrand" = EXCLUDED."vehicleBrand",
      "vehicleModel" = EXCLUDED."vehicleModel",
      "serviceTags" = EXCLUDED."serviceTags",
      "mediaJson" = EXCLUDED."mediaJson",
      "seoTitle" = EXCLUDED."seoTitle",
      "metaDescription" = EXCLUDED."metaDescription",
      "canonicalPath" = EXCLUDED."canonicalPath",
      "ogTitle" = EXCLUDED."ogTitle",
      "ogDescription" = EXCLUDED."ogDescription",
      "ogImage" = EXCLUDED."ogImage",
      "authorName" = EXCLUDED."authorName",
      "reviewerName" = EXCLUDED."reviewerName",
      "publishedAt" = CASE WHEN EXCLUDED."status" = 'PUBLISHED' THEN COALESCE("ContentItem"."publishedAt", now()) ELSE NULL END,
      "updatedAt" = now()
    RETURNING "id"`,
    [
      id,
      businessUnit,
      input.contentType,
      input.status,
      input.title.trim(),
      slug,
      input.excerpt || null,
      input.body || null,
      input.coverImage || null,
      input.videoUrl || null,
      input.duration || null,
      input.transcript || null,
      input.vehicleBrand || null,
      input.vehicleModel || null,
      input.serviceTags || [],
      JSON.stringify(input.mediaJson || null),
      input.seoTitle || null,
      input.metaDescription || null,
      input.canonicalPath || cmsContentPath(input.contentType, slug),
      input.ogTitle || null,
      input.ogDescription || null,
      input.ogImage || null,
      input.authorName || null,
      input.reviewerName || null,
      publishedAt,
    ],
  );
}

export async function updateCmsStatus(id: string, status: CmsStatus) {
  await getPool().query(
    `UPDATE "ContentItem"
     SET "status" = $2::"ContentStatus",
         "publishedAt" = CASE WHEN $2::"ContentStatus" = 'PUBLISHED' THEN COALESCE("publishedAt", now()) ELSE NULL END,
         "updatedAt" = now()
     WHERE "id" = $1`,
    [id, status],
  );
}

export function cmsRowToContentCard(row: CmsContentRow): ContentCard {
  const path = row.canonicalPath || cmsContentPath(row.contentType, row.slug);
  const tags = [...(row.serviceTags || [])];
  if (row.vehicleBrand) tags.push(row.vehicleBrand);
  if (row.vehicleModel) tags.push(row.vehicleModel);

  return {
    slug: row.slug,
    title: row.title,
    eyebrow: defaultCategory[row.contentType],
    summary: row.excerpt || row.metaDescription || row.title,
    description: row.excerpt || row.metaDescription || row.title,
    category: defaultCategory[row.contentType],
    tags,
    brand: row.vehicleBrand || undefined,
    model: row.vehicleModel || undefined,
    service: row.serviceTags?.[0] || defaultService[row.contentType],
    readTime: row.contentType === "ACADEMY_ARTICLE" ? "مدیریت محتوا" : undefined,
    date: (row.publishedAt || row.updatedAt || row.createdAt).toISOString(),
    image: row.coverImage || row.ogImage || contentVisual.academy,
    path,
    sections: [
      {
        title: row.title,
        body: row.body || row.excerpt || "این محتوا از Content Manager منتشر شده است.",
      },
    ],
    faqs: [],
    relatedServices: [],
  };
}

export function cmsRowToVideo(row: CmsContentRow): VideoContent {
  const base = cmsRowToContentCard(row);
  return {
    ...base,
    poster: row.coverImage || row.ogImage || contentVisual.videos,
    duration: row.duration || "00:00",
    transcript: row.transcript || row.body || row.excerpt || "",
    chapters: [],
    relatedCars: row.vehicleBrand
      ? [{ brand: row.vehicleBrand, model: row.vehicleModel || undefined, href: row.vehicleModel ? `/fa/cars/${row.vehicleBrand}/${row.vehicleModel}` : "/fa/cars" }]
      : [],
  };
}

export function cmsRowToProject(row: CmsContentRow): ProjectContent {
  const base = cmsRowToContentCard(row);
  return {
    ...base,
    vehicle: [row.vehicleBrand, row.vehicleModel].filter(Boolean).join(" ") || "خودرو خارجی",
    executionTime: "طبق برنامه پروژه",
    stages: [
      { title: "قبل", body: "ثبت وضعیت اولیه و نیاز مشتری." },
      { title: "حین", body: "اجرای کار و کنترل کیفیت مرحله‌ای." },
      { title: "بعد", body: "تحویل، مستندسازی و ثبت مسیر پیگیری." },
    ],
  };
}

export function cmsRowToFeed(row: CmsContentRow): FeedContent {
  return {
    ...cmsRowToContentCard(row),
    format: "service",
  };
}

export function mergeCmsWithStatic<T extends { slug: string }>(cmsItems: T[], staticItems: T[]) {
  const cmsSlugs = new Set(cmsItems.map((item) => item.slug));
  return [...cmsItems, ...staticItems.filter((item) => !cmsSlugs.has(item.slug))];
}
