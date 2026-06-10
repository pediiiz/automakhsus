import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { LeadForm } from "@/components/lead-form";
import { brands, platformModules, servicePillars, trustSignals, visual } from "@/lib/site-data";

const ecosystemBranches = [
  { title: "Automotive Interiors", fa: "طراحی داخلی خودرو", brands: ["TehranSandali", "TehranSeat"], accent: "#2F80ED" },
  { title: "Seats", fa: "صندلی و ارتقا", brands: ["MrSeat", "TehranSeat"], accent: "#8FD3FF" },
  { title: "Upholstery", fa: "تودوزی فابریکی", brands: ["Tuduzi", "TehranSandali"], accent: "#4DA3FF" },
  { title: "Multi-brand Service", fa: "سرویس مولتی‌برند", brands: ["ANI2203"], accent: "#BDE9FF" },
  { title: "Digital CRM Platform", fa: "پلتفرم دیجیتال", brands: ["Auto Makhsus", "All Brands"], accent: "#0B5CFF" },
];

type StyleVars = CSSProperties & Record<`--${string}`, string>;

export function SeoJsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function PageHero({ eyebrow, title, subtitle, description, image }: { eyebrow: string; title: string; subtitle?: string; description: string; image: string }) {
  return (
    <section className="am-hero tech-grid relative isolate overflow-hidden py-16 text-white md:py-24">
      <div className="hero-glow hero-glow-a" />
      <div className="hero-glow hero-glow-b" />
      <div className="container-shell relative z-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--ice)]">{eyebrow}</p>
          <h1 className="mt-5 text-5xl font-black leading-tight md:text-7xl">{title}</h1>
          {subtitle ? <h2 className="mt-4 text-2xl font-black text-[var(--ice)] md:text-4xl">{subtitle}</h2> : null}
          <p className="mt-6 text-base leading-9 text-white/74 md:text-lg">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn-primary" href="/fa/brands">مشاهده برندها</Link>
            <a className="btn-ghost-dark" href="https://tehransandali.ir">ورود به تهران صندلی</a>
            <a className="btn-ghost-dark" href="https://ani2203.com/fa/booking">رزرو خدمات آنی سرویس</a>
            <Link className="btn-ghost-dark" href="/fa/cooperation">درخواست همکاری</Link>
          </div>
          <div className="mt-9 grid max-w-2xl grid-cols-3 gap-3">
            {["5 برند", "6 حوزه تخصصی", "CRM مرکزی"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur">
                <span className="text-sm font-black text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="orbit-card">
            <Image src={image} alt="نمای سینمایی از اکوسیستم خودرو Auto Makhsus" width={1000} height={760} priority sizes="(max-width: 1024px) 100vw, 52vw" className="aspect-[16/11] w-full rounded-[1.6rem] object-cover" />
            <div className="orbit-map" aria-hidden="true">
              <span className="orbit-center">Auto<br />Makhsus</span>
              {brands.map((brand, index) => (
                <span key={brand.slug} className={`orbit-node orbit-node-${index + 1}`} style={{ "--node-color": brand.color } as StyleVars}>
                  {brand.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EcosystemMap() {
  return (
    <section className="section bg-[#07111f] text-white">
      <div className="container-shell">
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--ice)]">Ecosystem Map</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">نقشه تصویری برندها و عملیات Auto Makhsus</h2>
          <p className="mt-5 text-base leading-9 text-white/64">
            هر برند بخشی از زنجیره تخصصی خودرو را پوشش می‌دهد و همه از یک هسته دیجیتال، عملیاتی و مدیریتی تغذیه می‌شوند.
          </p>
        </div>
        <div className="ecosystem-map mt-10">
          <div className="ecosystem-core">
            <span className="text-sm font-black text-[var(--ice)]">Parent Brand</span>
            <strong>Auto Makhsus</strong>
            <small>CRM • Operations • Lead Flow</small>
          </div>
          {ecosystemBranches.map((branch, index) => (
            <article key={branch.title} className={`ecosystem-branch ecosystem-branch-${index + 1}`} style={{ "--branch-color": branch.accent } as StyleVars}>
              <span className="branch-line" />
              <div>
                <p className="text-sm font-black text-[var(--ice)]">{branch.title}</p>
                <h3 className="mt-1 text-xl font-black">{branch.fa}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {branch.brands.map((item) => (
                    <span key={item} className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-black text-white/80">{item}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BrandEcosystem() {
  return (
    <section className="section bg-[linear-gradient(180deg,#f6f9ff_0%,#ffffff_100%)]">
      <div className="container-shell">
        <p className="eyebrow">Brand Ecosystem</p>
        <h2 className="mt-3 text-3xl font-black md:text-5xl">پنج برند تخصصی، یک اکوسیستم خودرو</h2>
        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {brands.map((brand) => (
            <a key={brand.slug} href={brand.url} className="brand-card motion-card group" style={{ "--brand-color": brand.color } as StyleVars}>
              <span className="brand-icon">{brand.icon}</span>
              <h3 className="mt-7 text-2xl font-black">{brand.name}</h3>
              <p className="mt-1 text-sm font-bold text-[var(--blue)]">{brand.fa}</p>
              <p className="mt-4 text-sm leading-8 text-[var(--muted)]">{brand.description}</p>
              <span className="mt-auto inline-flex pt-6 text-sm font-black text-[var(--electric)]">مشاهده برند</span>
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
        <h2 className="mt-3 max-w-4xl text-3xl font-black md:text-5xl">شش ستون عملیاتی برای یک اکوسیستم خودرو لوکس و دیجیتال</h2>
        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {servicePillars.map((item) => (
            <article key={item.slug} className="infographic-card">
              <span className="pillar-index">{item.index}</span>
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
          <article key={item} className="stat-card">
            <p className="text-xl font-black leading-9">{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function DigitalPlatform() {
  return (
    <section className="section platform-section">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="platform-window">
          <Image src={visual.platform} alt="پلتفرم دیجیتال Auto Makhsus شامل CRM، پرتال مشتری، رزرو و سفارش کار" width={1000} height={760} sizes="(max-width: 1024px) 100vw, 46vw" className="aspect-[16/11] w-full rounded-[1.35rem] object-cover" />
          <div className="platform-dock">
            <span>CRM</span>
            <span>Booking</span>
            <span>Work Orders</span>
          </div>
        </div>
        <div>
          <p className="eyebrow text-[var(--ice)]">Digital Platform</p>
          <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">زیرساخت دیجیتال برای CRM، مشتری و عملیات</h2>
          <p className="mt-5 text-base leading-9 text-white/68">
            Auto Makhsus فقط مجموعه‌ای از سایت‌ها نیست؛ یک زیرساخت عملیاتی برای مدیریت لید، مشتری، پروژه، رزرو، رسانه، سفارش کار و رهگیری پیشرفت است.
          </p>
          <div className="mt-7 grid gap-3 md:grid-cols-2">
            {platformModules.map((item) => (
              <article key={item.title} className="platform-module">
                <h3 className="font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/62">{item.description}</p>
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
    <section id="lead" className="section bg-[linear-gradient(180deg,#ffffff_0%,#edf5ff_100%)]">
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
