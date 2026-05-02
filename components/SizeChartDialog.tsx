"use client";

import { useState, useEffect } from "react";
import { X, Ruler } from "lucide-react";
import { SIZE_CHART } from "@/lib/sizeChart";

export default function SizeChartDialog({ activeSize }: { activeSize?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
      >
        <Ruler className="w-3.5 h-3.5" strokeWidth={1.5} />
        Tablica veličina
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6 overscroll-contain"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-label="Tablica veličina"
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-t-3xl md:rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300 md:slide-in-from-bottom-0 md:zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-zinc-100 px-6 md:px-8 py-5 flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                  Pomoć pri odabiru
                </span>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 mt-1">
                  Tablica veličina
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-500 transition-colors shrink-0"
                aria-label="Zatvori"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 md:px-8 py-6 md:py-8">
              <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                Sve mjere su u centimetrima. Ako je tvoje dijete između dvije veličine,
                preporučujemo veću za udobnost.
              </p>

              <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="text-left">
                      <th className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 pb-3 pr-4">Veličina</th>
                      <th className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 pb-3 pr-4">Uzrast</th>
                      <th className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 pb-3 pr-4">Visina djeteta</th>
                      <th className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 pb-3 pr-4">Širina prsa</th>
                      <th className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 pb-3">Duljina</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_CHART.map((row) => {
                      const isActive = activeSize === row.size;
                      return (
                        <tr
                          key={row.size}
                          className={`border-t border-zinc-100 ${isActive ? "bg-accent-50/60" : ""}`}
                        >
                          <td className="py-4 pr-4 font-bold text-zinc-900">
                            <span className={`inline-flex items-center justify-center min-w-9 h-7 px-2 rounded-full text-xs ${isActive ? "bg-accent-600 text-white" : "bg-zinc-100 text-zinc-700"}`}>
                              {row.size}
                            </span>
                          </td>
                          <td className="py-4 pr-4 text-zinc-700 tabular-nums">{row.age}</td>
                          <td className="py-4 pr-4 text-zinc-500 tabular-nums">{row.height}</td>
                          <td className="py-4 pr-4 text-zinc-500 tabular-nums">{row.chest}</td>
                          <td className="py-4 text-zinc-500 tabular-nums">{row.length}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Tip */}
              <div className="mt-8 bg-zinc-50 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-zinc-900 mb-2">Kako mjeriti?</h3>
                <ul className="text-sm text-zinc-500 space-y-2 leading-relaxed">
                  <li><strong className="text-zinc-700">Visina:</strong> dijete bez cipela, leđima uz zid, od poda do tjemena.</li>
                  <li><strong className="text-zinc-700">Širina prsa:</strong> izmjeri postojeću dobro pristajaću majicu od pazuha do pazuha (jednostruko).</li>
                  <li><strong className="text-zinc-700">Duljina:</strong> od ramena (uz vrat) do željenog ruba majice.</li>
                </ul>
              </div>

              <p className="mt-6 text-xs text-zinc-400 text-center">
                Imaš pitanje? Piši nam na{" "}
                <a href="mailto:kontakt@kayaha.hr" className="text-accent-700 hover:text-accent-600 font-semibold underline">
                  kontakt@kayaha.hr
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
