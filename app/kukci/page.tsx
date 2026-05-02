import { supabase } from "@/lib/supabase";
import HomeNav from "@/components/HomeNav";
import ShopGrid from "@/components/ShopGrid";
import SiteFooter from "@/components/SiteFooter";
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
    <div className="min-h-screen bg-[#F8F5EE] text-zinc-900 font-sans selection:bg-accent-300 selection:text-black scroll-smooth">
      <HomeNav />

      {/* HERO */}
      <section className="relative pt-32 md:pt-44 pb-24 md:pb-36 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-zinc-900 mb-8 md:mb-12 tracking-tight leading-[1.05]">
            {INSECT_THEME.heroTitle[0]} <br />
            <span className="text-accent-600">{INSECT_THEME.heroTitle[1]}</span>
          </h1>
          <p className="text-lg md:text-2xl text-zinc-600 max-w-2xl mx-auto mb-12 md:mb-14 leading-relaxed">
            {INSECT_THEME.shopSubtitle}
          </p>
          <a href="#shop" className="cta-primary text-base md:text-lg px-8 h-14">
            {INSECT_THEME.heroCta}
          </a>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
        <ShopGrid creatures={creatures ?? []} theme={INSECT_THEME} />
      </section>

      <SiteFooter />
    </div>
  );
}
