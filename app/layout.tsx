import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

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
  title: "PCCC PRO — Thiết bị phòng cháy chữa cháy",
  description: "Placeholder — cập nhật ở Task 10.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${plexSans.variable} ${jetbrains.variable}`}>
      <body>
        <Header />
        <main className="mx-auto min-h-[60vh] max-w-6xl px-4">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
