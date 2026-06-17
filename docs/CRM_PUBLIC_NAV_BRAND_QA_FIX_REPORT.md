# CRM Public Navigation And Brand QA Fix Report

Date: 2026-06-17

## Scope

- AutoMakhsus public site, header, mega menu, mobile navigation, and `/crm` entry.
- TehranSandali public site and `/crm` entry.
- Shared TehranSandali / Auto Makhsus CRM login and brand-context handling.

No DNS, Traefik, PostgreSQL, Redis, real staff users, or production secrets were changed.

## Issues Found And Fixed

### 1. AutoMakhsus mega menu closed too quickly

**Finding:** The desktop mega menu could close while moving the pointer from the nav trigger into the dropdown panel.

**Fix:** Added delayed close handling, explicit trigger/panel enter handling, cleanup of pending timers, and a CSS hover bridge above the mega menu panel.

**Files:**

- `src/components/premium-header.tsx`
- `src/app/globals.css`
- `tests/platform-upgrade.test.mjs`

### 2. AutoMakhsus CRM entry needed regression coverage

**Finding:** `/crm` was domain-preserving after the previous CRM proxy work, but the behavior needed real-browser verification and tests to guard against redirects back to TehranSandali.

**Fix:** Added regression coverage for domain-local CRM proxy rewriting and verified `/crm` in Playwright at 390px, 768px, and 1366px.

### 3. Wrong-brand restricted-login copy could appear in shared CRM login helper

**Finding:** The login helper card used hardcoded TehranSandali-oriented restricted-access copy in some CRM entry contexts.

**Fix:** Made restricted-access title/description derive from the detected CRM login brand.

**Files:**

- `src/app/[locale]/admin/login/page.tsx` in TehranSandali/shared CRM

### 4. Shared CRM global theme fallback was TehranSandali-primary

**Finding:** When no active business unit was resolved, the CRM shell theme fallback could resolve to TehranSandali.

**Fix:** Changed the global/no-active-BU fallback to AutoMakhsus, keeping TehranSandali only for explicit `TEHRANSANDALI` context.

**Files:**

- `src/lib/crm-staff-entry.ts`
- `src/lib/crm-phase8-auth.test.ts`

### 5. TehranSandali CRM login inherited public site chrome

**Finding:** Real-browser QA showed `tehransandali.ir/crm` rendering the public header/footer around the CRM login screen.

**Fix:** Marked public shell components with `data-public-shell` and made the admin login page suppress inherited public shell chrome when rendered.

**Files:**

- `src/components/layout/site-header.tsx`
- `src/components/layout/site-footer.tsx`
- `src/components/ui/global-public-mobile-cta.tsx`
- `src/app/[locale]/admin/login/page.tsx`

### 6. TehranSandali public header had no direct staff CRM entry

**Finding:** The public link audit covered a CRM login button for TehranSandali, but the header only exposed the customer portal and public CTAs.

**Fix:** Added a domain-local `/crm` staff entry link to the desktop header and mobile drawer. This does not change the customer portal.

**Files:**

- `src/components/layout/site-header.tsx`

## Real-Browser QA

Tooling: Playwright Core with local Chrome, host-resolved to production Traefik on `am-app-01`.

Viewports:

- 390px
- 768px
- 1366px

Tested AutoMakhsus URLs:

- `https://automakhsus.com/fa`
- `https://automakhsus.com/crm`
- `https://automakhsus.com/fa/store`
- `https://automakhsus.com/fa/cars`
- `https://automakhsus.com/fa/academy`
- `https://automakhsus.com/fa/forum`

Tested TehranSandali URLs:

- `https://tehransandali.ir/fa`
- `https://tehransandali.ir/crm`
- `https://tehransandali.ir/fa/services`
- `https://tehransandali.ir/fa/shop`
- `https://tehransandali.ir/fa/projects`

Key results:

- AutoMakhsus `/crm` final browser URL stayed on `automakhsus.com`.
- AutoMakhsus `/crm` title was `ورود به CRM اتو مخصوص`.
- AutoMakhsus `/crm` visible unauthenticated text did not contain `تهران صندلی`, `TehranSandali`, `Tehran Sandali`, `tehransandali`, or `صندلی`.
- TehranSandali `/crm` final browser URL stayed on `tehransandali.ir`.
- TehranSandali `/crm` no longer showed the public header/footer around the login screen after the shell suppression fix.
- TehranSandali public desktop header now exposes `ورود CRM` and routes to the domain-local `/crm` staff entry.
- AutoMakhsus mega menu remained visible after moving from trigger into the menu panel.
- Checked pages had no horizontal overflow at 390px, 768px, or 1366px.

Sanitized artifacts:

- `docs/CRM_PUBLIC_NAV_BRAND_QA_ARTIFACTS/browser-qa-results.json`
- `docs/CRM_PUBLIC_NAV_BRAND_QA_ARTIFACTS/mobile-390-automakhsus.com-_crm.png`
- `docs/CRM_PUBLIC_NAV_BRAND_QA_ARTIFACTS/desktop-1366-automakhsus-crm-login.png`
- `docs/CRM_PUBLIC_NAV_BRAND_QA_ARTIFACTS/desktop-1366-automakhsus-mega-menu-hover.png`
- `docs/CRM_PUBLIC_NAV_BRAND_QA_ARTIFACTS/mobile-390-tehransandali.ir-_crm.png`
- `docs/CRM_PUBLIC_NAV_BRAND_QA_ARTIFACTS/desktop-1366-tehransandali.ir-_crm.png`

The committed screenshots contain public/login surfaces only and no real customer/staff data.

## Validation

AutoMakhsus:

- `npx prisma validate` passed with dummy compile-time `DATABASE_URL`.
- `npx prisma generate` passed with dummy compile-time `DATABASE_URL`.
- `npm test` passed.
- `npm run lint` passed.
- `npx tsc --noEmit --pretty false --incremental false` passed.
- `npm run build` passed.
- Docker image deployed: `automakhsus/automakhsus:20260617_public_nav_brand_qa`.

TehranSandali/shared CRM:

- `npx prisma validate` passed with dummy compile-time `DATABASE_URL`.
- `npx prisma generate` passed with dummy compile-time `DATABASE_URL`.
- `npm test` passed: 53/53.
- `npm run lint` passed.
- `npx tsc --noEmit --pretty false --incremental false` passed.
- `npm run build` passed.
- Docker image deployed: `automakhsus/tehransandali:20260617_public_nav_brand_qa3`.

Production health:

- `automakhsus.com/api/health` -> 200
- `tehransandali.ir/api/health` -> 200
- `mrseat.ir/api/health` -> 200
- `tehranseat.ir/api/health` -> 200
- `tuduzi.com/api/health` -> 200
- `ani2203.com/api/health` -> 200

## Remaining Constraints

- Authenticated post-login CRM shell was not tested with real staff accounts because the task explicitly forbids creating real staff users. The unauthenticated entry/login layer, domain preservation, brand text, public shell suppression, and proxy behavior were tested with real browser automation.

## Final Status

- AutoMakhsus CRM Entry Correct = YES
- CRM Brand Leakage Fixed = YES
- AutoMakhsus Menu Hover Fixed = YES
- Public Link Audit Passed = YES
- UI Polish Passed = YES
