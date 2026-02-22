"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { ProductMockup } from "@/components/ProductMockup";
import Link from "next/link";

interface Insect {
  id: number;
  name_hr: string;
  name_science: string;
  price: number;
  category: string;
  image_url: string;
  product_front_image?: string;
  slug: string;
}

const CATEGORIES = [
  { id: "all", label: "Svi" },
  { id: "flying", label: "Letači" },
  { id: "crawling", label: "Puzači" },
  { id: "spiders", label: "Pauci" },
];

export default function ShopGrid({ insects }: { insects: Insect[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = insects.filter((bug) => {
    const matchesSearch =
      bug.name_hr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bug.name_science.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || bug.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col items-center mb-20 space-y-10">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Istraži Kolekciju
        </h2>

        <div className="relative w-full max-w-xl group">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-green-500 transition-colors"
            size={20}
          />
          <Input
            placeholder="Traži kukca (npr. Jelenak, Lucanus...)"
            className="pl-12 pr-12 h-14 rounded-full text-lg border-zinc-200 shadow-sm focus:ring-2 focus:ring-green-300 focus:border-transparent transition-all"
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
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.id}
              variant="ghost"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-6 h-10 transition-all ${
                activeCategory === cat.id
                  ? "bg-black text-white hover:bg-zinc-800"
                  : "bg-zinc-100 text-zinc-600 hover:bg-green-100 hover:text-black"
              }`}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {filtered.length > 0 ? (
          filtered.map((bug) => (
            <Link href={`/shop/${bug.slug}`} key={bug.id} className="block group">
              <Card className="h-full border-none shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white rounded-[2rem]">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="aspect-3/4 bg-zinc-50 relative">
                    <ProductMockup
                      frontImage={bug.product_front_image || bug.image_url}
                      bugSlug={bug.slug}
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        {bug.category}
                      </p>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 leading-tight mb-1 group-hover:text-green-600 transition-colors">
                      {bug.name_hr}
                    </h3>
                    <p className="text-sm text-zinc-400 italic font-serif mb-auto">
                      {bug.name_science}
                    </p>
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-50">
                      <span className="text-xl font-bold tracking-tight">
                        {bug.price} €
                      </span>
                      <div className="bg-zinc-900 text-white text-sm font-medium px-4 py-2 rounded-full group-hover:bg-green-400 group-hover:text-black transition-colors">
                        Pogledaj
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 mb-4">
              <Search className="text-zinc-400" />
            </div>
            <h3 className="text-lg font-medium text-zinc-900">
              Nismo pronašli tog kukca
            </h3>
            <p className="text-zinc-500 mt-1">
              Probaj promijeniti pojam pretrage ili očisti filtere.
            </p>
            <Button
              variant="link"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("all");
              }}
              className="text-green-600 mt-2"
            >
              Očisti sve filtere
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
