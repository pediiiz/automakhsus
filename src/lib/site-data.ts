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
    description: "Interior division for seats, upholstery, VIP van, camper, cabin upgrades, options, CRM and customer services.",
    color: "#2F80ED",
    icon: "ص",
    subBrands: ["MrSeat", "TehranSeat"],
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
  ["technical-service", "خدمات فنی خودروهای خارجی", "مکانیک، سرویس دوره‌ای، دیاگ، برق، گیربکس، جلوبندی، ترمز و کارشناسی قبل خرید.", "01"],
  ["marketplace", "فروشگاه قطعات و تجهیزات", "قطعات مصرفی، فنی، برق و الکترونیک، آپشن، مواد دیتیلینگ، ابزار، OEM و Special Order.", "02"],
  ["interiors", "طراحی داخلی و صندلی", "صندلی، ارتقا، ون VIP، کمپر و کابین‌های اختصاصی از مسیر تهران صندلی، MrSeat و TehranSeat.", "03"],
  ["upholstery", "تودوزی و بازسازی سالن", "تودوزی فابریکی، چرم، رودری، سقف، کفپوش، فرمان و بازسازی تریم داخلی از مسیر Tuduzi.", "04"],
  ["authorized-service", "نمایندگی ANI2203", "مرکز مجاز مولتی‌برند برای Toyota، Lexus، Nissan، Suzuki، Hyundai، Skoda و Aion.", "05"],
  ["digital-platform", "پلتفرم دیجیتال خودرو", "Vehicle Digital Passport، Customer Club، Cloud Garage، CRM، گارانتی و پرتال مشتریان.", "06"],
].map(([slug, title, description, index]) => ({ slug, title, description, index }));

export const technicalServices = [
  ["mechanics", "مکانیک و سرویس دوره‌ای", "سرویس و عیب‌یابی مکانیکی خودروهای خارجی با ثبت سابقه در CRM."],
  ["diagnostics", "دیاگ تخصصی", "تحلیل خطا، سنسورها، ماژول‌ها و گزارش تشخیص پیش از تعمیر."],
  ["electronics", "برق و الکترونیک", "عیب‌یابی سیم‌کشی، ماژول‌ها، شارژ، باتری و تجهیزات الکترونیکی."],
  ["gearbox", "گیربکس", "تشخیص، سرویس، برنامه‌ریزی تعمیر و کنترل وضعیت گیربکس."],
  ["suspension", "جلوبندی و تعلیق", "بررسی کیفیت سواری، صدا، لرزش و پیشنهاد قطعات مناسب."],
  ["brake", "ترمز", "بازدید ایمنی، لنت، دیسک، سیستم ترمز و ثبت هشدارهای ایمنی."],
  ["options", "آپشن و ارتقا", "نصب و ارتقای امکانات رفاهی، الکترونیکی و OEM-style."],
  ["detailing", "دیتیلینگ", "دیتیلینگ داخلی و خارجی، آماده‌سازی، پولیش و نگهداری حرفه‌ای."],
  ["ppf-ceramic-wrap", "PPF / سرامیک / کاور", "محافظت رنگ، پوشش سرامیک، کاور خودرو و پیگیری گارانتی."],
  ["bodywork", "صافکاری", "بازدید، برنامه‌ریزی و اجرای پروژه‌های بدنه برای خودروهای خارجی."],
  ["paint", "نقاشی", "نقاشی، اصلاح رنگ، مواد مصرفی و اتصال به انبار و پروژه."],
  ["inspection", "کارشناسی قبل خرید", "دیاگ، بدنه، رنگ، کابین، سلامت فنی و گزارش دیجیتال کارشناسی."],
].map(([slug, title, description]) => ({ slug, title, description }));

export const foreignCarBrands = [
  "BMW",
  "Mercedes-Benz",
  "Porsche",
  "Audi",
  "Volkswagen",
  "Mini",
  "Land Rover",
  "Range Rover",
  "Volvo",
  "Maserati",
  "Alfa Romeo",
  "Jeep",
  "Toyota",
  "Lexus",
  "Nissan",
  "Hyundai",
  "Kia",
  "Skoda",
  "Aion",
];

export const marketplaceCategories = [
  ["consumables", "قطعات مصرفی", "فیلتر، روغن، لنت، شمع، تسمه و اقلام مصرفی خودروهای خارجی."],
  ["technical-parts", "قطعات فنی", "قطعات موتور، گیربکس، جلوبندی، ترمز و سیستم‌های مکانیکی."],
  ["electronics", "برق و الکترونیک", "سنسور، ماژول، سیم‌کشی، باتری، تجهیزات و قطعات الکترونیکی."],
  ["options-accessories", "آپشن و لوازم جانبی", "آپشن، تجهیزات رفاهی، اکسسوری و ارتقای کابین یا بدنه."],
  ["detailing-materials", "مواد دیتیلینگ", "مواد تخصصی شست‌وشو، پولیش، محافظت و نگهداری."],
  ["paint-body", "مواد صافکاری و نقاشی", "مواد بدنه، رنگ، آماده‌سازی، پوشش و تعمیرات ظاهری."],
  ["tools-equipment", "ابزار و تجهیزات", "ابزار تخصصی، تجهیزات کارگاهی و اقلام نصب و سرویس."],
  ["oem", "OEM", "قطعات اصلی و سازگار با استاندارد کارخانه."],
  ["aftermarket", "Aftermarket", "قطعات جایگزین معتبر با انتخاب فنی و کنترل کیفیت."],
  ["used", "Used", "قطعات استوک و سالم برای خودروهای خارجی، با بررسی و ثبت وضعیت."],
  ["special-order", "Special Order", "سفارش اختصاصی قطعات کمیاب یا غیراستوک با پیگیری تامین."],
].map(([slug, title, description]) => ({ slug, title, description }));

export const platformModules = [
  ["Vehicle Digital Passport", "گذرنامه دیجیتال خودرو برای هویت، سوابق سرویس، فاکتور، پروژه، مدیا و گارانتی."],
  ["Customer Club", "باشگاه مشتریان، سطح‌بندی، امتیاز، معرفی مشتری و ارتباط بلندمدت."],
  ["Cloud Garage", "پارکینگ ابری مشتری برای خودروها، سوابق، گارانتی و توصیه‌های سرویس."],
  ["Service Reminder", "یادآوری سرویس‌ها، گارانتی، بازدیدها و پیگیری‌های دوره‌ای."],
  ["Warranty Records", "ثبت گارانتی خدمات و قطعات در کنار پروژه، فاکتور و خودرو."],
  ["CRM-backed Operations", "لید، رزرو، سفارش کار، کنترل کیفیت، انبار، هزینه و پیشرفت پروژه."],
].map(([title, description]) => ({ title, description }));

export const trustSignals = [
  "مرکز تخصصی خودروهای خارجی و وارداتی",
  "فروشگاه قطعات، مواد مصرفی و تجهیزات خودروهای خارجی",
  "نمایندگی مولتی‌برند ANI Service 2203 برای برندهای مجاز",
  "پلتفرم دیجیتال CRM، گارانتی و گذرنامه خودرو",
];

export const faRoutes = [
  "/fa",
  "/fa/brands",
  "/fa/services",
  "/fa/academy",
  "/fa/videos",
  "/fa/projects",
  "/fa/feed",
  "/fa/community",
  "/fa/community/questions",
  "/fa/cars",
  "/fa/store",
  "/fa/store/categories",
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
