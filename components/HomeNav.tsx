"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import NavMenu from "@/components/NavMenu";

export default function HomeNav() {
  const { cartCount, openCart } = useCart();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
        <NavMenu />

        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center"
          aria-label="KAYAHA"
        >
          <Image
            src="/images/kayaha-logo.png"
            alt="KAYAHA"
            width={800}
            height={292}
            className="h-10 md:h-12 w-auto object-contain"
            priority
          />
        </Link>

        <button
          type="button"
          onClick={openCart}
          aria-label="Košarica"
          className="relative w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-zinc-900 hover:bg-zinc-100 transition-colors shrink-0"
        >
          <ShoppingBag className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
