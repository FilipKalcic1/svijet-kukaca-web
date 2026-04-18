"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";

type ShareProps = {
  title: string;
  text: string;
};

export default function ShareButton({ title, text }: ShareProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // 1. Probaj koristiti native share (mobiteli)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      // 2. Fallback za desktop (kopiraj link)
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch {
        // Clipboard API not available
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Vrati ikonu nakon 2 sekunde
    }
  };

  return (
    <button
      onClick={handleShare}
      className="group flex items-center justify-center w-8 h-8 text-zinc-500 hover:text-accent-700 transition-colors bg-white rounded-full border border-zinc-200 hover:border-accent-300 shadow-sm"
      aria-label="Podijeli"
      title={copied ? "Kopirano!" : "Podijeli"}
    >
      {copied ? (
        <Check className="w-4 h-4 text-accent-600" />
      ) : (
        <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
      )}
    </button>
  );
}