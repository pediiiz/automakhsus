# Auto Makhsus CMS Implementation Plan

Date: 2026-06-14
Stage: Architecture and design only
Status: planned, not implemented

## Guiding Rules

- No public posting in first CMS release.
- Additive migrations only.
- Preserve all existing slugs and SEO metadata.
- Preserve static TypeScript content as fallback until CMS migration is proven.
- Enforce business-unit scope server-side.
- Do not commit secrets.
- Do not expose admin CMS publicly without authentication.

## Phase 0: Preparation

Tasks:

- Confirm whether CMS lives inside AutoMakhsus app admin or shared TehranSandali CRM admin shell.
- Confirm shared auth/session strategy.
- Confirm media library endpoint and storage conventions.
- Identify existing CRM business-unit helper APIs that can be reused.
- Freeze current static content slugs and sitemap routes as migration baseline.

Deliverables:

- Final implementation issue list
- Permission matrix
- Migration checklist

## Phase 1: Database Foundation

Add additive tables:

- `ContentItem`
- `ContentSection`
- `ContentSEO`
- `ContentTag`
- `ContentItemTag`
- `ContentMedia`
- `ContentRelation`
- `ContentReview`
- `ContentRevision`
- Type-specific extension tables
- Audit integration or `ContentAuditLog`

Validation:

- Prisma validate/generate
- Migration review
- Unit tests for scope helpers

Rollback:

- Tables are additive and can remain unused if rollout pauses.

## Phase 2: Admin Dashboard and List Views

Build:

- `/fa/admin/content`
- Content type list pages
- Filters by status, business unit, author, reviewer, type, brand/model, service
- Search
- Draft/review/published counters
- SEO issue counters

Permissions:

- Read scoped by business unit.
- No public access.

## Phase 3: Editors

Build editors for:

- Articles
- Videos
- Projects
- Feed posts
- Q&A
- Brand hubs
- Model hubs

Editor capabilities:

- Save draft
- Request review
- Approve/reject
- Publish/unpublish
- Preview
- Attach media
- Add SEO fields
- Add related content
- Add FAQs

## Phase 4: Public Rendering Integration

Update public routes to:

- Load published CMS content first.
- Fall back to static TypeScript content when CMS record is absent.
- Preserve existing route behavior.
- Use CMS metadata/schema when available.
- Keep draft preview authenticated.

Routes:

- `/fa/academy`
- `/fa/academy/[slug]`
- `/fa/videos`
- `/fa/videos/[slug]`
- `/fa/projects`
- `/fa/projects/[slug]`
- `/fa/feed`
- `/fa/feed/[slug]`
- `/fa/community`
- `/fa/community/questions`
- `/fa/community/questions/[slug]`
- `/fa/cars`
- `/fa/cars/[brand]`
- `/fa/cars/[brand]/[model]`

## Phase 5: Static Content Migration

Tasks:

- Build importer from `src/lib/content-data.ts`.
- Import existing content as `source = STATIC_IMPORT`.
- Set status to `PUBLISHED`.
- Preserve `path`, `slug`, dates, metadata, and related links.
- Verify generated public output parity.
- Verify sitemap parity.

Do not delete static content until after production QA.

## Phase 6: Sitemap and Revalidation

Implement:

- Published CMS content included in sitemap.
- Draft/rejected/archived/internal content excluded.
- Sitemap index if content volume grows.
- Revalidation after publish/unpublish/slug changes.

Verification:

- `/sitemap.xml`
- Content-specific routes
- Canonical URLs
- No admin routes indexed

## Phase 7: Workflow, Notifications, and Audit

Add:

- Review assignment
- Review comments
- Notification events
- Audit logs
- Revision restore
- Soft delete

No external provider integration in this phase.

## Phase 8: QA and Production Rollout

QA checklist:

- Admin content dashboard loads.
- Role permissions enforced.
- Business-unit scoping enforced.
- Drafts are not public.
- Published content appears public.
- Sitemap includes only published content.
- Static fallback still works.
- Media URLs work.
- Preview requires authentication.
- SEO metadata correct.
- No public posting enabled.

Validation:

- Prisma validate/generate
- Unit tests
- Permission tests
- Lint
- TypeScript
- Build
- Docker build
- Ansible deploy
- Route verification

## Phase 9: Future Enhancements

Planned later:

- Search Console integration
- AI draft suggestions
- AI internal-link suggestions
- Editorial calendar
- Content quality scoring
- Public community posting with moderation
- Content analytics dashboard
- Content-to-lead attribution reports
- Multi-site content syndication to TehranSandali, Tuduzi, ANI2203 where appropriate

## Risk Level

Overall risk: Medium.

Risk drivers:

- SEO impact from slug/canonical mistakes
- Permission/business-unit leakage
- Draft indexing
- Public exposure of private project media
- Migration parity from static content

Mitigations:

- CMS-first fallback design
- Additive migrations
- No public posting initially
- Strong server-side permission checks
- Privacy review for project showcase
- Sitemap/indexing validation before deployment
