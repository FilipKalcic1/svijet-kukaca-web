import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { LegalPage } from "@/lib/legal";

export default function LegalPage({ page }: { page: LegalPage }) {
  return (
    <main className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-green-100">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center text-sm font-medium text-zinc-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Natrag
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-16 pb-32">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black mb-6">
          {page.heading}
        </h1>

        {page.intro && (
          <p className="text-lg text-zinc-500 leading-relaxed mb-16 border-l-2 border-green-300 pl-4">
            {page.intro}
          </p>
        )}

        <div className="space-y-12">
          {page.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-black mb-3">
                {section.title}
              </h2>
              <div className="text-zinc-600 leading-relaxed text-base space-y-3">
                {section.content.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
