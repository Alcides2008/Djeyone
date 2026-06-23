"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, Sparkles, Headphones } from "lucide-react";
import { Container } from "@/components/layout/Container";

const features = [
  {
    icon: Truck,
    title: "Entrega em Angola",
    text: "Envio rápido para todo o país.",
  },
  {
    icon: ShieldCheck,
    title: "Pagamento seguro",
    text: "Multicaixa Express e referência.",
  },
  {
    icon: Sparkles,
    title: "Produtos originais",
    text: "Qualidade premium garantida.",
  },
  {
    icon: Headphones,
    title: "Apoio dedicado",
    text: "Estamos aqui para ajudar.",
  },
];

const brands = [
  "Maison Djeyone",
  "Djeyone Skin",
  "Djeyone Color",
  "Djeyone Hair",
  "Djeyone Gold",
  "Djeyone Atelier",
];

export function Trust() {
  return (
    <section className="border-y border-line py-16">
      <Container>
        {/* Features de confiança */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <Icon className="h-7 w-7 text-gold" strokeWidth={1.4} />
              <h3 className="mt-4 text-sm font-medium text-ink">{title}</h3>
              <p className="mt-1 text-xs text-muted">{text}</p>
            </div>
          ))}
        </div>

        {/* Marquee de marcas */}
        <div className="relative mt-14 overflow-hidden">
          <motion.div
            className="flex w-max gap-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            {[...brands, ...brands].map((b, i) => (
              <span
                key={i}
                className="tracking-luxe whitespace-nowrap font-display text-xl text-muted/45"
              >
                {b}
              </span>
            ))}
          </motion.div>
          {/* esbatimento nas extremidades */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-24"
            style={{ background: "linear-gradient(to right, #faf7f1, transparent)" }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-24"
            style={{ background: "linear-gradient(to left, #faf7f1, transparent)" }}
          />
        </div>
      </Container>
    </section>
  );
}
