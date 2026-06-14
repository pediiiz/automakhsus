# Auto Makhsus CMS Phase 1 Report

Date: 2026-06-14

## Summary

Auto Makhsus CMS Phase 1 was implemented and deployed for `automakhsus.com`.

The first version adds a production-safe, authenticated content manager for:

- Academy articles
- Videos
- Project showcase entries
- Feed posts

Static TypeScript content remains as a fallback. Published CMS records are merged ahead of static content on public pages, while draft and archived content are never exposed publicly.

## Database Changes

Additive Prisma migration:

- `prisma/migrations/20260614160000_add_cms_content/migration.sql`

Added:

- `ContentType` enum
- `ContentStatus` enum
- `ContentItem` table
- Unique key on `contentType + slug`
- Status/type/business-unit and published-date indexes

Core fields:

- `businessUnit`
- `contentType`
- `status`
- `title`
- `slug`
- `excerpt`
- `body`
- `coverImage`
- `videoUrl`
- `duration`
- `transcript`
- `vehicleBrand`
- `vehicleModel`
- `serviceTags`
- `mediaJson`
- SEO fields
- author/reviewer placeholders
- publish timestamps

## Admin Routes

Added CMS admin routes:

- `/fa/admin/cms`
- `/fa/admin/cms/articles`
- `/fa/admin/cms/videos`
- `/fa/admin/cms/projects`
- `/fa/admin/cms/feed`

The admin shell includes:

- Content list
- Search
- Type/status/business-unit filters
- Create/edit form
- Draft/published/archived workflow
- SEO fields
- Cover/media path fields
- Persian RTL layout
- Preview link where practical

## Permissions And Access Control

Phase 1 uses a server-side CMS token gate:

- Environment variable: `AUTOMAKHSUS_CMS_ADMIN_TOKEN`
- Admin routes render a locked state when the token is missing or invalid.
- Mutation server actions require a valid token.
- Public pages only query `PUBLISHED` content.
- Direct draft/archived content URLs do not expose CMS records.

This keeps the CMS safe without introducing public accounts or a new authentication surface.

## Public Rendering

Public pages now read published CMS content first, then merge static fallback content:

- `/fa/academy`
- `/fa/academy/[slug]`
- `/fa/videos`
- `/fa/videos/[slug]`
- `/fa/projects`
- `/fa/projects/[slug]`
- `/fa/feed`
- `/fa/feed/[slug]`

Static content was not removed.

## SEO

CMS content supports:

- SEO title
- Meta description
- Canonical path
- Open Graph title/description/image
- Published-only sitemap inclusion
- Structured data where practical through existing page templates

Draft and archived CMS content are excluded from sitemap generation.

## Media

Phase 1 supports approved media and cover image paths through CMS fields.

Full upload management was not added in this phase because the Auto Makhsus app does not yet have its own persistent CMS uploads volume. This avoids touching infrastructure and avoids breaking existing TehranSandali CRM media storage.

Future CMS media work should add:

- Persistent Auto Makhsus media mount
- Upload API
- Media approval workflow
- Image resizing/thumbnail generation
- Alt text and privacy checks

## Validation Results

Passed locally:

- `npx prisma validate`
- `npx prisma generate`
- `npm test`
- `npm run lint`
- `npx tsc --noEmit --pretty false --incremental false`
- `npm run build`

Production deployment:

- Docker/Ansible deploy completed successfully.
- Production image: `automakhsus/automakhsus:20260614154956`
- Container health: `healthy`
- Production Prisma migration deploy completed successfully.
- CMS admin token is present in the production environment file and is not committed to Git.

## Production Verification

Verified through the local Traefik route on `am-app-01`:

- `https://automakhsus.com/fa/admin/cms` -> 200
- `https://automakhsus.com/fa/admin/cms/articles` -> 200
- `https://automakhsus.com/fa/admin/cms/videos` -> 200
- `https://automakhsus.com/fa/admin/cms/projects` -> 200
- `https://automakhsus.com/fa/admin/cms/feed` -> 200
- `https://automakhsus.com/fa/academy` -> 200
- `https://automakhsus.com/fa/videos` -> 200
- `https://automakhsus.com/fa/projects` -> 200
- `https://automakhsus.com/fa/feed` -> 200
- `https://automakhsus.com/api/health` -> 200
- `https://automakhsus.com/sitemap.xml` -> 200

Ecosystem health checks:

- `automakhsus.com` -> 200
- `www.automakhsus.com` -> 200
- `tehransandali.ir` -> 200
- `mrseat.ir` -> 200
- `tehranseat.ir` -> 200
- `tuduzi.com` -> 200
- `ani2203.com` -> 200

## Files Changed

Main source changes:

- `prisma/schema.prisma`
- `prisma.config.ts`
- `prisma/migrations/20260614160000_add_cms_content/migration.sql`
- `src/lib/cms.ts`
- `src/lib/cms-auth.ts`
- `src/app/fa/admin/cms/*`
- `src/app/fa/academy/*`
- `src/app/fa/videos/*`
- `src/app/fa/projects/*`
- `src/app/fa/feed/*`
- `src/app/sitemap.ts`
- `src/app/globals.css`
- `tests/cms.test.mjs`
- `package.json`
- `package-lock.json`

## Remaining Recommendations

- Add first-class staff/session authentication for CMS roles instead of token-only access.
- Add reviewer/publisher workflow with explicit approval records.
- Add persistent Auto Makhsus media uploads.
- Add static-to-CMS import tooling.
- Add CMS coverage for Vehicle Knowledge Base and read-only Community Q&A in a later phase.
- Add editorial quality checks before allowing large-scale publishing.
