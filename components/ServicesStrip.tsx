import { ClipboardCheck, Hammer, Wrench, RefreshCw, type LucideIcon } from "lucide-react";

const services: { icon: LucideIcon; label: string }[] = [
  { icon: ClipboardCheck, label: "Tư vấn giải pháp PCCC" },
  { icon: Hammer, label: "Thi công hệ thống báo cháy, chữa cháy" },
  { icon: Wrench, label: "Bảo trì – bảo dưỡng định kỳ" },
  { icon: RefreshCw, label: "Nạp sạc & kiểm định bình chữa cháy" },
];

export default function ServicesStrip() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.label} className="flex items-center gap-3 rounded-lg border border-line p-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent/10 text-accent"><Icon size={18} /></span>
            <span className="text-sm font-medium text-ink">{s.label}</span>
          </div>
        );
      })}
    </div>
  );
}
