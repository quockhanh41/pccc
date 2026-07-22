import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/data/site";

export const metadata = {
  title: "Liên hệ — PCCC PRO",
  description: "Liên hệ PCCC PRO: gọi điện, Zalo, Facebook hoặc để lại thông tin để nhận báo giá thiết bị phòng cháy chữa cháy.",
};

function FacebookIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

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
            <li className="flex items-center gap-3"><FacebookIcon size={18} className="text-accent" /><a href={site.facebook} className="hover:text-accent">Facebook</a></li>
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
