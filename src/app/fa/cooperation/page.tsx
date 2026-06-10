import type { Metadata } from "next";
import { LeadSection, PageHero, SeoJsonLd } from "@/components/seo-page";
import { absolute, visual } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "درخواست همکاری با Auto Makhsus",
  description: "درخواست همکاری با Auto Makhsus برای برندها، تامین‌کنندگان، ناوگان، پروژه‌های VIP، سرویس خودرو و اتصال به پلتفرم دیجیتال.",
  path: "/fa/cooperation",
});

export default function CooperationPage() {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "همکاری", url: absolute("/fa/cooperation") }])} />
      <PageHero eyebrow="Partnership" title="همکاری با اکوسیستم Auto Makhsus" description="اگر برند، تامین‌کننده، ناوگان، مجموعه خدماتی یا شریک تکنولوژی هستید، درخواست همکاری را ثبت کنید." image={visual.hero} />
      <LeadSection sourcePage="/fa/cooperation" interest="درخواست همکاری" />
    </main>
  );
}
