import Image from "next/image";

// Ảnh cửa hàng/showroom. Thay ảnh mẫu trong public/images/store/ bằng ảnh thật
// (giữ nguyên tên file, hoặc sửa danh sách bên dưới). Nhớ điền alt mô tả đúng ảnh.
const photos = [
  { src: "/images/store/cua-hang-1.jpg", alt: "Mặt tiền cửa hàng PCCC PRO" },
  { src: "/images/store/cua-hang-2.jpg", alt: "Khu trưng bày bình chữa cháy" },
  { src: "/images/store/cua-hang-3.jpg", alt: "Kho thiết bị báo cháy" },
  { src: "/images/store/cua-hang-4.jpg", alt: "Khu tư vấn khách hàng" },
  { src: "/images/store/cua-hang-5.jpg", alt: "Đội ngũ kỹ thuật" },
  { src: "/images/store/cua-hang-6.jpg", alt: "Xe giao hàng tận nơi" },
];

export default function StoreGallery() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((p) => (
        <div key={p.src} className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-line">
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
  );
}
