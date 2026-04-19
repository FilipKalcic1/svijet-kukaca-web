"use client";

import { useCart } from "@/context/CartContext";
import { X, ShoppingBag, Minus, Plus, ArrowRight, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    cartTotal,
    cartCount,
    isCartOpen,
    closeCart,
  } = useCart();

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
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-99"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 right-0 w-full max-w-md bg-[#fafaf8] shadow-2xl z-100 flex flex-col animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-label="Košarica"
      >
        {/* Header */}
        <div className="px-6 h-18 bg-white border-b border-zinc-100 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Košarica
            {cartCount > 0 && (
              <span className="text-[10px] font-bold text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-full tracking-wide">
                {cartCount}
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="w-9 h-9 flex items-center justify-center hover:bg-zinc-100 rounded-full transition-colors"
            aria-label="Zatvori košaricu"
          >
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-6 gap-4">
              <div className="w-18 h-18 bg-white rounded-2xl border border-zinc-100 flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-zinc-200" />
              </div>
              <p className="text-sm text-zinc-400 font-medium">
                Košarica je prazna
              </p>
              <button
                onClick={closeCart}
                className="text-sm font-semibold text-accent-600 hover:text-accent-700 transition-colors"
              >
                Nastavi s kupovinom
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-zinc-100">
                  {/* Image */}
                  <div className="relative w-18 h-22 bg-[#fafaf8] rounded-xl overflow-hidden shrink-0 border border-zinc-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="72px"
                      className="object-contain p-1"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-zinc-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          Veličina: {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-full text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
                        aria-label={`Ukloni ${item.name}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center h-8 border border-zinc-200 rounded-full bg-[#fafaf8]">
                        <button
                          onClick={() =>
                            item.quantity > 1
                              ? updateQuantity(item.id, item.quantity - 1)
                              : removeItem(item.id)
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-zinc-500 transition-colors"
                          aria-label="Smanji količinu"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-zinc-500 transition-colors"
                          aria-label="Povećaj količinu"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-zinc-900 tabular-nums">
                        {(item.price * item.quantity).toFixed(2)} €
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="shrink-0 bg-white border-t border-zinc-100 p-5 space-y-4">
            <div className="flex justify-between items-center text-sm text-zinc-500">
              <span>Dostava</span>
              <span className="text-accent-600 font-semibold">Besplatna</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-semibold text-zinc-500">
                Ukupno
              </span>
              <span className="text-xl font-black text-zinc-900 tabular-nums">
                {cartTotal.toFixed(2)} €
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full h-13 bg-black text-white font-bold rounded-full text-sm hover:bg-zinc-800 active:scale-[0.98] transition-all shadow-lg tracking-wide"
            >
              Nastavi na naplatu
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center justify-center gap-2 pt-1">
              <Leaf className="w-3 h-3 text-zinc-300" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-300">KAYAHA</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
