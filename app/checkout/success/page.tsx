"use client";

import { useEffect, Suspense, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Bug } from "lucide-react";
import { useCart } from "@/context/CartContext";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const { clearCart } = useCart();
  const cleared = useRef(false);

  useEffect(() => {
    // Only clear once to avoid re-renders
    if (!cleared.current) {
      clearCart();
      cleared.current = true;
    }
  }, [clearCart]);

  return (
    <div className="text-center animate-in zoom-in duration-500">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
      <h1 className="text-4xl font-black text-zinc-900 mb-4">
        Uspješna narudžba!
      </h1>
      <p className="text-lg text-zinc-500 max-w-md mx-auto mb-8">
        Hvala vam na kupnji. Potvrdu narudžbe poslali smo na vaš email.
        {orderId
          ? " Plaćanje je uspješno provedeno."
          : " Paket stiže uskoro, pripremite gotovinu."}
      </p>
      <Link
        href="/"
        className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-zinc-800 transition-transform hover:scale-105 shadow-xl"
      >
        Povratak na naslovnicu
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="flex items-center gap-2 absolute top-6 left-6">
        <div className="w-8 h-8 bg-green-300 rounded-full flex items-center justify-center">
          <Bug className="w-5 h-5 text-black" />
        </div>
        <span className="font-bold text-xl tracking-tight text-zinc-900">
          Svijet Kukaca
        </span>
      </div>
      <Suspense
        fallback={
          <div className="text-zinc-400 animate-pulse">Učitavanje...</div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}
