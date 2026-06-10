export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://automakhsus.com";

export const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER || "02146063262";
export const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "989122470048";

export const visual = {
  hero: "/uploads/automakhsus/generated/hero-automotive-ecosystem.png",
  platform: "/uploads/automakhsus/generated/platform-dashboard.png",
  network: "/uploads/automakhsus/hero/brand-network.svg",
  og: "/uploads/automakhsus/hero/automakhsus-og.svg",
};

export const brands = [
  {
    slug: "tehransandali",
    name: "TehranSandali",
    fa: "تهران صندلی",
    url: "https://tehransandali.ir",
    description: "Specialist center for automotive seats, upholstery, vehicle interiors, VIP vans, campers, options, CRM and customer services.",
    color: "#2F80ED",
    icon: "ص",
  },
  {
    slug: "mrseat",
    name: "MrSeat",
    fa: "مستر سیت",
    url: "https://mrseat.ir",
    description: "Specialist brand for automotive seats, imported stock seats, electric seats, installation and seat upgrades.",
    color: "#8FD3FF",
    icon: "S",
  },
  {
    slug: "tehranseat",
    name: "TehranSeat",
    fa: "تهران سیت",
    url: "https://tehranseat.ir",
    description: "Premium brand for luxury seats, VIP seats, executive seats, and advanced seat options.",
    color: "#0B5CFF",
    icon: "VIP",
  },
  {
    slug: "tuduzi",
    name: "Tuduzi",
    fa: "تودوزی",
    url: "https://tuduzi.com",
    description: "Specialized brand for factory-style upholstery, leather trim, steering wheel stitching, door trims, headliner, flooring, and interior restoration.",
    color: "#4DA3FF",
    icon: "چ",
  },
  {
    slug: "ani2203",
    name: "ANI2203",
    fa: "آنی سرویس ۲۲۰۳",
    url: "https://ani2203.com",
    description: "Multi-brand ANI Service representative code 2203, covering Toyota, Lexus, Nissan, Suzuki, Hyundai, Skoda, and Aion across Karaj, Shahriar, Qods, Garmdareh, West Tehran and Alborz.",
    color: "#BDE9FF",
    icon: "2203",
  },
];

export const servicePillars = [
  ["seats", "صندلی و ارتقا", "صندلی خودرو، صندلی استوک خارجی، صندلی برقی، VIP و ارتقای امکانات نشیمن.", "01"],
  ["upholstery", "تودوزی و بازسازی سالن", "تودوزی فابریکی، چرم، رودری، سقف، کفپوش، فرمان و بازسازی تریم داخلی.", "02"],
  ["vip-van-camper", "ون VIP و کمپر", "طراحی و اجرای ون VIP، کمپر، کابین‌های تشریفاتی و فضای اختصاصی سفر.", "03"],
  ["multi-brand-service", "سرویس مولتی‌برند", "سرویس تخصصی، دیاگ، برق، مکانیک، رنگ، بدنه و کنترل کیفیت برای خودروهای وارداتی.", "04"],
  ["options-detailing", "آپشن و دیتیلینگ", "نصب آپشن، تجهیزات رفاهی، دیتیلینگ، آماده‌سازی و ارتقای تجربه کابین.", "05"],
  ["digital-crm", "CRM و پلتفرم دیجیتال", "CRM، پرتال مشتریان، رزرو، کتابخانه رسانه، سفارش کار و رهگیری پیشرفت.", "06"],
].map(([slug, title, description, index]) => ({ slug, title, description, index }));

export const platformModules = [
  ["CRM", "مدیریت لید، مشتری، پروژه، پیگیری، فروش و عملیات بین برندها."],
  ["Customer Portal", "دسترسی مشتری به وضعیت پروژه، درخواست‌ها، گارانتی و سوابق خدمات."],
  ["Booking", "رزرو خدمات، زمان‌بندی کارگاهی و هماهنگی مراجعه برای برندهای سرویس‌محور."],
  ["Media Library", "مدیریت تصاویر و ویدئوهای واقعی پروژه‌ها برای سایت‌ها و CRM."],
  ["Work Orders", "تبدیل آیتم‌های فاکتور به کار عملیاتی، وظایف، مسئول و زمان‌بندی."],
  ["Progress Tracking", "رهگیری مرحله، درصد پیشرفت، تاخیرها، کنترل کیفیت و تحویل."],
].map(([title, description]) => ({ title, description }));

export const trustSignals = [
  "بزرگترین مجموعه تخصصی صندلی و سالن خودرو",
  "نمایندگی مولتی‌برند آنی سرویس 2203",
  "پلتفرم دیجیتال CRM و مدیریت مشتریان",
  "پوشش غرب تهران و البرز",
];

export const faRoutes = [
  "/fa",
  "/fa/brands",
  "/fa/services",
  "/fa/ecosystem",
  "/fa/about",
  "/fa/contact",
  "/fa/cooperation",
  "/fa/digital-platform",
  ...brands.map((brand) => `/fa/brands/${brand.slug}`),
];

export function absolute(path: string) {
  return `${siteUrl}${path}`;
}

export function brandBySlug(slug: string) {
  return brands.find((brand) => brand.slug === slug);
}
