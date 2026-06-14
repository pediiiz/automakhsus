# Auto Makhsus Global Vehicle Knowledge Base Report

Date: 2026-06-14

## Summary

AutoMakhsus.com Vehicle Knowledge Base was expanded from a limited imported-car hub into a global structured vehicle catalog covering reputable automotive brands, important models, generation/year ranges, SEO pages, and legal image metadata.

Scope was limited to `automakhsus.com`. No DNS, Traefik, PostgreSQL container, Redis container, payment, or unrelated website changes were made.

## Implementation

- Expanded structured vehicle seed data in `src/lib/content-data.ts`.
- Added support for model image metadata and generation image metadata:
  - image path
  - source
  - license / usage note
  - optional attribution
- Added global vehicle catalog coverage:
  - 55 brands
  - 183 models
  - 363 generation/year entries
- Added generation lookup support.
- Added generation-level pages:
  - `/fa/cars/[brand]/[model]/[generation]`
- Added generation routes to sitemap generation.
- Updated car index metadata and copy to reflect global brand/model/generation coverage.
- Expanded foreign-car brand display data used across the site.
- Updated vehicle detail UI to show:
  - generation/year cards
  - active generation state
  - legal image/source/license note
  - generation-aware lead source page
  - generation-aware structured data

## Brand Coverage

The catalog now includes the requested global brands, including:

BMW, Mercedes-Benz, Porsche, Audi, Volkswagen, Mini, Land Rover, Range Rover, Volvo, Maserati, Alfa Romeo, Jeep, Toyota, Lexus, Nissan, Infiniti, Hyundai, Kia, Genesis, Suzuki, Skoda, Aion, BYD, MG, Mazda, Mitsubishi, Subaru, Honda, Acura, Ford, Chevrolet, Cadillac, Lincoln, Dodge, Ram, Chrysler, Tesla, Polestar, Peugeot, Citroen, Renault, DS, Fiat, Seat, Cupra, Opel, Jaguar, Bentley, Rolls-Royce, Aston Martin, Ferrari, Lamborghini, McLaren, Bugatti, and Lotus.

## Legal Image Policy

No remote hotlinked or uncertain copyrighted vehicle imagery was added.

All brand/model/generation records currently use the existing local Auto Makhsus internal generated placeholder image unless a legally certain image is later added with metadata. The UI exposes image source and license notes on detail pages to keep the image pipeline auditable.

## SEO

Updated SEO support includes:

- Brand pages: `/fa/cars/[brand]`
- Model pages: `/fa/cars/[brand]/[model]`
- Generation pages: `/fa/cars/[brand]/[model]/[generation]`
- Metadata per generation page.
- Canonical URLs per generation page.
- Open Graph metadata through existing page metadata helper.
- Structured data updated to reference brand/model/generation context.
- Sitemap now includes brand, model, and generation pages.
- Internal links from model pages to generation pages.
- CTAs retained for:
  - رزرو سرویس
  - استعلام قطعه
  - مشاوره تخصصی

## Validation

Local validation:

- `npm test`: passed, 8 tests.
- `npm run lint`: passed.
- `npx tsc --noEmit --pretty false --incremental false`: passed.
- `npm run build`: passed.
- Static generation: 700 pages.

Deployment:

- Ansible playbook: `/opt/automakhsus/infra/ansible/playbooks/deploy-automakhsus.yml`
- Release: `20260614180851`
- Image: `automakhsus/automakhsus:20260614180851`
- Container health: healthy.

Production verification:

- `https://automakhsus.com/fa/cars`: 200
- `https://automakhsus.com/fa/cars/bmw`: 200
- `https://automakhsus.com/fa/cars/bmw/x5`: 200
- `https://automakhsus.com/fa/cars/bmw/x5/g05`: 200
- `https://automakhsus.com/fa/cars/tesla`: 200
- `https://automakhsus.com/fa/cars/tesla/model-3`: 200
- `https://automakhsus.com/fa/cars/ferrari`: 200
- `https://automakhsus.com/fa/cars/toyota/prado/j150`: 200
- `https://automakhsus.com/api/health`: 200
- `https://automakhsus.com/sitemap.xml`: 200
- `https://automakhsus.com/robots.txt`: 200

Ecosystem health verification:

- `https://tehransandali.ir/api/health`: 200
- `https://mrseat.ir/api/health`: 200
- `https://tehranseat.ir/api/health`: 200
- `https://tuduzi.com/api/health`: 200
- `https://ani2203.com/api/health`: 200

## Files Changed

- `src/lib/content-data.ts`
- `src/lib/site-data.ts`
- `src/components/content/content-sections.tsx`
- `src/app/fa/cars/page.tsx`
- `src/app/fa/cars/[brand]/[model]/[generation]/page.tsx`
- `docs/AUTOMAKHSUS_GLOBAL_VEHICLE_KNOWLEDGE_BASE_REPORT.md`

## Remaining Recommendations

- Replace internal generated placeholders with licensed manufacturer/press/Wikimedia/internal media only when source and license are documented.
- Move the static vehicle seed data to the future Auto Makhsus CMS/database content manager once the schema supports brand/model/generation entities.
- Add editorial review for generation/year ranges before turning pages into high-volume SEO acquisition campaigns.
- Add richer localized Persian content for the highest commercial-intent brands/models first.
