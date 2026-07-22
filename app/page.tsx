import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import CtaSection from "@/components/CtaSection";
import { getFeaturedProducts } from "@/data/products";
import { site } from "@/data/site";

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
      <section className="py-14">
        <div className="grid items-center gap-8 rounded-2xl border border-line bg-surface-alt p-6 md:grid-cols-2 md:p-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line">
            <Image
              src="/images/store/cua-hang-1.jpg"
              alt="Mặt tiền cửa hàng PCCC PRO"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-accent">Cửa hàng</p>
            <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">Ghé thăm cửa hàng của chúng tôi</h2>
            <p className="mt-3 text-body">
              {site.address}. Showroom trưng bày đầy đủ thiết bị PCCC, có đội ngũ kỹ thuật tư vấn trực tiếp.
            </p>
            <Link href="/gioi-thieu" className="mt-5 inline-flex items-center gap-1 font-semibold text-accent transition-all hover:gap-2">
              Tìm hiểu thêm về chúng tôi <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
