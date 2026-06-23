import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCategories } from "@/lib/categories-db";
import { DEFAULT_GRADIENT } from "@/lib/category-style";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function CategoryShowcase() {
  const categories = await getCategories();
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Explorar"
            title="Categorias em destaque"
            description="Tudo o que precisa para a sua beleza e o seu estilo, num só lugar."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <Link href={`/loja/${c.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-premium group-hover:scale-105"
                    style={{ backgroundImage: c.gradient ?? DEFAULT_GRADIENT }}
                  />
                  <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                    <span className="font-display text-lg text-ink md:text-xl">
                      {c.name}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-ink/70 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
