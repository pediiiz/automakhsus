import { proxySharedCrmRequest } from "@/lib/crm-domain-proxy";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  return proxySharedCrmRequest(request);
}

export function POST(request: Request) {
  return proxySharedCrmRequest(request);
}

export function PUT(request: Request) {
  return proxySharedCrmRequest(request);
}

export function PATCH(request: Request) {
  return proxySharedCrmRequest(request);
}

export function DELETE(request: Request) {
  return proxySharedCrmRequest(request);
}
