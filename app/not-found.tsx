import { Bug } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
        <Bug className="w-8 h-8 text-zinc-400" />
      </div>
      <h1 className="text-6xl font-black text-zinc-900 mb-2">404</h1>
      <p className="text-xl text-zinc-500 mb-8">
        Ovaj kukac se sakrio. Stranica nije pronađena.
      </p>
      <Link
        href="/"
        className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-zinc-800 transition-colors"
      >
        Povratak na naslovnicu
      </Link>
    </div>
  );
}
