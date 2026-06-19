import { NextRequest, NextResponse } from "next/server";

import { mediaApiFetchBase } from "@/lib/media-center-public";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function proxy(request: NextRequest, id: string, init?: RequestInit) {
  const visitor = request.headers.get("x-am-media-visitor") || "";
  const target = `${mediaApiFetchBase()}/assets/${encodeURIComponent(id)}/interactions`;
  const response = await fetch(target, {
    ...init,
    headers: {
      "content-type": "application/json",
      "x-am-media-visitor": visitor,
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
  const body = await response.text();
  return new NextResponse(body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") || "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxy(request, id);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.text();
  return proxy(request, id, { method: "POST", body });
}
