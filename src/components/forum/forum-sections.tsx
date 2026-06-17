import Link from "next/link";
import { LeadSection } from "@/components/seo-page";
import { forumCategories, forumTopicPath, forumTopics, type ForumTopic } from "@/lib/forum-data";

const statusLabels: Record<ForumTopic["status"], string> = {
  OPEN: "باز",
  PINNED: "سنجاق‌شده",
  LOCKED: "قفل‌شده",
};

export function ForumHome() {
  return (
    <main>
      <section className="platform-hero tech-grid relative isolate overflow-hidden bg-[#07111f] py-16 text-white md:py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow text-[var(--ice)]">Forum Foundation</p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-7xl">انجمن تخصصی خودروهای خارجی</h1>
            <p className="mt-6 max-w-3xl text-base leading-9 text-white/70">
              ساختار کنترل‌شده انجمن Auto Makhsus برای گروه‌ها، موضوعات، پاسخ پذیرفته‌شده، pin/lock، گزارش تخلف و moderation. نوشتن عمومی تا زمان احراز هویت و moderation فعال نیست.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary" href="/fa/community/questions">سوالات پرتکرار</Link>
              <Link className="btn-ghost-dark" href="/fa/services">درخواست مشاوره</Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur">
            <p className="text-sm font-black text-[var(--ice)]">Moderation Policy</p>
            <div className="mt-5 grid gap-3">
              {["بدون نوشتن عمومی بدون احراز هویت", "موضوعات pin/lock برای کنترل کیفیت", "گزارش/flag برای محتوای نامناسب", "لید فنی به CRM از مسیر CTA"].map((item) => (
                <span key={item} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white/75">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-shell">
          <div className="shift-section-head">
            <p className="eyebrow">Categories</p>
            <h2>گروه‌های انجمن</h2>
            <p>دسته‌ها فعلاً خواندنی و کنترل‌شده هستند؛ هر گروه بعداً می‌تواند به نقش کاربر، moderation queue و ضداسپم وصل شود.</p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {forumCategories.map((category) => (
              <article key={category.slug} id={category.slug} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-2xl font-black text-[#07111f]">{category.title}</h3>
                <p className="mt-3 text-sm leading-8 text-slate-600">{category.description}</p>
                <div className="mt-5 grid gap-3">
                  {category.groups.map((group) => (
                    <div key={group.slug} className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="flex items-start justify-between gap-3">
                        <strong>{group.title}</strong>
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{group.topicCount.toLocaleString("fa-IR")} موضوع</span>
                      </div>
                      <p className="mt-2 text-xs leading-6 text-slate-500">{group.description}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#07111f] text-white">
        <div className="container-shell">
          <div className="shift-section-head">
            <p className="eyebrow text-[var(--ice)]">Topics</p>
            <h2>موضوعات نمونه</h2>
            <p className="text-white/65">موضوعات seed-safe هستند و برای نمایش ساختار تا قبل از فعال‌سازی posting عمومی استفاده می‌شوند.</p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {forumTopics.map((topic) => (
              <Link key={topic.slug} href={forumTopicPath(topic.slug)} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 transition hover:-translate-y-1 hover:border-[var(--ice)]">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black">{statusLabels[topic.status]}</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black">{topic.replyCount.toLocaleString("fa-IR")} پاسخ</span>
                </div>
                <h3 className="mt-4 text-xl font-black">{topic.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{topic.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {topic.tags.map((tag, index) => <span key={`${topic.slug}-tag-${index}-${tag}`} className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold text-blue-100">{tag}</span>)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LeadSection sourcePage="/fa/forum" interest="انجمن Auto Makhsus و سوال فنی" />
    </main>
  );
}

export function ForumTopicDetail({ topic }: { topic: ForumTopic }) {
  return (
    <main>
      <section className="platform-hero tech-grid bg-[#07111f] py-16 text-white md:py-24">
        <div className="container-shell">
          <Link href="/fa/forum" className="text-sm font-black text-[var(--ice)]">بازگشت به انجمن</Link>
          <h1 className="mt-5 max-w-5xl text-4xl font-black leading-tight md:text-6xl">{topic.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-9 text-white/70">{topic.excerpt}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-black">{statusLabels[topic.status]}</span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-black">{topic.authorLabel}</span>
          </div>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container-shell grid gap-6 lg:grid-cols-[1fr_0.42fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <p className="eyebrow">Accepted Answer</p>
            <h2 className="mt-3 text-3xl font-black text-[#07111f]">پاسخ پذیرفته‌شده</h2>
            <p className="mt-5 text-base leading-9 text-slate-700">{topic.acceptedAnswer || "پاسخ پذیرفته‌شده بعد از moderation نمایش داده می‌شود."}</p>
          </article>
          <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="font-black text-[#07111f]">وضعیت moderation</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              <span>Pin/Lock: {statusLabels[topic.status]}</span>
              <span>Reply count: {topic.replyCount.toLocaleString("fa-IR")}</span>
              <span>Public write: غیرفعال تا احراز هویت</span>
              <span>Report/flag: معماری آماده، اجرای عمومی آینده</span>
            </div>
            <Link className="btn-primary mt-6 w-full" href="/fa/services">درخواست بررسی تخصصی</Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
