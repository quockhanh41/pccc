"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import ImageLightbox from "./ImageLightbox";

const storePhotos = [
  { src: "/images/store/cua-hang-1.png", alt: "Mặt tiền cửa hàng PCCC Bình An (Góc 1)" },
  { src: "/images/store/cua-hang-1_2.png", alt: "Mặt tiền cửa hàng PCCC Bình An (Góc 2)" },
  { src: "/images/store/cua-hang-2.png", alt: "Khu trưng bày bình chữa cháy" },
  { src: "/images/store/cua-hang-3.png", alt: "Kho thiết bị báo cháy" },
  { src: "/images/store/cua-hang-4.jpg", alt: "Khu tư vấn khách hàng" },
  { src: "/images/store/cua-hang-5.jpg", alt: "Đội ngũ kỹ thuật" },
  { src: "/images/store/cua-hang-6.jpg", alt: "Xe giao hàng tận nơi" },
];

export default function StoreHomePreview() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);
  const heroPhotos = storePhotos.slice(0, 2);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIdx((prev) => (prev + 1) % heroPhotos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroPhotos.length]);

  return (
    <>
      <div className="grid items-center gap-8 rounded-2xl border border-line bg-surface-alt p-6 md:grid-cols-2 md:p-8">
        <div
          onClick={() => setLightboxIndex(currentHeroIdx)}
          className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border border-line bg-black/5"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setLightboxIndex(currentHeroIdx);
            }
          }}
          aria-label="Xem toàn ảnh cửa hàng PCCC Bình An"
        >
          {/* Horizontal slide container */}
          <div
            className="flex h-full w-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentHeroIdx * 100}%)` }}
          >
            {heroPhotos.map((photo, idx) => (
              <div key={photo.src} className="relative h-full w-full flex-shrink-0">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx === 0}
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Dots control indicator */}
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-sm">
            {heroPhotos.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentHeroIdx(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentHeroIdx ? "w-5 bg-accent" : "w-2 bg-white/60 hover:bg-white"
                }`}
                aria-label={`Chuyển sang ảnh cửa hàng ${idx + 1}`}
              />
            ))}
          </div>
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
