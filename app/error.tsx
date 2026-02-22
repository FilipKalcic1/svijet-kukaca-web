"use client";

import { Bug } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <Bug className="w-8 h-8 text-red-500" />
      </div>
      <h1 className="text-3xl font-black text-zinc-900 mb-2">
        Ups! Nešto je pošlo po krivu.
      </h1>
      <p className="text-zinc-500 mb-8 max-w-md">
        Došlo je do neočekivane greške. Pokušajte ponovo ili se vratite na
        naslovnicu.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-colors"
        >
          Pokušaj ponovo
        </button>
        <a
          href="/"
          className="bg-zinc-100 text-zinc-900 px-6 py-3 rounded-full font-bold hover:bg-zinc-200 transition-colors"
        >
          Naslovnica
        </a>
      </div>
    </div>
  );
}
