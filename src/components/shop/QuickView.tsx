"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Minus, Plus } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { EASE_PREMIUM } from "@/lib/motion";
import { productOptions, productGallery } from "@/lib/product-options";
import { useCart } from "@/context/CartContext";
import { buttonClasses } from "@/components/ui/Button";

export function QuickView({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {product && <QuickViewInner product={product} onClose={onClose} />}
    </AnimatePresence>
  );
}

function QuickViewInner({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const gallery = productGallery(product);
  const options = productOptions(product);
  const { addItem } = useCart();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState<Record<string, string>>({});

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const addToCart = () => {
    addItem(product, qty, options.length ? selected : undefined);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative z-10 grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-sm bg-cream md:grid-cols-2"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.35, ease: EASE_PREMIUM }}
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-ink transition-colors hover:bg-sand"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Galeria */}
        <div className="flex flex-col gap-3 p-4 md:p-5">
          <div
            className="aspect-square w-full rounded-sm bg-cover bg-center md:aspect-auto md:flex-1"
            style={{ backgroundImage: gallery[active] }}
          />
          <div className="flex gap-2">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Imagem ${i + 1}`}
                className={`h-14 w-14 rounded-sm bg-cover bg-center ring-1 transition-all ${
                  active === i ? "ring-2 ring-gold" : "ring-line hover:ring-ink"
                }`}
                style={{ backgroundImage: g }}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col overflow-y-auto p-6 md:p-8">
          {product.brand && (
            <span className="tracking-luxe text-[11px] uppercase text-muted">
              {product.brand}
            </span>
          )}
          <h2 className="mt-2 font-display text-2xl text-ink md:text-3xl">
            {product.name}
          </h2>

          {product.rating && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex text-gold">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={`h-3.5 w-3.5 ${
                      s < Math.round(product.rating!) ? "fill-current" : ""
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted">
                ({product.reviewsCount})
              </span>
            </div>
          )}

          <div className="mt-4 flex items-center gap-3">
            <span className="text-xl text-ink">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-muted/60 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            {product.description}
          </p>

          {/* Opções */}
          {options.map((group) => (
            <div key={group.label} className="mt-5">
              <span className="tracking-luxe text-[11px] uppercase text-ink">
                {group.label}
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {group.values.map((v) => {
                  const isSel = selected[group.label] === v.value;
                  return group.type === "color" ? (
                    <button
                      key={v.value}
                      onClick={() =>
                        setSelected((s) => ({ ...s, [group.label]: v.value }))
                      }
                      aria-label={v.value}
                      title={v.value}
                      className={`h-7 w-7 rounded-full border transition-all ${
                        isSel
                          ? "ring-2 ring-gold ring-offset-2 ring-offset-cream"
                          : "border-line hover:scale-110"
                      }`}
                      style={{ backgroundColor: v.hex }}
                    />
                  ) : (
                    <button
                      key={v.value}
                      onClick={() =>
                        setSelected((s) => ({ ...s, [group.label]: v.value }))
                      }
                      className={`min-w-10 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                        isSel
                          ? "border-ink bg-ink text-cream"
                          : "border-line text-muted hover:border-ink hover:text-ink"
                      }`}
                    >
                      {v.value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quantidade + adicionar */}
          <div className="mt-7 flex items-center gap-3">
            <div className="flex items-center rounded-full border border-line">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Diminuir"
                className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-gold"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Aumentar"
                className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-gold"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={addToCart}
              className={buttonClasses("primary", "lg", "flex-1")}
            >
              Adicionar ao carrinho
            </button>
          </div>

          <Link
            href={`/produto/${product.slug}`}
            className="tracking-luxe mt-5 text-center text-[11px] uppercase text-muted underline-offset-4 transition-colors hover:text-gold hover:underline"
          >
            Ver detalhes completos
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
