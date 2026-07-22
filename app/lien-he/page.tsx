import { Phone, MessageCircle, Mail, MapPin, Globe } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/data/site";

export const metadata = {
  title: "Liên hệ — PCCC PRO",
  description: "Liên hệ PCCC PRO: gọi điện, Zalo, Facebook hoặc để lại thông tin để nhận báo giá thiết bị phòng cháy chữa cháy.",
};

export default function ContactPage() {
  return (
    <div className="py-12">
      <SectionHeading eyebrow="Liên hệ" title="Kết nối với chúng tôi" subtitle="Để lại thông tin hoặc gọi trực tiếp — chúng tôi phản hồi nhanh." />

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="font-semibold text-navy">Thông tin liên hệ</h3>
          <ul className="mt-3 space-y-3 text-ink">
            <li className="flex items-center gap-3"><Phone size={18} className="text-accent" /><a href={`tel:${site.phoneDigits}`} className="font-medium hover:text-accent">{site.phone}</a></li>
            <li className="flex items-center gap-3"><MessageCircle size={18} className="text-accent" /><a href={site.zalo} className="hover:text-accent">Chat Zalo</a></li>
            <li className="flex items-center gap-3"><Globe size={18} className="text-accent" /><a href={site.facebook} className="hover:text-accent">Facebook</a></li>
            <li className="flex items-center gap-3"><Mail size={18} className="text-accent" /><a href={`mailto:${site.email}`} className="hover:text-accent">{site.email}</a></li>
            <li className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-accent" />{site.address}</li>
          </ul>
          <div className="mt-6 overflow-hidden rounded-lg border border-line">
            <iframe src={site.mapEmbedUrl} className="h-64 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Bản đồ" />
          </div>
        </div>

        <div className="rounded-xl border border-line p-6">
          <h3 className="font-semibold text-navy">Yêu cầu báo giá</h3>
          <p className="mt-1 text-sm text-muted">Điền thông tin, chúng tôi sẽ liên hệ lại.</p>
          <div className="mt-4"><ContactForm /></div>
        </div>
      </div>
    </div>
  );
}
