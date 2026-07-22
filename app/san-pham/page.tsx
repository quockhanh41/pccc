import SectionHeading from "@/components/SectionHeading";
import CategoryFilter from "@/components/CategoryFilter";
import { products, categories, type CategorySlug } from "@/data/products";
import { site } from "@/data/site";

export const metadata = {
  title: `Sản phẩm — ${site.name}`,
  description: "Danh mục thiết bị phòng cháy chữa cháy: bình chữa cháy, thiết bị báo cháy, vòi & lăng, bảo hộ, đèn thoát hiểm.",
};

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ "danh-muc"?: string }> }) {
  const sp = await searchParams;
  const known = new Set(categories.map((c) => c.slug));
  const initial = (sp["danh-muc"] && known.has(sp["danh-muc"] as CategorySlug)
    ? (sp["danh-muc"] as CategorySlug)
    : "all") as CategorySlug | "all";

  return (
    <div className="py-12">
      <SectionHeading eyebrow="Danh mục" title="Sản phẩm" subtitle="Lọc theo danh mục để tìm nhanh thiết bị bạn cần." />
      <div className="mt-8"><CategoryFilter products={products} initial={initial} /></div>
    </div>
  );
}
