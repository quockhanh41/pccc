"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import ImageLightbox from "./ImageLightbox";

const storePhotos = [
  { src: "/images/store/cua-hang-1.png", alt: "Mặt tiền cửa hàng PCCC Bình An" },
  { src: "/images/store/cua-hang-2.png", alt: "Khu trưng bày bình chữa cháy" },
  { src: "/images/store/cua-hang-3.png", alt: "Kho thiết bị báo cháy" },
  { src: "/images/store/cua-hang-4.jpg", alt: "Khu tư vấn khách hàng" },
  { src: "/images/store/cua-hang-5.jpg", alt: "Đội ngũ kỹ thuật" },
  { src: "/images/store/cua-hang-6.jpg", alt: "Xe giao hàng tận nơi" },
];

export default function StoreHomePreview() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid items-center gap-8 rounded-2xl border border-line bg-surface-alt p-6 md:grid-cols-2 md:p-8">
        <div
          onClick={() => setLightboxIndex(0)}
          className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border border-line bg-black/5"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setLightboxIndex(0);
            }
          }}
          aria-label="Xem toàn ảnh mặt tiền cửa hàng PCCC Bình An"
        >
          <Image
            src={storePhotos[0].src}
            alt={storePhotos[0].alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>

        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-accent">Cửa hàng</p>
          <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">Ghé thăm cửa hàng của chúng tôi</h2>
          <p className="mt-3 text-body">
            {site.address}. Showroom trưng bày đầy đủ thiết bị PCCC, có đội ngũ kỹ thuật tư vấn trực tiếp.
          </p>
          <Link
            href="/gioi-thieu"
            className="mt-5 inline-flex items-center gap-1 font-semibold text-accent transition-all hover:gap-2"
          >
            Tìm hiểu thêm về chúng tôi <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <ImageLightbox
        images={storePhotos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </>
  );
}
