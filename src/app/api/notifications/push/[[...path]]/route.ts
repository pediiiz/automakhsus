import { proxySharedCrmRequest } from "@/lib/crm-domain-proxy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  return proxySharedCrmRequest(request);
}

export function POST(request: Request) {
  return proxySharedCrmRequest(request);
}

export function DELETE(request: Request) {
  return proxySharedCrmRequest(request);
}
