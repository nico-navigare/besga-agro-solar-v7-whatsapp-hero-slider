"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [selected, setSelected] = useState(0);
  const current = images[selected] || images[0];

  return (
    <div className="grid gap-4 lg:grid-cols-[84px_minmax(0,1fr)]">
      {images.length > 1 ? (
        <div className="order-2 flex gap-3 overflow-x-auto pb-1 lg:order-1 lg:max-h-[640px] lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden">
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setSelected(index)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border transition ${
                selected === index ? "border-slate-900 ring-1 ring-slate-900" : "border-slate-200"
              }`}
              aria-label={`Ver imagen ${index + 1}`}
            >
              <Image src={src} alt={`${alt} miniatura ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}

      <div className="order-1">
        <div className="relative aspect-[4/4.2] overflow-hidden rounded-3xl border bg-slate-50 sm:aspect-[4/3.5] lg:min-h-[640px]">
          {current ? (
            <Image src={current} alt={alt} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
              Sin imagen
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
