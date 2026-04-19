"use client";

import { useState } from "react";
import { ProductMockup } from "@/components/ProductMockup";
import { Button } from "@/components/ui/button";
import {
  Truck, ArrowLeft, Package,
  Share2, Minus, Plus, ShieldCheck, ShoppingBag, CreditCard,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface Creature {
  id: number;
  name_hr: string;
  name_science: string;
  price: number;
  description: string;
  category: string;
  image_url: string | null;
  product_front_image?: string | null;
  slug: string;
  creature_type?: string;
}

function getSafeImage(prod: Creature) {
  if (prod.product_front_image && prod.product_front_image.length > 5) return prod.product_front_image;
  if (prod.image_url && prod.image_url.length > 5) return prod.image_url;
  return "https://placehold.co/600x800/png?text=Nema+Slike";
}

export default function ProductDetails({ product }: { product: Creature }) {
  const { addItem, openCart, cartCount } = useCart();
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const activeImage = getSafeImage(product);
  const backPath = product.creature_type === "fish" ? "/ribe" : "/kukci";
  const isFish = product.creature_type === "fish";
  const siteName = isFish ? "Svijet Riba" : "Svijet Kukaca";

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: `${siteName} - ${product.name_hr}`,
      text: `Pogledaj ovu majicu: ${product.name_hr}`,
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
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-accent-300 selection:text-black">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur border-b border-zinc-100 h-16 flex items-center px-4 md:px-6 justify-between">
        <Link href={backPath} className="flex items-center gap-2 text-zinc-500 hover:text-black transition-colors p-2 -ml-2 rounded-full hover:bg-zinc-100">
          <ArrowLeft size={20} />
          <span className="font-medium hidden sm:inline">Natrag</span>
        </Link>
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/images/kayaha-logo.png"
            alt="KAYAHA"
            width={90}
            height={30}
            className="h-7 w-auto object-contain"
          />
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleShare} className="md:hidden text-zinc-600">
            <Share2 size={20} />
          </Button>
          <Button variant="ghost" size="icon" onClick={openCart} className="relative text-zinc-600">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
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
                <p className="text-xs font-bold text-accent-600 uppercase tracking-widest mb-2 bg-accent-50 inline-block px-2 py-1 rounded-md">
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

            <p className="text-zinc-600 leading-relaxed text-base md:text-lg border-l-2 border-accent-300 pl-4">
              {product.description}
            </p>

            {/* Size selector */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-sm">Odaberi veličinu</span>
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
            <Button
              onClick={handleAddToCart}
              className="w-full h-14 text-lg rounded-full bg-black hover:bg-accent-600 hover:text-white transition-all shadow-xl hover:shadow-accent-300/30 font-bold active:scale-95"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Dodaj u košaricu
            </Button>

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-zinc-100">
              <div className="flex flex-col items-center text-center gap-1.5">
                <Truck className="w-4 h-4 text-zinc-400" />
                <span className="text-[11px] text-zinc-500 font-medium leading-tight">Dostava 2-3 dana</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <CreditCard className="w-4 h-4 text-zinc-400" />
                <span className="text-[11px] text-zinc-500 font-medium leading-tight">Kartica ili pouzećem</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-zinc-400" />
                <span className="text-[11px] text-zinc-500 font-medium leading-tight">Sigurna kupovina</span>
              </div>
            </div>

            {/* Product details */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Detalji proizvoda</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-zinc-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Package className="w-4 h-4 text-zinc-400" />
                    <span className="text-sm font-semibold text-zinc-900">Materijal</span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">100% organski pamuk, 220 g/m2, relaxed kroj</p>
                </div>
                <div className="bg-zinc-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Truck className="w-4 h-4 text-zinc-400" />
                    <span className="text-sm font-semibold text-zinc-900">Dostava</span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">GLS, 2-3 radna dana. Besplatno iznad 50 €.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
