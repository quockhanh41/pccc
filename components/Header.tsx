"use client";
import Link from "next/link";
import { useState } from "react";
import { Flame, Phone, Menu, X } from "lucide-react";
import { site } from "@/data/site";

const nav = [
  { href: "/", label: "Trang chủ" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/lien-he", label: "Liên hệ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-accent"><Flame size={18} /></span>
          <span className="text-lg">{site.name}</span>
        </Link>
        <nav className="ml-auto hidden gap-6 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm font-medium text-white/85 transition hover:text-white">
              {n.label}
            </Link>
          ))}
        </nav>
        <a href={`tel:${site.phoneDigits}`}
           className="ml-4 hidden items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold transition hover:bg-accent-dark md:inline-flex">
          <Phone size={16} /> {site.phone}
        </a>
        <button aria-label={open ? "Đóng menu" : "Mở menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}
                className="ml-auto cursor-pointer md:hidden">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-white/10 px-4 pb-4 md:hidden">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-2 text-white/90">
              {n.label}
            </Link>
          ))}
          <a href={`tel:${site.phoneDigits}`} className="mt-2 flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 font-semibold">
            <Phone size={16} /> {site.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
