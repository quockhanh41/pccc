// Placeholder ảnh: khối gradient suy ra từ tên. Khi có ảnh thật, thả file vào
// /public/images/products/ rồi thay bằng next/image dùng product.image (xem README).
const palette = ["#0F2A47", "#14335a", "#B8341F", "#334155", "#1e3a5f", "#3f4b5a"];

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export default function ProductImage({ name, className = "" }: { name: string; className?: string }) {
  const bg = palette[hash(name) % palette.length];
  return (
    <div
      className={`flex items-end justify-start p-3 text-white ${className}`}
      style={{ background: `linear-gradient(135deg, ${bg}, #0A1E33)` }}
      role="img"
      aria-label={name}
    >
      <span className="font-mono text-[11px] font-semibold uppercase tracking-wide opacity-90">{name}</span>
    </div>
  );
}
