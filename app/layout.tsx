import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 👇 OVAKO MORAJU IZGLEDATI IMPORTI:
import { CartProvider } from "@/context/CartContext"; 

import CartDrawer from "@/components/CartDrawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Svijet Kukaca",
  description: "Edukativne majice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body className={`${inter.className} bg-[#FDFBF7] text-zinc-900 antialiased`}>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}