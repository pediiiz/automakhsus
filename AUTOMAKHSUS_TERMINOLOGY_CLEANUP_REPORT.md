# AutoMakhsus Terminology Cleanup Report

Date: 2026-06-18

## Scope

Cleaned the AutoMakhsus-facing terminology around `خودروهای خارجی` across the public site, CMS/static content templates, dashboard-facing labels, marketing copy, headers, empty states, lead-form defaults, SEO metadata, and shared CRM AutoMakhsus role text.

TehranSandali-specific upholstery/interior terminology was not changed.

## Audit Counts

- AutoMakhsus live source/test exact occurrences before cleanup: 121
- Shared CRM AutoMakhsus-context exact occurrences before cleanup: 1
- Total live-scope exact occurrences found: 122
- AutoMakhsus tracked repository exact occurrences before cleanup, including historical reports/artifacts: 227
- AutoMakhsus live source/test exact occurrences after cleanup: 0
- AutoMakhsus live source/test broad foreign-car phrasing after cleanup: 0
- Shared CRM AutoMakhsus-context exact occurrences after cleanup: 0

## Replacements Made

- Replaced broad AutoMakhsus positioning such as `مرکز تخصصی خودروهای خارجی` with `مرکز تخصصی خودرو`.
- Replaced service and platform copy such as `خدمات خودروهای خارجی`, `پلتفرم خودروهای خارجی`, and `مدیریت خودروهای خارجی` with neutral `خودرو` wording.
- Normalized AutoMakhsus public metadata, hero text, navigation labels, lead form copy, content templates, CMS fallback text, store/catalog text, forum/community text, vehicle gallery text, and tests.
- Updated the shared CRM AutoMakhsus Technical role note from `مدیریت عملیات فنی خودروهای خارجی` to `مدیریت عملیات فنی خودرو`.
- Retained or converted to `خودروهای وارداتی` / `خودرو وارداتی` only where the text specifically discusses imported-vehicle purchase, inspection, or parts context.

## Remaining Intentional References

- Historical AutoMakhsus report/screenshot artifacts under `docs/` still contain old wording as before-state evidence and are not rendered as live public or CRM UI.
- TehranSandali source still contains `خودروهای خارجی` and related singular phrases only in TehranSandali upholstery/interior/service SEO content, where the user explicitly asked not to change TehranSandali-specific upholstery terminology.

## Validation Target

The live AutoMakhsus source and tests now contain no `خودروهای خارجی`, `خودروی خارجی`, `خودرو خارجی`, or malformed `خودرو و وارداتی` phrasing.
