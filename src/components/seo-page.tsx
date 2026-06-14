import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { LeadForm } from "@/components/lead-form";
import {
  brands,
  foreignCarBrands,
  marketplaceCategories,
  platformModules,
  servicePillars,
  technicalServices,
  trustSignals,
  visual,
} from "@/lib/site-data";

const ecosystemBranches = [
  { title: "Technical Hub", fa: "خدمات فنی خودروهای خارجی", brands: ["Auto Makhsus", "All Imported Cars"], accent: "#0B5CFF" },
  { title: "Interior Division", fa: "صندلی، سالن و ون VIP", brands: ["TehranSandali", "MrSeat", "TehranSeat"], accent: "#2F80ED" },
  { title: "Upholstery Division", fa: "تودوزی و بازسازی سالن", brands: ["Tuduzi"], accent: "#4DA3FF" },
  { title: "Authorized Service", fa: "نمایندگی مولتی‌برند مجاز", brands: ["ANI2203"], accent: "#BDE9FF" },
  { title: "Commerce Platform", fa: "فروشگاه قطعات و نصب", brands: ["Marketplace", "Buy + Install"], accent: "#8FD3FF" },
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
            <Link className="btn-primary" href="#lead">درخواست مشاوره</Link>
            <Link className="btn-ghost-dark" href="/fa/services">رزرو سرویس</Link>
            <Link className="btn-ghost-dark" href="/fa/store">خرید قطعه</Link>
            <Link className="btn-ghost-dark" href="/fa/cooperation">درخواست نصب</Link>
            <a className="btn-ghost-dark" href="https://ani2203.com/fa/booking">رزرو خدمات آنی سرویس</a>
          </div>
          <div className="mt-9 grid max-w-2xl grid-cols-3 gap-3">
            {["خودروهای خارجی", "فروشگاه + نصب", "CRM مرکزی"].map((item) => (
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
              <span className="orbit-node orbit-node-1" style={{ "--node-color": "#0B5CFF" } as StyleVars}>Technical Hub</span>
              <span className="orbit-node orbit-node-2" style={{ "--node-color": "#8FD3FF" } as StyleVars}>Marketplace</span>
              <span className="orbit-node orbit-node-3" style={{ "--node-color": "#2F80ED" } as StyleVars}>TehranSandali</span>
              <span className="orbit-node orbit-node-4" style={{ "--node-color": "#4DA3FF" } as StyleVars}>Tuduzi</span>
              <span className="orbit-node orbit-node-5" style={{ "--node-color": "#BDE9FF" } as StyleVars}>ANI2203</span>
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
          <h2 className="mt-3 text-3xl font-black md:text-5xl">نقشه فنی، تجاری و عملیاتی Auto Makhsus</h2>
          <p className="mt-5 text-base leading-9 text-white/64">
            Auto Makhsus فقط ویترین برندها نیست؛ مرکز فنی خودروهای خارجی، فروشگاه قطعات، شبکه نصب و پلتفرم دیجیتال عملیات است.
          </p>
        </div>
        <div className="ecosystem-map mt-10">
          <div className="ecosystem-core">
            <span className="text-sm font-black text-[var(--ice)]">Parent Brand</span>
            <strong>Auto Makhsus</strong>
            <small>Technical • Commerce • CRM</small>
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
        <h2 className="mt-3 text-3xl font-black md:text-5xl">سه برند اصلی، یک هاب فنی و تجاری خودروهای خارجی</h2>
        <p className="mt-5 max-w-4xl text-base leading-9 text-[var(--muted)]">
          در معماری جدید، MrSeat و TehranSeat زیر برندهای تهران صندلی هستند و در سطح مادر کنار برندهای اصلی نمایش داده نمی‌شوند.
        </p>
        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          {brands.map((brand) => (
            <a key={brand.slug} href={brand.url} className="brand-card motion-card group" style={{ "--brand-color": brand.color } as StyleVars}>
              <span className="brand-icon">{brand.icon}</span>
              <h3 className="mt-7 text-2xl font-black">{brand.name}</h3>
              <p className="mt-1 text-sm font-bold text-[var(--blue)]">{brand.fa}</p>
              <p className="mt-4 text-sm leading-8 text-[var(--muted)]">{brand.description}</p>
              {"subBrands" in brand && brand.subBrands?.length ? (
                <div className="mt-5 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-xs font-black text-sky-900">
                  زیر برندها: {brand.subBrands.join(" و ")}
                </div>
              ) : null}
              <span className="mt-auto inline-flex pt-6 text-sm font-black text-[var(--electric)]">مشاهده برند</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechnicalServices() {
  return (
    <section className="section bg-white">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="eyebrow">Foreign Car Technical Hub</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">مرکز تخصصی خودروهای خارجی، فراتر از نمایندگی‌های محدود</h2>
            <p className="mt-5 text-base leading-9 text-[var(--muted)]">
              Auto Makhsus برای همه خودروهای خارجی و وارداتی طراحی شده است؛ از دیاگ و برق تا بدنه، رنگ، دیتیلینگ، آپشن، قطعه و کارشناسی قبل خرید.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="btn-primary" href="#lead">درخواست مشاوره</Link>
              <Link className="btn-secondary" href="/fa/contact">رزرو سرویس</Link>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {technicalServices.map((item) => (
              <article key={item.slug} className="technical-card">
                <span className="technical-dot" />
                <h3 className="text-lg font-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ForeignCarBrands() {
  return (
    <section className="section bg-[#07111f] text-white">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow text-[var(--ice)]">Imported Car Coverage</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">خدمات فنی برای همه برندهای خارجی و وارداتی</h2>
            <p className="mt-5 text-base leading-9 text-white/66">
              ANI2203 فقط محدوده برندهای مجاز خود را پوشش می‌دهد، اما Auto Makhsus به عنوان هاب فنی و تجاری برای طیف گسترده خودروهای خارجی تعریف شده است.
            </p>
          </div>
          <div className="brand-cloud">
            {foreignCarBrands.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function MarketplaceSection() {
  return (
    <section className="section bg-[linear-gradient(180deg,#f6f9ff_0%,#ffffff_100%)]">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="sticky-panel">
            <p className="eyebrow">Marketplace</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">فروشگاه قطعات، مواد مصرفی و تجهیزات خودروهای خارجی</h2>
            <p className="mt-5 text-base leading-9 text-[var(--muted)]">
              فروشگاه Auto Makhsus برای خرید قطعه، خرید همراه نصب، سفارش خاص و اتصال سفارش به CRM، فاکتور، پروژه، انبار و گارانتی طراحی می‌شود.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="btn-primary" href="/fa/store">خرید قطعه</Link>
              <Link className="btn-secondary" href="/fa/store">خرید + نصب در Auto Makhsus</Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {marketplaceCategories.map((item) => (
              <Link key={item.slug} href={`/fa/store/categories/${item.slug}`} className="market-card">
                <h3 className="text-lg font-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
              </Link>
            ))}
          </div>
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
        <h2 className="mt-3 max-w-4xl text-3xl font-black md:text-5xl">ستون‌های اصلی برای هاب فنی، فروشگاهی و دیجیتال Auto Makhsus</h2>
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
          <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">پلتفرم دیجیتال خودرو، از گذرنامه تا باشگاه مشتریان</h2>
          <p className="mt-5 text-base leading-9 text-white/68">
            Auto Makhsus روی CRM عملیاتی، Vehicle Digital Passport، Cloud Garage، سوابق گارانتی، Customer Portal و مسیرهای آینده Service Reminder و Customer Club ساخته می‌شود.
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
          <h2 className="mt-3 text-3xl font-black md:text-5xl">برای مشاوره، رزرو سرویس، خرید قطعه یا نصب درخواست ثبت کنید</h2>
          <p className="mt-5 text-base leading-9 text-[var(--muted)]">
            فرم‌های Auto Makhsus با منبع automakhsus در CRM ثبت می‌شوند تا مسیر خدمات فنی، فروشگاه، خرید + نصب یا همکاری سازمانی قابل پیگیری باشد.
          </p>
        </div>
        <LeadForm sourcePage={sourcePage} interest={interest} />
      </div>
    </section>
  );
}
