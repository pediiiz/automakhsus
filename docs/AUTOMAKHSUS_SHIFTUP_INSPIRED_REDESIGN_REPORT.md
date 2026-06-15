# Auto Makhsus ShiftUp-Inspired Redesign Report

Date: 2026-06-15

## Scope

Redesigned AutoMakhsus.com visual style using ShiftUp as a high-level automotive reference only. No ShiftUp assets, images, code, or text were copied.

Scope covered:

- Homepage
- Header and grouped mega menu
- Mobile drawer
- Footer
- Shared cards and CTA styling
- `/fa/cars`
- `/fa/store`
- `/fa/academy`
- `/fa/videos`
- `/fa/projects`
- `/fa/feed`
- `/fa/community`

## Changes Applied

- Strengthened the header with a bolder automotive navigation treatment, grouped mega menu, visible store/service paths, and stronger CTAs.
- Added homepage technical specification panels for service coverage, vehicle knowledge coverage, and CRM-backed request handling.
- Added a new “What We Do” section with large numbered feature blocks.
- Added a service/shop promotion block that connects parts inquiry, buy + install, project creation, warranty, and Vehicle Digital Passport strategy.
- Added a support/contact block for consultation, service booking, parts inquiry, and cooperation requests.
- Sharpened card geometry and visual hierarchy to feel more automotive and technical.
- Improved dark/light contrast sections across shared public surfaces.
- Upgraded store visual treatment so `/fa/store` feels more like a real parts/catalog foundation.
- Rebuilt the footer into a stronger support-center layout with service links, brand links, contact/social actions, and primary CTAs.
- Preserved Persian RTL, Auto Makhsus blue/navy identity, SEO, sitemap, CMS behavior, lead routing, and business-unit routing.

## Files Changed

- `src/app/fa/page.tsx`
- `src/app/globals.css`
- `src/components/seo-page.tsx`
- `src/components/site-shell.tsx`

## Validation Results

- `npm test`: passed
- `npm run lint`: passed
- `npx tsc --noEmit --pretty false --incremental false`: passed
- `npm run build`: passed
- Docker/Ansible deploy: passed

Production image:

- `automakhsus/automakhsus:20260615052340`

Container health:

- `automakhsus`: healthy

## Production Verification

Verified through the app host:

- `https://automakhsus.com/fa`: 200
- `https://www.automakhsus.com/fa`: 200
- `https://automakhsus.com/fa/cars`: 200
- `https://automakhsus.com/fa/store`: 200
- `https://automakhsus.com/fa/academy`: 200
- `https://automakhsus.com/fa/videos`: 200
- `https://automakhsus.com/fa/projects`: 200
- `https://automakhsus.com/fa/feed`: 200
- `https://automakhsus.com/fa/community`: 200
- `https://automakhsus.com/api/health`: 200
- `https://automakhsus.com/sitemap.xml`: 200
- `https://automakhsus.com/robots.txt`: 200

Ecosystem health checks:

- `https://tehransandali.ir/api/health`: 200
- `https://mrseat.ir/api/health`: 200
- `https://tehranseat.ir/api/health`: 200
- `https://tuduzi.com/api/health`: 200
- `https://ani2203.com/api/health`: 200

## Remaining Recommendations

- Run screenshot-based design QA on desktop, tablet, and mobile to tune spacing after real visual inspection.
- Add approved internal or licensed automotive service imagery later; no unlicensed external assets were introduced in this phase.
- Continue migrating static fallback content into CMS-managed editorial content while preserving current URLs and sitemap behavior.
