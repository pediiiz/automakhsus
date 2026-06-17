export type ForumCategory = {
  slug: string;
  title: string;
  description: string;
  groups: ForumGroup[];
};

export type ForumGroup = {
  slug: string;
  title: string;
  description: string;
  topicCount: number;
  moderation: "read-only" | "moderated-posting";
};

export type ForumTopic = {
  slug: string;
  title: string;
  categorySlug: string;
  groupSlug: string;
  authorLabel: string;
  status: "OPEN" | "PINNED" | "LOCKED";
  replyCount: number;
  tags: string[];
  excerpt: string;
  acceptedAnswer?: string;
};

export const forumCategories: ForumCategory[] = [
  {
    slug: "technical-service",
    title: "خدمات فنی خودروهای خارجی",
    description: "گفت‌وگوهای کنترل‌شده درباره دیاگ، مکانیک، برق، گیربکس، ترمز و جلوبندی.",
    groups: [
      { slug: "diagnostics", title: "دیاگ و خطایابی", description: "کد خطا، داده زنده، سنسورها و مسیر تشخیص.", topicCount: 18, moderation: "moderated-posting" },
      { slug: "mechanics", title: "مکانیک و موتور", description: "سرویس دوره‌ای، موتور، نشتی، صدا و عملکرد.", topicCount: 14, moderation: "moderated-posting" },
      { slug: "electronics", title: "برق و الکترونیک", description: "ماژول‌ها، باتری، دینام، آپشن و سیم‌کشی.", topicCount: 11, moderation: "moderated-posting" },
    ],
  },
  {
    slug: "parts-marketplace",
    title: "قطعات و خرید + نصب",
    description: "استعلام، انتخاب قطعه، OEM، Aftermarket، استوک و سفارش خارجی.",
    groups: [
      { slug: "oem-parts", title: "قطعات OEM", description: "سازگاری قطعه اصلی با برند، مدل و سال ساخت.", topicCount: 10, moderation: "moderated-posting" },
      { slug: "special-order", title: "سفارش خارجی", description: "قطعات کمیاب، زمان تامین و ریسک سازگاری.", topicCount: 8, moderation: "moderated-posting" },
    ],
  },
  {
    slug: "ownership",
    title: "مالکیت و نگهداری",
    description: "تجربه نگهداری، سرویس، کارشناسی قبل خرید و هزینه مالکیت.",
    groups: [
      { slug: "maintenance", title: "سرویس و نگهداری", description: "برنامه سرویس، مصرفی‌ها و یادآوری‌ها.", topicCount: 16, moderation: "moderated-posting" },
      { slug: "inspection", title: "کارشناسی قبل خرید", description: "ریسک خرید خودروهای وارداتی و لوکس.", topicCount: 9, moderation: "moderated-posting" },
    ],
  },
];

export const forumTopics: ForumTopic[] = [
  {
    slug: "bmw-x5-check-engine-diagnostics",
    title: "چراغ چک BMW X5 بعد از تعویض باتری روشن مانده؛ از کجا شروع کنیم؟",
    categorySlug: "technical-service",
    groupSlug: "diagnostics",
    authorLabel: "پرسش نمونه مشتری",
    status: "PINNED",
    replyCount: 4,
    tags: ["BMW", "X5", "دیاگ", "باتری"],
    excerpt: "موضوع نمونه برای نمایش مسیر پرسش، پاسخ پذیرفته‌شده، لینک به دیاگ تخصصی و رزرو سرویس.",
    acceptedAnswer: "ابتدا ولتاژ، تاریخ خطا، داده زنده و ماژول‌های وابسته بررسی شود؛ پاک کردن خطا بدون تحلیل توصیه نمی‌شود.",
  },
  {
    slug: "toyota-prado-brake-pads-oem-or-aftermarket",
    title: "برای Prado لنت OEM بهتر است یا Aftermarket معتبر؟",
    categorySlug: "parts-marketplace",
    groupSlug: "oem-parts",
    authorLabel: "پرسش نمونه قطعه",
    status: "OPEN",
    replyCount: 3,
    tags: ["Toyota", "Prado", "ترمز", "قطعات"],
    excerpt: "مقایسه انتخاب قطعه، نصب کنترل‌شده و ثبت در سابقه سرویس خودرو.",
    acceptedAnswer: "انتخاب باید بر اساس وزن خودرو، وضعیت دیسک، سنسور و نوع مصرف انجام شود؛ خرید + نصب ریسک ناسازگاری را کم می‌کند.",
  },
  {
    slug: "pre-purchase-inspection-audi-q5",
    title: "در کارشناسی قبل خرید Audi Q5 چه مواردی مهم‌تر است؟",
    categorySlug: "ownership",
    groupSlug: "inspection",
    authorLabel: "پرسش نمونه کارشناسی",
    status: "LOCKED",
    replyCount: 6,
    tags: ["Audi", "Q5", "کارشناسی", "دیاگ"],
    excerpt: "موضوع قفل‌شده نمونه برای نمایش moderation foundation و جلوگیری از نوشتن عمومی بدون کنترل.",
    acceptedAnswer: "دیاگ ماژول‌ها، گیربکس، تعلیق، بدنه، آپشن‌ها و سوابق سرویس باید هم‌زمان بررسی شود.",
  },
];

export function forumCategoryPath(slug: string) {
  return `/fa/forum#${slug}`;
}

export function forumTopicPath(slug: string) {
  return `/fa/forum/topics/${slug}`;
}

export function findForumTopic(slug: string) {
  return forumTopics.find((topic) => topic.slug === slug);
}
