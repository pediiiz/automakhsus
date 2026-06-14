import type { Metadata } from "next";
import { ContentHero, VehicleBrandGrid } from "@/components/content/content-sections";
import { SeoJsonLd } from "@/components/seo-page";
import { contentVisual, vehicleBrands } from "@/lib/content-data";
import { absolute } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "دانشنامه جهانی خودروهای خارجی Auto Makhsus | برند، مدل و نسل",
  description: "دانشنامه برندها، مدل‌ها، نسل‌ها و سال‌های خودروهای خارجی شامل خدمات، مشکلات رایج، قطعات، مقالات، ویدئوها، نمونه‌کارها و رزرو سرویس.",
  path: "/fa/cars",
});

export default function CarsPage() {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "دانشنامه خودرو", url: absolute("/fa/cars") }])} />
      <ContentHero eyebrow="Vehicle Knowledge Base" title="دانشنامه جهانی خودروهای خارجی" description="هاب برند، مدل، نسل و سال برای خودروهای معتبر جهانی؛ از BMW، Mercedes-Benz، Porsche، Audi و Toyota تا Lexus، Hyundai، Kia، Tesla، Ferrari و برندهای وارداتی با لینک به خدمات، قطعات، محتوا و رزرو سرویس." image={contentVisual.cars} />
      <VehicleBrandGrid brands={vehicleBrands} />
    </main>
  );
}
