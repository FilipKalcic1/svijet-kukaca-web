"use client";

import Image from "next/image";
import QRCode from "react-qr-code";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, ScanLine } from "lucide-react"; // Dodali smo ikonu za skeniranje

interface MockupProps {
  frontImage: string;
  bugSlug: string;
}

export const ProductMockup = ({ frontImage, bugSlug }: MockupProps) => {
  const [view, setView] = useState<'front' | 'back'>('front');
  const qrUrl = `https://svijet-kukaca.hr/wiki/${bugSlug}`;

  return (
    <div className="relative w-full h-full group perspective-1000">
      
      {/* Gumb za okretanje */}
      <Button 
        variant="secondary" 
        size="icon" 
        className="absolute top-3 right-3 z-30 rounded-full shadow-md bg-white/90 hover:bg-white h-8 w-8 transition-transform active:scale-95"
        onClick={(e) => {
          e.preventDefault();
          setView(view === 'front' ? 'back' : 'front');
        }}
      >
        <RefreshCw className={`w-4 h-4 text-zinc-900 transition-all duration-500 ${view === 'back' ? 'rotate-180' : ''}`} />
      </Button>

      <div className="relative w-full h-full bg-zinc-50 rounded-3xl overflow-hidden shadow-inner">
        
        {/* --- PREDNJA STRANA --- */}
        {view === 'front' && (
          <div className="relative w-full h-full animate-in fade-in zoom-in-95 duration-300">
            <Image
              src={frontImage || "/placeholder-bug.png"} 
              alt="Majica prednja strana"
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* --- STRAŽNJA STRANA (FOKUS NA QR KOD) --- */}
        {view === 'back' && (
          <div className="relative w-full h-full animate-in fade-in slide-in-from-right-4 duration-300">
            
            {/* 1. POZADINA: Zamućena majica (Daje kontekst) */}
            <div className="absolute inset-0 z-0">
                <Image
                src="/images/tshirt-back-base.jpg" 
                alt="Pozadina"
                fill
                className="object-cover blur-[2px] opacity-60" // Zamućujemo da istaknemo kod
                />
            </div>
            
            {/* 2. GLAVNI DOGAĐAJ: VELIKI SKENIRAJUĆI KOD */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6">
              
              <div className="bg-white p-4 rounded-xl shadow-2xl transform transition-transform hover:scale-105 border border-zinc-100">
                <QRCode 
                  value={qrUrl} 
                  size={140} // PUNO VEĆI KOD! Sada se može skenirati.
                  fgColor="#1a1a1a"      
                  bgColor="#ffffff" 
                  level="L"
                />
                
                <div className="flex items-center justify-center gap-2 mt-3 text-zinc-500">
                    <ScanLine size={14} className="animate-pulse text-green-500"/>
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                        Skeniraj Priču
                    </span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};