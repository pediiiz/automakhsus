import type { MetadataRoute } from "next";
import { contentRoutes } from "@/lib/content-data";
import { absolute, faRoutes } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Array.from(new Set([...faRoutes, ...contentRoutes]));
  return routes.map((route) => ({
    url: absolute(route),
    lastModified: new Date(),
    changeFrequency: route === "/fa" ? "daily" : "weekly",
    priority: route === "/fa" ? 1 : 0.78,
  }));
}
