import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import {
  Bug,
  Fish,
  ArrowRight,
  Truck,
  Leaf,
  ShieldCheck,
  ShoppingBag,
  BookOpen,
} from "lucide-react";
import LandingNav from "@/components/LandingNav";

export const revalidate = 3600;

export default async function LandingPage() {
  const [{ data: insectsData }, { data: fishesData }] = await Promise.all([
    supabase
      .from("creatures")
      .select("slug, name_hr, name_science, price, image_url, creature_type, category")
      .eq("creature_type", "insect")
      .order("created_at", { ascending: true })
      .limit(4),
    supabase
      .from("creatures")
      .select("slug, name_hr, name_science, price, image_url, creature_type, category")
      .eq("creature_type", "fish")
      .order("created_at", { ascending: true })
      .limit(4),
  ]);

  const insects = insectsData ?? [];
  const fishes = fishesData ?? [];

  return (
    <div className="min-h-screen bg-[#fafaf8] font-sans text-zinc-900 selection:bg-zinc-200">
      <LandingNav />

      {/* ─── HERO ─── */}
      <section className="relative pt-44 md:pt-56 pb-40 md:pb-56 px-6 text-center overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-green-200/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute top-32 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-[120px] -z-10" />

        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-12 md:mb-14">
            Nosi prirodu,
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-500 via-emerald-500 to-blue-500">
              upoznaj svijet.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto mb-14 md:mb-16 leading-relaxed">
            Svaka majica nosi priču o jednoj vrsti. Skeniraj QR kod na leđima i otkrij
            tajni život životinje koju nosiš.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kukci"
              className="group inline-flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700 rounded-full text-lg px-8 h-14 transition-all shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/30 active:scale-[0.98] font-semibold tracking-wide"
            >
              <Bug className="w-5 h-5 transition-transform group-hover:-rotate-6" />
              Istraži Kukce
            </Link>
            <Link
              href="/ribe"
              className="group inline-flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 rounded-full text-lg px-8 h-14 transition-all shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 active:scale-[0.98] font-semibold tracking-wide"
            >
              <Fish className="w-5 h-5 transition-transform group-hover:rotate-6" />
              Istraži Ribe
            </Link>
          </div>
        </div>
      </section>

      {/* ─── KAKO FUNKCIONIRA ─── */}
      <section className="py-40 md:py-56 px-6 bg-white border-y border-zinc-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 md:mb-24">
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-400">
              Kako funkcionira
            </span>
            <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] max-w-2xl mx-auto">
              Od majice
              <br />
              <span className="text-zinc-400">do priče.</span>
            </h2>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-6">
            <div
              aria-hidden
              className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-px border-t border-dashed border-zinc-200 pointer-events-none"
            />

            <Step
              number="01"
              icon={<ShoppingBag className="w-6 h-6" strokeWidth={1.5} />}
              title="Odaberi majicu"
            >
              Odaberi svog omiljenog kukca ili ribu iz kolekcije majica s pričom.
            </Step>
            <Step
              number="02"
              icon={<QrIcon className="w-6 h-6" />}
              title="Skeniraj QR kod"
            >
              Na leđima svake majice je QR kod koji vodi na edukativnu stranicu o vrsti.
            </Step>
            <Step
              number="03"
              icon={<BookOpen className="w-6 h-6" strokeWidth={1.5} />}
              title="Otkrij priču"
            >
              Saznaj zanimljivosti, stanište, prehranu i fascinantne činjenice o vrsti.
            </Step>
          </div>
        </div>
      </section>

      {/* ─── SVIJET KUKACA — Featured ─── */}
      <FeaturedSection
        label="Kolekcija"
        title="Kukci"
        subtitle="Maleni junaci. Velike priče."
        href="/kukci"
        ctaLabel="Pogledaj sve kukce"
        items={insects}
        accent="green"
      />

      {/* ─── SVIJET RIBA — Featured ─── */}
      <FeaturedSection
        label="Kolekcija"
        title="Ribe"
        subtitle="Ispod površine. Cijeli jedan svijet."
        href="/ribe"
        ctaLabel="Pogledaj sve ribe"
        items={fishes}
        accent="blue"
        dark
      />


      {/* ─── ZAŠTO MI ─── */}
      <section className="py-40 md:py-56 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-400">
              Zašto KAYAHA
            </span>
            <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] max-w-2xl mx-auto">
              Svaki detalj
              <br />
              <span className="text-zinc-400">ima razlog.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
            {/* Hero: organski pamuk */}
            <div className="md:col-span-7 rounded-3xl bg-white border border-zinc-100 p-10 md:p-12">
              <div className="w-14 h-14 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-10">
                <Leaf className="w-6 h-6 text-zinc-900" strokeWidth={1.5} />
              </div>
              <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                Materijal
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-zinc-900">
                100% organski pamuk
              </h3>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed max-w-md">
                Certificirani GOTS pamuk, 220 gsm. Mekane, udobne,
                ekološki osviještene od njive do ormara.
              </p>
            </div>

            {/* QR kod (tamni) */}
            <div className="md:col-span-5 rounded-3xl bg-zinc-900 text-white p-10 md:p-12">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center ring-1 ring-white/10 mb-10">
                <QrIcon className="w-6 h-6 text-white" />
              </div>
              <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                Interakcija
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                QR kod s pričom
              </h3>
              <p className="text-zinc-400 text-base leading-relaxed">
                Svaka majica otvara edukativnu stranicu o vrsti koju nosiš.
              </p>
            </div>

            {/* Dostava */}
            <div className="md:col-span-6 rounded-3xl bg-white border border-zinc-100 p-10 md:p-12">
              <div className="w-14 h-14 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-10">
                <Truck className="w-6 h-6 text-zinc-900" strokeWidth={1.5} />
              </div>
              <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                Dostava
              </div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3 text-zinc-900">
                Brzo na kućnom pragu
              </h3>
              <p className="text-zinc-500 text-base leading-relaxed">
                GLS dostava u 2–3 radna dana. Besplatna iznad 50 €.
              </p>
            </div>

            {/* Plaćanje */}
            <div className="md:col-span-6 rounded-3xl bg-white border border-zinc-100 p-10 md:p-12">
              <div className="w-14 h-14 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-10">
                <ShieldCheck className="w-6 h-6 text-zinc-900" strokeWidth={1.5} />
              </div>
              <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
                Plaćanje
              </div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3 text-zinc-900">
                Sigurna kupovina
              </h3>
              <p className="text-zinc-500 text-base leading-relaxed">
                Kartica, Apple Pay, Google Pay ili pouzećem — kako ti
                odgovara.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-zinc-900 text-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div>
              <div className="mb-6">
                <Image
                  src="/images/kayaha-logo.png"
                  alt="KAYAHA"
                  width={400}
                  height={218}
                  className="h-12 w-auto object-contain brightness-0 invert"
                />
              </div>
              <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">
                Majice s pričom. Svaka nosi priču o jednoj vrsti.
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

          <div className="border-t border-zinc-800 pt-6">
            <p className="text-zinc-500 text-xs">
              © 2026 KAYAHA. Sva prava pridržana.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Step ─── */
function Step({
  number,
  icon,
  title,
  children,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative text-center">
      <div className="relative z-10 w-20 h-20 rounded-full bg-white border border-zinc-200 flex items-center justify-center mx-auto mb-8 text-zinc-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)] ring-8 ring-white">
        {icon}
      </div>
      <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-3 tabular-nums">
        {number} — Korak
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-zinc-900 tracking-tight mb-4">
        {title}
      </h3>
      <p className="text-base text-zinc-500 leading-relaxed max-w-xs mx-auto">
        {children}
      </p>
    </div>
  );
}

/* ─── Featured Section ─── */
function FeaturedSection({
  label,
  title,
  subtitle,
  href,
  ctaLabel,
  items,
  accent,
  dark = false,
}: {
  label: string;
  title: string;
  subtitle: string;
  href: string;
  ctaLabel: string;
  items: Array<{
    slug: string;
    name_hr: string;
    name_science: string;
    price: number;
    image_url: string | null;
    category: string;
  }>;
  accent: "green" | "blue";
  dark?: boolean;
}) {
  const accentCta =
    accent === "green"
      ? "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/30"
      : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30";
  const accentLabel = accent === "green" ? "text-green-700" : "text-blue-700";
  const accentDot = accent === "green" ? "bg-green-500" : "bg-blue-500";
  const accentGradient =
    accent === "green"
      ? "from-green-500 via-emerald-500 to-green-600"
      : "from-blue-500 via-sky-500 to-blue-600";
  const sectionBg = dark ? "bg-white border-y border-zinc-100" : "";

  return (
    <section className={`py-40 md:py-56 px-6 ${sectionBg}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className={`w-1.5 h-1.5 rounded-full ${accentDot}`} />
            <span className={`text-[11px] font-bold uppercase tracking-[0.28em] ${accentLabel}`}>
              {label}
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${accentDot}`} />
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-5">
            <span className={`text-transparent bg-clip-text bg-linear-to-r ${accentGradient}`}>
              {title}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-500 max-w-xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {items.map((item) => (
            <ProductCard key={item.slug} item={item} accent={accent} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href={href}
            className={`group inline-flex items-center gap-2 h-12 px-7 rounded-full text-sm font-bold tracking-wide transition-all active:scale-[0.98] ${accentCta}`}
          >
            {ctaLabel}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Product Card ─── */
function ProductCard({
  item,
  accent,
}: {
  item: {
    slug: string;
    name_hr: string;
    name_science: string;
    price: number;
    image_url: string | null;
    category: string;
  };
  accent: "green" | "blue";
}) {
  const img = item.image_url;
  const hoverText = accent === "green" ? "group-hover:text-green-700" : "group-hover:text-blue-700";
  const badgeBg = accent === "green" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700";
  const buttonHover = accent === "green" ? "group-hover:bg-green-600" : "group-hover:bg-blue-600";

  return (
    <Link href={`/shop/${item.slug}`} className="group block">
      <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-3/4 bg-[#fafaf8]">
          {img ? (
            <Image
              src={img}
              alt={item.name_hr}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain p-3"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-200">
              {accent === "green" ? (
                <Bug className="w-12 h-12" />
              ) : (
                <Fish className="w-12 h-12" />
              )}
            </div>
          )}
        </div>
        <div className="p-5">
          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${badgeBg} px-2 py-0.5 rounded-full inline-block mb-3`}>
            {item.category}
          </p>
          <h3 className={`font-bold text-sm md:text-base leading-tight mb-1 ${hoverText} transition-colors`}>
            {item.name_hr}
          </h3>
          <p className="text-xs text-zinc-400 italic font-serif mb-4 truncate">
            {item.name_science}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">{item.price} €</span>
            <div className={`bg-zinc-900 text-white text-xs font-medium px-3 py-1.5 rounded-full ${buttonHover} transition-colors`}>
              Pogledaj
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function QrIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM17 17h4v4h-4zM14 20h3" />
    </svg>
  );
}
