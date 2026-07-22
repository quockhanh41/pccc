import { Phone, MessageCircle } from "lucide-react";
import { site } from "@/data/site";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <a href={`tel:${site.phoneDigits}`} aria-label="Gọi ngay"
         className="grid h-12 w-12 place-items-center rounded-full bg-accent text-white shadow-lg transition hover:bg-accent-dark">
        <Phone size={20} />
      </a>
      <a href={site.zalo} aria-label="Chat Zalo"
         className="grid h-12 w-12 place-items-center rounded-full bg-navy text-white shadow-lg transition hover:bg-navy-deep">
        <MessageCircle size={20} />
      </a>
    </div>
  );
}
