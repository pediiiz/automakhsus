import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VehicleBrandDetail } from "@/components/content/content-sections";
import { findVehicleBrand, findVehicleGeneration, findVehicleModel, vehicleBrands, vehicleSchema } from "@/lib/content-data";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return vehicleBrands.flatMap((brand) =>
    brand.models.flatMap((model) =>
      (model.generations || []).map((generation) => ({
        brand: brand.slug,
        model: model.slug,
        generation: generation.slug,
      })),
    ),
  );
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string; model: string; generation: string }> }): Promise<Metadata> {
  const { brand: brandSlug, model: modelSlug, generation: generationSlug } = await params;
  const brand = findVehicleBrand(brandSlug);
  const model = findVehicleModel(brandSlug, modelSlug);
  const generation = findVehicleGeneration(brandSlug, modelSlug, generationSlug);
  if (!brand || !model || !generation) return {};
  return pageMetadata({
    title: `خدمات ${model.fa} نسل ${generation.name} | Auto Makhsus`,
    description: generation.note,
    path: `/fa/cars/${brand.slug}/${model.slug}/${generation.slug}`,
  });
}

export default async function VehicleGenerationPage({ params }: { params: Promise<{ brand: string; model: string; generation: string }> }) {
  const { brand: brandSlug, model: modelSlug, generation: generationSlug } = await params;
  const brand = findVehicleBrand(brandSlug);
  const model = findVehicleModel(brandSlug, modelSlug);
  const generation = findVehicleGeneration(brandSlug, modelSlug, generationSlug);
  if (!brand || !model || !generation) notFound();
  return <VehicleBrandDetail brand={brand} model={model} generation={generation} schema={vehicleSchema(brand, model, generation)} />;
}
