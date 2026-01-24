"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "@/app/actions/createOrder"; 
import { createStripeSession } from "@/app/actions/createStripeSession"; 
import { ArrowLeft, Loader2, CreditCard, Truck, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext"; 

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart } = useCart(); 
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'stripe'>('stripe');

  useEffect(() => {
    // if (items.length === 0) router.push("/shop"); 
  }, [items, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (items.length === 0) return alert("Košarica je prazna!");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    
    try {
      if (paymentMethod === 'cod') {
        const result = await createOrder(formData, items, cartTotal);
        if (result?.success) {
          clearCart(); 
          router.push("/checkout/success"); 
        } else {
          alert("Greška: " + result.error);
        }
      } else {
        const result = await createStripeSession(formData, items, cartTotal);
        if (result?.url) {
          window.location.href = result.url;
        } else {
          alert("Greška kod plaćanja: " + result?.error);
        }
      }
    } catch (error) {
      console.error(error);
      alert("Dogodila se greška.");
    } finally {
      if (paymentMethod === 'cod') setIsSubmitting(false);
    }
  }

  if (items.length === 0) {
     return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
            <p className="text-xl font-bold text-zinc-400">Vaša košarica je prazna.</p>
            <Link href="/shop" className="bg-black text-white px-6 py-2 rounded-full font-bold">
                Povratak u trgovinu
            </Link>
        </div>
     );
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900 p-6 lg:p-12 selection:bg-green-100">
      <div className="max-w-5xl mx-auto">
        
        <Link href="/" className="inline-flex items-center text-sm font-bold text-zinc-400 hover:text-black mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Natrag
        </Link>

        <h1 className="text-4xl font-black tracking-tight mb-8">Naplata</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LIJEVO: Forma */}
          <div className="lg:col-span-7 space-y-8">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
              
              {/* Sekcija 1: Podaci */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold border-b border-zinc-100 pb-2">Podaci za dostavu</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input name="name" label="Ime i prezime" placeholder="Ivan Horvat" required />
                  <Input name="phone" label="Mobitel" placeholder="091..." required />
                </div>
                <Input name="email" label="Email" type="email" placeholder="ivan@email.com" required />
                <Input name="address" label="Adresa" placeholder="Ilica 1" required />
                <div className="grid grid-cols-2 gap-4">
                  <Input name="city" label="Grad" placeholder="Zagreb" required />
                  <Input name="zip" label="Poštanski br." placeholder="10000" required />
                </div>
              </div>

              {/* Sekcija 2: Način plaćanja */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold border-b border-zinc-100 pb-2">Način plaćanja</h2>
                <div className="grid grid-cols-1 gap-4">
                  
                  {/* --- OPCIJA 1: STRIPE (Kartice + Apple Pay) --- */}
                  <div 
                    onClick={() => setPaymentMethod('stripe')}
                    className={`cursor-pointer border rounded-2xl p-5 flex flex-col gap-4 transition-all ${paymentMethod === 'stripe' ? 'border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900' : 'border-zinc-200 hover:border-zinc-300'}`}
                  >
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full border shadow-sm transition-colors ${paymentMethod === 'stripe' ? 'bg-zinc-900 border-zinc-900 text-white' : 'bg-white border-zinc-100 text-zinc-900'}`}>
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <span className="block font-bold text-sm">Kartično plaćanje</span>
                                <span className="block text-xs text-zinc-500">Apple Pay, Google Pay, Visa, Mastercard</span>
                            </div>
                        </div>
                        {paymentMethod === 'stripe' && <CheckCircle2 className="w-6 h-6 text-zinc-900" />}
                    </div>

                    {/* VIZUALNI LOGOTIPI (Grayscale) - Dodani unutar opcije */}
                    <div className="flex gap-2 ml-12 opacity-50 grayscale transition-opacity">
                         {/* Visa */}
                        <div className="h-5 px-1.5 border border-zinc-300 rounded flex items-center justify-center bg-white">
                            <span className="text-[9px] font-bold italic text-black font-serif">VISA</span>
                        </div>
                        {/* MC */}
                        <div className="h-5 px-1.5 border border-zinc-300 rounded flex items-center justify-center bg-white">
                            <div className="flex -space-x-1">
                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-400"></div>
                            </div>
                        </div>
                         {/* Apple */}
                        <div className="h-5 px-1.5 border border-zinc-300 rounded flex items-center justify-center bg-white gap-0.5">
                             <span className="text-[9px] font-bold text-black">Pay</span>
                        </div>
                         {/* Google */}
                        <div className="h-5 px-1.5 border border-zinc-300 rounded flex items-center justify-center bg-white">
                             <span className="text-[9px] font-bold text-black">GPay</span>
                        </div>
                    </div>
                  </div>

                  {/* --- OPCIJA 2: POUZEĆE --- */}
                  <div 
                    onClick={() => setPaymentMethod('cod')}
                    className={`cursor-pointer border rounded-2xl p-5 flex items-center justify-between transition-all ${paymentMethod === 'cod' ? 'border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900' : 'border-zinc-200 hover:border-zinc-300'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full border shadow-sm transition-colors ${paymentMethod === 'cod' ? 'bg-zinc-900 border-zinc-900 text-white' : 'bg-white border-zinc-100 text-zinc-900'}`}>
                        <Truck className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <span className="block font-bold text-sm">Plaćanje pouzećem</span>
                        <span className="block text-xs text-zinc-500">Plati dostavljaču prilikom preuzimanja</span>
                      </div>
                    </div>
                    {paymentMethod === 'cod' && <CheckCircle2 className="w-6 h-6 text-zinc-900" />}
                  </div>

                </div>
              </div>

            </form>
          </div>

          {/* DESNO: Sažetak */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200 sticky top-24">
              <h3 className="font-bold text-lg mb-6">Tvoja košarica</h3>
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start text-sm">
                    <div className="flex flex-col">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-xs text-zinc-500">Vel: {item.size} × {item.quantity}</span>
                    </div>
                    <span className="font-bold tabular-nums">{(item.price * item.quantity).toFixed(2)} €</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-dashed border-zinc-300 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-zinc-500 text-sm">
                  <span>Međuzbroj</span>
                  <span>{cartTotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-zinc-500 text-sm">
                  <span>Dostava</span>
                  <span className="text-green-600 font-bold">Besplatna</span>
                </div>
                <div className="flex justify-between text-xl font-black text-zinc-900 pt-2">
                  <span>Ukupno</span>
                  <span>{cartTotal.toFixed(2)} €</span>
                </div>
              </div>

              <button 
                form="checkout-form"
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-black hover:bg-zinc-800 text-white font-bold h-14 rounded-full text-lg shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Obrađujem...
                  </>
                ) : (
                  paymentMethod === 'stripe' ? 'Plati Karticom' : 'Završi Narudžbu'
                )}
              </button>
              
              <p className="text-center text-xs text-zinc-400 mt-4">
                {paymentMethod === 'stripe' 
                  ? "Sigurna SSL enkripcija. Preusmjerit ćemo vas na Stripe." 
                  : "Plaćate gotovinom dostavljaču."}
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">{label}</label>
      <input 
        {...props} 
        className="h-12 px-4 rounded-xl border border-zinc-200 bg-white focus:bg-white focus:ring-2 focus:ring-green-500 focus:outline-none transition-all placeholder:text-zinc-300 font-medium"
      />
    </div>
  );
}