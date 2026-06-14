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
  intro: string;
  commonIssues: string[];
  maintenance: string[];
  diagnostics: string[];
  parts: string[];
  servicePackages: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
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

export const vehicleBrands: VehicleBrand[] = [
  ["bmw", "BMW", "بی‌ام‌و", "خدمات BMW در Auto Makhsus شامل دیاگ، برق، سرویس دوره‌ای، گیربکس، تعلیق، قطعه و کارشناسی است."],
  ["mercedes-benz", "Mercedes-Benz", "مرسدس بنز", "خدمات Mercedes-Benz با تمرکز روی دیاگ، برق، نگهداری، آپشن، قطعات و سوابق دیجیتال خودرو انجام می‌شود."],
  ["porsche", "Porsche", "پورشه", "پورشه نیازمند تشخیص دقیق، قطعه معتبر، دیتیلینگ و نگهداری مستند است."],
  ["audi", "Audi", "آئودی", "خدمات Audi برای خودروهای وارداتی با محور دیاگ، برق، گیربکس و قطعات تخصصی تعریف می‌شود."],
  ["volkswagen", "Volkswagen", "فولکس‌واگن", "فولکس‌واگن در هاب خودروهای خارجی Auto Makhsus برای سرویس، قطعه و عیب‌یابی پوشش داده می‌شود."],
  ["mini", "Mini", "مینی", "مینی به سرویس دقیق، قطعات سازگار و عیب‌یابی تخصصی نیاز دارد."],
  ["land-rover", "Land Rover", "لندرور", "لندرور و رنج‌روور با تمرکز روی تعلیق، برق، دیاگ و نگهداری تخصصی پوشش داده می‌شوند."],
  ["range-rover", "Range Rover", "رنج‌روور", "رنج‌روور به سرویس مستند، برق دقیق، قطعه مناسب و گزارش فنی نیاز دارد."],
  ["volvo", "Volvo", "ولوو", "ولوو با استاندارد ایمنی بالا، نیازمند عیب‌یابی و نگهداری دقیق است."],
  ["maserati", "Maserati", "مازراتی", "مازراتی در خدمات خودروهای وارداتی با تمرکز بر نگهداری خاص و قطعات معتبر دیده می‌شود."],
  ["alfa-romeo", "Alfa Romeo", "آلفارومئو", "آلفارومئو نیازمند شناخت فنی مدل، قطعه و سرویس‌های حساس است."],
  ["jeep", "Jeep", "جیپ", "جیپ برای سرویس فنی، تعلیق، برق و قطعات کاربردی در هاب خودروهای خارجی پوشش داده می‌شود."],
  ["toyota", "Toyota", "تویوتا", "خدمات Toyota شامل سرویس دوره‌ای، قطعات مصرفی، کارشناسی، دیاگ و نگهداری مطمئن است."],
  ["lexus", "Lexus", "لکسوس", "لکسوس به سرویس لوکس، دیتیلینگ، قطعات معتبر و سوابق دیجیتال خودرو نیاز دارد."],
  ["nissan", "Nissan", "نیسان", "نیسان در خدمات خودروهای خارجی برای سرویس، قطعه، دیاگ و نگهداری پوشش دارد."],
  ["hyundai", "Hyundai", "هیوندای", "هیوندای در ایران نیازمند قطعات معتبر، سرویس دقیق و عیب‌یابی مستند است."],
  ["kia", "Kia", "کیا", "کیا برای مدل‌های پرمصرف ایران با خدمات فنی، قطعه، دیاگ و نگهداری پوشش داده می‌شود."],
  ["skoda", "Skoda", "اشکودا", "اشکودا در کنار ANI2203 و هاب Auto Makhsus برای سرویس و نگهداری دیده می‌شود."],
  ["aion", "Aion", "آیون", "Aion به عنوان برند جدیدتر نیازمند معماری فنی، برق و پشتیبانی تخصصی است."],
].map(([slug, name, fa, description]) => ({
  slug,
  name,
  fa,
  description,
  services: brandServices(slug, fa),
  commonIssues: brandIssues(slug, fa),
  diagnostics: brandDiagnostics(slug, fa),
  parts: brandParts(slug, fa),
  options: brandOptions(slug, fa),
  detailing: brandDetailing(slug, fa),
  servicePackages: brandPackages(slug, fa),
  faqs: brandFaqs(slug, fa),
  models: priorityModels[slug] || [],
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
  { title: "Marketplace Preview", fa: "پیش‌نمایش فروشگاه", href: "/fa/ecosystem#marketplace", description: "قطعات، مواد مصرفی، OEM، Aftermarket، Used و Special Order.", accent: "#f59e0b" },
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

export function vehicleSchema(brand: VehicleBrand, model?: VehicleModel) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: model ? `${model.fa} در Auto Makhsus` : `${brand.fa} در Auto Makhsus`,
    description: model?.intro || brand.description,
    url: absolute(model ? `/fa/cars/${brand.slug}/${model.slug}` : `/fa/cars/${brand.slug}`),
    inLanguage: "fa-IR",
    about: {
      "@type": "Brand",
      name: brand.name,
    },
    mainEntity: {
      "@type": "Service",
      name: model ? `خدمات ${model.fa}` : `خدمات ${brand.fa}`,
      serviceType: [...brand.services, ...(model?.maintenance || [])].join(", "),
      provider: { "@type": "Organization", name: "Auto Makhsus" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: model ? `پکیج‌های خدمات ${model.fa}` : `پکیج‌های خدمات ${brand.fa}`,
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
];
