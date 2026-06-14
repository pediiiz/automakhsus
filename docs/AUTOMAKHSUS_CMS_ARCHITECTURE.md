# Auto Makhsus CMS Architecture

Date: 2026-06-14
Stage: Architecture and design only
Status: planned, not implemented

## Goal

Create an authenticated Content Manager that lets the Auto Makhsus team manage Academy, Videos, Projects, Feed, Community Q&A, and Vehicle Knowledge Base content without code changes.

The CMS must preserve the current public-site performance model, SEO quality, business-unit isolation, and CRM lead attribution.

## Scope

Managed content types:

- Academy articles
- Video Center items
- Project Showcase entries
- Social feed posts
- Community Q&A entries
- Vehicle brand hubs
- Vehicle model hubs
- Shared FAQs, tags, service mappings, and related content links

Out of scope for first implementation:

- Public user posting
- Paid marketplace product management
- Full media DAM workflows beyond existing media upload integration
- AI auto-publishing
- Replacing TehranSandali CRM modules

## Product Architecture

### Admin Content Dashboard

Route proposal:

- `/fa/admin/content`

Dashboard widgets:

- Draft content awaiting review
- Scheduled/published content
- SEO completeness warnings
- Missing media/alt text
- Thin content warnings
- Recently edited items
- Items by business unit
- Items by type
- Content performance placeholders for future analytics

### Content Editors

Route proposal:

- `/fa/admin/content/articles`
- `/fa/admin/content/videos`
- `/fa/admin/content/projects`
- `/fa/admin/content/feed`
- `/fa/admin/content/questions`
- `/fa/admin/content/vehicles/brands`
- `/fa/admin/content/vehicles/models`

Each editor should provide:

- Title, slug, summary, body/sections
- Category, tags, services, brands, models
- SEO title, meta description, canonical override if needed
- Open Graph title/description/image
- Structured data preview
- Draft/published status
- Author/reviewer fields
- Business unit scope
- Related content links
- Media picker/upload
- Preview URL
- Revision history

## System Architecture

Recommended approach:

- Implement CMS inside the existing Next.js AutoMakhsus application or shared CRM admin shell.
- Store content in PostgreSQL using additive tables.
- Keep public pages statically optimized where possible through cache/revalidation.
- Keep current static TypeScript content as seed/fallback during migration.
- Reuse shared CRM user, staff, role, permission, business-unit, audit-log, and media concepts where available.

### Rendering Strategy

Phase 1:

- Public routes read static TypeScript content and CMS content together.
- CMS content takes priority when slug matches.
- Static content remains fallback.

Phase 2:

- Migrate static content to database records.
- Preserve slugs, metadata, canonical URLs, and sitemap entries.
- Keep static content file as emergency fallback or seed fixture.

Phase 3:

- Add editorial scheduling and revalidation triggers.
- Add analytics and Search Console-driven improvement queue.

### Caching and Revalidation

Public content should remain fast:

- Published content can be statically rendered or cached.
- Draft preview should require authenticated signed preview access.
- Publishing, unpublishing, or slug changes should trigger route revalidation.
- Sitemap should include only published, indexable items.

## Business Unit Model

Every content item should support `businessUnit`.

Canonical values:

- `AUTOMAKHSUS_TECHNICAL`
- `AUTOMAKHSUS_MARKETPLACE`
- `TEHRANSANDALI`
- `ANI2203`
- `TUDUZI`

Default for `automakhsus.com` content:

- Technical service, academy, diagnostics, vehicle knowledge: `AUTOMAKHSUS_TECHNICAL`
- Store/category/procurement content: `AUTOMAKHSUS_MARKETPLACE`
- Interior links: `TEHRANSANDALI`
- ANI Service content: `ANI2203`
- Upholstery content: `TUDUZI`

Business-unit scope must control:

- Who can create/edit/review/publish
- Which CRM leads are created by CTAs
- Which media assets can be selected
- Which content appears in internal dashboards

## Permission Model

Suggested CMS permissions:

- `content.read`
- `content.create`
- `content.edit_own`
- `content.edit_all`
- `content.review`
- `content.publish`
- `content.unpublish`
- `content.delete_soft`
- `content.media.attach`
- `content.seo.edit`
- `content.vehicle_hub.edit`
- `content.qa.moderate`

Role mapping:

- `SUPER_ADMIN`: full access across all business units.
- `MANAGER`: manage/review/publish assigned business units.
- `PROJECT_MANAGER`: create/edit project showcase content for assigned projects/business units.
- `SALES_AGENT`: create feed/project drafts and customer-facing notes, no publish.
- `RECEPTION`: create project/feed drafts connected to reception, no publish.
- `QC_INSPECTOR`: add QC-approved project notes/media, no publish unless granted.
- `FINANCE`: read only where needed, no editorial publish by default.
- Operational staff: create draft evidence/project notes for assigned tasks only.
- `CUSTOMER`: no admin CMS access.

## Media Integration

Use existing media storage patterns:

- Upload images/videos/documents through server-side API.
- Store media metadata in database.
- Never trust client filesystem paths.
- Public pages can only use media explicitly marked as published/approved.
- Admin editors use a media picker with filters by type, business unit, brand, model, service, project, and placement.

Required media fields:

- Title
- Alt text in Persian
- Caption
- Type
- MIME type
- Size
- URL/path
- Business unit
- Uploaded by
- Approval status
- Usage placements

## SEO Architecture

Every content item should support:

- SEO title
- Meta description
- Canonical path
- Robots index/follow flag
- OG title
- OG description
- OG image
- Breadcrumb title
- Schema type
- FAQ entries
- Related internal links
- Sitemap priority/change frequency

SEO quality checks:

- Missing title/description
- Duplicate slug
- Duplicate title
- Missing canonical
- Missing image alt
- Thin body/content sections
- Missing internal links
- Missing CTA
- Draft accidentally marked indexable

## Audit Logging

Audit events:

- Content created
- Content edited
- Status changed
- Review requested
- Review approved/rejected
- Published/unpublished
- Slug changed
- SEO fields changed
- Media attached/removed
- Soft deleted/restored

Audit logs must include user, role, business unit, content type, content id, and timestamp.

## Sitemap Strategy

Sitemap generation must include:

- Static core routes
- Published CMS content only
- No drafts
- No rejected content
- No internal/admin routes
- Canonical URL only
- Last modified from content `publishedAt` or `updatedAt`

If content volume grows:

- Use sitemap index
- Split by content type:
  - `/sitemap-static.xml`
  - `/sitemap-academy.xml`
  - `/sitemap-videos.xml`
  - `/sitemap-projects.xml`
  - `/sitemap-community.xml`
  - `/sitemap-cars.xml`

## Migration From Static TypeScript Content

Migration principles:

- Preserve current slugs.
- Preserve current canonical URLs.
- Preserve metadata and schema intent.
- Import current TypeScript content as seed records.
- Keep static fallback until production CMS publishing is stable.
- Add redirects only if slugs must change.

Migration sequence:

1. Add additive CMS tables.
2. Build import script from `src/lib/content-data.ts`.
3. Import content as published records with original dates.
4. Public pages read CMS first, static fallback second.
5. Verify sitemap and route parity.
6. Remove static dependency only after QA.

## Risks

- Publishing low-quality content can create SEO thin/duplicate risk.
- Weak permissions can leak cross-business-unit content.
- Slug changes can damage SEO if not redirected.
- Draft preview must not be indexed.
- Media approval rules must prevent accidental public exposure.

## Recommendation

Implement the CMS as part of the shared Auto Makhsus CRM/admin architecture, not as a disconnected third-party CMS. This keeps business-unit isolation, lead routing, media, audit logs, and future CRM/AI integrations under one permission model.
