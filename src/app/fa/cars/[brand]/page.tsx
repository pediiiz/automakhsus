import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VehicleBrandDetail } from "@/components/content/content-sections";
import { findVehicleBrand, vehicleBrands, vehicleSchema } from "@/lib/content-data";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return vehicleBrands.map((brand) => ({ brand: brand.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = findVehicleBrand(slug);
  if (!brand) return {};
  return pageMetadata({ title: `خدمات ${brand.fa} | Auto Makhsus`, description: brand.description, path: `/fa/cars/${brand.slug}` });
}

export default async function VehicleBrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: slug } = await params;
  const brand = findVehicleBrand(slug);
  if (!brand) notFound();
  return <VehicleBrandDetail brand={brand} schema={vehicleSchema(brand)} />;
}
