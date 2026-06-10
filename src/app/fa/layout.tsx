import { SiteShell } from "@/components/site-shell";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { SeoJsonLd } from "@/components/seo-page";

export default function FaLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell>
      <SeoJsonLd data={organizationSchema} />
      <SeoJsonLd data={websiteSchema} />
      {children}
    </SiteShell>
  );
}
