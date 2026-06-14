# Auto Makhsus Full Site And Store Upgrade Report

Date: 2026-06-14

## Scope

Upgraded `automakhsus.com` only. No DNS, Traefik, PostgreSQL container, Redis container, or unrelated website configuration was changed.

## Audit Summary

- Homepage already matched the canonical strategy but store CTAs pointed to the ecosystem preview instead of a real catalog route.
- Academy, videos, projects, feed, community, and vehicle knowledge base existed, but static fallback coverage was thin in several sections.
- Marketplace existed only as a preview section; there were no dedicated store category or product routes.
- Sitemap did not include store category/product URLs because those routes did not exist.
- CMS-first rendering for Academy, Videos, Projects, and Feed was preserved.

## Fixes Applied

- Added first production-safe store/catalog foundation:
  - `/fa/store`
  - `/fa/store/categories`
  - `/fa/store/categories/[slug]`
  - `/fa/store/products/[slug]`
- Added structured static store catalog data for:
  - 11 store categories
  - 11 sample products
  - product compatibility, stock status, price placeholder, technical description, install option, and CTAs
- Expanded static fallback content to provide at least 10 real-looking items for:
  - Academy articles
  - Video entries
  - Project showcase entries
  - Feed posts
  - Community/Q&A pages
- Preserved and strengthened existing vehicle knowledge base:
  - 19 brand pages
  - 10 model pages
- Updated navigation and content discovery to link to the real store route.
- Added store routes to sitemap generation.
- Added store/product metadata, canonical paths, breadcrumbs, Product schema, and CRM lead CTAs.
- Updated marketplace cards to route into category pages.
- Kept top-level brands canonical: TehranSandali, ANI2203, Tuduzi. MrSeat and TehranSeat remain only under TehranSandali.

## CRM Lead Integration

All store and service CTAs continue to submit through `/api/leads` with:

- `source = automakhsus`
- `businessUnit = AutoMakhsus Technical` for service-oriented requests
- `businessUnit = AutoMakhsus Marketplace` for parts/store/purchase interests

The production deployment playbook verified the lead endpoint returned `200`.

## Files Changed

- `src/lib/content-data.ts`
- `src/lib/site-data.ts`
- `src/lib/store-data.ts`
- `src/components/site-shell.tsx`
- `src/components/seo-page.tsx`
- `src/components/store/store-sections.tsx`
- `src/app/fa/store/page.tsx`
- `src/app/fa/store/categories/page.tsx`
- `src/app/fa/store/categories/[slug]/page.tsx`
- `src/app/fa/store/products/[slug]/page.tsx`
- `src/app/sitemap.ts`
- `src/app/globals.css`

## Validation Results

- `npm test`: passed, 8 tests
- `npm run lint`: passed
- `npx tsc --noEmit --pretty false --incremental false`: passed
- `npm run build`: passed
- Production build generated 129 routes, including the new store routes.

## Deployment Result

Deployment method: existing Ansible playbook.

- Playbook: `/opt/automakhsus/infra/ansible/playbooks/deploy-automakhsus.yml`
- Release: `20260614173758`
- Image: `automakhsus/automakhsus:20260614173758`
- Container health: `healthy`
- Auto Makhsus homepage status through Traefik: `200`
- Auto Makhsus www status through Traefik: `200`
- Sitemap and robots: `200`
- Lead API: `200`

## Route Verification

Verified through Traefik on `am-app-01` using local `--resolve` checks:

- `https://automakhsus.com/`: `200`
- `https://www.automakhsus.com/`: `200`
- `https://automakhsus.com/fa/academy`: `200`
- `https://automakhsus.com/fa/videos`: `200`
- `https://automakhsus.com/fa/projects`: `200`
- `https://automakhsus.com/fa/feed`: `200`
- `https://automakhsus.com/fa/community`: `200`
- `https://automakhsus.com/fa/cars`: `200`
- `https://automakhsus.com/fa/store`: `200`
- `https://automakhsus.com/fa/store/categories`: `200`
- `https://automakhsus.com/fa/store/products/oem-oil-filter-bmw-benz`: `200`
- `https://automakhsus.com/api/health`: `200`
- `https://automakhsus.com/sitemap.xml`: `200`
- `https://automakhsus.com/robots.txt`: `200`

Other ecosystem health checks:

- `https://tehransandali.ir/api/health`: `200`
- `https://mrseat.ir/api/health`: `200`
- `https://tehranseat.ir/api/health`: `200`
- `https://tuduzi.com/api/health`: `200`
- `https://ani2203.com/api/health`: `200`

## Remaining Recommendations

- Move store catalog from static TypeScript data into CMS/Content Manager in a future phase.
- Add real product media and supplier/vendor workflow after marketplace data model approval.
- Add store search, filtering, and inquiry tracking once catalog grows beyond the seed foundation.
- Continue replacing static content with reviewed CMS content while preserving current slugs and metadata.
