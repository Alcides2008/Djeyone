"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Heart, ShoppingBag, Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "./SearchOverlay";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { getSiteContent, defaultContent } from "@/lib/content";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Loja", href: "/loja", mega: true },
  { label: "Vídeos", href: "/videos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contacto", href: "/contacto" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { count: cartCount, openCart } = useCart();
  const { count: wishCount } = useWishlist();
  const [announcement, setAnnouncement] = useState(
    defaultContent.announcement,
  );

  useEffect(() => {
    getSiteContent()
      .then((c) => setAnnouncement(c.announcement))
      .catch(() => {});
  }, []);

  // efeito de transição do cabeçalho ao rolar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // bloqueia o scroll do corpo quando há overlay aberto
  useEffect(() => {
    const lock = mobileOpen || searchOpen;
    document.body.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Barra de anúncio */}
      <div className="bg-ink text-cream">
        <p className="tracking-luxe py-2.5 text-center text-[10px] uppercase md:text-[11px]">
          {announcement}
        </p>
      </div>

      {/* Cabeçalho sticky */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 ease-premium",
          scrolled
            ? "border-b border-line bg-cream/90 backdrop-blur-md"
            : "border-b border-transparent bg-cream",
        )}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className="relative">
          <div className="container-djeyone flex h-16 items-center justify-between gap-4 md:h-20">
            {/* Esquerda: hambúrguer (mobile) + nav (desktop) */}
            <div className="flex flex-1 items-center gap-8">
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Abrir menu"
                className="text-ink transition-colors hover:text-gold-deep lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>

              <nav className="hidden items-center gap-8 lg:flex">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onMouseEnter={() => setMegaOpen(!!l.mega)}
                    className={cn(
                      "tracking-luxe flex items-center gap-1 py-1 text-[11px] uppercase transition-colors hover:text-gold-deep",
                      isActive(l.href) ? "text-ink" : "text-muted",
                    )}
                  >
                    {l.label}
                    {l.mega && (
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 transition-transform duration-300",
                          megaOpen && "rotate-180",
                        )}
                      />
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Centro: logótipo */}
            <Logo className="absolute left-1/2 -translate-x-1/2 text-xl md:text-2xl" />

            {/* Direita: ícones */}
            <div className="flex flex-1 items-center justify-end gap-4 md:gap-5">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Pesquisar"
                className="text-ink transition-colors hover:text-gold-deep"
              >
                <Search className="h-5 w-5" />
              </button>

              <Link
                href="/conta"
                aria-label="A minha conta"
                className="hidden text-ink transition-colors hover:text-gold-deep sm:block"
              >
                <User className="h-5 w-5" />
              </Link>

              <Link
                href="/favoritos"
                aria-label="Favoritos"
                className="relative hidden text-ink transition-colors hover:text-gold-deep sm:block"
              >
                <Heart className="h-5 w-5" />
                <CountBadge count={wishCount} />
              </Link>

              <button
                onClick={openCart}
                aria-label="Abrir carrinho"
                className="relative text-ink transition-colors hover:text-gold-deep"
              >
                <ShoppingBag className="h-5 w-5" />
                <CountBadge count={cartCount} />
              </button>
            </div>
          </div>

          {/* Mega-menu */}
          <MegaMenu open={megaOpen} onLinkClick={() => setMegaOpen(false)} />
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

/** Contador animado para os ícones (carrinho / favoritos). */
function CountBadge({ count }: { count: number }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 22 }}
          className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-medium text-ink"
        >
          {count}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
