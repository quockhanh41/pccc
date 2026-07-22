// "Tem kiểm định / bảng năng lực" — mô phỏng nhãn thông số trên thiết bị PCCC.
export default function DataPlate({
  rows,
  className = "",
}: {
  rows: { label: string; value: string }[];
  className?: string;
}) {
  return (
    <div className={`relative rounded-lg border border-white/15 bg-navy-deep p-5 font-mono text-white shadow-xl ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/15 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
        <span className="text-xs font-bold uppercase tracking-widest text-white/80">Bảng năng lực</span>
      </div>
      <dl className="mt-3 space-y-2.5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-baseline justify-between gap-4 text-sm">
            <dt className="text-[11px] uppercase tracking-wider text-white/55">{r.label}</dt>
            <dd className="font-semibold tabular-nums text-white">{r.value}</dd>
          </div>
        ))}
      </dl>
      <span aria-hidden className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-white/25" />
    </div>
  );
}
