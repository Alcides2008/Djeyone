import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  BadgeCheck,
  Tag,
  Gem,
  ShieldCheck,
  Sparkles,
  Truck,
  Headphones,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClasses } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "A história da Djeyone — fundada em 2016 por Jacline Domingos, em Luanda. Beleza premium, autêntica e acessível, com entrega em todo o país.",
};

const valores = [
  {
    icon: Heart,
    title: "Autoestima",
    text: "Beleza que faz cada mulher sentir-se mais confiante todos os dias.",
  },
  {
    icon: BadgeCheck,
    title: "Autenticidade",
    text: "Produtos genuínos e uma marca que se mantém fiel à sua essência.",
  },
  {
    icon: Tag,
    title: "Beleza acessível",
    text: "O cuidado premium ao alcance de todas — sem abdicar da qualidade.",
  },
  {
    icon: Gem,
    title: "Qualidade premium",
    text: "Curadoria criteriosa em cada cosmético, perfume e peça que oferecemos.",
  },
];

const diferenciais = [
  {
    icon: ShieldCheck,
    title: "Originais, sempre",
    text: "Trabalhamos apenas com produtos autênticos. Sem atalhos, sem dúvidas.",
  },
  {
    icon: Sparkles,
    title: "Curadoria premium",
    text: "Cada artigo é escolhido a dedo para juntar beleza, estilo e qualidade.",
  },
  {
    icon: Truck,
    title: "Em todo o país",
    text: "Entregamos em todas as províncias de Angola, com pagamento simples.",
  },
  {
    icon: Headphones,
    title: "Sempre por perto",
    text: "Atendimento próximo e humano por WhatsApp, do pedido à entrega.",
  },
];

const factos = [
  { value: "2016", label: "Desde" },
  { value: "Luanda", label: "Cassenda" },
  { value: "5", label: "Categorias" },
  { value: "Nacional", label: "Entrega" },
];

export default function SobrePage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="border-b border-line py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="tracking-luxe text-xs uppercase text-gold">
                A nossa história · Desde 2016
              </span>
              <h1 className="mt-6 font-display text-4xl leading-[1.1] text-ink md:text-6xl">
                Resiliência amiga
                <br />
                do sucesso
              </h1>
              <span className="mx-auto mt-7 block h-px w-16 bg-gold" />
              <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted">
                Mais do que uma loja, a Djeyone é a prova de que a beleza e a
                coragem caminham lado a lado.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* História */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-charcoal">
                <Image
                  src="/logo-djeyone.jpg"
                  alt="Djeyone — logótipo de Jacline Domingos"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <span className="tracking-luxe text-xs uppercase text-gold">
                  Como tudo começou
                </span>
                <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">
                  De um sonho corajoso a uma marca de beleza
                </h2>
                <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-muted">
                  <p>
                    A Djeyone nasceu em 2016, das mãos de Jacline Domingos.
                    Começou com a venda de cosméticos — e com um nome oferecido
                    por uma amiga, num momento em que a vida testava a sua
                    resiliência.
                  </p>
                  <p>
                    Em vez de recuar perante as dificuldades, Jacline
                    transformou-as em determinação. O que era uma pequena venda
                    de cosméticos foi crescendo, produto a produto, ideia após
                    ideia.
                  </p>
                  <p>
                    Hoje, a Djeyone reúne cosméticos, perfumes, roupas, perucas
                    e acessórios — sempre com a mesma promessa:{" "}
                    <span className="text-ink">
                      qualidade premium ao alcance de todas
                    </span>
                    , entregue em todo o país.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Valores */}
      <section className="bg-sand/40 py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="text-center">
              <span className="tracking-luxe text-xs uppercase text-gold">
                Aquilo em que acreditamos
              </span>
              <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">
                Os nossos valores
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valores.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-sm border border-line bg-cream p-7">
                  <Icon className="h-7 w-7 text-gold" strokeWidth={1.4} />
                  <h3 className="mt-5 font-display text-xl text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Fundadora */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-sand">
                <Image
                  src="/fundadora.jpg"
                  alt="Jacline Domingos, fundadora da Djeyone"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <span className="tracking-luxe text-xs uppercase text-gold">
                  A fundadora
                </span>
                <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">
                  Jacline Imaculada Ngunza Domingos
                </h2>
                <blockquote className="mt-7 border-l-2 border-gold pl-6 font-display text-xl leading-relaxed text-ink/85 md:text-2xl">
                  “Comecei a Djeyone num dos momentos mais difíceis da minha
                  vida. Acreditei que a beleza e a resiliência caminham juntas —
                  e que cada mulher merece sentir-se bonita e confiante. Hoje,
                  ver-vos brilhar é a minha maior realização.”
                </blockquote>
                <p className="tracking-luxe mt-6 text-[11px] uppercase text-muted">
                  Jacline Domingos · Fundadora da Djeyone
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Diferenciais */}
      <section className="bg-charcoal py-20 text-cream md:py-28">
        <Container>
          <Reveal>
            <div className="text-center">
              <span className="tracking-luxe text-xs uppercase text-gold">
                Porquê a Djeyone
              </span>
              <h2 className="mt-4 font-display text-3xl text-cream md:text-4xl">
                Beleza em que pode confiar
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {diferenciais.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="flex flex-col">
                  <Icon className="h-7 w-7 text-gold" strokeWidth={1.4} />
                  <h3 className="mt-5 text-base font-medium text-cream">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/60">
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Factos */}
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-cream/10 pt-12 md:grid-cols-4">
            {factos.map((f) => (
              <div key={f.label} className="text-center">
                <p className="font-display text-3xl text-gold md:text-4xl">
                  {f.value}
                </p>
                <p className="tracking-luxe mt-2 text-[11px] uppercase text-cream/50">
                  {f.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl text-ink md:text-5xl">
                Faça parte da nossa história
              </h2>
              <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted">
                Descubra a seleção Djeyone e sinta a diferença de uma beleza
                premium, autêntica e ao seu alcance.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Link href="/loja" className={buttonClasses("primary", "lg")}>
                  Explorar a loja
                </Link>
                <Link
                  href="/contacto"
                  className={buttonClasses("outline", "lg")}
                >
                  Falar connosco
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
