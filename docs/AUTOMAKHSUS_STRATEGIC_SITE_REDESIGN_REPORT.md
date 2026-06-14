# Auto Makhsus Strategic Site Redesign Report

Date: 2026-06-14

## Objective

Update `automakhsus.com` from a simple parent-brand website into the canonical Auto Makhsus technical and commerce hub for foreign/imported cars.

Knowledge Base source of truth used:

- `/opt/automakhsus/knowledge-base/MASTER_DECISIONS.md`
- `/opt/automakhsus/knowledge-base/CURRENT_ARCHITECTURE.md`
- `/opt/automakhsus/knowledge-base/CURRENT_SYSTEM_OVERVIEW.md`
- `/opt/automakhsus/knowledge-base/CURRENT_ROADMAP.md`
- `/opt/automakhsus/knowledge-base/AutoMakhsus.md`
- `/opt/automakhsus/knowledge-base/AUTOMAKHSUS_TECHNICAL_SERVICE_SCOPE.md`
- `/opt/automakhsus/knowledge-base/AUTOMAKHSUS_MARKETPLACE.md`
- `/opt/automakhsus/knowledge-base/STRATEGIC_FEATURE_BACKLOG.md`

## Canonical Brand Structure Applied

Parent-level Auto Makhsus brands now shown:

- TehranSandali
- ANI2203
- Tuduzi

MrSeat and TehranSeat are no longer shown as parent-level Auto Makhsus brands. They are documented and displayed only as TehranSandali sub-brands.

## Positioning Changes

New positioning:

`Auto Makhsus = مرکز تخصصی خودروهای خارجی، خدمات فنی، فروشگاه قطعات و پلتفرم دیجیتال خودرو`

The homepage now emphasizes:

- foreign/imported car technical services
- diagnostics
- electrical/electronics
- options and upgrades
- detailing
- bodywork and paint
- pre-purchase inspection
- parts marketplace
- buy + install workflows
- Vehicle Digital Passport and CRM-backed operations

## Content And UX Changes

- Rebuilt homepage hero around `مرکز تخصصی خودروهای خارجی`.
- Added technical services section with 12 service areas.
- Added imported/foreign car brand coverage section.
- Added marketplace/store section for parts, materials, equipment, OEM, aftermarket, used, and special-order categories.
- Updated ecosystem map to show Auto Makhsus as technical + commerce + CRM hub.
- Updated brand cards to show only TehranSandali, ANI2203, and Tuduzi.
- Added TehranSandali sub-brand note for MrSeat and TehranSeat.
- Updated service pillars, trust section, digital platform section, shell navigation, footer, and mobile CTA.
- Preserved existing blue/navy/electric blue visual system and lightweight infographic style.

## CRM Lead Integration

Lead form behavior remains server-side and CRM-backed:

- `source = automakhsus`
- `sourcePath = automakhsus`
- `sourcePage = current page`
- `businessUnit = AutoMakhsus Technical` or `AutoMakhsus Marketplace` in conversion metadata and inquiry message context

Business unit is inferred server-side from the submitted interest so the workflow does not depend on trusted client input.

## SEO Changes

- Updated homepage title, description, canonical, and Open Graph metadata.
- Updated root title default.
- Updated brands, services, ecosystem, about, and contact metadata.
- Updated Organization schema to include only the three canonical parent-level brands.
- Added Service structured data with an OfferCatalog covering technical services and marketplace categories.
- Sitemap now generates only the three parent-level brand pages:
  - `/fa/brands/tehransandali`
  - `/fa/brands/tuduzi`
  - `/fa/brands/ani2203`

## Files Changed

- `README.md`
- `src/app/api/leads/route.ts`
- `src/app/fa/page.tsx`
- `src/app/fa/services/page.tsx`
- `src/app/fa/brands/page.tsx`
- `src/app/fa/brands/[slug]/page.tsx`
- `src/app/fa/ecosystem/page.tsx`
- `src/app/fa/about/page.tsx`
- `src/app/fa/contact/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/lead-form.tsx`
- `src/components/seo-page.tsx`
- `src/components/site-shell.tsx`
- `src/lib/seo.ts`
- `src/lib/site-data.ts`
- `docs/AUTOMAKHSUS_STRATEGIC_SITE_REDESIGN_REPORT.md`

## Validation Results

- `npm run lint`: passed
- `npx tsc --noEmit --pretty false --incremental false`: passed
- `npm run build`: passed
- Docker build/deploy via Ansible: passed

Deployment:

- Release: `20260614093034`
- Image: `automakhsus/automakhsus:20260614093034`
- Container health: `healthy`

Production checks:

- `https://automakhsus.com`: 200
- `https://www.automakhsus.com`: 200
- `https://automakhsus.com/api/health`: 200
- `https://automakhsus.com/sitemap.xml`: 200
- `https://automakhsus.com/robots.txt`: 200
- Lead API test through production route: 200

Ecosystem health checks:

- `tehransandali.ir/api/health`: 200
- `mrseat.ir/api/health`: 200
- `tehranseat.ir/api/health`: 200
- `tuduzi.com/api/health`: 200
- `ani2203.com/api/health`: 200

## Infrastructure Safety

No DNS, NAT, firewall, PostgreSQL container config, Redis container config, or unrelated website changes were made.

The existing deployment playbook preserved the stable Traefik service target:

- `automakhsus.com`, `www.automakhsus.com` -> `http://automakhsus:3000`

## Remaining Recommendations

- Add dedicated marketplace/product routes only after inventory and commerce workflow scope is approved.
- Add service-specific SEO pages for diagnostics, electrical/electronics, gearbox, detailing, PPF, ceramic, bodywork, paint, and inspection.
- Add brand/model service hubs for imported car SEO after content strategy review.
- Connect future marketplace orders to CRM invoice, inventory reservation, work order, and Vehicle Digital Passport.
