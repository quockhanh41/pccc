export default function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && <p className="font-mono text-xs font-bold uppercase tracking-widest text-accent">{eyebrow}</p>}
      <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
    </div>
  );
}
