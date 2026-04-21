import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Sparkles, Leaf } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Članci i zanimljivosti | KAYAHA",
  description:
    "Edukativni članci o kukcima, člankonošcima i fascinantnom svijetu insekata. Saznaj više o klasifikaciji, rekorderima i opasnim vrstama.",
};

export default async function ArticlesPage() {
  const { data: articles } = await supabase
    .from("articles")
    .select("slug, title, summary, category")
    .order("sort_order", { ascending: true });

  const categoryLabels: Record<string, string> = {
    uvod: "Uvod",
    edukacija: "Edukacija",
    zanimljivosti: "Zanimljivosti",
  };

  const categoryColors: Record<string, string> = {
    uvod: "bg-blue-50 text-blue-600 border-blue-100",
    edukacija: "bg-green-50 text-green-600 border-green-100",
    zanimljivosti: "bg-amber-50 text-amber-600 border-amber-100",
  };

  return (
    <main className="min-h-screen bg-[#fafaf8] text-black pb-32 font-sans selection:bg-accent-100">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 h-16 md:h-20 flex items-center">
        <div className="max-w-3xl mx-auto w-full flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center text-sm font-medium text-zinc-400 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Natrag
          </Link>
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/images/kayaha-logo.png"
              alt="KAYAHA"
              width={800}
              height={384}
              className="h-7 md:h-8 w-auto object-contain"
            />
          </Link>
          <span className="text-[10px] font-bold bg-zinc-100 px-3 py-1.5 rounded-full text-zinc-400 uppercase tracking-[0.2em]">
            Članci
          </span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 mt-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-accent-600 text-xs font-bold uppercase tracking-[0.2em] mb-4 bg-accent-50 px-4 py-2 rounded-full border border-accent-100">
            <Sparkles className="w-3 h-3" />
            Saznaj više
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-3">
            Članci i zanimljivosti
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto">
            Edukativni tekstovi o kukcima, člankonošcima i fascinantnom svijetu
            koji nas okružuje.
          </p>
        </div>

        {/* Article list */}
        <div className="space-y-4">
          {(articles ?? []).map((article) => (
            <Link
              key={article.slug}
              href={`/clanci/${article.slug}`}
              className="block bg-white border border-zinc-100 rounded-2xl p-6 hover:shadow-lg hover:border-zinc-200 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#fafaf8] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent-50 transition-colors">
                  <BookOpen className="w-5 h-5 text-zinc-400 group-hover:text-accent-600 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full border ${categoryColors[article.category] || "bg-zinc-50 text-zinc-500 border-zinc-100"}`}
                    >
                      {categoryLabels[article.category] || article.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-black mb-1 group-hover:text-accent-700 transition-colors">
                    {article.title}
                  </h2>
                  {article.summary && (
                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
                      {article.summary}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom tagline */}
        <div className="flex items-center justify-center gap-3 mt-16">
          <div className="h-px flex-1 max-w-16 bg-zinc-200" />
          <div className="flex items-center gap-2">
            <Leaf className="w-3 h-3 text-zinc-300" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-300">KAYAHA</span>
          </div>
          <div className="h-px flex-1 max-w-16 bg-zinc-200" />
        </div>
      </div>
    </main>
  );
}
