import { ShieldCheck, Truck, Wrench, MessagesSquare, type LucideIcon } from "lucide-react";

const points: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: ShieldCheck, title: "Đạt chuẩn & kiểm định", desc: "Sản phẩm có chứng nhận hợp quy, kiểm định PCCC đầy đủ." },
  { icon: Truck, title: "Giao hàng nhanh", desc: "Kho hàng sẵn, giao toàn quốc, hỗ trợ lắp đặt tận nơi." },
  { icon: Wrench, title: "Bảo hành & bảo trì", desc: "Chính sách bảo hành rõ ràng, bảo trì định kỳ tận tâm." },
  { icon: MessagesSquare, title: "Tư vấn tận tình", desc: "Kỹ thuật tư vấn giải pháp phù hợp từng công trình." },
];

export default function WhyChooseUs() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {points.map((p) => {
        const Icon = p.icon;
        return (
          <div key={p.title} className="rounded-lg bg-surface-alt p-5">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-accent/10 text-accent"><Icon size={20} /></span>
            <div className="mt-3 font-semibold text-navy">{p.title}</div>
            <p className="mt-1 text-sm text-muted">{p.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
