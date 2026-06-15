import { absolute, marketplaceCategories, visual } from "@/lib/site-data";

export type StoreCategory = {
  slug: string;
  title: string;
  description: string;
  seoTitle: string;
  metaDescription: string;
};

export type StoreProduct = {
  slug: string;
  title: string;
  category: string;
  brandCompatibility: string[];
  vehicleCompatibility: string[];
  priceLabel: string;
  stockStatus: string;
  shortDescription: string;
  technicalDescription: string;
  installOption: boolean;
  tags: string[];
};

export const storeCategories: StoreCategory[] = marketplaceCategories.map((category) => ({
  slug: category.slug,
  title: category.title,
  description: category.description,
  seoTitle: `${category.title} خودروهای خارجی | فروشگاه Auto Makhsus`,
  metaDescription: `${category.description} استعلام قیمت، خرید قطعه و خرید + نصب در Auto Makhsus برای خودروهای خارجی.`,
}));

export const storeProducts: StoreProduct[] = [
  {
    slug: "oem-oil-filter-bmw-benz",
    title: "فیلتر روغن OEM برای BMW و Benz",
    category: "consumables",
    brandCompatibility: ["BMW", "Mercedes-Benz"],
    vehicleCompatibility: ["BMW X3", "BMW X5", "Mercedes-Benz C200", "Mercedes-Benz E200"],
    priceLabel: "استعلام قیمت",
    stockStatus: "نیازمند بررسی",
    shortDescription: "فیلتر روغن اصلی یا معادل معتبر برای سرویس دوره‌ای خودروهای آلمانی.",
    technicalDescription: "قبل از تامین، کد فنی، موتور، سال ساخت و نوع سرویس بررسی می‌شود تا قطعه با خودرو سازگار باشد.",
    installOption: true,
    tags: ["OEM", "مصرفی", "سرویس دوره‌ای"],
  },
  {
    slug: "premium-brake-pad-suv",
    title: "لنت ترمز پریمیوم SUV خارجی",
    category: "technical-parts",
    brandCompatibility: ["Toyota", "Lexus", "BMW", "Hyundai", "Kia"],
    vehicleCompatibility: ["Toyota Prado", "Lexus RX", "BMW X5", "Hyundai Santa Fe", "Kia Sorento"],
    priceLabel: "استعلام قیمت",
    stockStatus: "موجود",
    shortDescription: "لنت ترمز مناسب خودروهای سنگین‌تر و SUV با کنترل کیفیت نصب.",
    technicalDescription: "انتخاب لنت باید با وزن خودرو، دیسک، کاربری شهری/سفر و وضعیت سنسور ترمز هماهنگ شود.",
    installOption: true,
    tags: ["ترمز", "SUV", "خرید + نصب"],
  },
  {
    slug: "abs-wheel-speed-sensor",
    title: "سنسور ABS و سرعت چرخ",
    category: "electronics",
    brandCompatibility: ["BMW", "Mercedes-Benz", "Audi", "Hyundai", "Kia"],
    vehicleCompatibility: ["BMW X3", "Mercedes-Benz C200", "Audi Q5", "Hyundai Tucson", "Kia Optima"],
    priceLabel: "استعلام قیمت",
    stockStatus: "نیازمند بررسی",
    shortDescription: "سنسور مرتبط با ABS/ESP پس از دیاگ و تایید خطا تامین می‌شود.",
    technicalDescription: "برای جلوگیری از تعویض اشتباه، ابتدا خطا، داده زنده، سیم‌کشی و وضعیت سوکت بررسی می‌شود.",
    installOption: true,
    tags: ["برق", "سنسور", "دیاگ"],
  },
  {
    slug: "parking-camera-oem-style",
    title: "دوربین و سنسور پارک OEM-style",
    category: "options-accessories",
    brandCompatibility: ["Toyota", "Hyundai", "Kia", "Nissan"],
    vehicleCompatibility: ["Toyota Camry", "Hyundai Santa Fe", "Kia Cerato", "Nissan X-Trail"],
    priceLabel: "استعلام قیمت",
    stockStatus: "نیازمند بررسی",
    shortDescription: "آپشن ایمنی و رفاهی با نصب تمیز، سیم‌کشی کنترل‌شده و تست نهایی.",
    technicalDescription: "نصب باید با نمایشگر، برق، نقاط نصب و ظاهر کابین خودرو سازگار باشد.",
    installOption: true,
    tags: ["آپشن", "دوربین", "نصب"],
  },
  {
    slug: "ceramic-coating-premium-kit",
    title: "پکیج مواد سرامیک بدنه پریمیوم",
    category: "detailing-materials",
    brandCompatibility: ["BMW", "Mercedes-Benz", "Porsche", "Lexus", "Toyota"],
    vehicleCompatibility: ["All Imported Cars"],
    priceLabel: "استعلام قیمت",
    stockStatus: "نیازمند بررسی",
    shortDescription: "مواد محافظت بدنه برای پروژه‌های دیتیلینگ خودروهای خارجی.",
    technicalDescription: "اجرای صحیح نیازمند آماده‌سازی سطح، کنترل نور، زمان کیورینگ و دستور نگهداری است.",
    installOption: true,
    tags: ["دیتیلینگ", "سرامیک", "محافظت رنگ"],
  },
  {
    slug: "paint-body-prep-materials",
    title: "مواد آماده‌سازی صافکاری و نقاشی",
    category: "paint-body",
    brandCompatibility: ["All Imported Cars"],
    vehicleCompatibility: ["بدنه خودروهای خارجی"],
    priceLabel: "استعلام قیمت",
    stockStatus: "سفارشی",
    shortDescription: "مواد مصرفی کنترل‌شده برای پروژه‌های بدنه، رنگ و اصلاح سطح.",
    technicalDescription: "انتخاب مواد بر اساس نوع آسیب، رنگ، سطح بدنه و استاندارد تحویل انجام می‌شود.",
    installOption: true,
    tags: ["صافکاری", "نقاشی", "مواد مصرفی"],
  },
  {
    slug: "diagnostic-workshop-tooling",
    title: "ابزار و تجهیزات عیب‌یابی کارگاهی",
    category: "tools-equipment",
    brandCompatibility: ["All Imported Cars"],
    vehicleCompatibility: ["Workshop"],
    priceLabel: "استعلام قیمت",
    stockStatus: "سفارشی",
    shortDescription: "ابزارهای فنی و تجهیزات کارگاهی برای سرویس خودروهای خارجی.",
    technicalDescription: "تجهیزات کارگاهی باید با نوع برند، سطح سرویس و فرآیند کنترل کیفیت هماهنگ باشد.",
    installOption: false,
    tags: ["ابزار", "تجهیزات", "کارگاه"],
  },
  {
    slug: "oem-spark-plug-imported-cars",
    title: "شمع موتور OEM خودروهای خارجی",
    category: "oem",
    brandCompatibility: ["BMW", "Mercedes-Benz", "Toyota", "Lexus", "Hyundai", "Kia"],
    vehicleCompatibility: ["All Imported Cars"],
    priceLabel: "استعلام قیمت",
    stockStatus: "نیازمند بررسی",
    shortDescription: "شمع موتور اصلی یا استاندارد کارخانه برای سرویس دقیق موتور.",
    technicalDescription: "نوع شمع، کد حرارتی و فاصله الکترود باید با موتور و شرایط کارکرد هماهنگ باشد.",
    installOption: true,
    tags: ["OEM", "موتور", "مصرفی"],
  },
  {
    slug: "aftermarket-suspension-control-arm",
    title: "طبق و قطعات تعلیق Aftermarket معتبر",
    category: "aftermarket",
    brandCompatibility: ["BMW", "Mercedes-Benz", "Hyundai", "Kia", "Toyota"],
    vehicleCompatibility: ["BMW X3", "Mercedes-Benz E200", "Hyundai Tucson", "Toyota Prado"],
    priceLabel: "استعلام قیمت",
    stockStatus: "موجود",
    shortDescription: "قطعات تعلیق جایگزین معتبر برای کاهش هزینه با حفظ کیفیت قابل قبول.",
    technicalDescription: "قطعه Aftermarket باید از نظر کیفیت ساخت، دوام و سازگاری نصب بررسی شود.",
    installOption: true,
    tags: ["Aftermarket", "تعلیق", "جلوبندی"],
  },
  {
    slug: "used-headlight-module",
    title: "چراغ و ماژول استوک سالم",
    category: "used",
    brandCompatibility: ["BMW", "Mercedes-Benz", "Lexus", "Toyota", "Nissan"],
    vehicleCompatibility: ["مدل‌های منتخب وارداتی"],
    priceLabel: "استعلام قیمت",
    stockStatus: "نیازمند بررسی",
    shortDescription: "قطعات استوک فقط پس از بررسی سلامت، کد فنی و سازگاری پیشنهاد می‌شوند.",
    technicalDescription: "برای قطعات استوک، ریسک ظاهری/برقی، سازگاری سوکت و تست عملکرد باید شفاف شود.",
    installOption: true,
    tags: ["استوک", "برق", "قطعه کمیاب"],
  },
  {
    slug: "special-order-gearbox-parts",
    title: "سفارش خارجی قطعات گیربکس",
    category: "special-order",
    brandCompatibility: ["Porsche", "BMW", "Mercedes-Benz", "Audi", "Land Rover"],
    vehicleCompatibility: ["مدل‌های خاص و قطعات کمیاب"],
    priceLabel: "استعلام قیمت",
    stockStatus: "سفارشی",
    shortDescription: "مسیر سفارش قطعه کمیاب با ثبت خودرو، مشتری، زمان تامین و نصب احتمالی.",
    technicalDescription: "قبل از سفارش، خطا، مدل گیربکس، کد قطعه، تامین‌کننده و ریسک زمان تحویل بررسی می‌شود.",
    installOption: true,
    tags: ["Special Order", "گیربکس", "قطعه خاص"],
  },
];

export function findStoreCategory(slug: string) {
  return storeCategories.find((category) => category.slug === slug);
}

export function findStoreProduct(slug: string) {
  return storeProducts.find((product) => product.slug === slug);
}

export function productsByCategory(slug: string) {
  return storeProducts.filter((product) => product.category === slug);
}

export function storeCategoryPath(slug: string) {
  return `/fa/store/categories/${slug}`;
}

export function storeProductPath(slug: string) {
  return `/fa/store/products/${slug}`;
}

export const storeRoutes = [
  "/fa/store",
  "/fa/store/categories",
  "/fa/store/search",
  ...storeCategories.map((category) => storeCategoryPath(category.slug)),
  ...storeProducts.map((product) => storeProductPath(product.slug)),
];

export function storeProductSchema(product: StoreProduct) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.technicalDescription,
    image: absolute(visual.og),
    brand: product.brandCompatibility.map((brand) => ({ "@type": "Brand", name: brand })),
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "IRR",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "IRR",
        description: product.priceLabel,
      },
    },
  };
}
