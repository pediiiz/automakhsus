export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://automakhsus.com";

export const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER || "02146063262";
export const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "989122470048";

export const visual = {
  hero: "/uploads/automakhsus/hero/automakhsus-ecosystem.svg",
  platform: "/uploads/automakhsus/hero/digital-platform.svg",
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
    color: "#0B5CFF",
  },
  {
    slug: "mrseat",
    name: "MrSeat",
    fa: "مستر سیت",
    url: "https://mrseat.ir",
    description: "Specialist brand for automotive seats, imported stock seats, electric seats, installation and seat upgrades.",
    color: "#2F80ED",
  },
  {
    slug: "tehranseat",
    name: "TehranSeat",
    fa: "تهران سیت",
    url: "https://tehranseat.ir",
    description: "Premium brand for luxury seats, VIP seats, executive seats, and advanced seat options.",
    color: "#8FD3FF",
  },
  {
    slug: "tuduzi",
    name: "Tuduzi",
    fa: "تودوزی",
    url: "https://tuduzi.com",
    description: "Specialized brand for factory-style upholstery, leather trim, steering wheel stitching, door trims, headliner, flooring, and interior restoration.",
    color: "#4DA3FF",
  },
  {
    slug: "ani2203",
    name: "ANI2203",
    fa: "آنی سرویس ۲۲۰۳",
    url: "https://ani2203.com",
    description: "Multi-brand ANI Service representative code 2203, covering Toyota, Lexus, Nissan, Suzuki, Hyundai, Skoda, and Aion across Karaj, Shahriar, Qods, Garmdareh, West Tehran and Alborz.",
    color: "#BDE9FF",
  },
];

export const servicePillars = [
  ["automotive-interiors", "Automotive Interiors", "طراحی، بازسازی و ارتقای فضای داخلی خودرو از کابین‌های لوکس تا پروژه‌های تخصصی."],
  ["seats", "Seats & Seat Upgrades", "صندلی خودرو، صندلی استوک خارجی، صندلی برقی، VIP و ارتقای امکانات نشیمن."],
  ["upholstery", "Upholstery & Trim", "تودوزی فابریکی، چرم، رودری، سقف، کفپوش، فرمان و بازسازی تریم داخلی."],
  ["vip-van-camper", "VIP Van & Camper", "طراحی و اجرای ون VIP، کمپر، کابین‌های تشریفاتی و فضای اختصاصی سفر."],
  ["multi-brand-service", "Multi-brand Service", "سرویس مولتی‌برند، دیاگ، برق، مکانیک، آپشن، دیتیلینگ، رنگ و بدنه."],
  ["digital-crm", "Digital CRM Platform", "CRM، پرتال مشتریان، رزرو، کتابخانه رسانه، سفارش کار و رهگیری پیشرفت."],
].map(([slug, title, description]) => ({ slug, title, description }));

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
