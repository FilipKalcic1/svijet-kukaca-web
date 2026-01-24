"use client";

import { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const { clearCart } = useCart();

  useEffect(() => {
    // 1. Očisti košaricu čim se stranica učita
    clearCart();

    // 2. Ako postoji order_id (znači vratili smo se sa Stripea), 
    // ažuriraj status narudžbe u bazi na 'paid'
    // (NAPOMENA: U velikim sustavima ovo se radi preko Webhooka radi sigurnosti)
    const updateOrderStatus = async () => {
      if (orderId) {
        await supabase
          .from('orders')
          .update({ status: 'paid', payment_method: 'stripe' })
          .eq('id', orderId);
      }
    };

    updateOrderStatus();
  }, [clearCart, orderId]);

  return (
    <div className="text-center animate-in zoom-in duration-500">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
      <h1 className="text-4xl font-black text-zinc-900 mb-4">Uspješna narudžba!</h1>
      <p className="text-lg text-zinc-500 max-w-md mx-auto mb-8">
        Hvala vam na kupnji. Potvrdu narudžbe poslali smo na vaš email.
        {orderId ? " Plaćanje je uspješno provedeno." : " Paket stiže uskoro, pripremite gotovinu."}
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
      <Suspense fallback={<div>Učitavanje...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}