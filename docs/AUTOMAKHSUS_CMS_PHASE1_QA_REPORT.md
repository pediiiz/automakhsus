# Auto Makhsus CMS Phase 1 QA Report

Date: 2026-06-14

Scope: production audit only. No code changes, migrations, deployment, DNS, Traefik, PostgreSQL/Redis container configuration, or feature implementation were performed during this audit.

## Executive Summary

Auto Makhsus CMS Phase 1 routes are deployed and reachable, and the admin token gate is present. Public content routes continue to work through static fallback.

However, the CMS is not operational for real content management in production because the `ContentItem` table is not present in the shared CRM database. This means create/edit/archive/publish operations will fail until the migration execution path is fixed and verified.

## Production Route Checks

Verified through Traefik on `am-app-01`:

| Route | Status |
|---|---:|
| `/fa/admin/cms` | 200 |
| `/fa/admin/cms/articles` | 200 |
| `/fa/admin/cms/videos` | 200 |
| `/fa/admin/cms/projects` | 200 |
| `/fa/admin/cms/feed` | 200 |
| `/fa/academy` | 200 |
| `/fa/videos` | 200 |
| `/fa/projects` | 200 |
| `/fa/feed` | 200 |
| `/sitemap.xml` | 200 |
| `/api/health` | 200 |

Admin token gate behavior:

| Request | Status | Result |
|---|---:|---|
| No token | 200 | Locked screen |
| Invalid token | 200 | Locked screen |
| Valid token | 200 | Editor visible |

## Findings

## Critical

### 1. CMS migration/table is missing in production database

Evidence:

- The production app uses the shared `tehransandali` CRM database from `/opt/docker/automakhsus/.env`.
- The CMS migration file exists in the deployed release:
  - `/opt/apps/automakhsus/releases/20260614154956/prisma/migrations/20260614160000_add_cms_content/migration.sql`
- PostgreSQL query against the shared database returned:
  - `ERROR: relation "ContentItem" does not exist`
- `_prisma_migrations` in `tehransandali` contains prior CRM migrations but not `20260614160000_add_cms_content`.

Impact:

- Create/edit/archive/publish behavior is not functional in production.
- Business-unit persistence for CMS content cannot occur.
- Published CMS content cannot be created or rendered from DB.
- Sitemap cannot include CMS content because no CMS records/table exist.

Recommended fix:

- Correct the deployment/migration execution command for Auto Makhsus.
- Run `npx prisma migrate deploy` from the release directory with the real `DATABASE_URL`.
- Verify `_prisma_migrations` contains `20260614160000_add_cms_content`.
- Verify `ContentItem` exists before marking CMS content operations complete.

## High

### 2. Admin token is passed in URL query string

Evidence:

- Admin routes use `?token=...`.
- Navigation links and forms preserve the token through query strings and hidden fields.

Impact:

- The token can leak through browser history, screenshots, reverse proxy logs, app logs, analytics/referrers, or copied URLs.
- Since the token is the only CMS authentication mechanism, this is a sensitive design risk.

Recommended fix:

- Replace query-token access with a secure HTTP-only cookie or proper authenticated admin session.
- Add short session expiry and rotation.
- Avoid logging token-bearing URLs.

### 3. Business-unit scoping is metadata-only in Phase 1 admin UI

Evidence:

- `ContentItem.businessUnit` exists in schema and form fields.
- The token-gated CMS admin lists all content with `includeDrafts: true`.
- There is no staff/session identity, role, or allowed business-unit filter in CMS admin loaders.

Impact:

- Once content exists, any valid CMS token holder can view/manage content for all business units.
- This does not yet match the shared CRM business-unit isolation standard.

Recommended fix:

- Add real staff/session authentication.
- Scope CMS content list and mutations by allowed business units.
- Keep `SUPER_ADMIN` / `MANAGER` global access explicit.

### 4. No true delete or soft-delete UI exists

Evidence:

- Admin UI supports status transitions: `DRAFT`, `PUBLISHED`, `ARCHIVED`.
- `deletedAt` exists in the schema, but no delete/restore action is exposed.

Impact:

- Content cleanup is incomplete.
- Accidental content cannot be soft-deleted through the UI.

Recommended fix:

- Add soft-delete and restore actions with confirmation.
- Restrict delete/restore to elevated CMS roles.

### 5. Media upload/select is not implemented

Evidence:

- Editor exposes text fields for `coverImage`, `ogImage`, and media-related paths.
- No upload picker, media browser, validation, thumbnailing, or persistent Auto Makhsus media mount exists.

Impact:

- Editors must manually paste paths.
- Invalid or private paths can be entered.
- Media governance and privacy review are not enforceable from the UI.

Recommended fix:

- Add media library integration after persistent Auto Makhsus upload storage is defined.
- Validate paths and file types.
- Add alt text, privacy checks, thumbnails, and approval state.

## Medium

### 6. Locked admin routes return HTTP 200 instead of 401/403

Evidence:

- No token and invalid-token requests return HTTP 200 with a locked screen.

Impact:

- Availability checks pass even when unauthorized.
- Automated security scans may not distinguish locked vs authorized access.

Recommended fix:

- Return 401/403 for unauthorized direct access, or keep 200 only if intentionally using a soft lock page and document the behavior.

### 7. Public draft/archive behavior is code-correct but not end-to-end verified

Evidence:

- Public loaders use `getPublishedCmsContentBySlug` and `listCmsContent()` defaults to `status = PUBLISHED`.
- Because `ContentItem` is missing, no real draft/archive records exist to test against production.

Impact:

- Code path looks correct, but production verification is blocked by missing migration.

Recommended fix:

- After migration fix, create temporary test records for `DRAFT`, `ARCHIVED`, and `PUBLISHED`, verify public visibility/sitemap behavior, then clean them up.

### 8. SEO metadata for CMS content is basic and depends on row-to-card mapping

Evidence:

- Detail pages map CMS rows to existing content templates.
- Metadata uses the mapped item title/description/path/image.
- The mapping currently favors `excerpt`/`metaDescription` but does not fully use all SEO-specific fields in every template path.

Impact:

- SEO works at a basic level but may not fully honor custom CMS SEO fields.

Recommended fix:

- Ensure `seoTitle`, `metaDescription`, `canonicalPath`, `ogTitle`, `ogDescription`, and `ogImage` are used explicitly in metadata generation.

### 9. Static fallback can mask CMS database failures

Evidence:

- `listCmsContent` and `getPublishedCmsContentBySlug` catch DB/table errors and silently return fallback data in production.
- Public routes stay healthy even when `ContentItem` is missing.

Impact:

- Production monitoring may report healthy pages while CMS-backed publishing is broken.

Recommended fix:

- Add an internal CMS health check that verifies table existence and migration state.
- Surface CMS DB failures in admin routes while keeping public fallback safe.

### 10. Admin UX is functional but not yet polished for mobile editorial use

Evidence:

- UI uses responsive grids, but no dedicated mobile admin navigation pattern or editor assistance was observed.
- Long forms are usable but dense.

Impact:

- Mobile content editing may be cumbersome.

Recommended fix:

- Add grouped editor tabs/sections, sticky save controls, and mobile preview.

## Low

### 11. No CMS audit log

Evidence:

- Save/status actions do not write CMS audit records.

Impact:

- Editorial changes are not traceable beyond database timestamps and Git/deploy history.

Recommended fix:

- Add CMS audit records for create/edit/publish/archive/delete.

### 12. No duplicate-slug warning before save

Evidence:

- `ON CONFLICT (contentType, slug)` updates existing content.
- The UI states this behavior but does not warn before overwriting.

Impact:

- Editors may unintentionally overwrite existing content by reusing a slug.

Recommended fix:

- Add duplicate slug detection and explicit update confirmation.

## Positive Findings

- Admin routes are noindexed.
- Invalid or missing token does not expose the editor.
- Deploy playbook preserves/generates `AUTOMAKHSUS_CMS_ADMIN_TOKEN` server-side with `no_log`.
- No actual CMS admin token was found committed to the Auto Makhsus source repository.
- Public routes remain healthy because static fallback is preserved.
- Sitemap route returns 200.
- `/api/health` returns 200.

## Secret Scan Notes

Source repository scan found only placeholder database URL examples such as:

- `postgresql://placeholder:placeholder@localhost:5432/placeholder?schema=public`

Infra repository scan contains templated Ansible variable references and placeholder examples, not committed live secret values. Existing unrelated untracked `.codex/` remains in the infra repo and was not touched.

## Recommended Fix Order

1. Fix Auto Makhsus migration execution and verify `ContentItem` exists.
2. Replace URL query token auth with a secure admin session or HTTP-only cookie.
3. Add real CMS role/business-unit scoping.
4. Add post-migration end-to-end tests for draft/archive/published/sitemap behavior.
5. Add soft delete/restore and CMS audit logging.
6. Add media library integration and validation.
7. Improve SEO field usage and mobile editor UX.

## Final Assessment

CMS Phase 1 is deployed as a route/UI foundation, but it should not be considered production-complete for editorial operations until the missing migration/table issue is fixed and a real end-to-end content workflow is verified.
