# Auto Makhsus Content Manager Data Model

Date: 2026-06-14
Stage: Architecture and design only
Status: planned, not implemented

## Design Principles

- Additive schema only.
- One shared content model with typed extensions per content kind.
- Business-unit scoped records.
- Draft/review/published lifecycle.
- SEO fields stored explicitly.
- Media attached through safe media references, not raw paths.
- Preserve static TypeScript content as seed/fallback during migration.

## Core Enums

### ContentType

- `ACADEMY_ARTICLE`
- `VIDEO`
- `PROJECT_SHOWCASE`
- `FEED_POST`
- `COMMUNITY_QUESTION`
- `COMMUNITY_ANSWER`
- `VEHICLE_BRAND_HUB`
- `VEHICLE_MODEL_HUB`
- `FAQ`
- `LANDING_PAGE`

### ContentStatus

- `DRAFT`
- `IN_REVIEW`
- `APPROVED`
- `SCHEDULED`
- `PUBLISHED`
- `REJECTED`
- `ARCHIVED`

### ReviewStatus

- `NOT_REQUESTED`
- `REQUESTED`
- `APPROVED`
- `REJECTED`
- `NEEDS_CHANGES`

### PublishVisibility

- `PUBLIC`
- `PRIVATE`
- `NOINDEX`
- `INTERNAL_ONLY`

### ContentSource

- `MANUAL`
- `STATIC_IMPORT`
- `CRM_PROJECT`
- `MEDIA_LIBRARY`
- `FUTURE_AI_DRAFT`

## Canonical Models

### ContentItem

Primary table for all content.

Fields:

- `id`
- `businessUnit`
- `type`
- `status`
- `visibility`
- `source`
- `slug`
- `path`
- `locale`
- `title`
- `subtitle`
- `summary`
- `body`
- `excerpt`
- `category`
- `serviceType`
- `brandSlug`
- `modelSlug`
- `vehicleYearRange`
- `authorId`
- `reviewerId`
- `createdById`
- `updatedById`
- `publishedById`
- `reviewRequestedAt`
- `reviewedAt`
- `scheduledAt`
- `publishedAt`
- `archivedAt`
- `createdAt`
- `updatedAt`
- `deletedAt`

Indexes:

- `(type, status, businessUnit)`
- `(slug, locale)`
- `(path)`
- `(businessUnit, publishedAt)`
- `(brandSlug, modelSlug)`

Constraints:

- Published content must have unique `(path, locale)`.
- Slug must be URL-safe.
- Deleted items are soft deleted.

### ContentSection

Repeatable body sections.

Fields:

- `id`
- `contentItemId`
- `sortOrder`
- `heading`
- `body`
- `layout`
- `mediaId`
- `ctaLabel`
- `ctaHref`
- `createdAt`
- `updatedAt`

Use cases:

- Article sections
- Brand hub sections
- Model hub sections
- Project before/during/after blocks
- Video transcript/chapter blocks

### ContentSEO

Explicit SEO fields.

Fields:

- `id`
- `contentItemId`
- `seoTitle`
- `metaDescription`
- `canonicalPath`
- `robotsIndex`
- `robotsFollow`
- `ogTitle`
- `ogDescription`
- `ogImageMediaId`
- `schemaType`
- `sitemapPriority`
- `sitemapChangeFrequency`
- `breadcrumbTitle`
- `seoNotes`
- `createdAt`
- `updatedAt`

### ContentTag

Reusable tag dictionary.

Fields:

- `id`
- `businessUnit`
- `slug`
- `name`
- `type`
- `createdAt`
- `updatedAt`

Tag types:

- `SERVICE`
- `BRAND`
- `MODEL`
- `TOPIC`
- `LOCATION`
- `PART`
- `PROBLEM`

### ContentItemTag

Many-to-many relation.

Fields:

- `contentItemId`
- `tagId`

### ContentMedia

Content-to-media relation.

Fields:

- `id`
- `contentItemId`
- `mediaId`
- `placement`
- `sortOrder`
- `altText`
- `caption`
- `isFeatured`
- `createdAt`

Placements:

- `HERO`
- `OG_IMAGE`
- `INLINE`
- `GALLERY`
- `POSTER`
- `BEFORE`
- `DURING`
- `AFTER`
- `THUMBNAIL`

### ContentRelation

Internal linking and related content.

Fields:

- `id`
- `sourceContentItemId`
- `targetContentItemId`
- `relationType`
- `sortOrder`
- `createdAt`

Relation types:

- `RELATED_ARTICLE`
- `RELATED_VIDEO`
- `RELATED_PROJECT`
- `RELATED_SERVICE`
- `RELATED_BRAND`
- `RELATED_MODEL`
- `NEXT_STEP`
- `CANONICAL_PARENT`

### ContentReview

Review workflow.

Fields:

- `id`
- `contentItemId`
- `requestedById`
- `reviewerId`
- `status`
- `comments`
- `requestedAt`
- `reviewedAt`

### ContentRevision

Version history.

Fields:

- `id`
- `contentItemId`
- `version`
- `snapshotJson`
- `createdById`
- `createdAt`
- `changeSummary`

### ContentAuditLog

Can reuse global audit log if available; otherwise add content-specific audit table.

Fields:

- `id`
- `businessUnit`
- `actorId`
- `actorRole`
- `contentItemId`
- `action`
- `metadataJson`
- `createdAt`

## Type-Specific Extensions

### ArticleContent

Fields:

- `contentItemId`
- `readTimeMinutes`
- `difficulty`
- `technicalAccuracyReviewed`
- `reviewedBySpecialistId`

### VideoContent

Fields:

- `contentItemId`
- `durationSeconds`
- `posterMediaId`
- `videoMediaId`
- `externalVideoUrl`
- `transcript`
- `chaptersJson`
- `videoSchemaJson`

### ProjectShowcaseContent

Fields:

- `contentItemId`
- `projectId`
- `customerVehicleId`
- `executionTime`
- `privacyReviewed`
- `beforeMediaId`
- `duringMediaId`
- `afterMediaId`
- `publishedVehicleLabel`

Privacy rule:

- Never expose VIN, plate, phone, customer name, private invoice data, or internal notes.

### FeedPostContent

Fields:

- `contentItemId`
- `format`
- `projectId`
- `mediaId`
- `shortCaption`
- `ctaType`

Formats:

- `PHOTO`
- `VIDEO`
- `PROJECT`
- `SERVICE`
- `TIP`
- `MARKETPLACE`

### CommunityQuestionContent

Fields:

- `contentItemId`
- `questionText`
- `acceptedAnswerContentItemId`
- `moderationStatus`
- `publicPostingEnabled`

Phase 1 rule:

- Read-only public Q&A. No public posting until moderation and abuse controls are implemented.

### VehicleBrandHubContent

Fields:

- `contentItemId`
- `brandSlug`
- `brandEnglishName`
- `brandPersianName`
- `commonIssuesJson`
- `diagnosticsJson`
- `partsGuidanceJson`
- `optionsJson`
- `detailingJson`
- `servicePackagesJson`

### VehicleModelHubContent

Fields:

- `contentItemId`
- `brandSlug`
- `modelSlug`
- `modelEnglishName`
- `modelPersianName`
- `yearRange`
- `engineNotes`
- `transmissionNotes`
- `commonIssuesJson`
- `maintenanceJson`
- `partsGuidanceJson`
- `servicePackagesJson`

## Sitemap Data

Sitemap generation reads:

- `ContentItem.status = PUBLISHED`
- `ContentItem.visibility = PUBLIC`
- `ContentSEO.robotsIndex = true`
- `ContentSEO.canonicalPath`
- `ContentItem.updatedAt` or `publishedAt`
- `ContentSEO.sitemapPriority`
- `ContentSEO.sitemapChangeFrequency`

## Migration Map From Static TypeScript

Current static fields map to CMS:

- `slug` -> `ContentItem.slug`
- `title` -> `ContentItem.title`
- `eyebrow` -> `ContentItem.subtitle` or `category`
- `summary` -> `ContentItem.summary`
- `description` -> `ContentItem.excerpt`
- `category` -> `ContentItem.category`
- `tags` -> `ContentTag`
- `brand` -> `brandSlug`
- `model` -> `modelSlug`
- `service` -> `serviceType`
- `date` -> `publishedAt`
- `image` -> `ContentMedia(HERO)`
- `path` -> `ContentItem.path`
- `sections` -> `ContentSection`
- `faqs` -> FAQ child content or JSON sections
- `relatedServices` -> `ContentRelation`
- `duration`, `transcript`, `poster`, `chapters` -> `VideoContent`
- `vehicle`, `executionTime`, `stages` -> `ProjectShowcaseContent`
- vehicle brand/model arrays -> `VehicleBrandHubContent` / `VehicleModelHubContent`

## Validation Rules

Required before publish:

- Title exists.
- Slug/path unique.
- Meta description exists and is not empty.
- Canonical path exists.
- Persian alt text exists for hero/OG media.
- At least one CTA or lead path exists.
- At least two internal links exist for SEO content.
- Business unit is set.
- Reviewer approved if role requires review.
- Project showcase privacy review completed.
- Q&A answer approved.

## Future AI Support

AI may later generate:

- Draft outlines
- Suggested FAQs
- Internal link recommendations
- Meta description suggestions
- Search Console improvement suggestions

AI must not publish automatically.

AI-generated drafts should store:

- `source = FUTURE_AI_DRAFT`
- model/provider metadata without secrets
- human reviewer and approval status
