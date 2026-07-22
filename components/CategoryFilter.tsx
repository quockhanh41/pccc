"use client";
import { useState } from "react";
import { categories, type Product, type CategorySlug } from "@/data/products";
import ProductGrid from "./ProductGrid";

type Filter = CategorySlug | "all";

export default function CategoryFilter({ products, initial = "all" }: { products: Product[]; initial?: Filter }) {
  const [active, setActive] = useState<Filter>(initial);
  const shown = active === "all" ? products : products.filter((p) => p.category === active);

  const chip = (value: Filter, label: string) => (
    <button
      key={value}
      onClick={() => setActive(value)}
      className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition ${
        active === value ? "border-accent bg-accent text-white" : "border-line bg-white text-ink hover:border-accent"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {chip("all", "Tất cả")}
        {categories.map((c) => chip(c.slug, c.name))}
      </div>
      <div className="mt-8"><ProductGrid products={shown} /></div>
    </div>
  );
}
