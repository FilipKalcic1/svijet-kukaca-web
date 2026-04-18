"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
  altPrefix: string;
}

export default function ImageLightbox({ images, altPrefix }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const isOpen = openIndex !== null;

  const goNext = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex + 1) % images.length);
  };

  const goPrev = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((url, i) => (
          <button
            key={i}
            onClick={() => setOpenIndex(i)}
            className="relative aspect-square rounded-xl overflow-hidden bg-zinc-50 cursor-zoom-in group"
          >
            <Image
              src={url}
              alt={`${altPrefix} - slika ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </button>
        ))}
      </div>

      {/* Lightbox overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={() => setOpenIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setOpenIndex(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Zatvori"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Prethodna slika"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative w-[90vw] h-[80vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[openIndex!]}
              alt={`${altPrefix} - slika ${openIndex! + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Sljedeća slika"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {openIndex! + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
