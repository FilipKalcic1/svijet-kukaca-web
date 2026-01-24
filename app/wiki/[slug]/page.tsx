import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Leaf, Ruler, Image as ImageIcon } from "lucide-react";
import React from "react";
import ShareButton from "@/components/ShareButton";

type PageProps = { params: Promise<{ slug: string }> };

export default async function InsectPage(props: PageProps) {
  const params = await props.params;
  const { data: insect } = await supabase.from('insects').select('*').eq('slug', params.slug).maybeSingle();

  if (!insect) return notFound();

  return (
    <main className="min-h-screen bg-white text-black pb-24 font-sans selection:bg-green-100">
      
      {/* --- MINIMAL HEADER --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center text-sm font-medium text-zinc-500 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Natrag
          </Link>
          <div className="flex gap-3">
             <span className="text-[10px] font-bold bg-zinc-100 px-2 py-1 rounded text-zinc-500 uppercase tracking-wider self-center">Wiki</span>
             <ShareButton title={insect.name_hr} text="Pogledaj ovo!" />
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 mt-12">
        
        {/* --- HERO: CLEAN & CENTERED --- */}
        <div className="text-center mb-12">
            <span className="inline-block text-green-600 text-xs font-bold uppercase tracking-widest mb-4">
                Kolekcija otključana
            </span>
            <h1 className="text-5xl font-bold tracking-tight text-black mb-2">
                {insect.name_hr}
            </h1>
            {insect.name_science && (
                <p className="text-xl text-zinc-400 font-serif italic mb-6">
                    {insect.name_science}
                </p>
            )}
            <p className="text-lg text-zinc-600 leading-relaxed">
                {insect.description}
            </p>
        </div>

        {/* --- SLIKA: čista, bez overlay-a --- */}
        <div className="relative w-full aspect-square max-w-87.5 mx-auto mb-16 grayscale-10 hover:grayscale-0 transition-all duration-700">
            <Image
                src={insect.illustration_url || "/assets/placeholder.png"}
                alt={insect.name_hr}
                fill
                className="object-contain drop-shadow-xl"
                priority
            />
        </div>

        {/* --- STATISTIKA: Apple-style divider --- */}
        <div className="grid grid-cols-3 divide-x divide-zinc-100 border-y border-zinc-100 py-8 mb-16">
             <StatBox icon={<Ruler />} label="Veličina" value={insect.size} />
             <StatBox icon={<Leaf />} label="Hrana" value={insect.food} />
             <StatBox icon={<MapPin />} label="Stanište" value={insect.habitat} />
        </div>

        {/* --- TAJNE VRSTE (Minimalist Grid) --- */}
        {insect.fun_facts && insect.fun_facts.length > 0 && (
          <div className="mb-20">
            <h3 className="text-xl font-bold mb-6 text-black">Zanimljivosti</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insect.fun_facts.map((fact: string, i: number) => (
                <div key={i} className="bg-zinc-50 p-6 rounded-2xl hover:bg-zinc-100 transition-colors">
                  <span className="block text-green-600 font-bold text-sm mb-2">0{i + 1}</span>
                  <p className="text-zinc-700 font-medium text-sm leading-relaxed">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- GALERIJA: Clean Grid --- */}
        {insect.gallery_images && insect.gallery_images.length > 0 && (
            <div className="mb-24">
                <div className="flex items-center gap-2 mb-6 text-zinc-400">
                  <ImageIcon className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Galerija</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {insect.gallery_images.map((url: string, i: number) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-zinc-50">
                      <Image 
                        src={url} alt={`Slika ${i}`} fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
            </div>
        )}
      </div>
    </main>
  );
}

function StatBox({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex flex-col items-center text-center px-2">
      <div className="text-zinc-300 mb-2 scale-75">{icon}</div>
      <div className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest mb-1">{label}</div>
      <div className="text-sm font-semibold text-black">{value}</div>
    </div>
  );
}