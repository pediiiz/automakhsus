import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { getPool } from "@/lib/db";

const leadSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(8).max(32),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  interest: z.string().trim().min(2).max(160),
  description: z.string().trim().max(1600).optional().or(z.literal("")),
  source: z.literal("automakhsus"),
  sourcePage: z.string().trim().min(1).max(180),
  businessUnit: z.string().trim().max(80).optional().or(z.literal("")),
});

function inferBusinessUnit(interest: string, submitted?: string) {
  if (submitted === "AutoMakhsus Technical" || submitted === "AutoMakhsus Marketplace") {
    return submitted;
  }
  if (interest.includes("قطعه") || interest.includes("فروشگاه") || interest.includes("خرید")) {
    return "AutoMakhsus Marketplace";
  }
  return "AutoMakhsus Technical";
}

export async function POST(request: NextRequest) {
  const parsed = leadSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ message: "اطلاعات فرم کامل نیست." }, { status: 400 });
  }

  const data = parsed.data;
  const businessUnit = inferBusinessUnit(data.interest, data.businessUnit || undefined);
  const userAgent = request.headers.get("user-agent");
  const referrer = request.headers.get("referer");
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const inquiryId = `am_${randomUUID().replaceAll("-", "")}`;
    const inquiry = await client.query<{ id: string }>(
      `INSERT INTO "Inquiry" ("id", "type", "status", "fullName", "phone", "requestType", "message", "sourcePath", "sourcePage", "priority", "createdAt", "updatedAt")
       VALUES ($1, 'GENERAL', 'NEW', $2, $3, $4, $5, $6, $7, 'HIGH', now(), now())
       RETURNING "id"`,
      [
        inquiryId,
        data.fullName,
        data.phone,
        data.interest,
        [data.company ? `شرکت/سازمان: ${data.company}` : "", `واحد کسب‌وکار: ${businessUnit}`, data.description || ""].filter(Boolean).join("\n"),
        "automakhsus",
        data.sourcePage,
      ],
    );
    const conversionId = `amc_${randomUUID().replaceAll("-", "")}`;
    await client.query(
      `INSERT INTO "ConversionEvent" ("id", "type", "source", "sourcePath", "sourcePage", "locale", "inquiryId", "phone", "serviceType", "metadata", "userAgent", "referrer", "createdAt")
       VALUES ($1, 'LEAD_SUBMISSION', 'automakhsus', 'automakhsus', $2, 'FA', $3, $4, $5, $6::jsonb, $7, $8, now())`,
      [
        conversionId,
        data.sourcePage,
        inquiry.rows[0].id,
        data.phone,
        data.interest,
        JSON.stringify({ channel: "automakhsus_parent_site", company: data.company || null, businessUnit }),
        userAgent,
        referrer,
      ],
    );
    await client.query("COMMIT");
    return NextResponse.json({ ok: true, message: "درخواست شما ثبت شد. تیم Auto Makhsus پیگیری می‌کند." });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Auto Makhsus lead persistence failed", { sourcePage: data.sourcePage, error });
    return NextResponse.json({ message: "ثبت درخواست موقتاً انجام نشد." }, { status: 500 });
  } finally {
    client.release();
  }
}
