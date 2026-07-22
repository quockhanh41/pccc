import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { site } from "@/data/site";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "PCCC PRO — Thiết bị phòng cháy chữa cháy", template: "%s" },
  description:
    "Cung cấp thiết bị phòng cháy chữa cháy đạt chuẩn: bình chữa cháy, thiết bị báo cháy, vòi & lăng chữa cháy, bảo hộ, đèn thoát hiểm.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: site.name,
    title: "PCCC PRO — Thiết bị phòng cháy chữa cháy",
    description: "Thiết bị PCCC đạt chuẩn, kiểm định đầy đủ. Tư vấn – cung cấp – thi công – bảo trì.",
    url: site.url,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: site.name }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: site.description,
    telephone: site.phoneDigits,
    email: site.email,
    address: { "@type": "PostalAddress", streetAddress: site.address },
  }).replace(/</g, "\\u003c");

  return (
    <html lang="vi" className={`${plexSans.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        <Header />
        <main className="mx-auto min-h-[60vh] max-w-6xl px-4">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
