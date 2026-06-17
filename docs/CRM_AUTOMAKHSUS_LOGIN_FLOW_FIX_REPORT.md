# CRM AutoMakhsus Login Flow Fix Report

Date: 2026-06-17

## Final Status

AutoMakhsus CRM Login Flow Working = YES

## Issue

`https://automakhsus.com/crm` correctly reached the AutoMakhsus-branded CRM login, but submitting the login form could trigger the shared CRM fallback error instead of entering the CRM flow. The failing browser URL was:

`https://automakhsus.com/fa/admin/login?next=%2Fcrm%3Fbu%3DAUTOMAKHSUS_TECHNICAL%26entry%3Dautomakhsus`

## Root Cause

The AutoMakhsus CRM proxy derived the public origin from `request.url`. Inside the Next.js runtime this can be an internal container URL such as `0.0.0.0:3000`, not the browser-facing host.

During a forwarded Server Action login submit, the shared CRM backend saw:

- `Origin: https://automakhsus.com`
- `x-forwarded-host: 0.0.0.0:3000`

Next.js rejected the Server Action as an invalid request. This caused the temporary loading/error surface reported by the user.

## Fix

Updated `src/lib/crm-domain-proxy.ts` so the proxy:

- derives the public host from `Host` / `x-forwarded-host` headers instead of `request.url`;
- ignores internal forwarded hosts such as `0.0.0.0`, `127.0.0.1`, and `localhost`;
- forwards `x-forwarded-host` as `automakhsus.com` for AutoMakhsus CRM requests;
- rewrites proxied CRM assets and locations using the real public origin.

Added regression tests in `tests/platform-upgrade.test.mjs` for:

- internal container URL with `Host: automakhsus.com`;
- forwarded public host;
- internal `x-forwarded-host` with real `Host: automakhsus.com`;
- AutoMakhsus `/crm` default business unit and entry context.

## Deployment

Deployed AutoMakhsus image:

`automakhsus/automakhsus:20260617_crm_login_flow_fix2`

No DNS, Traefik, PostgreSQL, Redis, or secret configuration was changed.

## Verification

Validation:

- `npm test`: passed
- `npm run lint`: passed
- `npx tsc --noEmit --pretty false --incremental false`: passed
- `npm run build`: passed
- Docker runtime image build/deploy: passed

Production route checks through Traefik host context:

| URL | Result |
|---|---|
| `https://automakhsus.com/crm` | 200 after redirect to AutoMakhsus login |
| `https://automakhsus.com/fa/admin/login` | 200, AutoMakhsus login |
| `https://automakhsus.com/fa/admin/login?next=%2Fcrm%3Fbu%3DAUTOMAKHSUS_TECHNICAL%26entry%3Dautomakhsus` | 200, AutoMakhsus login |
| `https://tehransandali.ir/crm` | 200 after redirect to TehranSandali login |
| all six `/api/health` endpoints | 200 |

Real browser submit test:

- Filled the AutoMakhsus login form with invalid test credentials.
- Result: normal invalid-credentials message.
- No temporary loading error.
- No `Invalid Server Actions request`.
- No visible TehranSandali branding.

Browser artifacts:

- `docs/CRM_AUTOMAKHSUS_LOGIN_FLOW_ARTIFACTS/after-fix2-automakhsus-crm.png`
- `docs/CRM_AUTOMAKHSUS_LOGIN_FLOW_ARTIFACTS/after-fix2-automakhsus-login.png`
- `docs/CRM_AUTOMAKHSUS_LOGIN_FLOW_ARTIFACTS/after-automakhsus-login-invalid-submit.png`
- `docs/CRM_AUTOMAKHSUS_LOGIN_FLOW_ARTIFACTS/after-fix2-tehransandali-crm.png`
- `docs/CRM_AUTOMAKHSUS_LOGIN_FLOW_ARTIFACTS/http-follow-results.json`
- `docs/CRM_AUTOMAKHSUS_LOGIN_FLOW_ARTIFACTS/login-flow-submit-result.json`

## Remaining Notes

The visible AutoMakhsus CRM login flow is fixed. The proxied shared app HTML still contains inherited non-visible TehranSandali SEO metadata in some head tags from the shared CRM layout. That is not the login-flow blocker, but it should be cleaned in a separate brand metadata hardening task if strict HTML-source isolation is required.
