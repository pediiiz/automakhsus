import { proxySharedCrmRequest } from "@/lib/crm-domain-proxy";

export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return proxySharedCrmRequest(request);
}
