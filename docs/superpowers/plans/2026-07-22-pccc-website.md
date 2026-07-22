# PCCC Product Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Vietnamese product-showcase (brochure/catalog) website for a fire-protection (PCCC) equipment business, with product catalog, detail pages, and multiple contact channels — no e-commerce, no backend.

**Architecture:** A statically-generated Next.js (App Router) site. All content lives in typed data files (`data/products.ts`, `data/site.ts`) decoupled from presentation. Pages are React Server Components; only the category filter and contact form are Client Components. Styling via Tailwind CSS v4 with design tokens defined in `app/globals.css`. Contact form posts to Formspree (no server code).

**Tech Stack:** Next.js (App Router) + TypeScript, Tailwind CSS v4, `next/font` (Be Vietnam Pro + Inter), Vitest (unit tests for pure logic), Formspree (form), Vercel (deploy).

## Global Constraints

- **Framework:** Next.js App Router + TypeScript. No `src/` dir; `app/` at repo root. Import alias `@/*`.
- **Language:** Vietnamese only. All UI copy in Vietnamese with correct diacritics.
- **Colors (design tokens):** navy `#0F2A47`, accent red `#E6462F`, surface `#FFFFFF`, surface-alt `#F4F6F9`, ink `#1A1D23`, muted `#5A6472`, line `#DDE3EC`.
- **Fonts:** Be Vietnam Pro (headings), Inter (body). Load via `next/font/google` with `subsets: ["latin","vietnamese"]`.
- **No backend / no database.** Content is static in `data/`. Contact form uses Formspree endpoint stored in `data/site.ts`.
- **Contact channels:** `tel:`, Zalo (`https://zalo.me/<phone>`), Facebook — values from `data/site.ts`.
- **Product categories (5, fixed slugs):** `binh-chua-chay`, `thiet-bi-bao-chay`, `voi-lang-chua-chay`, `bao-ho`, `den-bien-thoat-hiem`.
- **Verification per task:** `npx tsc --noEmit` clean, `npm run lint` clean, and (final) `npm run build` succeeds. UI verified by running `npm run dev`. Pure logic verified by Vitest.
- **Commit** after each task completes.

---

## File Structure

```
pccc-website/
├─ app/
│  ├─ layout.tsx                 # <html>, fonts, Header, Footer, base metadata, JSON-LD
│  ├─ globals.css                # Tailwind import + @theme tokens
│  ├─ page.tsx                   # Home
│  ├─ san-pham/page.tsx          # Catalog (server) → renders CategoryFilter (client)
│  ├─ san-pham/[slug]/page.tsx   # Detail, generateStaticParams + generateMetadata
│  ├─ gioi-thieu/page.tsx        # About
│  ├─ lien-he/page.tsx           # Contact (renders ContactForm client)
│  └─ sitemap.ts                 # Static + product URLs
├─ components/
│  ├─ Header.tsx                 # nav + mobile menu (client) + "Gọi ngay"
│  ├─ Footer.tsx
│  ├─ Hero.tsx
│  ├─ SectionHeading.tsx
│  ├─ ProductImage.tsx           # deterministic colored placeholder
│  ├─ ProductCard.tsx
│  ├─ ProductGrid.tsx
│  ├─ CategoryFilter.tsx         # client: filter state
│  ├─ CategoryGrid.tsx           # home: category tiles
│  ├─ WhyChooseUs.tsx
│  ├─ ServicesStrip.tsx
│  ├─ CtaSection.tsx
│  ├─ FloatingContact.tsx        # floating call/Zalo buttons
│  └─ ContactForm.tsx            # client: Formspree POST
├─ data/
│  ├─ site.ts                    # company info + Formspree endpoint
│  └─ products.ts                # categories, products, helper functions
├─ lib/
│  └─ products.test.ts           # Vitest unit tests for helpers
├─ public/                       # (real images dropped here later)
├─ README.md                     # how to swap content + deploy
├─ vitest.config.ts
└─ (create-next-app config: package.json, tsconfig, next.config, eslint, postcss)
```

---

## Task 1: Scaffold Next.js project + design tokens

**Files:**
- Create: whole project via `create-next-app`
- Modify: `app/globals.css`, `app/layout.tsx`, `app/page.tsx`

**Interfaces:**
- Produces: a running Next.js app with Tailwind utilities for tokens (`bg-navy`, `text-accent`, `bg-surface-alt`, `border-line`, `text-ink`, `text-muted`, `font-heading`, `font-body`).

- [ ] **Step 1: Scaffold into the existing directory**

The repo `pccc-website/` already exists (has `.git`, `.gitignore`, `docs/`). Scaffold in place:

```bash
cd /Users/quockhanh/Code/pccc-website
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm
```

If prompted "directory not empty", choose to continue. If it refuses, scaffold in a temp dir and copy `app/ package.json tsconfig.json next.config.* postcss.config.* eslint.config.* .eslintrc*` over, preserving existing `.git`, `.gitignore`, `docs/`, `.superpowers/`.

- [ ] **Step 2: Verify dev server runs**

```bash
npm run dev
```
Expected: starts on `http://localhost:3000`, default Next page renders. Stop with Ctrl-C.

- [ ] **Step 3: Replace `app/globals.css` with Tailwind v4 import + tokens**

```css
@import "tailwindcss";

@theme {
  --color-navy: #0F2A47;
  --color-navy-700: #14335a;
  --color-accent: #E6462F;
  --color-accent-600: #cf3d28;
  --color-ink: #1A1D23;
  --color-muted: #5A6472;
  --color-surface: #FFFFFF;
  --color-surface-alt: #F4F6F9;
  --color-line: #DDE3EC;

  --font-heading: var(--font-be-vietnam), system-ui, sans-serif;
  --font-body: var(--font-inter), system-ui, sans-serif;
}

html { scroll-behavior: smooth; }
body { background: var(--color-surface); color: var(--color-ink); font-family: var(--font-body); }
h1, h2, h3, h4 { font-family: var(--font-heading); }
```

> Note: if `create-next-app` produced Tailwind v3 (a `tailwind.config.ts` exists and `globals.css` has `@tailwind base;`), instead add the palette under `theme.extend.colors` in `tailwind.config.ts` using the same hex values and keys (`navy`, `accent`, `ink`, `muted`, `surface`, `surface-alt` → use `'surface-alt'`, `line`), and add `fontFamily.heading`/`fontFamily.body`. Keep the `@tailwind` directives in `globals.css`.

- [ ] **Step 4: Wire fonts in `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Be_Vietnam_Pro, Inter } from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PCCC PRO — Thiết bị phòng cháy chữa cháy",
  description: "Placeholder — cập nhật ở Task 10.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${beVietnam.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 5: Smoke-test tokens in `app/page.tsx`**

```tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-surface-alt p-10">
      <h1 className="text-4xl font-heading text-navy">Xin chào PCCC PRO</h1>
      <p className="mt-2 text-muted">Đây là trang tạm để kiểm tra design tokens.</p>
      <button className="mt-4 rounded-md bg-accent px-5 py-2 font-heading font-semibold text-white">
        Gọi ngay
      </button>
    </main>
  );
}
```

Run `npm run dev`, open `http://localhost:3000`. Expected: navy heading, gray muted text, red button — confirms tokens work.

- [ ] **Step 6: Type-check, lint, commit**

```bash
npx tsc --noEmit && npm run lint
git add -A
git commit -m "chore: scaffold Next.js app with design tokens and fonts"
```
Expected: type-check + lint clean.

---

## Task 2: Data layer (types, site info, products, helpers) + unit tests

**Files:**
- Create: `data/site.ts`, `data/products.ts`, `lib/products.test.ts`, `vitest.config.ts`
- Modify: `package.json` (add test script + deps)

**Interfaces:**
- Produces:
  - `type CategorySlug = "binh-chua-chay" | "thiet-bi-bao-chay" | "voi-lang-chua-chay" | "bao-ho" | "den-bien-thoat-hiem"`
  - `interface Category { slug: CategorySlug; name: string; icon: string; blurb: string }`
  - `interface Spec { label: string; value: string }`
  - `interface Product { id: string; slug: string; name: string; category: CategorySlug; image: string; shortDesc: string; specs: Spec[]; featured: boolean }`
  - `categories: Category[]`, `products: Product[]`
  - `getProductBySlug(slug: string): Product | undefined`
  - `getProductsByCategory(slug: CategorySlug): Product[]`
  - `getFeaturedProducts(): Product[]`
  - `getCategory(slug: CategorySlug): Category | undefined`
  - `site` object with `{ name, tagline, phone, phoneDigits, zalo, facebook, email, address, mapEmbedUrl, formspreeEndpoint }`

- [ ] **Step 1: Install Vitest**

```bash
npm install -D vitest
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: { environment: "node", include: ["lib/**/*.test.ts"] },
});
```

- [ ] **Step 3: Add test script to `package.json`**

Add to `"scripts"`: `"test": "vitest run"`.

- [ ] **Step 4: Create `data/site.ts`**

```ts
export const site = {
  name: "PCCC PRO",
  tagline: "Chuyên gia thiết bị an toàn cháy nổ",
  description:
    "Cung cấp thiết bị phòng cháy chữa cháy đạt chuẩn, kiểm định đầy đủ: bình chữa cháy, thiết bị báo cháy, vòi & lăng chữa cháy, trang phục bảo hộ, đèn & biển báo thoát hiểm.",
  phone: "0900 000 000",
  phoneDigits: "0900000000", // dùng cho tel: và zalo
  zalo: "https://zalo.me/0900000000",
  facebook: "https://facebook.com/",
  email: "lienhe@pcccpro.example",
  address: "123 Đường ABC, Phường X, Quận Y, TP. HCM",
  // Google Maps > Chia sẻ > Nhúng bản đồ > dán src iframe vào đây:
  mapEmbedUrl: "https://www.google.com/maps?q=Ho+Chi+Minh+City&output=embed",
  // Formspree: tạo form miễn phí tại formspree.io, dán endpoint dạng https://formspree.io/f/xxxx
  formspreeEndpoint: "https://formspree.io/f/your-id-here",
  services: [
    "Tư vấn giải pháp PCCC",
    "Thi công hệ thống báo cháy, chữa cháy",
    "Bảo trì – bảo dưỡng định kỳ",
    "Nạp sạc & kiểm định bình chữa cháy",
  ],
} as const;
```

- [ ] **Step 5: Create `data/products.ts` (types, categories, products, helpers)**

```ts
export type CategorySlug =
  | "binh-chua-chay"
  | "thiet-bi-bao-chay"
  | "voi-lang-chua-chay"
  | "bao-ho"
  | "den-bien-thoat-hiem";

export interface Category {
  slug: CategorySlug;
  name: string;
  icon: string; // emoji tạm, thay bằng SVG sau
  blurb: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  image: string; // đường dẫn ảnh thật sau này; hiện dùng placeholder
  shortDesc: string;
  specs: Spec[];
  featured: boolean;
}

export const categories: Category[] = [
  { slug: "binh-chua-chay", name: "Bình chữa cháy", icon: "🧯", blurb: "Bình bột, CO2, ABC các loại trọng lượng." },
  { slug: "thiet-bi-bao-chay", name: "Thiết bị báo cháy", icon: "🚨", blurb: "Đầu báo khói, báo nhiệt, tủ trung tâm." },
  { slug: "voi-lang-chua-chay", name: "Vòi & lăng chữa cháy", icon: "💧", blurb: "Vòi, lăng, khớp nối tiêu chuẩn." },
  { slug: "bao-ho", name: "Trang phục & bảo hộ", icon: "🦺", blurb: "Quần áo chống cháy, mặt nạ phòng độc." },
  { slug: "den-bien-thoat-hiem", name: "Đèn & biển báo thoát hiểm", icon: "🪧", blurb: "Đèn exit, đèn sự cố, biển chỉ dẫn." },
];

export const products: Product[] = [
  {
    id: "p01", slug: "binh-bot-bc-mfz4-4kg", name: "Bình chữa cháy bột BC MFZ4 (4kg)",
    category: "binh-chua-chay", image: "/images/products/binh-bot-mfz4.jpg", featured: true,
    shortDesc: "Bình bột khô 4kg, dập cháy chất lỏng và khí, phù hợp gia đình, văn phòng, xe hơi.",
    specs: [{ label: "Chất chữa cháy", value: "Bột BC" }, { label: "Trọng lượng", value: "4 kg" }, { label: "Tiêu chuẩn", value: "TCVN 7026" }],
  },
  {
    id: "p02", slug: "binh-co2-mt3-3kg", name: "Bình chữa cháy CO2 MT3 (3kg)",
    category: "binh-chua-chay", image: "/images/products/binh-co2-mt3.jpg", featured: false,
    shortDesc: "Bình khí CO2 3kg, không để lại cặn, lý tưởng cho thiết bị điện tử, phòng máy.",
    specs: [{ label: "Chất chữa cháy", value: "Khí CO2" }, { label: "Trọng lượng", value: "3 kg" }, { label: "Ứng dụng", value: "Phòng server, tủ điện" }],
  },
  {
    id: "p03", slug: "binh-bot-abc-mfzl8-8kg", name: "Bình chữa cháy bột ABC MFZL8 (8kg)",
    category: "binh-chua-chay", image: "/images/products/binh-abc-mfzl8.jpg", featured: true,
    shortDesc: "Bình bột ABC 8kg đa năng, dập được cả chất rắn, lỏng, khí và thiết bị điện.",
    specs: [{ label: "Chất chữa cháy", value: "Bột ABC" }, { label: "Trọng lượng", value: "8 kg" }, { label: "Tiêu chuẩn", value: "TCVN 7026" }],
  },
  {
    id: "p04", slug: "dau-bao-khoi-quang-dien", name: "Đầu báo khói quang điện",
    category: "thiet-bi-bao-chay", image: "/images/products/dau-bao-khoi.jpg", featured: true,
    shortDesc: "Cảm biến khói quang điện độ nhạy cao, cảnh báo sớm đám cháy âm ỉ.",
    specs: [{ label: "Nguyên lý", value: "Quang điện" }, { label: "Điện áp", value: "9–35 VDC" }, { label: "Vùng bảo vệ", value: "~60 m²" }],
  },
  {
    id: "p05", slug: "dau-bao-nhiet-gia-tang", name: "Đầu báo nhiệt gia tăng",
    category: "thiet-bi-bao-chay", image: "/images/products/dau-bao-nhiet.jpg", featured: false,
    shortDesc: "Kích hoạt khi nhiệt độ tăng nhanh bất thường, hợp nhà bếp, gara.",
    specs: [{ label: "Ngưỡng", value: "57–60 °C" }, { label: "Kiểu", value: "Gia tăng + cố định" }, { label: "Vùng bảo vệ", value: "~40 m²" }],
  },
  {
    id: "p06", slug: "tu-trung-tam-bao-chay-5-kenh", name: "Tủ trung tâm báo cháy 5 kênh",
    category: "thiet-bi-bao-chay", image: "/images/products/tu-trung-tam.jpg", featured: false,
    shortDesc: "Trung tâm điều khiển 5 kênh (zone), hiển thị và cảnh báo sự cố tức thời.",
    specs: [{ label: "Số kênh", value: "5 zone" }, { label: "Nguồn", value: "220VAC + ắc quy dự phòng" }, { label: "Ngõ ra", value: "Còi, đèn, relay" }],
  },
  {
    id: "p07", slug: "voi-chua-chay-d50-20m", name: "Vòi chữa cháy D50 (20m)",
    category: "voi-lang-chua-chay", image: "/images/products/voi-d50.jpg", featured: true,
    shortDesc: "Vòi vải tráng cao su D50 dài 20m, chịu áp lực cao, kèm khớp nối.",
    specs: [{ label: "Đường kính", value: "D50" }, { label: "Chiều dài", value: "20 m" }, { label: "Áp lực", value: "≥ 13 bar" }],
  },
  {
    id: "p08", slug: "lang-phun-chua-chay-d50", name: "Lăng phun chữa cháy D50",
    category: "voi-lang-chua-chay", image: "/images/products/lang-phun-d50.jpg", featured: false,
    shortDesc: "Lăng phun hợp kim D50, tia thẳng và tia sương, khớp nối tiêu chuẩn.",
    specs: [{ label: "Đường kính", value: "D50" }, { label: "Chất liệu", value: "Hợp kim nhôm" }, { label: "Kiểu tia", value: "Thẳng / sương" }],
  },
  {
    id: "p09", slug: "quan-ao-chong-chay-trang-bac", name: "Quần áo chống cháy tráng bạc",
    category: "bao-ho", image: "/images/products/quan-ao-trang-bac.jpg", featured: true,
    shortDesc: "Bộ chống cháy tráng bạc phản nhiệt, bảo vệ khi tiếp cận đám cháy.",
    specs: [{ label: "Chất liệu", value: "Sợi thủy tinh tráng bạc" }, { label: "Chịu nhiệt", value: "~1000 °C bức xạ" }, { label: "Bộ gồm", value: "Áo, quần, mũ, găng, ủng" }],
  },
  {
    id: "p10", slug: "mat-na-phong-doc-loc-khoi", name: "Mặt nạ phòng độc lọc khói",
    category: "bao-ho", image: "/images/products/mat-na-loc-khoi.jpg", featured: false,
    shortDesc: "Mặt nạ trùm đầu lọc khói độc, hỗ trợ thoát hiểm an toàn khi có cháy.",
    specs: [{ label: "Thời gian dùng", value: "~30–60 phút" }, { label: "Lọc", value: "CO, khói, khí độc" }, { label: "Kiểu", value: "Trùm đầu" }],
  },
  {
    id: "p11", slug: "den-exit-thoat-hiem-2-mat", name: "Đèn exit thoát hiểm 2 mặt",
    category: "den-bien-thoat-hiem", image: "/images/products/den-exit.jpg", featured: true,
    shortDesc: "Đèn chỉ dẫn lối thoát 2 mặt, sáng liên tục và duy trì khi mất điện.",
    specs: [{ label: "Loại", value: "2 mặt" }, { label: "Pin dự phòng", value: "≥ 2 giờ" }, { label: "Bóng", value: "LED" }],
  },
  {
    id: "p12", slug: "den-su-co-chieu-sang-khan-cap", name: "Đèn sự cố chiếu sáng khẩn cấp",
    category: "den-bien-thoat-hiem", image: "/images/products/den-su-co.jpg", featured: false,
    shortDesc: "Tự động bật chiếu sáng lối đi khi mất điện, hỗ trợ thoát nạn.",
    specs: [{ label: "Công suất", value: "2 x 3W LED" }, { label: "Pin dự phòng", value: "≥ 2 giờ" }, { label: "Lắp đặt", value: "Gắn tường" }],
  },
];

export function getCategory(slug: CategorySlug): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: CategorySlug): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
```

- [ ] **Step 6: Write unit tests `lib/products.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import {
  products, categories, getProductBySlug, getProductsByCategory,
  getFeaturedProducts, getCategory,
} from "@/data/products";

describe("products data", () => {
  it("every product has a unique slug", () => {
    const slugs = products.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every product category is a known category", () => {
    const known = new Set(categories.map((c) => c.slug));
    for (const p of products) expect(known.has(p.category)).toBe(true);
  });

  it("getProductBySlug returns the matching product or undefined", () => {
    expect(getProductBySlug("binh-co2-mt3-3kg")?.name).toContain("CO2");
    expect(getProductBySlug("khong-ton-tai")).toBeUndefined();
  });

  it("getProductsByCategory returns only that category", () => {
    const list = getProductsByCategory("binh-chua-chay");
    expect(list.length).toBeGreaterThan(0);
    expect(list.every((p) => p.category === "binh-chua-chay")).toBe(true);
  });

  it("getFeaturedProducts returns only featured", () => {
    const list = getFeaturedProducts();
    expect(list.length).toBeGreaterThan(0);
    expect(list.every((p) => p.featured)).toBe(true);
  });

  it("getCategory resolves a known slug", () => {
    expect(getCategory("bao-ho")?.name).toBe("Trang phục & bảo hộ");
  });
});
```

Note: Vitest resolves the `@/*` alias from `tsconfig.json` automatically via its bundler; if not, add `resolve.alias` in `vitest.config.ts` mapping `@` → project root.

- [ ] **Step 7: Run tests, type-check, commit**

```bash
npm test && npx tsc --noEmit
git add -A
git commit -m "feat: add typed product/site data layer with helpers and tests"
```
Expected: all tests PASS.

---

## Task 3: Layout shell — Header, Footer, FloatingContact

**Files:**
- Create: `components/Header.tsx`, `components/Footer.tsx`, `components/FloatingContact.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `site` from `@/data/site`.
- Produces: `<Header />`, `<Footer />`, `<FloatingContact />` used in `app/layout.tsx`. Nav links: `/`, `/san-pham`, `/gioi-thieu`, `/lien-he`.

- [ ] **Step 1: Create `components/Header.tsx` (client, mobile menu)**

```tsx
"use client";
import Link from "next/link";
import { useState } from "react";
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
    <header className="sticky top-0 z-40 border-b border-line bg-navy text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-extrabold">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-sm">🧯</span>
          {site.name}
        </Link>
        <nav className="ml-auto hidden gap-6 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm font-medium text-white/85 hover:text-white">
              {n.label}
            </Link>
          ))}
        </nav>
        <a
          href={`tel:${site.phoneDigits}`}
          className="ml-auto hidden rounded-md bg-accent px-4 py-2 text-sm font-semibold md:ml-0 md:inline-block"
        >
          Gọi ngay: {site.phone}
        </a>
        <button
          aria-label="Mở menu"
          className="ml-auto md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-white" />
          <span className="mt-1 block h-0.5 w-6 bg-white" />
          <span className="mt-1 block h-0.5 w-6 bg-white" />
        </button>
      </div>
      {open && (
        <nav className="border-t border-white/10 bg-navy px-4 pb-4 md:hidden">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="block py-2 text-white/90"
              onClick={() => setOpen(false)}
            >
              {n.label}
            </Link>
          ))}
          <a href={`tel:${site.phoneDigits}`} className="mt-2 block rounded-md bg-accent px-4 py-2 text-center font-semibold">
            Gọi ngay: {site.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Create `components/Footer.tsx`**

```tsx
import Link from "next/link";
import { site } from "@/data/site";
import { categories } from "@/data/products";

export default function Footer() {
  return (
    <footer className="mt-16 bg-navy text-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="font-heading text-lg font-bold text-white">{site.name}</div>
          <p className="mt-2 text-sm">{site.tagline}</p>
        </div>
        <div>
          <div className="font-heading font-semibold text-white">Danh mục</div>
          <ul className="mt-2 space-y-1 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/san-pham?danh-muc=${c.slug}`} className="hover:text-white">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-heading font-semibold text-white">Liên hệ</div>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a href={`tel:${site.phoneDigits}`} className="hover:text-white">{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            <li>{site.address}</li>
          </ul>
        </div>
        <div>
          <div className="font-heading font-semibold text-white">Kết nối</div>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a href={site.zalo} className="hover:text-white">Zalo</a></li>
            <li><a href={site.facebook} className="hover:text-white">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs">
        © {new Date().getFullYear()} {site.name}. Nội dung demo — thay bằng thông tin thật.
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Create `components/FloatingContact.tsx`**

```tsx
import { site } from "@/data/site";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <a href={`tel:${site.phoneDigits}`} aria-label="Gọi ngay"
         className="grid h-12 w-12 place-items-center rounded-full bg-accent text-xl text-white shadow-lg">📞</a>
      <a href={site.zalo} aria-label="Chat Zalo"
         className="grid h-12 w-12 place-items-center rounded-full bg-navy text-xs font-bold text-white shadow-lg">Zalo</a>
    </div>
  );
}
```

- [ ] **Step 4: Wire into `app/layout.tsx`**

Add imports and wrap children:

```tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
```

Change the body to:

```tsx
<body>
  <Header />
  <main className="mx-auto min-h-[60vh] max-w-6xl px-4">{children}</main>
  <Footer />
  <FloatingContact />
</body>
```

> Note: pages that need full-bleed sections (Hero) will use negative-margin or their own wrappers; keep the `max-w-6xl` main wrapper — Hero uses `-mx-4` to break out where needed (specified in Task 5).

- [ ] **Step 5: Verify + commit**

```bash
npm run dev   # check header/footer/floating buttons render on http://localhost:3000
npx tsc --noEmit && npm run lint
git add -A
git commit -m "feat: add header, footer, and floating contact shell"
```

---

## Task 4: Reusable presentation components

**Files:**
- Create: `components/SectionHeading.tsx`, `components/ProductImage.tsx`, `components/ProductCard.tsx`, `components/ProductGrid.tsx`, `components/CtaSection.tsx`

**Interfaces:**
- Consumes: `Product` from `@/data/products`, `site` from `@/data/site`.
- Produces:
  - `<SectionHeading title="..." subtitle?="..." />`
  - `<ProductImage name={string} className?={string} />` — deterministic colored placeholder
  - `<ProductCard product={Product} />`
  - `<ProductGrid products={Product[]} />`
  - `<CtaSection />`

- [ ] **Step 1: Create `components/SectionHeading.tsx`**

```tsx
export default function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-2xl font-bold text-navy sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
    </div>
  );
}
```

- [ ] **Step 2: Create `components/ProductImage.tsx` (build-safe placeholder)**

```tsx
// Placeholder ảnh: khối màu suy ra từ tên sản phẩm. Khi có ảnh thật, thả file vào
// /public/images/products/ và thay component này bằng next/image dùng product.image.
const palette = ["#0F2A47", "#14335a", "#E6462F", "#cf3d28", "#334155", "#475569"];

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export default function ProductImage({ name, className = "" }: { name: string; className?: string }) {
  const bg = palette[hash(name) % palette.length];
  return (
    <div
      className={`flex items-end justify-start p-3 text-white ${className}`}
      style={{ background: `linear-gradient(135deg, ${bg}, #0b1c30)` }}
      role="img"
      aria-label={name}
    >
      <span className="text-xs font-semibold opacity-90">{name}</span>
    </div>
  );
}
```

- [ ] **Step 3: Create `components/ProductCard.tsx`**

```tsx
import Link from "next/link";
import type { Product } from "@/data/products";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-line bg-white transition hover:shadow-md"
    >
      <ProductImage name={product.name} className="aspect-[4/3] w-full" />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading font-semibold text-navy group-hover:text-accent">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{product.shortDesc}</p>
        <span className="mt-3 text-sm font-semibold text-accent">Xem chi tiết →</span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 4: Create `components/ProductGrid.tsx`**

```tsx
import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <p className="py-12 text-center text-muted">Không có sản phẩm trong danh mục này.</p>;
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
```

- [ ] **Step 5: Create `components/CtaSection.tsx`**

```tsx
import { site } from "@/data/site";

export default function CtaSection() {
  return (
    <section className="my-16 rounded-2xl bg-navy px-6 py-12 text-center text-white">
      <h2 className="text-2xl font-bold sm:text-3xl">Cần tư vấn thiết bị PCCC phù hợp?</h2>
      <p className="mx-auto mt-2 max-w-xl text-white/80">
        Liên hệ ngay để nhận báo giá và tư vấn giải pháp an toàn cháy nổ cho công trình của bạn.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a href={`tel:${site.phoneDigits}`} className="rounded-md bg-accent px-6 py-3 font-semibold">
          Gọi ngay: {site.phone}
        </a>
        <a href={site.zalo} className="rounded-md border border-white/40 px-6 py-3 font-semibold hover:bg-white/10">
          Chat Zalo
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Type-check, lint, commit**

```bash
npx tsc --noEmit && npm run lint
git add -A
git commit -m "feat: add reusable product/section/cta components"
```

---

## Task 5: Home page

**Files:**
- Create: `components/Hero.tsx`, `components/CategoryGrid.tsx`, `components/WhyChooseUs.tsx`, `components/ServicesStrip.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `site`, `categories`, `getFeaturedProducts`, `<ProductGrid>`, `<SectionHeading>`, `<CtaSection>`.

- [ ] **Step 1: Create `components/Hero.tsx`**

```tsx
import Link from "next/link";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section className="-mx-4 bg-navy px-4 text-white">
      <div className="mx-auto max-w-6xl py-16 sm:py-24">
        <p className="font-heading text-sm font-semibold uppercase tracking-wide text-accent">
          Thiết bị phòng cháy chữa cháy
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">
          {site.tagline}
        </h1>
        <p className="mt-4 max-w-xl text-white/80">{site.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`tel:${site.phoneDigits}`} className="rounded-md bg-accent px-6 py-3 font-semibold">
            Gọi ngay
          </a>
          <Link href="/san-pham" className="rounded-md border border-white/40 px-6 py-3 font-semibold hover:bg-white/10">
            Xem sản phẩm
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/CategoryGrid.tsx`**

```tsx
import Link from "next/link";
import { categories } from "@/data/products";

export default function CategoryGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={`/san-pham?danh-muc=${c.slug}`}
          className="rounded-lg border border-line bg-white p-5 transition hover:border-accent hover:shadow-sm"
        >
          <div className="text-3xl">{c.icon}</div>
          <div className="mt-3 font-heading font-semibold text-navy">{c.name}</div>
          <p className="mt-1 text-sm text-muted">{c.blurb}</p>
        </Link>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create `components/WhyChooseUs.tsx`**

```tsx
const points = [
  { icon: "✅", title: "Đạt chuẩn & kiểm định", desc: "Sản phẩm có chứng nhận hợp quy, kiểm định PCCC đầy đủ." },
  { icon: "🚚", title: "Giao hàng nhanh", desc: "Kho hàng sẵn, giao toàn quốc, hỗ trợ lắp đặt tận nơi." },
  { icon: "🛠️", title: "Bảo hành & bảo trì", desc: "Chính sách bảo hành rõ ràng, bảo trì định kỳ tận tâm." },
  { icon: "💬", title: "Tư vấn tận tình", desc: "Đội ngũ kỹ thuật tư vấn giải pháp phù hợp từng công trình." },
];

export default function WhyChooseUs() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {points.map((p) => (
        <div key={p.title} className="rounded-lg bg-surface-alt p-5">
          <div className="text-2xl">{p.icon}</div>
          <div className="mt-2 font-heading font-semibold text-navy">{p.title}</div>
          <p className="mt-1 text-sm text-muted">{p.desc}</p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Create `components/ServicesStrip.tsx`**

```tsx
import { site } from "@/data/site";

export default function ServicesStrip() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {site.services.map((s) => (
        <div key={s} className="flex items-center gap-3 rounded-lg border border-line p-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">🔧</span>
          <span className="text-sm font-medium text-ink">{s}</span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Assemble `app/page.tsx`**

```tsx
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import CategoryGrid from "@/components/CategoryGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesStrip from "@/components/ServicesStrip";
import ProductGrid from "@/components/ProductGrid";
import CtaSection from "@/components/CtaSection";
import { getFeaturedProducts } from "@/data/products";

export default function Home() {
  const featured = getFeaturedProducts();
  return (
    <>
      <Hero />
      <section className="py-14">
        <SectionHeading title="Danh mục sản phẩm" subtitle="Đầy đủ thiết bị cho mọi nhu cầu phòng cháy chữa cháy." />
        <div className="mt-8"><CategoryGrid /></div>
      </section>
      <section className="py-14">
        <SectionHeading title="Vì sao chọn chúng tôi" />
        <div className="mt-8"><WhyChooseUs /></div>
      </section>
      <section className="py-14">
        <SectionHeading title="Dịch vụ" subtitle="Tư vấn – thi công – bảo trì – nạp sạc bình chữa cháy." />
        <div className="mt-8"><ServicesStrip /></div>
      </section>
      <section className="py-14">
        <SectionHeading title="Sản phẩm tiêu biểu" />
        <div className="mt-8"><ProductGrid products={featured} /></div>
      </section>
      <CtaSection />
    </>
  );
}
```

- [ ] **Step 6: Verify + commit**

```bash
npm run dev   # kiểm tra trang chủ đầy đủ các section
npx tsc --noEmit && npm run lint
git add -A
git commit -m "feat: build home page with hero, categories, services, featured"
```

---

## Task 6: Catalog page with category filter

**Files:**
- Create: `components/CategoryFilter.tsx` (client)
- Create: `app/san-pham/page.tsx` (server)

**Interfaces:**
- Consumes: `categories`, `products`, `<ProductGrid>`, `<SectionHeading>`.
- URL param: `?danh-muc=<CategorySlug>` sets the initial filter.

- [ ] **Step 1: Create `components/CategoryFilter.tsx` (client)**

```tsx
"use client";
import { useState } from "react";
import { categories, type Product, type CategorySlug } from "@/data/products";
import ProductGrid from "./ProductGrid";

type Filter = CategorySlug | "all";

export default function CategoryFilter({
  products,
  initial = "all",
}: {
  products: Product[];
  initial?: Filter;
}) {
  const [active, setActive] = useState<Filter>(initial);
  const shown = active === "all" ? products : products.filter((p) => p.category === active);

  const chip = (value: Filter, label: string) => (
    <button
      key={value}
      onClick={() => setActive(value)}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
        active === value
          ? "border-accent bg-accent text-white"
          : "border-line bg-white text-ink hover:border-accent"
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
```

- [ ] **Step 2: Create `app/san-pham/page.tsx` (server, reads search param)**

```tsx
import SectionHeading from "@/components/SectionHeading";
import CategoryFilter from "@/components/CategoryFilter";
import { products, categories, type CategorySlug } from "@/data/products";

export const metadata = {
  title: "Sản phẩm — PCCC PRO",
  description: "Danh mục thiết bị phòng cháy chữa cháy: bình chữa cháy, thiết bị báo cháy, vòi & lăng, bảo hộ, đèn thoát hiểm.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ "danh-muc"?: string }>;
}) {
  const sp = await searchParams;
  const known = new Set(categories.map((c) => c.slug));
  const initial = (sp["danh-muc"] && known.has(sp["danh-muc"] as CategorySlug)
    ? (sp["danh-muc"] as CategorySlug)
    : "all") as CategorySlug | "all";

  return (
    <div className="py-12">
      <SectionHeading title="Sản phẩm" subtitle="Lọc theo danh mục để tìm nhanh thiết bị bạn cần." />
      <div className="mt-8">
        <CategoryFilter products={products} initial={initial} />
      </div>
    </div>
  );
}
```

> Note (Next.js 15): `searchParams` is a Promise and must be awaited. If the executor is on Next 14, change the type to `{ "danh-muc"?: string }` and drop the `await`.

- [ ] **Step 3: Verify filter behavior + commit**

```bash
npm run dev
# / san-pham → chips lọc đổi lưới; mở /san-pham?danh-muc=bao-ho → chip "Trang phục & bảo hộ" active sẵn
npx tsc --noEmit && npm run lint
git add -A
git commit -m "feat: add catalog page with client-side category filter"
```

---

## Task 7: Product detail page

**Files:**
- Create: `app/san-pham/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getProductBySlug`, `getProductsByCategory`, `getCategory`, `products`, `<ProductImage>`, `<ProductGrid>`, `site`.

- [ ] **Step 1: Create `app/san-pham/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
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
  if (!product) return { title: "Không tìm thấy sản phẩm — PCCC PRO" };
  return {
    title: `${product.name} — PCCC PRO`,
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
      <nav className="text-sm text-muted">
        <Link href="/san-pham" className="hover:text-accent">Sản phẩm</Link>
        {category && <> / <Link href={`/san-pham?danh-muc=${category.slug}`} className="hover:text-accent">{category.name}</Link></>}
        <> / <span className="text-ink">{product.name}</span></>
      </nav>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <ProductImage name={product.name} className="aspect-[4/3] w-full rounded-xl" />
        <div>
          <h1 className="text-2xl font-bold text-navy sm:text-3xl">{product.name}</h1>
          <p className="mt-3 text-muted">{product.shortDesc}</p>

          <h2 className="mt-6 font-heading font-semibold text-navy">Thông số kỹ thuật</h2>
          <table className="mt-2 w-full text-sm">
            <tbody>
              {product.specs.map((s) => (
                <tr key={s.label} className="border-b border-line">
                  <td className="py-2 pr-4 text-muted">{s.label}</td>
                  <td className="py-2 font-medium text-ink">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:${site.phoneDigits}`} className="rounded-md bg-accent px-6 py-3 font-semibold text-white">Gọi ngay</a>
            <Link href="/lien-he" className="rounded-md border border-navy px-6 py-3 font-semibold text-navy hover:bg-navy hover:text-white">
              Yêu cầu báo giá
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <SectionHeading title="Sản phẩm liên quan" />
          <div className="mt-8"><ProductGrid products={related} /></div>
        </section>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify + commit**

```bash
npm run dev
# mở /san-pham/binh-co2-mt3-3kg → thấy thông số, nút gọi/báo giá, sản phẩm liên quan
# mở /san-pham/khong-ton-tai → trang 404
npx tsc --noEmit && npm run lint
git add -A
git commit -m "feat: add product detail page with static params and related products"
```

---

## Task 8: About page

**Files:**
- Create: `app/gioi-thieu/page.tsx`

**Interfaces:**
- Consumes: `site`, `<SectionHeading>`, `<CtaSection>`.

- [ ] **Step 1: Create `app/gioi-thieu/page.tsx`**

```tsx
import SectionHeading from "@/components/SectionHeading";
import CtaSection from "@/components/CtaSection";
import { site } from "@/data/site";

export const metadata = {
  title: "Giới thiệu — PCCC PRO",
  description: "Về PCCC PRO: năng lực cung cấp, thi công và bảo trì thiết bị phòng cháy chữa cháy đạt chuẩn.",
};

const stats = [
  { value: "10+", label: "Năm kinh nghiệm" },
  { value: "500+", label: "Công trình đã triển khai" },
  { value: "100%", label: "Sản phẩm kiểm định" },
];

export default function AboutPage() {
  return (
    <div className="py-12">
      <SectionHeading title={`Về ${site.name}`} subtitle={site.tagline} />

      <div className="mx-auto mt-8 max-w-3xl space-y-4 text-ink">
        <p>{site.description}</p>
        <p>
          Chúng tôi cung cấp giải pháp phòng cháy chữa cháy trọn gói: từ tư vấn thiết kế, cung cấp
          thiết bị đạt chuẩn, thi công lắp đặt đến bảo trì và nạp sạc định kỳ — cam kết an toàn và
          tuân thủ quy định pháp luật về PCCC.
        </p>
        <p className="rounded-lg bg-surface-alt p-4 text-sm text-muted">
          Đây là nội dung demo. Thay bằng câu chuyện, giấy phép và hình ảnh thật của doanh nghiệp
          trong <code>data/site.ts</code> và trang này.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-line p-6 text-center">
            <div className="text-3xl font-extrabold text-accent">{s.value}</div>
            <div className="mt-1 text-sm text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      <CtaSection />
    </div>
  );
}
```

- [ ] **Step 2: Verify + commit**

```bash
npm run dev   # /gioi-thieu
npx tsc --noEmit && npm run lint
git add -A
git commit -m "feat: add about page"
```

---

## Task 9: Contact page + Formspree form

**Files:**
- Create: `components/ContactForm.tsx` (client), `app/lien-he/page.tsx`

**Interfaces:**
- Consumes: `site` (`formspreeEndpoint`, `phone`, `phoneDigits`, `zalo`, `facebook`, `email`, `address`, `mapEmbedUrl`).

- [ ] **Step 1: Create `components/ContactForm.tsx` (client)**

```tsx
"use client";
import { useState } from "react";
import { site } from "@/data/site";

type Status = "idle" | "sending" | "ok" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(site.formspreeEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Họ và tên</label>
        <input name="name" required className="w-full rounded-md border border-line px-3 py-2 outline-none focus:border-accent" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Số điện thoại</label>
        <input name="phone" required inputMode="tel" className="w-full rounded-md border border-line px-3 py-2 outline-none focus:border-accent" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Nhu cầu / sản phẩm quan tâm</label>
        <textarea name="message" rows={4} className="w-full rounded-md border border-line px-3 py-2 outline-none focus:border-accent" />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-md bg-accent px-6 py-3 font-semibold text-white disabled:opacity-60"
      >
        {status === "sending" ? "Đang gửi..." : "Gửi yêu cầu"}
      </button>
      {status === "ok" && <p className="text-sm font-medium text-green-600">Đã gửi! Chúng tôi sẽ liên hệ lại sớm.</p>}
      {status === "error" && (
        <p className="text-sm font-medium text-accent">
          Gửi chưa được. Vui lòng gọi {site.phone} hoặc kiểm tra lại Formspree endpoint.
        </p>
      )}
    </form>
  );
}
```

- [ ] **Step 2: Create `app/lien-he/page.tsx`**

```tsx
import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/data/site";

export const metadata = {
  title: "Liên hệ — PCCC PRO",
  description: "Liên hệ PCCC PRO: gọi điện, Zalo, Facebook hoặc để lại thông tin để nhận báo giá thiết bị phòng cháy chữa cháy.",
};

export default function ContactPage() {
  return (
    <div className="py-12">
      <SectionHeading title="Liên hệ" subtitle="Để lại thông tin hoặc gọi trực tiếp — chúng tôi phản hồi nhanh." />

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="font-heading font-semibold text-navy">Thông tin liên hệ</h3>
          <ul className="mt-3 space-y-2 text-ink">
            <li>📞 <a href={`tel:${site.phoneDigits}`} className="font-medium hover:text-accent">{site.phone}</a></li>
            <li>💬 <a href={site.zalo} className="hover:text-accent">Chat Zalo</a></li>
            <li>📘 <a href={site.facebook} className="hover:text-accent">Facebook</a></li>
            <li>✉️ <a href={`mailto:${site.email}`} className="hover:text-accent">{site.email}</a></li>
            <li>📍 {site.address}</li>
          </ul>
          <div className="mt-6 overflow-hidden rounded-lg border border-line">
            <iframe
              src={site.mapEmbedUrl}
              className="h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ"
            />
          </div>
        </div>

        <div className="rounded-xl border border-line p-6">
          <h3 className="font-heading font-semibold text-navy">Yêu cầu báo giá</h3>
          <p className="mt-1 text-sm text-muted">Điền thông tin, chúng tôi sẽ liên hệ lại.</p>
          <div className="mt-4"><ContactForm /></div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify + commit**

```bash
npm run dev
# /lien-he → form hiển thị, map embed hiện; submit khi chưa cấu hình endpoint → hiện thông báo lỗi (đúng như thiết kế)
npx tsc --noEmit && npm run lint
git add -A
git commit -m "feat: add contact page with Formspree form and map"
```

---

## Task 10: SEO — metadata, Open Graph, sitemap, JSON-LD

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/sitemap.ts`

**Interfaces:**
- Consumes: `site`, `products`.

- [ ] **Step 1: Upgrade base metadata + JSON-LD in `app/layout.tsx`**

Replace the `metadata` export with:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://pccc-pro.vercel.app"), // đổi thành domain thật khi có
  title: {
    default: "PCCC PRO — Thiết bị phòng cháy chữa cháy",
    template: "%s",
  },
  description:
    "Cung cấp thiết bị phòng cháy chữa cháy đạt chuẩn: bình chữa cháy, thiết bị báo cháy, vòi & lăng chữa cháy, bảo hộ, đèn thoát hiểm.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "PCCC PRO",
    title: "PCCC PRO — Thiết bị phòng cháy chữa cháy",
    description: "Thiết bị PCCC đạt chuẩn, kiểm định đầy đủ. Tư vấn – cung cấp – thi công – bảo trì.",
  },
};
```

Add a `LocalBusiness` JSON-LD script inside `<body>` (before `<Header />`):

```tsx
import { site } from "@/data/site";
// ...
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  description: site.description,
  telephone: site.phoneDigits,
  email: site.email,
  address: { "@type": "PostalAddress", streetAddress: site.address },
};
// inside <body>, first child:
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
```

- [ ] **Step 2: Create `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pccc-pro.vercel.app"; // đổi thành domain thật khi có
  const staticPages = ["", "/san-pham", "/gioi-thieu", "/lien-he"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
  const productPages = products.map((p) => ({
    url: `${base}/san-pham/${p.slug}`,
    lastModified: new Date(),
  }));
  return [...staticPages, ...productPages];
}
```

- [ ] **Step 3: Verify + commit**

```bash
npm run dev
# xem /sitemap.xml liệt kê đủ trang + 12 sản phẩm; xem source trang chủ có <script type="application/ld+json">
npx tsc --noEmit && npm run lint
git add -A
git commit -m "feat: add SEO metadata, Open Graph, sitemap, and JSON-LD"
```

---

## Task 11: Final verification, README, deploy prep

**Files:**
- Create: `README.md`

**Interfaces:** none (documentation + verification).

- [ ] **Step 1: Full verification**

```bash
npm test && npx tsc --noEmit && npm run lint && npm run build
```
Expected: tests PASS, type-check clean, lint clean, `next build` completes with all routes (including `/san-pham/[slug]` prerendered for 12 products).

- [ ] **Step 2: Create `README.md`**

```markdown
# PCCC PRO — Website giới thiệu thiết bị PCCC

Next.js (App Router) + Tailwind CSS. Site tĩnh, deploy trên Vercel.

## Chạy local
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build production
npm test         # unit test dữ liệu sản phẩm
```

## Thay nội dung thật (không cần đụng giao diện)
- **Thông tin công ty / liên hệ:** sửa `data/site.ts` (tên, SĐT, Zalo, Facebook, email, địa chỉ, bản đồ).
- **Formspree:** tạo form miễn phí tại formspree.io → dán endpoint vào `site.formspreeEndpoint`.
- **Sản phẩm:** thêm/sửa object trong `data/products.ts`.
- **Ảnh sản phẩm:** thả file vào `public/images/products/` rồi thay `components/ProductImage.tsx`
  bằng `next/image` dùng `product.image`.
- **Domain trong SEO:** đổi URL trong `app/layout.tsx` (`metadataBase`) và `app/sitemap.ts`.

## Deploy lên Vercel
1. Tạo GitHub repo, push code này lên.
2. Vào vercel.com → New Project → import repo → Deploy (Vercel tự nhận Next.js).
3. (Tùy chọn) gắn tên miền riêng trong Project Settings → Domains.
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "docs: add README with content-swap and deploy instructions"
```

- [ ] **Step 4 (optional, user action): Deploy**

Push to a GitHub repo and import on Vercel per README. This step is done by the user (needs their GitHub/Vercel accounts).

---

## Self-Review (against spec)

**Spec coverage:**
- §1 Scope (catalog + contact, no e-commerce/backend, Vietnamese) → Tasks 2,5,6,7,9; no cart/login/blog present. ✅
- §2 Stack (Next.js App Router + TS, Tailwind, Be Vietnam Pro + Inter, Formspree, Vercel) → Tasks 1,2,9,11. ✅
- §3 Sitemap (Home, /san-pham, /san-pham/[slug], /gioi-thieu, /lien-he; services strip on home) → Tasks 5,6,7,8,9. ✅
- §4 Visual "Xanh Kỹ Thuật" tokens → Task 1 (globals.css @theme). ✅
- §5 Data model (Product/Category shape, 5 categories, ~10 products, site.ts) → Task 2 (12 products). ✅
- §6 Folder structure → matches File Structure section. ✅
- §7 Contact (tel/Zalo/FB direct + Formspree form, floating buttons) → Tasks 3,9. ✅
- §8 SEO (metadata, OG, sitemap, JSON-LD LocalBusiness, next/image alt) → Task 10 (+ ProductImage aria-label; note real next/image swap deferred with real photos, documented in README). ✅
- §9 Testing (tsc, lint, build, filter unit test) → Tasks 2,11. ✅
- §10 Success criteria → Task 11 verification. ✅

**Placeholder scan:** No "TBD/TODO" in steps; every code step has complete code. Content placeholders (demo copy, image paths) are intentional per spec §1/§10 and documented in README. ✅

**Type consistency:** `CategorySlug`, `Product`, `Category`, `Spec`, `site` fields (`phoneDigits`, `formspreeEndpoint`, `mapEmbedUrl`, `services`), and helper names (`getProductBySlug`, `getProductsByCategory`, `getFeaturedProducts`, `getCategory`) are used consistently across Tasks 2–10. Filter uses `?danh-muc=` param consistently in Header, Footer, CategoryGrid, detail breadcrumb, and catalog page. ✅
