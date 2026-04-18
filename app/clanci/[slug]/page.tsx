import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import ShareButton from "@/components/ShareButton";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const { data: article } = await supabase
    .from("articles")
    .select("title, summary")
    .eq("slug", params.slug)
    .maybeSingle();

  if (!article) return { title: "Članak - Svijet Kukaca" };

  return {
    title: `${article.title} | Svijet Kukaca`,
    description: article.summary || article.title,
  };
}

export default async function ArticlePage(props: PageProps) {
  const params = await props.params;
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", params.slug)
    .maybeSingle();

  if (!article) return notFound();

  const categoryLabels: Record<string, string> = {
    uvod: "Uvod",
    edukacija: "Edukacija",
    zanimljivosti: "Zanimljivosti",
  };

  return (
    <main className="min-h-screen bg-white text-black pb-32 font-sans selection:bg-green-100">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/clanci"
            className="flex items-center text-sm font-medium text-zinc-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Svi članci
          </Link>
          <div className="flex gap-3 items-center">
            <span className="text-[10px] font-bold bg-zinc-100 px-2 py-1 rounded text-zinc-500 uppercase tracking-wider">
              {categoryLabels[article.category] || article.category}
            </span>
            <ShareButton
              title={article.title}
              text={`Pročitaj članak: ${article.title}`}
            />
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 mt-16">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-green-600 text-xs font-bold uppercase tracking-widest mb-4 bg-green-50 px-3 py-1.5 rounded-full">
            <BookOpen className="w-3 h-3" />
            Članak
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-black mb-4">
            {article.title}
          </h1>
          {article.summary && (
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              {article.summary}
            </p>
          )}
        </div>

        {/* Body */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="text-base md:text-lg text-zinc-700 leading-relaxed whitespace-pre-line">
            {article.body}
          </div>
        </div>

        {/* Back to articles */}
        <div className="text-center">
          <Link
            href="/clanci"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Povratak na sve članke
          </Link>
        </div>
      </div>
    </main>
  );
}
