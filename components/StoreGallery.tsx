"use client";

import { useState } from "react";
import Image from "next/image";
import ImageLightbox from "./ImageLightbox";

// Ảnh cửa hàng/showroom.
const photos = [
  { src: "/images/store/cua-hang-1.png", alt: "Mặt tiền cửa hàng PCCC Bình An" },
  { src: "/images/store/cua-hang-2.png", alt: "Khu trưng bày bình chữa cháy" },
  { src: "/images/store/cua-hang-3.png", alt: "Kho thiết bị báo cháy" },
  { src: "/images/store/cua-hang-4.jpg", alt: "Khu tư vấn khách hàng" },
  { src: "/images/store/cua-hang-5.jpg", alt: "Đội ngũ kỹ thuật" },
  { src: "/images/store/cua-hang-6.jpg", alt: "Xe giao hàng tận nơi" },
];

export default function StoreGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((p, idx) => (
          <div
            key={p.src}
            onClick={() => setLightboxIndex(idx)}
            className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg border border-line bg-black/5"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setLightboxIndex(idx);
              }
            }}
            aria-label={`Xem ảnh lớn: ${p.alt}`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      <ImageLightbox
        images={photos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </>
  );
}
