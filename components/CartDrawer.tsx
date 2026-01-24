"use client";

import { useCart } from "@/context/CartContext"; // Pazi da je ovo točna putanja do contexta!
import { X, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// 👇 OVO JE KLJUČNO: Mora pisati "export default"
export default function CartDrawer() {
  const { items, removeItem, cartTotal, isCartOpen, closeCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Pozadina */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-99" 
        onClick={closeCart}
      />

      {/* Ladica */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-100 flex flex-col animate-in slide-in-from-right duration-300">
        
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-[#FDFBF7]">
          <h2 className="text-xl font-black text-zinc-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Tvoja košarica
          </h2>
          <button onClick={closeCart} className="p-2 hover:bg-zinc-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-zinc-400">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p>Košarica je prazna.</p>
              <Button onClick={closeCart} variant="outline">Zatvori</Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="relative w-20 h-24 bg-zinc-100 rounded-lg overflow-hidden shrink-0 border border-zinc-200">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-zinc-900 line-clamp-1">{item.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-green-700">{item.price} €</span>
                    <button onClick={() => removeItem(item.id)} className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1">
                      <Trash2 className="w-3 h-3" /> Ukloni
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-zinc-100 bg-[#FDFBF7]">
            <div className="flex justify-between items-center mb-4 text-lg font-black text-zinc-900">
              <span>Ukupno:</span>
              <span>{cartTotal.toFixed(2)} €</span>
            </div>
            <Link href="/checkout" onClick={closeCart}>
              <Button className="w-full h-12 text-lg rounded-full bg-green-600 hover:bg-green-700 shadow-lg">
                Dovrši kupnju
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}