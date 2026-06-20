import { NextRequest } from "next/server";

import { proxyPublicMediaRequest } from "@/lib/media-center-public-proxy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyPublicMediaRequest(request, `/assets/${encodeURIComponent(id)}/interactions`);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.text();
  return proxyPublicMediaRequest(request, `/assets/${encodeURIComponent(id)}/interactions`, {
    method: "POST",
    body,
    contentType: request.headers.get("content-type") || "application/json",
  });
}
