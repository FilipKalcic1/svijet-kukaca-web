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
import SiteFooter from "@/components/SiteFooter";

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
    <div className="min-h-screen bg-[#F8F5EE] font-sans text-zinc-900 selection:bg-zinc-200">
      <LandingNav />

      {/* ─── HERO ─── */}
      <section className="relative pt-40 md:pt-56 pb-32 md:pb-56 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-10 md:mb-14 text-zinc-900">
            Nosi prirodu,
            <br />
            <span className="text-accent-600">upoznaj svijet.</span>
          </h1>

          <p className="text-lg md:text-2xl text-zinc-600 max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed">
            Svaka majica nosi priču o jednoj vrsti. Skeniraj QR kod na leđima i otkrij
            tajni život životinje koju nosiš.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/kukci"
              className="cta-primary text-base md:text-lg px-8 h-14"
            >
              <Bug className="w-5 h-5" strokeWidth={1.5} />
              Istraži Kukce
            </Link>
            <Link
              href="/ribe"
              className="cta-outline text-base md:text-lg px-8 h-14"
            >
              <Fish className="w-5 h-5" strokeWidth={1.5} />
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
      />

      {/* ─── SVIJET RIBA — Featured ─── */}
      <FeaturedSection
        label="Kolekcija"
        title="Ribe"
        subtitle="Ispod površine. Cijeli jedan svijet."
        href="/ribe"
        ctaLabel="Pogledaj sve ribe"
        items={fishes}
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

      <SiteFooter />
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
  dark?: boolean;
}) {
  const sectionBg = dark ? "bg-white border-y border-zinc-100" : "";

  return (
    <section className={`py-32 md:py-56 px-6 ${sectionBg}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-600" />
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-700">
              {label}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-600" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-5 text-zinc-900">
            {title}
          </h2>
          <p className="text-base md:text-xl text-zinc-600 max-w-xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {items.map((item) => (
            <ProductCard key={item.slug} item={item} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href={href}
            className="cta-outline group h-12 px-7 text-sm"
          >
            {ctaLabel}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Product Card ─── */
function ProductCard({
  item,
}: {
  item: {
    slug: string;
    name_hr: string;
    name_science: string;
    price: number;
    image_url: string | null;
    category: string;
  };
}) {
  const img = item.image_url;

  return (
    <Link href={`/shop/${item.slug}`} className="group block">
      <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-3/4 bg-[#F8F5EE]">
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
              <Bug className="w-12 h-12" strokeWidth={1.5} />
            </div>
          )}
        </div>
        <div className="p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-700 bg-accent-50 px-2 py-0.5 rounded-full inline-block mb-3">
            {item.category}
          </p>
          <h3 className="font-bold text-sm md:text-base leading-tight mb-1 text-zinc-900 group-hover:text-accent-700 transition-colors">
            {item.name_hr}
          </h3>
          <p className="text-xs text-zinc-400 italic font-serif mb-4 truncate">
            {item.name_science}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg text-zinc-900">{item.price} €</span>
            <div className="bg-zinc-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full group-hover:bg-accent-600 transition-colors">
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
