import Link from "next/link";
import { ContentDiscoveryNav } from "@/components/content/content-sections";
import { brands, phone, whatsapp } from "@/lib/site-data";

const nav = [
  ["برندها", "/fa/brands"],
  ["خدمات فنی", "/fa/services"],
  ["آکادمی", "/fa/academy"],
  ["ویدئو", "/fa/videos"],
  ["نمونه‌کارها", "/fa/projects"],
  ["دانشنامه خودرو", "/fa/cars"],
  ["کامیونیتی", "/fa/community"],
  ["اکوسیستم", "/fa/ecosystem"],
  ["فروشگاه", "/fa/ecosystem"],
  ["پلتفرم دیجیتال", "/fa/digital-platform"],
  ["رزرو/همکاری", "/fa/cooperation"],
  ["تماس", "/fa/contact"],
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/86 text-white backdrop-blur-2xl">
        <div className="container-shell flex min-h-20 items-center justify-between gap-5">
          <Link href="/fa" className="flex items-center gap-3" aria-label="Auto Makhsus">
              <span className="grid size-12 place-items-center rounded-2xl bg-[var(--electric)] text-base font-black text-white shadow-[0_14px_38px_rgba(11,92,255,0.35)]">AM</span>
            <span>
              <span className="block text-xl font-black tracking-normal">Auto Makhsus</span>
              <span className="block text-xs font-bold text-white/58">Foreign Car Technical Hub</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 xl:flex">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-full px-4 py-2 text-sm font-bold text-white/70 transition hover:bg-white/10 hover:text-white">
                {label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a className="btn-ghost-dark" href={`https://wa.me/${whatsapp}`}>واتساپ</a>
            <a className="btn-primary" href={`tel:${phone}`}>تماس</a>
          </div>
        </div>
        <ContentDiscoveryNav />
      </header>
      {children}
      <footer className="border-t border-white/10 bg-[#07111f] py-12 text-white">
        <div className="container-shell grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <p className="text-2xl font-black">Auto Makhsus</p>
            <p className="mt-4 max-w-xl text-sm leading-8 text-white/62">
              مرکز تخصصی خودروهای خارجی برای خدمات فنی، دیاگ، برق، آپشن، دیتیلینگ، صافکاری، نقاشی، فروشگاه قطعات، خرید + نصب و پلتفرم دیجیتال خودرو.
            </p>
          </div>
          <div>
            <p className="font-black">برندها</p>
            <div className="mt-4 grid gap-2 text-sm text-white/64">
              {brands.map((brand) => <a key={brand.slug} href={brand.url}>{brand.name}</a>)}
            </div>
          </div>
          <div>
            <p className="font-black">ارتباط</p>
            <div className="mt-4 grid gap-3 text-sm text-white/64">
              <Link href="/fa/cooperation">درخواست همکاری</Link>
              <Link href="/fa/services">رزرو سرویس خودروهای خارجی</Link>
              <Link href="/fa/academy">آکادمی فنی</Link>
              <Link href="/fa/cars">دانشنامه خودروهای خارجی</Link>
              <Link href="/fa/digital-platform">پلتفرم دیجیتال</Link>
              <a href={`tel:${phone}`}>{phone}</a>
            </div>
          </div>
        </div>
      </footer>
      <div className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 gap-2 rounded-2xl border border-white/10 bg-[#07111f]/95 p-2 text-xs font-black text-white shadow-2xl backdrop-blur md:hidden">
        <a className="rounded-xl bg-white/10 py-3 text-center" href={`tel:${phone}`}>تماس</a>
        <a className="rounded-xl bg-white/10 py-3 text-center" href={`https://wa.me/${whatsapp}`}>واتساپ</a>
        <Link className="rounded-xl bg-[var(--electric)] py-3 text-center" href="/fa/services">رزرو</Link>
        <Link className="rounded-xl bg-white/10 py-3 text-center" href="/fa/cars">خودروها</Link>
      </div>
    </div>
  );
}
