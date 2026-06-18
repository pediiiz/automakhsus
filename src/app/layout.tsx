import type { Metadata } from "next";
import { persianFont } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://automakhsus.com"),
  title: {
    default: "Auto Makhsus | مرکز تخصصی خودرو",
    template: "%s | Auto Makhsus",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={`${persianFont.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
