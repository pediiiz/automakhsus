# Auto Makhsus Global Vehicle Knowledge Base QA Report

Date: 2026-06-14

Scope: production audit only for `automakhsus.com` Cars / Vehicle Knowledge Base. No code, routing, DNS, Traefik, database, Redis, or unrelated website changes were made.

## Audit Coverage

Audited areas:

- `/fa/cars`
- all 55 brand pages
- representative model pages
- representative generation pages
- sitemap coverage
- canonical tags
- Open Graph tags
- structured data
- internal links and CTA paths
- Persian copy quality
- thin/repetitive content risk
- duplicate metadata risk
- page size / build-size indicators
- image placeholders and legal image metadata
- mobile/responsive structure by source inspection
- 404 behavior
- all six ecosystem health endpoints

## Production Route Results

All 55 brand pages returned `200`.

Representative checked pages:

| Route | Status |
|---|---:|
| `/fa/cars` | 200 |
| `/fa/cars/bmw` | 200 |
| `/fa/cars/bmw/x5` | 200 |
| `/fa/cars/bmw/x5/g05` | 200 |
| `/fa/cars/mercedes-benz/c200/w205` | 200 |
| `/fa/cars/porsche/cayenne/9y0` | 200 |
| `/fa/cars/tesla/model-3/first` | 200 |
| `/fa/cars/ferrari/roma/f169` | 200 |
| `/fa/cars/toyota/prado/j150` | 200 |
| `/fa/cars/hyundai/santa-fe/tm` | 200 |
| `/fa/cars/land-rover/defender/l663` | 200 |

404 behavior:

| Route | Status |
|---|---:|
| `/fa/cars/not-a-brand` | 404 |
| `/fa/cars/bmw/not-a-model` | 404 |
| `/fa/cars/bmw/x5/not-a-generation` | 404 |

Sitemap:

- Vehicle URLs in sitemap: `601`
- Sample sitemap entries verified:
  - `/fa/cars/bmw`
  - `/fa/cars/bmw/x5`
  - `/fa/cars/bmw/x5/g05`
  - `/fa/cars/toyota/prado/j150`
  - `/fa/cars/tesla/model-3/first`
  - `/fa/cars/ferrari/roma/f169`

Ecosystem health:

| Site | Health |
|---|---:|
| `automakhsus.com` | 200 |
| `tehransandali.ir` | 200 |
| `mrseat.ir` | 200 |
| `tehranseat.ir` | 200 |
| `tuduzi.com` | 200 |
| `ani2203.com` | 200 |

## SEO Signal Results

Sampled pages have:

- canonical tags
- Open Graph title/description/url/image
- Twitter card metadata
- JSON-LD present
- sitemap inclusion
- index/follow robots metadata

Examples:

- `/fa/cars/bmw/x5/g05`
  - canonical: `https://automakhsus.com/fa/cars/bmw/x5/g05`
  - OG image: `https://automakhsus.com/uploads/automakhsus/hero/automakhsus-og.svg`
  - JSON-LD blocks: `3`
  - lead form: present
  - image policy: present

## Findings

### Critical

None found.

No broken production routes, no sitemap outage, no canonical absence, no public 500s, no wrong-domain routing, and no ecosystem health failures were found.

### High

1. Duplicate title suffix on vehicle pages

Current titles include `Auto Makhsus` inside page-specific title values, while the root metadata template also appends `| Auto Makhsus`.

Examples:

- `/fa/cars/bmw`: `خدمات بی‌ام‌و | Auto Makhsus | Auto Makhsus`
- `/fa/cars/bmw/x5`: `خدمات BMW X5 | Auto Makhsus | Auto Makhsus`
- `/fa/cars/bmw/x5/g05`: `خدمات BMW X5 نسل G05 | Auto Makhsus | Auto Makhsus`

Impact:

- Duplicate title branding weakens SERP polish.
- It may reduce click-through quality and looks mechanically generated.

Likely source:

- `src/app/layout.tsx` has title template `%s | Auto Makhsus`.
- Vehicle pages pass titles that already include `| Auto Makhsus`.

2. Thin/repetitive content risk on generated model and generation pages

The KB has strong route coverage, but many non-priority model/generation pages use formulaic seed copy.

Examples:

- Many generation descriptions follow the same pattern:
  - `{model} نسل {generation} در بازه {years} باید از نظر دیاگ، قطعات مصرفی، سرویس دوره‌ای، برق، آپشن و سابقه نگهداری...`
- Many model pages reuse the same generic service/diagnostic/parts structure with only model names changed.

Impact:

- Risk of thin/near-duplicate pages at scale.
- Search engines may treat many generation pages as low-value unless enriched with unique, technically reviewed content.

Recommendation:

- Keep routes live, but prioritize editorial enrichment for high-demand commercial pages first.
- Add unique sections by brand/model/generation:
  - known engines and trims
  - common Iran-market problems
  - parts compatibility
  - service intervals
  - diagnostic notes
  - local availability / special-order notes
  - real project links

3. Persian copy has mixed English generation labels

Some generation labels are English and appear directly in Persian page titles/copy.

Examples:

- `Tesla Model 3 نسل First generation`
- `BYD Han نسل First generation`
- `Ferrari Roma نسل F169` is acceptable technically, but generic English words like `First generation` should be localized.

Impact:

- Weak Persian readability.
- Makes pages feel generated.
- Reduces premium brand quality.

Recommendation:

- Normalize generic generation labels:
  - `First generation` → `نسل اول`
  - `Second generation` → `نسل دوم`
  - `Third generation` → `نسل سوم`
  - preserve technical chassis codes like `G05`, `W205`, `J150`.

### Medium

1. Missing BreadcrumbList JSON-LD on brand/model/generation detail pages

Detail pages include Organization, WebSite, and vehicle/service WebPage JSON-LD, but sampled detail pages did not include breadcrumb JSON-LD.

Impact:

- Breadcrumb SERP eligibility is weaker.
- Deep hierarchy pages would benefit from explicit breadcrumbs:
  - Auto Makhsus → دانشنامه خودرو → Brand → Model → Generation

2. Open Graph image is generic for all vehicle pages

Sampled vehicle pages all use the same Auto Makhsus OG image.

Impact:

- Social sharing is consistent but not vehicle-specific.
- Brand/model/generation pages do not visually differentiate.

Recommendation:

- Add legal, local, source-tracked OG variants for priority brands/models.
- Keep generic OG fallback where no approved image exists.

3. Hero image is relatively heavy and used broadly

The local hero image used by vehicle detail pages is about `1.48 MB`.

Observations:

- `/fa/cars` HTML payload was about `148 KB`.
- Sample detail pages were around `70 KB` HTML.
- `.next/static` is small at about `1.5 MB`, but `.next` total build output is about `580 MB`.
- Detail pages preload the same hero image through `next/image` because `ContentHero` marks the image as `priority`.

Impact:

- The repeated priority hero image can hurt perceived performance, especially on mobile.

Recommendation:

- Use `priority` only for top-level landing pages, not every brand/model/generation detail page.
- Consider a smaller optimized vehicle KB hero fallback.

4. Related content is too generic for many pages

Many brand/model/generation pages link to the same generic Academy/video/project items.

Impact:

- Internal links exist, but contextual relevance is not strong enough across hundreds of pages.

Recommendation:

- Add per-brand/model related-content mapping.
- Prioritize high-demand vehicle pages first.

5. `/fa/cars` index is navigable but long

The page lists 55 brands in a responsive grid.

Impact:

- On mobile, users must scroll through a long list without search, filters, or region/category grouping.

Recommendation:

- Add brand search/filter, country/segment tabs, or priority grouping:
  - German
  - Japanese
  - Korean
  - EV
  - Luxury/Supercar
  - Common in Iran

### Low

1. Image policy panel uses English source/license text

The legal metadata is useful and transparent, but source/license text is currently English.

Impact:

- Minor Persian UI consistency issue.

Recommendation:

- Keep the technical metadata, but add Persian labels/descriptions or hide internal license copy behind a small expandable details section.

2. Brand pages do not show legal image metadata

Model/generation pages show image metadata. Brand pages do not, because brand records do not currently carry image metadata.

Impact:

- Low risk because brand pages use the shared hero and do not claim specific brand imagery.

Recommendation:

- Add brand-level image metadata when brand-specific legal images are introduced.

3. Product/service CTAs are present but not all are deep-linked to exact matching store/service filters

Lead forms and major links exist. Some CTAs are broad instead of scoped to a specific brand/model/product category.

Impact:

- Conversion path works, but could be more precise.

Recommendation:

- Add query/context-aware CTA links once store/service filtering exists.

## Validation Commands

Audit-only validation run:

- `npm test`: passed, 8 tests.
- `npm run lint`: passed.
- `npx tsc --noEmit --pretty false --incremental false`: passed.

Production checks:

- all 55 brand pages: `200`
- sampled model/generation pages: `200`
- invalid brand/model/generation pages: `404`
- sitemap: `200`
- all six ecosystem health endpoints: `200`

## Recommendations By Priority

### Fix First

1. Remove duplicate `Auto Makhsus` title suffix on all vehicle pages.
2. Localize generic generation labels.
3. Add BreadcrumbList JSON-LD for brand/model/generation pages.

### Next SEO Quality Pass

1. Create enriched editorial content for top commercial pages:
   - BMW X3/X5
   - Mercedes C200/E200/S-Class
   - Porsche Cayenne/Panamera
   - Toyota Prado/Land Cruiser/Camry
   - Lexus RX/NX/LX
   - Hyundai Santa Fe/Tucson
   - Kia Cerato/Optima/Sportage
2. Add brand/model-specific related content maps.
3. Add legal image/OG assets for priority brands and models.

### Later Platform Work

1. Move vehicle brand/model/generation data into CMS/database entities.
2. Add editorial workflow and approval status for Vehicle Knowledge Base entries.
3. Add Search Console monitoring for indexed pages, duplication warnings, impressions, and crawl behavior.

## Knowledge Base Impact

No Knowledge Base source-of-truth update was required from this audit because no architecture or roadmap decision changed. The report should be used as the next implementation input for a targeted vehicle KB SEO-quality fix phase.
