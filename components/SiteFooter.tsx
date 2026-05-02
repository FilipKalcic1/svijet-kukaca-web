import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";

const FOOTER_LINKS = {
  kolekcije: [
    { href: "/kukci", label: "Svijet Kukaca" },
    { href: "/ribe", label: "Svijet Riba" },
    { href: "/clanci", label: "Članci" },
  ],
  brand: [
    { href: "/o-projektu", label: "O projektu" },
    { href: "/uvjeti", label: "Uvjeti poslovanja" },
    { href: "/privatnost", label: "Politika privatnosti" },
    { href: "/kolacici", label: "Kolačići" },
  ],
};

export default function SiteFooter() {
  return (
    <footer className="bg-zinc-900 text-white pt-20 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top: brand + columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 pb-16">
          {/* Brand block */}
          <div className="md:col-span-5">
            <Image
              src="/images/kayaha-logo.png"
              alt="KAYAHA"
              width={400}
              height={218}
              className="h-12 w-auto object-contain brightness-0 invert mb-6"
            />
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Edukativne majice za znatiželjnu djecu. Skeniraj QR kod na leđima
              i otkrij priču o vrsti koju nosiš.
            </p>

            {/* Contact */}
            <div className="mt-8 space-y-3 text-sm">
              <a
                href="mailto:kontakt@kayaha.hr"
                className="flex items-center gap-2.5 text-zinc-300 hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" strokeWidth={1.5} />
                <span>kontakt@kayaha.hr</span>
              </a>
              <div className="flex items-center gap-2.5 text-zinc-400">
                <MapPin className="w-4 h-4 text-zinc-500" strokeWidth={1.5} />
                <span>Izrađeno u Hrvatskoj</span>
              </div>
            </div>
          </div>

          {/* Kolekcije column */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-500 mb-5">
              Kolekcije
            </h4>
            <ul className="space-y-3 text-sm">
              {FOOTER_LINKS.kolekcije.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-zinc-300 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand column */}
          <div className="md:col-span-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-500 mb-5">
              KAYAHA
            </h4>
            <ul className="space-y-3 text-sm">
              {FOOTER_LINKS.brand.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-zinc-300 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust strip */}
        <div className="border-t border-zinc-800 pt-8 pb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            <span>Sigurno plaćanje</span>
            <span className="text-zinc-700">·</span>
            <span>Visa</span>
            <span className="text-zinc-700">·</span>
            <span>Mastercard</span>
            <span className="text-zinc-700">·</span>
            <span>Apple Pay</span>
            <span className="text-zinc-700">·</span>
            <span>Google Pay</span>
            <span className="text-zinc-700">·</span>
            <span>Pouzeće</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} KAYAHA. Sva prava pridržana.</p>
          <p>14 dana za povrat · GLS dostava 2–3 dana · Odgovaramo isti dan</p>
        </div>
      </div>
    </footer>
  );
}
