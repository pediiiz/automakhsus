"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { marketplaceCategories, phone, technicalServices, whatsapp } from "@/lib/site-data";

const knowledgeLinks = [
  { label: "دانشنامه خودرو", href: "/fa/cars", description: "برند، مدل، نسل و مسیر خدمات خودروهای خارجی" },
  { label: "آکادمی", href: "/fa/academy", description: "مقالات فنی، نگهداری، عیب‌یابی و آموزش" },
  { label: "ویدئوها", href: "/fa/videos", description: "دیاگ، نصب آپشن، پروژه و آموزش تصویری" },
  { label: "نمونه‌کارها", href: "/fa/projects", description: "قبل، حین و بعد از پروژه‌های واقعی" },
  { label: "فید روزانه", href: "/fa/feed", description: "جریان روزانه محتوا و فعالیت مجموعه" },
  { label: "انجمن", href: "/fa/forum", description: "انجمن کنترل‌شده، گروه‌ها، موضوعات و پرسش‌وپاسخ" },
  { label: "سوالات", href: "/fa/community/questions", description: "سوالات پرتکرار و پاسخ‌های پذیرفته‌شده" },
];

const brandLinks = [
  {
    label: "TehranSandali",
    href: "https://tehransandali.ir",
    description: "صندلی، سالن، ون VIP، کمپر و ارتقای داخلی",
    note: "زیر برندها: MrSeat و TehranSeat",
  },
  {
    label: "ANI2203",
    href: "https://ani2203.com",
    description: "نمایندگی مولتی‌برند آنی سرویس ۲۲۰۳",
    note: "Toyota, Lexus, Nissan, Suzuki, Hyundai, Skoda, Aion",
  },
  {
    label: "Tuduzi",
    href: "https://tuduzi.com",
    description: "تودوزی فابریکی، چرم، رودری، سقف و بازسازی سالن",
    note: "بخش تخصصی تودوزی Auto Makhsus",
  },
];

const serviceLinks = technicalServices.slice(0, 9).map((item) => ({
  label: item.title,
  href: `/fa/services#${item.slug}`,
  description: item.description,
}));

const storeLinks = [
  ...marketplaceCategories.slice(0, 7).map((item) => ({
    label: item.title,
    href: `/fa/store/categories/${item.slug}`,
    description: item.description,
  })),
  {
    label: "خرید + نصب",
    href: "/fa/store",
    description: "استعلام قطعه همراه با رزرو نصب در Auto Makhsus",
  },
];

const menuGroups = [
  {
    key: "home",
    label: "خانه",
    eyebrow: "Auto Makhsus",
    title: "هاب فنی و تجاری خودروهای خارجی",
    description: "صفحه اصلی Auto Makhsus برای سرویس، قطعه، دانشنامه و پلتفرم دیجیتال خودرو.",
    href: "/fa",
    accent: "#8FD3FF",
    links: [
      { label: "صفحه اصلی", href: "/fa", description: "معرفی اکوسیستم فنی، فروشگاهی و محتوایی Auto Makhsus" },
      { label: "رزرو سرویس", href: "/fa/services", description: "ثبت درخواست سرویس خودروهای خارجی" },
      { label: "استعلام قطعه", href: "/fa/store", description: "استعلام قطعات و خرید + نصب" },
    ],
    featured: [
      { label: "ورود به سایت", href: "/fa" },
      { label: "ثبت درخواست", href: "/fa#lead" },
    ],
  },
  {
    key: "services",
    label: "خدمات خودرو",
    eyebrow: "Technical Services",
    title: "خدمات تخصصی برای خودروهای خارجی",
    description: "دیاگ، برق، مکانیک، قطعه، آپشن، دیتیلینگ و بدنه در یک مسیر CRM-backed.",
    href: "/fa/services",
    accent: "#0B5CFF",
    links: serviceLinks,
    featured: [
      { label: "رزرو سرویس", href: "/fa/services" },
      { label: "کارشناسی قبل خرید", href: "/fa/services#inspection" },
    ],
  },
  {
    key: "knowledge",
    label: "دانشنامه خودرو",
    eyebrow: "Knowledge Platform",
    title: "محتوا، آموزش، ویدئو و دانشنامه خودرو",
    description: "مسیر محتوایی Auto Makhsus برای سئو، آموزش مشتری و تبدیل مسئله به لید.",
    href: "/fa/cars",
    accent: "#8FD3FF",
    links: knowledgeLinks,
    featured: [
      { label: "ورود به دانشنامه", href: "/fa/cars" },
      { label: "مشاهده آکادمی", href: "/fa/academy" },
    ],
  },
  {
    key: "store",
    label: "فروشگاه قطعات",
    eyebrow: "Marketplace",
    title: "قطعات، مواد و خرید + نصب",
    description: "کاتالوگ فروشگاهی برای قطعات، آپشن، دیتیلینگ، ابزار و سفارش خاص.",
    href: "/fa/store",
    accent: "#2F80ED",
    links: storeLinks,
    featured: [
      { label: "استعلام قطعه", href: "/fa/store" },
      { label: "خرید + نصب", href: "/fa/store" },
    ],
  },
  {
    key: "academy",
    label: "آکادمی",
    eyebrow: "Academy",
    title: "آموزش، مقاله، ویدئو و راهنمای فنی",
    description: "راهنمای نگهداری، عیب‌یابی، ویدئو، نمونه‌کار و سوالات پرتکرار برای مالک خودرو خارجی.",
    href: "/fa/academy",
    accent: "#4DA3FF",
    links: knowledgeLinks.filter((item) => ["/fa/academy", "/fa/videos", "/fa/projects", "/fa/feed", "/fa/community"].includes(item.href)),
    featured: [
      { label: "مطالب آکادمی", href: "/fa/academy" },
      { label: "ویدئوها", href: "/fa/videos" },
    ],
  },
  {
    key: "projects",
    label: "نمونه کارها",
    eyebrow: "Project Showcase",
    title: "نمونه کار، پروژه، قبل و بعد",
    description: "نمایش پروژه‌های فنی، دیاگ، قطعه، نصب، دیتیلینگ و مسیرهای اجرایی Auto Makhsus.",
    href: "/fa/projects",
    accent: "#2F80ED",
    links: [
      { label: "نمونه کارها", href: "/fa/projects", description: "پروژه‌های انجام‌شده و مسیر اجرا" },
      { label: "فید روزانه", href: "/fa/feed", description: "به‌روزرسانی‌های روزانه و فعالیت مجموعه" },
      { label: "ویدئوها", href: "/fa/videos", description: "ویدئوهای خدمات، دیاگ و نصب" },
    ],
    featured: [
      { label: "دیدن پروژه‌ها", href: "/fa/projects" },
      { label: "ثبت پروژه جدید", href: "/fa/services" },
    ],
  },
  {
    key: "community",
    label: "انجمن",
    eyebrow: "Community",
    title: "پرسش و پاسخ کنترل‌شده خودروهای خارجی",
    description: "پایه خواندنی کامیونیتی، سوالات فنی، پاسخ پذیرفته‌شده و لینک به خدمات.",
    href: "/fa/forum",
    accent: "#BDE9FF",
    links: [
      { label: "انجمن", href: "/fa/forum", description: "دسته‌ها، گروه‌ها، موضوعات و moderation foundation" },
      { label: "سوالات", href: "/fa/community/questions", description: "سوالات پرتکرار و SEO-friendly" },
      { label: "دانشنامه", href: "/fa/cars", description: "برند، مدل، نسل و خدمات مرتبط" },
    ],
    featured: [
      { label: "ورود به انجمن", href: "/fa/forum" },
      { label: "سوالات پرتکرار", href: "/fa/community/questions" },
    ],
  },
  {
    key: "brands",
    label: "برندها",
    eyebrow: "Brand Ecosystem",
    title: "سه برند اصلی Auto Makhsus",
    description: "MrSeat و TehranSeat زیرمجموعه TehranSandali هستند و در سطح مادر جدا نمایش داده نمی‌شوند.",
    href: "/fa/brands",
    accent: "#BDE9FF",
    links: brandLinks,
    featured: [
      { label: "معماری برند", href: "/fa/brands" },
      { label: "اکوسیستم", href: "/fa/ecosystem" },
    ],
  },
];

const quickLinks = [
  { label: "فروشگاه", href: "/fa/store" },
  { label: "دانشنامه", href: "/fa/cars" },
  { label: "تماس", href: "/fa/contact" },
  { label: "CRM", href: "/crm" },
];

export function PremiumHeader() {
  const pathname = usePathname();
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeNavigation() {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMobileOpen(false);
    setActiveGroup(null);
  }

  function openMegaMenu(groupKey: string) {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveGroup(groupKey);
  }

  function scheduleMegaMenuClose() {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setActiveGroup(null);
      closeTimerRef.current = null;
    }, 220);
  }

  function cancelMegaMenuClose() {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setActiveGroup(null);
      }
    }

    function onPointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setActiveGroup(null);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    document.body.classList.toggle("mobile-nav-open", mobileOpen);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      document.body.classList.remove("mobile-nav-open");
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, [mobileOpen]);

  const active = menuGroups.find((group) => group.key === activeGroup);

  return (
    <header
      ref={headerRef}
      className={`premium-header ${scrolled ? "is-scrolled" : ""}`}
      onMouseEnter={cancelMegaMenuClose}
      onMouseLeave={scheduleMegaMenuClose}
    >
      <div className="premium-header-shell">
        <Link href="/fa" className="am-wordmark" aria-label="Auto Makhsus">
          <span className="am-wordmark-mark">AM</span>
          <span className="am-wordmark-copy">
            <strong>Auto Makhsus</strong>
            <small>مرکز تخصصی خودروهای خارجی</small>
            <em>Technical + Commerce Platform</em>
          </span>
        </Link>

        <nav className="premium-nav" aria-label="ناوبری اصلی Auto Makhsus">
          {menuGroups.map((group) => (
            <div key={group.key} className="premium-nav-item" onMouseEnter={() => openMegaMenu(group.key)}>
              <Link
                href={group.href}
                className={`premium-nav-link ${pathname.startsWith(group.href) || activeGroup === group.key ? "is-active" : ""}`}
                style={{ "--nav-accent": group.accent } as CSSProperties}
                onFocus={() => openMegaMenu(group.key)}
                onClick={closeNavigation}
              >
                <span className="nav-token" aria-hidden="true" />
                {group.label}
              </Link>
            </div>
          ))}
        </nav>

        <div className="premium-header-actions">
          <div className="quick-access" aria-label="دسترسی سریع">
            {quickLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeNavigation}>{item.label}</Link>
            ))}
          </div>
          <Link className="shop-access" href="/fa/store" onClick={closeNavigation} aria-label="فروشگاه قطعات">
            <span>Catalog</span>
            <strong>قطعات</strong>
          </Link>
          <Link className="header-cta header-cta-secondary" href="/fa/store" onClick={closeNavigation}>استعلام قطعه</Link>
          <Link className="header-cta header-cta-crm" href="/crm" onClick={closeNavigation}>CRM Login</Link>
          <Link className="header-cta" href="/fa/services" onClick={closeNavigation}>رزرو سرویس</Link>
        </div>

        <button className="mobile-menu-button" type="button" aria-label="باز کردن منو" aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}>
          <span />
          <span />
          <span />
        </button>
      </div>

      {active ? <MegaMenu group={active} onNavigate={closeNavigation} onMouseEnter={cancelMegaMenuClose} onMouseLeave={scheduleMegaMenuClose} /> : null}

      <div className={`mobile-drawer ${mobileOpen ? "is-open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mobile-drawer-panel">
          <div className="mobile-drawer-head">
            <span>
              Auto Makhsus
              <small>مرکز تخصصی خودروهای خارجی</small>
            </span>
            <button type="button" onClick={() => setMobileOpen(false)}>بستن</button>
          </div>
          <div className="mobile-cta-grid">
            <Link href="/fa/services" onClick={closeNavigation}>رزرو سرویس</Link>
            <Link href="/fa/store" onClick={closeNavigation}>استعلام قطعه</Link>
            <Link href="/crm" onClick={closeNavigation}>CRM Login</Link>
            <a href={`tel:${phone}`}>تماس فوری</a>
            <a href={`https://wa.me/${whatsapp}`}>واتساپ</a>
          </div>
          {menuGroups.map((group) => (
            <details key={group.key} className="mobile-menu-group" open={group.key === "services"}>
              <summary>
                <span style={{ "--nav-accent": group.accent } as CSSProperties} />
                {group.label}
              </summary>
              <div className="mobile-menu-links">
                <Link href={group.href} onClick={closeNavigation}>{group.title}</Link>
                {group.links.map((item) => (
                  <Link key={`${group.key}-${item.href}-${item.label}`} href={item.href} onClick={closeNavigation}>{item.label}</Link>
                ))}
              </div>
            </details>
          ))}
          <div className="mobile-menu-footer">
            <Link href="/fa/contact" onClick={closeNavigation}>تماس</Link>
            <Link href="/fa/cooperation" onClick={closeNavigation}>همکاری</Link>
            <Link href="/fa/digital-platform" onClick={closeNavigation}>پلتفرم دیجیتال</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function MegaMenu({
  group,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
}: {
  group: (typeof menuGroups)[number];
  onNavigate: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <div className="mega-menu" style={{ "--mega-accent": group.accent } as CSSProperties} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="mega-panel">
        <div className="mega-feature">
          <p>{group.eyebrow}</p>
          <h2>{group.title}</h2>
          <span>{group.description}</span>
          <div className="mega-feature-actions">
            {group.featured.map((item) => (
              <Link key={item.href + item.label} href={item.href} onClick={onNavigate}>{item.label}</Link>
            ))}
          </div>
        </div>
        <div className="mega-link-grid">
          {group.links.map((item, index) => (
            <Link key={`${item.href}-${item.label}`} href={item.href} className="mega-link-card" onClick={onNavigate}>
              <span className="mega-link-icon">{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.label}</strong>
              <small>{item.description}</small>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
