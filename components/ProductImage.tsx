"use client";
import { useState } from "react";

const palette = ["#0F2A47", "#14335a", "#B8341F", "#334155", "#1e3a5f", "#3f4b5a"];

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export default function ProductImage({ name, image, className = "" }: { name: string; image?: string; className?: string }) {
  const [error, setError] = useState(false);
  const bg = palette[hash(name) % palette.length];

  if (image && !error) {
    return (
      <div className={`relative overflow-hidden bg-surface-alt ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          onError={() => setError(true)}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
    );
  }

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
