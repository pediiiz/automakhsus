import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandEcosystem, LeadSection, PageHero, SeoJsonLd } from "@/components/seo-page";
import { absolute, brandBySlug, brands, servicePillars, visual } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return brands.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const brand = brandBySlug(slug);
  if (!brand) return {};
  return pageMetadata({
    title: `${brand.name} در اکوسیستم Auto Makhsus`,
    description: `${brand.fa} یکی از برندهای اصلی Auto Makhsus در معماری رسمی خودرو، خدمات تخصصی، تودوزی، نمایندگی مجاز یا عملیات دیجیتال مشتریان است.`,
    path: `/fa/brands/${brand.slug}`,
    image: visual.network,
  });
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = brandBySlug(slug);
  if (!brand) notFound();
  const path = `/fa/brands/${brand.slug}`;

  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "برندها", url: absolute("/fa/brands") }, { name: brand.name, url: absolute(path) }])} />
      <PageHero
        eyebrow={brand.name}
        title={`${brand.fa} در شبکه Auto Makhsus`}
        description={`${brand.description} این برند در کنار هاب فنی و فروشگاهی Auto Makhsus از مسیرهای دیجیتال، CRM، پرتال مشتریان و استانداردهای مشترک کیفیت استفاده می‌کند.`}
        image={visual.network}
      />
      <section className="section">
        <div className="container-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="card p-7">
            <p className="eyebrow">نقش برند</p>
            <h2 className="mt-3 text-3xl font-black text-[var(--dark)]">{brand.fa}</h2>
            <p className="mt-4 leading-8 text-slate-600">{brand.description}</p>
            {"subBrands" in brand && brand.subBrands?.length ? (
              <p className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm font-black leading-7 text-sky-900">
                زیر برندهای تهران صندلی: {brand.subBrands.join(" و ")}
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="btn-primary" href={brand.url}>ورود به سایت برند</a>
              <Link className="btn-secondary" href="/fa/contact">ارتباط با Auto Makhsus</Link>
            </div>
          </article>
          <article className="card p-7">
            <p className="eyebrow">اتصال عملیاتی</p>
            <h2 className="mt-3 text-3xl font-black text-[var(--dark)]">زیرساخت مشترک برندها</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {servicePillars.map((pillar) => (
                <Link key={pillar.slug} className="rounded-[1.25rem] border border-[var(--border)] bg-white/80 p-4 font-black transition hover:-translate-y-1 hover:border-[var(--blue)]" href="/fa/services">
                  {pillar.title}
                </Link>
              ))}
            </div>
          </article>
        </div>
      </section>
      <BrandEcosystem />
      <LeadSection sourcePage={path} interest={`درخواست مرتبط با ${brand.fa}`} />
    </main>
  );
}
