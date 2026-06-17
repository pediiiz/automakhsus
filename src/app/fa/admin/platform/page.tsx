import type { Metadata } from "next";
import Link from "next/link";
import { isCmsConfigured, isValidCmsToken, tokenQuery } from "@/lib/cms-auth";
import { storeCategories, storeProducts } from "@/lib/store-data";
import { forumCategories, forumTopics } from "@/lib/forum-data";
import { academyArticles, videos } from "@/lib/content-data";
import { supportedVideoExtensions, supportedVideoMimeTypes } from "@/lib/video-processing";

export const metadata: Metadata = {
  title: "Auto Makhsus Platform Admin",
  robots: { index: false, follow: false },
};

export default async function PlatformAdminPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  const configured = isCmsConfigured();
  const authorized = isValidCmsToken(token);

  if (!configured || !authorized) {
    return (
      <main className="cms-admin-shell">
        <section className="cms-admin-hero">
          <div>
            <p className="eyebrow text-[var(--ice)]">Platform Admin Locked</p>
            <h1 className="mt-3 text-3xl font-black md:text-5xl">مدیریت پلتفرم قفل است</h1>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-white/68">
              این بخش فقط با توکن سروری CMS فعال می‌شود. هیچ مسیر آپلود یا مدیریت عمومی بدون احراز مجوز در دسترس نیست.
            </p>
            <p className="mt-4 text-sm font-black text-white/80">
              وضعیت: {configured ? "توکن تنظیم شده؛ توکن معتبر ارسال نشده است." : "توکن سروری تنظیم نشده است."}
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="cms-admin-shell">
      <section className="cms-admin-hero">
        <div>
          <p className="eyebrow text-[var(--ice)]">Auto Makhsus Platform</p>
          <h1 className="mt-3 text-3xl font-black md:text-5xl">مدیریت فروشگاه، انجمن و آکادمی</h1>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-white/68">
            فاز امن مدیریت پلتفرم برای فروشگاه، forum moderation، آکادمی و ویدئو. تغییرات دیتابیسی/پرداخت/نوشتن عمومی هنوز فعال نشده‌اند.
          </p>
        </div>
        <Link className="btn-ghost-dark" href={`/fa/admin/cms${tokenQuery(token)}`}>CMS محتوا</Link>
      </section>

      <section className="cms-admin-grid">
        <aside className="cms-sidebar">
          <nav className="cms-panel p-4">
            <p className="eyebrow">Platform Modules</p>
            <div className="mt-4 grid gap-2">
              <a className="cms-nav-link" href="#shop">فروشگاه</a>
              <a className="cms-nav-link" href="#forum">انجمن</a>
              <a className="cms-nav-link" href="#academy">آکادمی</a>
              <a className="cms-nav-link" href="#video">آپلود و پردازش ویدئو</a>
            </div>
          </nav>
        </aside>
        <div className="grid gap-6">
          <section id="shop" className="cms-panel p-5 md:p-7">
            <p className="eyebrow">Shop Foundation</p>
            <h2 className="mt-2 text-2xl font-black">فروشگاه قطعات</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              کاتالوگ فعلی seed-safe است و پرداخت آنلاین ندارد. مدیریت دیتابیسی محصولات در فاز بعدی از همین ساختار دسته/محصول استفاده می‌کند.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Stat label="دسته‌ها" value={storeCategories.length} />
              <Stat label="محصولات نمونه" value={storeProducts.length} />
              <Stat label="پرداخت آنلاین" value="غیرفعال" />
            </div>
          </section>

          <section id="forum" className="cms-panel p-5 md:p-7">
            <p className="eyebrow">Forum Foundation</p>
            <h2 className="mt-2 text-2xl font-black">انجمن و moderation</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              انجمن فعلاً read-only است. ساختار دسته، گروه، موضوع، pin/lock و report/flag برای فاز authenticated posting آماده شده است.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Stat label="دسته‌ها" value={forumCategories.length} />
              <Stat label="گروه‌ها" value={forumCategories.reduce((sum, item) => sum + item.groups.length, 0)} />
              <Stat label="موضوعات نمونه" value={forumTopics.length} />
            </div>
          </section>

          <section id="academy" className="cms-panel p-5 md:p-7">
            <p className="eyebrow">Academy Foundation</p>
            <h2 className="mt-2 text-2xl font-black">آموزش و آکادمی</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              آکادمی با CMS موجود برای مقاله، ویدئو، نمونه‌کار و فید کار می‌کند. گروه‌بندی، تگ‌ها، سرچ و مسیرهای عمومی فعال هستند.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Stat label="مقالات seed" value={academyArticles.length} />
              <Stat label="ویدئوهای seed" value={videos.length} />
              <Stat label="CMS status" value="فعال با توکن" />
            </div>
          </section>

          <section id="video" className="cms-panel p-5 md:p-7">
            <p className="eyebrow">Video Upload + HLS</p>
            <h2 className="mt-2 text-2xl font-black">آپلود و پردازش ویدئو آموزشی</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              این فرم فایل را در مسیر امن ذخیره و job پردازش ایجاد می‌کند. اجرای FFmpeg از endpoint پردازش یا worker جداگانه انجام می‌شود تا سرور تولیدی زیر فشار قرار نگیرد.
            </p>
            <form className="mt-6 grid gap-4" action={`/api/admin/academy/videos?token=${encodeURIComponent(token || "")}`} method="post" encType="multipart/form-data">
              <input className="field" type="file" name="video" accept={supportedVideoExtensions.join(",")} required />
              <button className="btn-primary" type="submit">آپلود و ایجاد job</button>
            </form>
            <div className="mt-5 rounded-2xl border border-[var(--border)] bg-white p-4 text-sm leading-8 text-[var(--muted)]">
              <p><strong>Formats:</strong> {supportedVideoExtensions.join(", ")}</p>
              <p><strong>MIME:</strong> {supportedVideoMimeTypes.join(", ")}</p>
              <p><strong>Renditions:</strong> 360p, 480p, 720p, 1080p if supported by source</p>
              <p><strong>Output:</strong> HLS master playlist + segmented rendition folders</p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <article className="rounded-2xl border border-[var(--border)] bg-white p-4">
      <p className="text-xs font-black text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-3xl font-black text-[var(--electric)]">{typeof value === "number" ? value.toLocaleString("fa-IR") : value}</p>
    </article>
  );
}
