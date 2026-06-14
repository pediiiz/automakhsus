# Auto Makhsus Global Design System Upgrade Report

Date: 2026-06-14

## Scope

Upgraded the global visual system for `automakhsus.com` only, with priority on the header, navigation, homepage hero, and shared site surfaces.

## Changes Applied

- Replaced the crowded top navigation with a premium sticky glass header.
- Added grouped desktop navigation:
  - خدمات خودرو
  - دانش و محتوا
  - فروشگاه
  - برندها
- Added desktop mega menu panels with graphical feature areas, descriptions, featured CTAs, and organized links.
- Added secondary quick access links for:
  - دانشنامه خودرو
  - فروشگاه
  - آکادمی
  - نمونه‌کارها
- Added primary header CTAs:
  - رزرو سرویس
  - استعلام قطعه
- Added mobile drawer navigation with grouped sections and prominent service/parts/contact/WhatsApp CTAs.
- Added Escape/outside-click/mobile navigation close behavior.
- Preserved canonical brand strategy:
  - TehranSandali, ANI2203, and Tuduzi are top-level brands.
  - MrSeat and TehranSeat remain sub-brands under TehranSandali.
- Updated the homepage hero CTA hierarchy to emphasize:
  - رزرو سرویس
  - استعلام قطعه
  - ورود به دانشنامه خودرو
- Added matching service anchors for deep navigation from the mega menu.
- Added global CSS for dark navy/electric-blue glass, metallic surfaces, mega menu cards, mobile drawer, hover states, and reduced-motion support.

## Performance Notes

- No heavy image backgrounds were added.
- No new animation library or icon dependency was added.
- Motion remains CSS-only and is disabled through `prefers-reduced-motion`.
- Existing URLs, sitemap, robots, metadata, lead routing, and business-unit routing were preserved.

## Files Changed

- `src/components/premium-header.tsx`
- `src/components/site-shell.tsx`
- `src/components/seo-page.tsx`
- `src/app/globals.css`

## Validation

- `npm test`: passed
- `npm run lint`: passed
- `npx tsc --noEmit --pretty false --incremental false`: passed
- `npm run build`: passed
- Docker/Ansible deploy: passed
- Production container health: healthy

## Production Verification

Verified through the existing Traefik route on `am-app-01`:

- `https://automakhsus.com/`: 200
- `https://automakhsus.com/fa`: 200
- `https://automakhsus.com/fa/cars`: 200
- `https://automakhsus.com/fa/academy`: 200
- `https://automakhsus.com/fa/videos`: 200
- `https://automakhsus.com/fa/projects`: 200
- `https://automakhsus.com/fa/feed`: 200
- `https://automakhsus.com/fa/community`: 200
- `https://automakhsus.com/api/health`: 200
- `https://automakhsus.com/sitemap.xml`: 200
- `https://automakhsus.com/robots.txt`: 200

Ecosystem checks:

- `https://tehransandali.ir/api/health`: 200
- `https://mrseat.ir/api/health`: 200
- `https://tehranseat.ir/api/health`: 200
- `https://tuduzi.com/api/health`: 200
- `https://ani2203.com/api/health`: 200

## Remaining Recommendations

- Add visual QA screenshots across desktop, tablet, and mobile after the next design iteration.
- Consider replacing the typographic AM mark with an official Auto Makhsus logo asset when approved.
- Add analytics or internal event tracking for mega-menu CTAs in a later phase.
