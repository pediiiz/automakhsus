import type { Metadata } from "next";
import { ContentHero, VehicleBrandGrid } from "@/components/content/content-sections";
import { SeoJsonLd } from "@/components/seo-page";
import { contentVisual, vehicleBrands } from "@/lib/content-data";
import { absolute } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "دانشنامه خودروهای خارجی Auto Makhsus | برند و مدل",
  description: "دانشنامه برندها و مدل‌های خودروهای خارجی شامل خدمات مرتبط، مشکلات رایج، مقالات، ویدئوها، نمونه‌کارها و رزرو سرویس.",
  path: "/fa/cars",
});

export default function CarsPage() {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "دانشنامه خودرو", url: absolute("/fa/cars") }])} />
      <ContentHero eyebrow="Vehicle Knowledge Base" title="دانشنامه خودروهای خارجی" description="هاب برند و مدل برای BMW، Mercedes-Benz، Porsche، Audi، Toyota، Lexus، Hyundai، Kia و سایر خودروهای وارداتی با لینک به خدمات، محتوا و رزرو سرویس." image={contentVisual.cars} />
      <VehicleBrandGrid brands={vehicleBrands} />
    </main>
  );
}
