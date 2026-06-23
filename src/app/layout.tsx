import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "./providers";

// Fontes auto-hospedadas (sem dependência do Google Fonts no build).
// Sans limpa para o corpo
const inter = localFont({
  src: "../fonts/inter-variable.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

// Serifada editorial para os títulos (toque de luxo)
const playfair = localFont({
  src: "../fonts/playfair-variable.woff2",
  variable: "--font-playfair",
  display: "swap",
  weight: "400 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "DJEYONE — Cosméticos, Perfumes & Beleza Premium",
    template: "%s · DJEYONE",
  },
  description:
    "DJEYONE — Cosméticos, perfumes, roupas, perucas e acessórios premium. Beleza elegante entregue em Angola.",
  keywords: [
    "Djeyone",
    "cosméticos",
    "perfumes",
    "perucas",
    "beleza",
    "Angola",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
