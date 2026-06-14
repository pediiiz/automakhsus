import { absolute, visual } from "@/lib/site-data";

export type ContentKind = "article" | "video" | "project" | "feed" | "question";

export type ContentCard = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  category: string;
  tags: string[];
  brand?: string;
  model?: string;
  service: string;
  readTime?: string;
  date: string;
  image: string;
  path: string;
  sections: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  relatedServices: string[];
};

export type VideoContent = ContentCard & {
  duration: string;
  transcript: string;
  poster: string;
  chapters: { time: string; title: string; summary: string }[];
  relatedCars: { brand: string; model?: string; href: string }[];
};

export type ProjectContent = ContentCard & {
  vehicle: string;
  executionTime: string;
  stages: { title: string; body: string }[];
};

export type FeedContent = ContentCard & {
  format: "photo" | "video" | "project" | "service";
};

export type QuestionContent = ContentCard & {
  acceptedAnswer: string;
};

export type VehicleBrand = {
  slug: string;
  name: string;
  fa: string;
  description: string;
  originCountry: string;
  category: string;
  regions: string[];
  featured?: boolean;
  brandMark: {
    text: string;
    source: string;
    license: string;
    usageStatus: "official" | "licensed" | "internal" | "typographic-placeholder";
    path?: string;
    attribution?: string;
  };
  services: string[];
  commonIssues: string[];
  diagnostics: string[];
  parts: string[];
  options: string[];
  detailing: string[];
  servicePackages: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  models: VehicleModel[];
};

export type VehicleModel = {
  slug: string;
  name: string;
  fa: string;
  years: string;
  bodyType?: string;
  image?: {
    path: string;
    source: string;
    license: string;
    attribution?: string;
  };
  generations?: VehicleGeneration[];
  intro: string;
  commonIssues: string[];
  maintenance: string[];
  diagnostics: string[];
  parts: string[];
  servicePackages: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
};

export type VehicleGeneration = {
  slug: string;
  name: string;
  years: string;
  note: string;
  image?: {
    path: string;
    source: string;
    license: string;
    attribution?: string;
  };
};

export const contentVisual = {
  academy: visual.hero,
  videos: visual.platform,
  projects: visual.network,
  feed: visual.og,
  community: visual.network,
  cars: visual.hero,
};

export const academyArticles: ContentCard[] = [
  {
    slug: "foreign-car-diagnostics-guide",
    title: "راهنمای دیاگ تخصصی خودروهای خارجی",
    eyebrow: "Diagnostic Guide",
    summary: "چطور خطاهای خودروهای وارداتی را قبل از تعمیر درست تحلیل کنیم.",
    description: "دیاگ تخصصی فقط خواندن کد خطا نیست؛ باید ارتباط سنسور، ماژول، سابقه سرویس و علائم واقعی خودرو با هم دیده شود.",
    category: "راهنمای عیب‌یابی",
    tags: ["دیاگ", "برق", "سنسور", "خودرو خارجی"],
    brand: "All Imported Cars",
    service: "دیاگ تخصصی",
    readTime: "۷ دقیقه",
    date: "2026-06-14",
    image: contentVisual.academy,
    path: "/fa/academy/foreign-car-diagnostics-guide",
    relatedServices: ["diagnostics", "electronics", "inspection"],
    sections: [
      { title: "دیاگ یعنی تحلیل، نه فقط پاک کردن خطا", body: "در خودروهای خارجی، یک خطای ساده می‌تواند نتیجه افت ولتاژ، خرابی سنسور، مشکل سیم‌کشی، آپدیت نرم‌افزاری یا خرابی مکانیکی باشد. Auto Makhsus دیاگ را به عنوان یک فرآیند تشخیص مرحله‌ای می‌بیند، نه یک عملیات سریع و سطحی." },
      { title: "چه زمانی باید دیاگ تخصصی انجام شود؟", body: "روشن شدن چراغ چک، افت توان، تعویض دنده غیرعادی، خطای سیستم‌های ایمنی، مصرف سوخت غیرطبیعی، بد کار کردن موتور و خطاهای مقطعی از مواردی هستند که نیاز به بررسی دقیق دارند." },
      { title: "خروجی درست دیاگ", body: "خروجی مناسب باید شامل کد خطا، علائم، اولویت تعمیر، قطعات احتمالی، ریسک ادامه رانندگی و پیشنهاد سرویس باشد تا مشتری قبل از هزینه تصمیم روشن بگیرد." },
    ],
    faqs: [
      { question: "آیا پاک کردن خطا مشکل را حل می‌کند؟", answer: "خیر. پاک کردن خطا فقط چراغ هشدار را موقتاً خاموش می‌کند؛ علت اصلی باید تشخیص داده شود." },
      { question: "دیاگ برای خرید خودرو هم لازم است؟", answer: "بله، دیاگ قبل خرید می‌تواند خطاهای پنهان، دستکاری‌ها و مشکلات ماژول‌ها را مشخص کند." },
    ],
  },
  {
    slug: "imported-car-maintenance-schedule",
    title: "برنامه نگهداری خودروهای خارجی در ایران",
    eyebrow: "Maintenance Guide",
    summary: "چطور سرویس دوره‌ای، قطعات مصرفی و یادآوری‌ها را برای خودروهای وارداتی مدیریت کنیم.",
    description: "شرایط رانندگی، کیفیت سوخت، ترافیک و دسترسی به قطعه باعث می‌شود برنامه نگهداری خودروهای خارجی در ایران نیازمند دقت بیشتر باشد.",
    category: "راهنمای نگهداری",
    tags: ["سرویس دوره‌ای", "قطعات مصرفی", "گارانتی", "Vehicle Passport"],
    service: "سرویس دوره‌ای",
    readTime: "۶ دقیقه",
    date: "2026-06-14",
    image: contentVisual.academy,
    path: "/fa/academy/imported-car-maintenance-schedule",
    relatedServices: ["mechanics", "brake", "gearbox"],
    sections: [
      { title: "سرویس دوره‌ای باید سابقه‌دار باشد", body: "هر تعویض روغن، فیلتر، لنت، بررسی گیربکس یا دیاگ باید به سابقه خودرو متصل شود تا در آینده برای گارانتی، فروش خودرو و تصمیم فنی قابل استفاده باشد." },
      { title: "قطعات مصرفی مهم", body: "روغن، فیلتر، لنت، شمع، تسمه، روغن گیربکس، باتری و اقلام تعلیق برای خودروهای خارجی باید با کیفیت و سازگاری درست انتخاب شوند." },
      { title: "نقش Vehicle Digital Passport", body: "گذرنامه دیجیتال خودرو می‌تواند تمام سوابق سرویس، فاکتور، قطعه، گارانتی و توصیه‌های آینده را در یک پرونده نگه دارد." },
    ],
    faqs: [
      { question: "سرویس دوره‌ای خودرو خارجی چند وقت یکبار لازم است؟", answer: "بسته به برند، مدل، کیلومتر و شرایط مصرف متفاوت است؛ اما ثبت سابقه و بازدید منظم مهم‌تر از حدس‌زدن است." },
      { question: "آیا Auto Makhsus قطعه و نصب را با هم مدیریت می‌کند؟", answer: "در معماری فروشگاه، خرید قطعه و خرید + نصب در Auto Makhsus به CRM، فاکتور و پروژه وصل می‌شود." },
    ],
  },
  {
    slug: "pre-purchase-inspection-imported-cars",
    title: "کارشناسی قبل خرید خودروهای خارجی",
    eyebrow: "Inspection Guide",
    summary: "چک‌لیست فنی، بدنه، رنگ، دیاگ و کابین برای خرید امن خودرو خارجی.",
    description: "خرید خودرو خارجی بدون کارشناسی دقیق می‌تواند هزینه‌های پنهان مکانیکی، برقی، بدنه، رنگ و قطعات کمیاب ایجاد کند.",
    category: "راهنمای کارشناسی",
    tags: ["کارشناسی قبل خرید", "بدنه", "دیاگ", "رنگ"],
    service: "کارشناسی قبل خرید",
    readTime: "۸ دقیقه",
    date: "2026-06-14",
    image: contentVisual.academy,
    path: "/fa/academy/pre-purchase-inspection-imported-cars",
    relatedServices: ["inspection", "diagnostics", "paint"],
    sections: [
      { title: "کارشناسی فقط رنگ‌سنجی نیست", body: "برای خودرو خارجی باید دیاگ، موتور، گیربکس، تعلیق، برق، کابین، آپشن‌ها، سوابق سرویس، بدنه و دسترسی قطعات با هم بررسی شود." },
      { title: "ریسک‌های خاص خودروهای وارداتی", body: "قطعه کمیاب، تعمیرات غیراستاندارد، خطاهای ماژولی و سابقه تصادف پنهان می‌تواند هزینه مالکیت را بالا ببرد." },
      { title: "گزارش دیجیتال", body: "گزارش دیجیتال کارشناسی می‌تواند پایه Health Score، Vehicle Passport و تصمیم خرید امن‌تر باشد." },
    ],
    faqs: [
      { question: "آیا کارشناسی قبل خرید شامل دیاگ است؟", answer: "در مدل Auto Makhsus، دیاگ یکی از بخش‌های اصلی کارشناسی خودرو خارجی است." },
      { question: "گزارش کارشناسی به پرونده خودرو وصل می‌شود؟", answer: "در فازهای آینده، گزارش کارشناسی به Vehicle Digital Passport متصل خواهد شد." },
    ],
  },
];

export const videos: VideoContent[] = [
  {
    slug: "diagnostic-workflow-video",
    title: "ویدئو آموزشی فرآیند دیاگ تخصصی",
    eyebrow: "Video Center",
    summary: "نمای کلی از مراحل بررسی خطا، سنسور، ماژول و گزارش فنی.",
    description: "این صفحه نمونه ساختار ویدئوهای آموزشی Auto Makhsus را نشان می‌دهد؛ ویدئوها با توضیح، ترنسکریپت و CTA به CRM متصل می‌شوند.",
    category: "ویدئو آموزشی",
    tags: ["دیاگ", "برق", "آموزشی"],
    service: "دیاگ تخصصی",
    date: "2026-06-14",
    image: contentVisual.videos,
    poster: contentVisual.videos,
    duration: "03:40",
    transcript: "در این ویدئو، مسیر استاندارد دیاگ از دریافت علائم مشتری تا خواندن کد خطا، بررسی داده زنده و ارائه گزارش توضیح داده می‌شود.",
    chapters: [
      { time: "00:00", title: "ثبت علائم", summary: "چه اطلاعاتی از مشتری و خودرو قبل از اتصال دستگاه لازم است." },
      { time: "00:48", title: "خواندن کد و داده زنده", summary: "تفاوت کد خطا، داده زنده و تست عملی در خودروهای خارجی." },
      { time: "02:10", title: "گزارش تشخیص", summary: "چطور نتیجه دیاگ به اولویت تعمیر و هزینه احتمالی تبدیل می‌شود." },
    ],
    relatedCars: [
      { brand: "BMW", model: "X5", href: "/fa/cars/bmw/x5" },
      { brand: "Mercedes-Benz", model: "C200", href: "/fa/cars/mercedes-benz/c200" },
      { brand: "Hyundai", model: "Santa Fe", href: "/fa/cars/hyundai/santa-fe" },
    ],
    path: "/fa/videos/diagnostic-workflow-video",
    relatedServices: ["diagnostics", "electronics"],
    sections: [
      { title: "موضوع ویدئو", body: "هدف ویدئو توضیح تفاوت دیاگ سطحی و تشخیص تخصصی برای خودروهای وارداتی است." },
      { title: "کاربرد برای مشتری", body: "مشتری قبل از مراجعه می‌فهمد چه اطلاعاتی باید آماده کند و چرا گزارش تشخیص مهم است." },
    ],
    faqs: [
      { question: "آیا ویدئو جایگزین تشخیص حضوری است؟", answer: "خیر، ویدئو آموزشی است و تشخیص نهایی با بررسی خودرو انجام می‌شود." },
    ],
  },
  {
    slug: "option-installation-video",
    title: "ویدئو نصب آپشن OEM-style",
    eyebrow: "Option Installation",
    summary: "معرفی استانداردهای نصب آپشن، سیم‌کشی و کنترل کیفیت.",
    description: "نصب آپشن در خودروهای خارجی باید با ظاهر کارخانه‌ای، سیم‌کشی ایمن و QC انجام شود.",
    category: "ویدئو خدمات",
    tags: ["آپشن", "نصب", "برق"],
    service: "آپشن و ارتقا",
    date: "2026-06-14",
    image: contentVisual.videos,
    poster: contentVisual.videos,
    duration: "04:15",
    transcript: "در این ویدئو درباره انتخاب قطعه، سازگاری، نصب، تست عملکرد و ثبت گارانتی نصب صحبت می‌شود.",
    chapters: [
      { time: "00:00", title: "بررسی سازگاری", summary: "انتخاب آپشن بر اساس برند، مدل، برق و ماژول‌های خودرو." },
      { time: "01:12", title: "نصب تمیز", summary: "مسیر سیم‌کشی، فیتینگ کابین و حفظ ظاهر کارخانه‌ای." },
      { time: "03:05", title: "کنترل کیفیت", summary: "تست عملکرد، خطایابی بعد نصب و ثبت مسیر گارانتی." },
    ],
    relatedCars: [
      { brand: "Toyota", model: "Prado", href: "/fa/cars/toyota/prado" },
      { brand: "Lexus", model: "RX", href: "/fa/cars/lexus/rx" },
      { brand: "Kia", model: "Optima", href: "/fa/cars/kia/optima" },
    ],
    path: "/fa/videos/option-installation-video",
    relatedServices: ["options", "electronics"],
    sections: [
      { title: "نصب تمیز و ایمن", body: "تمرکز ویدئو روی نصب بدون تخریب، مسیر سیم‌کشی کنترل‌شده و تست نهایی است." },
      { title: "ارتباط با CRM", body: "در آینده هر نصب می‌تواند به سفارش کار، قطعه مصرفی و گارانتی در پرونده خودرو وصل شود." },
    ],
    faqs: [
      { question: "آیا هر آپشنی روی هر خودرو نصب می‌شود؟", answer: "خیر، سازگاری برند، مدل، برق و ماژول‌ها باید بررسی شود." },
    ],
  },
];

export const projects: ProjectContent[] = [
  {
    slug: "bmw-x5-diagnostic-service",
    title: "نمونه کار عیب‌یابی BMW X5",
    eyebrow: "Project Showcase",
    summary: "از علائم اولیه تا دیاگ، بررسی برق و تحویل گزارش.",
    description: "نمونه ساختار پروژه عمومی Auto Makhsus برای نمایش قبل، حین و بعد از خدمت بدون افشای اطلاعات خصوصی مشتری.",
    category: "نمونه کار فنی",
    tags: ["BMW", "X5", "دیاگ", "برق"],
    brand: "BMW",
    model: "X5",
    service: "دیاگ تخصصی",
    vehicle: "BMW X5",
    executionTime: "یک روز کاری",
    date: "2026-06-14",
    image: contentVisual.projects,
    path: "/fa/projects/bmw-x5-diagnostic-service",
    relatedServices: ["diagnostics", "electronics"],
    stages: [
      { title: "قبل", body: "ثبت علائم مشتری، بررسی اولیه و اتصال دستگاه دیاگ." },
      { title: "حین", body: "تحلیل خطا، داده زنده، مسیر برق و تست قطعه مرتبط." },
      { title: "بعد", body: "تحویل گزارش تشخیص، پیشنهاد سرویس و ثبت مسیر پیگیری." },
    ],
    sections: [
      { title: "مسئله", body: "خودرو با خطای مقطعی و افت عملکرد مراجعه می‌کند و نیاز به تشخیص دقیق دارد." },
      { title: "راه‌حل", body: "فرآیند مرحله‌ای دیاگ، بررسی برق و ثبت گزارش به تصمیم تعمیر کمک می‌کند." },
    ],
    faqs: [
      { question: "آیا اطلاعات پلاک یا VIN منتشر می‌شود؟", answer: "خیر، پروژه‌های عمومی فقط با داده امن و بدون اطلاعات خصوصی منتشر می‌شوند." },
    ],
  },
  {
    slug: "lexus-detailing-protection",
    title: "نمونه کار دیتیلینگ و محافظت Lexus",
    eyebrow: "Before / During / After",
    summary: "مسیر آماده‌سازی، اصلاح سطح و محافظت نهایی برای خودرو خارجی.",
    description: "پروژه‌های دیتیلینگ باید با تصویر، توضیح مواد، زمان اجرا و توصیه نگهداری منتشر شوند.",
    category: "دیتیلینگ",
    tags: ["Lexus", "دیتیلینگ", "سرامیک"],
    brand: "Lexus",
    model: "RX",
    service: "دیتیلینگ",
    vehicle: "Lexus RX",
    executionTime: "دو روز کاری",
    date: "2026-06-14",
    image: contentVisual.projects,
    path: "/fa/projects/lexus-detailing-protection",
    relatedServices: ["detailing", "ppf-ceramic-wrap"],
    stages: [
      { title: "قبل", body: "بازدید سطح رنگ، خط و خش و آلودگی‌های سطحی." },
      { title: "حین", body: "شست‌وشوی تخصصی، اصلاح سطح و آماده‌سازی." },
      { title: "بعد", body: "تحویل با توصیه نگهداری و ثبت سابقه سرویس." },
    ],
    sections: [
      { title: "مسئله", body: "رنگ خودرو نیاز به احیا، محافظت و برنامه نگهداری داشت." },
      { title: "راه‌حل", body: "با دیتیلینگ مرحله‌ای و ثبت توصیه نگهداری، ظاهر و ارزش خودرو بهتر حفظ می‌شود." },
    ],
    faqs: [
      { question: "آیا دیتیلینگ به گارانتی وصل می‌شود؟", answer: "در معماری آینده، سوابق نگهداری و گارانتی به Vehicle Passport متصل می‌شود." },
    ],
  },
];

export const feedItems: FeedContent[] = [
  {
    slug: "daily-diagnostics-queue",
    title: "امروز در صف دیاگ تخصصی",
    eyebrow: "Daily Feed",
    summary: "چند خودروی خارجی برای بررسی خطا، برق و سرویس وارد صف عملیاتی شدند.",
    description: "فید روزانه قرار است فعالیت‌های واقعی، پروژه‌ها، ویدئوها و نکات کوتاه را به صفحه‌ای قابل دنبال کردن تبدیل کند.",
    category: "پست روزانه",
    tags: ["دیاگ", "روزمره", "کارگاه"],
    service: "دیاگ تخصصی",
    date: "2026-06-14",
    image: contentVisual.feed,
    path: "/fa/feed/daily-diagnostics-queue",
    format: "service",
    relatedServices: ["diagnostics", "electronics"],
    sections: [
      { title: "یادداشت روز", body: "چند مراجعه امروز مربوط به خطاهای مقطعی بود؛ این نوع خطاها باید با سابقه، دیاگ و تست عملی بررسی شوند." },
    ],
    faqs: [
      { question: "آیا این فید شبکه اجتماعی عمومی است؟", answer: "فعلاً فاز اول فقط فید خواندنی و کنترل‌شده است، بدون پست عمومی کاربران." },
    ],
  },
  {
    slug: "marketplace-special-order-note",
    title: "یادداشت سفارش خاص قطعه",
    eyebrow: "Marketplace Feed",
    summary: "فروشگاه Auto Makhsus برای قطعات کمیاب، مسیر Special Order خواهد داشت.",
    description: "پست‌های فید می‌توانند به خرید قطعه، خرید + نصب و درخواست تامین خاص وصل شوند.",
    category: "فروشگاه",
    tags: ["Special Order", "قطعه", "فروشگاه"],
    service: "فروشگاه قطعات",
    date: "2026-06-14",
    image: contentVisual.feed,
    path: "/fa/feed/marketplace-special-order-note",
    format: "photo",
    relatedServices: ["technical-parts", "electronics"],
    sections: [
      { title: "یادداشت روز", body: "برای قطعاتی که موجود نیستند، فرآیند سفارش خاص باید به مشتری، خودرو، تامین‌کننده، فاکتور و پروژه نصب وصل شود." },
    ],
    faqs: [
      { question: "آیا فروشگاه همین حالا فعال است؟", answer: "فعلاً این بخش پیش‌نمایش و معماری محتوایی است؛ درخواست‌ها به CRM ارسال می‌شوند." },
    ],
  },
];

export const questions: QuestionContent[] = [
  {
    slug: "why-check-engine-returns-after-reset",
    title: "چرا چراغ چک بعد از پاک کردن خطا برمی‌گردد؟",
    eyebrow: "Q&A",
    summary: "دلایل فنی برگشت چراغ چک و مسیر تشخیص درست در خودروهای خارجی.",
    description: "پاک کردن خطا مشکل اصلی را حل نمی‌کند و در خودروهای خارجی باید علت ریشه‌ای خطا بررسی شود.",
    category: "عیب‌یابی",
    tags: ["چراغ چک", "دیاگ", "خطا"],
    service: "دیاگ تخصصی",
    date: "2026-06-14",
    image: contentVisual.community,
    path: "/fa/community/questions/why-check-engine-returns-after-reset",
    acceptedAnswer: "چراغ چک وقتی برمی‌گردد یعنی ECU دوباره همان شرایط خطا را تشخیص داده است. علت می‌تواند سنسور، سیم‌کشی، افت ولتاژ، نشتی، مشکل مکانیکی یا حتی نرم‌افزار باشد. مسیر درست، بررسی کد، داده زنده، علائم و تست قطعه است.",
    relatedServices: ["diagnostics", "electronics"],
    sections: [
      { title: "صورت سوال", body: "بعد از دیاگ و پاک کردن خطا، چراغ چک دوباره روشن می‌شود. آیا مشکل از دستگاه دیاگ است یا قطعه خراب است؟" },
      { title: "پاسخ پذیرفته‌شده", body: "پاک کردن خطا فقط حافظه خطا را پاک می‌کند. اگر علت باقی باشد، چراغ دوباره فعال می‌شود." },
    ],
    faqs: [
      { question: "آیا می‌توان با چراغ چک رانندگی کرد؟", answer: "بسته به نوع خطا متفاوت است؛ خطاهای موتور، گیربکس یا ایمنی باید جدی بررسی شوند." },
    ],
  },
  {
    slug: "best-maintenance-for-used-imported-car",
    title: "بعد از خرید خودرو خارجی کارکرده چه سرویس‌هایی مهم‌تر است؟",
    eyebrow: "Owner Question",
    summary: "اولویت‌های اولیه بعد از خرید خودرو وارداتی دست دوم.",
    description: "برای خودرو خارجی کارکرده، اولویت با دیاگ، سرویس مصرفی، بررسی گیربکس، ترمز، تعلیق و سوابق است.",
    category: "نگهداری",
    tags: ["خودرو کارکرده", "سرویس", "کارشناسی"],
    service: "سرویس دوره‌ای",
    date: "2026-06-14",
    image: contentVisual.community,
    path: "/fa/community/questions/best-maintenance-for-used-imported-car",
    acceptedAnswer: "بعد از خرید خودرو خارجی کارکرده، ابتدا دیاگ کامل، بررسی روغن‌ها، فیلترها، ترمز، تعلیق، باتری، گیربکس، نشتی‌ها و سوابق سرویس را انجام دهید. سپس برای قطعات مصرفی و سرویس‌های بعدی برنامه بسازید.",
    relatedServices: ["inspection", "mechanics", "brake"],
    sections: [
      { title: "صورت سوال", body: "یک خودرو خارجی کارکرده خریده‌ام. برای جلوگیری از هزینه‌های سنگین، اول چه چیزهایی را بررسی کنم؟" },
      { title: "پاسخ پذیرفته‌شده", body: "اول تشخیص و سرویس پایه، بعد برنامه نگهداری. هر کاری که انجام می‌شود باید به سابقه خودرو اضافه شود." },
    ],
    faqs: [
      { question: "آیا تعویض همه قطعات مصرفی لازم است؟", answer: "نه همیشه؛ بهتر است بر اساس بازدید، کیلومتر، کیفیت قطعه و سابقه تصمیم گرفته شود." },
    ],
  },
];

const seedArticles: Omit<ContentCard, "image" | "date" | "path" | "relatedServices" | "sections" | "faqs">[] = [
  { slug: "bmw-service-cost-control", title: "کنترل هزینه خدمات BMW در ایران", eyebrow: "BMW Guide", summary: "چطور با دیاگ، سرویس دوره‌ای و انتخاب قطعه درست هزینه نگهداری BMW را کنترل کنیم.", description: "خدمات BMW وقتی قابل مدیریت می‌شود که تشخیص، قطعه و سابقه سرویس در یک مسیر شفاف ثبت شود.", category: "راهنمای برند", tags: ["BMW", "هزینه سرویس", "قطعات"], brand: "BMW", service: "خدمات BMW", readTime: "۸ دقیقه" },
  { slug: "benz-electrical-diagnostics", title: "عیب‌یابی برق و ماژول‌های Benz", eyebrow: "Benz Diagnostics", summary: "راهنمای تشخیص خطاهای برقی مرسدس بنز قبل از تعویض قطعه.", description: "در خودروهای Benz خطای ماژول، افت ولتاژ و نصب آپشن غیراستاندارد باید مرحله‌ای بررسی شود.", category: "راهنمای عیب‌یابی", tags: ["Benz", "برق", "ماژول"], brand: "Mercedes-Benz", service: "برق و الکترونیک", readTime: "۷ دقیقه" },
  { slug: "porsche-maintenance-risk", title: "ریسک‌های نگهداری Porsche کارکرده", eyebrow: "Porsche Guide", summary: "نکاتی که قبل از سرویس، خرید قطعه و کارشناسی پورشه باید بدانید.", description: "پورشه به تشخیص دقیق، قطعه معتبر و گزارش مستند نیاز دارد تا تعمیر اشتباه هزینه سنگین ایجاد نکند.", category: "راهنمای برند", tags: ["Porsche", "کارشناسی", "قطعه"], brand: "Porsche", service: "کارشناسی قبل خرید", readTime: "۹ دقیقه" },
  { slug: "toyota-lexus-periodic-service", title: "سرویس Toyota و Lexus؛ از مصرفی تا دیاگ", eyebrow: "Toyota Lexus", summary: "برنامه سرویس، قطعه و ثبت سابقه برای تویوتا و لکسوس وارداتی.", description: "Toyota و Lexus اگر با قطعه مناسب و سرویس مستند نگهداری شوند، ارزش و اعتماد بالاتری حفظ می‌کنند.", category: "راهنمای نگهداری", tags: ["Toyota", "Lexus", "سرویس دوره‌ای"], brand: "Toyota", service: "سرویس دوره‌ای", readTime: "۶ دقیقه" },
  { slug: "imported-car-parts-buy-install", title: "خرید قطعه خودرو خارجی همراه نصب", eyebrow: "Marketplace Guide", summary: "چرا خرید + نصب در Auto Makhsus برای قطعات حساس منطقی‌تر است.", description: "خرید قطعه بدون بررسی سازگاری و نصب می‌تواند دوباره‌کاری ایجاد کند؛ مسیر خرید + نصب به CRM، فاکتور و پروژه متصل می‌شود.", category: "فروشگاه قطعات", tags: ["قطعات خودروهای خارجی", "خرید + نصب", "OEM"], service: "فروشگاه قطعات", readTime: "۷ دقیقه" },
  { slug: "detailing-foreign-cars", title: "دیتیلینگ خودروهای خارجی؛ محافظت از ارزش خودرو", eyebrow: "Detailing", summary: "دیتیلینگ، PPF، سرامیک و مراقبت بدنه برای خودروهای خارجی.", description: "دیتیلینگ حرفه‌ای فقط زیبایی نیست؛ بخشی از نگهداری ارزش خودرو، کابین و رنگ محسوب می‌شود.", category: "دیتیلینگ", tags: ["دیتیلینگ", "PPF", "سرامیک"], service: "دیتیلینگ خودروهای خارجی", readTime: "۶ دقیقه" },
  { slug: "foreign-car-options-safe-install", title: "نصب آپشن خودروهای خارجی بدون آسیب", eyebrow: "Options", summary: "اصول نصب آپشن، سیم‌کشی و کنترل کیفیت برای خودروهای وارداتی.", description: "هر آپشن باید از نظر برق، ماژول و سازگاری بررسی شود و بعد از نصب تست و ثبت گارانتی شود.", category: "آپشن خودرو", tags: ["آپشن خودروهای خارجی", "نصب", "برق"], service: "آپشن و ارتقا", readTime: "۷ دقیقه" },
  { slug: "imported-car-gearbox-warning-signs", title: "علائم هشدار گیربکس خودروهای خارجی", eyebrow: "Gearbox", summary: "تقه، تاخیر، داغی و حالت اضطراری گیربکس را جدی بگیرید.", description: "خرابی گیربکس خودروهای خارجی معمولاً قبل از هزینه سنگین با نشانه‌هایی قابل تشخیص است.", category: "گیربکس", tags: ["گیربکس", "دیاگ", "تعمیرگاه خودروهای خارجی"], service: "گیربکس", readTime: "۸ دقیقه" },
];

academyArticles.push(...seedArticles.map((item) => ({
  ...item,
  date: "2026-06-14",
  image: contentVisual.academy,
  path: `/fa/academy/${item.slug}`,
  relatedServices: [item.service.includes("قطعه") ? "technical-parts" : "diagnostics", "mechanics", "inspection"],
  sections: [
    { title: "مسئله اصلی", body: `${item.title} برای مالک خودرو خارجی مهم است چون تصمیم اشتباه در تشخیص، قطعه یا نصب می‌تواند هزینه و زمان پروژه را بالا ببرد.` },
    { title: "مسیر Auto Makhsus", body: "در Auto Makhsus درخواست از فرم سایت وارد CRM می‌شود، برند و مدل خودرو مشخص می‌شود، مشاور فنی یا فروشگاه قطعات مسیر بررسی، تامین، نصب و ثبت سابقه را دنبال می‌کند." },
    { title: "خروجی قابل پیگیری", body: "هدف این است که سرویس، قطعه، فاکتور، گارانتی و توصیه بعدی در مسیر دیجیتال خودرو قابل پیگیری باشد و مشتری تصمیم روشن بگیرد." },
  ],
  faqs: [
    { question: "آیا قبل از خرید قطعه باید خودرو بررسی شود؟", answer: "برای قطعات حساس بله؛ سازگاری قطعه، برند، مدل، سال و نیاز نصب باید قبل از خرید قطعی شود." },
    { question: "آیا درخواست از سایت وارد CRM می‌شود؟", answer: "بله، فرم‌های Auto Makhsus با منبع automakhsus و businessUnit مناسب در CRM ثبت می‌شوند." },
  ],
})));

const seedVideos: Omit<VideoContent, "image" | "poster" | "date" | "path" | "relatedServices" | "sections" | "faqs" | "chapters" | "relatedCars" | "transcript">[] = [
  { slug: "bmw-diagnostics-checklist-video", title: "چک‌لیست ویدئویی دیاگ BMW", eyebrow: "BMW Video", summary: "مراحل سریع بررسی خطاهای BMW قبل از تعمیر.", description: "ویدئو ساختاری برای آموزش مالک BMW درباره داده زنده، خطا و گزارش تشخیص.", category: "ویدئو دیاگ", tags: ["BMW", "دیاگ"], service: "خدمات BMW", duration: "04:20" },
  { slug: "benz-module-warning-video", title: "خطاهای ماژول بنز را چطور بخوانیم؟", eyebrow: "Benz Video", summary: "نکات مهم درباره خطای ماژول و افت ولتاژ در Mercedes-Benz.", description: "این ویدئو توضیح می‌دهد چرا پاک کردن خطا کافی نیست و تست برق لازم است.", category: "ویدئو آموزشی", tags: ["Benz", "برق"], service: "برق و الکترونیک", duration: "05:05" },
  { slug: "porsche-prepurchase-video", title: "کارشناسی قبل خرید Porsche", eyebrow: "Inspection Video", summary: "چک‌های اولیه موتور، گیربکس، بدنه و سوابق پورشه.", description: "ویدئو برای خریداران خودروهای خاص که می‌خواهند ریسک خرید را کم کنند.", category: "ویدئو کارشناسی", tags: ["Porsche", "کارشناسی"], service: "کارشناسی قبل خرید", duration: "06:10" },
  { slug: "toyota-lexus-service-video", title: "سرویس Toyota و Lexus وارداتی", eyebrow: "Service Video", summary: "سرویس مصرفی، قطعه و ثبت سابقه برای تویوتا و لکسوس.", description: "نمای آموزشی از برنامه سرویس و قطعات مصرفی خودروهای ژاپنی لوکس.", category: "ویدئو خدمات", tags: ["Toyota", "Lexus"], service: "سرویس دوره‌ای", duration: "04:50" },
  { slug: "buy-install-parts-video", title: "خرید + نصب قطعه در Auto Makhsus", eyebrow: "Marketplace Video", summary: "از درخواست قطعه تا نصب، QC و ثبت گارانتی.", description: "ویدئو فرآیند فروشگاه، CRM، تامین قطعه و نصب را ساده توضیح می‌دهد.", category: "ویدئو فروشگاه", tags: ["قطعه", "خرید + نصب"], service: "فروشگاه قطعات", duration: "03:55" },
  { slug: "detailing-ppf-ceramic-video", title: "PPF، سرامیک و دیتیلینگ خودروهای خارجی", eyebrow: "Detailing Video", summary: "تفاوت پوشش‌ها و انتخاب مناسب برای خودروهای وارداتی.", description: "این ویدئو به مالک کمک می‌کند بین دیتیلینگ، سرامیک، PPF و کاور تصمیم بگیرد.", category: "ویدئو دیتیلینگ", tags: ["دیتیلینگ", "PPF"], service: "دیتیلینگ خودروهای خارجی", duration: "05:35" },
  { slug: "options-safe-install-video", title: "نصب ایمن آپشن خودرو خارجی", eyebrow: "Options Video", summary: "سازگاری، سیم‌کشی، تست و QC نصب آپشن.", description: "ویدئو نشان می‌دهد چرا نصب آپشن باید با کنترل برق و ظاهر کارخانه‌ای انجام شود.", category: "ویدئو آپشن", tags: ["آپشن", "نصب"], service: "آپشن و ارتقا", duration: "04:35" },
  { slug: "gearbox-warning-video", title: "نشانه‌های هشدار گیربکس اتومات", eyebrow: "Gearbox Video", summary: "تقه، تاخیر، داغی و چراغ گیربکس را بشناسید.", description: "ویدئو آموزشی برای تشخیص زودهنگام ریسک خرابی گیربکس خودروهای خارجی.", category: "ویدئو فنی", tags: ["گیربکس", "دیاگ"], service: "گیربکس", duration: "05:20" },
];

videos.push(...seedVideos.map((item) => ({
  ...item,
  date: "2026-06-14",
  image: contentVisual.videos,
  poster: contentVisual.videos,
  path: `/fa/videos/${item.slug}`,
  relatedServices: ["diagnostics", item.service.includes("قطعه") ? "technical-parts" : "mechanics"],
  transcript: `${item.title}: در این ویدئو مسیر تشخیص، تصمیم فنی، انتخاب قطعه یا نصب و ثبت درخواست در CRM توضیح داده می‌شود تا مالک خودرو خارجی با دید روشن اقدام کند.`,
  chapters: [
    { time: "00:00", title: "تعریف مسئله", summary: "شرح مشکل، برند، مدل و علت اهمیت بررسی تخصصی." },
    { time: "01:15", title: "فرآیند فنی", summary: "مراحل تشخیص، قطعه، نصب یا کنترل کیفیت." },
    { time: "03:20", title: "اقدام بعدی", summary: "ثبت درخواست، رزرو سرویس یا مشاوره قطعه در Auto Makhsus." },
  ],
  relatedCars: [
    { brand: "BMW", model: "X5", href: "/fa/cars/bmw/x5" },
    { brand: "Mercedes-Benz", model: "C200", href: "/fa/cars/mercedes-benz/c200" },
    { brand: "Toyota", model: "Prado", href: "/fa/cars/toyota/prado" },
  ],
  sections: [
    { title: "ارزش ویدئو", body: "ویدئو برای آموزش تصمیم‌گیری قبل از مراجعه طراحی شده و جایگزین تشخیص حضوری نیست." },
    { title: "ارتباط با خدمات", body: "هر ویدئو به سرویس، خودرو، قطعه یا پروژه مرتبط وصل می‌شود تا مسیر تبدیل به لید واضح باشد." },
  ],
  faqs: [{ question: "آیا می‌توان فقط با ویدئو مشکل خودرو را تشخیص داد؟", answer: "خیر؛ ویدئو کمک آموزشی است و تشخیص نهایی با بررسی خودرو انجام می‌شود." }],
})));

const seedProjects: Omit<ProjectContent, "image" | "date" | "path" | "relatedServices" | "sections" | "faqs" | "stages">[] = [
  { slug: "benz-c200-electrical-diagnosis", title: "عیب‌یابی برق Mercedes-Benz C200", eyebrow: "Project Showcase", summary: "بررسی ماژول، افت ولتاژ و خطای متناوب.", description: "نمونه پروژه کنترل‌شده برای نمایش مسیر تشخیص برق بنز بدون اطلاعات خصوصی.", category: "برق و الکترونیک", tags: ["Benz", "C200"], brand: "Mercedes-Benz", model: "C200", service: "برق و الکترونیک", vehicle: "Mercedes-Benz C200", executionTime: "یک روز کاری" },
  { slug: "porsche-cayenne-inspection", title: "کارشناسی Porsche Cayenne قبل از خرید", eyebrow: "Before / During / After", summary: "دیاگ، بدنه، گیربکس و گزارش ریسک خرید.", description: "قالب پروژه کارشناسی خودرو خاص با تمرکز روی تصمیم خرید امن.", category: "کارشناسی", tags: ["Porsche", "Cayenne"], brand: "Porsche", model: "Cayenne", service: "کارشناسی قبل خرید", vehicle: "Porsche Cayenne", executionTime: "نیم روز کاری" },
  { slug: "toyota-prado-suspension-service", title: "بازدید جلوبندی Toyota Prado", eyebrow: "Workshop Project", summary: "صداگیری، بازدید تعلیق و پیشنهاد قطعه.", description: "نمونه پروژه خدمات تعلیق و قطعه برای SUV وارداتی.", category: "جلوبندی", tags: ["Toyota", "Prado"], brand: "Toyota", model: "Prado", service: "جلوبندی و تعلیق", vehicle: "Toyota Prado", executionTime: "یک روز کاری" },
  { slug: "lexus-rx-ceramic-detailing", title: "دیتیلینگ و سرامیک Lexus RX", eyebrow: "Detailing Project", summary: "آماده‌سازی، اصلاح سطح و محافظت رنگ.", description: "نمونه پروژه دیتیلینگ خودرو لوکس با توصیه نگهداری.", category: "دیتیلینگ", tags: ["Lexus", "RX"], brand: "Lexus", model: "RX", service: "دیتیلینگ", vehicle: "Lexus RX", executionTime: "دو روز کاری" },
  { slug: "hyundai-santa-fe-gearbox-check", title: "بررسی گیربکس Hyundai Santa Fe", eyebrow: "Diagnostics Project", summary: "دیاگ، تست رانندگی و گزارش ریسک گیربکس.", description: "نمونه پروژه برای خودرو پرتقاضای وارداتی کره‌ای.", category: "گیربکس", tags: ["Hyundai", "Santa Fe"], brand: "Hyundai", model: "Santa Fe", service: "گیربکس", vehicle: "Hyundai Santa Fe", executionTime: "یک روز کاری" },
  { slug: "kia-optima-buy-install-options", title: "خرید + نصب آپشن Kia Optima", eyebrow: "Options Project", summary: "سازگاری قطعه، نصب تمیز و QC.", description: "نمونه پروژه فروشگاه + نصب برای آپشن خودرو خارجی.", category: "آپشن", tags: ["Kia", "Optima"], brand: "Kia", model: "Optima", service: "آپشن و ارتقا", vehicle: "Kia Optima", executionTime: "یک روز کاری" },
  { slug: "audi-q5-diagnostic-service", title: "دیاگ تخصصی Audi Q5", eyebrow: "Diagnostics Project", summary: "خطاهای ماژول، سنسور و گزارش تشخیص.", description: "نمونه پروژه دیاگ خودرو اروپایی با خروجی قابل پیگیری.", category: "دیاگ", tags: ["Audi", "Q5"], brand: "Audi", model: "Q5", service: "دیاگ تخصصی", vehicle: "Audi Q5", executionTime: "نیم روز کاری" },
  { slug: "range-rover-suspension-diagnosis", title: "تشخیص تعلیق Range Rover", eyebrow: "Premium SUV Project", summary: "بررسی ارتفاع، کمپرسور و خطاهای تعلیق.", description: "نمونه پروژه SUV لوکس با تاکید بر تشخیص قبل از تعویض قطعه.", category: "تعلیق", tags: ["Range Rover"], brand: "Range Rover", model: "Sport", service: "جلوبندی و تعلیق", vehicle: "Range Rover Sport", executionTime: "یک تا دو روز کاری" },
];

projects.push(...seedProjects.map((item) => ({
  ...item,
  date: "2026-06-14",
  image: contentVisual.projects,
  path: `/fa/projects/${item.slug}`,
  relatedServices: ["diagnostics", item.service.includes("دیتیلینگ") ? "detailing" : "mechanics"],
  stages: [
    { title: "قبل", body: "ثبت علائم، برند، مدل، نیاز مشتری و وضعیت اولیه خودرو." },
    { title: "حین", body: "تشخیص مرحله‌ای، انتخاب قطعه یا اجرای خدمت با کنترل کیفیت داخلی." },
    { title: "بعد", body: "تحویل گزارش، توصیه نگهداری و مسیر پیگیری در CRM." },
  ],
  sections: [
    { title: "هدف پروژه", body: "این نمونه‌کار ساختار امن نمایش پروژه‌های واقعی را نشان می‌دهد؛ بدون انتشار اطلاعات شخصی، پلاک، VIN یا داده خصوصی مشتری." },
    { title: "خروجی", body: "خروجی پروژه شامل تصمیم فنی، مسیر قطعه یا نصب، کنترل کیفیت و توصیه بعدی است." },
  ],
  faqs: [{ question: "آیا این نمونه‌کار شامل اطلاعات خصوصی مشتری است؟", answer: "خیر، تمام نمونه‌کارها باید قبل از انتشار از نظر حریم خصوصی بررسی شوند." }],
})));

const seedFeed: Omit<FeedContent, "image" | "date" | "path" | "relatedServices" | "sections" | "faqs">[] = [
  { slug: "today-bmw-diagnostics", title: "یادداشت امروز: صف دیاگ BMW", eyebrow: "Daily Feed", summary: "چند درخواست مرتبط با خطای سنسور و افت توان BMW ثبت شد.", description: "فید روزانه برای نمایش فعالیت کنترل‌شده و مسیر درخواست مشاوره استفاده می‌شود.", category: "دیاگ", tags: ["BMW", "دیاگ"], service: "خدمات BMW", format: "service" },
  { slug: "today-benz-electrical", title: "یادداشت امروز: خطاهای برقی Benz", eyebrow: "Daily Feed", summary: "تمرکز امروز روی افت ولتاژ و ماژول‌های رفاهی بنز بود.", description: "پست روزانه آموزشی و عملیاتی برای خودروهای خارجی.", category: "برق", tags: ["Benz", "ماژول"], service: "برق و الکترونیک", format: "photo" },
  { slug: "marketplace-oem-consumables", title: "یادداشت فروشگاه: مصرفی‌های OEM", eyebrow: "Marketplace Feed", summary: "درخواست قطعات مصرفی اصلی و خرید + نصب در حال افزایش است.", description: "فروشگاه Auto Makhsus مسیر استعلام قطعه و نصب را به CRM وصل می‌کند.", category: "فروشگاه", tags: ["OEM", "قطعه"], service: "فروشگاه قطعات", format: "photo" },
  { slug: "detailing-premium-queue", title: "یادداشت دیتیلینگ خودروهای لوکس", eyebrow: "Daily Feed", summary: "چند پروژه محافظت رنگ و کابین برای خودروهای وارداتی بررسی شد.", description: "فید روزانه می‌تواند به پروژه، ویدئو و رزرو سرویس وصل شود.", category: "دیتیلینگ", tags: ["دیتیلینگ", "سرامیک"], service: "دیتیلینگ خودروهای خارجی", format: "project" },
  { slug: "options-installation-note", title: "یادداشت نصب آپشن ایمن", eyebrow: "Daily Feed", summary: "نکته روز: قبل از نصب آپشن باید سازگاری برق بررسی شود.", description: "پست کوتاه برای آموزش تصمیم‌گیری مشتری قبل از نصب آپشن.", category: "آپشن", tags: ["آپشن", "نصب"], service: "آپشن و ارتقا", format: "service" },
  { slug: "inspection-before-buying-note", title: "یادداشت کارشناسی قبل خرید", eyebrow: "Daily Feed", summary: "خودروهای وارداتی کارکرده بدون دیاگ کامل ریسک خرید دارند.", description: "فید روزانه برای هدایت خریداران به کارشناسی فنی و بدنه.", category: "کارشناسی", tags: ["کارشناسی", "دیاگ"], service: "کارشناسی قبل خرید", format: "service" },
  { slug: "gearbox-warning-note", title: "یادداشت هشدار گیربکس", eyebrow: "Daily Feed", summary: "تقه و تاخیر گیربکس را قبل از هزینه سنگین بررسی کنید.", description: "پست فنی کوتاه با CTA رزرو سرویس.", category: "گیربکس", tags: ["گیربکس"], service: "گیربکس", format: "video" },
  { slug: "special-order-parts-note", title: "یادداشت سفارش خارجی قطعه", eyebrow: "Marketplace Feed", summary: "Special Order باید با خودرو، مشتری، فاکتور و نصب مرتبط شود.", description: "پست فروشگاهی درباره مسیر سفارش خاص قطعات خودرو خارجی.", category: "فروشگاه", tags: ["Special Order"], service: "فروشگاه قطعات", format: "photo" },
];

feedItems.push(...seedFeed.map((item) => ({
  ...item,
  date: "2026-06-14",
  image: contentVisual.feed,
  path: `/fa/feed/${item.slug}`,
  relatedServices: [item.service.includes("قطعه") || item.category === "فروشگاه" ? "technical-parts" : "diagnostics"],
  sections: [{ title: "یادداشت روز", body: `${item.summary} این محتوا به عنوان فید کنترل‌شده Auto Makhsus منتشر می‌شود و کاربر را به مشاوره، رزرو سرویس یا استعلام قطعه هدایت می‌کند.` }],
  faqs: [{ question: "آیا فید امکان ارسال عمومی دارد؟", answer: "خیر، در فاز فعلی فقط محتوای کنترل‌شده تیم Auto Makhsus منتشر می‌شود." }],
})));

const seedQuestions: Omit<QuestionContent, "image" | "date" | "path" | "relatedServices" | "sections" | "faqs" | "acceptedAnswer">[] = [
  { slug: "where-to-service-bmw-in-iran", title: "برای خدمات BMW کجا مراجعه کنیم؟", eyebrow: "Q&A", summary: "معیار انتخاب مرکز تخصصی BMW در ایران.", description: "پاسخ به سوال رایج درباره خدمات BMW، قطعه و دیاگ.", category: "خدمات برند", tags: ["BMW"], service: "خدمات BMW" },
  { slug: "benz-check-engine-common-causes", title: "علت چراغ چک Benz چیست؟", eyebrow: "Q&A", summary: "دلایل رایج چراغ چک بنز و مسیر دیاگ تخصصی.", description: "پاک کردن خطا کافی نیست و علت باید مرحله‌ای بررسی شود.", category: "دیاگ", tags: ["Benz", "چراغ چک"], service: "دیاگ تخصصی" },
  { slug: "porsche-parts-special-order", title: "قطعات Porsche را چطور سفارش دهیم؟", eyebrow: "Q&A", summary: "OEM، Aftermarket، Used و Special Order برای پورشه.", description: "راهنمای انتخاب و سفارش قطعه خودرو خاص.", category: "قطعات", tags: ["Porsche", "Special Order"], service: "فروشگاه قطعات" },
  { slug: "toyota-lexus-oem-parts", title: "برای Toyota و Lexus قطعه OEM لازم است؟", eyebrow: "Q&A", summary: "چه زمانی قطعه اصلی، جایگزین یا استوک منطقی است.", description: "پاسخ فنی برای تصمیم قطعه در خودروهای ژاپنی.", category: "قطعات", tags: ["Toyota", "Lexus"], service: "فروشگاه قطعات" },
  { slug: "foreign-car-detailing-value", title: "دیتیلینگ چه تاثیری روی ارزش خودرو خارجی دارد؟", eyebrow: "Q&A", summary: "نقش دیتیلینگ، سرامیک و PPF در حفظ ارزش خودرو.", description: "پاسخ کوتاه درباره نگهداری ظاهر و کابین.", category: "دیتیلینگ", tags: ["دیتیلینگ"], service: "دیتیلینگ خودروهای خارجی" },
  { slug: "safe-options-installation", title: "نصب آپشن روی خودرو خارجی خطر دارد؟", eyebrow: "Q&A", summary: "اگر سازگاری برق بررسی نشود، بله.", description: "نکات نصب ایمن آپشن و کنترل کیفیت.", category: "آپشن", tags: ["آپشن"], service: "آپشن و ارتقا" },
  { slug: "gearbox-delay-imported-car", title: "تاخیر تعویض دنده یعنی خرابی گیربکس؟", eyebrow: "Q&A", summary: "تاخیر دنده می‌تواند از روغن، دما، سنسور یا خرابی داخلی باشد.", description: "پاسخ آموزشی برای تشخیص اولیه گیربکس.", category: "گیربکس", tags: ["گیربکس"], service: "گیربکس" },
  { slug: "buy-and-install-parts-benefit", title: "مزیت خرید + نصب قطعه چیست؟", eyebrow: "Q&A", summary: "قطعه، نصب، گارانتی و سابقه در یک مسیر کنترل‌شده.", description: "پاسخ فروشگاهی درباره مدل خرید + نصب Auto Makhsus.", category: "فروشگاه", tags: ["خرید + نصب"], service: "فروشگاه قطعات" },
];

questions.push(...seedQuestions.map((item) => ({
  ...item,
  date: "2026-06-14",
  image: contentVisual.community,
  path: `/fa/community/questions/${item.slug}`,
  acceptedAnswer: `${item.summary} پاسخ عملی Auto Makhsus این است که ابتدا برند، مدل، علائم و سابقه بررسی شود، سپس مسیر سرویس، قطعه یا نصب در CRM ثبت و پیگیری شود.`,
  relatedServices: [item.service.includes("قطعه") || item.category === "فروشگاه" ? "technical-parts" : "diagnostics"],
  sections: [
    { title: "صورت سوال", body: item.description },
    { title: "پاسخ پذیرفته‌شده", body: `${item.summary} تصمیم نهایی باید بر اساس بررسی خودرو، سازگاری قطعه و سطح ریسک انجام شود.` },
  ],
  faqs: [{ question: "آیا این پاسخ جایگزین تشخیص حضوری است؟", answer: "خیر، پاسخ‌ها برای راهنمایی اولیه هستند و تصمیم قطعی با بررسی خودرو انجام می‌شود." }],
})));

const priorityModels: Record<string, VehicleModel[]> = {
  bmw: [
    { slug: "x3", name: "X3", fa: "BMW X3", years: "2015 تا جدید", intro: "کراس‌اوور محبوب BMW با حساسیت بالا به نگهداری گیربکس، سیستم تعلیق و برق.", commonIssues: ["خطاهای سنسور", "نشتی روغن", "لرزش تعلیق"], maintenance: ["دیاگ دوره‌ای", "بازدید گیربکس", "بررسی جلوبندی"], diagnostics: ["خواندن خطاهای DME و گیربکس", "بررسی داده زنده سنسور اکسیژن و فشار", "تست باتری و افت ولتاژ ماژول‌ها"], parts: ["فیلتر و روغن سازگار", "قطعات جلوبندی با کیفیت", "لنت و دیسک مناسب وزن خودرو"], servicePackages: [{ title: "بازدید خرید BMW X3", body: "دیاگ، تعلیق، روغن‌ریزی، گیربکس و بدنه قبل از خرید بررسی می‌شود." }, { title: "سرویس نگهداری X3", body: "سرویس مصرفی، بازدید ترمز، جلوبندی و گزارش دیجیتال برای نگهداری دوره‌ای." }], faqs: [{ question: "برای X3 دیاگ دوره‌ای لازم است؟", answer: "بله، خطاهای مقطعی برق و گیربکس در X3 بهتر است قبل از تبدیل شدن به خرابی سنگین بررسی شوند." }] },
    { slug: "x5", name: "X5", fa: "BMW X5", years: "2014 تا جدید", intro: "SUV لوکس BMW که نیازمند سرویس منظم، قطعات سازگار و تشخیص دقیق است.", commonIssues: ["خطاهای ماژول", "مشکلات تعلیق", "مصرفی‌های گران"], maintenance: ["سرویس دوره‌ای", "دیاگ تخصصی", "بازدید ترمز"], diagnostics: ["بررسی خطاهای تعلیق و ارتفاع", "تست گیربکس و دمای روغن", "کنترل ماژول‌های بدنه و رفاهی"], parts: ["مصرفی‌های اصلی یا معادل معتبر", "قطعات ترمز متناسب با وزن X5", "اقلام تعلیق و بوش‌های با دوام"], servicePackages: [{ title: "پکیج کنترل سلامت X5", body: "برای خودروهای پرکارکرد شامل دیاگ، تعلیق، ترمز، گیربکس و نشتی‌ها." }, { title: "پکیج تحویل سفر", body: "بازدید ایمنی، روغن، لاستیک، ترمز و خطاهای ماژولی قبل از سفر." }], faqs: [{ question: "هزینه نگهداری X5 چطور کنترل می‌شود؟", answer: "با دیاگ زودهنگام، قطعه معتبر، ثبت سابقه و پیشگیری از تعمیرات سنگین." }] },
  ],
  "mercedes-benz": [
    { slug: "c200", name: "C200", fa: "Mercedes-Benz C200", years: "2014 تا جدید", intro: "سدان پرتقاضای بنز با نیاز به تشخیص دقیق برق، موتور و آپشن‌ها.", commonIssues: ["خطای ماژول", "سنسورها", "گیربکس"], maintenance: ["دیاگ", "سرویس روغن", "بازدید برق"], diagnostics: ["اسکن ماژول‌های SAM و ECU", "بررسی خطاهای موتور توربو", "تست آپشن‌ها و سنسورهای کابین"], parts: ["روغن و فیلتر مطابق استاندارد بنز", "قطعات برقی با سازگاری دقیق", "مصرفی‌های ترمز و تعلیق معتبر"], servicePackages: [{ title: "بازدید فنی C200", body: "مناسب خرید یا نگهداری؛ شامل دیاگ، موتور، گیربکس، برق و بدنه." }, { title: "پکیج آپشن C200", body: "بررسی نصب آپشن با سیم‌کشی ایمن و کنترل کیفیت." }], faqs: [{ question: "آیا نصب آپشن روی C200 ریسک دارد؟", answer: "اگر سازگاری و سیم‌کشی درست بررسی نشود بله؛ نصب باید OEM-style و تست‌شده باشد." }] },
    { slug: "e200", name: "E200", fa: "Mercedes-Benz E200", years: "2014 تا جدید", intro: "سدان executive بنز با ارزش بالای نگهداری صحیح و ثبت سوابق.", commonIssues: ["برق و آپشن", "تعلیق", "ترمز"], maintenance: ["سرویس دوره‌ای", "کارشناسی", "بازدید تعلیق"], diagnostics: ["بررسی ماژول‌های رفاهی و ایمنی", "تست تعلیق و ترمز", "کنترل خطاهای گیربکس و موتور"], parts: ["مصرفی‌های سطح executive", "قطعات ترمز با استاندارد بالا", "اقلام برقی سازگار"], servicePackages: [{ title: "پکیج نگهداری E200", body: "سرویس دوره‌ای، دیاگ و بازدید سیستم‌های رفاهی برای حفظ کیفیت سواری." }, { title: "پکیج کارشناسی E200", body: "دیاگ کامل، بدنه، رنگ، آپشن‌ها و سابقه سرویس قبل از خرید." }], faqs: [{ question: "برای E200 چه چیزی مهم‌تر است؟", answer: "ثبت سابقه، دیاگ دقیق و قطعه سازگار برای حفظ ارزش خودرو بسیار مهم است." }] },
  ],
  toyota: [
    { slug: "prado", name: "Prado", fa: "Toyota Prado", years: "2008 تا جدید", intro: "SUV قابل اعتماد تویوتا که با سرویس صحیح، دوام بالایی دارد.", commonIssues: ["جلوبندی", "ترمز", "قطعات مصرفی"], maintenance: ["سرویس دوره‌ای", "بازدید تعلیق", "دیاگ"], diagnostics: ["کنترل خطاهای 4WD و ABS", "بازدید سیستم تعلیق و ترمز", "بررسی سنسورها و مصرفی‌ها"], parts: ["قطعات مصرفی بادوام", "اقلام تعلیق مناسب استفاده شهری و سفر", "لنت و دیسک معتبر"], servicePackages: [{ title: "پکیج سفر پرادو", body: "بازدید ایمنی، جلوبندی، ترمز، روغن‌ها و خطاهای سیستم چهارچرخ." }, { title: "پکیج خرید + نصب", body: "تامین قطعه مصرفی و نصب در مسیر کنترل‌شده Auto Makhsus." }], faqs: [{ question: "پرادو بیشتر به چه بازدیدی نیاز دارد؟", answer: "جلوبندی، ترمز، روغن‌ها و سیستم چهارچرخ باید منظم بررسی شوند." }] },
  ],
  lexus: [
    { slug: "rx", name: "RX", fa: "Lexus RX", years: "2010 تا جدید", intro: "کراس‌اوور لوکس لکسوس با تمرکز روی نگهداری نرم، دقیق و مستند.", commonIssues: ["مصرفی‌ها", "سیستم هیبرید در برخی مدل‌ها", "تعلیق"], maintenance: ["دیاگ", "سرویس روغن", "بازدید ترمز"], diagnostics: ["بررسی خطاهای سیستم هیبرید در مدل‌های مرتبط", "کنترل سنسورها و ترمز", "بازدید کیفیت سواری و تعلیق"], parts: ["مصرفی‌های باکیفیت برای حفظ نرمی سواری", "قطعات ترمز و تعلیق سازگار", "مواد دیتیلینگ مناسب کابین لوکس"], servicePackages: [{ title: "پکیج سلامت Lexus RX", body: "دیاگ، تعلیق، ترمز و سرویس مصرفی با گزارش نگهداری." }, { title: "پکیج دیتیلینگ RX", body: "محافظت بدنه و کابین برای حفظ کیفیت و ارزش خودرو." }], faqs: [{ question: "آیا RX به دیتیلینگ تخصصی نیاز دارد؟", answer: "برای حفظ کیفیت کابین، رنگ و ارزش فروش، دیتیلینگ اصولی توصیه می‌شود." }] },
  ],
  hyundai: [
    { slug: "santa-fe", name: "Santa Fe", fa: "هیوندای سانتافه", years: "2010 تا جدید", intro: "سانتافه در ایران پرمصرف است و نگهداری آن باید با قطعات معتبر انجام شود.", commonIssues: ["گیربکس", "جلوبندی", "مصرفی‌ها"], maintenance: ["سرویس دوره‌ای", "بازدید جلوبندی", "دیاگ"], diagnostics: ["بررسی گیربکس و دمای روغن", "کنترل خطاهای سنسور و ABS", "بازدید صدای جلوبندی"], parts: ["مصرفی‌های معتبر و قابل تامین", "قطعات گیربکس و جلوبندی با QC", "لوازم جانبی و آپشن‌های سازگار"], servicePackages: [{ title: "پکیج سانتافه کارکرده", body: "دیاگ، جلوبندی، گیربکس، ترمز و سرویس پایه بعد از خرید." }, { title: "پکیج مصرفی سانتافه", body: "تامین و نصب قطعات مصرفی با ثبت فاکتور و سابقه." }], faqs: [{ question: "برای سانتافه گیربکس را چه زمانی بررسی کنیم؟", answer: "در تعویض دنده غیرعادی، تاخیر، ضربه یا قبل از خرید حتماً بررسی شود." }] },
    { slug: "tucson", name: "Tucson", fa: "هیوندای توسان", years: "2010 تا جدید", intro: "توسان برای سرویس، قطعه و عیب‌یابی در شبکه خودروهای خارجی Auto Makhsus پوشش داده می‌شود.", commonIssues: ["سنسورها", "تعلیق", "ترمز"], maintenance: ["دیاگ", "سرویس روغن", "بازدید ترمز"], diagnostics: ["اسکن خطاهای سنسور و موتور", "بازدید جلوبندی و ترمز", "کنترل مصرفی‌ها و نشت‌ها"], parts: ["لنت، فیلتر و روغن معتبر", "قطعات تعلیق و کمک", "آپشن‌های کابین سازگار"], servicePackages: [{ title: "پکیج نگهداری توسان", body: "سرویس دوره‌ای، دیاگ و بازدید ترمز برای استفاده شهری." }, { title: "پکیج آماده فروش", body: "بازدید فنی، دیتیلینگ سبک و گزارش وضعیت برای فروش شفاف‌تر." }], faqs: [{ question: "توسان بیشتر چه خرابی‌هایی دارد؟", answer: "تعلیق، ترمز، سنسورها و مصرفی‌ها باید براساس کارکرد بررسی شوند." }] },
  ],
  kia: [
    { slug: "cerato", name: "Cerato", fa: "کیا سراتو", years: "2010 تا جدید", intro: "سراتو نیازمند سرویس مصرفی منظم و بررسی دقیق قطعات جایگزین است.", commonIssues: ["جلوبندی", "ترمز", "برق"], maintenance: ["سرویس دوره‌ای", "دیاگ", "بازدید جلوبندی"], diagnostics: ["کنترل خطاهای موتور و سنسور", "بازدید برق و باتری", "بررسی صدای تعلیق"], parts: ["مصرفی‌های اقتصادی اما معتبر", "قطعات جلوبندی سازگار", "لوازم جانبی رایج"], servicePackages: [{ title: "پکیج مصرفی سراتو", body: "روغن، فیلتر، ترمز و بازدید پایه برای کاهش هزینه نگهداری." }, { title: "پکیج خرید سراتو", body: "کارشناسی فنی، دیاگ و بررسی مصرفی‌ها قبل از معامله." }], faqs: [{ question: "برای سراتو قطعه استوک مناسب است؟", answer: "فقط اگر سلامت، سازگاری و ریسک نصب بررسی شود؛ قطعه مصرفی بهتر است معتبر و نو باشد." }] },
    { slug: "optima", name: "Optima", fa: "کیا اپتیما", years: "2010 تا جدید", intro: "اپتیما به سرویس اصولی موتور، گیربکس و سیستم برق نیاز دارد.", commonIssues: ["گیربکس", "سنسورها", "مصرفی‌ها"], maintenance: ["بازدید گیربکس", "سرویس روغن", "دیاگ"], diagnostics: ["بررسی گیربکس و سنسورها", "کنترل خطاهای موتور", "بازدید ترمز و جلوبندی"], parts: ["روغن و فیلتر گیربکس مناسب", "قطعات مصرفی معتبر", "آپشن‌های کابین و رفاهی"], servicePackages: [{ title: "پکیج گیربکس اپتیما", body: "بازدید عملکرد، خطاها، دما و سرویس پیشنهادی گیربکس." }, { title: "پکیج نگهداری اپتیما", body: "سرویس دوره‌ای، دیاگ و بازدید مصرفی‌ها با ثبت سابقه." }], faqs: [{ question: "نشانه نیاز اپتیما به بازدید گیربکس چیست؟", answer: "ضربه، تاخیر در تعویض دنده، داغ شدن یا خطاهای مرتبط باید سریع بررسی شوند." }] },
  ],
};

const neutralVehicleImage = {
  path: visual.hero,
  source: "Auto Makhsus internal generated placeholder",
  license: "Internal generated/owned visual. Used when legally certain brand/model imagery is not available.",
};

const brandRegionMap: Record<string, { originCountry: string; category: string; regions: string[]; featured?: boolean }> = {
  bmw: { originCountry: "آلمان", category: "لوکس / اسپرت", regions: ["German", "Supercar/Luxury"], featured: true },
  "mercedes-benz": { originCountry: "آلمان", category: "لوکس / اجرایی", regions: ["German", "Supercar/Luxury"], featured: true },
  porsche: { originCountry: "آلمان", category: "اسپرت / لوکس", regions: ["German", "Supercar/Luxury"], featured: true },
  audi: { originCountry: "آلمان", category: "لوکس / تکنولوژی", regions: ["German", "Supercar/Luxury"], featured: true },
  volkswagen: { originCountry: "آلمان", category: "اروپایی", regions: ["German"], featured: true },
  mini: { originCountry: "بریتانیا", category: "شهری پریمیوم", regions: ["British"] },
  "land-rover": { originCountry: "بریتانیا", category: "SUV لوکس", regions: ["British", "Supercar/Luxury"], featured: true },
  "range-rover": { originCountry: "بریتانیا", category: "SUV لوکس", regions: ["British", "Supercar/Luxury"], featured: true },
  volvo: { originCountry: "سوئد", category: "ایمنی / پریمیوم", regions: ["European"] },
  maserati: { originCountry: "ایتالیا", category: "لوکس / اسپرت", regions: ["Italian", "Supercar/Luxury"] },
  "alfa-romeo": { originCountry: "ایتالیا", category: "اسپرت اروپایی", regions: ["Italian"] },
  jeep: { originCountry: "آمریکا", category: "SUV / آفرود", regions: ["American"] },
  toyota: { originCountry: "ژاپن", category: "ژاپنی / SUV", regions: ["Japanese"], featured: true },
  lexus: { originCountry: "ژاپن", category: "لوکس ژاپنی", regions: ["Japanese", "Supercar/Luxury"], featured: true },
  nissan: { originCountry: "ژاپن", category: "ژاپنی", regions: ["Japanese"], featured: true },
  infiniti: { originCountry: "ژاپن", category: "لوکس ژاپنی", regions: ["Japanese", "Supercar/Luxury"] },
  hyundai: { originCountry: "کره جنوبی", category: "کره‌ای", regions: ["Korean"], featured: true },
  kia: { originCountry: "کره جنوبی", category: "کره‌ای", regions: ["Korean"], featured: true },
  genesis: { originCountry: "کره جنوبی", category: "لوکس کره‌ای", regions: ["Korean", "Supercar/Luxury"] },
  suzuki: { originCountry: "ژاپن", category: "ژاپنی", regions: ["Japanese"] },
  skoda: { originCountry: "چک", category: "اروپایی", regions: ["European"] },
  aion: { originCountry: "چین", category: "برقی", regions: ["Chinese", "Electric"] },
  byd: { originCountry: "چین", category: "برقی / هیبرید", regions: ["Chinese", "Electric"] },
  mg: { originCountry: "بریتانیا / چین", category: "وارداتی", regions: ["Chinese", "British"] },
  mazda: { originCountry: "ژاپن", category: "ژاپنی", regions: ["Japanese"] },
  mitsubishi: { originCountry: "ژاپن", category: "ژاپنی / SUV", regions: ["Japanese"] },
  subaru: { originCountry: "ژاپن", category: "ژاپنی / AWD", regions: ["Japanese"] },
  honda: { originCountry: "ژاپن", category: "ژاپنی", regions: ["Japanese"] },
  acura: { originCountry: "ژاپن", category: "لوکس ژاپنی", regions: ["Japanese", "Supercar/Luxury"] },
  ford: { originCountry: "آمریکا", category: "آمریکایی", regions: ["American"] },
  chevrolet: { originCountry: "آمریکا", category: "آمریکایی / اسپرت", regions: ["American"] },
  cadillac: { originCountry: "آمریکا", category: "لوکس آمریکایی", regions: ["American", "Supercar/Luxury"] },
  lincoln: { originCountry: "آمریکا", category: "لوکس آمریکایی", regions: ["American", "Supercar/Luxury"] },
  dodge: { originCountry: "آمریکا", category: "عضلانی / SUV", regions: ["American"] },
  ram: { originCountry: "آمریکا", category: "پیکاپ", regions: ["American"] },
  chrysler: { originCountry: "آمریکا", category: "آمریکایی", regions: ["American"] },
  tesla: { originCountry: "آمریکا", category: "برقی", regions: ["American", "Electric"], featured: true },
  polestar: { originCountry: "سوئد", category: "برقی پریمیوم", regions: ["European", "Electric"] },
  peugeot: { originCountry: "فرانسه", category: "فرانسوی", regions: ["French"] },
  citroen: { originCountry: "فرانسه", category: "فرانسوی", regions: ["French"] },
  renault: { originCountry: "فرانسه", category: "فرانسوی", regions: ["French"] },
  ds: { originCountry: "فرانسه", category: "پریمیوم فرانسوی", regions: ["French", "Supercar/Luxury"] },
  fiat: { originCountry: "ایتالیا", category: "ایتالیایی", regions: ["Italian"] },
  seat: { originCountry: "اسپانیا", category: "اروپایی", regions: ["European"] },
  cupra: { originCountry: "اسپانیا", category: "اسپرت اروپایی", regions: ["European"] },
  opel: { originCountry: "آلمان", category: "آلمانی", regions: ["German"] },
  jaguar: { originCountry: "بریتانیا", category: "لوکس / اسپرت", regions: ["British", "Supercar/Luxury"] },
  bentley: { originCountry: "بریتانیا", category: "فوق لوکس", regions: ["British", "Supercar/Luxury"] },
  "rolls-royce": { originCountry: "بریتانیا", category: "فوق لوکس", regions: ["British", "Supercar/Luxury"] },
  "aston-martin": { originCountry: "بریتانیا", category: "اسپرت لوکس", regions: ["British", "Supercar/Luxury"] },
  ferrari: { originCountry: "ایتالیا", category: "سوپراسپرت", regions: ["Italian", "Supercar/Luxury"] },
  lamborghini: { originCountry: "ایتالیا", category: "سوپراسپرت", regions: ["Italian", "Supercar/Luxury"] },
  mclaren: { originCountry: "بریتانیا", category: "سوپراسپرت", regions: ["British", "Supercar/Luxury"] },
  bugatti: { originCountry: "فرانسه", category: "هایپرکار", regions: ["French", "Supercar/Luxury"] },
  lotus: { originCountry: "بریتانیا", category: "اسپرت سبک", regions: ["British", "Electric"] },
};

function brandMeta(slug: string) {
  return brandRegionMap[slug] || { originCountry: "جهانی", category: "خودرو خارجی", regions: ["Global"] };
}

function bodyTypeForModel(slug: string, name: string) {
  const value = `${slug} ${name}`.toLowerCase();
  if (/(x3|x5|x6|glc|gle|cayenne|macan|q5|q7|tiguan|touareg|countryman|defender|discovery|range-rover|sport|evoque|velar|xc60|xc90|levante|stelvio|cherokee|wrangler|prado|hilux|land-cruiser|rav4|rx|nx|lx|x-trail|patrol|murano|santa-fe|tucson|sportage|sorento|gv70|gv80|grand-vitara|vitara|kodiaq|tang|hs|cx-5|outlander|forester|cr-v|rdx|explorer|tahoe|escalade|navigator|aviator|durango|model-x|model-y|3008|5008|koleos|ds7|ateca|formentor|mokka|f-pace|bentayga|cullinan|dbx|urus|eletre)/.test(value)) return "SUV / کراس‌اوور";
  if (/(911|corvette|camaro|challenger|charger|f-type|continental|db11|vantage|458|488|roma|gallardo|huracan|aventador|570s|720s|artura|veyron|chiron|tourbillon|elise|emira)/.test(value)) return "اسپرت / سوپراسپرت";
  if (/(f-150|1500|2500|ram|hilux)/.test(value)) return "پیکاپ";
  if (/(model-s|model-3|polestar|aion|byd|han|dolphin|seal|born)/.test(value)) return "برقی / سدان";
  if (/(golf|cooper|swift|mazda3|civic|500|panda|leon|ibiza|astra)/.test(value)) return "هاچ‌بک / شهری";
  return "سدان / اجرایی";
}

type ModelSeed = {
  slug: string;
  name: string;
  fa: string;
  generations: [string, string, string][];
};

type BrandSeed = [slug: string, name: string, fa: string, description: string, models: ModelSeed[]];

function generation(slug: string, name: string, years: string): [string, string, string] {
  return [slug, name, years];
}

function seedModel(slug: string, name: string, fa: string, generations: [string, string, string][]): VehicleModel {
  const years = generations.map((entry) => entry[2]).join(" / ");
  return {
    slug,
    name,
    fa,
    years,
    bodyType: bodyTypeForModel(slug, name),
    image: neutralVehicleImage,
    generations: generations.map(([generationSlug, generationName, generationYears]) => ({
      slug: generationSlug,
      name: generationName,
      years: generationYears,
      note: `${fa} نسل ${generationName} در بازه ${generationYears} باید از نظر دیاگ، قطعات مصرفی، سرویس دوره‌ای، برق، آپشن و سابقه نگهداری بر اساس وضعیت واقعی خودرو بررسی شود.`,
      image: neutralVehicleImage,
    })),
    intro: `${fa} در دانشنامه Auto Makhsus به عنوان یک مدل مهم بازار خودروهای خارجی پوشش داده می‌شود؛ تمرکز صفحه روی سرویس، دیاگ، قطعات، آپشن، دیتیلینگ و مسیر استعلام قطعه یا رزرو سرویس است.`,
    commonIssues: ["حساسیت به قطعات مصرفی و کیفیت نصب", "نیاز به دیاگ تخصصی قبل از تعویض قطعه", "اهمیت بررسی سابقه سرویس و وضعیت برق/ماژول‌ها"],
    maintenance: ["سرویس دوره‌ای بر اساس نسل و کارکرد", "بازدید ترمز، تعلیق، روغن‌ها و مصرفی‌ها", "ثبت سوابق سرویس و قطعات در پرونده خودرو"],
    diagnostics: ["دیاگ موتور، گیربکس و ماژول‌های اصلی", "بررسی داده زنده و خطاهای مقطعی", "تهیه گزارش ریسک ادامه رانندگی یا خرید"],
    parts: ["قطعات مصرفی معتبر", "قطعات فنی و برقی با سازگاری مدل/نسل", "مسیر OEM، Aftermarket، Used یا Special Order براساس ریسک"],
    servicePackages: [
      { title: `بازدید فنی ${fa}`, body: "دیاگ، سرویس مصرفی، ترمز، تعلیق، برق و وضعیت قطعات مهم بررسی می‌شود." },
      { title: `استعلام قطعه ${fa}`, body: "کد فنی، نسل، سال ساخت و سازگاری قطعه قبل از خرید یا خرید + نصب بررسی می‌شود." },
      { title: `کارشناسی ${fa}`, body: "برای خرید خودرو کارکرده، دیاگ، بدنه، رنگ، گیربکس، آپشن‌ها و سابقه سرویس بررسی می‌شود." },
    ],
    faqs: [
      { question: `برای ${fa} چه اطلاعاتی قبل از سرویس لازم است؟`, answer: "مدل، سال ساخت، نسل، علائم، کارکرد، سابقه سرویس و در صورت امکان VIN یا کد قطعه کمک می‌کند مسیر تشخیص دقیق‌تر باشد." },
      { question: `آیا قطعات ${fa} از فروشگاه Auto Makhsus قابل استعلام است؟`, answer: "بله، مسیر فروشگاه فعلاً به صورت استعلام و خرید + نصب طراحی شده و به CRM متصل می‌شود." },
    ],
  };
}

function mergeSeedModels(slug: string, seeds: ModelSeed[]) {
  const existing = priorityModels[slug] || [];
  const existingSlugs = new Set(existing.map((model) => model.slug));
  const seedBySlug = new Map(seeds.map((model) => [model.slug, model]));
  const generated = seeds.filter((model) => !existingSlugs.has(model.slug)).map((model) => seedModel(model.slug, model.name, model.fa, model.generations));
  return [...existing.map((model) => ({
    ...model,
    bodyType: model.bodyType || bodyTypeForModel(model.slug, model.name),
    image: model.image || neutralVehicleImage,
    generations: model.generations || (seedBySlug.get(model.slug)?.generations || [generation("current", model.name, model.years)]).map(([generationSlug, generationName, generationYears]) => ({
      slug: generationSlug,
      name: generationName,
      years: generationYears,
      note: `${model.fa} در بازه ${generationYears} برای سرویس، قطعه، دیاگ و نگهداری دقیق بررسی می‌شود.`,
      image: neutralVehicleImage,
    })),
  })), ...generated];
}

const globalBrandCatalog: BrandSeed[] = [
  ["bmw", "BMW", "بی‌ام‌و", "خدمات BMW در Auto Makhsus شامل دیاگ، برق، سرویس دوره‌ای، گیربکس، تعلیق، قطعه و کارشناسی است.", [
    { slug: "x3", name: "X3", fa: "BMW X3", generations: [generation("e83", "E83", "2003-2010"), generation("f25", "F25", "2010-2017"), generation("g01", "G01", "2017-2024"), generation("g45", "G45", "2024-present")] },
    { slug: "x5", name: "X5", fa: "BMW X5", generations: [generation("e53", "E53", "1999-2006"), generation("e70", "E70", "2006-2013"), generation("f15", "F15", "2013-2018"), generation("g05", "G05", "2018-present")] },
    { slug: "3-series", name: "3 Series", fa: "BMW سری 3", generations: [generation("e90", "E90/E91/E92/E93", "2005-2013"), generation("f30", "F30/F31/F34", "2011-2019"), generation("g20", "G20/G21", "2018-present")] },
    { slug: "5-series", name: "5 Series", fa: "BMW سری 5", generations: [generation("e60", "E60/E61", "2003-2010"), generation("f10", "F10/F11", "2010-2017"), generation("g30", "G30/G31", "2017-2023"), generation("g60", "G60/G61", "2023-present")] },
    { slug: "7-series", name: "7 Series", fa: "BMW سری 7", generations: [generation("f01", "F01/F02", "2008-2015"), generation("g11", "G11/G12", "2015-2022"), generation("g70", "G70", "2022-present")] },
    { slug: "x6", name: "X6", fa: "BMW X6", generations: [generation("e71", "E71", "2008-2014"), generation("f16", "F16", "2014-2019"), generation("g06", "G06", "2019-present")] },
  ]],
  ["mercedes-benz", "Mercedes-Benz", "مرسدس بنز", "خدمات Mercedes-Benz با تمرکز روی دیاگ، برق، نگهداری، آپشن، قطعات و سوابق دیجیتال خودرو انجام می‌شود.", [
    { slug: "c200", name: "C200", fa: "Mercedes-Benz C200", generations: [generation("w204", "W204", "2007-2014"), generation("w205", "W205", "2014-2021"), generation("w206", "W206", "2021-present")] },
    { slug: "e200", name: "E200", fa: "Mercedes-Benz E200", generations: [generation("w212", "W212", "2009-2016"), generation("w213", "W213", "2016-2023"), generation("w214", "W214", "2023-present")] },
    { slug: "s-class", name: "S-Class", fa: "مرسدس بنز S-Class", generations: [generation("w221", "W221", "2005-2013"), generation("w222", "W222", "2013-2020"), generation("w223", "W223", "2020-present")] },
    { slug: "glc", name: "GLC", fa: "مرسدس بنز GLC", generations: [generation("x253", "X253", "2015-2022"), generation("x254", "X254", "2022-present")] },
    { slug: "gle", name: "GLE", fa: "مرسدس بنز GLE", generations: [generation("w166", "W166", "2015-2019"), generation("w167", "W167", "2019-present")] },
  ]],
  ["porsche", "Porsche", "پورشه", "پورشه نیازمند تشخیص دقیق، قطعه معتبر، دیتیلینگ و نگهداری مستند است.", [
    { slug: "cayenne", name: "Cayenne", fa: "Porsche Cayenne", generations: [generation("955-957", "955/957", "2002-2010"), generation("958", "958", "2010-2017"), generation("9y0", "9Y0", "2017-present")] },
    { slug: "panamera", name: "Panamera", fa: "Porsche Panamera", generations: [generation("970", "970", "2009-2016"), generation("971", "971", "2016-2023"), generation("g3", "G3", "2023-present")] },
    { slug: "macan", name: "Macan", fa: "Porsche Macan", generations: [generation("95b", "95B", "2014-2024"), generation("electric", "Electric", "2024-present")] },
    { slug: "911", name: "911", fa: "Porsche 911", generations: [generation("997", "997", "2004-2012"), generation("991", "991", "2011-2019"), generation("992", "992", "2019-present")] },
  ]],
  ["audi", "Audi", "آئودی", "خدمات Audi برای خودروهای وارداتی با محور دیاگ، برق، گیربکس و قطعات تخصصی تعریف می‌شود.", [
    { slug: "a4", name: "A4", fa: "Audi A4", generations: [generation("b8", "B8", "2008-2015"), generation("b9", "B9", "2015-2024"), generation("b10", "B10/A5 family", "2024-present")] },
    { slug: "a6", name: "A6", fa: "Audi A6", generations: [generation("c6", "C6", "2004-2011"), generation("c7", "C7", "2011-2018"), generation("c8", "C8", "2018-present")] },
    { slug: "q5", name: "Q5", fa: "Audi Q5", generations: [generation("8r", "8R", "2008-2017"), generation("fy", "FY", "2017-2024"), generation("gu", "GU", "2024-present")] },
    { slug: "q7", name: "Q7", fa: "Audi Q7", generations: [generation("4l", "4L", "2005-2015"), generation("4m", "4M", "2015-present")] },
  ]],
  ["volkswagen", "Volkswagen", "فولکس‌واگن", "فولکس‌واگن در هاب خودروهای خارجی Auto Makhsus برای سرویس، قطعه و عیب‌یابی پوشش داده می‌شود.", [
    { slug: "golf", name: "Golf", fa: "Volkswagen Golf", generations: [generation("mk6", "Mk6", "2008-2012"), generation("mk7", "Mk7", "2012-2020"), generation("mk8", "Mk8", "2019-present")] },
    { slug: "passat", name: "Passat", fa: "Volkswagen Passat", generations: [generation("b6", "B6", "2005-2010"), generation("b7", "B7", "2010-2015"), generation("b8", "B8", "2014-2023"), generation("b9", "B9", "2023-present")] },
    { slug: "tiguan", name: "Tiguan", fa: "Volkswagen Tiguan", generations: [generation("5n", "5N", "2007-2016"), generation("ad-bw", "AD/BW", "2016-2024"), generation("ct", "CT", "2024-present")] },
    { slug: "touareg", name: "Touareg", fa: "Volkswagen Touareg", generations: [generation("7l", "7L", "2002-2010"), generation("7p", "7P", "2010-2018"), generation("cr", "CR", "2018-present")] },
  ]],
  ["mini", "Mini", "مینی", "مینی به سرویس دقیق، قطعات سازگار و عیب‌یابی تخصصی نیاز دارد.", [
    { slug: "cooper", name: "Cooper", fa: "Mini Cooper", generations: [generation("r56", "R56", "2006-2013"), generation("f56", "F56", "2014-2024"), generation("f66", "F66", "2024-present")] },
    { slug: "countryman", name: "Countryman", fa: "Mini Countryman", generations: [generation("r60", "R60", "2010-2016"), generation("f60", "F60", "2017-2023"), generation("u25", "U25", "2023-present")] },
    { slug: "clubman", name: "Clubman", fa: "Mini Clubman", generations: [generation("r55", "R55", "2007-2014"), generation("f54", "F54", "2015-2024")] },
  ]],
  ["land-rover", "Land Rover", "لندرور", "لندرور و رنج‌روور با تمرکز روی تعلیق، برق، دیاگ و نگهداری تخصصی پوشش داده می‌شوند.", [
    { slug: "defender", name: "Defender", fa: "Land Rover Defender", generations: [generation("classic", "Classic", "1983-2016"), generation("l663", "L663", "2020-present")] },
    { slug: "discovery", name: "Discovery", fa: "Land Rover Discovery", generations: [generation("lr3", "LR3", "2004-2009"), generation("lr4", "LR4", "2009-2016"), generation("l462", "L462", "2017-present")] },
    { slug: "freelander", name: "Freelander", fa: "Land Rover Freelander", generations: [generation("l314", "L314", "1997-2006"), generation("l359", "L359", "2006-2014")] },
  ]],
  ["range-rover", "Range Rover", "رنج‌روور", "رنج‌روور به سرویس مستند، برق دقیق، قطعه مناسب و گزارش فنی نیاز دارد.", [
    { slug: "range-rover", name: "Range Rover", fa: "Range Rover", generations: [generation("l322", "L322", "2001-2012"), generation("l405", "L405", "2012-2021"), generation("l460", "L460", "2021-present")] },
    { slug: "sport", name: "Range Rover Sport", fa: "Range Rover Sport", generations: [generation("l320", "L320", "2005-2013"), generation("l494", "L494", "2013-2022"), generation("l461", "L461", "2022-present")] },
    { slug: "evoque", name: "Evoque", fa: "Range Rover Evoque", generations: [generation("l538", "L538", "2011-2018"), generation("l551", "L551", "2018-present")] },
    { slug: "velar", name: "Velar", fa: "Range Rover Velar", generations: [generation("l560", "L560", "2017-present")] },
  ]],
  ["volvo", "Volvo", "ولوو", "ولوو با استاندارد ایمنی بالا، نیازمند عیب‌یابی و نگهداری دقیق است.", [
    { slug: "xc60", name: "XC60", fa: "Volvo XC60", generations: [generation("p3", "P3", "2008-2017"), generation("spa", "SPA", "2017-present")] },
    { slug: "xc90", name: "XC90", fa: "Volvo XC90", generations: [generation("p2", "P2", "2002-2014"), generation("spa", "SPA", "2015-present")] },
    { slug: "s60", name: "S60", fa: "Volvo S60", generations: [generation("p3", "P3", "2010-2018"), generation("spa", "SPA", "2019-present")] },
  ]],
  ["maserati", "Maserati", "مازراتی", "مازراتی در خدمات خودروهای وارداتی با تمرکز بر نگهداری خاص و قطعات معتبر دیده می‌شود.", [
    { slug: "ghibli", name: "Ghibli", fa: "Maserati Ghibli", generations: [generation("m157", "M157", "2013-2023")] },
    { slug: "quattroporte", name: "Quattroporte", fa: "Maserati Quattroporte", generations: [generation("m139", "M139", "2003-2012"), generation("m156", "M156", "2013-2023")] },
    { slug: "levante", name: "Levante", fa: "Maserati Levante", generations: [generation("m161", "M161", "2016-2024")] },
  ]],
  ["alfa-romeo", "Alfa Romeo", "آلفارومئو", "آلفارومئو نیازمند شناخت فنی مدل، قطعه و سرویس‌های حساس است.", [
    { slug: "giulia", name: "Giulia", fa: "Alfa Romeo Giulia", generations: [generation("952", "952", "2016-present")] },
    { slug: "stelvio", name: "Stelvio", fa: "Alfa Romeo Stelvio", generations: [generation("949", "949", "2017-present")] },
    { slug: "giulietta", name: "Giulietta", fa: "Alfa Romeo Giulietta", generations: [generation("940", "940", "2010-2020")] },
  ]],
  ["jeep", "Jeep", "جیپ", "جیپ برای سرویس فنی، تعلیق، برق و قطعات کاربردی در هاب خودروهای خارجی پوشش داده می‌شود.", [
    { slug: "grand-cherokee", name: "Grand Cherokee", fa: "Jeep Grand Cherokee", generations: [generation("wk", "WK", "2005-2010"), generation("wk2", "WK2", "2010-2021"), generation("wl", "WL", "2021-present")] },
    { slug: "wrangler", name: "Wrangler", fa: "Jeep Wrangler", generations: [generation("jk", "JK", "2006-2018"), generation("jl", "JL", "2018-present")] },
    { slug: "cherokee", name: "Cherokee", fa: "Jeep Cherokee", generations: [generation("kl", "KL", "2013-2023")] },
  ]],
  ["toyota", "Toyota", "تویوتا", "خدمات Toyota شامل سرویس دوره‌ای، قطعات مصرفی، کارشناسی، دیاگ و نگهداری مطمئن است.", [
    { slug: "prado", name: "Prado", fa: "Toyota Prado", generations: [generation("j120", "J120", "2002-2009"), generation("j150", "J150", "2009-2023"), generation("j250", "J250", "2023-present")] },
    { slug: "camry", name: "Camry", fa: "Toyota Camry", generations: [generation("xv40", "XV40", "2006-2011"), generation("xv50", "XV50", "2011-2018"), generation("xv70", "XV70", "2017-2024"), generation("xv80", "XV80", "2024-present")] },
    { slug: "hilux", name: "Hilux", fa: "Toyota Hilux", generations: [generation("an10-an20-an30", "AN10/20/30", "2004-2015"), generation("an120-an130", "AN120/130", "2015-present")] },
    { slug: "land-cruiser", name: "Land Cruiser", fa: "Toyota Land Cruiser", generations: [generation("j100", "J100", "1998-2007"), generation("j200", "J200", "2007-2021"), generation("j300", "J300", "2021-present")] },
    { slug: "rav4", name: "RAV4", fa: "Toyota RAV4", generations: [generation("xa40", "XA40", "2012-2018"), generation("xa50", "XA50", "2018-present")] },
  ]],
  ["lexus", "Lexus", "لکسوس", "لکسوس به سرویس لوکس، دیتیلینگ، قطعات معتبر و سوابق دیجیتال خودرو نیاز دارد.", [
    { slug: "rx", name: "RX", fa: "Lexus RX", generations: [generation("al10", "AL10", "2008-2015"), generation("al20", "AL20", "2015-2022"), generation("ala10", "ALA10", "2022-present")] },
    { slug: "nx", name: "NX", fa: "Lexus NX", generations: [generation("az10", "AZ10", "2014-2021"), generation("az20", "AZ20", "2021-present")] },
    { slug: "lx", name: "LX", fa: "Lexus LX", generations: [generation("j200", "J200", "2007-2021"), generation("j310", "J310", "2021-present")] },
    { slug: "es", name: "ES", fa: "Lexus ES", generations: [generation("xv60", "XV60", "2012-2018"), generation("xz10", "XZ10", "2018-present")] },
  ]],
  ["nissan", "Nissan", "نیسان", "نیسان در خدمات خودروهای خارجی برای سرویس، قطعه، دیاگ و نگهداری پوشش دارد.", [
    { slug: "x-trail", name: "X-Trail", fa: "Nissan X-Trail", generations: [generation("t31", "T31", "2007-2013"), generation("t32", "T32", "2013-2021"), generation("t33", "T33", "2021-present")] },
    { slug: "patrol", name: "Patrol", fa: "Nissan Patrol", generations: [generation("y61", "Y61", "1997-2016"), generation("y62", "Y62", "2010-present")] },
    { slug: "murano", name: "Murano", fa: "Nissan Murano", generations: [generation("z51", "Z51", "2008-2014"), generation("z52", "Z52", "2014-2024")] },
    { slug: "maxima", name: "Maxima", fa: "Nissan Maxima", generations: [generation("a33", "A33", "2000-2006"), generation("a35", "A35", "2008-2014"), generation("a36", "A36", "2015-2023")] },
  ]],
  ["infiniti", "Infiniti", "اینفینیتی", "Infiniti به عنوان شاخه لوکس نیسان نیازمند قطعه، دیاگ و سرویس دقیق خودروهای وارداتی است.", [
    { slug: "fx", name: "FX/QX70", fa: "Infiniti FX / QX70", generations: [generation("s50", "S50", "2002-2008"), generation("s51", "S51", "2008-2017")] },
    { slug: "q50", name: "Q50", fa: "Infiniti Q50", generations: [generation("v37", "V37", "2013-present")] },
    { slug: "qx60", name: "QX60", fa: "Infiniti QX60", generations: [generation("l50", "L50", "2012-2021"), generation("l51", "L51", "2021-present")] },
  ]],
  ["hyundai", "Hyundai", "هیوندای", "هیوندای در ایران نیازمند قطعات معتبر، سرویس دقیق و عیب‌یابی مستند است.", [
    { slug: "santa-fe", name: "Santa Fe", fa: "Hyundai Santa Fe", generations: [generation("cm", "CM", "2006-2012"), generation("dm", "DM", "2012-2018"), generation("tm", "TM", "2018-2023"), generation("mx5", "MX5", "2023-present")] },
    { slug: "tucson", name: "Tucson", fa: "Hyundai Tucson", generations: [generation("lm", "LM", "2009-2015"), generation("tl", "TL", "2015-2020"), generation("nx4", "NX4", "2020-present")] },
    { slug: "sonata", name: "Sonata", fa: "Hyundai Sonata", generations: [generation("yf", "YF", "2009-2014"), generation("lf", "LF", "2014-2019"), generation("dn8", "DN8", "2019-present")] },
    { slug: "elantra", name: "Elantra", fa: "Hyundai Elantra", generations: [generation("md", "MD", "2010-2015"), generation("ad", "AD", "2015-2020"), generation("cn7", "CN7", "2020-present")] },
  ]],
  ["kia", "Kia", "کیا", "کیا برای مدل‌های پرمصرف ایران با خدمات فنی، قطعه، دیاگ و نگهداری پوشش داده می‌شود.", [
    { slug: "cerato", name: "Cerato", fa: "Kia Cerato", generations: [generation("td", "TD", "2008-2013"), generation("yd", "YD", "2013-2018"), generation("bd", "BD", "2018-present")] },
    { slug: "optima", name: "Optima", fa: "Kia Optima", generations: [generation("tf", "TF", "2010-2015"), generation("jf", "JF", "2015-2020"), generation("k5-dl3", "K5 DL3", "2019-present")] },
    { slug: "sportage", name: "Sportage", fa: "Kia Sportage", generations: [generation("sl", "SL", "2010-2015"), generation("ql", "QL", "2015-2021"), generation("nq5", "NQ5", "2021-present")] },
    { slug: "sorento", name: "Sorento", fa: "Kia Sorento", generations: [generation("xm", "XM", "2009-2014"), generation("um", "UM", "2014-2020"), generation("mq4", "MQ4", "2020-present")] },
  ]],
  ["genesis", "Genesis", "جنسیس", "Genesis به سرویس لوکس، برق دقیق، قطعات باکیفیت و نگهداری مستند نیاز دارد.", [
    { slug: "g70", name: "G70", fa: "Genesis G70", generations: [generation("ik", "IK", "2017-present")] },
    { slug: "g80", name: "G80", fa: "Genesis G80", generations: [generation("dh", "DH", "2016-2020"), generation("rg3", "RG3", "2020-present")] },
    { slug: "gv70", name: "GV70", fa: "Genesis GV70", generations: [generation("jk1", "JK1", "2020-present")] },
    { slug: "gv80", name: "GV80", fa: "Genesis GV80", generations: [generation("jx1", "JX1", "2020-present")] },
  ]],
  ["suzuki", "Suzuki", "سوزوکی", "سوزوکی با تمرکز روی مصرفی‌ها، گیربکس، تعلیق و قطعات قابل اعتماد پوشش داده می‌شود.", [
    { slug: "grand-vitara", name: "Grand Vitara", fa: "Suzuki Grand Vitara", generations: [generation("jt", "JT", "2005-2015"), generation("new", "New generation", "2022-present")] },
    { slug: "vitara", name: "Vitara", fa: "Suzuki Vitara", generations: [generation("ly", "LY", "2015-present")] },
    { slug: "swift", name: "Swift", fa: "Suzuki Swift", generations: [generation("zc72", "ZC72", "2010-2017"), generation("zc83", "ZC83", "2017-2023"), generation("zcd", "ZCD", "2023-present")] },
  ]],
  ["skoda", "Skoda", "اشکودا", "اشکودا در کنار ANI2203 و هاب Auto Makhsus برای سرویس و نگهداری دیده می‌شود.", [
    { slug: "octavia", name: "Octavia", fa: "Skoda Octavia", generations: [generation("a5", "A5", "2004-2013"), generation("a7", "A7", "2013-2020"), generation("a8", "A8", "2020-present")] },
    { slug: "superb", name: "Superb", fa: "Skoda Superb", generations: [generation("b6", "B6", "2008-2015"), generation("b8", "B8", "2015-2023"), generation("b9", "B9", "2023-present")] },
    { slug: "kodiaq", name: "Kodiaq", fa: "Skoda Kodiaq", generations: [generation("ns", "NS", "2016-2024"), generation("ps", "PS", "2024-present")] },
  ]],
  ["aion", "Aion", "آیون", "Aion به عنوان برند جدیدتر نیازمند معماری فنی، برق و پشتیبانی تخصصی است.", [
    { slug: "s", name: "Aion S", fa: "Aion S", generations: [generation("first", "First generation", "2019-present")] },
    { slug: "y", name: "Aion Y", fa: "Aion Y", generations: [generation("first", "First generation", "2021-present")] },
    { slug: "lx", name: "Aion LX", fa: "Aion LX", generations: [generation("first", "First generation", "2019-present")] },
  ]],
  ["byd", "BYD", "بی‌وای‌دی", "BYD در خدمات آینده خودروهای برقی و پلاگین هیبرید با تمرکز بر برق، باتری و دیاگ پوشش داده می‌شود.", [
    { slug: "han", name: "Han", fa: "BYD Han", generations: [generation("first", "First generation", "2020-present")] },
    { slug: "tang", name: "Tang", fa: "BYD Tang", generations: [generation("second", "Second generation", "2018-present")] },
    { slug: "song-plus", name: "Song Plus", fa: "BYD Song Plus", generations: [generation("first", "First generation", "2020-present")] },
    { slug: "atto-3", name: "Atto 3", fa: "BYD Atto 3", generations: [generation("first", "First generation", "2022-present")] },
  ]],
  ["mg", "MG", "ام‌جی", "MG برای بازار وارداتی و چینی-بریتانیایی با تمرکز بر قطعه، برق، گیربکس و سرویس پوشش داده می‌شود.", [
    { slug: "mg6", name: "MG6", fa: "MG6", generations: [generation("first", "First generation", "2010-2016"), generation("second", "Second generation", "2016-2023")] },
    { slug: "zs", name: "ZS", fa: "MG ZS", generations: [generation("zs", "ZS", "2017-present")] },
    { slug: "hs", name: "HS", fa: "MG HS", generations: [generation("first", "First generation", "2018-present")] },
  ]],
  ["mazda", "Mazda", "مزدا", "مزدا با تمرکز روی سرویس مصرفی، موتور، گیربکس و قطعات معتبر پوشش داده می‌شود.", [
    { slug: "mazda3", name: "Mazda3", fa: "Mazda3", generations: [generation("bk", "BK", "2003-2009"), generation("bl", "BL", "2009-2013"), generation("bm", "BM/BN", "2013-2019"), generation("bp", "BP", "2019-present")] },
    { slug: "mazda6", name: "Mazda6", fa: "Mazda6", generations: [generation("gh", "GH", "2007-2012"), generation("gj", "GJ/GL", "2012-2024")] },
    { slug: "cx-5", name: "CX-5", fa: "Mazda CX-5", generations: [generation("ke", "KE", "2012-2016"), generation("kf", "KF", "2017-present")] },
  ]],
  ["mitsubishi", "Mitsubishi", "میتسوبیشی", "میتسوبیشی برای SUVها، قطعات مصرفی، گیربکس و سرویس دوره‌ای پوشش دارد.", [
    { slug: "outlander", name: "Outlander", fa: "Mitsubishi Outlander", generations: [generation("cw", "CW", "2006-2012"), generation("gf", "GF", "2012-2021"), generation("gm", "GM", "2021-present")] },
    { slug: "asx", name: "ASX", fa: "Mitsubishi ASX", generations: [generation("ga", "GA", "2010-2023")] },
    { slug: "pajero", name: "Pajero", fa: "Mitsubishi Pajero", generations: [generation("v80", "V80/V90", "2006-2021")] },
  ]],
  ["subaru", "Subaru", "سوبارو", "سوبارو با سیستم AWD و موتورهای خاص به تشخیص دقیق و قطعات سازگار نیاز دارد.", [
    { slug: "forester", name: "Forester", fa: "Subaru Forester", generations: [generation("sh", "SH", "2008-2012"), generation("sj", "SJ", "2012-2018"), generation("sk", "SK", "2018-present")] },
    { slug: "outback", name: "Outback", fa: "Subaru Outback", generations: [generation("br", "BR", "2009-2014"), generation("bs", "BS", "2014-2019"), generation("bt", "BT", "2020-present")] },
    { slug: "wrx", name: "WRX", fa: "Subaru WRX", generations: [generation("va", "VA", "2014-2021"), generation("vb", "VB", "2021-present")] },
  ]],
  ["honda", "Honda", "هوندا", "هوندا با تمرکز بر سرویس دوره‌ای، قطعات مصرفی و عیب‌یابی فنی پوشش داده می‌شود.", [
    { slug: "accord", name: "Accord", fa: "Honda Accord", generations: [generation("cu", "CU", "2008-2012"), generation("cr", "CR", "2012-2017"), generation("cv", "CV", "2017-2022"), generation("cy", "CY", "2022-present")] },
    { slug: "civic", name: "Civic", fa: "Honda Civic", generations: [generation("fb", "FB", "2011-2015"), generation("fc", "FC", "2015-2021"), generation("fl", "FL", "2021-present")] },
    { slug: "cr-v", name: "CR-V", fa: "Honda CR-V", generations: [generation("rm", "RM", "2011-2016"), generation("rw", "RW", "2016-2022"), generation("rs", "RS", "2022-present")] },
  ]],
  ["acura", "Acura", "آکورا", "Acura به عنوان شاخه لوکس هوندا با تمرکز بر قطعه، سرویس و آپشن‌های رفاهی پوشش داده می‌شود.", [
    { slug: "mdx", name: "MDX", fa: "Acura MDX", generations: [generation("yd2", "YD2", "2006-2013"), generation("yd3", "YD3", "2013-2020"), generation("yd4", "YD4", "2021-present")] },
    { slug: "rdx", name: "RDX", fa: "Acura RDX", generations: [generation("tb3", "TB3", "2012-2018"), generation("tc1", "TC1/2", "2018-present")] },
    { slug: "tlx", name: "TLX", fa: "Acura TLX", generations: [generation("ub", "UB", "2014-2020"), generation("yc", "YC", "2020-present")] },
  ]],
  ["ford", "Ford", "فورد", "فورد در دانشنامه خودروهای خارجی برای SUV، پیکاپ و خودروهای وارداتی مهم پوشش دارد.", [
    { slug: "mustang", name: "Mustang", fa: "Ford Mustang", generations: [generation("s197", "S197", "2005-2014"), generation("s550", "S550", "2015-2023"), generation("s650", "S650", "2023-present")] },
    { slug: "explorer", name: "Explorer", fa: "Ford Explorer", generations: [generation("u502", "U502", "2011-2019"), generation("u625", "U625", "2020-present")] },
    { slug: "f-150", name: "F-150", fa: "Ford F-150", generations: [generation("p552", "13th gen", "2015-2020"), generation("p702", "14th gen", "2021-present")] },
  ]],
  ["chevrolet", "Chevrolet", "شورولت", "شورولت برای مدل‌های آمریکایی، SUV، اسپرت و پیکاپ با قطعه و تشخیص تخصصی پوشش داده می‌شود.", [
    { slug: "camaro", name: "Camaro", fa: "Chevrolet Camaro", generations: [generation("fifth", "Fifth generation", "2010-2015"), generation("sixth", "Sixth generation", "2016-2024")] },
    { slug: "corvette", name: "Corvette", fa: "Chevrolet Corvette", generations: [generation("c6", "C6", "2005-2013"), generation("c7", "C7", "2014-2019"), generation("c8", "C8", "2020-present")] },
    { slug: "tahoe", name: "Tahoe", fa: "Chevrolet Tahoe", generations: [generation("gmt900", "GMT900", "2007-2014"), generation("k2uc", "K2UC", "2015-2020"), generation("t1uc", "T1UC", "2021-present")] },
  ]],
  ["cadillac", "Cadillac", "کادیلاک", "کادیلاک به عنوان برند لوکس آمریکایی نیازمند سرویس مستند، برق و قطعات خاص است.", [
    { slug: "escalade", name: "Escalade", fa: "Cadillac Escalade", generations: [generation("gmt900", "GMT900", "2007-2014"), generation("k2xl", "K2XL", "2015-2020"), generation("t1xl", "T1XL", "2021-present")] },
    { slug: "cts", name: "CTS", fa: "Cadillac CTS", generations: [generation("second", "Second generation", "2008-2013"), generation("third", "Third generation", "2014-2019")] },
    { slug: "ct5", name: "CT5", fa: "Cadillac CT5", generations: [generation("first", "First generation", "2020-present")] },
  ]],
  ["lincoln", "Lincoln", "لینکلن", "لینکلن برای خودروهای لوکس آمریکایی با تمرکز روی راحتی، برق و قطعات کمیاب پوشش دارد.", [
    { slug: "navigator", name: "Navigator", fa: "Lincoln Navigator", generations: [generation("third", "Third generation", "2007-2017"), generation("fourth", "Fourth generation", "2018-present")] },
    { slug: "aviator", name: "Aviator", fa: "Lincoln Aviator", generations: [generation("u611", "U611", "2020-present")] },
    { slug: "continental", name: "Continental", fa: "Lincoln Continental", generations: [generation("tenth", "Tenth generation", "2017-2020")] },
  ]],
  ["dodge", "Dodge", "داج", "داج برای خودروهای عضلانی و SUV با تمرکز بر موتور، گیربکس و قطعات خاص پوشش داده می‌شود.", [
    { slug: "charger", name: "Charger", fa: "Dodge Charger", generations: [generation("lx", "LX", "2006-2010"), generation("ld", "LD", "2011-2023")] },
    { slug: "challenger", name: "Challenger", fa: "Dodge Challenger", generations: [generation("lc", "LC", "2008-2023")] },
    { slug: "durango", name: "Durango", fa: "Dodge Durango", generations: [generation("wd", "WD", "2011-present")] },
  ]],
  ["ram", "Ram", "رم", "Ram برای پیکاپ‌ها و خودروهای کاربری سنگین با قطعه و سرویس تخصصی پوشش دارد.", [
    { slug: "1500", name: "1500", fa: "Ram 1500", generations: [generation("ds", "DS", "2009-2018"), generation("dt", "DT", "2019-present")] },
    { slug: "2500", name: "2500", fa: "Ram 2500", generations: [generation("dj", "DJ", "2010-2018"), generation("dt", "DT", "2019-present")] },
  ]],
  ["chrysler", "Chrysler", "کرایسلر", "کرایسلر برای سدان‌ها و مینی‌ون‌های وارداتی با تمرکز روی قطعه و برق پوشش داده می‌شود.", [
    { slug: "300", name: "300", fa: "Chrysler 300", generations: [generation("lx", "LX", "2005-2010"), generation("ld", "LD", "2011-2023")] },
    { slug: "pacifica", name: "Pacifica", fa: "Chrysler Pacifica", generations: [generation("ru", "RU", "2017-present")] },
  ]],
  ["tesla", "Tesla", "تسلا", "تسلا به عنوان خودروی برقی نیازمند معماری سرویس برق، نرم‌افزار، بدنه و قطعات خاص است.", [
    { slug: "model-s", name: "Model S", fa: "Tesla Model S", generations: [generation("first", "First generation", "2012-present")] },
    { slug: "model-3", name: "Model 3", fa: "Tesla Model 3", generations: [generation("first", "First generation", "2017-present")] },
    { slug: "model-x", name: "Model X", fa: "Tesla Model X", generations: [generation("first", "First generation", "2015-present")] },
    { slug: "model-y", name: "Model Y", fa: "Tesla Model Y", generations: [generation("first", "First generation", "2020-present")] },
  ]],
  ["polestar", "Polestar", "پولستار", "Polestar برای خودروهای برقی پریمیوم با تمرکز بر برق، نرم‌افزار و بدنه پوشش داده می‌شود.", [
    { slug: "2", name: "2", fa: "Polestar 2", generations: [generation("first", "First generation", "2020-present")] },
    { slug: "3", name: "3", fa: "Polestar 3", generations: [generation("first", "First generation", "2023-present")] },
    { slug: "4", name: "4", fa: "Polestar 4", generations: [generation("first", "First generation", "2023-present")] },
  ]],
  ["peugeot", "Peugeot", "پژو", "پژوهای جهانی و وارداتی با تمرکز بر قطعه، برق و سرویس فنی در دانشنامه پوشش داده می‌شوند.", [
    { slug: "508", name: "508", fa: "Peugeot 508", generations: [generation("w2", "W2", "2010-2018"), generation("r8", "R8", "2018-present")] },
    { slug: "3008", name: "3008", fa: "Peugeot 3008", generations: [generation("t84", "T84", "2008-2016"), generation("p84", "P84", "2016-2024"), generation("p64", "P64", "2024-present")] },
    { slug: "5008", name: "5008", fa: "Peugeot 5008", generations: [generation("t87", "T87", "2009-2017"), generation("p87", "P87", "2017-2024")] },
  ]],
  ["citroen", "Citroen", "سیتروئن", "سیتروئن با تمرکز روی تعلیق، برق، قطعات و مدل‌های وارداتی پوشش دارد.", [
    { slug: "c5", name: "C5", fa: "Citroen C5", generations: [generation("x7", "X7", "2008-2017"), generation("c5x", "C5 X", "2021-present")] },
    { slug: "c4", name: "C4", fa: "Citroen C4", generations: [generation("b7", "B7", "2010-2018"), generation("c41", "C41", "2020-present")] },
    { slug: "ds5", name: "DS5", fa: "Citroen DS5", generations: [generation("b81", "B81", "2011-2018")] },
  ]],
  ["renault", "Renault", "رنو", "رنوهای وارداتی با قطعه، گیربکس، برق و سرویس دوره‌ای پوشش داده می‌شوند.", [
    { slug: "koleos", name: "Koleos", fa: "Renault Koleos", generations: [generation("hy", "HY", "2007-2016"), generation("hzg", "HZG", "2016-present")] },
    { slug: "talisman", name: "Talisman", fa: "Renault Talisman", generations: [generation("l2m", "L2M", "2015-2022")] },
    { slug: "megane", name: "Megane", fa: "Renault Megane", generations: [generation("iii", "Third generation", "2008-2016"), generation("iv", "Fourth generation", "2016-2024")] },
  ]],
  ["ds", "DS", "دی‌اس", "DS به عنوان برند پریمیوم فرانسوی با تمرکز بر برق، آپشن، قطعات و سرویس دقیق پوشش داده می‌شود.", [
    { slug: "ds5", name: "DS 5", fa: "DS 5", generations: [generation("b81", "B81", "2011-2018")] },
    { slug: "ds7", name: "DS 7", fa: "DS 7", generations: [generation("x74", "X74", "2017-present")] },
    { slug: "ds9", name: "DS 9", fa: "DS 9", generations: [generation("x83", "X83", "2020-present")] },
  ]],
  ["fiat", "Fiat", "فیات", "فیات برای خودروهای شهری و وارداتی با تمرکز روی قطعات مصرفی و برق پوشش دارد.", [
    { slug: "500", name: "500", fa: "Fiat 500", generations: [generation("312", "312", "2007-present")] },
    { slug: "tipo", name: "Tipo", fa: "Fiat Tipo", generations: [generation("356", "356", "2015-present")] },
    { slug: "panda", name: "Panda", fa: "Fiat Panda", generations: [generation("319", "319", "2011-present")] },
  ]],
  ["seat", "SEAT", "سئات", "SEAT برای خودروهای اروپایی گروه فولکس با سرویس، قطعه و دیاگ پوشش داده می‌شود.", [
    { slug: "leon", name: "Leon", fa: "SEAT Leon", generations: [generation("1p", "1P", "2005-2012"), generation("5f", "5F", "2012-2020"), generation("kl", "KL", "2020-present")] },
    { slug: "ateca", name: "Ateca", fa: "SEAT Ateca", generations: [generation("kh7", "KH7", "2016-present")] },
    { slug: "ibiza", name: "Ibiza", fa: "SEAT Ibiza", generations: [generation("6j", "6J", "2008-2017"), generation("kj", "KJ", "2017-present")] },
  ]],
  ["cupra", "Cupra", "کوپرا", "Cupra به عنوان برند اسپرت گروه فولکس با قطعه و سرویس تخصصی پوشش داده می‌شود.", [
    { slug: "formentor", name: "Formentor", fa: "Cupra Formentor", generations: [generation("km7", "KM7", "2020-present")] },
    { slug: "leon", name: "Leon", fa: "Cupra Leon", generations: [generation("kl", "KL", "2020-present")] },
    { slug: "born", name: "Born", fa: "Cupra Born", generations: [generation("first", "First generation", "2021-present")] },
  ]],
  ["opel", "Opel", "اوپل", "اوپلهای وارداتی با قطعه، برق، گیربکس و سرویس فنی پوشش داده می‌شوند.", [
    { slug: "insignia", name: "Insignia", fa: "Opel Insignia", generations: [generation("a", "A", "2008-2017"), generation("b", "B", "2017-2022")] },
    { slug: "mokka", name: "Mokka", fa: "Opel Mokka", generations: [generation("mokka-a", "Mokka A", "2012-2019"), generation("mokka-b", "Mokka B", "2020-present")] },
    { slug: "astra", name: "Astra", fa: "Opel Astra", generations: [generation("j", "J", "2009-2015"), generation("k", "K", "2015-2021"), generation("l", "L", "2021-present")] },
  ]],
  ["jaguar", "Jaguar", "جگوار", "جگوار برای خودروهای لوکس بریتانیایی با برق، قطعه، بدنه و نگهداری دقیق پوشش دارد.", [
    { slug: "xf", name: "XF", fa: "Jaguar XF", generations: [generation("x250", "X250", "2007-2015"), generation("x260", "X260", "2015-present")] },
    { slug: "f-pace", name: "F-Pace", fa: "Jaguar F-Pace", generations: [generation("x761", "X761", "2016-present")] },
    { slug: "f-type", name: "F-Type", fa: "Jaguar F-Type", generations: [generation("x152", "X152", "2013-2024")] },
  ]],
  ["bentley", "Bentley", "بنتلی", "بنتلی به سرویس بسیار دقیق، قطعات خاص، دیتیلینگ لوکس و نگهداری مستند نیاز دارد.", [
    { slug: "continental-gt", name: "Continental GT", fa: "Bentley Continental GT", generations: [generation("first", "First generation", "2003-2011"), generation("second", "Second generation", "2011-2018"), generation("third", "Third generation", "2018-present")] },
    { slug: "bentayga", name: "Bentayga", fa: "Bentley Bentayga", generations: [generation("first", "First generation", "2015-present")] },
    { slug: "flying-spur", name: "Flying Spur", fa: "Bentley Flying Spur", generations: [generation("second", "Second generation", "2013-2019"), generation("third", "Third generation", "2019-present")] },
  ]],
  ["rolls-royce", "Rolls-Royce", "رولزرویس", "رولزرویس به نگهداری بسیار خاص، دیتیلینگ، قطعات کمیاب و سرویس فوق دقیق نیاز دارد.", [
    { slug: "ghost", name: "Ghost", fa: "Rolls-Royce Ghost", generations: [generation("rr4", "RR4", "2009-2020"), generation("rr21", "RR21", "2020-present")] },
    { slug: "phantom", name: "Phantom", fa: "Rolls-Royce Phantom", generations: [generation("vii", "Phantom VII", "2003-2017"), generation("viii", "Phantom VIII", "2017-present")] },
    { slug: "cullinan", name: "Cullinan", fa: "Rolls-Royce Cullinan", generations: [generation("rr31", "RR31", "2018-present")] },
  ]],
  ["aston-martin", "Aston Martin", "استون مارتین", "استون مارتین برای خودروهای اسپرت لوکس با سرویس، قطعات خاص و نگهداری مستند پوشش داده می‌شود.", [
    { slug: "db11", name: "DB11", fa: "Aston Martin DB11", generations: [generation("first", "First generation", "2016-2023")] },
    { slug: "vantage", name: "Vantage", fa: "Aston Martin Vantage", generations: [generation("vh2", "VH2", "2005-2017"), generation("am6", "AM6", "2018-present")] },
    { slug: "dbx", name: "DBX", fa: "Aston Martin DBX", generations: [generation("first", "First generation", "2020-present")] },
  ]],
  ["ferrari", "Ferrari", "فراری", "فراری نیازمند سرویس بسیار تخصصی، قطعات خاص، دیتیلینگ و نگهداری دقیق است.", [
    { slug: "458", name: "458", fa: "Ferrari 458", generations: [generation("f142", "F142", "2009-2015")] },
    { slug: "488", name: "488", fa: "Ferrari 488", generations: [generation("f142m", "F142M", "2015-2019")] },
    { slug: "roma", name: "Roma", fa: "Ferrari Roma", generations: [generation("f169", "F169", "2019-present")] },
    { slug: "purosangue", name: "Purosangue", fa: "Ferrari Purosangue", generations: [generation("f175", "F175", "2022-present")] },
  ]],
  ["lamborghini", "Lamborghini", "لامبورگینی", "لامبورگینی با تمرکز روی خودروهای سوپراسپرت، قطعات کمیاب و نگهداری مستند پوشش دارد.", [
    { slug: "gallardo", name: "Gallardo", fa: "Lamborghini Gallardo", generations: [generation("first", "First generation", "2003-2013")] },
    { slug: "huracan", name: "Huracan", fa: "Lamborghini Huracan", generations: [generation("lp610", "LP610 family", "2014-2024")] },
    { slug: "aventador", name: "Aventador", fa: "Lamborghini Aventador", generations: [generation("lp700", "LP700 family", "2011-2022")] },
    { slug: "urus", name: "Urus", fa: "Lamborghini Urus", generations: [generation("first", "First generation", "2018-present")] },
  ]],
  ["mclaren", "McLaren", "مک‌لارن", "مک‌لارن به سرویس فوق تخصصی، قطعات کمیاب و مراقبت دقیق بدنه و فنی نیاز دارد.", [
    { slug: "570s", name: "570S", fa: "McLaren 570S", generations: [generation("sports-series", "Sports Series", "2015-2021")] },
    { slug: "720s", name: "720S", fa: "McLaren 720S", generations: [generation("super-series", "Super Series", "2017-2023")] },
    { slug: "artura", name: "Artura", fa: "McLaren Artura", generations: [generation("first", "First generation", "2021-present")] },
  ]],
  ["bugatti", "Bugatti", "بوگاتی", "بوگاتی به عنوان هایپرکار بسیار خاص فقط با مسیر مشاوره، نگهداری و قطعه فوق تخصصی پوشش داده می‌شود.", [
    { slug: "veyron", name: "Veyron", fa: "Bugatti Veyron", generations: [generation("first", "First generation", "2005-2015")] },
    { slug: "chiron", name: "Chiron", fa: "Bugatti Chiron", generations: [generation("first", "First generation", "2016-2024")] },
    { slug: "tourbillon", name: "Tourbillon", fa: "Bugatti Tourbillon", generations: [generation("first", "First generation", "2026-present")] },
  ]],
  ["lotus", "Lotus", "لوتوس", "لوتوس برای خودروهای سبک اسپرت و برقی جدید با نگهداری دقیق و قطعات خاص پوشش دارد.", [
    { slug: "elise", name: "Elise", fa: "Lotus Elise", generations: [generation("s2", "Series 2", "2000-2010"), generation("s3", "Series 3", "2010-2021")] },
    { slug: "emira", name: "Emira", fa: "Lotus Emira", generations: [generation("first", "First generation", "2022-present")] },
    { slug: "eletre", name: "Eletre", fa: "Lotus Eletre", generations: [generation("first", "First generation", "2023-present")] },
  ]],
];

export const vehicleBrands: VehicleBrand[] = globalBrandCatalog.map(([slug, name, fa, description, modelSeeds]) => ({
  slug,
  name,
  fa,
  description,
  ...brandMeta(slug),
  brandMark: {
    text: name.split(/\s|-/).map((part) => part[0]).join("").slice(0, 3).toUpperCase(),
    source: "Auto Makhsus generated typographic brand mark",
    license: "Internal typographic placeholder. This is not an official manufacturer logo.",
    usageStatus: "typographic-placeholder",
  },
  services: brandServices(slug, fa),
  commonIssues: brandIssues(slug, fa),
  diagnostics: brandDiagnostics(slug, fa),
  parts: brandParts(slug, fa),
  options: brandOptions(slug, fa),
  detailing: brandDetailing(slug, fa),
  servicePackages: brandPackages(slug, fa),
  faqs: brandFaqs(slug, fa),
  models: mergeSeedModels(slug, modelSeeds),
}));

function brandServices(slug: string, fa: string) {
  const base = ["دیاگ تخصصی", "سرویس دوره‌ای", "قطعات و خرید + نصب", "کارشناسی قبل خرید"];
  const premium = ["دیتیلینگ و محافظت بدنه", "بررسی آپشن‌ها و الکترونیک کابین"];
  const rugged = ["بازدید تعلیق و آفرود", "کنترل سیستم چهارچرخ"];
  if (["porsche", "maserati", "alfa-romeo"].includes(slug)) return [...base, "بازدید فنی خودروهای خاص", "قطعات Special Order"];
  if (["land-rover", "range-rover", "jeep", "toyota"].includes(slug)) return [...base, ...rugged];
  if (["lexus", "mercedes-benz", "bmw", "audi", "volvo"].includes(slug)) return [...base, ...premium];
  return [...base, `برنامه نگهداری ${fa}`];
}

function brandIssues(slug: string, fa: string) {
  const issues: Record<string, string[]> = {
    bmw: ["حساسیت به سرویس روغن و کیفیت قطعه", "خطاهای ماژول و سنسور", "تعلیق و ترمز در مدل‌های سنگین‌تر"],
    "mercedes-benz": ["خطاهای ماژول‌های رفاهی", "اهمیت سرویس موتور و گیربکس", "نیاز به نصب آپشن بدون آسیب به سیم‌کشی"],
    porsche: ["هزینه بالای خطای تشخیص", "حساسیت گیربکس و سیستم خنک‌کاری", "نیاز به دیتیلینگ و نگهداری دقیق"],
    audi: ["خطاهای برق و ماژول", "سرویس گیربکس و توربو در مدل‌های مرتبط", "قطعات تخصصی با ریسک تامین"],
    volkswagen: ["حساسیت به قطعات مصرفی سازگار", "خطاهای سنسور و برق", "نیاز به سرویس پیشگیرانه"],
    mini: ["فضای فنی فشرده و اهمیت تشخیص دقیق", "قطعات خاص بدنه و کابین", "حساسیت به سرویس دوره‌ای"],
    "land-rover": ["تعلیق و سیستم ارتفاع", "خطاهای برق و ماژول", "نیاز به قطعات معتبر"],
    "range-rover": ["هزینه بالای خطاهای تعلیق", "ماژول‌های رفاهی و برق", "اهمیت ثبت سابقه سرویس"],
    volvo: ["سیستم‌های ایمنی و سنسورها", "قطعات خاص بدنه و برق", "نیاز به دیاگ دقیق"],
    maserati: ["قطعات کمیاب و Special Order", "حساسیت سرویس موتور و گیربکس", "نیاز به نگهداری بسیار مستند"],
    "alfa-romeo": ["قطعات خاص و زمان تامین", "خطاهای سنسوری و برقی", "اهمیت شناخت مدل"],
    jeep: ["تعلیق و استفاده سخت", "سیستم چهارچرخ", "مصرفی‌های مناسب کاربری"],
    toyota: ["مصرفی‌های پرتکرار", "جلوبندی و ترمز", "اهمیت قطعه معتبر در مدل‌های وارداتی"],
    lexus: ["حفظ کیفیت سواری", "سیستم هیبرید در برخی مدل‌ها", "دیتیلینگ و نگهداری کابین"],
    nissan: ["قطعات مصرفی و برق", "گیربکس در بعضی مدل‌ها", "دیاگ قبل از تعمیر"],
    hyundai: ["جلوبندی، گیربکس و مصرفی‌ها", "خطاهای سنسور", "تفاوت کیفیت قطعه جایگزین"],
    kia: ["مصرفی‌ها و جلوبندی", "گیربکس در مدل‌های پرکارکرد", "نیاز به قطعه معتبر"],
    skoda: ["برند جدیدتر با نیاز به مستندسازی", "قطعات و سرویس تخصصی", "خطاهای برق و ماژول"],
    aion: ["خودروی جدیدتر با نیاز به پشتیبانی فنی", "برق و الکترونیک حساس", "نیاز به ثبت دقیق سابقه"],
  };
  return issues[slug] || [`نیاز به قطعه سازگار ${fa}`, "خطاهای برقی و سنسوری", "اهمیت ثبت سابقه سرویس"];
}

function brandDiagnostics(slug: string, fa: string) {
  if (["aion", "volvo"].includes(slug)) return ["اسکن ماژول‌های ایمنی و کمک‌راننده", "کنترل خطاهای ارتباطی شبکه خودرو", "گزارش ریسک ادامه رانندگی"];
  if (["bmw", "mercedes-benz", "audi"].includes(slug)) return ["دیاگ موتور، گیربکس و ماژول‌های بدنه", "بررسی داده زنده سنسورها", "تست باتری، ولتاژ و خطاهای مقطعی"];
  if (["porsche", "maserati", "alfa-romeo"].includes(slug)) return ["تشخیص مرحله‌ای برای جلوگیری از تعمیر اشتباه", "کنترل دما، فشار و وضعیت سرویس‌های حساس", "تهیه گزارش فنی قبل از سفارش قطعه"];
  if (["toyota", "lexus", "nissan", "hyundai", "kia", "skoda"].includes(slug)) return ["دیاگ کامل قبل از تعویض قطعه", "کنترل گیربکس، ترمز و سنسورها", "اولویت‌بندی تعمیرات ضروری و مصرفی"];
  return [`دیاگ تخصصی ${fa}`, "بررسی برق، سنسور و ماژول", "گزارش تشخیص و اولویت تعمیر"];
}

function brandParts(slug: string, fa: string) {
  if (["porsche", "maserati", "alfa-romeo", "mini", "volvo"].includes(slug)) return ["مسیر Special Order برای قطعات کمیاب", "بررسی OEM / Aftermarket قبل از سفارش", "ثبت قطعه، فاکتور و نصب در CRM"];
  if (["toyota", "lexus", "hyundai", "kia", "nissan"].includes(slug)) return ["قطعات مصرفی قابل تامین", "خرید + نصب با کنترل کیفیت", "تشخیص قطعه اصلی، جایگزین معتبر یا استوک سالم"];
  if (["land-rover", "range-rover", "jeep"].includes(slug)) return ["قطعات تعلیق و چهارچرخ", "مصرفی‌های مناسب کاربری سنگین", "بررسی ریسک قطعه استوک قبل از نصب"];
  return [`تامین قطعات ${fa}`, "قطعات فنی، برق و مصرفی", "ثبت مسیر خرید + نصب در پرونده خودرو"];
}

function brandOptions(slug: string, fa: string) {
  if (["bmw", "mercedes-benz", "lexus", "audi"].includes(slug)) return ["آپشن‌های رفاهی کابین", "نصب OEM-style بدون تخریب", "تست عملکرد و خطایابی بعد نصب"];
  if (["toyota", "hyundai", "kia", "nissan"].includes(slug)) return ["ارتقای نمایشگر، دوربین، سنسور و امکانات رفاهی", "بررسی سازگاری برق و قطعه", "ثبت گارانتی نصب"];
  return [`بررسی آپشن‌های قابل نصب روی ${fa}`, "کنترل سیم‌کشی و سازگاری", "QC نهایی و تحویل مستند"];
}

function brandDetailing(slug: string, fa: string) {
  if (["porsche", "maserati", "lexus", "mercedes-benz", "bmw"].includes(slug)) return ["دیتیلینگ حرفه‌ای برای حفظ ارزش خودرو", "محافظت رنگ، سرامیک و PPF", "نگهداری کابین و تریم لوکس"];
  return [`دیتیلینگ و نگهداری ظاهر ${fa}`, "شست‌وشو و آماده‌سازی اصولی", "پیشنهاد محافظت براساس کاربری خودرو"];
}

function brandPackages(slug: string, fa: string) {
  const specialOrder = ["porsche", "maserati", "alfa-romeo", "mini", "volvo"].includes(slug);
  const authorized = ["toyota", "lexus", "nissan", "hyundai", "skoda", "aion"].includes(slug);
  return [
    {
      title: `پکیج تشخیص ${fa}`,
      body: `دیاگ، بررسی علائم، اولویت‌بندی تعمیر و گزارش قابل پیگیری برای ${fa}.`,
    },
    {
      title: specialOrder ? "پکیج تامین قطعه خاص" : "پکیج خرید + نصب قطعه",
      body: specialOrder ? "برای قطعات کمیاب، مسیر سفارش خاص، کنترل سازگاری و نصب مستند پیشنهاد می‌شود." : "قطعه مصرفی یا فنی بعد از تایید سازگاری تامین و در مسیر کنترل‌شده نصب می‌شود.",
    },
    {
      title: authorized ? "پکیج سرویس نمایندگی/مولتی‌برند" : "پکیج نگهداری دوره‌ای",
      body: authorized ? "برای برندهای تحت پوشش ANI2203 یا Auto Makhsus، سرویس با ثبت سابقه و کنترل کیفیت انجام می‌شود." : "سرویس دوره‌ای، بازدید ترمز، تعلیق، برق و گزارش سلامت برای کاهش ریسک خرابی.",
    },
  ];
}

function brandFaqs(slug: string, fa: string) {
  return [
    {
      question: `آیا Auto Makhsus برای ${fa} فقط سرویس فنی انجام می‌دهد؟`,
      answer: "خیر. بسته به نیاز خودرو، دیاگ، سرویس، قطعه، خرید + نصب، آپشن، دیتیلینگ و کارشناسی قبل خرید قابل برنامه‌ریزی است.",
    },
    {
      question: `برای ${fa} قطعه OEM بهتر است یا Aftermarket؟`,
      answer: "تصمیم به نوع قطعه، حساسیت بخش، بودجه، موجودی و ریسک نصب بستگی دارد. مسیر پیشنهادی باید قبل از خرید شفاف شود.",
    },
    {
      question: "آیا سابقه سرویس به پرونده خودرو وصل می‌شود؟",
      answer: "در معماری Auto Makhsus، هدف اتصال سرویس، فاکتور، قطعه، پروژه و گارانتی به Vehicle Digital Passport است.",
    },
  ];
}

export const ecosystemLinks = [
  { title: "Academy", fa: "آکادمی", href: "/fa/academy", description: "مقالات فنی، راهنمای نگهداری، عیب‌یابی و آموزش خودروهای خارجی.", accent: "#0b5cff" },
  { title: "Video Center", fa: "مرکز ویدئو", href: "/fa/videos", description: "ویدئوهای آموزشی، خدمات، دیاگ و نصب آپشن با توضیح و ترنسکریپت.", accent: "#2f80ed" },
  { title: "Project Showcase", fa: "نمونه‌کارها", href: "/fa/projects", description: "قبل، حین و بعد از پروژه‌های فنی، دیتیلینگ، نصب، بدنه و داخلی.", accent: "#8fd3ff" },
  { title: "Community", fa: "کامیونیتی و پرسش‌وپاسخ", href: "/fa/community", description: "فوندیشن خواندنی برای سوالات پرتکرار، دسته‌ها و پاسخ‌های پذیرفته‌شده.", accent: "#7c3aed" },
  { title: "Vehicle Knowledge Base", fa: "دانشنامه خودرو", href: "/fa/cars", description: "هاب برند و مدل برای BMW، Mercedes، Porsche، Toyota، Lexus و دیگر خودروهای خارجی.", accent: "#06b6d4" },
  { title: "Marketplace", fa: "فروشگاه قطعات", href: "/fa/store", description: "قطعات، مواد مصرفی، OEM، Aftermarket، Used و Special Order با مسیر خرید + نصب.", accent: "#f59e0b" },
];

export function findContent<T extends { slug: string }>(items: T[], slug: string) {
  return items.find((item) => item.slug === slug);
}

export function findVehicleBrand(slug: string) {
  return vehicleBrands.find((brand) => brand.slug === slug);
}

export function findVehicleModel(brandSlug: string, modelSlug: string) {
  return findVehicleBrand(brandSlug)?.models.find((model) => model.slug === modelSlug);
}

export function findVehicleGeneration(brandSlug: string, modelSlug: string, generationSlug: string) {
  return findVehicleModel(brandSlug, modelSlug)?.generations?.find((generationItem) => generationItem.slug === generationSlug);
}

export function articleSchema(item: ContentCard) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.description,
    image: absolute(item.image),
    datePublished: item.date,
    dateModified: item.date,
    inLanguage: "fa-IR",
    author: { "@type": "Organization", name: "Auto Makhsus" },
    publisher: { "@type": "Organization", name: "Auto Makhsus" },
    mainEntityOfPage: absolute(item.path),
    keywords: item.tags.join(", "),
  };
}

export function videoSchema(item: VideoContent) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: item.title,
    description: item.description,
    thumbnailUrl: absolute(item.poster),
    uploadDate: item.date,
    duration: videoDurationToIso(item.duration),
    transcript: item.transcript,
    inLanguage: "fa-IR",
    hasPart: item.chapters.map((chapter) => ({
      "@type": "Clip",
      name: chapter.title,
      startOffset: videoTimeToSeconds(chapter.time),
      description: chapter.summary,
    })),
  };
}

export function faqSchema(item: { faqs: { question: string; answer: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: item.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function qaSchema(item: QuestionContent) {
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: item.title,
      text: item.description,
      answerCount: 1,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.acceptedAnswer,
        author: { "@type": "Organization", name: "Auto Makhsus" },
      },
    },
  };
}

export function vehicleSchema(brand: VehicleBrand, model?: VehicleModel, generationItem?: VehicleGeneration) {
  const entityName = generationItem && model ? `${model.fa} نسل ${generationItem.name}` : model ? model.fa : brand.fa;
  const entityDescription = generationItem?.note || model?.intro || brand.description;
  const entityPath = generationItem && model
    ? `/fa/cars/${brand.slug}/${model.slug}/${generationItem.slug}`
    : model
      ? `/fa/cars/${brand.slug}/${model.slug}`
      : `/fa/cars/${brand.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${entityName} در Auto Makhsus`,
    description: entityDescription,
    url: absolute(entityPath),
    inLanguage: "fa-IR",
    about: {
      "@type": "Brand",
      name: brand.name,
    },
    mainEntity: {
      "@type": "Service",
      name: `خدمات ${entityName}`,
      serviceType: [...brand.services, ...(model?.maintenance || [])].join(", "),
      provider: { "@type": "Organization", name: "Auto Makhsus" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `پکیج‌های خدمات ${entityName}`,
        itemListElement: (model?.servicePackages || brand.servicePackages).map((entry) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: entry.title,
            description: entry.body,
          },
        })),
      },
    },
  };
}

function videoDurationToIso(duration: string) {
  const [minutes = "0", seconds = "0"] = duration.split(":");
  return `PT${Number(minutes)}M${Number(seconds)}S`;
}

function videoTimeToSeconds(time: string) {
  const [minutes = "0", seconds = "0"] = time.split(":");
  return Number(minutes) * 60 + Number(seconds);
}

export const contentRoutes = [
  "/fa/academy",
  ...academyArticles.map((item) => item.path),
  "/fa/videos",
  ...videos.map((item) => item.path),
  "/fa/projects",
  ...projects.map((item) => item.path),
  "/fa/feed",
  ...feedItems.map((item) => item.path),
  "/fa/community",
  "/fa/community/questions",
  ...questions.map((item) => item.path),
  "/fa/cars",
  ...vehicleBrands.map((brand) => `/fa/cars/${brand.slug}`),
  ...vehicleBrands.flatMap((brand) => brand.models.map((model) => `/fa/cars/${brand.slug}/${model.slug}`)),
  ...vehicleBrands.flatMap((brand) => brand.models.flatMap((model) => (model.generations || []).map((generationItem) => `/fa/cars/${brand.slug}/${model.slug}/${generationItem.slug}`))),
];
