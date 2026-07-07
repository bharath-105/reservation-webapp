import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BLR Cafe - Digital Menu",
  description: "Scan, Order, and Enjoy.",
};

import { CartProvider } from "@/context/CartContext";

import { SpeedInsights } from "@vercel/speed-insights/next";

import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
            <CartProvider>
              <Navbar />
              {children}
              <SpeedInsights />
            </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
