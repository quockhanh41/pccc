import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { categories } from "@/data/products";

export default function Footer() {
  return (
    <footer className="mt-20 bg-navy text-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.logo} alt={site.name} className="h-8 w-auto rounded object-contain" />
            <span className="text-lg font-bold text-white">{site.name}</span>
          </div>
          <p className="mt-2 text-sm">{site.tagline}</p>
        </div>
        <div>
          <div className="font-semibold text-white">Danh mục</div>
          <ul className="mt-3 space-y-1.5 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/san-pham?danh-muc=${c.slug}`} className="transition hover:text-white">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white">Liên hệ</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone size={15} /> <a href={`tel:${site.phoneDigits}`} className="hover:text-white">{site.phone}</a></li>
            <li className="flex items-center gap-2"><Mail size={15} /> <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            <li className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0" /> {site.address}</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white">Kết nối</div>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li><a href={site.zalo} className="hover:text-white">Zalo</a></li>
            <li><a href={site.facebook} className="hover:text-white">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center font-mono text-xs">
        © {new Date().getFullYear()} {site.name} · Nội dung demo — thay bằng thông tin thật.
      </div>
    </footer>
  );
}
