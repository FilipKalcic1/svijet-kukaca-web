"use client";

import { Bug, Fish, BookOpen, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ITEMS = [
  {
    href: "/kukci",
    label: "Svijet Kukaca",
    desc: "Edukativne majice o kukcima",
    Icon: Bug,
  },
  {
    href: "/ribe",
    label: "Svijet Riba",
    desc: "Edukativne majice o ribama",
    Icon: Fish,
  },
  {
    href: "/clanci",
    label: "Članci",
    desc: "Zanimljivosti i saznaj više",
    Icon: BookOpen,
  },
] as const;

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Zatvori izbornik" : "Otvori izbornik"}
        aria-expanded={open}
        className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-zinc-900 hover:bg-zinc-100 transition-colors shrink-0"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {open && (
        <div
          className="fixed inset-x-0 top-16 md:top-20 bottom-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <div
        className={`absolute top-full left-0 w-full bg-white border-b border-zinc-100 shadow-xl origin-top transition-[opacity,transform] duration-200 z-50 ${
          open
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-95 pointer-events-none"
        }`}
        role="menu"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex flex-col gap-1">
          {ITEMS.map(({ href, label, desc, Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-4 p-3 sm:p-4 rounded-2xl transition-colors ${
                  active ? "bg-zinc-100" : "hover:bg-zinc-50"
                }`}
                role="menuitem"
              >
                <Icon className="w-6 h-6 text-zinc-900 shrink-0" strokeWidth={1.5} />
                <div className="min-w-0">
                  <p className="font-semibold text-zinc-900 truncate">{label}</p>
                  <p className="text-sm text-zinc-500 truncate">{desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
