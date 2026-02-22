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
    default: "Svijet Kukaca - Edukativne majice s pričom",
    template: "%s | Svijet Kukaca",
  },
  description:
    "Premium majice s edukativnom pričom o kukcima. Skeniraj QR kod na leđima i otkrij tajni život kukca kojeg nosiš.",
  keywords: [
    "majice",
    "kukci",
    "edukacija",
    "QR kod",
    "hrvatska",
    "t-shirt",
    "insect",
    "obrazovanje",
  ],
  authors: [{ name: "Svijet Kukaca" }],
  openGraph: {
    type: "website",
    locale: "hr_HR",
    siteName: "Svijet Kukaca",
    title: "Svijet Kukaca - Edukativne majice s pričom",
    description:
      "Premium majice s edukativnom pričom o kukcima. Skeniraj QR kod i otkrij tajni život kukca.",
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
