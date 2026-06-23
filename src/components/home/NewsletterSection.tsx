"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  // A subscrição real (envio para backend) chega na Fase 6.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setDone(true);
  };

  return (
    <section className="bg-charcoal py-20 text-cream md:py-24">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="tracking-luxe text-xs uppercase text-gold">
            Newsletter
          </span>
          <h2 className="mt-5 font-display text-3xl text-cream md:text-5xl">
            Junte-se à DJEYONE
          </h2>
          <p className="mt-4 max-w-md text-sm text-cream/60">
            Subscreva e receba 10% de desconto na primeira compra, além de
            acesso antecipado a lançamentos e ofertas.
          </p>

          {done ? (
            <div className="mt-9 flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-6 py-3 text-sm text-cream">
              <Check className="h-5 w-5 text-gold" />
              Obrigado! Em breve receberá as nossas novidades.
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="O seu email"
                className="h-12 flex-1 rounded-full border border-cream/20 bg-transparent px-5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                className="tracking-luxe h-12 rounded-full bg-gold px-7 text-xs font-medium uppercase text-ink transition-colors hover:bg-gold-deep"
              >
                Subscrever
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
