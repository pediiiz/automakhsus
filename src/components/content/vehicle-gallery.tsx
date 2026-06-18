"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { VehicleBrand } from "@/lib/content-data";
import { visual } from "@/lib/site-data";

const filters = [
  { key: "all", fa: "همه برندها" },
  { key: "German", fa: "آلمانی" },
  { key: "Japanese", fa: "ژاپنی" },
  { key: "Korean", fa: "کره‌ای" },
  { key: "American", fa: "آمریکایی" },
  { key: "British", fa: "بریتانیایی" },
  { key: "Italian", fa: "ایتالیایی" },
  { key: "French", fa: "فرانسوی" },
  { key: "Chinese", fa: "چینی" },
  { key: "Supercar/Luxury", fa: "سوپرکار / لوکس" },
  { key: "Electric", fa: "برقی" },
];

function generationCount(brand: VehicleBrand) {
  return brand.models.reduce((sum, model) => sum + (model.generations?.length || 0), 0);
}

export function VehicleGallery({ brands }: { brands: VehicleBrand[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const featuredBrands = brands.filter((brand) => brand.featured).slice(0, 10);
  const normalizedQuery = query.trim().toLowerCase();
  const visibleBrands = brands.filter((brand) => {
    const matchesFilter = filter === "all" || brand.regions.includes(filter);
    const haystack = `${brand.name} ${brand.fa} ${brand.originCountry} ${brand.category}`.toLowerCase();
    return matchesFilter && (!normalizedQuery || haystack.includes(normalizedQuery));
  });

  return (
    <>
      <section className="vehicle-gallery-hero">
        <div className="vehicle-orbit vehicle-orbit-a" />
        <div className="vehicle-orbit vehicle-orbit-b" />
        <div className="container-shell relative z-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="eyebrow text-[var(--ice)]">Vehicle Knowledge Base</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-white md:text-6xl">گالری دانشنامه خودرو</h1>
            <p className="mt-5 text-base leading-9 text-white/70 md:text-lg">
              برند، مدل، نسل و سال خودروهای معتبر جهانی را در یک گالری فنی و قابل جست‌وجو ببینید؛ هر مسیر به خدمات، قطعات، آموزش، پروژه و رزرو سرویس Auto Makhsus وصل می‌شود.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <StatCard value={brands.length.toLocaleString("fa-IR")} label="برند جهانی" />
              <StatCard value={brands.reduce((sum, brand) => sum + brand.models.length, 0).toLocaleString("fa-IR")} label="مدل مهم" />
              <StatCard value={brands.reduce((sum, brand) => sum + generationCount(brand), 0).toLocaleString("fa-IR")} label="نسل و بازه سال" />
            </div>
          </div>
          <div className="vehicle-gallery-media-stack">
            <div className="premium-media-frame">
              <Image
                src={visual.cars}
                alt="گالری تصویری دانشنامه خودرو Auto Makhsus شامل برندها، مدل‌ها و نسل‌ها"
                width={1600}
                height={1100}
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="premium-media-image"
              />
            </div>
            <div className="vehicle-search-panel">
              <label className="text-sm font-black text-white/80" htmlFor="vehicle-search">جست‌وجوی برند</label>
              <input
                id="vehicle-search"
                className="vehicle-search-input"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="مثلاً BMW، Toyota، Porsche، تسلا..."
              />
              <div className="mt-5 flex flex-wrap gap-2">
                {filters.map((item) => {
                  const active = filter === item.key;
                  return (
                    <button key={item.key} type="button" onClick={() => setFilter(item.key)} className={`vehicle-filter-chip ${active ? "is-active" : ""}`}>
                      {item.fa}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[#07111f] text-white">
        <div className="container-shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-[var(--ice)]">Featured Brands</p>
              <h2 className="mt-3 text-3xl font-black md:text-5xl">برندهای پرتقاضا</h2>
            </div>
            <Link href="#all-brands" className="btn-ghost-dark">مشاهده همه برندها</Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {featuredBrands.map((brand) => <VehicleBrandCard key={brand.slug} brand={brand} featured />)}
          </div>
        </div>
      </section>

      <section id="all-brands" className="section bg-[linear-gradient(180deg,#f6f9ff_0%,#ffffff_100%)]">
        <div className="container-shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">All Brands</p>
              <h2 className="mt-3 text-3xl font-black md:text-5xl">همه برندها</h2>
            </div>
            <p className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm">{visibleBrands.length.toLocaleString("fa-IR")} برند</p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleBrands.map((brand) => <VehicleBrandCard key={brand.slug} brand={brand} />)}
          </div>
          {!visibleBrands.length ? (
            <div className="mt-8 rounded-[1.35rem] border border-dashed border-slate-300 bg-white p-8 text-center">
              <h3 className="text-2xl font-black">برندی با این فیلتر پیدا نشد</h3>
              <p className="mt-2 text-sm text-slate-500">فیلتر را تغییر دهید یا نام برند را کوتاه‌تر جست‌وجو کنید.</p>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="vehicle-stat-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function VehicleBrandCard({ brand, featured = false }: { brand: VehicleBrand; featured?: boolean }) {
  const generations = generationCount(brand);
  return (
    <Link href={`/fa/cars/${brand.slug}`} className={`vehicle-gallery-card ${featured ? "is-featured" : ""}`}>
      <span className="vehicle-brand-mark" aria-hidden="true">{brand.brandMark.text}</span>
      <span className="vehicle-card-glow" />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-2xl font-black text-white">{brand.fa}</h3>
            <p className="mt-1 text-sm font-black text-[var(--ice)]">{brand.name}</p>
          </div>
          <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-black text-white/72">{brand.originCountry}</span>
        </div>
        <p className="mt-4 line-clamp-3 text-sm leading-8 text-white/65">{brand.description}</p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Metric label="مدل" value={brand.models.length} />
          <Metric label="نسل" value={generations} />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="vehicle-card-tag">{brand.category}</span>
          {brand.regions.slice(0, 2).map((region) => <span key={region} className="vehicle-card-tag">{region}</span>)}
        </div>
        <span className="mt-6 inline-flex text-sm font-black text-white">مشاهده مدل‌ها ←</span>
      </div>
    </Link>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <span className="rounded-2xl border border-white/10 bg-white/8 p-3">
      <strong className="block text-xl font-black text-white">{value.toLocaleString("fa-IR")}</strong>
      <span className="text-xs font-bold text-white/55">{label}</span>
    </span>
  );
}
