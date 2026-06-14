import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VehicleBrandDetail } from "@/components/content/content-sections";
import { findVehicleBrand, findVehicleModel, vehicleBrands, vehicleSchema } from "@/lib/content-data";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return vehicleBrands.flatMap((brand) => brand.models.map((model) => ({ brand: brand.slug, model: model.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string; model: string }> }): Promise<Metadata> {
  const { brand: brandSlug, model: modelSlug } = await params;
  const brand = findVehicleBrand(brandSlug);
  const model = findVehicleModel(brandSlug, modelSlug);
  if (!brand || !model) return {};
  return pageMetadata({ title: `خدمات ${model.fa}`, description: model.intro, path: `/fa/cars/${brand.slug}/${model.slug}` });
}

export default async function VehicleModelPage({ params }: { params: Promise<{ brand: string; model: string }> }) {
  const { brand: brandSlug, model: modelSlug } = await params;
  const brand = findVehicleBrand(brandSlug);
  const model = findVehicleModel(brandSlug, modelSlug);
  if (!brand || !model) notFound();
  return <VehicleBrandDetail brand={brand} model={model} schema={vehicleSchema(brand, model)} />;
}
