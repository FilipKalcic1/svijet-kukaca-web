import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
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

  return (
    <main className="min-h-screen bg-[#F8F5EE] text-zinc-900 font-sans selection:bg-accent-100">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 h-16 md:h-20 flex items-center">
        <div className="max-w-3xl mx-auto w-full flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center text-sm font-medium text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Natrag
          </Link>
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/images/kayaha-logo.png"
              alt="KAYAHA"
              width={800}
              height={435}
              className="h-7 md:h-8 w-auto object-contain"
            />
          </Link>

        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6">
        {/* Hero */}
        <header className="pt-20 md:pt-28 pb-16 md:pb-20 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-400">
            Saznaj više
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-zinc-900">
            Članci i
            <br />
            <span className="text-zinc-400">zanimljivosti.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-zinc-500 max-w-xl mx-auto leading-relaxed">
            Edukativni tekstovi o kukcima, člankonošcima i fascinantnom svijetu
            koji nas okružuje.
          </p>
        </header>

        {/* Article list — table-of-contents style */}
        <div className="divide-y divide-zinc-200 border-t border-zinc-200">
          {(articles ?? []).map((article, i) => (
            <Link
              key={article.slug}
              href={`/clanci/${article.slug}`}
              className="group block py-7 md:py-8 transition-colors"
            >
              <div className="flex items-start gap-5 md:gap-8">
                <div className="text-xs md:text-sm font-bold tabular-nums text-zinc-300 group-hover:text-zinc-900 transition-colors pt-1.5 shrink-0 w-7">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 mb-2">
                    {categoryLabels[article.category] || article.category}
                  </div>
                  <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 mb-2 leading-snug transition-colors group-hover:text-accent-700">
                    {article.title}
                  </h2>
                  {article.summary && (
                    <p className="text-sm md:text-base text-zinc-500 leading-relaxed line-clamp-2">
                      {article.summary}
                    </p>
                  )}
                </div>
                <ArrowUpRight
                  className="w-5 h-5 text-zinc-300 group-hover:text-zinc-900 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-1.5"
                  strokeWidth={1.5}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-24 md:mt-32">
        <SiteFooter />
      </div>
    </main>
  );
}
