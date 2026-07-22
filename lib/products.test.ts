import { describe, it, expect } from "vitest";
import {
  products,
  categories,
  getProductBySlug,
  getProductsByCategory,
  getFeaturedProducts,
  getCategory,
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
  it("getProductBySlug returns the match or undefined", () => {
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
