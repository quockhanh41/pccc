import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
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
