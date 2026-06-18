import type { Metadata } from "next";
import { VehicleGallery } from "@/components/content/vehicle-gallery";
import { SeoJsonLd } from "@/components/seo-page";
import { vehicleBrands } from "@/lib/content-data";
import { absolute } from "@/lib/site-data";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "دانشنامه جهانی خودرو؛ برند، مدل و نسل",
  description: "دانشنامه برندها، مدل‌ها، نسل‌ها و سال‌های خودرو شامل خدمات، مشکلات رایج، قطعات، مقالات، ویدئوها، نمونه‌کارها و رزرو سرویس.",
  path: "/fa/cars",
});

export default function CarsPage() {
  return (
    <main>
      <SeoJsonLd data={breadcrumbSchema([{ name: "Auto Makhsus", url: absolute("/fa") }, { name: "دانشنامه خودرو", url: absolute("/fa/cars") }])} />
      <VehicleGallery brands={vehicleBrands} />
    </main>
  );
}
