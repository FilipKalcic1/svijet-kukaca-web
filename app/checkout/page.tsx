"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "@/app/actions/createOrder";
import { createStripeSession } from "@/app/actions/createStripeSession";
import {
  ArrowLeft,
  Loader2,
  CreditCard,
  Truck,
  Lock,
  ShieldCheck,
  Package,
  ChevronRight,
  Minus,
  Plus,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart, removeItem, updateQuantity } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "stripe">(
    "stripe"
  );
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    if (items.length === 0) router.push("/");
  }, [items, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (items.length === 0) return;
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      if (paymentMethod === "cod") {
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
      if (paymentMethod === "cod") setIsSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-zinc-50">
        <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center">
          <Package className="w-7 h-7 text-zinc-300" />
        </div>
        <p className="text-lg font-semibold text-zinc-400">
          Vaša košarica je prazna.
        </p>
        <Link
          href="/"
          className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-zinc-800 transition-colors"
        >
          Povratak u trgovinu
        </Link>
      </div>
    );
  }

  const shippingCost = 0;
  const total = cartTotal + shippingCost;

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-accent-100">
      {/* Top bar */}
      <div className="bg-white border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-black transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Natrag u trgovinu</span>
          </Link>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="text-zinc-300">Košarica</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-black font-semibold">Naplata</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-zinc-300">Potvrda</span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400">
            <Lock className="w-3.5 h-3.5" />
            <span className="text-xs font-medium hidden sm:inline">
              Sigurna naplata
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* LEFT — Form */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <form
              id="checkout-form"
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Shipping info */}
              <section className="bg-white rounded-2xl border border-zinc-200/80 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <h2 className="text-lg font-bold">Podaci za dostavu</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatingInput
                      name="name"
                      label="Ime i prezime"
                      required
                      autoComplete="name"
                    />
                    <FloatingInput
                      name="phone"
                      label="Broj telefona"
                      type="tel"
                      required
                      autoComplete="tel"
                    />
                  </div>
                  <FloatingInput
                    name="email"
                    label="Email adresa"
                    type="email"
                    required
                    autoComplete="email"
                  />
                  <FloatingInput
                    name="address"
                    label="Adresa"
                    required
                    autoComplete="street-address"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingInput
                      name="city"
                      label="Grad"
                      required
                      autoComplete="address-level2"
                    />
                    <FloatingInput
                      name="zip"
                      label="Poštanski broj"
                      required
                      autoComplete="postal-code"
                    />
                  </div>
                </div>
              </section>

              {/* Payment method */}
              <section className="bg-white rounded-2xl border border-zinc-200/80 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <h2 className="text-lg font-bold">Način plaćanja</h2>
                </div>

                <div className="space-y-3">
                  {/* Stripe */}
                  <label
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "stripe"
                        ? "border-black bg-zinc-50"
                        : "border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="stripe"
                      checked={paymentMethod === "stripe"}
                      onChange={() => setPaymentMethod("stripe")}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        paymentMethod === "stripe"
                          ? "border-black"
                          : "border-zinc-300"
                      }`}
                    >
                      {paymentMethod === "stripe" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-black" />
                      )}
                    </div>
                    <CreditCard
                      className={`w-5 h-5 shrink-0 ${paymentMethod === "stripe" ? "text-black" : "text-zinc-400"}`}
                    />
                    <div className="flex-1">
                      <span className="block text-sm font-semibold">
                        Kartično plaćanje
                      </span>
                      <span className="block text-xs text-zinc-400 mt-0.5">
                        Visa, Mastercard, Apple Pay, Google Pay
                      </span>
                    </div>
                  </label>

                  {/* COD */}
                  <label
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-black bg-zinc-50"
                        : "border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        paymentMethod === "cod"
                          ? "border-black"
                          : "border-zinc-300"
                      }`}
                    >
                      {paymentMethod === "cod" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-black" />
                      )}
                    </div>
                    <Truck
                      className={`w-5 h-5 shrink-0 ${paymentMethod === "cod" ? "text-black" : "text-zinc-400"}`}
                    />
                    <div className="flex-1">
                      <span className="block text-sm font-semibold">
                        Plaćanje pouzećem
                      </span>
                      <span className="block text-xs text-zinc-400 mt-0.5">
                        Platite gotovinom prilikom preuzimanja
                      </span>
                    </div>
                  </label>
                </div>
              </section>
            </form>

            {/* Trust signals */}
            <div className="mt-6 flex items-center justify-center gap-6 text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">SSL enkripcija</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">
                  Zaštićeni podaci
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — Order summary */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="bg-white rounded-2xl border border-zinc-200/80 p-6 sm:p-8 lg:sticky lg:top-8">
              <h3 className="text-lg font-bold mb-6">Pregled narudžbe</h3>

              {/* Items */}
              <div className="divide-y divide-zinc-100 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 py-4 first:pt-0">
                    <div className="relative w-14 h-14 bg-zinc-100 rounded-xl overflow-hidden shrink-0 border border-zinc-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold truncate">
                          {item.name}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-6 h-6 flex items-center justify-center rounded-full text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
                          aria-label={`Ukloni ${item.name}`}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Vel: {item.size}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center h-7 border border-zinc-200 rounded-full bg-zinc-50">
                          <button
                            onClick={() =>
                              item.quantity > 1
                                ? updateQuantity(item.id, item.quantity - 1)
                                : removeItem(item.id)
                            }
                            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white text-zinc-500 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center text-xs font-bold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white text-zinc-500 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-bold tabular-nums">
                          {(item.price * item.quantity).toFixed(2)} €
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-zinc-100 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">
                    Međuzbroj ({items.reduce((s, i) => s + i.quantity, 0)} kom)
                  </span>
                  <span className="tabular-nums">{cartTotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Dostava</span>
                  <span className="text-accent-600 font-semibold">
                    Besplatna
                  </span>
                </div>
              </div>

              <div className="border-t border-zinc-200 mt-4 pt-4 flex justify-between items-baseline">
                <span className="text-base font-bold">Ukupno</span>
                <span className="text-2xl font-black tabular-nums">
                  {total.toFixed(2)} €
                </span>
              </div>

              {/* Terms + Submit (visible on desktop) */}
              <div className="mt-8 hidden lg:block">
                <label className="flex items-start gap-3 mb-5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 accent-black shrink-0 w-4 h-4"
                  />
                  <span className="text-xs text-zinc-500 leading-relaxed">
                    Slažem se s{" "}
                    <Link
                      href="/uvjeti"
                      target="_blank"
                      className="underline hover:text-black transition-colors"
                    >
                      uvjetima poslovanja
                    </Link>{" "}
                    i{" "}
                    <Link
                      href="/privatnost"
                      target="_blank"
                      className="underline hover:text-black transition-colors"
                    >
                      politikom privatnosti
                    </Link>
                    .
                  </span>
                </label>

                <button
                  form="checkout-form"
                  type="submit"
                  disabled={isSubmitting || !agreedToTerms}
                  className="w-full h-14 bg-black text-white font-bold rounded-full text-base transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Obrađujem...
                    </>
                  ) : paymentMethod === "stripe" ? (
                    <>
                      <Lock className="w-4 h-4" />
                      Nastavi na plaćanje
                    </>
                  ) : (
                    "Potvrdi narudžbu"
                  )}
                </button>

                {paymentMethod === "stripe" && (
                  <p className="text-center text-[11px] text-zinc-400 mt-3">
                    Bit ćete preusmjereni na Stripe za sigurno plaćanje
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky footer */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-zinc-200 p-4 z-50">
        <label className="flex items-start gap-3 mb-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-0.5 accent-black shrink-0 w-4 h-4"
          />
          <span className="text-[11px] text-zinc-500 leading-relaxed">
            Slažem se s{" "}
            <Link
              href="/uvjeti"
              target="_blank"
              className="underline hover:text-black"
            >
              uvjetima
            </Link>{" "}
            i{" "}
            <Link
              href="/privatnost"
              target="_blank"
              className="underline hover:text-black"
            >
              politikom privatnosti
            </Link>
            .
          </span>
        </label>
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <span className="text-xs text-zinc-400 block">Ukupno</span>
            <span className="text-xl font-black tabular-nums">
              {total.toFixed(2)} €
            </span>
          </div>
          <button
            form="checkout-form"
            type="submit"
            disabled={isSubmitting || !agreedToTerms}
            className="flex-1 h-12 bg-black text-white font-bold rounded-full text-sm transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Obrađujem...
              </>
            ) : paymentMethod === "stripe" ? (
              <>
                <Lock className="w-3.5 h-3.5" />
                Nastavi na plaćanje
              </>
            ) : (
              "Potvrdi narudžbu"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}

function FloatingInput({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <input
        {...props}
        placeholder=" "
        className="peer w-full h-14 px-4 pt-5 pb-2 rounded-xl border border-zinc-200 bg-white text-sm font-medium text-zinc-900 placeholder-transparent focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition-all"
      />
      <label className="absolute left-4 top-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-zinc-400 peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-black pointer-events-none">
        {label}
      </label>
    </div>
  );
}
