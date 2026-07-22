import SectionHeading from "@/components/SectionHeading";
import CtaSection from "@/components/CtaSection";
import { site } from "@/data/site";

export const metadata = {
  title: `Giới thiệu — ${site.name}`,
  description: `Về ${site.name}: năng lực cung cấp, thi công và bảo trì thiết bị phòng cháy chữa cháy đạt chuẩn.`,
};

const stats = [
  { value: "10+", label: "Năm kinh nghiệm" },
  { value: "500+", label: "Công trình đã triển khai" },
  { value: "100%", label: "Sản phẩm kiểm định" },
];

export default function AboutPage() {
  return (
    <div className="py-12">
      <SectionHeading eyebrow="Về chúng tôi" title={`Về ${site.name}`} subtitle={site.tagline} />

      <div className="mx-auto mt-8 max-w-3xl space-y-4 text-body">
        <p>{site.description}</p>
        <p>
          Chúng tôi cung cấp giải pháp phòng cháy chữa cháy trọn gói: từ tư vấn thiết kế, cung cấp
          thiết bị đạt chuẩn, thi công lắp đặt đến bảo trì và nạp sạc định kỳ — cam kết an toàn và
          tuân thủ quy định pháp luật về PCCC.
        </p>
        <p className="rounded-lg bg-surface-alt p-4 text-sm text-muted">
          Đây là nội dung demo. Thay bằng câu chuyện, giấy phép và hình ảnh thật của doanh nghiệp
          trong <code className="font-mono">data/site.ts</code> và trang này.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-line p-6 text-center">
            <div className="font-mono text-3xl font-bold tabular-nums text-accent">{s.value}</div>
            <div className="mt-1 text-sm text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      <CtaSection />
    </div>
  );
}
