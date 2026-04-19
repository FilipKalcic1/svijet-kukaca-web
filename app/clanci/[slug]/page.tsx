import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, BookOpen, Leaf } from "lucide-react";
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

  if (!article) return { title: "Članak - KAYAHA" };

  return {
    title: `${article.title} | KAYAHA`,
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
    <main className="min-h-screen bg-[#fafaf8] text-black pb-32 font-sans selection:bg-accent-100">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 h-36 flex items-center">
        <div className="max-w-3xl mx-auto w-full flex items-center justify-between">
          <Link
            href="/clanci"
            className="flex items-center text-sm font-medium text-zinc-400 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Svi članci
          </Link>
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/images/kayaha-logo.png"
              alt="KAYAHA"
              width={400}
              height={144}
              className="h-32 w-auto object-contain"
            />
          </Link>
          <div className="flex gap-3 items-center">
            <span className="text-[10px] font-bold bg-zinc-100 px-3 py-1.5 rounded-full text-zinc-400 uppercase tracking-[0.2em]">
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
          <div className="inline-flex items-center gap-2 text-accent-600 text-xs font-bold uppercase tracking-[0.2em] mb-4 bg-accent-50 px-4 py-2 rounded-full border border-accent-100">
            <BookOpen className="w-3 h-3" />
            Članak
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-black mb-4">
            {article.title}
          </h1>
          {article.summary && (
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              {article.summary}
            </p>
          )}
        </div>

        {/* Body */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="bg-white rounded-2xl border border-zinc-100 p-8 md:p-12">
            <div className="text-base md:text-lg text-zinc-600 leading-relaxed whitespace-pre-line">
              {article.body}
            </div>
          </div>
        </div>

        {/* Back to articles */}
        <div className="text-center">
          <Link
            href="/clanci"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-600 hover:text-accent-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Povratak na sve članke
          </Link>
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
