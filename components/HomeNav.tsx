"use client";

import { Bug, Fish, ShoppingBag, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import type { ThemeConfig } from "@/lib/themes";
import { INSECT_THEME } from "@/lib/themes";

export default function HomeNav({ theme = INSECT_THEME }: { theme?: ThemeConfig }) {
  const { cartCount, openCart } = useCart();
  const Icon = theme.icon === "fish" ? Fish : Bug;
  const otherWorld = theme.icon === "fish"
    ? { path: "/kukci", label: "Kukci", Icon: Bug }
    : { path: "/ribe", label: "Ribe", Icon: Fish };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={theme.basePath} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent-300 rounded-full flex items-center justify-center">
              <Icon className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-xl tracking-tight">{theme.label}</span>
          </Link>
          <div className="hidden sm:flex items-center gap-1 text-sm ml-2">
            <Link
              href="/"
              className="text-zinc-400 hover:text-black transition-colors px-2 py-1 rounded-md hover:bg-zinc-100"
            >
              <Home className="w-4 h-4" />
            </Link>
            <Link
              href={otherWorld.path}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-black transition-colors px-3 py-1.5 rounded-full hover:bg-zinc-100"
            >
              <otherWorld.Icon className="w-3.5 h-3.5" />
              <span className="font-medium">{otherWorld.label}</span>
            </Link>
            <Link
              href="/clanci"
              className="text-zinc-400 hover:text-black transition-colors px-3 py-1.5 rounded-md hover:bg-zinc-100 font-medium"
            >
              Članci
            </Link>
          </div>
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
