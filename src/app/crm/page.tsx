import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ورود CRM Auto Makhsus",
  robots: {
    index: false,
    follow: false,
  },
};

const sharedCrmEntryUrl =
  process.env.NEXT_PUBLIC_SHARED_CRM_ENTRY_URL ||
  "https://tehransandali.ir/crm?bu=AUTOMAKHSUS_TECHNICAL&entry=automakhsus";

export default function AutoMakhsusCrmEntryPage() {
  redirect(sharedCrmEntryUrl);
}
