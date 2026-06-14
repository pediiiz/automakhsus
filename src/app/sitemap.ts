import type { MetadataRoute } from "next";
import { contentRoutes } from "@/lib/content-data";
import { listCmsContent, cmsContentPath } from "@/lib/cms";
import { absolute, faRoutes } from "@/lib/site-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cmsRoutes = (await listCmsContent()).map((item) => item.canonicalPath || cmsContentPath(item.contentType, item.slug));
  const routes = Array.from(new Set([...faRoutes, ...contentRoutes, ...cmsRoutes]));
  return routes.map((route) => ({
    url: absolute(route),
    lastModified: new Date(),
    changeFrequency: route === "/fa" ? "daily" : "weekly",
    priority: route === "/fa" ? 1 : 0.78,
  }));
}
