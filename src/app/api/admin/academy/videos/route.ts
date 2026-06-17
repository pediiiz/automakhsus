import { NextRequest, NextResponse } from "next/server";
import { isValidCmsToken } from "@/lib/cms-auth";
import { createAcademyVideoJob } from "@/lib/video-processing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function tokenFromRequest(request: NextRequest) {
  return request.headers.get("x-cms-token") || request.nextUrl.searchParams.get("token");
}

export async function POST(request: NextRequest) {
  if (!isValidCmsToken(tokenFromRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("video");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing video file." }, { status: 400 });
  }

  const job = await createAcademyVideoJob(file);
  return NextResponse.json({
    ok: true,
    job: {
      id: job.id,
      status: job.status,
      originalFileName: job.originalFileName,
      publicSourcePath: job.publicSourcePath,
      publicHlsPath: job.publicHlsPath,
      logs: job.logs,
    },
  });
}
