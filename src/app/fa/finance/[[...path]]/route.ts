import { proxySharedCrmRequest } from "@/lib/crm-domain-proxy";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  return proxySharedCrmRequest(request);
}

export function HEAD(request: Request) {
  return proxySharedCrmRequest(request);
}

export function POST(request: Request) {
  return proxySharedCrmRequest(request);
}
