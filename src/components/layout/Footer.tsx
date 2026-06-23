import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getCategories } from "@/lib/categories-db";
import { Logo } from "@/components/ui/Logo";
import { Container } from "./Container";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";

const empresaLinks = [
  { label: "Sobre nós", href: "/sobre" },
  { label: "Vídeos", href: "/videos" },
  { label: "Contacto", href: "/contacto" },
  { label: "A minha conta", href: "/conta" },
  { label: "Favoritos", href: "/favoritos" },
];

export async function Footer() {
  const categories = await getCategories();
  return (
    <footer className="mt-24 border-t border-line bg-charcoal text-cream">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:pr-8">
            <Logo className="text-cream hover:text-champagne" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              {siteConfig.description} {siteConfig.tagline}.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href={siteConfig.social.instagram}
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold hover:text-gold"
              >
                <InstagramIcon className="h-4 w-4" />
              </Link>
              <Link
                href={siteConfig.social.facebook}
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold hover:text-gold"
              >
                <FacebookIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Loja */}
          <div>
            <h4 className="text-xs uppercase tracking-luxe text-cream/40">
              Loja
            </h4>
            <ul className="mt-5 space-y-3">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/loja/${c.slug}`}
                    className="text-sm text-cream/70 transition-colors hover:text-gold"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-xs uppercase tracking-luxe text-cream/40">
              Empresa
            </h4>
            <ul className="mt-5 space-y-3">
              {empresaLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream/70 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-luxe text-cream/40">
              Newsletter
            </h4>
            <p className="mt-5 text-sm text-cream/60">
              Receba novidades e ofertas exclusivas.
            </p>
            <form className="mt-5 flex items-center border-b border-cream/20 focus-within:border-gold">
              <input
                type="email"
                required
                placeholder="O seu email"
                className="w-full bg-transparent py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscrever"
                className="text-cream/70 transition-colors hover:text-gold"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </Container>

      {/* Barra inferior */}
      <div className="border-t border-cream/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/40 md:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos
            reservados.
          </p>
          <p className="uppercase tracking-luxe">
            Pagamento · Multicaixa Express
          </p>
        </Container>
      </div>
    </footer>
  );
}
