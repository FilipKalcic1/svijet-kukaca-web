"use client";

import { useEffect, Suspense, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight, Package } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const { clearCart } = useCart();
  const cleared = useRef(false);

  useEffect(() => {
    if (!cleared.current) {
      clearCart();
      cleared.current = true;
    }
  }, [clearCart]);

  return (
    <div className="text-center max-w-md mx-auto">
      <div className="w-20 h-20 bg-accent-50 rounded-2xl border border-accent-100 flex items-center justify-center mb-8 mx-auto">
        <CheckCircle className="w-10 h-10 text-accent-600" />
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-3 tracking-tight">
        Narudžba zaprimljena
      </h1>

      <p className="text-base text-zinc-400 leading-relaxed mb-8">
        {orderId
          ? "Plaćanje je uspješno provedeno. Potvrdu smo poslali na vaš email."
          : "Potvrdu smo poslali na vaš email. Pripremite gotovinu za dostavljača."}
      </p>

      <div className="bg-white rounded-2xl border border-zinc-100 p-6 mb-8">
        <div className="flex items-center justify-center gap-3 text-zinc-500">
          <Package className="w-5 h-5 text-zinc-400" />
          <span className="text-sm font-medium">
            Očekivana dostava: 2-3 radna dana
          </span>
        </div>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-zinc-800 transition-colors tracking-wide"
      >
        Nastavi s kupovinom
        <ArrowRight className="w-4 h-4" />
      </Link>

    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#fafaf8] flex flex-col items-center justify-center p-6">
      <div className="absolute top-8">
        <Link href="/">
          <Image
            src="/images/kayaha-logo.png"
            alt="KAYAHA"
            width={300}
            height={105}
            className="h-12 w-auto object-contain"
          />
        </Link>
      </div>
      <Suspense
        fallback={
          <div className="text-zinc-400 animate-pulse text-sm tracking-wide">
            Učitavanje...
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}
