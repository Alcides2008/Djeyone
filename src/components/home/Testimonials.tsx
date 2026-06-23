import { Star } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const testimonials = [
  {
    quote:
      "Os perfumes são autênticos e a entrega foi super rápida. Virei cliente fiel da DJEYONE!",
    name: "Ana Lukeny",
    city: "Luanda",
  },
  {
    quote:
      "A peruca cacheada superou as minhas expectativas. Qualidade impecável e atendimento atencioso.",
    name: "Beatriz Cardoso",
    city: "Benguela",
  },
  {
    quote:
      "Comprei a paleta de sombras e adorei os tons. O site é lindo e fácil de usar.",
    name: "Madalena Songo",
    city: "Huambo",
  },
];

export function Testimonials() {
  return (
    <section className="bg-sand/40 py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Quem compra, recomenda"
            title="O que dizem de nós"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-sm border border-line bg-cream p-8">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 font-display text-lg leading-relaxed text-ink/85">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-5">
                  <span className="block text-sm font-medium text-ink">
                    {t.name}
                  </span>
                  <span className="tracking-luxe text-[11px] uppercase text-muted">
                    {t.city}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
