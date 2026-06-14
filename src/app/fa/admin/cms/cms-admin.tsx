import Link from "next/link";
import { saveContentAction, updateContentStatusAction } from "@/app/fa/admin/cms/actions";
import { isCmsConfigured, isValidCmsToken, tokenQuery } from "@/lib/cms-auth";
import { businessUnitLabels, crmBusinessUnits } from "@/lib/lead-routing";
import { cmsContentTypes, cmsContentPath, cmsStatuses, type CmsContentRow, type CmsContentType, listCmsContent } from "@/lib/cms";

const typeLabels: Record<CmsContentType, string> = {
  ACADEMY_ARTICLE: "مقاله آکادمی",
  VIDEO: "ویدئو",
  PROJECT_SHOWCASE: "نمونه‌کار",
  FEED_POST: "پست فید",
};

const sectionTypes: Record<string, CmsContentType | undefined> = {
  articles: "ACADEMY_ARTICLE",
  videos: "VIDEO",
  projects: "PROJECT_SHOWCASE",
  feed: "FEED_POST",
};

const sectionTitles: Record<string, string> = {
  all: "داشبورد محتوا",
  articles: "مقالات آکادمی",
  videos: "ویدئوها",
  projects: "نمونه‌کارها",
  feed: "فید روزانه",
};

export async function CmsAdminPage({ section = "all", token, query, status }: { section?: string; token?: string; query?: string; status?: string }) {
  const configured = isCmsConfigured();
  const authorized = isValidCmsToken(token);
  const type = sectionTypes[section];
  const returnPath = `/fa/admin/cms${section === "all" ? "" : `/${section}`}`;

  if (!configured || !authorized) {
    return <CmsLocked configured={configured} />;
  }

  const rows = await listCmsContent({
    type,
    status: cmsStatuses.includes(status as never) ? (status as never) : undefined,
    query,
    includeDrafts: true,
  });

  return (
    <main className="cms-admin-shell">
      <section className="cms-admin-hero">
        <div>
          <p className="eyebrow text-[var(--ice)]">Auto Makhsus CMS</p>
          <h1 className="mt-3 text-3xl font-black md:text-5xl">{sectionTitles[section] || "مدیریت محتوا"}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-white/68">
            مدیریت محتوای آکادمی، ویدئو، نمونه‌کار و فید با وضعیت پیش‌نویس/منتشرشده، سئو، واحد کسب‌وکار و مسیر انتشار امن.
          </p>
        </div>
        <Link className="btn-ghost-dark" href={`/fa${tokenQuery(token)}`}>بازگشت به سایت</Link>
      </section>

      <section className="cms-admin-grid">
        <aside className="cms-sidebar">
          <CmsNav token={token} />
          <CmsFilters token={token} section={section} query={query} status={status} />
        </aside>
        <div className="grid gap-6">
          <CmsStats rows={rows} />
          <CmsEditor token={token} section={section} returnPath={returnPath} />
          <CmsContentList rows={rows} token={token} returnPath={returnPath} />
        </div>
      </section>
    </main>
  );
}

function CmsLocked({ configured }: { configured: boolean }) {
  return (
    <main className="cms-admin-shell">
      <section className="cms-admin-hero">
        <div>
          <p className="eyebrow text-[var(--ice)]">CMS Locked</p>
          <h1 className="mt-3 text-3xl font-black md:text-5xl">مدیریت محتوا قفل است</h1>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-white/68">
            برای امنیت، این پنل فقط با توکن سروری `AUTOMAKHSUS_CMS_ADMIN_TOKEN` فعال می‌شود. تا زمان تنظیم توکن، هیچ مسیر ایجاد یا ویرایش محتوا در دسترس نیست.
          </p>
          <p className="mt-4 text-sm font-black text-white/80">
            وضعیت تنظیمات: {configured ? "توکن تنظیم شده؛ توکن معتبر در URL ارسال نشده است." : "توکن سروری هنوز تنظیم نشده است."}
          </p>
        </div>
      </section>
    </main>
  );
}

function CmsNav({ token }: { token?: string }) {
  const links = [
    ["داشبورد", "/fa/admin/cms"],
    ["مقالات", "/fa/admin/cms/articles"],
    ["ویدئوها", "/fa/admin/cms/videos"],
    ["نمونه‌کارها", "/fa/admin/cms/projects"],
    ["فید", "/fa/admin/cms/feed"],
  ];
  return (
    <nav className="cms-panel p-4">
      <p className="eyebrow">Content Types</p>
      <div className="mt-4 grid gap-2">
        {links.map(([label, href]) => (
          <Link key={href} className="cms-nav-link" href={`${href}${tokenQuery(token)}`}>{label}</Link>
        ))}
      </div>
    </nav>
  );
}

function CmsFilters({ token, section, query, status }: { token?: string; section: string; query?: string; status?: string }) {
  const path = `/fa/admin/cms${section === "all" ? "" : `/${section}`}`;
  return (
    <form className="cms-panel grid gap-3 p-4" action={path}>
      <input type="hidden" name="token" value={token || ""} />
      <p className="eyebrow">Filters</p>
      <input className="field" name="query" defaultValue={query || ""} placeholder="جستجو در عنوان، اسلاگ یا خلاصه" />
      <select className="field" name="status" defaultValue={status || ""}>
        <option value="">همه وضعیت‌ها</option>
        {cmsStatuses.map((item) => <option key={item} value={item}>{statusLabel(item)}</option>)}
      </select>
      <button className="btn-primary" type="submit">اعمال فیلتر</button>
    </form>
  );
}

function CmsStats({ rows }: { rows: CmsContentRow[] }) {
  const published = rows.filter((row) => row.status === "PUBLISHED").length;
  const draft = rows.filter((row) => row.status === "DRAFT").length;
  const archived = rows.filter((row) => row.status === "ARCHIVED").length;
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard label="منتشر شده" value={published} />
      <StatCard label="پیش‌نویس" value={draft} />
      <StatCard label="آرشیو" value={archived} />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="cms-panel p-5">
      <p className="text-sm font-black text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-4xl font-black text-[var(--electric)]">{value}</p>
    </article>
  );
}

function CmsEditor({ token, section, returnPath }: { token?: string; section: string; returnPath: string }) {
  const fixedType = sectionTypes[section];
  return (
    <section className="cms-panel p-5 md:p-7">
      <p className="eyebrow">Editor</p>
      <h2 className="mt-2 text-2xl font-black">ایجاد یا ویرایش محتوا</h2>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
        برای ویرایش یک آیتم موجود، همان نوع محتوا و همان slug را وارد کنید. CMS رکورد موجود را به‌روزرسانی می‌کند.
      </p>
      <form action={saveContentAction} className="mt-6 grid gap-4">
        <input type="hidden" name="token" value={token || ""} />
        <input type="hidden" name="returnPath" value={returnPath} />
        <div className="grid gap-4 md:grid-cols-3">
          <select className="field" name="contentType" defaultValue={fixedType || "ACADEMY_ARTICLE"}>
            {cmsContentTypes.map((item) => <option key={item} value={item}>{typeLabels[item]}</option>)}
          </select>
          <select className="field" name="status" defaultValue="DRAFT">
            {cmsStatuses.map((item) => <option key={item} value={item}>{statusLabel(item)}</option>)}
          </select>
          <select className="field" name="businessUnit" defaultValue="AUTOMAKHSUS_TECHNICAL">
            {crmBusinessUnits.map((item) => <option key={item} value={item}>{businessUnitLabels[item]}</option>)}
          </select>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <input className="field" name="title" required placeholder="عنوان" />
          <input className="field" name="slug" required placeholder="slug مثل bmw-diagnostics-guide" />
        </div>
        <textarea className="field min-h-24" name="excerpt" placeholder="خلاصه / توضیح متا" />
        <textarea className="field min-h-48" name="body" placeholder="متن اصلی محتوا" />
        <div className="grid gap-4 md:grid-cols-2">
          <input className="field" name="coverImage" placeholder="مسیر تصویر کاور یا مدیای تاییدشده" />
          <input className="field" name="ogImage" placeholder="تصویر Open Graph" />
          <input className="field" name="videoUrl" placeholder="URL ویدئو، فقط برای ویدئو" />
          <input className="field" name="duration" placeholder="مدت ویدئو، مثل 04:15" />
          <input className="field" name="vehicleBrand" placeholder="برند خودرو" />
          <input className="field" name="vehicleModel" placeholder="مدل خودرو" />
        </div>
        <textarea className="field min-h-28" name="transcript" placeholder="ترنسکریپت ویدئو" />
        <input className="field" name="serviceTags" placeholder="تگ‌های خدمت با کاما، مثل دیاگ, برق, BMW" />
        <div className="grid gap-4 md:grid-cols-2">
          <input className="field" name="seoTitle" placeholder="SEO title" />
          <input className="field" name="canonicalPath" placeholder="Canonical path، اختیاری" />
          <input className="field" name="ogTitle" placeholder="OG title" />
          <input className="field" name="authorName" placeholder="نویسنده" />
        </div>
        <textarea className="field min-h-24" name="metaDescription" placeholder="Meta description" />
        <textarea className="field min-h-24" name="ogDescription" placeholder="OG description" />
        <input className="field" name="reviewerName" placeholder="بازبین / reviewer placeholder" />
        <button className="btn-primary" type="submit">ذخیره محتوا</button>
      </form>
    </section>
  );
}

function CmsContentList({ rows, token, returnPath }: { rows: CmsContentRow[]; token?: string; returnPath: string }) {
  return (
    <section className="cms-panel p-5 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Content List</p>
          <h2 className="mt-2 text-2xl font-black">محتواها</h2>
        </div>
      </div>
      <div className="mt-6 grid gap-4">
        {rows.length ? rows.map((row) => (
          <article key={row.id} className="cms-content-row">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="cms-badge">{typeLabels[row.contentType]}</span>
                <span className={`cms-badge cms-badge-${row.status.toLowerCase()}`}>{statusLabel(row.status)}</span>
                <span className="cms-badge">{businessUnitLabels[row.businessUnit]}</span>
              </div>
              <h3 className="mt-3 text-xl font-black">{row.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{row.excerpt || row.slug}</p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs font-black text-[var(--muted)]">
                <span>slug: {row.slug}</span>
                <span>updated: {new Date(row.updatedAt).toLocaleDateString("fa-IR")}</span>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <Link className="btn-secondary" href={cmsContentPath(row.contentType, row.slug)}>پیش‌نمایش عمومی</Link>
              {(["DRAFT", "PUBLISHED", "ARCHIVED"] as const).map((status) => (
                status === row.status ? null : (
                  <form key={status} action={updateContentStatusAction}>
                    <input type="hidden" name="token" value={token || ""} />
                    <input type="hidden" name="id" value={row.id} />
                    <input type="hidden" name="status" value={status} />
                    <input type="hidden" name="returnPath" value={returnPath} />
                    <button className="btn-secondary w-full" type="submit">{statusLabel(status)}</button>
                  </form>
                )
              ))}
            </div>
          </article>
        )) : (
          <div className="rounded-3xl border border-dashed border-[var(--border)] p-8 text-center">
            <p className="font-black">هنوز محتوایی برای این فیلتر وجود ندارد.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function statusLabel(status: string) {
  if (status === "PUBLISHED") return "منتشر شده";
  if (status === "ARCHIVED") return "آرشیو";
  return "پیش‌نویس";
}
