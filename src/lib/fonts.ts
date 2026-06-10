import localFont from "next/font/local";

export const persianFont = localFont({
  src: [
    { path: "../assets/fonts/persian/IRANSansX-Regular.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/persian/IRANSansX-Medium.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/persian/IRANSansX-DemiBold.woff2", weight: "600", style: "normal" },
    { path: "../assets/fonts/persian/IRANSansX-Bold.woff2", weight: "700", style: "normal" },
    { path: "../assets/fonts/persian/IRANSansX-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-persian",
  display: "swap",
  fallback: ["Vazirmatn", "Arial", "sans-serif"],
});
