import Image from "next/image";
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fafaf8] flex flex-col items-center justify-center p-6 text-center">
      <Link href="/" className="mb-10">
        <Image
          src="/images/kayaha-logo.png"
          alt="KAYAHA"
          width={300}
          height={105}
          className="h-24 w-auto object-contain"
        />
      </Link>
      <div className="w-18 h-18 bg-white border border-zinc-100 rounded-2xl flex items-center justify-center mb-6">
        <span className="text-3xl font-black text-zinc-300">?</span>
      </div>
      <h1 className="text-6xl font-black text-zinc-900 mb-2">404</h1>
      <p className="text-xl text-zinc-400 mb-8">
        Stranica nije pronađena.
      </p>
      <Link
        href="/"
        className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-zinc-800 transition-colors tracking-wide"
      >
        Povratak na naslovnicu
      </Link>
      <div className="flex items-center gap-2 mt-12">
        <Leaf className="w-3 h-3 text-zinc-300" />
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-300">Elevated Style · Natural Spirit</span>
      </div>
    </div>
  );
}
