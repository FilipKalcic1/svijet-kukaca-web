import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Leaf,
  Ruler,
  Image as ImageIcon,
  ShoppingBag,
  Bug,
  Fish,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import React from "react";
import ShareButton from "@/components/ShareButton";
import ImageLightbox from "@/components/ImageLightbox";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const { data: creature } = await supabase
    .from("creatures")
    .select("name_hr, name_science, description, creature_type")
    .eq("slug", params.slug)
    .maybeSingle();

  if (!creature) return { title: "Wiki" };

  const siteName = creature.creature_type === "fish" ? "Svijet Riba" : "Svijet Kukaca";
  return {
    title: `${creature.name_hr} (${creature.name_science}) - Wiki | ${siteName}`,
    description:
      creature.description?.slice(0, 160) ||
      `Saznaj sve o vrsti ${creature.name_hr} (${creature.name_science})`,
  };
}

export default async function CreaturePage(props: PageProps) {
  const params = await props.params;
  const { data: creature } = await supabase
    .from("creatures")
    .select("*")
    .eq("slug", params.slug)
    .maybeSingle();

  if (!creature) return notFound();

  const isFish = creature.creature_type === "fish";
  const CreatureIcon = isFish ? Fish : Bug;
  const backPath = isFish ? "/ribe" : "/kukci";

  let relatedCreatures: Array<{
    slug: string;
    name_hr: string;
    name_science: string | null;
    description: string | null;
    image_url: string | null;
    size: string | null;
    food: string | null;
    habitat: string | null;
  }> = [];

  if (creature.related_slugs && creature.related_slugs.length > 0) {
    const { data } = await supabase
      .from("creatures")
      .select("slug, name_hr, name_science, description, image_url, size, food, habitat")
      .in("slug", creature.related_slugs);
    relatedCreatures = data ?? [];
  }

  const { data: articles } = await supabase
    .from("articles")
    .select("slug, title, summary, category")
    .order("sort_order", { ascending: true })
    .limit(5);

  return (
    <main
      className="min-h-screen bg-[#fafaf8] text-black pb-32 font-sans selection:bg-accent-100"
      data-theme={isFish ? "fish" : undefined}
    >
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 h-16 md:h-20 flex items-center">
        <div className="max-w-3xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={backPath}
              className="flex items-center text-sm font-medium text-zinc-400 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Natrag
            </Link>
          </div>
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/images/kayaha-logo.png"
              alt="KAYAHA"
              width={800}
              height={435}
              className="h-7 md:h-8 w-auto object-contain"
            />
          </Link>
          <div className="flex gap-3 items-center">
            <span className="text-[10px] font-bold bg-zinc-100 px-3 py-1.5 rounded-full text-zinc-400 uppercase tracking-[0.2em]">
              Wiki
            </span>
            <ShareButton
              title={creature.name_hr}
              text={`Saznaj više o vrsti ${creature.name_hr}!`}
            />
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 mt-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black mb-3">
            {creature.name_hr}
          </h1>
          {creature.name_science && (
            <p className="text-xl md:text-2xl text-zinc-400 font-serif italic mb-8">
              {creature.name_science}
            </p>
          )}
          <p className="text-lg md:text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
            {creature.description}
          </p>
        </div>

        {/* Stats */}
        {(creature.size || creature.food || creature.habitat) && (
          <div className="grid grid-cols-3 divide-x divide-zinc-100 border border-zinc-100 rounded-2xl bg-white py-10 mb-20">
            <StatBox icon={<Ruler />} label="Veličina" value={creature.size} />
            <StatBox icon={<Leaf />} label="Hrana" value={creature.food} />
            <StatBox icon={<MapPin />} label="Stanište" value={creature.habitat} />
          </div>
        )}

        {/* Fun facts */}
        {creature.fun_facts && creature.fun_facts.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-2 mb-8">
              <CreatureIcon className="w-5 h-5 text-accent-600" />
              <h3 className="text-xl font-bold text-black">Jesi li znao/la?</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {creature.fun_facts.map((fact: string, i: number) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl hover:shadow-md transition-all border border-zinc-100"
                >
                  <span className="block text-accent-500 font-black text-2xl mb-2 opacity-30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-zinc-600 font-medium text-sm leading-relaxed">
                    {fact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {creature.gallery_images && creature.gallery_images.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-2 mb-8 text-zinc-400">
              <ImageIcon className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Galerija
              </span>
            </div>
            <ImageLightbox
              images={creature.gallery_images}
              altPrefix={creature.name_hr}
            />
          </div>
        )}

        {/* Related / Comparison species */}
        {relatedCreatures.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-2 mb-8">
              <CreatureIcon className="w-5 h-5 text-accent-600" />
              <h3 className="text-xl font-bold text-black">Usporedba vrsta</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedCreatures.map((related) => (
                <div
                  key={related.slug}
                  className="border border-zinc-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all bg-white"
                >
                  {related.image_url && (
                    <div className="relative aspect-4/3 bg-[#fafaf8]">
                      <Image
                        src={related.image_url}
                        alt={related.name_hr}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain p-3"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-black mb-1">
                      {related.name_hr}
                    </h4>
                    {related.name_science && (
                      <p className="text-sm text-zinc-400 font-serif italic mb-3">
                        {related.name_science}
                      </p>
                    )}
                    {related.description && (
                      <p className="text-sm text-zinc-500 leading-relaxed mb-4 line-clamp-3">
                        {related.description}
                      </p>
                    )}
                    {(related.size || related.food || related.habitat) && (
                      <div className="flex flex-wrap gap-2 mb-4 text-xs text-zinc-500">
                        {related.size && (
                          <span className="bg-[#fafaf8] px-2.5 py-1 rounded-full border border-zinc-100">
                            {related.size}
                          </span>
                        )}
                        {related.food && (
                          <span className="bg-[#fafaf8] px-2.5 py-1 rounded-full border border-zinc-100">
                            {related.food}
                          </span>
                        )}
                        {related.habitat && (
                          <span className="bg-[#fafaf8] px-2.5 py-1 rounded-full border border-zinc-100">
                            {related.habitat}
                          </span>
                        )}
                      </div>
                    )}
                    <Link
                      href={`/wiki/${related.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-accent-600 hover:text-accent-700 transition-colors"
                    >
                      Saznaj više
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Articles */}
        {articles && articles.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-2 mb-8">
              <BookOpen className="w-5 h-5 text-accent-600" />
              <h3 className="text-xl font-bold text-black">Saznaj više</h3>
            </div>
            <div className="space-y-3">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/clanci/${article.slug}`}
                  className="flex items-center gap-3 p-4 rounded-2xl border border-zinc-100 bg-white hover:border-zinc-200 hover:shadow-md transition-all group"
                >
                  <div className="w-9 h-9 bg-[#fafaf8] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent-50 transition-colors">
                    <BookOpen className="w-4 h-4 text-zinc-400 group-hover:text-accent-600 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-black group-hover:text-accent-700 transition-colors truncate">
                      {article.title}
                    </p>
                    {article.summary && (
                      <p className="text-xs text-zinc-400 truncate">
                        {article.summary}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-accent-600 transition-colors shrink-0" />
                </Link>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/clanci"
                className="text-sm font-semibold text-accent-600 hover:text-accent-700 transition-colors"
              >
                Pogledaj sve članke →
              </Link>
            </div>
          </div>
        )}

        {/* CTA - Buy the shirt */}
        <div className="bg-zinc-900 text-white rounded-3xl p-10 md:p-14 text-center mb-8">
          <div className="w-12 h-12 bg-accent-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreatureIcon className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-2xl font-bold mb-2">
            Nosi {creature.name_hr} na sebi
          </h3>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            Edukativna majica s QR kodom. Skeniraj i podijeli priču s drugima.
          </p>
          <Link
            href={`/shop/${creature.slug}`}
            className="inline-flex items-center gap-2 bg-accent-400 text-black font-bold px-8 py-3 rounded-full hover:bg-accent-300 transition-colors"
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
    <div className="flex flex-col items-center text-center px-3">
      <div className="text-zinc-300 mb-2 scale-75">{icon}</div>
      <div className="text-[10px] font-bold uppercase text-zinc-400 tracking-[0.2em] mb-1">
        {label}
      </div>
      <div className="text-sm font-semibold text-black">{value}</div>
    </div>
  );
}
