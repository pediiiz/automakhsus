DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ContentType') THEN
    CREATE TYPE "ContentType" AS ENUM (
      'ACADEMY_ARTICLE',
      'VIDEO',
      'PROJECT_SHOWCASE',
      'FEED_POST'
    );
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ContentStatus') THEN
    CREATE TYPE "ContentStatus" AS ENUM (
      'DRAFT',
      'PUBLISHED',
      'ARCHIVED'
    );
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS "ContentItem" (
  "id" TEXT NOT NULL,
  "businessUnit" "BusinessUnit" NOT NULL DEFAULT 'AUTOMAKHSUS_TECHNICAL',
  "contentType" "ContentType" NOT NULL,
  "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "excerpt" TEXT,
  "body" TEXT,
  "coverImage" TEXT,
  "videoUrl" TEXT,
  "duration" TEXT,
  "transcript" TEXT,
  "vehicleBrand" TEXT,
  "vehicleModel" TEXT,
  "serviceTags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "mediaJson" JSONB,
  "seoTitle" TEXT,
  "metaDescription" TEXT,
  "canonicalPath" TEXT,
  "ogTitle" TEXT,
  "ogDescription" TEXT,
  "ogImage" TEXT,
  "authorName" TEXT,
  "reviewerName" TEXT,
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deletedAt" TIMESTAMP(3),
  CONSTRAINT "ContentItem_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "ContentItem_contentType_slug_key"
  ON "ContentItem" ("contentType", "slug");

CREATE INDEX IF NOT EXISTS "ContentItem_status_contentType_businessUnit_idx"
  ON "ContentItem" ("status", "contentType", "businessUnit");

CREATE INDEX IF NOT EXISTS "ContentItem_publishedAt_idx"
  ON "ContentItem" ("publishedAt");

