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
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-3 right-3 z-30 rounded-full shadow-md bg-white/90 hover:bg-white h-8 w-8 transition-transform active:scale-95"
        onClick={toggleView}
      >
        <RefreshCw
          className={`w-4 h-4 text-zinc-900 transition-all duration-500 ${view === "back" ? "rotate-180" : ""}`}
        />
      </Button>

      <div className="relative w-full h-full bg-zinc-50 rounded-3xl overflow-hidden shadow-inner">
        {/* FRONT - always mounted, toggled via CSS for smooth mobile transitions */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
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
            className="object-cover"
            priority
          />
        </div>

        {/* BACK - always mounted, toggled via CSS for smooth mobile transitions */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
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
            <div className="bg-white p-4 rounded-xl shadow-2xl border border-zinc-100">
              <QRCode
                value={qrUrl}
                size={140}
                fgColor="#1a1a1a"
                bgColor="#ffffff"
                level="L"
              />
              <div className="flex items-center justify-center gap-2 mt-3 text-zinc-500">
                <ScanLine size={14} className="animate-pulse text-green-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
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
