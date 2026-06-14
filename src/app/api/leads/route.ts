import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { getPool } from "@/lib/db";
import { businessUnitLabel, inferLeadBusinessUnit } from "@/lib/lead-routing";

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

export async function POST(request: NextRequest) {
  const parsed = leadSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ message: "اطلاعات فرم کامل نیست." }, { status: 400 });
  }

  const data = parsed.data;
  const businessUnit = inferLeadBusinessUnit(data.interest, data.businessUnit || undefined);
  const businessUnitDisplay = businessUnitLabel(businessUnit);
  const userAgent = request.headers.get("user-agent");
  const referrer = request.headers.get("referer");
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const inquiryId = `am_${randomUUID().replaceAll("-", "")}`;
    const inquiry = await client.query<{ id: string }>(
      `INSERT INTO "Inquiry" ("id", "businessUnit", "type", "status", "fullName", "phone", "requestType", "message", "sourcePath", "sourcePage", "priority", "createdAt", "updatedAt")
       VALUES ($1, $2::"BusinessUnit", 'GENERAL', 'NEW', $3, $4, $5, $6, $7, $8, 'HIGH', now(), now())
       RETURNING "id"`,
      [
        inquiryId,
        businessUnit,
        data.fullName,
        data.phone,
        data.interest,
        [data.company ? `شرکت/سازمان: ${data.company}` : "", `واحد کسب‌وکار: ${businessUnitDisplay}`, data.description || ""].filter(Boolean).join("\n"),
        "automakhsus",
        data.sourcePage,
      ],
    );
    const conversionId = `amc_${randomUUID().replaceAll("-", "")}`;
    await client.query(
      `INSERT INTO "ConversionEvent" ("id", "businessUnit", "type", "source", "sourcePath", "sourcePage", "locale", "inquiryId", "phone", "serviceType", "metadata", "userAgent", "referrer", "createdAt")
       VALUES ($1, $2::"BusinessUnit", 'LEAD_SUBMISSION', 'automakhsus', 'automakhsus', $3, 'FA', $4, $5, $6, $7::jsonb, $8, $9, now())`,
      [
        conversionId,
        businessUnit,
        data.sourcePage,
        inquiry.rows[0].id,
        data.phone,
        data.interest,
        JSON.stringify({ channel: "automakhsus_parent_site", company: data.company || null, businessUnit, businessUnitLabel: businessUnitDisplay }),
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
