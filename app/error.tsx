"use client";

import Image from "next/image";
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#fafaf8] flex flex-col items-center justify-center p-6 text-center">
      <Link href="/" className="mb-10">
        <Image
          src="/images/kayaha-logo.png"
          alt="KAYAHA"
          width={200}
          height={70}
          className="h-16 w-auto object-contain"
        />
      </Link>
      <div className="w-18 h-18 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mb-6">
        <span className="text-3xl font-black text-red-400">!</span>
      </div>
      <h1 className="text-3xl font-black text-zinc-900 mb-2">
        Ups! Nešto je pošlo po krivu.
      </h1>
      <p className="text-zinc-400 mb-8 max-w-md">
        Došlo je do neočekivane greške. Pokušajte ponovo ili se vratite na
        naslovnicu.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-colors tracking-wide"
        >
          Pokušaj ponovo
        </button>
        <a
          href="/"
          className="bg-white border border-zinc-200 text-zinc-900 px-6 py-3 rounded-full font-bold hover:bg-zinc-50 transition-colors tracking-wide"
        >
          Naslovnica
        </a>
      </div>
      <div className="flex items-center gap-2 mt-12">
        <Leaf className="w-3 h-3 text-zinc-300" />
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-300">KAYAHA</span>
      </div>
    </div>
  );
}
