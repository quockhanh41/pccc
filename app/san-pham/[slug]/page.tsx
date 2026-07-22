import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, Phone } from "lucide-react";
import { products, getProductBySlug, getProductsByCategory, getCategory } from "@/data/products";
import ProductImage from "@/components/ProductImage";
import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/data/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: `Không tìm thấy sản phẩm — ${site.name}` };
  return {
    title: `${product.name} — ${site.name}`,
    description: product.shortDesc,
    openGraph: { title: product.name, description: product.shortDesc },
  };
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getProductsByCategory(product.category).filter((p) => p.slug !== product.slug);

  return (
    <div className="py-10">
      <nav className="flex flex-wrap items-center gap-1 text-sm text-muted">
        <Link href="/san-pham" className="hover:text-accent">Sản phẩm</Link>
        {category && (<><ChevronRight size={14} /><Link href={`/san-pham?danh-muc=${category.slug}`} className="hover:text-accent">{category.name}</Link></>)}
        <ChevronRight size={14} /><span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <ProductImage name={product.name} image={product.image} className="aspect-[4/3] w-full rounded-xl" />
        <div>
          <h1 className="text-2xl font-bold text-navy sm:text-3xl">{product.name}</h1>
          <p className="mt-3 text-body">{product.shortDesc}</p>

          <p className="mt-6 font-mono text-xs font-bold uppercase tracking-widest text-accent">Thông số kỹ thuật</p>
          <table className="mt-2 w-full text-sm">
            <tbody>
              {product.specs.map((s) => (
                <tr key={s.label} className="border-b border-line">
                  <td className="py-2.5 pr-4 font-mono text-xs uppercase tracking-wide text-muted">{s.label}</td>
                  <td className="py-2.5 font-medium text-ink">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:${site.phoneDigits}`} className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent-dark">
              <Phone size={18} /> Gọi ngay
            </a>
            <Link href="/lien-he" className="rounded-md border border-navy px-6 py-3 font-semibold text-navy transition hover:bg-navy hover:text-white">
              Yêu cầu báo giá
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <SectionHeading eyebrow="Cùng danh mục" title="Sản phẩm liên quan" />
          <div className="mt-8"><ProductGrid products={related} /></div>
        </section>
      )}
    </div>
  );
}
