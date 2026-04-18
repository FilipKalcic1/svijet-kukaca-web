import { supabase } from "@/lib/supabase";
import HomeNav from "@/components/HomeNav";
import ShopGrid from "@/components/ShopGrid";
import Link from "next/link";
import { Bug } from "lucide-react";
import { INSECT_THEME } from "@/lib/themes";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Svijet Kukaca - Edukativne majice s pričom",
  description:
    "Premium majice s edukativnom pričom o kukcima. Skeniraj QR kod na leđima i otkrij tajni život kukca kojeg nosiš.",
};

export default async function InsectShopPage() {
  const { data: creatures } = await supabase
    .from("creatures")
    .select("*")
    .eq("creature_type", "insect");

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-accent-300 selection:text-black scroll-smooth">
      <HomeNav theme={INSECT_THEME} />

      {/* HERO */}
      <section className="relative pt-40 pb-32 px-6 min-h-screen flex flex-col items-center justify-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-accent-300/20 rounded-full blur-[100px] -z-10" />
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-zinc-900 mb-8 tracking-tight leading-[1.1]">
          {INSECT_THEME.heroTitle[0]} <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-500 to-accent-700">
            {INSECT_THEME.heroTitle[1]}
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          {INSECT_THEME.shopSubtitle}
        </p>
        <a
          href="#shop"
          className="inline-flex items-center justify-center bg-black text-white hover:bg-accent-400 hover:text-black rounded-full text-lg px-8 h-14 transition-all shadow-lg hover:shadow-accent-300/50 font-medium"
        >
          {INSECT_THEME.heroCta}
        </a>
      </section>

      {/* SHOP */}
      <section id="shop" className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
        <ShopGrid creatures={creatures ?? []} theme={INSECT_THEME} />
      </section>

      {/* FOOTER */}
      <footer className="bg-white text-zinc-900 py-20 px-6 mt-20 text-center border-t border-zinc-100">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-accent-400 rounded-full flex items-center justify-center">
            <Bug className="w-5 h-5 text-black" />
          </div>
          <span className="font-bold text-xl">Svijet Kukaca</span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6 text-sm text-zinc-400">
          <Link href="/o-projektu" className="hover:text-black transition-colors">O projektu</Link>
          <Link href="/uvjeti" className="hover:text-black transition-colors">Uvjeti poslovanja</Link>
          <Link href="/privatnost" className="hover:text-black transition-colors">Politika privatnosti</Link>
          <Link href="/kolacici" className="hover:text-black transition-colors">Kolačići</Link>
        </div>
        <p className="text-zinc-400 text-sm">© 2026. Sva prava pridržana.</p>
      </footer>
    </div>
  );
}
