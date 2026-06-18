import type { Metadata } from "next";
import { LeadSection, PageHero, SeoJsonLd } from "@/components/seo-page";
import { absolute, phone, visual, whatsapp } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "تماس با Auto Makhsus",
  description: "تماس با Auto Makhsus برای خدمات فنی خودرو، خرید قطعه، خرید + نصب، همکاری سازمانی، CRM و پلتفرم دیجیتال خودرو.",
  path: "/fa/contact",
});

export default function ContactPage() {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "تماس", url: absolute("/fa/contact") }])} />
      <PageHero eyebrow="Contact" title="تماس با Auto Makhsus" description="برای خدمات فنی، رزرو سرویس، خرید قطعه، خرید + نصب، همکاری سازمانی یا ارتباط با تیم Auto Makhsus پیام بگذارید." image={visual.hero} />
      <section className="section bg-white">
        <div className="container-shell grid gap-4 md:grid-cols-2">
          <a className="card p-7 text-2xl font-black" href={`tel:${phone}`}>تماس: {phone}</a>
          <a className="card p-7 text-2xl font-black" href={`https://wa.me/${whatsapp}`}>واتساپ Auto Makhsus</a>
        </div>
      </section>
      <LeadSection sourcePage="/fa/contact" interest="درخواست همکاری" />
    </main>
  );
}
