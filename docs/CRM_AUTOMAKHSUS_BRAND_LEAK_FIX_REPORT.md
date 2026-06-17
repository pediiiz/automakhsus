# CRM AutoMakhsus Brand Leak Fix Report

Date: 2026-06-17

## Summary

The previous CRM brand QA report was incomplete. A user-provided screenshot and follow-up browser verification proved that `automakhsus.com/fa/admin/login` could still render TehranSandali fallback copy.

Final status:

- CRM Brand Hierarchy Correct = YES
- AutoMakhsus CRM Login Leak Fixed = YES
- AutoMakhsus Error/Fallback Leak Fixed = YES
- Screenshot Verification Passed = YES

## Root Cause

The shared TehranSandali/AutoMakhsus CRM app had three fallback surfaces that were still TehranSandali-first:

1. Direct `/fa/admin/login` without a CRM `next` parameter used `contextFromHeaders` only for CRM entry redirects and otherwise fell back to TehranSandali copy.
2. `src/app/[locale]/error.tsx` was a client error boundary with hardcoded `تهران صندلی` and `تماس با تهران صندلی`.
3. `src/app/[locale]/not-found.tsx` had hardcoded TehranSandali 404 copy.

Because AutoMakhsus proxies the shared CRM app on the AutoMakhsus domain, those fallback surfaces can become visible on `automakhsus.com` if an error boundary, direct admin-login URL, or fallback route is hit.

## Fixes

### Direct AutoMakhsus admin login

File:

- `tehransandali/src/app/[locale]/admin/login/page.tsx`

Change:

- Direct login now derives `loginBrand` from request host when no safe CRM `next` value is present.
- `automakhsus.com/fa/admin/login` now renders AutoMakhsus CRM copy and theme.
- TehranSandali domain still renders TehranSandali CRM entry copy.

### Error boundary

File:

- `tehransandali/src/app/[locale]/error.tsx`

Change:

- The client error boundary now detects `window.location.hostname`.
- On AutoMakhsus hosts it renders:
  - `اتو مخصوص`
  - `CRM اتو مخصوص`
  - `پشتیبانی اتو مخصوص`
- On TehranSandali hosts it preserves TehranSandali wording.

### Not-found fallback

File:

- `tehransandali/src/app/[locale]/not-found.tsx`

Change:

- The 404 fallback now reads `x-forwarded-host` / `host`.
- On AutoMakhsus hosts it renders AutoMakhsus support/CRM copy.
- On TehranSandali hosts it preserves TehranSandali copy.

### Regression coverage

File:

- `tehransandali/src/lib/crm-phase8-auth.test.ts`

Change:

- Added assertion that the AutoMakhsus login brand data does not include `TehranSandali`.

## Screenshots

Before:

- `docs/CRM_AUTOMAKHSUS_BRAND_LEAK_ARTIFACTS/before-fa_admin_login.png`
  - URL: `https://automakhsus.com/fa/admin/login`
  - Result: leaked `ورود امن به CRM داخلی تهران صندلی`.

After:

- `docs/CRM_AUTOMAKHSUS_BRAND_LEAK_ARTIFACTS/after-automakhsus_com_fa_admin_login.png`
  - URL: `https://automakhsus.com/fa/admin/login`
  - Result: no TehranSandali text; AutoMakhsus CRM text visible.

- `docs/CRM_AUTOMAKHSUS_BRAND_LEAK_ARTIFACTS/after-automakhsus_com_fa_admin_login_next_2Fcrm_3Fbu_3DAUTOMAKHSUS_TECHNICAL_26entry_3Dautomakhsus.png`
  - URL: `https://automakhsus.com/fa/admin/login?next=%2Fcrm%3Fbu%3DAUTOMAKHSUS_TECHNICAL%26entry%3Dautomakhsus`
  - Result: no TehranSandali text; AutoMakhsus CRM text visible.

- `docs/CRM_AUTOMAKHSUS_BRAND_LEAK_ARTIFACTS/after-automakhsus_com_crm.png`
  - URL: `https://automakhsus.com/crm`
  - Result: no TehranSandali text; redirects to AutoMakhsus-branded login on same domain.

- `docs/CRM_AUTOMAKHSUS_BRAND_LEAK_ARTIFACTS/after-automakhsus-admin-404.png`
  - URL: `https://automakhsus.com/fa/admin/this-route-should-not-exist`
  - Result: no TehranSandali text.

Verification JSON:

- `docs/CRM_AUTOMAKHSUS_BRAND_LEAK_ARTIFACTS/brand-leak-after-results.json`

## Browser Verification

Verified with Playwright/Chrome against production after deployment.

| URL | TehranSandali FA | Contact TehranSandali | Latin TehranSandali | AutoMakhsus visible |
|---|---:|---:|---:|---:|
| `https://automakhsus.com/fa/admin/login?next=...` | false | false | false | true |
| `https://automakhsus.com/fa/admin/login` | false | false | false | true |
| `https://automakhsus.com/crm` | false | false | false | true |
| `https://automakhsus.com/fa/admin/this-route-should-not-exist` | false | false | false | n/a |
| `https://tehransandali.ir/crm` | true | false | true | false |

The TehranSandali result is expected on the TehranSandali domain.

## Validation

- `npx prisma validate` passed.
- `npx prisma generate` passed.
- `npm test` passed: 53/53.
- `npm run lint` passed.
- `npx tsc --noEmit --pretty false --incremental false` passed.
- `npm run build` passed.
- Deployed image: `automakhsus/tehransandali:20260617_automakhsus_brand_leak_fix`.
- All six ecosystem `/api/health` endpoints returned 200.

## Final Status

- `automakhsus.com/fa/admin/login` has no visible TehranSandali branding.
- `automakhsus.com/crm` has no visible TehranSandali branding.
- `automakhsus.com/fa/admin/login?next=...` has no visible TehranSandali branding.
- Generic CRM error/fallback surfaces are no longer TehranSandali-first on AutoMakhsus hosts.
