import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstagramIcon } from "@/components/ui/SocialIcons";

const tiles = [
  "linear-gradient(135deg,#f1d9d0,#e3c4b2)",
  "linear-gradient(135deg,#ecdcc0,#d4bd95)",
  "linear-gradient(135deg,#ddd7cd,#c0b7a8)",
  "linear-gradient(135deg,#e6d4c4,#cab39d)",
  "linear-gradient(135deg,#ecdcc1,#dac39c)",
  "linear-gradient(135deg,#efe6d6,#d9c6a6)",
];

export function InstagramFeed() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={siteConfig.social.instagramHandle}
            title="Siga-nos no Instagram"
            description="Inspiração diária de beleza, estilo e novidades."
            link={{ label: "Seguir", href: siteConfig.social.instagram }}
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4">
          {tiles.map((g, i) => (
            <Reveal key={i} delay={(i % 6) * 0.06}>
              <Link
                href={siteConfig.social.instagram}
                aria-label="Abrir Instagram"
                className="group relative block aspect-square overflow-hidden rounded-sm"
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-premium group-hover:scale-110"
                  style={{ backgroundImage: g }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-500 group-hover:bg-ink/30">
                  <InstagramIcon className="h-6 w-6 text-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
