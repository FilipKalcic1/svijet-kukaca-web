import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: {
    default: "Svijet Kukaca & Riba - Edukativne majice s pričom",
    template: "%s",
  },
  description:
    "Majice s edukativnom pričom o kukcima i ribama. Skeniraj QR kod na leđima i otkrij tajni život životinje koju nosiš.",
  keywords: [
    "majice",
    "kukci",
    "ribe",
    "edukacija",
    "QR kod",
    "hrvatska",
    "t-shirt",
    "insect",
    "fish",
    "obrazovanje",
  ],
  authors: [{ name: "Svijet Kukaca & Riba" }],
  openGraph: {
    type: "website",
    locale: "hr_HR",
    siteName: "Svijet Kukaca & Riba",
    title: "Svijet Kukaca & Riba - Edukativne majice s pričom",
    description:
      "Majice s edukativnom pričom o kukcima i ribama. Skeniraj QR kod i otkrij tajni život životinje.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body
        className={`${inter.className} bg-[#FDFBF7] text-zinc-900 antialiased`}
      >
        <CartProvider>
          {children}
          <CartDrawer />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}
