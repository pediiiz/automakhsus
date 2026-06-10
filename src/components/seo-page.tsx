import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/lead-form";
import { brands, platformModules, servicePillars, trustSignals, visual } from "@/lib/site-data";

export function SeoJsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function PageHero({ eyebrow, title, subtitle, description, image }: { eyebrow: string; title: string; subtitle?: string; description: string; image: string }) {
  return (
    <section className="am-hero overflow-hidden py-14 text-white md:py-24">
      <div className="container-shell grid gap-10 md:grid-cols-[1.04fr_0.96fr] md:items-center">
        <div>
          <p className="eyebrow text-[var(--ice)]">{eyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-5xl font-black leading-tight md:text-7xl">{title}</h1>
          {subtitle ? <h2 className="mt-4 text-2xl font-black text-[var(--ice)] md:text-4xl">{subtitle}</h2> : null}
          <p className="mt-6 text-base leading-9 text-white/74 md:text-lg">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn-primary" href="/fa/brands">مشاهده برندها</Link>
            <a className="btn-ghost-dark" href="https://tehransandali.ir">ورود به تهران صندلی</a>
            <a className="btn-ghost-dark" href="https://ani2203.com/fa/booking">رزرو خدمات آنی سرویس</a>
            <Link className="btn-ghost-dark" href="/fa/cooperation">درخواست همکاری</Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-5 rounded-[2.5rem] bg-[var(--electric)]/22 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/7 p-3 shadow-2xl">
            <Image src={image} alt={title} width={1000} height={760} priority className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function BrandEcosystem() {
  return (
    <section className="section">
      <div className="container-shell">
        <p className="eyebrow">Brand Ecosystem</p>
        <h2 className="mt-3 text-3xl font-black md:text-5xl">پنج برند تخصصی، یک اکوسیستم خودرو</h2>
        <div className="mt-9 grid gap-5 md:grid-cols-5">
          {brands.map((brand) => (
            <a key={brand.slug} href={brand.url} className="brand-card group">
              <span className="mb-5 block h-1.5 w-14 rounded-full" style={{ background: brand.color }} />
              <h3 className="text-2xl font-black">{brand.name}</h3>
              <p className="mt-1 text-sm font-bold text-[var(--blue)]">{brand.fa}</p>
              <p className="mt-4 text-sm leading-8 text-[var(--muted)]">{brand.description}</p>
              <span className="mt-6 inline-flex text-sm font-black text-[var(--electric)]">مشاهده برند</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicePillars() {
  return (
    <section className="section bg-white">
      <div className="container-shell">
        <p className="eyebrow">Core Pillars</p>
        <h2 className="mt-3 text-3xl font-black md:text-5xl">از طراحی داخلی تا سرویس مولتی‌برند و پلتفرم دیجیتال</h2>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {servicePillars.map((item) => (
            <article key={item.slug} className="card p-6">
              <h3 className="text-2xl font-black">{item.title}</h3>
              <p className="mt-4 text-sm leading-8 text-[var(--muted)]">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustStats() {
  return (
    <section className="section bg-[#07111f] text-white">
      <div className="container-shell grid gap-5 md:grid-cols-4">
        {trustSignals.map((item) => (
          <article key={item} className="rounded-[1.4rem] border border-white/10 bg-white/[0.055] p-6">
            <p className="text-xl font-black leading-9">{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function DigitalPlatform() {
  return (
    <section className="section">
      <div className="container-shell grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <Image src={visual.platform} alt="پلتفرم دیجیتال Auto Makhsus" width={1000} height={760} className="rounded-[2rem] object-cover shadow-2xl" />
        <div>
          <p className="eyebrow">Digital Platform</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">زیرساخت دیجیتال برای CRM، مشتری و عملیات</h2>
          <p className="mt-5 text-base leading-9 text-[var(--muted)]">
            Auto Makhsus فقط مجموعه‌ای از سایت‌ها نیست؛ یک زیرساخت عملیاتی برای مدیریت لید، مشتری، پروژه، رزرو، رسانه، سفارش کار و رهگیری پیشرفت است.
          </p>
          <div className="mt-7 grid gap-3 md:grid-cols-2">
            {platformModules.map((item) => (
              <article key={item.title} className="rounded-2xl border border-[var(--border)] bg-white p-4">
                <h3 className="font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LeadSection({ sourcePage, interest }: { sourcePage: string; interest?: string }) {
  return (
    <section id="lead" className="section">
      <div className="container-shell grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-center">
        <div>
          <p className="eyebrow">Cooperation</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">برای همکاری، اتصال برند یا خدمات سازمانی پیام بگذارید</h2>
          <p className="mt-5 text-base leading-9 text-[var(--muted)]">
            فرم‌های Auto Makhsus با منبع automakhsus در CRM ثبت می‌شوند تا مسیر همکاری، معرفی برند یا درخواست سازمانی قابل پیگیری باشد.
          </p>
        </div>
        <LeadForm sourcePage={sourcePage} interest={interest} />
      </div>
    </section>
  );
}
