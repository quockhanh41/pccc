# Thiết kế — Website giới thiệu thiết bị PCCC

**Ngày:** 2026-07-22
**Trạng thái:** Đã duyệt thiết kế, chờ viết implementation plan

---

## 1. Mục tiêu & phạm vi

Website **giới thiệu sản phẩm** thiết bị phòng cháy chữa cháy (PCCC) cho một doanh nghiệp,
giúp khách hàng xem sản phẩm/năng lực rồi **liên hệ** (gọi / Zalo / Facebook / để lại thông tin).

**Trong phạm vi (in scope):**
- Trưng bày sản phẩm theo danh mục, có trang chi tiết từng sản phẩm.
- Thông tin công ty, năng lực, giấy phép.
- Nhiều kênh liên hệ + form "để lại thông tin" (không thanh toán online).
- Tối ưu SEO cơ bản để khách tìm thấy trên Google.

**Ngoài phạm vi (out of scope — YAGNI):**
- Giỏ hàng, đặt hàng, thanh toán online (e-commerce).
- Đăng nhập / tài khoản người dùng.
- Blog, tìm kiếm nâng cao, đa ngôn ngữ (chỉ tiếng Việt).
- Backend/CSDL riêng (dữ liệu tĩnh trong code).

**Bối cảnh:** Người dùng đã biết React/Next. Chưa có nội dung thật → dựng demo với
nội dung + ảnh placeholder, thay dần sau. Đây là dự án mới trong `/Users/quockhanh/Code/pccc-website`.

## 2. Stack & lý do

| Thành phần | Lựa chọn | Lý do |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | User đã quen; render sẵn HTML → SEO tốt; static export được |
| Styling | **Tailwind CSS** | Nhanh, nhất quán, dễ theo design tokens |
| Font | **Be Vietnam Pro** (tiêu đề) + **Inter** (nội dung) | Hỗ trợ đầy đủ dấu tiếng Việt; load qua `next/font` |
| Form liên hệ | **Formspree** (free) | Gửi form về email, không cần backend |
| Deploy | **Vercel** (free) | Tự build từ GitHub, HTTPS + domain `*.vercel.app`, gắn tên miền riêng sau |

Đã cân nhắc Astro (nhanh/SEO tối ưu hơn nhưng user chưa quen) và Vite+React SPA (SEO kém → loại).

## 3. Cấu trúc website (sitemap)

- `/` — Trang chủ: Hero (slogan + CTA gọi/Zalo) → Danh mục nổi bật → Vì sao chọn chúng tôi
  → Sản phẩm tiêu biểu → Mục "Dịch vụ" ngắn (tư vấn – thi công – bảo trì – nạp sạc) → Dự án/khách hàng → Dải CTA + Footer.
- `/san-pham` — Danh sách sản phẩm, lọc theo danh mục (client-side).
- `/san-pham/[slug]` — Chi tiết: ảnh, mô tả, bảng thông số, nút "Yêu cầu báo giá" / "Gọi ngay".
- `/gioi-thieu` — Về công ty, năng lực, giấy phép PCCC.
- `/lien-he` — Địa chỉ + bản đồ (embed) + SĐT/Zalo/FB + form Formspree.

Trang **Dịch vụ** riêng để dành mở rộng sau (đã có mục giới thiệu ở trang chủ).

## 4. Phong cách hình ảnh (hướng B — "Xanh Kỹ Thuật")

**Cảm giác:** chuyên nghiệp, kỹ thuật, đáng tin — hợp bán B2B/dự án.

**Design tokens:**
- Navy chủ đạo `#0F2A47` (header, tiêu đề, section đậm)
- Đỏ điểm nhấn `#E6462F` (nút CTA, số liệu, icon cảnh báo)
- Nền `#FFFFFF`, nền phụ `#F4F6F9`
- Chữ chính `#1A1D23`, chữ phụ `#5A6472`, viền `#DDE3EC`

## 5. Mô hình dữ liệu

`data/products.ts` — mảng có kiểu:

```ts
type ProductCategory =
  | 'binh-chua-chay' | 'thiet-bi-bao-chay' | 'voi-lang-chua-chay'
  | 'bao-ho' | 'den-bien-thoat-hiem';

interface Product {
  id: string;
  slug: string;              // dùng cho URL /san-pham/[slug]
  name: string;
  category: ProductCategory;
  image: string;             // đường dẫn trong /public/images (placeholder)
  shortDesc: string;
  specs: { label: string; value: string }[];
  featured: boolean;         // hiện ở "Sản phẩm tiêu biểu" trang chủ
}
```

`data/site.ts` — thông tin dùng lại một chỗ: tên công ty, SĐT, Zalo, Facebook, email,
địa chỉ, Formspree endpoint. Sửa 1 nơi, cả site cập nhật.

**Danh mục mẫu (5):** Bình chữa cháy · Thiết bị báo cháy · Vòi & lăng chữa cháy ·
Trang phục & bảo hộ · Đèn & biển báo thoát hiểm.
**Sản phẩm mẫu:** ~10 sản phẩm với ảnh placeholder + thông số mẫu.

## 6. Cấu trúc thư mục

```
pccc-website/
├─ app/
│  ├─ layout.tsx                 # Header + Footer + font + metadata gốc
│  ├─ page.tsx                   # Trang chủ
│  ├─ san-pham/page.tsx
│  ├─ san-pham/[slug]/page.tsx   # generateStaticParams từ products
│  ├─ gioi-thieu/page.tsx
│  ├─ lien-he/page.tsx
│  └─ sitemap.ts                 # sitemap tự sinh
├─ components/                   # Header, Footer, Hero, ProductCard,
│                                #   CategoryGrid, CTASection, ContactForm, ...
├─ data/{products.ts, site.ts}
├─ public/images/                # ảnh placeholder
└─ (config: tailwind, tsconfig, next.config)
```

## 7. Liên hệ

- **Kênh trực tiếp:** `tel:`, link Zalo (`https://zalo.me/<sđt>`), Messenger — hiện ở Header,
  Footer, trang chi tiết, và nút nổi (floating) ở mọi trang.
- **Form:** ContactForm gửi POST tới Formspree endpoint (lưu trong `site.ts`).
  Có trạng thái gửi thành công/thất bại. Trước khi có endpoint thật → để placeholder + ghi chú.

## 8. SEO

- `metadata` (title/description) riêng cho từng trang qua Metadata API của Next.
- Thẻ Open Graph để chia sẻ mạng xã hội đẹp.
- `sitemap.ts` tự sinh từ danh sách trang + sản phẩm.
- JSON-LD `LocalBusiness` ở trang chủ (tên, địa chỉ, SĐT).
- Ảnh dùng `next/image`, có `alt` mô tả.

## 9. Kiểm thử (testing)

Quy mô nhỏ → tập trung thứ giá trị nhất:
- **Type-check** (`tsc`) + **lint** (`eslint`) sạch.
- **Build** (`next build`) chạy được, không lỗi.
- Kiểm tra thủ công theo checklist: điều hướng đủ trang, lọc danh mục đúng,
  các link liên hệ (`tel`/Zalo/FB) đúng, form hiển thị & xử lý trạng thái,
  responsive mobile/desktop.
- (Tùy chọn) 1–2 unit test cho hàm lọc sản phẩm theo danh mục.

## 10. Tiêu chí hoàn thành (success criteria)

- [ ] 5 trang chạy được, điều hướng mượt, responsive.
- [ ] Lọc sản phẩm theo danh mục hoạt động đúng.
- [ ] Mọi kênh liên hệ (gọi/Zalo/FB/form) hiển thị và trỏ đúng.
- [ ] `next build` + type-check + lint sạch.
- [ ] Có metadata SEO + sitemap; Lighthouse SEO ≥ 90.
- [ ] Deploy được lên Vercel, truy cập bằng URL công khai.
- [ ] Nội dung/ảnh là placeholder rõ ràng, dễ thay bằng đồ thật (sửa trong `data/`).
