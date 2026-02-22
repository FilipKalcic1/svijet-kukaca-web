"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) setVisible(true);
  }, []);

  const accept = (type: "all" | "necessary") => {
    localStorage.setItem("cookie-consent", type);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-2xl mx-auto bg-white border border-zinc-200 rounded-2xl shadow-2xl p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <p className="text-sm text-zinc-600 flex-1 leading-relaxed">
          Koristimo kolačiće za funkcioniranje košarice i analitiku.{" "}
          <Link href="/kolacici" className="underline decoration-dotted hover:text-black">
            Saznaj više
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => accept("necessary")}
            className="text-xs font-medium px-4 py-2 rounded-full border border-zinc-200 text-zinc-500 hover:border-zinc-400 transition-colors"
          >
            Samo nužni
          </button>
          <button
            onClick={() => accept("all")}
            className="text-xs font-bold px-4 py-2 rounded-full bg-black text-white hover:bg-green-600 transition-colors"
          >
            Prihvati sve
          </button>
        </div>
      </div>
    </div>
  );
}
