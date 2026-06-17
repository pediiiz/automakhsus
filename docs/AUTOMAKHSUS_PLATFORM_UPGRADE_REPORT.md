# Auto Makhsus Main Website Platform Upgrade Report

Date: 2026-06-17

## Final Status

AutoMakhsus Platform Upgrade Ready = YES

## Summary

AutoMakhsus.com was upgraded with a production-safe platform foundation focused on navigation, CRM entry visibility, shop/catalog continuity, forum foundation, academy/video management foundation, and adaptive video processing architecture.

No DNS, Traefik, PostgreSQL, Redis, production secrets, real staff/users, payment gateway, or unsafe public upload changes were made.

## Phase 1 - Header And Navigation

Completed:

- Added visible `CRM Login` to the desktop header.
- Added visible `CRM Login` to the mobile drawer quick actions.
- CRM login routes to `/crm`, preserving the existing AutoMakhsus Technical business-unit redirect behavior.
- Added desktop quick links for:
  - Shop
  - Vehicle Knowledge Base
  - Contact
  - CRM
- Forum navigation now points to `/fa/forum`.
- Existing services, store, academy, video, project, feed, community, brand, and contact routes remain intact.

## Phase 2 - Shop Foundation

Current state:

- Existing catalog foundation remains active:
  - `/fa/store`
  - `/fa/store/categories`
  - `/fa/store/categories/[slug]`
  - `/fa/store/products/[slug]`
  - `/fa/store/search`
- Store has product categories, listings, product detail pages, product visuals, price inquiry labels, stock/status labels, fitment/compatibility, and marketplace lead CTAs.
- Admin-safe platform management summary added at `/fa/admin/platform`.
- No payment gateway was added.

## Phase 3 - Forum Foundation

Completed:

- Added canonical forum route:
  - `/fa/forum`
- Added forum topic routes:
  - `/fa/forum/topics/[slug]`
- Added structured forum foundation:
  - categories
  - groups/sections
  - topics
  - reply counts
  - pin/lock status
  - accepted answer placeholder
  - report/flag moderation concept
  - read-only public mode until authenticated posting is implemented
- Existing `/fa/community` and `/fa/community/questions` remain unchanged.

## Phase 4 - Academy / Education Platform

Current state:

- Existing Academy and Video Center remain active:
  - `/fa/academy`
  - `/fa/academy/[slug]`
  - `/fa/videos`
  - `/fa/videos/[slug]`
- Existing CMS supports:
  - Academy articles
  - Videos
  - Projects
  - Feed posts
  - draft/published/archived status
  - SEO fields
  - tags/service tags
  - business unit
- Added token-protected platform admin summary:
  - `/fa/admin/platform`
- Added upload foundation for Academy video files.

## Phase 5 - Video Encoding And Adaptive Streaming

Completed:

- Added token-protected video upload API:
  - `POST /api/admin/academy/videos`
- Added token-protected video job status/process API:
  - `GET /api/admin/academy/videos/[id]/process`
  - `POST /api/admin/academy/videos/[id]/process`
- Added supported upload validation:
  - `.mp4`
  - `.mov`
  - `.webm`
  - `.m4v`
- Added MIME validation:
  - `video/mp4`
  - `video/quicktime`
  - `video/webm`
  - `video/x-m4v`
- Added safe filename sanitization.
- Added video processing job records.
- Added upload statuses:
  - `uploaded`
  - `processing`
  - `ready`
  - `failed`
- Added FFmpeg HLS processing foundation:
  - 360p
  - 480p
  - 720p
  - 1080p when source supports it
  - segmented HLS output
  - master `.m3u8` playlist
- Added public video detail playback support for CMS videos with:
  - HLS playlist source
  - direct video fallback
  - fallback download/play link

Production safety:

- Upload is not public; it requires the existing CMS admin token.
- Encoding does not run automatically on upload. Processing is explicit so production CPU is not overloaded by public traffic.
- A separate worker service is still recommended before frequent real video uploads.

## Phase 6 - Admin And Security

Completed:

- Added token-protected `/fa/admin/platform` covering:
  - shop status/foundation
  - forum moderation foundation
  - academy status
  - video upload and processing foundation
- Existing CMS token gate is reused.
- Upload APIs reject unauthorized requests.
- File type, extension, size, and dangerous-extension validation added.
- Direct execution risk is reduced by accepting only video extensions/MIME types and storing generated media under the video storage tree.

Audit logging:

- The current AutoMakhsus CMS/admin surface is token-gated but does not yet have a persistent admin identity table or audit log table in this app. This report documents that full audit logging for product changes, forum moderation, academy content changes, and video processing requires the next database-backed admin phase.

## Routes Added Or Updated

Added:

- `/fa/forum`
- `/fa/forum/topics/[slug]`
- `/fa/admin/platform`
- `/api/admin/academy/videos`
- `/api/admin/academy/videos/[id]/process`

Updated:

- Global header / navbar
- Sitemap generation for forum topics
- CMS nav link to platform admin
- Public video detail player

Existing preserved:

- `/crm`
- `/fa/admin/cms`
- `/fa/store`
- `/fa/academy`
- `/fa/videos`
- `/fa/community`
- `/api/health`
- `/sitemap.xml`
- `/robots.txt`

## Validation

- `DATABASE_URL='postgresql://user:pass@localhost:5432/automakhsus' npx prisma validate`: PASS
- `DATABASE_URL='postgresql://user:pass@localhost:5432/automakhsus' npx prisma generate`: PASS
- `npm test`: PASS, 11 tests
- `npm run lint`: PASS
- `DATABASE_URL='postgresql://user:pass@localhost:5432/automakhsus' npx tsc --noEmit --pretty false --incremental false`: PASS
- `DATABASE_URL='postgresql://user:pass@localhost:5432/automakhsus' npm run build`: PASS

## Production Verification

Deployment:

- Container: `automakhsus`
- Image: `automakhsus/automakhsus:20260617_platform_upgrade`
- Method: existing Docker deployment path on `am-app-01`; no DNS, Traefik, PostgreSQL, Redis, or secrets changes.

Host-routed Traefik verification from `am-app-01`:

- `https://automakhsus.com/`: `307` to `/fa`
- `https://automakhsus.com/fa`: `200`
- `https://automakhsus.com/fa/store`: `200`
- `https://automakhsus.com/fa/store/categories`: `200`
- `https://automakhsus.com/fa/forum`: `200`
- `https://automakhsus.com/fa/academy`: `200`
- `https://automakhsus.com/fa/videos`: `200`
- `https://automakhsus.com/fa/projects`: `200`
- `https://automakhsus.com/fa/feed`: `200`
- `https://automakhsus.com/crm`: `307` to `https://tehransandali.ir/crm?bu=AUTOMAKHSUS_TECHNICAL&entry=automakhsus`
- `https://automakhsus.com/api/health`: `200`
- `https://automakhsus.com/sitemap.xml`: `200`
- `https://automakhsus.com/robots.txt`: `200`
- `https://www.automakhsus.com/fa`: `200`
- `https://www.automakhsus.com/crm`: `307`
- `https://www.automakhsus.com/api/health`: `200`

Ecosystem health verification:

- `automakhsus.com/api/health`: `200`
- `tehransandali.ir/api/health`: `200`
- `mrseat.ir/api/health`: `200`
- `tehranseat.ir/api/health`: `200`
- `tuduzi.com/api/health`: `200`
- `ani2203.com/api/health`: `200`

## Artifacts

- Source routes and APIs listed above.
- No screenshots or uploaded media were committed.
- No real video upload was committed.
- Production verification artifact: route/status output recorded in this report.

## Risks And Next Steps

Risks:

- Video processing is CPU-intensive. Frequent production encoding should move to a dedicated worker/container with queue limits.
- Current platform admin uses token gate, not full staff/session-based admin identity.
- Forum is read-only foundation only; authenticated posting and moderation queue are future work.
- Store is catalog/lead foundation only; payment and checkout are not implemented.
- Product/forum/academy audit logs need a persistent admin/audit data model in the next phase.

Next steps:

- Add database-backed shop product/category management.
- Add forum authenticated posting with moderation queue, reports, spam controls, and staff roles.
- Add dedicated video worker container and persistent mounted video storage.
- Add admin audit logs for platform actions.
- Add manual HLS quality selector if required after HLS.js integration.
