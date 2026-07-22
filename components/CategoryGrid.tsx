import Link from "next/link";
import { categories } from "@/data/products";
import { categoryIcons } from "./icons";

export default function CategoryGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((c) => {
        const Icon = categoryIcons[c.slug];
        return (
          <Link
            key={c.slug}
            href={`/san-pham?danh-muc=${c.slug}`}
            className="group rounded-lg border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:border-accent hover:shadow-sm"
          >
            <span className="grid h-11 w-11 place-items-center rounded-md bg-navy text-white transition group-hover:bg-accent">
              <Icon size={22} />
            </span>
            <div className="mt-3 font-semibold text-navy">{c.name}</div>
            <p className="mt-1 text-sm text-muted">{c.blurb}</p>
          </Link>
        );
      })}
    </div>
  );
}
