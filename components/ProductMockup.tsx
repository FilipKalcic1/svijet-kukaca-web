"use client";

import Image from "next/image";
import QRCode from "react-qr-code";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, ScanLine } from "lucide-react";

interface MockupProps {
  frontImage: string;
  bugSlug: string;
}

export const ProductMockup = ({ frontImage, bugSlug }: MockupProps) => {
  const [view, setView] = useState<"front" | "back">("front");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://svijetkukaca.hr";
  const qrUrl = `${baseUrl}/wiki/${bugSlug}`;

  const toggleView = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setView((prev) => (prev === "front" ? "back" : "front"));
  }, []);

  return (
    <div className="relative w-full h-full group">
      {/* Toggle button */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 right-4 z-30 rounded-full shadow-md bg-white/95 hover:bg-white h-10 w-10 transition-transform active:scale-95 border border-zinc-100"
        onClick={toggleView}
      >
        <RefreshCw
          className={`w-4 h-4 text-zinc-700 transition-all duration-500 ${view === "back" ? "rotate-180" : ""}`}
        />
      </Button>

      {/* View label */}
      <div className="absolute top-4 left-4 z-30">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-zinc-100">
          {view === "front" ? "Prednja strana" : "Stražnja strana"}
        </span>
      </div>

      <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden">
        {/* FRONT */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            view === "front"
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <Image
            src={frontImage || "https://placehold.co/600x800/png?text=Nema+Slike"}
            alt="Majica prednja strana"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-4"
            priority
          />
        </div>

        {/* BACK */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            view === "back"
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/mockups/tshirt-back-base.jpg"
              alt="Pozadina"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover blur-[2px] opacity-60"
            />
          </div>

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6">
            <div className="bg-white p-5 rounded-2xl shadow-2xl border border-zinc-100">
              <QRCode
                value={qrUrl}
                size={150}
                fgColor="#1a1a1a"
                bgColor="#ffffff"
                level="L"
              />
              <div className="flex items-center justify-center gap-2 mt-4 text-zinc-400">
                <ScanLine size={14} className="animate-pulse text-accent-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  Skeniraj Priču
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
