import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Članci i zanimljivosti o kukcima | Svijet Kukaca",
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
    uvod: "bg-blue-50 text-blue-600",
    edukacija: "bg-green-50 text-green-600",
    zanimljivosti: "bg-amber-50 text-amber-600",
  };

  return (
    <main className="min-h-screen bg-white text-black pb-32 font-sans selection:bg-green-100">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center text-sm font-medium text-zinc-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Natrag
          </Link>
          <span className="text-[10px] font-bold bg-zinc-100 px-2 py-1 rounded text-zinc-500 uppercase tracking-wider">
            Članci
          </span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 mt-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-green-600 text-xs font-bold uppercase tracking-widest mb-4 bg-green-50 px-3 py-1.5 rounded-full">
            <Sparkles className="w-3 h-3" />
            Saznaj više
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-3">
            Članci i zanimljivosti
          </h1>
          <p className="text-lg text-zinc-500 max-w-xl mx-auto">
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
              className="block border border-zinc-100 rounded-2xl p-6 hover:shadow-lg hover:border-zinc-200 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-50 transition-colors">
                  <BookOpen className="w-5 h-5 text-zinc-400 group-hover:text-green-600 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${categoryColors[article.category] || "bg-zinc-50 text-zinc-500"}`}
                    >
                      {categoryLabels[article.category] || article.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-black mb-1 group-hover:text-green-700 transition-colors">
                    {article.title}
                  </h2>
                  {article.summary && (
                    <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
                      {article.summary}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
