"use client";

import { useState, type MouseEvent } from "react";

/** Galeria com miniaturas + zoom no hover (segue o cursor). */
export function ProductGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {/* Miniaturas */}
      <div className="flex gap-3 md:flex-col">
        {images.map((g, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Imagem ${i + 1}`}
            className={`h-16 w-16 shrink-0 rounded-sm bg-cover bg-center transition-all ${
              active === i
                ? "ring-2 ring-gold"
                : "ring-1 ring-line hover:ring-ink"
            }`}
            style={{ backgroundImage: g }}
          />
        ))}
      </div>

      {/* Imagem principal */}
      <div
        className="relative aspect-[4/5] flex-1 cursor-zoom-in overflow-hidden rounded-sm bg-sand"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out"
          style={{
            backgroundImage: images[active],
            transformOrigin: origin,
            transform: zoom ? "scale(1.8)" : "scale(1)",
          }}
        />
      </div>
    </div>
  );
}
