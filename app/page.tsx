import { supabase } from "@/lib/supabase";
import HomeNav from "@/components/HomeNav";
import ShopGrid from "@/components/ShopGrid";
import Link from "next/link";
import { Bug } from "lucide-react";

export const revalidate = 3600;

export default async function Home() {
  const { data: insects } = await supabase.from("insects").select("*");

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-green-300 selection:text-black scroll-smooth">

      <HomeNav />

      {/* HERO */}
      <section className="relative pt-40 pb-32 px-6 min-h-screen flex flex-col items-center justify-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-green-300/20 rounded-full blur-[100px] -z-10" />
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-zinc-900 mb-8 tracking-tight leading-[1.1]">
          Nosi Prirodu. <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-green-500 to-emerald-700">
            Upoznaj Svijet.
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          Premium majice s edukativnom pričom. Skeniraj QR kod na leđima i otkrij tajni život kukca kojeg nosiš.
        </p>
        <a
          href="#shop"
          className="inline-flex items-center justify-center bg-black text-white hover:bg-green-400 hover:text-black rounded-full text-lg px-8 h-14 transition-all shadow-lg hover:shadow-green-300/50 font-medium"
        >
          Pronađi Svog Kukca
        </a>
      </section>

      {/* SHOP */}
      <section id="shop" className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
        <ShopGrid insects={insects ?? []} />
      </section>

      {/* FOOTER */}
      <footer className="bg-white text-zinc-900 py-20 px-6 mt-20 text-center border-t border-zinc-100">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
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
