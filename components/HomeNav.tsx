"use client";

import { Bug, Fish, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import type { ThemeConfig } from "@/lib/themes";
import { INSECT_THEME } from "@/lib/themes";

export default function HomeNav({ theme = INSECT_THEME }: { theme?: ThemeConfig }) {
  const { cartCount, openCart } = useCart();
  const otherWorld = theme.icon === "fish"
    ? { path: "/kukci", label: "Kukci", Icon: Bug }
    : { path: "/ribe", label: "Ribe", Icon: Fish };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 h-36 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/kayaha-logo.png"
              alt="KAYAHA"
              width={400}
              height={144}
              className="h-32 w-auto object-contain"
              priority
            />
          </Link>
          <div className="hidden sm:flex items-center gap-1 text-sm">
            <Link
              href={theme.basePath}
              className="text-black font-semibold transition-colors px-3 py-1.5 rounded-full bg-accent-50"
            >
              {theme.label}
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
