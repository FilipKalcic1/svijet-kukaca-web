"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-2xl mx-auto bg-white border border-zinc-100 rounded-2xl shadow-2xl p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-start gap-3 flex-1">
          <Leaf className="w-4 h-4 text-accent-400 shrink-0 mt-0.5" />
          <p className="text-sm text-zinc-500 leading-relaxed">
            Koristimo samo tehnički nužne kolačiće (košarica, plaćanje). Bez trackinga, bez analitike.{" "}
            <Link href="/kolacici" className="underline decoration-dotted hover:text-black transition-colors">
              Saznaj više
            </Link>
          </p>
        </div>
        <button
          onClick={() => {
            localStorage.setItem("cookie-consent", "necessary");
            setVisible(false);
          }}
          className="text-xs font-bold px-5 py-2.5 rounded-full bg-black text-white hover:bg-zinc-800 transition-colors shrink-0 tracking-wide"
        >
          Razumijem
        </button>
      </div>
    </div>
  );
}
