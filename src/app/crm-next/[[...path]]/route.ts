import { proxySharedCrmRequest } from "@/lib/crm-domain-proxy";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const incoming = new URL(request.url);
  const rewrittenPath = incoming.pathname.replace(/^\/crm-next/, "/_next");
  return proxySharedCrmRequest(request, `${rewrittenPath}${incoming.search}`);
}

export function HEAD(request: Request) {
  const incoming = new URL(request.url);
  const rewrittenPath = incoming.pathname.replace(/^\/crm-next/, "/_next");
  return proxySharedCrmRequest(request, `${rewrittenPath}${incoming.search}`);
}
