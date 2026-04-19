import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import {
  Bug,
  Fish,
  ArrowRight,
  ScanLine,
  Truck,
  Leaf,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const revalidate = 3600;

export default async function LandingPage() {
  const { data: featured } = await supabase
    .from("creatures")
    .select("slug, name_hr, name_science, price, image_url, creature_type, category")
    .order("created_at", { ascending: true })
    .limit(8);

  const insects = (featured ?? []).filter((c) => c.creature_type === "insect");
  const fishes = (featured ?? []).filter((c) => c.creature_type === "fish");

  return (
    <div className="min-h-screen bg-[#fafaf8] font-sans text-zinc-900 selection:bg-zinc-200">
      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-36 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/kayaha-logo.png"
              alt="KAYAHA"
              width={400}
              height={144}
              className="h-32 w-auto object-contain"
              priority
            />
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <Link
              href="/kukci"
              className="flex items-center gap-1.5 text-zinc-400 hover:text-green-600 transition-colors font-medium px-3 py-1.5 rounded-full hover:bg-green-50"
            >
              <Bug className="w-4 h-4" />
              <span className="hidden sm:inline">Kukci</span>
            </Link>
            <Link
              href="/ribe"
              className="flex items-center gap-1.5 text-zinc-400 hover:text-blue-600 transition-colors font-medium px-3 py-1.5 rounded-full hover:bg-blue-50"
            >
              <Fish className="w-4 h-4" />
              <span className="hidden sm:inline">Ribe</span>
            </Link>
            <Link href="/clanci" className="text-zinc-400 hover:text-black transition-colors font-medium px-3 py-1.5 rounded-full hover:bg-zinc-100 hidden sm:inline-flex">
              Članci
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative pt-52 pb-28 md:pt-60 md:pb-36 px-6 text-center overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-green-200/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute top-32 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-[120px] -z-10" />

        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-zinc-400 mb-8 bg-white px-5 py-2.5 rounded-full border border-zinc-100 shadow-sm">
            <Leaf className="w-3 h-3 text-accent-500" />
            Elevated Style · Natural Spirit
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-8">
            Premium Majice
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-500 via-emerald-500 to-blue-500">
              s Pričom.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Svaka majica nosi priču o jednoj vrsti. Skeniraj QR kod na leđima i otkrij
            tajni život životinje koju nosiš.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kukci"
              className="inline-flex items-center justify-center gap-2 bg-black text-white hover:bg-green-500 hover:text-black rounded-full text-lg px-8 h-14 transition-all shadow-lg hover:shadow-green-300/40 font-semibold tracking-wide"
            >
              <Bug className="w-5 h-5" />
              Istraži Kukce
            </Link>
            <Link
              href="/ribe"
              className="inline-flex items-center justify-center gap-2 bg-white text-black border-2 border-zinc-200 hover:bg-blue-500 hover:text-white hover:border-blue-500 rounded-full text-lg px-8 h-14 transition-all shadow-lg hover:shadow-blue-300/40 font-semibold tracking-wide"
            >
              <Fish className="w-5 h-5" />
              Istraži Ribe
            </Link>
          </div>
        </div>
      </section>

      {/* ─── KAKO FUNKCIONIRA ─── */}
      <section className="py-28 px-6 bg-white border-y border-zinc-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-300">Kako funkcionira</span>
          </div>
          <h2 className="text-center text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Tri Jednostavna Koraka
          </h2>
          <p className="text-center text-zinc-400 mb-20 max-w-lg mx-auto">
            Od kupnje do edukativnog iskustva
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            <div className="text-center group">
              <div className="w-18 h-18 bg-[#fafaf8] rounded-2xl border border-zinc-100 flex items-center justify-center mx-auto mb-6 group-hover:shadow-md transition-shadow">
                <span className="text-2xl font-black text-zinc-200">01</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Odaberi Majicu</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Odaberi svog omiljenog kukca ili ribu iz kolekcije premium majica.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-18 h-18 bg-[#fafaf8] rounded-2xl border border-zinc-100 flex items-center justify-center mx-auto mb-6 group-hover:shadow-md transition-shadow">
                <ScanLine className="w-7 h-7 text-zinc-300" />
              </div>
              <h3 className="font-bold text-lg mb-2">Skeniraj QR Kod</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Na leđima svake majice je QR kod koji vodi na edukativnu stranicu o vrsti.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-18 h-18 bg-[#fafaf8] rounded-2xl border border-zinc-100 flex items-center justify-center mx-auto mb-6 group-hover:shadow-md transition-shadow">
                <Sparkles className="w-7 h-7 text-zinc-300" />
              </div>
              <h3 className="font-bold text-lg mb-2">Otkrij Priču</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Saznaj zanimljivosti, stanište, prehranu i fascinantne činjenice o vrsti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SVIJET KUKACA — Featured ─── */}
      {insects.length > 0 && (
        <section className="py-28 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-14">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
                  <Bug className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                    Svijet Kukaca
                  </h2>
                  <p className="text-sm text-zinc-400">Edukativne majice o kukcima</p>
                </div>
              </div>
              <Link
                href="/kukci"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
              >
                Pogledaj sve
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {insects.slice(0, 4).map((item) => (
                <ProductCard key={item.slug} item={item} accentClass="green" />
              ))}
            </div>

            <div className="sm:hidden mt-8 text-center">
              <Link
                href="/kukci"
                className="inline-flex items-center gap-1 text-sm font-semibold text-green-600"
              >
                Pogledaj sve kukce
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── SVIJET RIBA — Featured ─── */}
      {fishes.length > 0 && (
        <section className="py-28 px-6 bg-white border-y border-zinc-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-14">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                  <Fish className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                    Svijet Riba
                  </h2>
                  <p className="text-sm text-zinc-400">Edukativne majice o ribama</p>
                </div>
              </div>
              <Link
                href="/ribe"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Pogledaj sve
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {fishes.slice(0, 4).map((item) => (
                <ProductCard key={item.slug} item={item} accentClass="blue" />
              ))}
            </div>

            <div className="sm:hidden mt-8 text-center">
              <Link
                href="/ribe"
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600"
              >
                Pogledaj sve ribe
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── ZAŠTO MI ─── */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-300">Zašto KAYAHA</span>
          </div>
          <h2 className="text-center text-3xl md:text-4xl font-bold tracking-tight mb-20">
            Zašto Naše Majice?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <ValueProp
              icon={<Leaf className="w-5 h-5" />}
              title="100% Organski Pamuk"
              desc="Premium kvaliteta, 220 gsm. Mekane, udobne, ekološki osviještene."
            />
            <ValueProp
              icon={<ScanLine className="w-5 h-5" />}
              title="Interaktivni QR Kod"
              desc="Svaka majica sadrži QR kod koji otvara edukativnu stranicu o vrsti."
            />
            <ValueProp
              icon={<Truck className="w-5 h-5" />}
              title="Brza Dostava"
              desc="GLS dostava u 2-3 radna dana. Besplatna dostava iznad 50 €."
            />
            <ValueProp
              icon={<ShieldCheck className="w-5 h-5" />}
              title="Sigurna Kupovina"
              desc="Plaćanje karticom, Apple Pay, Google Pay ili pouzećem."
            />
          </div>
        </div>
      </section>

      {/* ─── WORLDS CTA ─── */}
      <section className="px-6 pb-28">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/kukci"
            className="group relative rounded-3xl overflow-hidden p-10 md:p-12 flex flex-col justify-end min-h-[280px]"
          >
            <div className="absolute inset-0 bg-linear-to-br from-green-500 to-emerald-600 group-hover:from-green-400 group-hover:to-emerald-500 transition-all duration-500" />
            <div className="absolute top-6 right-6 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Bug className="w-8 h-8 text-white" />
            </div>
            <div className="relative z-10">
              <p className="text-green-100 text-[10px] font-bold uppercase tracking-[0.25em] mb-2">
                Kolekcija
              </p>
              <h3 className="text-3xl font-extrabold text-white mb-3">
                Svijet Kukaca
              </h3>
              <p className="text-green-100 text-sm mb-5 max-w-xs leading-relaxed">
                {insects.length} {insects.length === 1 ? "vrsta" : insects.length < 5 ? "vrste" : "vrsta"} u kolekciji. Leptiri, kornjaši, bogomoljke i više.
              </p>
              <span className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-2.5 rounded-full text-sm group-hover:gap-3 transition-all">
                Istraži Kukce
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          <Link
            href="/ribe"
            className="group relative rounded-3xl overflow-hidden p-10 md:p-12 flex flex-col justify-end min-h-[280px]"
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-sky-600 group-hover:from-blue-400 group-hover:to-sky-500 transition-all duration-500" />
            <div className="absolute top-6 right-6 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Fish className="w-8 h-8 text-white" />
            </div>
            <div className="relative z-10">
              <p className="text-blue-100 text-[10px] font-bold uppercase tracking-[0.25em] mb-2">
                Kolekcija
              </p>
              <h3 className="text-3xl font-extrabold text-white mb-3">
                Svijet Riba
              </h3>
              <p className="text-blue-100 text-sm mb-5 max-w-xs leading-relaxed">
                {fishes.length} {fishes.length === 1 ? "vrsta" : fishes.length < 5 ? "vrste" : "vrsta"} u kolekciji. Grgeč, pastrva i više uskoro.
              </p>
              <span className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-2.5 rounded-full text-sm group-hover:gap-3 transition-all">
                Istraži Ribe
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-zinc-900 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-14">
            <div>
              <div className="mb-5">
                <Image
                  src="/images/kayaha-logo.png"
                  alt="KAYAHA"
                  width={350}
                  height={126}
                  className="h-28 w-auto object-contain brightness-0 invert"
                />
              </div>
              <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">
                Edukativne majice s pričom. Svaka majica nosi priču o jednoj vrsti.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-sm">
              <Link href="/kukci" className="text-zinc-400 hover:text-white transition-colors">
                Svijet Kukaca
              </Link>
              <Link href="/o-projektu" className="text-zinc-400 hover:text-white transition-colors">
                O projektu
              </Link>
              <Link href="/ribe" className="text-zinc-400 hover:text-white transition-colors">
                Svijet Riba
              </Link>
              <Link href="/uvjeti" className="text-zinc-400 hover:text-white transition-colors">
                Uvjeti poslovanja
              </Link>
              <Link href="/clanci" className="text-zinc-400 hover:text-white transition-colors">
                Članci
              </Link>
              <Link href="/privatnost" className="text-zinc-400 hover:text-white transition-colors">
                Privatnost
              </Link>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-zinc-500 text-xs">
              © 2026 KAYAHA. Sva prava pridržana.
            </p>
            <div className="flex items-center gap-2">
              <Leaf className="w-3 h-3 text-zinc-600" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-medium">Elevated Style · Natural Spirit</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Product Card ─── */
function ProductCard({
  item,
  accentClass,
}: {
  item: {
    slug: string;
    name_hr: string;
    name_science: string;
    price: number;
    image_url: string | null;
    category: string;
  };
  accentClass: "green" | "blue";
}) {
  const img = item.image_url;
  const hoverText = accentClass === "green" ? "group-hover:text-green-600" : "group-hover:text-blue-600";
  const badgeBg = accentClass === "green" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600";
  const buttonHover = accentClass === "green" ? "group-hover:bg-green-400" : "group-hover:bg-blue-400";

  return (
    <Link href={`/shop/${item.slug}`} className="group block">
      <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-3/4 bg-[#fafaf8]">
          {img ? (
            <Image
              src={img}
              alt={item.name_hr}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain p-3"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-200">
              {accentClass === "green" ? (
                <Bug className="w-12 h-12" />
              ) : (
                <Fish className="w-12 h-12" />
              )}
            </div>
          )}
        </div>
        <div className="p-4">
          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${badgeBg} px-2 py-0.5 rounded-full inline-block mb-2`}>
            {item.category}
          </p>
          <h3 className={`font-bold text-sm md:text-base leading-tight mb-0.5 ${hoverText} transition-colors`}>
            {item.name_hr}
          </h3>
          <p className="text-xs text-zinc-400 italic font-serif mb-3 truncate">
            {item.name_science}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">{item.price} €</span>
            <div className={`bg-zinc-900 text-white text-xs font-medium px-3 py-1.5 rounded-full ${buttonHover} group-hover:text-black transition-colors`}>
              Pogledaj
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Value Prop ─── */
function ValueProp({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="text-center">
      <div className="w-14 h-14 bg-white border border-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-5 text-zinc-500">
        {icon}
      </div>
      <h3 className="font-bold text-sm mb-1.5">{title}</h3>
      <p className="text-xs text-zinc-400 leading-relaxed">{desc}</p>
    </div>
  );
}
