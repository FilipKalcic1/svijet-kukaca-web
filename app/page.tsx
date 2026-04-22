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
              className="inline-flex items-center justify-center gap-2 bg-green-500 text-white hover:bg-green-600 rounded-full text-lg px-8 h-14 transition-colors shadow-lg shadow-green-500/20 font-semibold tracking-wide"
            >
              <Bug className="w-5 h-5" />
              Istraži Kukce
            </Link>
            <Link
              href="/ribe"
              className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white hover:bg-blue-600 rounded-full text-lg px-8 h-14 transition-colors shadow-lg shadow-blue-500/20 font-semibold tracking-wide"
            >
              <Fish className="w-5 h-5" />
              Istraži Ribe
            </Link>
          </div>
        </div>
      </section>

      {/* ─── KAKO FUNKCIONIRA ─── */}
      <section className="py-40 md:py-56 px-6 bg-white border-y border-zinc-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-300">Kako funkcionira</span>
          </div>
          <h2 className="text-center text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Tri Jednostavna Koraka
          </h2>
          <p className="text-center text-zinc-500 mb-24 max-w-lg mx-auto">
            Od kupnje do edukativnog iskustva
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-16">
            <Step number="01" title="Odaberi Majicu">
              Odaberi svog omiljenog kukca ili ribu iz kolekcije majica s pričom.
            </Step>
            <Step number="02" title="Skeniraj QR Kod">
              Na leđima svake majice je QR kod koji vodi na edukativnu stranicu o vrsti.
            </Step>
            <Step number="03" title="Otkrij Priču">
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
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-300">Zašto KAYAHA</span>
          </div>
          <h2 className="text-center text-3xl md:text-4xl font-bold tracking-tight mb-24">
            Zašto Naše Majice?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10">
            <ValueProp
              icon={<Leaf className="w-5 h-5" />}
              title="100% Organski Pamuk"
              desc="Kvalitetan pamuk, 220 gsm. Mekane, udobne, ekološki osviještene."
            />
            <ValueProp
              icon={<QrIcon />}
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
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-[#fafaf8] rounded-2xl border border-zinc-100 flex items-center justify-center mx-auto mb-10">
        <span className="text-2xl font-black text-zinc-300 tracking-wider">{number}</span>
      </div>
      <h3 className="font-bold text-lg mb-5">{title}</h3>
      <p className="text-sm text-zinc-500 leading-relaxed max-w-xs mx-auto">
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
  const accentText = accent === "green" ? "text-green-600 hover:text-green-700" : "text-blue-600 hover:text-blue-700";
  const accentLabel = accent === "green" ? "text-green-600" : "text-blue-600";
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
            className={`inline-flex items-center gap-1.5 text-base font-semibold ${accentText} transition-colors`}
          >
            {ctaLabel}
            <ArrowRight className="w-4 h-4" />
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
  const hoverText = accent === "green" ? "group-hover:text-green-600" : "group-hover:text-blue-600";
  const badgeBg = accent === "green" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600";
  const buttonHover = accent === "green" ? "group-hover:bg-green-500" : "group-hover:bg-blue-500";

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
      <div className="w-14 h-14 bg-white border border-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-8 text-zinc-500">
        {icon}
      </div>
      <h3 className="font-bold text-sm mb-3">{title}</h3>
      <p className="text-xs text-zinc-500 leading-relaxed max-w-[18ch] mx-auto">{desc}</p>
    </div>
  );
}

function QrIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM17 17h4v4h-4zM14 20h3" />
    </svg>
  );
}
