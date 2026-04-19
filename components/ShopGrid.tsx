"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Leaf } from "lucide-react";
import { ProductMockup } from "@/components/ProductMockup";
import Link from "next/link";
import type { ThemeConfig } from "@/lib/themes";
import { INSECT_THEME } from "@/lib/themes";

interface Creature {
  id: number;
  name_hr: string;
  name_science: string;
  price: number;
  category: string;
  image_url: string;
  product_front_image?: string;
  slug: string;
}

export default function ShopGrid({
  creatures,
  theme = INSECT_THEME,
}: {
  creatures: Creature[];
  theme?: ThemeConfig;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = creatures.filter((item) => {
    const matchesSearch =
      item.name_hr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name_science.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col items-center mb-20 space-y-10">
        <div className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-300 mb-2 block">KAYAHA</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {theme.shopTitle}
          </h2>
        </div>

        <div className="relative w-full max-w-xl group">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-accent-500 transition-colors"
            size={20}
          />
          <Input
            placeholder={theme.searchPlaceholder}
            className="pl-12 pr-12 h-14 rounded-full text-lg border-zinc-200 bg-white shadow-sm focus:ring-2 focus:ring-accent-300 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-black transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {theme.categories.map((cat) => (
            <Button
              key={cat.id}
              variant="ghost"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-6 h-10 transition-all text-sm tracking-wide ${
                activeCategory === cat.id
                  ? "bg-black text-white hover:bg-zinc-800"
                  : "bg-white border border-zinc-200 text-zinc-500 hover:bg-accent-50 hover:text-black hover:border-accent-200"
              }`}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <Link href={`/shop/${item.slug}`} key={item.id} className="block group">
              <div className="h-full border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden bg-white rounded-2xl">
                <div className="aspect-3/4 bg-[#fafaf8] relative">
                  <ProductMockup
                    frontImage={item.product_front_image || item.image_url}
                    bugSlug={item.slug}
                  />
                </div>
                <div className="p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-600 bg-accent-50 px-2.5 py-1 rounded-full">
                      {item.category}
                    </p>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 leading-tight mb-1 group-hover:text-accent-600 transition-colors">
                    {item.name_hr}
                  </h3>
                  <p className="text-sm text-zinc-400 italic font-serif mb-4">
                    {item.name_science}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                    <span className="text-xl font-bold tracking-tight">
                      {item.price} €
                    </span>
                    <div className="bg-zinc-900 text-white text-sm font-medium px-4 py-2 rounded-full group-hover:bg-accent-400 group-hover:text-black transition-colors">
                      Pogledaj
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 mb-4">
              <Search className="text-zinc-300" />
            </div>
            <h3 className="text-lg font-medium text-zinc-900">
              Nismo pronašli rezultat
            </h3>
            <p className="text-zinc-400 mt-1 text-sm">
              Probaj promijeniti pojam pretrage ili očisti filtere.
            </p>
            <Button
              variant="link"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("all");
              }}
              className="text-accent-600 mt-2"
            >
              Očisti sve filtere
            </Button>
          </div>
        )}
      </div>

      {/* Bottom tagline */}
      <div className="flex items-center justify-center gap-3 mt-20">
        <div className="h-px flex-1 max-w-20 bg-zinc-200" />
        <div className="flex items-center gap-2">
          <Leaf className="w-3 h-3 text-accent-400" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-300">
            Elevated Style · Natural Spirit
          </span>
        </div>
        <div className="h-px flex-1 max-w-20 bg-zinc-200" />
      </div>
    </>
  );
}
