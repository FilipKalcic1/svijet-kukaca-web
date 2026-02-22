"use client";

import { useCart } from "@/context/CartContext";
import { X, ShoppingBag, Trash2, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, cartTotal, cartCount, isCartOpen, closeCart } = useCart();

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-99"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-100 flex flex-col animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-label="Košarica"
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-[#FDFBF7]">
          <h2 className="text-xl font-black text-zinc-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Tvoja košarica
            {cartCount > 0 && (
              <span className="text-sm font-medium text-zinc-400">
                ({cartCount})
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-zinc-200 rounded-full transition-colors"
            aria-label="Zatvori košaricu"
          >
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-zinc-400">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p>Košarica je prazna.</p>
              <Button onClick={closeCart} variant="outline">
                Zatvori
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-start p-3 rounded-xl bg-zinc-50 border border-zinc-100"
              >
                <div className="relative w-20 h-24 bg-white rounded-lg overflow-hidden shrink-0 border border-zinc-200">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-zinc-900 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Vel: {item.size}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-zinc-200 rounded-full h-8 bg-white">
                      <button
                        onClick={() =>
                          item.quantity > 1
                            ? updateQuantity(item.id, item.quantity - 1)
                            : removeItem(item.id)
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 text-zinc-500 transition-colors"
                        aria-label="Smanji količinu"
                      >
                        {item.quantity === 1 ? (
                          <Trash2 className="w-3 h-3 text-red-400" />
                        ) : (
                          <Minus className="w-3 h-3" />
                        )}
                      </button>
                      <span className="w-6 text-center text-sm font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 text-zinc-500 transition-colors"
                        aria-label="Povećaj količinu"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-bold text-sm text-zinc-900">
                      {(item.price * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-zinc-100 bg-[#FDFBF7]">
            <div className="flex justify-between items-center mb-2 text-sm text-zinc-500">
              <span>Dostava</span>
              <span className="text-green-600 font-bold">Besplatna</span>
            </div>
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
