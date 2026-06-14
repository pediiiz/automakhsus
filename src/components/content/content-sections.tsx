import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { LeadSection, SeoJsonLd } from "@/components/seo-page";
import type { ContentCard, ProjectContent, QuestionContent, VehicleBrand, VehicleGeneration, VehicleModel, VideoContent } from "@/lib/content-data";
import { academyArticles, ecosystemLinks, projects, videos } from "@/lib/content-data";
import { absolute, marketplaceCategories, technicalServices } from "@/lib/site-data";
import { breadcrumbSchema } from "@/lib/seo";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
};

export function ContentHero({ eyebrow, title, description, image }: SectionIntroProps) {
  return (
    <section className="content-hero tech-grid relative isolate overflow-hidden bg-[#07111f] py-16 text-white md:py-24">
      <div className="hero-glow hero-glow-a" />
      <div className="container-shell relative z-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow text-[var(--ice)]">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">{title}</h1>
          <p className="mt-5 text-base leading-9 text-white/70 md:text-lg">{description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className="btn-primary" href="#lead">درخواست مشاوره</Link>
            <Link className="btn-ghost-dark" href="/fa/services">رزرو سرویس</Link>
            <Link className="btn-ghost-dark" href="/fa/cars">انتخاب برند خودرو</Link>
          </div>
        </div>
        {image ? (
          <div className="platform-window">
            <Image src={image} alt={title} width={1000} height={700} priority sizes="(max-width: 1024px) 100vw, 48vw" className="aspect-[16/10] w-full rounded-[1.35rem] object-cover" />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function EcosystemContentLinks() {
  return (
    <section className="section bg-white">
      <div className="container-shell">
        <p className="eyebrow">Content Ecosystem</p>
        <h2 className="mt-3 max-w-4xl text-3xl font-black md:text-5xl">محتوا، آموزش، ویدئو و دانشنامه برای مالک خودرو خارجی</h2>
        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {ecosystemLinks.map((item) => (
            <Link key={item.href} href={item.href} className="content-link-card group" style={{ "--content-accent": item.accent } as CSSProperties}>
              <span className="content-link-icon">{item.title.slice(0, 2)}</span>
              <h3 className="mt-5 text-2xl font-black">{item.fa}</h3>
              <p className="mt-3 text-sm leading-8 text-[var(--muted)]">{item.description}</p>
              <span className="mt-6 inline-flex text-sm font-black text-[var(--electric)]">مشاهده بخش</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContentDiscoveryNav() {
  return (
    <nav className="content-discovery" aria-label="ناوبری محتوایی Auto Makhsus">
      <div className="container-shell flex gap-2 overflow-x-auto py-3">
        {ecosystemLinks.map((item) => (
          <Link key={item.href} href={item.href} className="content-discovery-link" style={{ "--content-accent": item.accent } as CSSProperties}>
            {item.fa}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function ContentGrid({ items, basePath }: { items: ContentCard[]; basePath: string }) {
  return (
    <section className="section bg-[linear-gradient(180deg,#f6f9ff_0%,#ffffff_100%)]">
      <div className="container-shell grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <Link key={item.slug} href={`${basePath}/${item.slug}`} className="content-card group">
            <Image src={item.image} alt={item.title} width={720} height={460} sizes="(max-width: 768px) 100vw, 33vw" className="aspect-[16/10] w-full rounded-[1.05rem] object-cover" />
            <div className="p-5">
              <p className="eyebrow">{item.eyebrow}</p>
              <h2 className="mt-2 text-2xl font-black">{item.title}</h2>
              <p className="mt-3 text-sm leading-8 text-[var(--muted)]">{item.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[item.category, ...item.tags.slice(0, 2)].map((tag) => (
                  <span key={tag} className="rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-sky-900">{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ContentDetail({ item, schema }: { item: ContentCard; schema?: object }) {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: item.category, url: absolute(item.path) }])} />
      {schema ? <SeoJsonLd data={schema} /> : null}
      <ContentHero eyebrow={item.eyebrow} title={item.title} description={item.description} image={item.image} />
      <section className="section bg-white">
        <div className="container-shell grid gap-8 lg:grid-cols-[1fr_320px]">
          <article className="card p-6 md:p-9">
            <div className="flex flex-wrap gap-2">
              {[item.category, item.service, ...item.tags].map((tag) => <span key={tag} className="rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-sky-900">{tag}</span>)}
            </div>
            <p className="mt-7 text-lg leading-10 text-[var(--muted)]">{item.summary}</p>
            <div className="mt-8 grid gap-6">
              {item.sections.map((section) => (
                <section key={section.title} className="rounded-[1.25rem] border border-[var(--border)] bg-white p-5">
                  <h2 className="text-2xl font-black">{section.title}</h2>
                  <p className="mt-3 leading-9 text-[var(--muted)]">{section.body}</p>
                </section>
              ))}
            </div>
            <FaqBlock faqs={item.faqs} />
          </article>
          <aside className="grid content-start gap-4">
            <div className="card p-5">
              <p className="eyebrow">Related Services</p>
              <div className="mt-4 grid gap-2">
                {item.relatedServices.map((slug) => {
                  const service = technicalServices.find((entry) => entry.slug === slug) || marketplaceCategories.find((entry) => entry.slug === slug);
                  return <Link key={slug} href="/fa/services" className="rounded-2xl border border-[var(--border)] p-3 text-sm font-black transition hover:border-[var(--electric)]">{service?.title || slug}</Link>;
                })}
              </div>
            </div>
            <div className="card p-5">
              <p className="eyebrow">Internal Links</p>
              <div className="mt-4 grid gap-2 text-sm font-black">
                <Link href="/fa/cars">دانشنامه خودرو</Link>
                <Link href="/fa/projects">نمونه‌کارها</Link>
                <Link href="/fa/videos">ویدئوها</Link>
                <Link href="/fa/community/questions">پرسش‌وپاسخ</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <LeadSection sourcePage={item.path} interest={item.service} />
    </main>
  );
}

export function VideoDetail({ item, schema }: { item: VideoContent; schema: object }) {
  return (
    <main>
      <SeoJsonLd data={schema} />
      <ContentHero eyebrow={item.eyebrow} title={item.title} description={item.description} image={item.poster} />
      <section className="section bg-white">
        <div className="container-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="video-frame">
            <Image src={item.poster} alt={`پوستر ${item.title}`} width={1100} height={620} sizes="(max-width: 1024px) 100vw, 56vw" className="aspect-video w-full rounded-[1.35rem] object-cover" />
            <span className="video-play">▶</span>
            <span className="video-duration">{item.duration}</span>
          </div>
          <article className="card p-7 md:p-8">
            <p className="eyebrow">Video Brief</p>
            <h2 className="mt-3 text-3xl font-black">آنچه در این ویدئو می‌بینید</h2>
            <p className="mt-4 text-lg leading-10 text-[var(--muted)]">{item.summary}</p>
            <div className="mt-6 grid gap-2">
              {[item.category, item.service, ...item.tags].map((tag) => <span key={tag} className="rounded-full bg-sky-50 px-3 py-2 text-xs font-black text-sky-900">{tag}</span>)}
            </div>
          </article>
        </div>
        <div className="container-shell mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="card p-7">
            <p className="eyebrow">Chapters</p>
            <h2 className="mt-3 text-3xl font-black">فصل‌های ویدئو</h2>
            <div className="mt-6 grid gap-3">
              {item.chapters.map((chapter) => (
                <div key={`${chapter.time}-${chapter.title}`} className="chapter-row">
                  <span>{chapter.time}</span>
                  <div>
                    <h3 className="font-black">{chapter.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-[var(--muted)]">{chapter.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
          <article className="card p-7">
            <p className="eyebrow">Transcript</p>
            <h2 className="mt-3 text-3xl font-black">ترنسکریپت و توضیح</h2>
            <p className="mt-4 leading-9 text-[var(--muted)]">{item.transcript}</p>
          </article>
        </div>
        <div className="container-shell mt-8 grid gap-6 lg:grid-cols-2">
          <article className="card p-7">
            <p className="eyebrow">Related Services</p>
            <h2 className="mt-3 text-2xl font-black">سرویس‌های مرتبط</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {item.relatedServices.map((slug) => {
                const service = technicalServices.find((entry) => entry.slug === slug) || marketplaceCategories.find((entry) => entry.slug === slug);
                return <Link key={slug} href="/fa/services" className="rounded-2xl border border-[var(--border)] p-4 text-sm font-black transition hover:border-[var(--electric)]">{service?.title || slug}</Link>;
              })}
            </div>
          </article>
          <article className="card p-7">
            <p className="eyebrow">Related Cars</p>
            <h2 className="mt-3 text-2xl font-black">برند و مدل مرتبط</h2>
            <div className="mt-5 grid gap-3">
              {item.relatedCars.map((car) => (
                <Link key={car.href} href={car.href} className="rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-950 transition hover:bg-sky-50 hover:text-[var(--electric)]">
                  {car.brand}{car.model ? ` / ${car.model}` : ""}
                </Link>
              ))}
            </div>
          </article>
        </div>
      </section>
      <section className="section bg-[linear-gradient(180deg,#f6f9ff_0%,#ffffff_100%)]">
        <div className="container-shell grid gap-6 lg:grid-cols-[1fr_320px]">
          <article className="card p-6 md:p-9">
            <p className="eyebrow">Video Notes</p>
            <div className="mt-8 grid gap-6">
              {item.sections.map((section) => (
                <section key={section.title} className="rounded-[1.25rem] border border-[var(--border)] bg-white p-5">
                  <h2 className="text-2xl font-black">{section.title}</h2>
                  <p className="mt-3 leading-9 text-[var(--muted)]">{section.body}</p>
                </section>
              ))}
            </div>
            <FaqBlock faqs={item.faqs} />
          </article>
          <aside className="grid content-start gap-4">
            <div className="card p-5">
              <p className="eyebrow">Continue</p>
              <div className="mt-4 grid gap-2 text-sm font-black">
                <Link href="/fa/videos">همه ویدئوها</Link>
                <Link href="/fa/academy">مقالات آموزشی</Link>
                <Link href="/fa/projects">نمونه‌کارها</Link>
                <Link href="/fa/cars">دانشنامه خودرو</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <LeadSection sourcePage={item.path} interest={item.service} />
    </main>
  );
}

export function ProjectDetail({ item }: { item: ProjectContent }) {
  return (
    <main>
      <ContentHero eyebrow={item.eyebrow} title={item.title} description={item.description} image={item.image} />
      <section className="section bg-white">
        <div className="container-shell">
          <div className="grid gap-4 md:grid-cols-3">
            {item.stages.map((stage) => (
              <article key={stage.title} className="stage-card">
                <p className="eyebrow">{stage.title}</p>
                <p className="mt-3 leading-8 text-[var(--muted)]">{stage.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <article className="card p-6">
              <p className="eyebrow">Vehicle</p>
              <h2 className="mt-2 text-3xl font-black">{item.vehicle}</h2>
              <p className="mt-3 text-sm font-black text-[var(--electric)]">زمان اجرا: {item.executionTime}</p>
            </article>
            <article className="card p-6">
              <p className="eyebrow">Project Notes</p>
              {item.sections.map((section) => (
                <div key={section.title} className="mt-4">
                  <h3 className="font-black">{section.title}</h3>
                  <p className="mt-2 leading-8 text-[var(--muted)]">{section.body}</p>
                </div>
              ))}
            </article>
          </div>
        </div>
      </section>
      <LeadSection sourcePage={item.path} interest={`درخواست مشاوره ${item.service}`} />
    </main>
  );
}

export function CommunityHome({ questions }: { questions: QuestionContent[] }) {
  return (
    <main>
      <ContentHero eyebrow="Community Foundation" title="کامیونیتی Auto Makhsus" description="فاز اول کامیونیتی، یک ساختار خواندنی و کنترل‌شده برای دسته‌ها، سوالات پرتکرار و پاسخ‌های پذیرفته‌شده است. ارسال عمومی هنوز فعال نیست." image="/uploads/automakhsus/hero/brand-network.svg" />
      <section className="section bg-white">
        <div className="container-shell grid gap-5 md:grid-cols-3">
          {["عیب‌یابی", "نگهداری", "قطعات", "آپشن", "دیتیلینگ", "کارشناسی قبل خرید"].map((category) => (
            <article key={category} className="card p-6">
              <p className="eyebrow">Question Category</p>
              <h2 className="mt-2 text-2xl font-black">{category}</h2>
              <p className="mt-3 text-sm leading-8 text-[var(--muted)]">دسته‌بندی آماده برای پرسش‌های reviewed و SEO-friendly.</p>
            </article>
          ))}
        </div>
      </section>
      <ContentGrid items={questions} basePath="/fa/community/questions" />
      <LeadSection sourcePage="/fa/community" interest="سوال فنی خودرو خارجی" />
    </main>
  );
}

export function QuestionDetail({ item, schema }: { item: QuestionContent; schema: object }) {
  return (
    <main>
      <SeoJsonLd data={schema} />
      <ContentHero eyebrow={item.eyebrow} title={item.title} description={item.description} image={item.image} />
      <section className="section bg-white">
        <div className="container-shell grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="card p-7">
            <p className="eyebrow">Question</p>
            <p className="mt-4 text-lg leading-10 text-[var(--muted)]">{item.sections[0]?.body}</p>
          </article>
          <article className="accepted-answer">
            <p className="eyebrow text-emerald-200">Accepted Answer Placeholder</p>
            <h2 className="mt-3 text-3xl font-black text-white">پاسخ پذیرفته‌شده</h2>
            <p className="mt-4 leading-9 text-white/72">{item.acceptedAnswer}</p>
          </article>
        </div>
      </section>
      <LeadSection sourcePage={item.path} interest={item.service} />
    </main>
  );
}

export function VehicleBrandGrid({ brands }: { brands: VehicleBrand[] }) {
  return (
    <section className="section bg-[linear-gradient(180deg,#f6f9ff_0%,#ffffff_100%)]">
      <div className="container-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {brands.map((brand) => (
          <Link key={brand.slug} href={`/fa/cars/${brand.slug}`} className="vehicle-card">
            <span className="vehicle-mark">{brand.name.slice(0, 2)}</span>
            <h2 className="mt-5 text-2xl font-black">{brand.fa}</h2>
            <p className="mt-2 text-sm font-black text-[var(--electric)]">{brand.name}</p>
            <p className="mt-4 text-sm leading-8 text-[var(--muted)]">{brand.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {brand.services.slice(0, 3).map((service) => <span key={service} className="rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-sky-900">{service}</span>)}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function VehicleBrandDetail({ brand, model, generation, schema }: { brand: VehicleBrand; model?: VehicleModel; generation?: VehicleGeneration; schema: object }) {
  const title = generation && model ? `${model.fa} نسل ${generation.name} در Auto Makhsus` : model ? `${model.fa} در Auto Makhsus` : `خدمات ${brand.fa} در Auto Makhsus`;
  const description = generation?.note || model?.intro || brand.description;
  const issues = model?.commonIssues || brand.commonIssues;
  const diagnostics = model?.diagnostics || brand.diagnostics;
  const parts = model?.parts || brand.parts;
  const packages = model?.servicePackages || brand.servicePackages;
  const faqs = model?.faqs || brand.faqs;
  const imageMeta = generation?.image || model?.image;
  const sourcePage = generation && model ? `/fa/cars/${brand.slug}/${model.slug}/${generation.slug}` : model ? `/fa/cars/${brand.slug}/${model.slug}` : `/fa/cars/${brand.slug}`;
  const relatedProjects = projects.filter((item) => item.brand === brand.name || item.brand === brand.fa || (model && item.model === model.name)).slice(0, 2);
  const relatedVideos = videos.filter((item) => item.relatedCars.some((car) => car.href.includes(`/fa/cars/${brand.slug}`)) || item.tags.includes(brand.name)).slice(0, 2);
  const relatedArticles = academyArticles.filter((item) => item.tags.some((tag) => ["دیاگ", "سرویس دوره‌ای", "کارشناسی قبل خرید", "قطعات مصرفی"].includes(tag))).slice(0, 2);
  return (
    <main>
      <SeoJsonLd data={schema} />
      <ContentHero eyebrow={brand.name} title={title} description={description} image="/uploads/automakhsus/generated/hero-automotive-ecosystem.png" />
      <section className="section bg-white">
        <div className="container-shell grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="card p-7">
            <p className="eyebrow">Services</p>
            <h2 className="mt-3 text-3xl font-black">خدمات مرتبط</h2>
            <div className="mt-5 grid gap-3">
              {brand.services.map((service) => <span key={service} className="rounded-2xl border border-[var(--border)] p-4 font-black">{service}</span>)}
            </div>
          </article>
          <article className="card p-7">
            <p className="eyebrow">Common Issues</p>
            <h2 className="mt-3 text-3xl font-black">مشکلات رایج و نکات نگهداری</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {issues.map((issue) => <p key={issue} className="rounded-2xl bg-sky-50 p-4 text-sm font-black text-sky-950">{issue}</p>)}
              {model?.maintenance.map((item) => <p key={item} className="rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-900">{item}</p>)}
            </div>
          </article>
        </div>
        <div className="container-shell mt-8 grid gap-5 lg:grid-cols-3">
          <VehicleInfoPanel title="دیاگ و عیب‌یابی" items={diagnostics} />
          <VehicleInfoPanel title="قطعات و خرید + نصب" items={parts} />
          <VehicleInfoPanel title="آپشن و دیتیلینگ" items={[...brand.options, ...brand.detailing].slice(0, 6)} />
        </div>
        <div className="container-shell mt-8">
          <article className="card p-7">
            <p className="eyebrow">Service Packages</p>
            <h2 className="mt-3 text-3xl font-black">پکیج‌های پیشنهادی {generation && model ? `${model.fa} نسل ${generation.name}` : model?.fa || brand.fa}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {packages.map((entry) => (
                <div key={entry.title} className="service-package-card">
                  <h3 className="text-xl font-black">{entry.title}</h3>
                  <p className="mt-3 text-sm leading-8 text-[var(--muted)]">{entry.body}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
        {!model && brand.models.length ? (
          <div className="container-shell mt-8 grid gap-4 md:grid-cols-2">
            {brand.models.map((entry) => (
              <Link key={entry.slug} className="card p-6 transition hover:-translate-y-1 hover:border-[var(--electric)]" href={`/fa/cars/${brand.slug}/${entry.slug}`}>
                <p className="eyebrow">Model Hub</p>
                <h3 className="mt-2 text-2xl font-black">{entry.fa}</h3>
                <p className="mt-3 text-sm leading-8 text-[var(--muted)]">{entry.intro}</p>
              </Link>
            ))}
          </div>
        ) : null}
        {model?.generations?.length ? (
          <div className="container-shell mt-8">
            <article className="card p-7">
              <p className="eyebrow">Generations</p>
              <h2 className="mt-3 text-3xl font-black">نسل‌ها و بازه‌های سال {model.fa}</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {model.generations.map((entry) => {
                  const active = generation?.slug === entry.slug;
                  return (
                    <Link
                      key={entry.slug}
                      href={`/fa/cars/${brand.slug}/${model.slug}/${entry.slug}`}
                      className={`rounded-[1.2rem] border p-5 transition hover:-translate-y-1 ${active ? "border-[var(--electric)] bg-sky-50 shadow-[0_20px_55px_rgba(11,92,255,0.16)]" : "border-[var(--border)] bg-white hover:border-[var(--electric)]"}`}
                    >
                      <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">{entry.years}</span>
                      <h3 className="mt-4 text-2xl font-black">{entry.name}</h3>
                      <p className="mt-3 text-sm leading-8 text-[var(--muted)]">{entry.note}</p>
                    </Link>
                  );
                })}
              </div>
            </article>
          </div>
        ) : null}
        {imageMeta ? (
          <div className="container-shell mt-8">
            <article className="rounded-[1.25rem] border border-dashed border-sky-200 bg-sky-50/70 p-6">
              <p className="eyebrow">Image Policy</p>
              <h2 className="mt-2 text-2xl font-black">وضعیت تصویر و مجوز استفاده</h2>
              <div className="mt-4 grid gap-3 text-sm leading-8 text-slate-700 md:grid-cols-3">
                <p><strong className="text-slate-950">مسیر:</strong> {imageMeta.path}</p>
                <p><strong className="text-slate-950">منبع:</strong> {imageMeta.source}</p>
                <p><strong className="text-slate-950">مجوز:</strong> {imageMeta.license}</p>
              </div>
              <p className="mt-3 text-xs leading-7 text-slate-500">تا زمانی که تصویر دارای مجوز روشن و قابل استناد نباشد، از تصویر عمومی داخلی/خنثی استفاده می‌شود و هیچ تصویر نامطمئن یا هات‌لینک‌شده در تولید قرار نمی‌گیرد.</p>
            </article>
          </div>
        ) : null}
      </section>
      <section className="section bg-[linear-gradient(180deg,#f6f9ff_0%,#ffffff_100%)]">
        <div className="container-shell grid gap-6 lg:grid-cols-3">
          <RelatedContentCard title="مقالات آموزشی مرتبط" items={relatedArticles.map((item) => ({ title: item.title, href: item.path, description: item.summary }))} fallbackHref="/fa/academy" />
          <RelatedContentCard title="ویدئوهای مرتبط" items={relatedVideos.map((item) => ({ title: item.title, href: item.path, description: item.summary }))} fallbackHref="/fa/videos" />
          <RelatedContentCard title="نمونه‌کارهای مرتبط" items={relatedProjects.map((item) => ({ title: item.title, href: item.path, description: item.summary }))} fallbackHref="/fa/projects" />
        </div>
      </section>
      <section className="section bg-white">
        <div className="container-shell">
          <FaqBlock faqs={faqs} />
        </div>
      </section>
      <section className="section bg-[#07111f] text-white">
        <div className="container-shell grid gap-5 md:grid-cols-3">
          <Link href="/fa/academy" className="dark-mini-card">مقالات آموزشی مرتبط</Link>
          <Link href="/fa/videos" className="dark-mini-card">ویدئوهای مرتبط</Link>
          <Link href="/fa/projects" className="dark-mini-card">نمونه‌کارهای مرتبط</Link>
        </div>
      </section>
      <LeadSection sourcePage={sourcePage} interest={`رزرو سرویس ${generation && model ? `${model.fa} نسل ${generation.name}` : model?.fa || brand.fa}`} />
    </main>
  );
}

function VehicleInfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="vehicle-info-panel">
      <h2 className="text-2xl font-black">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => <p key={item} className="rounded-2xl bg-white p-4 text-sm font-black text-slate-950 shadow-sm">{item}</p>)}
      </div>
    </article>
  );
}

function RelatedContentCard({ title, items, fallbackHref }: { title: string; items: { title: string; href: string; description: string }[]; fallbackHref: string }) {
  return (
    <article className="card p-6">
      <h2 className="text-2xl font-black">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.length ? items.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-2xl border border-[var(--border)] p-4 transition hover:border-[var(--electric)]">
            <h3 className="font-black">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
          </Link>
        )) : (
          <Link href={fallbackHref} className="rounded-2xl border border-[var(--border)] p-4 font-black text-[var(--electric)]">مشاهده آرشیو</Link>
        )}
      </div>
    </article>
  );
}

function FaqBlock({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <section className="mt-8">
      <p className="eyebrow">FAQ</p>
      <div className="mt-4 grid gap-3">
        {faqs.map((faq) => (
          <article key={faq.question} className="rounded-[1.2rem] border border-[var(--border)] bg-slate-50 p-5">
            <h3 className="font-black">{faq.question}</h3>
            <p className="mt-2 text-sm leading-8 text-[var(--muted)]">{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
