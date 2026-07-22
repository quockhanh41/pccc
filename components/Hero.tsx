import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/data/site";
import DataPlate from "./DataPlate";

const plateRows = [
  { label: "Tiêu chuẩn", value: "TCVN 7026" },
  { label: "Kiểm định", value: "Đầy đủ" },
  { label: "Giao hàng", value: "Toàn quốc" },
  { label: "Kinh nghiệm", value: "10+ năm" },
];

export default function Hero() {
  return (
    <section className="relative -mx-4 overflow-hidden bg-navy text-white">
      <span aria-hidden className="pointer-events-none absolute -right-16 top-0 hidden h-full w-40 -skew-x-12 bg-accent/15 md:block" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-24 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="animate-fade-up font-mono text-xs font-bold uppercase tracking-widest text-accent">
            Thiết bị PCCC · Đạt chuẩn TCVN
          </p>
          <h1 className="animate-fade-up mt-4 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-5xl" style={{ animationDelay: "0.08s" }}>
            {site.tagline}
          </h1>
          <p className="animate-fade-up mt-4 max-w-xl text-white/80" style={{ animationDelay: "0.16s" }}>
            {site.description}
          </p>
          <div className="animate-fade-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: "0.24s" }}>
            <a href={`tel:${site.phoneDigits}`} className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-semibold transition hover:bg-accent-dark">
              <Phone size={18} /> Gọi ngay
            </a>
            <Link href="/san-pham" className="rounded-md border border-white/40 px-6 py-3 font-semibold transition hover:bg-white/10">
              Xem sản phẩm
            </Link>
          </div>
        </div>
        <DataPlate rows={plateRows} className="animate-fade-up" />
      </div>
    </section>
  );
}
