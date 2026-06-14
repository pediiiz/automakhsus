# Auto Makhsus CMS Migration Fix Report

Date: 2026-06-14

## Summary

The Auto Makhsus CMS production migration path was fixed and deployed.

The previous production state had live CMS routes, but the `ContentItem` table did not exist in the shared production database. This blocked real CMS create/edit/archive/publish workflows.

The deployment path now runs `prisma migrate deploy` inside a temporary `node:22` container attached to the internal backend Docker network, using the production Auto Makhsus environment file without exposing secrets. Future Auto Makhsus deployments now fail if migrations are pending or if the CMS table is missing.

## Root Cause

The Auto Makhsus deployment previously did not have a reliable host-side Prisma migration path.

During QA:

- `ContentItem` migration file existed in source and deployed release.
- Production app used the shared CRM database.
- `ContentItem` did not exist in the shared database.
- Host-side migration execution failed because `npx` was not available on `am-app-01` outside containers.

## Fix Applied

Updated infra deploy playbook:

- `ansible/playbooks/deploy-automakhsus.yml`

New deploy behavior:

1. Validate backend Docker network exists.
2. Run Auto Makhsus Prisma migrations in a temporary `node:22` container:
   - mounts the release directory to `/app`
   - uses `/opt/docker/automakhsus/.env`
   - attaches to `automakhsus-backend`
3. Run `prisma migrate status` through the same containerized path.
4. Verify `public."ContentItem"` exists through a Node/PostgreSQL guard.
5. Continue Docker build/deploy only after those checks pass.

Also updated:

- `src/app/sitemap.ts`

`sitemap.xml` is now dynamic so newly published CMS content can appear in the sitemap and archived/draft content remains excluded.

## Migration Verification

Production database:

- Database: shared CRM database `tehransandali`
- CMS table: `public."ContentItem"`
- Migration: `20260614160000_add_cms_content`

Verified:

- `ContentItem` exists.
- `_prisma_migrations` contains `20260614160000_add_cms_content`.
- `prisma migrate status` reports the database schema is up to date.

## Deployment

Final deployed release:

- Release: `20260614164829`
- Image: `automakhsus/automakhsus:20260614164829`
- Container health: `healthy`

Deployment checks passed:

- Auto Makhsus homepage HTTPS
- Auto Makhsus www HTTPS
- Cooperation page
- `sitemap.xml`
- `robots.txt`
- Auto Makhsus lead API
- TehranSandali health
- MrSeat health
- TehranSeat health
- Tuduzi health
- ANI2203 health

## Temporary CMS QA Content Flow

Temporary QA slug:

- `qa-cms-migration-fix-20260614`

Flow verified:

1. Created temporary `DRAFT` Academy CMS item.
2. Draft detail URL returned `404`.
3. Draft was absent from `sitemap.xml`.
4. Published the item.
5. Published detail URL returned `200`.
6. Published item appeared on `/fa/academy`.
7. Published item appeared once in `sitemap.xml`.
8. Archived the item.
9. Archived detail URL returned `404`.
10. Archived item was absent from `sitemap.xml`.
11. Deleted the temporary QA row.
12. Confirmed zero remaining rows for the QA slug.

## CMS Token Verification

Verified without exposing the token:

- `/fa/admin/cms` with valid production token returned `200`.
- Editor UI was visible.

No CMS token was printed or committed.

## Validation Results

Passed:

- `npx prisma validate`
- `npx prisma generate`
- `npm test`
- `npm run lint`
- `npx tsc --noEmit --pretty false --incremental false`
- `npm run build`
- Ansible playbook syntax check
- Ansible/Docker deploy
- Containerized `prisma migrate deploy`
- Containerized `prisma migrate status`
- CMS table guard
- `/api/health` checks
- All six ecosystem health checks

## Files Changed

Source:

- `src/app/sitemap.ts`
- `docs/AUTOMAKHSUS_CMS_MIGRATION_FIX_REPORT.md`

Infra:

- `ansible/playbooks/deploy-automakhsus.yml`

Knowledge Base:

- `PROJECT_STATE_2026.md`
- `CURRENT_ROADMAP.md`
- `AutoMakhsus.md`
- `SEO.md`
- `IMPLEMENTATION_HISTORY.md`
- `DECISION_LOG.md`

## Remaining Recommendations

- Replace URL-query CMS token with secure authenticated session/cookie.
- Add proper CMS roles and business-unit scoped admin access.
- Add formal CMS audit logs.
- Add true soft-delete/restore UI.
- Add media library upload/select integration.
- Add automated end-to-end CMS workflow test in CI or deployment validation.
