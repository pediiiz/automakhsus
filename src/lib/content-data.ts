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
    { slug: "x3", name: "X3", fa: "BMW X3", years: "2015 تا جدید", intro: "کراس‌اوور محبوب BMW با حساسیت بالا به نگهداری گیربکس، سیستم تعلیق و برق.", commonIssues: ["خطاهای سنسور", "نشتی روغن", "لرزش تعلیق"], maintenance: ["دیاگ دوره‌ای", "بازدید گیربکس", "بررسی جلوبندی"] },
    { slug: "x5", name: "X5", fa: "BMW X5", years: "2014 تا جدید", intro: "SUV لوکس BMW که نیازمند سرویس منظم، قطعات سازگار و تشخیص دقیق است.", commonIssues: ["خطاهای ماژول", "مشکلات تعلیق", "مصرفی‌های گران"], maintenance: ["سرویس دوره‌ای", "دیاگ تخصصی", "بازدید ترمز"] },
  ],
  "mercedes-benz": [
    { slug: "c200", name: "C200", fa: "Mercedes-Benz C200", years: "2014 تا جدید", intro: "سدان پرتقاضای بنز با نیاز به تشخیص دقیق برق، موتور و آپشن‌ها.", commonIssues: ["خطای ماژول", "سنسورها", "گیربکس"], maintenance: ["دیاگ", "سرویس روغن", "بازدید برق"] },
    { slug: "e200", name: "E200", fa: "Mercedes-Benz E200", years: "2014 تا جدید", intro: "سدان executive بنز با ارزش بالای نگهداری صحیح و ثبت سوابق.", commonIssues: ["برق و آپشن", "تعلیق", "ترمز"], maintenance: ["سرویس دوره‌ای", "کارشناسی", "بازدید تعلیق"] },
  ],
  toyota: [
    { slug: "prado", name: "Prado", fa: "Toyota Prado", years: "2008 تا جدید", intro: "SUV قابل اعتماد تویوتا که با سرویس صحیح، دوام بالایی دارد.", commonIssues: ["جلوبندی", "ترمز", "قطعات مصرفی"], maintenance: ["سرویس دوره‌ای", "بازدید تعلیق", "دیاگ"] },
  ],
  lexus: [
    { slug: "rx", name: "RX", fa: "Lexus RX", years: "2010 تا جدید", intro: "کراس‌اوور لوکس لکسوس با تمرکز روی نگهداری نرم، دقیق و مستند.", commonIssues: ["مصرفی‌ها", "سیستم هیبرید در برخی مدل‌ها", "تعلیق"], maintenance: ["دیاگ", "سرویس روغن", "بازدید ترمز"] },
  ],
  hyundai: [
    { slug: "santa-fe", name: "Santa Fe", fa: "هیوندای سانتافه", years: "2010 تا جدید", intro: "سانتافه در ایران پرمصرف است و نگهداری آن باید با قطعات معتبر انجام شود.", commonIssues: ["گیربکس", "جلوبندی", "مصرفی‌ها"], maintenance: ["سرویس دوره‌ای", "بازدید جلوبندی", "دیاگ"] },
    { slug: "tucson", name: "Tucson", fa: "هیوندای توسان", years: "2010 تا جدید", intro: "توسان برای سرویس، قطعه و عیب‌یابی در شبکه خودروهای خارجی Auto Makhsus پوشش داده می‌شود.", commonIssues: ["سنسورها", "تعلیق", "ترمز"], maintenance: ["دیاگ", "سرویس روغن", "بازدید ترمز"] },
  ],
  kia: [
    { slug: "cerato", name: "Cerato", fa: "کیا سراتو", years: "2010 تا جدید", intro: "سراتو نیازمند سرویس مصرفی منظم و بررسی دقیق قطعات جایگزین است.", commonIssues: ["جلوبندی", "ترمز", "برق"], maintenance: ["سرویس دوره‌ای", "دیاگ", "بازدید جلوبندی"] },
    { slug: "optima", name: "Optima", fa: "کیا اپتیما", years: "2010 تا جدید", intro: "اپتیما به سرویس اصولی موتور، گیربکس و سیستم برق نیاز دارد.", commonIssues: ["گیربکس", "سنسورها", "مصرفی‌ها"], maintenance: ["بازدید گیربکس", "سرویس روغن", "دیاگ"] },
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
  services: ["دیاگ تخصصی", "سرویس دوره‌ای", "قطعات و خرید + نصب", "کارشناسی قبل خرید"],
  commonIssues: ["نیاز به قطعه سازگار", "خطاهای برقی و سنسوری", "اهمیت ثبت سابقه سرویس"],
  models: priorityModels[slug] || [],
}));

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
    duration: `PT${item.duration.replace(":", "M")}S`,
    transcript: item.transcript,
    inLanguage: "fa-IR",
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
      serviceType: brand.services.join(", "),
      provider: { "@type": "Organization", name: "Auto Makhsus" },
    },
  };
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
