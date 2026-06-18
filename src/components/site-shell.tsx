import Link from "next/link";
import { PremiumHeader } from "@/components/premium-header";
import { brands, phone, technicalServices, whatsapp } from "@/lib/site-data";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <PremiumHeader />
      {children}
      <footer className="site-footer border-t border-white/10 bg-[#050b14] text-white">
        <div className="container-shell">
          <div className="footer-action-band">
            <div>
              <p className="footer-kicker">Auto Makhsus Support</p>
              <h2>برای سرویس، قطعه یا همکاری سازمانی آماده‌ایم</h2>
              <span>درخواست شما با منبع automakhsus در CRM ثبت می‌شود و به واحد فنی یا فروشگاه قطعات می‌رسد.</span>
            </div>
            <div className="footer-cta-row">
              <Link href="/fa/services">رزرو سرویس</Link>
              <Link href="/fa/store">استعلام قطعه</Link>
            </div>
          </div>
          <div className="footer-topline">
            <div>
              <p className="footer-kicker">Premium Foreign-Car Platform</p>
              <h2>Auto Makhsus</h2>
            </div>
          </div>
          <div className="footer-grid">
            <div className="footer-brand-block">
              <p className="text-2xl font-black">مرکز تخصصی خودرو</p>
              <p className="mt-4 max-w-xl text-sm leading-8 text-white/62">
              مرکز تخصصی خودرو برای خدمات فنی، دیاگ، برق، آپشن، دیتیلینگ، صافکاری، نقاشی، فروشگاه قطعات، خرید + نصب و پلتفرم دیجیتال خودرو.
            </p>
              <div className="footer-support-box">
                <strong>Support Center</strong>
                <span>مشاوره، رزرو، استعلام قطعه و همکاری سازمانی</span>
                <a href={`tel:${phone}`}>{phone}</a>
              </div>
            </div>
            <div>
              <p className="font-black">خدمات</p>
              <div className="mt-4 grid gap-2 text-sm text-white/64">
                {technicalServices.slice(0, 7).map((service) => <Link key={service.slug} href={`/fa/services#${service.slug}`}>{service.title}</Link>)}
              </div>
            </div>
            <div>
              <p className="font-black">فروشگاه</p>
              <div className="mt-4 grid gap-2 text-sm text-white/64">
                <Link href="/fa/store">فروشگاه قطعات</Link>
                <Link href="/fa/store/categories">دسته‌بندی‌ها</Link>
                <Link href="/fa/store/search">جست‌وجوی قطعه</Link>
                <Link href="/fa/store/categories/oem">قطعات OEM</Link>
                <Link href="/fa/store/categories/special-order">سفارش خارجی</Link>
              </div>
            </div>
            <div>
              <p className="font-black">دانشنامه</p>
              <div className="mt-4 grid gap-2 text-sm text-white/64">
                <Link href="/fa/cars">دانشنامه خودرو</Link>
                <Link href="/fa/academy">آکادمی فنی</Link>
                <Link href="/fa/videos">ویدئوها</Link>
                <Link href="/fa/projects">نمونه‌کارها</Link>
                <Link href="/fa/community">انجمن</Link>
              </div>
            </div>
            <div>
              <p className="font-black">برندها</p>
              <div className="mt-4 grid gap-2 text-sm text-white/64">
              {brands.map((brand) => <a key={brand.slug} href={brand.url}>{brand.name}</a>)}
                <span className="text-white/40">MrSeat و TehranSeat زیر برند تهران صندلی</span>
              </div>
            </div>
            <div>
              <p className="font-black">تماس</p>
              <div className="mt-4 grid gap-3 text-sm text-white/64">
              <Link href="/fa/cooperation">درخواست همکاری</Link>
              <Link href="/fa/services">رزرو سرویس خودرو</Link>
              <Link href="/fa/digital-platform">پلتفرم دیجیتال</Link>
              <a href={`tel:${phone}`}>{phone}</a>
                <a href={`https://wa.me/${whatsapp}`}>واتساپ</a>
                <span>آدرس: مرکز خدمات Auto Makhsus، غرب تهران و البرز</span>
              </div>
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
