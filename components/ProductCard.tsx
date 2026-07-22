import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-white transition duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      {product.featured && (
        <span className="absolute left-3 top-3 z-10 rounded bg-accent px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
          Tiêu biểu
        </span>
      )}
      <ProductImage name={product.name} className="aspect-[4/3] w-full" />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-navy transition group-hover:text-accent">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{product.shortDesc}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
          Xem chi tiết <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
