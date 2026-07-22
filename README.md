# PCCC PRO — Website giới thiệu thiết bị PCCC

Next.js (App Router) + Tailwind CSS v4. IBM Plex Sans + JetBrains Mono, icon Lucide.
Site tĩnh, deploy trên Vercel.

## Chạy local
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build production
npm test         # unit test dữ liệu sản phẩm
```

## Thay nội dung thật (không cần đụng giao diện)
- **Thông tin công ty / liên hệ:** sửa `data/site.ts` (tên, SĐT, Zalo, Facebook, email, địa chỉ, bản đồ).
- **Formspree:** tạo form miễn phí tại formspree.io → dán endpoint vào `site.formspreeEndpoint`.
- **Sản phẩm:** thêm/sửa object trong `data/products.ts`; icon danh mục trong `components/icons.tsx`.
- **Ảnh sản phẩm:** thả file vào `public/images/products/` rồi thay `components/ProductImage.tsx`
  bằng `next/image` dùng `product.image`.
- **Domain SEO:** đổi URL trong `app/layout.tsx` (`metadataBase`) và `app/sitemap.ts`.

## Deploy lên Vercel
1. Tạo GitHub repo, push code lên.
2. vercel.com → New Project → import repo → Deploy (Vercel tự nhận Next.js).
3. (Tùy chọn) gắn tên miền riêng trong Project Settings → Domains.
