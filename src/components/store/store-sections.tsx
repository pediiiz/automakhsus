import Link from "next/link";
import { LeadSection, SeoJsonLd } from "@/components/seo-page";
import type { StoreCategory, StoreProduct } from "@/lib/store-data";
import { storeCategoryPath, storeProductPath } from "@/lib/store-data";

export function StoreHero() {
  return (
    <section className="content-hero tech-grid relative isolate overflow-hidden bg-[#07111f] py-16 text-white md:py-24">
      <div className="hero-glow hero-glow-a" />
      <div className="container-shell relative z-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="eyebrow text-[var(--ice)]">Auto Makhsus Marketplace</p>
          <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">فروشگاه قطعات خودروهای خارجی</h1>
          <p className="mt-5 text-base leading-9 text-white/70 md:text-lg">
            کاتالوگ قطعات مصرفی، فنی، برق و الکترونیک، آپشن، مواد دیتیلینگ، مواد بدنه، ابزار، OEM، Aftermarket، استوک و سفارش خارجی با مسیر استعلام قیمت و خرید + نصب در Auto Makhsus.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className="btn-primary" href="#lead">استعلام قیمت</Link>
            <Link className="btn-ghost-dark" href="/fa/store/categories">مشاهده دسته‌ها</Link>
            <Link className="btn-ghost-dark" href="/fa/services">رزرو نصب</Link>
          </div>
        </div>
        <div className="store-console">
          {["OEM", "Aftermarket", "Used", "Special Order", "Buy + Install", "CRM Linked"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StoreCategoryGrid({ categories }: { categories: StoreCategory[] }) {
  return (
    <section className="section bg-[linear-gradient(180deg,#f6f9ff_0%,#ffffff_100%)]">
      <div className="container-shell">
        <p className="eyebrow">Store Categories</p>
        <h2 className="mt-3 max-w-4xl text-3xl font-black md:text-5xl">دسته‌بندی قطعات، مواد و تجهیزات برای خودروهای خارجی</h2>
        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.slug} href={storeCategoryPath(category.slug)} className="store-card group">
              <span className="store-card-mark">{category.title.slice(0, 2)}</span>
              <h3 className="mt-5 text-2xl font-black">{category.title}</h3>
              <p className="mt-3 text-sm leading-8 text-[var(--muted)]">{category.description}</p>
              <span className="mt-6 inline-flex text-sm font-black text-[var(--electric)]">مشاهده محصولات</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StoreProductGrid({ products, title = "محصولات پیشنهادی" }: { products: StoreProduct[]; title?: string }) {
  return (
    <section className="section bg-white">
      <div className="container-shell">
        <p className="eyebrow">Catalog Foundation</p>
        <h2 className="mt-3 text-3xl font-black md:text-5xl">{title}</h2>
        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <Link key={product.slug} href={storeProductPath(product.slug)} className="product-card group">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-sky-900">{product.priceLabel}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">{product.stockStatus}</span>
              </div>
              <h3 className="mt-5 text-2xl font-black">{product.title}</h3>
              <p className="mt-3 text-sm leading-8 text-[var(--muted)]">{product.shortDescription}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {product.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-black text-slate-700">{tag}</span>)}
              </div>
              <span className="mt-6 inline-flex text-sm font-black text-[var(--electric)]">استعلام و جزئیات</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StoreCategoryDetail({ category, products }: { category: StoreCategory; products: StoreProduct[] }) {
  return (
    <main>
      <StoreHero />
      <section className="section bg-white">
        <div className="container-shell grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <article className="card p-7">
            <p className="eyebrow">Category</p>
            <h1 className="mt-3 text-4xl font-black">{category.title}</h1>
            <p className="mt-4 leading-9 text-[var(--muted)]">{category.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="btn-primary" href="#lead">استعلام قطعه</Link>
              <Link className="btn-secondary" href="/fa/store/categories">همه دسته‌ها</Link>
            </div>
          </article>
          <article className="card p-7">
            <p className="eyebrow">Buy + Install</p>
            <h2 className="mt-3 text-3xl font-black">مسیر فروشگاه به پروژه نصب</h2>
            <p className="mt-4 leading-9 text-[var(--muted)]">
              هر درخواست قطعه می‌تواند به بررسی سازگاری، استعلام موجودی، فاکتور، رزرو نصب، سفارش کار، گارانتی و Vehicle Digital Passport متصل شود.
            </p>
          </article>
        </div>
      </section>
      <StoreProductGrid products={products} title={`محصولات ${category.title}`} />
      <LeadSection sourcePage={storeCategoryPath(category.slug)} interest={`استعلام ${category.title}`} />
    </main>
  );
}

export function StoreProductDetail({ product, schema }: { product: StoreProduct; schema: object }) {
  return (
    <main>
      <SeoJsonLd data={schema} />
      <section className="content-hero tech-grid relative isolate overflow-hidden bg-[#07111f] py-16 text-white md:py-24">
        <div className="hero-glow hero-glow-a" />
        <div className="container-shell relative z-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow text-[var(--ice)]">Store Product</p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">{product.title}</h1>
            <p className="mt-5 text-base leading-9 text-white/70 md:text-lg">{product.shortDescription}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="btn-primary" href="#lead">استعلام قیمت</Link>
              {product.installOption ? <Link className="btn-ghost-dark" href="#lead">خرید + نصب در Auto Makhsus</Link> : null}
              <Link className="btn-ghost-dark" href="/fa/store">بازگشت به فروشگاه</Link>
            </div>
          </div>
          <div className="store-console">
            {[product.priceLabel, product.stockStatus, product.installOption ? "Install Option" : "Part Only", ...product.tags].map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container-shell grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="card p-7">
            <p className="eyebrow">Technical Description</p>
            <h2 className="mt-3 text-3xl font-black">توضیح فنی و سازگاری</h2>
            <p className="mt-4 leading-9 text-[var(--muted)]">{product.technicalDescription}</p>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <InfoBlock title="سازگاری برند" items={product.brandCompatibility} />
              <InfoBlock title="سازگاری خودرو" items={product.vehicleCompatibility} />
            </div>
          </article>
          <article className="card p-7">
            <p className="eyebrow">Commercial CTAs</p>
            <h2 className="mt-3 text-3xl font-black">مسیر اقدام</h2>
            <div className="mt-5 grid gap-3">
              <Link className="btn-primary" href="#lead">استعلام قیمت</Link>
              <Link className="btn-secondary" href="#lead">مشاوره قطعه</Link>
              {product.installOption ? <Link className="btn-secondary" href="#lead">خرید + نصب در Auto Makhsus</Link> : null}
            </div>
          </article>
        </div>
      </section>
      <LeadSection sourcePage={storeProductPath(product.slug)} interest={`استعلام قطعه: ${product.title}`} />
    </main>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--border)] bg-slate-50 p-5">
      <h3 className="font-black">{title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-800 shadow-sm">{item}</span>)}
      </div>
    </div>
  );
}
