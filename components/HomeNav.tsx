"use client";

import { Bug, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function HomeNav() {
  const { cartCount, openCart } = useCart();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-300 rounded-full flex items-center justify-center">
            <Bug className="w-5 h-5 text-black" />
          </div>
          <span className="font-bold text-xl tracking-tight">Svijet Kukaca</span>
        </div>
        <Button
          variant="outline"
          onClick={openCart}
          className="rounded-full hover:bg-zinc-100 transition-colors flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          Košarica {cartCount > 0 && `(${cartCount})`}
        </Button>
      </div>
    </nav>
  );
}
