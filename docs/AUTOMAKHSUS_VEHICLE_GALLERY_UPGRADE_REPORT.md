# Auto Makhsus Vehicle Gallery Upgrade Report

Date: 2026-06-14

## Scope

Upgraded the Auto Makhsus Cars / Vehicle Knowledge Base experience on `automakhsus.com` only.

## Changes Applied

- Redesigned `/fa/cars` as a premium dark/navy automotive gallery.
- Added lightweight client-side brand search and regional/category filters.
- Added featured brand section and all-brand gallery cards.
- Added model and generation counts to brand cards.
- Added legal-safe brand mark metadata to vehicle data.
- Used internal typographic placeholder brand marks instead of unlicensed manufacturer logos.
- Enhanced brand detail pages with:
  - premium brand hero
  - typographic brand mark
  - origin country
  - category
  - model and generation totals
  - visual model grid
- Enhanced model and generation pages with:
  - premium vehicle hero
  - generation timeline
  - richer generation cards
  - service, parts, academy, video, project and lead CTA links
- Added breadcrumb structured data to brand/model/generation pages.
- Fixed duplicated title suffixes in vehicle page metadata.
- Preserved canonical, Open Graph, sitemap, robots, lead CTAs and existing site routing.

## Legal Asset Policy

No external manufacturer logos or copyrighted vehicle images were scraped or embedded.

Current brand marks use:

- Source: Auto Makhsus generated typographic brand mark
- License note: Internal typographic placeholder, not official manufacturer logo
- Usage status: `typographic-placeholder`

Official/licensed logos can later be added under `public/brand/cars/` with source, license and attribution metadata.

## Files Changed

- `src/lib/content-data.ts`
- `src/components/content/vehicle-gallery.tsx`
- `src/components/content/content-sections.tsx`
- `src/app/fa/cars/page.tsx`
- `src/app/fa/cars/[brand]/page.tsx`
- `src/app/fa/cars/[brand]/[model]/page.tsx`
- `src/app/fa/cars/[brand]/[model]/[generation]/page.tsx`
- `src/app/globals.css`

## Validation

- `npm test`: passed
- `npm run lint`: passed
- `npx tsc --noEmit --pretty false --incremental false`: passed
- `npm run build`: passed
- Docker build/deploy: passed through Ansible on `am-app-01`
- Prisma migration guard: passed, no new migration required

## Production Verification

Verified via existing Traefik route on `am-app-01`:

- `https://automakhsus.com/fa/cars`: 200
- `https://automakhsus.com/fa/cars/bmw`: 200
- `https://automakhsus.com/fa/cars/mercedes-benz`: 200
- `https://automakhsus.com/fa/cars/toyota`: 200
- `https://automakhsus.com/fa/cars/bmw/x5`: 200
- `https://automakhsus.com/fa/cars/bmw/x5/g05`: 200
- `https://automakhsus.com/sitemap.xml`: 200
- `https://automakhsus.com/api/health`: 200

Ecosystem health checks:

- `https://tehransandali.ir/api/health`: 200
- `https://mrseat.ir/api/health`: 200
- `https://tehranseat.ir/api/health`: 200
- `https://tuduzi.com/api/health`: 200
- `https://ani2203.com/api/health`: 200

## Remaining Recommendations

- Add licensed official brand logos only after clear usage rights are confirmed.
- Add unique editorial copy for the highest commercial vehicle model pages to reduce remaining repetitive-content risk.
- Add model-specific Open Graph images when licensed/internal image assets are available.
- Add Persian-localized generation labels for older generic imported generation names where useful.
