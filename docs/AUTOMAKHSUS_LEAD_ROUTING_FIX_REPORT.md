# Auto Makhsus Lead Routing Fix Report

Date: 2026-06-14

## Summary

Fixed the critical lead business-unit persistence issue from `AUTOMAKHSUS_CONTENT_ECOSYSTEM_PHASE1_QA_REPORT.md`.

Before this fix, the Auto Makhsus lead API accepted or inferred a business unit, but only stored it in the human-readable message and conversion metadata. The actual CRM columns `Inquiry.businessUnit` and `ConversionEvent.businessUnit` were omitted from inserts and therefore relied on their default value.

## Changes

- Added a canonical lead routing helper:
  - `src/lib/lead-routing.ts`
- Added explicit mapping for:
  - `TEHRANSANDALI`
  - `ANI2203`
  - `TUDUZI`
  - `AUTOMAKHSUS_TECHNICAL`
  - `AUTOMAKHSUS_MARKETPLACE`
- Updated `/api/leads` to persist the canonical CRM enum into:
  - `Inquiry.businessUnit`
  - `ConversionEvent.businessUnit`
- Preserved source attribution:
  - `source = automakhsus`
  - `sourcePath = automakhsus`
  - `sourcePage = submitted route`
  - `businessUnit` and display label remain in metadata/message for human review.
- Added tests for business-unit normalization and inference.

## Validation

- `npm test`: passed, 5 tests.
- `npm run lint`: passed.
- `npx tsc --noEmit --pretty false --incremental false`: passed.
- `npm run build`: passed.
- Docker/Ansible deploy: passed.
- Auto Makhsus container health: healthy.

## Production Verification

Submitted QA leads through the production Auto Makhsus API and verified matching values in both CRM tables:

| Submitted unit | `Inquiry.businessUnit` | `ConversionEvent.businessUnit` |
|---|---|---|
| AutoMakhsus Technical | `AUTOMAKHSUS_TECHNICAL` | `AUTOMAKHSUS_TECHNICAL` |
| AutoMakhsus Marketplace | `AUTOMAKHSUS_MARKETPLACE` | `AUTOMAKHSUS_MARKETPLACE` |
| TehranSandali | `TEHRANSANDALI` | `TEHRANSANDALI` |
| ANI2203 | `ANI2203` | `ANI2203` |
| Tuduzi | `TUDUZI` | `TUDUZI` |

Route checks after deployment:

- `https://automakhsus.com/fa`: 200
- `/fa/academy`: 200
- `/fa/videos`: 200
- `/fa/projects`: 200
- `/fa/feed`: 200
- `/fa/community`: 200
- `/fa/cars`: 200
- `/api/health`: 200
- `/sitemap.xml`: 200
- `/robots.txt`: 200

All six ecosystem `/api/health` endpoints returned 200 through Traefik-local verification.

## Notes

- No database migration was required.
- No DNS, Traefik, PostgreSQL container config, Redis config, or unrelated site changes were made.
- QA verification created production test leads with names starting `QA BU ...`; these are intentionally documented for traceability and can be cleaned from CRM after review if desired.

## Remaining Recommendations

- Add a CRM admin cleanup process for QA/test leads.
- Add end-to-end API/database tests against a disposable database when a safe test database is available.
- Consider exposing business-unit selection only to trusted internal integrations; public forms should continue to infer the default unit from the page/interest.
