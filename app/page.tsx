"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Bug, Loader2, X } from "lucide-react";
import { supabase } from "@/lib/supabase"; 
import { ProductMockup } from "@/components/ProductMockup"; 
import Link from "next/link"; // <--- NOVO: Ovo nam treba za navigaciju

// Tip podataka
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

export default function Home() {
  const [insects, setInsects] = useState<Insect[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Stanja za pretragu
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all"); 

  // Učitavanje podataka iz baze
  useEffect(() => {
    async function fetchInsects() {
      const { data, error } = await supabase
        .from('insects')
        .select('*');

      if (error) {
        console.error("Greška pri dohvatu:", error.message);
      } else {
        setInsects(data || []);
      }
      setLoading(false);
    }
    fetchInsects();
  }, []);

  // Logika filtriranja
  const filteredInsects = insects.filter((bug) => {
    const matchesSearch = 
      bug.name_hr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bug.name_science.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = activeCategory === "all" || bug.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const scrollToShop = () => {
    const shopSection = document.getElementById("shop");
    shopSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-green-300 selection:text-black">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-300 rounded-full flex items-center justify-center">
              <Bug className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-xl tracking-tight">Svijet Kukaca</span>
          </div>
          <Button variant="outline" className="rounded-full hover:bg-zinc-100 transition-colors">
            Košarica (0)
          </Button>
        </div>
      </nav>

      {/* HERO SEKCIJA */}
      <section className="relative pt-32 pb-20 px-6 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-green-300/20 rounded-full blur-[100px] -z-10" />
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 mb-6 tracking-tight">
          Nosi Prirodu. <br /> 
          <span className="text-transparent bg-clip-text bg-linear-to-r from-green-500 to-emerald-700">
            Upoznaj Svijet.
          </span>
        </h1>
        <p className="text-xl text-zinc-500 max-w-2xl mx-auto mb-8 leading-relaxed">
          Premium majice s edukativnom pričom. Skeniraj QR kod na leđima i otkrij tajni život kukca kojeg nosiš.
        </p>
        <Button onClick={scrollToShop} size="lg" className="bg-black text-white hover:bg-green-400 hover:text-black rounded-full text-lg px-8 h-14 transition-all shadow-lg hover:shadow-green-300/50">
          Pronađi Svog Kukca
        </Button>
      </section>

      {/* SHOP SEKCIJA */}
      <section id="shop" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16 space-y-8">
          <h2 className="text-3xl font-bold tracking-tight">Istraži Kolekciju</h2>
          
          {/* SEARCH BAR */}
          <div className="relative w-full max-w-xl group">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-green-500 transition-colors" size={20}/>
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

          {/* KATEGORIJE */}
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { id: 'all', label: 'Svi' },
              { id: 'flying', label: 'Letači ' },
              { id: 'crawling', label: 'Puzači ' },
              { id: 'spiders', label: 'Pauci ' }
            ].map((cat) => (
               <Button 
                key={cat.id}
                variant="ghost"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-6 h-10 transition-all ${
                  activeCategory === cat.id 
                    ? 'bg-black text-white hover:bg-zinc-800' 
                    : 'bg-zinc-100 text-zinc-600 hover:bg-green-100 hover:text-black'
                }`}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-32 flex flex-col items-center text-zinc-400 animate-pulse">
            <Loader2 className="animate-spin mb-4 w-8 h-8" />
            <p>Učitavanje kolekcije...</p>
          </div>
        )}

        {/* GRID REZULTATA */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredInsects.length > 0 ? (
              filteredInsects.map((bug) => (
                // --- GLAVNA PROMJENA: Link omata cijelu karticu ---
                <Link 
                  href={`/shop/${bug.slug}`} 
                  key={bug.id} 
                  className="block group" // 'block' da zauzme prostor, 'group' za hover efekte
                >
                  <Card className="h-full border-none shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white rounded-[2rem]">
                    <CardContent className="p-0 h-full flex flex-col">
                      
                      {/* SLIKA (Mockup) */}
                      <div className="aspect-3/4 bg-zinc-50 relative">
                         <ProductMockup 
                            frontImage={bug.product_front_image || bug.image_url} 
                            bugSlug={bug.slug}
                         />
                      </div>

                      {/* PODACI */}
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
                          <span className="text-xl font-bold tracking-tight">{bug.price} €</span>
                          {/* Gumb više nije klikabilan sam za sebe, cijela kartica je link */}
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
              // Poruka ako nema rezultata
              <div className="col-span-full py-20 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 mb-4">
                  <Search className="text-zinc-400" />
                </div>
                <h3 className="text-lg font-medium text-zinc-900">Nismo pronašli tog kukca</h3>
                <p className="text-zinc-500 mt-1">Probaj promijeniti pojam pretrage ili očisti filtere.</p>
                <Button 
                  variant="link" 
                  onClick={() => {setSearchTerm(""); setActiveCategory("all");}} 
                  className="text-green-600 mt-2"
                >
                  Očisti sve filtere
                </Button>
              </div>
            )}
          </div>
        )}
      </section>
      
      {/* FOOTER */}
      <footer className="bg-white text-zinc-900 py-12 px-6 mt-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
              <Bug className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-xl">Svijet Kukaca</span>
        </div>
        <p className="text-zinc-500 text-sm">© 2026. Sva prava pridržana.</p>
      </footer>

    </div>
  );
}