# Auto Makhsus Content Workflow

Date: 2026-06-14
Stage: Architecture and design only
Status: planned, not implemented

## Workflow Goals

The Content Manager must let the team publish useful, reviewed, SEO-safe content without code deployments.

The workflow must protect:

- Technical accuracy
- Business-unit privacy
- SEO quality
- Customer privacy
- Brand consistency
- Media rights and approvals

## Roles

### Author

Can create drafts for assigned business units.

Typical users:

- Sales agent
- Reception
- Project manager
- Technical manager
- Content operator

### Technical Reviewer

Reviews technical accuracy.

Typical users:

- Manager
- Project manager
- Tech manager
- Senior specialist

### SEO Reviewer

Reviews metadata, internal links, thin content risk, and sitemap/indexing.

Typical users:

- Manager
- SEO/content lead

### Publisher

Approves and publishes content.

Typical users:

- Super admin
- Manager
- Assigned content manager

### Moderator

Reviews Q&A, comments, accepted answers, and abuse risk.

Typical users:

- Manager
- Community moderator
- Technical reviewer

## Content Lifecycle

```text
Draft
↓
In Review
↓
Needs Changes OR Approved
↓
Scheduled OR Published
↓
Archived
```

Rejected content remains internal and can be revised later.

Deleted content should be soft deleted only.

## Article Workflow

1. Author creates article draft.
2. Author selects business unit, topic, service, brand/model if relevant.
3. Author adds body sections, FAQs, media, internal links, CTA.
4. System runs SEO completeness checks.
5. Author requests review.
6. Technical reviewer approves accuracy.
7. SEO reviewer approves metadata and linking.
8. Publisher publishes or schedules.
9. Sitemap and public route cache update.

Required before publish:

- SEO title
- Meta description
- Canonical
- Hero/OG media or approved fallback
- Persian alt text
- FAQ if appropriate
- Related services/content
- Lead CTA

## Video Workflow

1. Author uploads or references approved video.
2. Author adds poster image.
3. Author adds duration, transcript, chapters, related services, related car hubs.
4. Technical reviewer checks claims and service descriptions.
5. SEO reviewer checks VideoObject fields and transcript quality.
6. Publisher publishes.

Required before publish:

- Poster
- Duration
- Transcript or useful description
- Chapters for long videos
- Related services
- Related brands/models
- CTA

## Project Showcase Workflow

1. Project manager selects an approved CRM project or creates a safe public project draft.
2. Media is selected from approved project/media library items.
3. Private fields are excluded:
   - VIN
   - plate
   - customer name
   - phone
   - invoice totals unless approved
   - internal notes
4. Before/during/after sections are written.
5. Technical/QC reviewer approves accuracy.
6. SEO reviewer checks title, metadata, brand/model/service links.
7. Publisher publishes.

Required before publish:

- Privacy review
- Approved media
- Vehicle public label
- Service details
- CTA
- Related brand/model links

## Feed Post Workflow

Feed posts are shorter and faster, but still reviewed before public publishing.

Workflow:

1. Author creates quick post.
2. Adds media, service, brand/model, CTA.
3. Manager or publisher approves.
4. Publish immediately or schedule.

Feed should not expose private data or raw workshop notes.

## Community Q&A Workflow

Phase 1 is read-only.

For managed Q&A:

1. Author creates a question.
2. Technical reviewer writes or approves the accepted answer.
3. Moderator checks tone, safety, and privacy.
4. SEO reviewer checks URL, title, schema, and internal links.
5. Publisher publishes.

Future public posting requires:

- User identity strategy
- Spam control
- Report/flag system
- Moderation queue
- Rate limits
- Abuse handling policy

## Brand / Model Hub Workflow

1. Content lead creates or edits brand/model hub.
2. Adds unique intro, common issues, diagnostics notes, parts guidance, options, detailing, service packages, FAQs, related articles, videos, projects, and CTA.
3. Technical reviewer approves accuracy.
4. SEO reviewer checks thin/duplicate risk.
5. Publisher publishes.

Rules:

- Do not create duplicate boilerplate brand/model pages.
- No indexed page without unique value.
- If content depth is not ready, keep as draft or noindex.

## Review Rules

Technical review checks:

- Is the service statement true?
- Could the content mislead customers?
- Are part/warranty statements safe?
- Are diagnostic claims realistic?
- Are brand/model notes accurate enough?

SEO review checks:

- Unique title and meta description
- Clean canonical
- Appropriate schema
- Sufficient content depth
- Related internal links
- CTA present
- No keyword stuffing
- No duplicate/thin content

Privacy review checks:

- No private customer data
- No visible plate/VIN unless explicitly approved and masked
- No invoice/private financial data
- No unapproved faces or personal data
- No internal notes

## Business Unit Workflow

Each item belongs to one business unit.

Cross-unit links are allowed when editorially useful, but editing/publishing rights remain scoped.

Examples:

- A BMW diagnostics article: `AUTOMAKHSUS_TECHNICAL`
- A parts buying guide: `AUTOMAKHSUS_MARKETPLACE`
- A seat/interior project: `TEHRANSANDALI`
- An upholstery guide: `TUDUZI`
- ANI2203 service page: `ANI2203`

## Notifications

In-app notifications should be generated for:

- Review requested
- Review approved/rejected
- Content published
- Content scheduled
- SEO warning before publish
- Media approval needed
- Project privacy review needed

No external SMS/Telegram/WhatsApp provider in first implementation.

## Audit Trail

Every sensitive change must be audited:

- Status changes
- Publish/unpublish
- Slug/canonical changes
- SEO field changes
- Media attach/remove
- Business-unit changes
- Reviewer assignment
- Soft delete/restore

## Publishing Safety

Before publish:

- Run content validation.
- Generate preview.
- Confirm business unit.
- Confirm indexing setting.
- Confirm sitemap inclusion.
- Confirm no private data.

After publish:

- Revalidate route.
- Update sitemap.
- Add audit event.
- Notify author/reviewer.

## Rollback

Rollback options:

- Restore previous revision.
- Unpublish content.
- Set noindex temporarily.
- Add redirect if slug changed.
- Revert to static fallback during migration phase.
