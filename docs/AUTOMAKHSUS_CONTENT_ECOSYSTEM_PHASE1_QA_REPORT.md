# Auto Makhsus Content Ecosystem Phase 1 QA Report

Date: 2026-06-14

Scope: production audit only. No implementation changes were made.

## Executive Summary

Auto Makhsus Content Ecosystem Phase 1 is live and production-routable. The homepage and all audited Phase 1 routes returned 200 through Traefik-local production verification, sitemap and robots are reachable, metadata/canonical/Open Graph tags are present, and the site remains fast from the server-side route check path.

The main production risk is CRM business-unit attribution: Auto Makhsus lead forms accept and infer `AutoMakhsus Technical` / `AutoMakhsus Marketplace`, but the API does not write that value into the actual CRM `Inquiry.businessUnit` or `ConversionEvent.businessUnit` columns. Because those columns default to `TEHRANSANDALI`, new AutoMakhsus leads can be misclassified in the shared CRM.

## Production Route Verification

Verified through Traefik on `am-app-01` using local Host/SNI resolution:

| Route | Status | Server time | HTML/API size |
|---|---:|---:|---:|
| `/fa` | 200 | 0.067s | 113685 bytes |
| `/fa/academy` | 200 | 0.062s | 44350 bytes |
| `/fa/videos` | 200 | 0.059s | 39265 bytes |
| `/fa/projects` | 200 | 0.066s | 35515 bytes |
| `/fa/feed` | 200 | 0.061s | 35383 bytes |
| `/fa/community` | 200 | 0.055s | 44066 bytes |
| `/fa/community/questions` | 200 | 0.057s | 35386 bytes |
| `/fa/cars` | 200 | 0.059s | 52498 bytes |
| `/fa/cars/bmw` | 200 | 0.058s | 43328 bytes |
| `/fa/cars/bmw/x5` | 200 | 0.062s | 41895 bytes |
| `/fa/cars/mercedes-benz` | 200 | 0.061s | 43718 bytes |
| `/fa/cars/mercedes-benz/c200` | 200 | 0.060s | 42116 bytes |
| `/api/health` | 200 | 0.058s | 11 bytes |
| `/sitemap.xml` | 200 | 0.064s | 10024 bytes |
| `/robots.txt` | 200 | 0.061s | 115 bytes |

All six ecosystem sites also returned 200 for `/fa` and `/api/health` through Traefik-local verification:

- `automakhsus.com`
- `tehransandali.ir`
- `mrseat.ir`
- `tehranseat.ir`
- `tuduzi.com`
- `ani2203.com`

## SEO / Metadata Audit

Checked representative pages:

- `/fa`
- `/fa/academy`
- `/fa/videos`
- `/fa/projects`
- `/fa/feed`
- `/fa/community`
- `/fa/cars`
- `/fa/cars/bmw`
- `/fa/cars/bmw/x5`

Findings:

- Title tags exist.
- Meta descriptions exist.
- Canonical tags point to `https://automakhsus.com/...`.
- Open Graph title tags exist.
- JSON-LD blocks are present.
- Sitemap includes all new Phase 1 module routes and sample detail pages.
- `robots.txt` is preserved and reachable.

Sitemap count observed: 58 URLs.

## CTA / CRM Lead Audit

Performed one production QA lead submission:

- Endpoint: `POST https://automakhsus.com/api/leads`
- `source`: `automakhsus`
- `sourcePage`: `/fa/academy`
- submitted `businessUnit`: `AutoMakhsus Technical`
- Result: `200`, response `{"ok":true,...}`

Code review found that `businessUnit` is currently stored in:

- `Inquiry.message` text
- `ConversionEvent.metadata` JSON

But it is not written to:

- `Inquiry.businessUnit`
- `ConversionEvent.businessUnit`

Those columns exist in the shared CRM schema and default to `TEHRANSANDALI`, creating a likely business-unit attribution gap.

## Findings

### Critical

1. **Auto Makhsus leads are likely saved under the wrong CRM business unit**

Affected area:

- `src/app/api/leads/route.ts`

Evidence:

- API accepts/infer business unit.
- Insert into `Inquiry` omits `"businessUnit"`.
- Insert into `ConversionEvent` omits `"businessUnit"`.
- TehranSandali CRM schema has `businessUnit` columns for both models with default `TEHRANSANDALI`.

Impact:

- AutoMakhsus Technical and Marketplace leads can enter the shared CRM as TehranSandali-scoped records.
- Business-unit isolation, dashboards, routing, reporting, and follow-up assignment can be inaccurate.
- This conflicts with the shared CRM business-unit architecture.

Recommendation:

- Map submitted values to the canonical Prisma enum values, likely `AUTOMAKHSUS_TECHNICAL` and `AUTOMAKHSUS_MARKETPLACE`.
- Write `businessUnit` into `Inquiry` and `ConversionEvent` at creation time.
- Add regression tests for technical and marketplace lead submissions.
- Add a cleanup plan for QA/test leads and any AutoMakhsus leads created during Phase 1.

### High

1. **Many vehicle brand pages are thin and structurally repetitive**

Affected routes:

- `/fa/cars/porsche`
- `/fa/cars/audi`
- `/fa/cars/volkswagen`
- `/fa/cars/mini`
- `/fa/cars/land-rover`
- `/fa/cars/range-rover`
- `/fa/cars/volvo`
- `/fa/cars/maserati`
- `/fa/cars/alfa-romeo`
- `/fa/cars/jeep`
- `/fa/cars/nissan`
- `/fa/cars/skoda`
- `/fa/cars/aion`

Evidence:

- Most non-priority brand hubs share the same services and common issue bullets.
- Only selected brands have model hubs.
- The page template differs by brand intro, but the supporting service/problem sections are too generic.

Impact:

- SEO thin/duplicate risk.
- Lower trust for high-value imported brands.

Recommendation:

- Before expanding indexed pages, add unique brand-specific sections: common failures, maintenance intervals, parts considerations, diagnostics notes, service packages, and related real projects.
- Consider temporarily lowering sitemap priority or adding noindex to thin brand pages until content depth improves.

2. **Video detail pages do not fully expose video-specific fields**

Affected route:

- `/fa/videos/[slug]`

Evidence:

- `VideoContent` model contains `duration`, `poster`, and `transcript`.
- Detail pages render through the generic `ContentDetail` component.
- Production check found `VideoObject` schema present, but visible duration was missing.

Impact:

- The page does not fully satisfy Video Center UX requirements.
- Video trust and SEO quality are weaker than planned.

Recommendation:

- Use the existing `VideoDetail`-style layout or equivalent.
- Show poster, play/placeholder panel, duration, transcript, related services, and CTA in a video-specific detail page.

3. **Desktop/tablet navigation is crowded and disappears below XL without a full menu**

Affected area:

- Header navigation in `src/components/site-shell.tsx`

Evidence:

- Header now has many top-level content links.
- Desktop nav is hidden below `xl`.
- Mobile has a bottom CTA bar, but no full content menu for Academy, Videos, Projects, Feed, Community, and Cars.

Impact:

- Tablet users may lose direct navigation to important content sections.
- Mobile discovery depends heavily on homepage cards and footer links.

Recommendation:

- Add a compact mobile/tablet drawer or segmented content menu.
- Keep top desktop nav shorter and group content under a content/knowledge dropdown if needed.

### Medium

1. **Project Showcase content is still sample-like**

Affected routes:

- `/fa/projects`
- `/fa/projects/bmw-x5-diagnostic-service`
- `/fa/projects/lexus-detailing-protection`

Impact:

- Good structure, but not enough real visual proof yet.
- "نمونه ساختار" wording makes the page feel like a placeholder.

Recommendation:

- Replace sample projects with real approved project media and public-safe descriptions.
- Add before/during/after image sets once media workflow is ready.

2. **Community is correctly read-only, but copy should set expectations more clearly**

Affected routes:

- `/fa/community`
- `/fa/community/questions`

Impact:

- Users may expect posting because the page is framed as community/Q&A.

Recommendation:

- Add stronger visible wording that Phase 1 is read-only and service requests should use consultation CTAs.

3. **Structured data is present but can be more precise**

Affected areas:

- Project detail schema.
- Vehicle brand/model schema.
- Video detail schema.

Impact:

- Current schema is acceptable for Phase 1, but not yet rich enough for mature SEO.

Recommendation:

- Add `ImageObject`/`VideoObject` to project pages where media exists.
- Add more complete `Vehicle`/`Service`/`FAQPage` data to vehicle hubs.
- Validate with Google Rich Results after the next implementation pass.

4. **Homepage payload is larger than other pages**

Affected route:

- `/fa`

Evidence:

- HTML response size observed: 113685 bytes.
- Other content index pages were around 35-52 KB.

Impact:

- Server response is still fast, but homepage should be watched as more sections are added.

Recommendation:

- Keep future homepage additions concise.
- Avoid adding large inline data or heavy media to the homepage.

### Low

1. **Persian/English naming is mostly intentional but could be polished**

Examples:

- "Video Center"
- "Project Showcase"
- "Daily Feed"
- "Auto Makhsus CRM"

Impact:

- Technical/corporate tone is acceptable, but public Persian UX could be cleaner.

Recommendation:

- Use Persian-first labels with English as secondary where useful.

2. **Static content model is good for Phase 1 but needs editorial governance**

Impact:

- Without CMS/review workflow, content growth will become harder to manage.

Recommendation:

- Keep static content for seed/MVP.
- Move to CMS/editorial workflow only after moderation and SEO quality standards are defined.

## Positive Observations

- All requested Phase 1 routes are live.
- No public posting or authentication complexity was introduced.
- Existing Auto Makhsus positioning is preserved.
- Top-level brand architecture remains canonical: TehranSandali, ANI2203, and Tuduzi.
- MrSeat and TehranSeat remain TehranSandali sub-brands only.
- No DNS, Traefik, PostgreSQL/Redis container config, or unrelated site changes were made during audit.
- Page speed from the server-side Traefik path is currently strong.
- Sitemap includes the new content routes.

## Recommended Next Fix Order

1. Fix lead `businessUnit` persistence for `Inquiry` and `ConversionEvent`.
2. Improve video detail rendering to show poster/duration/transcript clearly.
3. Add mobile/tablet content navigation.
4. Deepen or noindex thin vehicle brand hubs.
5. Replace sample project/feed content with real approved public-safe media.
6. Strengthen structured data after content quality improves.

## Audit Commands / Checks Run

- Production route checks through Traefik-local Host/SNI resolution.
- Ecosystem health checks for all six production domains.
- Metadata/canonical/Open Graph/JSON-LD presence checks.
- Sitemap route inclusion check.
- Production QA lead submission to `/api/leads`.
- Source review of content model, navigation, schema helpers, lead API, and responsive CSS.

## Knowledge Base

No Knowledge Base update was made because this task produced an audit report only and did not change implementation state, architecture, roadmap, or decisions.
