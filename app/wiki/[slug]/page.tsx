import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Leaf,
  Ruler,
  Image as ImageIcon,
  ShoppingBag,
  Bug,
  Sparkles,
} from "lucide-react";
import React from "react";
import ShareButton from "@/components/ShareButton";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const { data: insect } = await supabase
    .from("insects")
    .select("name_hr, name_science, description")
    .eq("slug", params.slug)
    .maybeSingle();

  if (!insect) return { title: "Wiki - Svijet Kukaca" };

  return {
    title: `${insect.name_hr} - Wiki | Svijet Kukaca`,
    description:
      insect.description?.slice(0, 160) ||
      `Saznaj sve o vrsti ${insect.name_hr} (${insect.name_science})`,
  };
}

export default async function InsectPage(props: PageProps) {
  const params = await props.params;
  const { data: insect } = await supabase
    .from("insects")
    .select("*")
    .eq("slug", params.slug)
    .maybeSingle();

  if (!insect) return notFound();

  return (
    <main className="min-h-screen bg-white text-black pb-32 font-sans selection:bg-green-100">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center text-sm font-medium text-zinc-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Natrag
          </Link>
          <div className="flex gap-3 items-center">
            <span className="text-[10px] font-bold bg-zinc-100 px-2 py-1 rounded text-zinc-500 uppercase tracking-wider">
              Wiki
            </span>
            <ShareButton title={insect.name_hr} text={`Saznaj više o vrsti ${insect.name_hr}!`} />
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 mt-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-green-600 text-xs font-bold uppercase tracking-widest mb-4 bg-green-50 px-3 py-1.5 rounded-full">
            <Sparkles className="w-3 h-3" />
            Kolekcija otključana
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black mb-3">
            {insect.name_hr}
          </h1>
          {insect.name_science && (
            <p className="text-xl md:text-2xl text-zinc-400 font-serif italic mb-8">
              {insect.name_science}
            </p>
          )}
          <p className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            {insect.description}
          </p>
        </div>

        {/* Illustration */}
        {insect.illustration_url && (
          <div className="relative w-full aspect-square max-w-md mx-auto mb-20 hover:scale-[1.02] transition-transform duration-700">
            <Image
              src={insect.illustration_url}
              alt={insect.name_hr}
              fill
              sizes="(max-width: 768px) 100vw, 448px"
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 divide-x divide-zinc-100 border-y border-zinc-100 py-10 mb-20">
          <StatBox icon={<Ruler />} label="Veličina" value={insect.size} />
          <StatBox icon={<Leaf />} label="Hrana" value={insect.food} />
          <StatBox icon={<MapPin />} label="Stanište" value={insect.habitat} />
        </div>

        {/* Did you know section */}
        {insect.fun_facts && insect.fun_facts.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-2 mb-8">
              <Bug className="w-5 h-5 text-green-600" />
              <h3 className="text-xl font-bold text-black">Jesi li znao/la?</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {insect.fun_facts.map((fact: string, i: number) => (
                <div
                  key={i}
                  className="bg-linear-to-br from-zinc-50 to-green-50/30 p-6 rounded-2xl hover:shadow-md transition-all border border-zinc-100"
                >
                  <span className="block text-green-600 font-black text-2xl mb-2 opacity-30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-zinc-700 font-medium text-sm leading-relaxed">
                    {fact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {insect.gallery_images && insect.gallery_images.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-2 mb-8 text-zinc-400">
              <ImageIcon className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Galerija
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {insect.gallery_images.map((url: string, i: number) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-xl overflow-hidden bg-zinc-50"
                >
                  <Image
                    src={url}
                    alt={`${insect.name_hr} - slika ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA - Buy the shirt */}
        <div className="bg-linear-to-br from-zinc-900 to-zinc-800 text-white rounded-3xl p-10 md:p-14 text-center mb-8">
          <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bug className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-2xl font-bold mb-2">
            Nosi {insect.name_hr} na sebi
          </h3>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            Premium majica s ovim kukcem. Skeniraj QR kod na leđima i podijeli
            priču s drugima.
          </p>
          <Link
            href={`/shop/${insect.slug}`}
            className="inline-flex items-center gap-2 bg-green-400 text-black font-bold px-8 py-3 rounded-full hover:bg-green-300 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            Kupi Majicu
          </Link>
        </div>
      </div>
    </main>
  );
}

function StatBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null;
}) {
  if (!value) return null;
  return (
    <div className="flex flex-col items-center text-center px-2">
      <div className="text-zinc-300 mb-2 scale-75">{icon}</div>
      <div className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest mb-1">
        {label}
      </div>
      <div className="text-sm font-semibold text-black">{value}</div>
    </div>
  );
}
