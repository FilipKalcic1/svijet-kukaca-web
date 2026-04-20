"use client";

import { Bug, Fish, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import type { ThemeConfig } from "@/lib/themes";
import { INSECT_THEME } from "@/lib/themes";

export default function HomeNav({ theme = INSECT_THEME }: { theme?: ThemeConfig }) {
  const { cartCount, openCart } = useCart();
  const isFish = theme.icon === "fish";

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center shrink-0" aria-label="KAYAHA">
          <Image
            src="/images/kayaha-logo.png"
            alt="KAYAHA"
            width={800}
            height={292}
            className="h-7 md:h-8 w-auto object-contain"
            priority
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/kukci"
            aria-label="Svijet Kukaca"
            aria-current={!isFish ? "page" : undefined}
            className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${
              !isFish
                ? "bg-green-500 text-white shadow-md shadow-green-500/30"
                : "bg-green-50 text-green-600 hover:bg-green-500 hover:text-white"
            }`}
          >
            <Bug className="w-5 h-5 md:w-5.5 md:h-5.5" />
          </Link>
          <Link
            href="/ribe"
            aria-label="Svijet Riba"
            aria-current={isFish ? "page" : undefined}
            className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${
              isFish
                ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                : "bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white"
            }`}
          >
            <Fish className="w-5 h-5 md:w-5.5 md:h-5.5" />
          </Link>
          <Link
            href="/clanci"
            className="hidden md:inline-flex items-center text-sm font-medium text-zinc-500 hover:text-black transition-colors px-3 py-1.5 rounded-full hover:bg-zinc-100"
          >
            Članci
          </Link>
        </div>

        <button
          type="button"
          onClick={openCart}
          aria-label="Košarica"
          className="relative w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors shrink-0"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
