"use client";

import { useState } from "react";
import { ProductMockup } from "@/components/ProductMockup";
import { Button } from "@/components/ui/button";
import {
  Truck, ArrowLeft, Package,
  Share2, Minus, Plus, ShieldCheck, ShoppingBag, CreditCard, Leaf, ScanLine,
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
    <div className="min-h-screen bg-[#fafaf8] font-sans text-zinc-900 selection:bg-accent-300 selection:text-black">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100 h-36 flex items-center px-4 md:px-6 justify-between">
        <Link href={backPath} className="flex items-center gap-2 text-zinc-400 hover:text-black transition-colors p-2 -ml-2 rounded-full hover:bg-zinc-50">
          <ArrowLeft size={20} />
          <span className="font-medium hidden sm:inline text-sm tracking-wide">Natrag</span>
        </Link>
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/images/kayaha-logo.png"
            alt="KAYAHA"
            width={400}
            height={144}
            className="h-32 w-auto object-contain"
          />
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleShare} className="md:hidden text-zinc-400 hover:text-black">
            <Share2 size={20} />
          </Button>
          <Button variant="ghost" size="icon" onClick={openCart} className="relative text-zinc-400 hover:text-black">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </nav>

      <main className="pt-44 pb-32 max-w-7xl mx-auto px-4 md:px-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-8 tracking-wide">
          <Link href="/" className="hover:text-black transition-colors">KAYAHA</Link>
          <span>/</span>
          <Link href={backPath} className="hover:text-black transition-colors uppercase">{isFish ? "Ribe" : "Kukci"}</Link>
          <span>/</span>
          <span className="text-zinc-700 font-medium">{product.name_hr}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT - mockup */}
          <div className="relative w-full aspect-3/4 bg-white rounded-2xl lg:sticky lg:top-36 overflow-hidden shadow-sm border border-zinc-100">
            <ProductMockup frontImage={activeImage} bugSlug={product.slug} />
          </div>

          {/* RIGHT - details */}
          <div className="flex flex-col space-y-8 pt-2 lg:pt-4">

            {/* Category + Share */}
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold text-accent-600 uppercase tracking-[0.2em] bg-accent-50 px-3 py-1.5 rounded-full border border-accent-100">
                    {product.category}
                  </span>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-100">
                    {isFish ? "Svijet Riba" : "Svijet Kukaca"}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black mb-2 leading-[1.1]">
                  {product.name_hr}
                </h1>
                <p className="text-lg text-zinc-400 italic font-serif">{product.name_science}</p>
              </div>
              <Button variant="outline" size="icon" onClick={handleShare} className="hidden md:flex rounded-full border-zinc-200 hover:bg-zinc-50 shrink-0">
                <Share2 size={18} className="text-zinc-400" />
              </Button>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold tracking-tight">{product.price.toFixed(2)} €</span>
              <span className="text-sm text-zinc-400 font-medium">uklj. PDV</span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-zinc-100" />

            {/* Description */}
            <p className="text-zinc-600 leading-relaxed text-base md:text-[17px]">
              {product.description}
            </p>

            {/* Highlights strip */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2">
                <Leaf className="w-3.5 h-3.5 text-accent-500" />
                <span className="text-xs font-semibold text-zinc-600">100% organski pamuk</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2">
                <ScanLine className="w-3.5 h-3.5 text-accent-500" />
                <span className="text-xs font-semibold text-zinc-600">QR kod s pričom</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-zinc-100 rounded-full px-4 py-2">
                <Truck className="w-3.5 h-3.5 text-accent-500" />
                <span className="text-xs font-semibold text-zinc-600">Dostava 2-3 dana</span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-zinc-100" />

            {/* Size selector */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-sm uppercase tracking-wider text-zinc-500">Veličina</span>
                </div>
                <div className="grid grid-cols-5 gap-2 md:gap-3">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-13 rounded-xl font-semibold border-2 transition-all text-sm md:text-base ${
                        selectedSize === size
                          ? "border-black bg-black text-white shadow-lg shadow-black/10"
                          : "border-zinc-200 text-zinc-500 hover:border-zinc-400 bg-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <span className="font-bold text-sm uppercase tracking-wider text-zinc-500 mb-3 block">Količina</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-zinc-200 rounded-full h-13 w-36 justify-between px-2 bg-white">
                    <button onClick={() => setQuantity((p) => (p > 1 ? p - 1 : 1))} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-zinc-100 text-zinc-500 transition-colors">
                      <Minus size={16} />
                    </button>
                    <span className="font-bold text-lg w-6 text-center">{quantity}</span>
                    <button onClick={() => setQuantity((p) => p + 1)} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-zinc-100 text-zinc-500 transition-colors">
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="text-sm text-zinc-400">
                    Ukupno: <span className="text-black font-bold text-base">{(product.price * quantity).toFixed(2)} €</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Add to cart */}
            <Button
              onClick={handleAddToCart}
              className="w-full h-14 text-base rounded-full bg-black hover:bg-accent-600 transition-all shadow-xl hover:shadow-accent-300/30 font-bold tracking-wide active:scale-[0.98]"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Dodaj u košaricu — {(product.price * quantity).toFixed(2)} €
            </Button>

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-4 py-6 border border-zinc-100 rounded-2xl bg-white">
              <div className="flex flex-col items-center text-center gap-2 px-2">
                <div className="w-9 h-9 bg-zinc-50 rounded-full flex items-center justify-center">
                  <Truck className="w-4 h-4 text-zinc-400" />
                </div>
                <span className="text-[11px] text-zinc-500 font-medium leading-tight">Dostava 2-3 dana</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 px-2">
                <div className="w-9 h-9 bg-zinc-50 rounded-full flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-zinc-400" />
                </div>
                <span className="text-[11px] text-zinc-500 font-medium leading-tight">Kartica ili pouzeće</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 px-2">
                <div className="w-9 h-9 bg-zinc-50 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-zinc-400" />
                </div>
                <span className="text-[11px] text-zinc-500 font-medium leading-tight">Sigurna kupovina</span>
              </div>
            </div>

            {/* Product details */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Detalji proizvoda</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white rounded-2xl p-5 border border-zinc-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-accent-500" />
                    <span className="text-sm font-bold text-zinc-900">Materijal</span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">100% organski pamuk, 220 g/m², relaxed kroj</p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-zinc-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4 text-accent-500" />
                    <span className="text-sm font-bold text-zinc-900">Dostava</span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">GLS, 2-3 radna dana. Besplatno iznad 50 €.</p>
                </div>
              </div>
            </div>

            {/* KAYAHA tagline */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <div className="h-px flex-1 bg-zinc-100" />
              <div className="flex items-center gap-2">
                <Leaf className="w-3.5 h-3.5 text-accent-400" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-300">
                  Elevated Style · Natural Spirit
                </span>
              </div>
              <div className="h-px flex-1 bg-zinc-100" />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
