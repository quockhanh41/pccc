import type { MetadataRoute } from "next";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pccc-pro.vercel.app";
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
