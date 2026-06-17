import { NextRequest, NextResponse } from "next/server";
import { isValidCmsToken } from "@/lib/cms-auth";
import { processAcademyVideoJob, readAcademyVideoJob } from "@/lib/video-processing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function tokenFromRequest(request: NextRequest) {
  return request.headers.get("x-cms-token") || request.nextUrl.searchParams.get("token");
}

type RouteContext = { params: Promise<unknown> };

async function routeId(params: Promise<unknown>) {
  const value = await params;
  if (!value || typeof value !== "object" || !("id" in value)) return "";
  return String((value as { id?: unknown }).id || "");
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  if (!isValidCmsToken(tokenFromRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = await routeId(params);
  const job = await readAcademyVideoJob(id);
  if (!job) return NextResponse.json({ error: "Video job was not found." }, { status: 404 });
  return NextResponse.json({ ok: true, job });
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  if (!isValidCmsToken(tokenFromRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = await routeId(params);
  const job = await processAcademyVideoJob(id);
  return NextResponse.json({ ok: job.status === "ready", job });
}
