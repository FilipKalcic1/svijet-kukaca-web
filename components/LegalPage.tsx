import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Leaf } from "lucide-react";
import type { LegalPage } from "@/lib/legal";

export default function LegalPage({ page }: { page: LegalPage }) {
  return (
    <main className="min-h-screen bg-[#fafaf8] text-zinc-900 font-sans selection:bg-accent-100">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 h-36 flex items-center">
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
              width={400}
              height={144}
              className="h-32 w-auto object-contain"
            />
          </Link>
          <div />
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-16 pb-32">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black mb-6">
          {page.heading}
        </h1>

        {page.intro && (
          <p className="text-lg text-zinc-400 leading-relaxed mb-16 border-l-2 border-accent-300 pl-4">
            {page.intro}
          </p>
        )}

        <div className="space-y-12">
          {page.sections.map((section) => (
            <div key={section.title} className="bg-white rounded-2xl border border-zinc-100 p-6 md:p-8">
              <h2 className="text-lg font-bold text-black mb-3">
                {section.title}
              </h2>
              <div className="text-zinc-500 leading-relaxed text-base space-y-3">
                {section.content.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
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
