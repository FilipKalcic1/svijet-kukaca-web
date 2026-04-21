import { supabase } from "@/lib/supabase";
import HomeNav from "@/components/HomeNav";
import ShopGrid from "@/components/ShopGrid";
import Link from "next/link";
import Image from "next/image";
import { INSECT_THEME } from "@/lib/themes";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Svijet Kukaca - Edukativne majice s pričom | KAYAHA",
  description:
    "Majice s edukativnom pričom o kukcima. Skeniraj QR kod na leđima i otkrij tajni život kukca kojeg nosiš.",
};

export default async function InsectShopPage() {
  const { data: creatures } = await supabase
    .from("creatures")
    .select("*")
    .eq("creature_type", "insect");

  return (
    <div className="min-h-screen bg-[#fafaf8] text-zinc-900 font-sans selection:bg-accent-300 selection:text-black scroll-smooth">
      <HomeNav />

      {/* HERO */}
      <section className="relative pt-36 md:pt-44 pb-28 md:pb-36 px-6 text-center">
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-125 h-125 bg-accent-300/15 rounded-full blur-[100px] -z-10" />
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-zinc-900 mb-10 md:mb-12 tracking-tight leading-[1.05]">
            {INSECT_THEME.heroTitle[0]} <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-500 to-accent-700">
              {INSECT_THEME.heroTitle[1]}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto mb-14 leading-relaxed">
            {INSECT_THEME.shopSubtitle}
          </p>
          <a
            href="#shop"
            className="inline-flex items-center justify-center bg-black text-white hover:bg-accent-400 hover:text-black rounded-full text-lg px-8 h-14 transition-all shadow-lg hover:shadow-accent-300/50 font-semibold tracking-wide"
          >
            {INSECT_THEME.heroCta}
          </a>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
        <ShopGrid creatures={creatures ?? []} theme={INSECT_THEME} />
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-900 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <Image
              src="/images/kayaha-logo.png"
              alt="KAYAHA"
              width={300}
              height={128}
              className="h-12 w-auto object-contain brightness-0 invert mx-auto"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10 text-sm text-zinc-400">
            <Link href="/o-projektu" className="hover:text-white transition-colors">O projektu</Link>
            <Link href="/uvjeti" className="hover:text-white transition-colors">Uvjeti poslovanja</Link>
            <Link href="/privatnost" className="hover:text-white transition-colors">Politika privatnosti</Link>
            <Link href="/kolacici" className="hover:text-white transition-colors">Kolačići</Link>
          </div>
          <div className="border-t border-zinc-800 pt-6">
            <p className="text-zinc-500 text-xs">© 2026 KAYAHA. Sva prava pridržana.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
