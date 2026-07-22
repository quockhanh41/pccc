import { FireExtinguisher, Siren, Droplets, HardHat, DoorOpen, type LucideIcon } from "lucide-react";
import type { CategorySlug } from "@/data/products";

export const categoryIcons: Record<CategorySlug, LucideIcon> = {
  "binh-chua-chay": FireExtinguisher,
  "thiet-bi-bao-chay": Siren,
  "voi-lang-chua-chay": Droplets,
  "bao-ho": HardHat,
  "den-bien-thoat-hiem": DoorOpen,
};
