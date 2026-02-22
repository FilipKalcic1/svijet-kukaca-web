"use client";

import { useState } from "react";
import { ProductMockup } from "@/components/ProductMockup";
import { Button } from "@/components/ui/button";
import {
  Truck, Ruler, ArrowLeft,
  Share2, Minus, Plus, Lock, ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface Insect {
  id: number;
  name_hr: string;
  name_science: string;
  price: number;
  description: string;
  category: string;
  image_url: string | null;
  product_front_image?: string | null;
  slug: string;
}

function getSafeImage(prod: Insect) {
  if (prod.product_front_image && prod.product_front_image.length > 5) return prod.product_front_image;
  if (prod.image_url && prod.image_url.length > 5) return prod.image_url;
  return "https://placehold.co/600x800/png?text=Nema+Slike";
}

export default function ProductDetails({ product }: { product: Insect }) {
  const { addItem, openCart, cartCount } = useCart();
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const activeImage = getSafeImage(product);

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: `Svijet Kukaca - ${product.name_hr}`,
      text: `Pogledaj ovu super majicu s kukcem: ${product.name_hr}`,
      url,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  const handleAddToCart = () => {
    addItem(
      {
        id: `${product.id}-${selectedSize}`,
        name: `${product.name_hr} (Majica)`,
        price: product.price,
        image: activeImage,
        size: selectedSize,
      },
      quantity
    );
    openCart();
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-green-300 selection:text-black">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur border-b border-zinc-100 h-16 flex items-center px-4 md:px-6 justify-between">
        <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-black transition-colors p-2 -ml-2 rounded-full hover:bg-zinc-100">
          <ArrowLeft size={20} />
          <span className="font-medium hidden sm:inline">Natrag na Shop</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleShare} className="md:hidden text-zinc-600">
            <Share2 size={20} />
          </Button>
          <Button variant="ghost" size="icon" onClick={openCart} className="relative text-zinc-600">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </nav>

      <main className="pt-28 pb-32 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

          {/* LEFT - mockup */}
          <div className="relative w-full aspect-3/4 bg-zinc-50 rounded-3xl lg:sticky lg:top-24 overflow-hidden shadow-inner border border-zinc-100">
            <ProductMockup frontImage={activeImage} bugSlug={product.slug} />
          </div>

          {/* RIGHT - details */}
          <div className="flex flex-col space-y-10 pt-4 lg:pt-8">

            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2 bg-green-50 inline-block px-2 py-1 rounded-md">
                  {product.category}
                </p>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-black mb-2 leading-tight">
                  {product.name_hr}
                </h1>
                <p className="text-lg text-zinc-400 italic font-serif">{product.name_science}</p>
              </div>
              <Button variant="outline" size="icon" onClick={handleShare} className="hidden md:flex rounded-full border-zinc-200 hover:bg-zinc-50">
                <Share2 size={18} className="text-zinc-600" />
              </Button>
            </div>

            <div className="text-3xl font-bold">{product.price.toFixed(2)} €</div>

            <p className="text-zinc-600 leading-relaxed text-base md:text-lg border-l-2 border-green-300 pl-4">
              {product.description || "Ovaj kukac je poseban i nosi jedinstvenu priču..."}
            </p>

            {/* Size selector */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-sm">Odaberi veličinu</span>
                  <button className="text-xs text-zinc-400 underline hover:text-black decoration-dotted">Tablica veličina</button>
                </div>
                <div className="grid grid-cols-5 gap-2 md:gap-3">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 rounded-lg font-medium border transition-all text-sm md:text-base ${
                        selectedSize === size
                          ? "border-black bg-black text-white shadow-lg"
                          : "border-zinc-200 text-zinc-600 hover:border-zinc-400 bg-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <span className="font-bold text-sm mb-3 block">Količina</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-zinc-200 rounded-full h-12 w-32 justify-between px-2 bg-zinc-50">
                    <button onClick={() => setQuantity((p) => (p > 1 ? p - 1 : 1))} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-zinc-600 transition-colors">
                      <Minus size={16} />
                    </button>
                    <span className="font-bold text-lg w-4 text-center">{quantity}</span>
                    <button onClick={() => setQuantity((p) => p + 1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-zinc-600 transition-colors">
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="text-sm text-zinc-400">
                    Ukupno: <span className="text-black font-bold">{(product.price * quantity).toFixed(2)} €</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Add to cart */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                className="w-full h-14 text-lg rounded-full bg-black hover:bg-green-600 hover:text-white transition-all shadow-xl hover:shadow-green-300/30 font-bold active:scale-95"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Dodaj u Košaricu
              </Button>

              <div className="flex flex-col items-center gap-3 pt-4 mt-4 border-t border-zinc-100">
                <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-400">
                  <Lock size={12} />
                  <span>Sigurno plaćanje i pouzeće</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-help">
                  <div className="h-6 px-2 border border-zinc-300 rounded flex items-center justify-center bg-zinc-50" title="Visa">
                    <span className="text-[10px] font-bold tracking-tighter italic text-black">VISA</span>
                  </div>
                  <div className="h-6 px-2 border border-zinc-300 rounded flex items-center justify-center bg-zinc-50" title="Mastercard">
                    <div className="flex -space-x-1">
                      <div className="w-3 h-3 rounded-full bg-zinc-800"></div>
                      <div className="w-3 h-3 rounded-full bg-zinc-400"></div>
                    </div>
                  </div>
                  <div className="h-6 px-2 border border-zinc-300 rounded flex items-center justify-center bg-zinc-50 gap-1" title="Apple Pay">
                    <span className="text-[10px] font-bold text-black">Pay</span>
                  </div>
                  <div className="h-6 px-2 border border-zinc-300 rounded flex items-center justify-center bg-zinc-50" title="Google Pay">
                    <span className="text-[10px] font-bold text-black">GPay</span>
                  </div>
                  <div className="h-6 px-2 border border-zinc-300 rounded flex items-center justify-center bg-zinc-50" title="Plaćanje pouzećem">
                    <Truck size={12} className="text-black" />
                  </div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="border-t border-zinc-100 mt-10 space-y-6 pt-10">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center">
                  <Ruler className="w-5 h-5 text-zinc-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Kroj i Materijal</h4>
                  <p className="text-sm text-zinc-500 mt-1">100% organski pamuk (220 gsm). Relaxed fit.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-zinc-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Brza Dostava</h4>
                  <p className="text-sm text-zinc-500 mt-1">GLS dostava 2-3 radna dana.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
