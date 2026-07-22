"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxImage {
  src: string;
  alt: string;
  title?: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < images.length;
  const currentImage = isOpen ? images[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    onNavigate(prevIndex);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const nextIndex = (currentIndex + 1) % images.length;
    onNavigate(nextIndex);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/90 p-4 sm:p-6 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Header bar */}
      <div
        className="flex w-full max-w-6xl items-center justify-between py-2 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-sm font-medium text-white/80">
          {images.length > 1 && (
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider">
              {currentIndex + 1} / {images.length}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Đóng"
        >
          <X size={22} />
        </button>
      </div>

      {/* Main image container */}
      <div
        className="relative flex flex-1 w-full max-w-6xl items-center justify-center py-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white hover:bg-accent transition focus:outline-none focus:ring-2 focus:ring-white sm:left-4"
            aria-label="Ảnh trước"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        <div className="relative max-h-[78vh] w-full h-[78vh] max-w-4xl overflow-hidden rounded-lg">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            sizes="100vw"
            priority
            className="object-contain select-none"
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white hover:bg-accent transition focus:outline-none focus:ring-2 focus:ring-white sm:right-4"
            aria-label="Ảnh tiếp theo"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>

      {/* Caption footer */}
      {currentImage.alt && (
        <div
          className="mt-2 rounded-full bg-white/10 px-6 py-2 text-center text-sm font-medium text-white/90 backdrop-blur-sm max-w-xl truncate"
          onClick={(e) => e.stopPropagation()}
        >
          {currentImage.alt}
        </div>
      )}
    </div>
  );
}
