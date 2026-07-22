import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import CtaSection from "@/components/CtaSection";
import { getFeaturedProducts } from "@/data/products";

export default function Home() {
  const featured = getFeaturedProducts();
  return (
    <>
      <Hero />
      <section className="py-14">
        <SectionHeading eyebrow="Danh mục" title="Sản phẩm phòng cháy chữa cháy" subtitle="Đầy đủ thiết bị cho mọi nhu cầu an toàn cháy nổ." />
        <div className="mt-8"><CategoryGrid /></div>
      </section>
      <section className="py-14">
        <SectionHeading eyebrow="Nổi bật" title="Sản phẩm tiêu biểu" />
        <div className="mt-8"><ProductGrid products={featured} /></div>
      </section>
      <CtaSection />
    </>
  );
}
