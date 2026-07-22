export type CategorySlug =
  | "binh-chua-chay"
  | "thiet-bi-bao-chay"
  | "voi-lang-chua-chay"
  | "bao-ho"
  | "den-bien-thoat-hiem";

export interface Category {
  slug: CategorySlug;
  name: string;
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
  image: string;
  shortDesc: string;
  specs: Spec[];
  featured: boolean;
}

export const categories: Category[] = [
  { slug: "binh-chua-chay", name: "Bình chữa cháy", blurb: "Bình bột, CO2, ABC các loại trọng lượng." },
  { slug: "thiet-bi-bao-chay", name: "Thiết bị báo cháy", blurb: "Đầu báo khói, báo nhiệt, tủ trung tâm." },
  { slug: "voi-lang-chua-chay", name: "Vòi & lăng chữa cháy", blurb: "Vòi, lăng, khớp nối tiêu chuẩn." },
  { slug: "bao-ho", name: "Trang phục & bảo hộ", blurb: "Quần áo chống cháy, mặt nạ phòng độc." },
  { slug: "den-bien-thoat-hiem", name: "Đèn & biển báo thoát hiểm", blurb: "Đèn exit, đèn sự cố, biển chỉ dẫn." },
];

export const products: Product[] = [
  {
    id: "p01", slug: "binh-bot-bc-mfz4-4kg", name: "Bình chữa cháy bột BC MFZ4 (4kg)",
    category: "binh-chua-chay", image: "/image/binh-chua-chay-4kg-bc.jpg", featured: true,
    shortDesc: "Bình bột khô 4kg, dập cháy chất lỏng và khí, phù hợp gia đình, văn phòng, xe hơi.",
    specs: [{ label: "Chất chữa cháy", value: "Bột BC" }, { label: "Trọng lượng", value: "4 kg" }, { label: "Tiêu chuẩn", value: "TCVN 7026" }],
  },
  {
    id: "p02", slug: "binh-co2-mt3-3kg", name: "Bình chữa cháy CO2 MT3 (3kg)",
    category: "binh-chua-chay", image: "/image/binh-chua-chay-3kg-co2.jpg", featured: false,
    shortDesc: "Bình khí CO2 3kg, không để lại cặn, lý tưởng cho thiết bị điện tử, phòng máy.",
    specs: [{ label: "Chất chữa cháy", value: "Khí CO2" }, { label: "Trọng lượng", value: "3 kg" }, { label: "Ứng dụng", value: "Phòng server, tủ điện" }],
  },
  {
    id: "p03", slug: "binh-bot-abc-mfzl8-8kg", name: "Bình chữa cháy bột ABC MFZL8 (8kg)",
    category: "binh-chua-chay", image: "/image/binh-chua-chay-bot-abc-mfzl8-8kg.jpg", featured: true,
    shortDesc: "Bình bột ABC 8kg đa năng, dập được cả chất rắn, lỏng, khí và thiết bị điện.",
    specs: [{ label: "Chất chữa cháy", value: "Bột ABC" }, { label: "Trọng lượng", value: "8 kg" }, { label: "Tiêu chuẩn", value: "TCVN 7026" }],
  },
  {
    id: "p04", slug: "dau-bao-khoi-quang-dien", name: "Đầu báo khói quang điện",
    category: "thiet-bi-bao-chay", image: "/image/p_43841_Leaders-Tech-LTD-5000C.jpg", featured: true,
    shortDesc: "Cảm biến khói quang điện độ nhạy cao, cảnh báo sớm đám cháy âm ỉ.",
    specs: [{ label: "Nguyên lý", value: "Quang điện" }, { label: "Điện áp", value: "9–35 VDC" }, { label: "Vùng bảo vệ", value: "~60 m2" }],
  },
  {
    id: "p05", slug: "dau-bao-nhiet-gia-tang", name: "Đầu báo nhiệt gia tăng",
    category: "thiet-bi-bao-chay", image: "/image/pro_137569400044-500x480.jpg", featured: false,
    shortDesc: "Kích hoạt khi nhiệt độ tăng nhanh bất thường, hợp nhà bếp, gara.",
    specs: [{ label: "Ngưỡng", value: "57–60 °C" }, { label: "Kiểu", value: "Gia tăng + cố định" }, { label: "Vùng bảo vệ", value: "~40 m2" }],
  },
  {
    id: "p06", slug: "tu-trung-tam-bao-chay-5-kenh", name: "Tủ trung tâm báo cháy 5 kênh",
    category: "thiet-bi-bao-chay", image: "/image/tu-trung-tam-bao-chay-5-kenh-yunyang-yf1-0005l-1.jpg", featured: false,
    shortDesc: "Trung tâm điều khiển 5 kênh (zone), hiển thị và cảnh báo sự cố tức thời.",
    specs: [{ label: "Số kênh", value: "5 zone" }, { label: "Nguồn", value: "220VAC + ắc quy" }, { label: "Ngõ ra", value: "Còi, đèn, relay" }],
  },
  {
    id: "p07", slug: "voi-chua-chay-d50-20m", name: "Vòi chữa cháy D50 (20m)",
    category: "voi-lang-chua-chay", image: "/image/voi-chua-chay-jakob-d50-cua-duc-17bar-20m.jpg", featured: true,
    shortDesc: "Vòi vải tráng cao su D50 dài 20m, chịu áp lực cao, kèm khớp nối.",
    specs: [{ label: "Đường kính", value: "D50" }, { label: "Chiều dài", value: "20 m" }, { label: "Áp lực", value: "≥ 13 bar" }],
  },
  {
    id: "p08", slug: "lang-phun-chua-chay-d50", name: "Lăng phun chữa cháy D50",
    category: "voi-lang-chua-chay", image: "/image/lang-phun-chua-chay-d50_09ee39fa08604f44bcfce68aafb068c4_1024x1024.webp", featured: false,
    shortDesc: "Lăng phun hợp kim D50, tia thẳng và tia sương, khớp nối tiêu chuẩn.",
    specs: [{ label: "Đường kính", value: "D50" }, { label: "Chất liệu", value: "Hợp kim nhôm" }, { label: "Kiểu tia", value: "Thẳng / sương" }],
  },
  {
    id: "p09", slug: "quan-ao-chong-chay-trang-bac", name: "Quần áo chống cháy tráng bạc",
    category: "bao-ho", image: "/image/quan-ao-trang-bac-ktfs1000.jpg", featured: true,
    shortDesc: "Bộ chống cháy tráng bạc phản nhiệt, bảo vệ khi tiếp cận đám cháy.",
    specs: [{ label: "Chất liệu", value: "Sợi thủy tinh tráng bạc" }, { label: "Chịu nhiệt", value: "~1000 °C bức xạ" }, { label: "Bộ gồm", value: "Áo, quần, mũ, găng, ủng" }],
  },
  {
    id: "p10", slug: "mat-na-phong-doc-loc-khoi", name: "Mặt nạ phòng độc lọc khói",
    category: "bao-ho", image: "/image/mat-na-phong-doc-np306-a3_1717404673.jpeg", featured: false,
    shortDesc: "Mặt nạ trùm đầu lọc khói độc, hỗ trợ thoát hiểm an toàn khi có cháy.",
    specs: [{ label: "Thời gian dùng", value: "~30–60 phút" }, { label: "Lọc", value: "CO, khói, khí độc" }, { label: "Kiểu", value: "Trùm đầu" }],
  },
  {
    id: "p11", slug: "den-exit-thoat-hiem-2-mat", name: "Đèn exit thoát hiểm 2 mặt",
    category: "den-bien-thoat-hiem", image: "/image/den-exit-2-mat.jpg", featured: true,
    shortDesc: "Đèn chỉ dẫn lối thoát 2 mặt, sáng liên tục và duy trì khi mất điện.",
    specs: [{ label: "Loại", value: "2 mặt" }, { label: "Pin dự phòng", value: "≥ 2 giờ" }, { label: "Bóng", value: "LED" }],
  },
  {
    id: "p12", slug: "den-su-co-chieu-sang-khan-cap", name: "Đèn sự cố chiếu sáng khẩn cấp",
    category: "den-bien-thoat-hiem", image: "/image/den-sac-khan-cap-Kentom-KT-402-jpg.webp", featured: false,
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
