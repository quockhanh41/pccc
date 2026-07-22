import { Phone, MessageCircle } from "lucide-react";
import { site } from "@/data/site";

export default function CtaSection() {
  return (
    <section className="my-16 rounded-2xl bg-navy px-6 py-12 text-center text-white">
      <h2 className="text-2xl font-bold text-white sm:text-3xl">Cần tư vấn thiết bị PCCC phù hợp?</h2>
      <p className="mx-auto mt-2 max-w-xl text-white/80">
        Liên hệ ngay để nhận báo giá và tư vấn giải pháp an toàn cháy nổ cho công trình của bạn.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a href={`tel:${site.phoneDigits}`} className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-semibold transition hover:bg-accent-dark">
          <Phone size={18} /> {site.phone}
        </a>
        <a href={site.zalo} className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3 font-semibold transition hover:bg-white/10">
          <MessageCircle size={18} /> Chat Zalo
        </a>
      </div>
    </section>
  );
}
