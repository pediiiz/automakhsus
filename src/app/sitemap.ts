import type { MetadataRoute } from "next";
import { absolute, faRoutes } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  return faRoutes.map((route) => ({
    url: absolute(route),
    lastModified: new Date(),
    changeFrequency: route === "/fa" ? "daily" : "weekly",
    priority: route === "/fa" ? 1 : 0.78,
  }));
}
