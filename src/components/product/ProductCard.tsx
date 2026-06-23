"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { Eye, Heart } from "lucide-react";
import type { Product } from "@/types";
import { cn, formatPrice } from "@/lib/utils";
import { productCover } from "@/lib/product-options";
import { useCategories } from "@/context/CategoriesContext";
import { useWishlist } from "@/context/WishlistContext";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="tracking-luxe rounded-full bg-ink/85 px-2.5 py-1 text-[9px] uppercase text-cream backdrop-blur-sm">
      {children}
    </span>
  );
}

/** Cartão de produto para grelhas e carrosséis. */
export function ProductCard({
  product,
  className,
  onQuickView,
}: {
  product: Product;
  className?: string;
  /** Se fornecido, mostra o botão de vista rápida (catálogo). */
  onQuickView?: (product: Product) => void;
}) {
  const { slug, name, brand, price, compareAtPrice, category, isNew, bestseller } =
    product;
  const discount = compareAtPrice
    ? Math.round((1 - price / compareAtPrice) * 100)
    : 0;
  const categories = useCategories();
  const categoryName = categories.find((c) => c.slug === category)?.name ?? "";

  const { has, toggle } = useWishlist();
  const isFav = has(product.id);

  const handleQuickView = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  const handleWishlist = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
  };

  return (
    <Link href={`/produto/${slug}`} className={cn("group block", className)}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-sand">
        {/* foto do produto (ou gradiente) com zoom no hover */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-premium group-hover:scale-105"
          style={{ backgroundImage: productCover(product) }}
        />
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />

        {/* badges */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {discount > 0 && <Badge>-{discount}%</Badge>}
          {isNew && <Badge>Novo</Badge>}
          {!isNew && bestseller && <Badge>Popular</Badge>}
        </div>

        {/* ações no canto */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={
              isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"
            }
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full bg-cream/95 shadow-sm transition-all duration-500 ease-premium hover:bg-cream",
              isFav
                ? "text-gold opacity-100"
                : "translate-y-1 text-ink opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
            )}
          >
            <Heart className={cn("h-4 w-4", isFav && "fill-current")} />
          </button>
          {onQuickView && (
            <button
              type="button"
              onClick={handleQuickView}
              aria-label={`Vista rápida de ${name}`}
              className="flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-cream/95 text-ink opacity-0 shadow-sm transition-all duration-500 ease-premium hover:bg-cream group-hover:translate-y-0 group-hover:opacity-100"
            >
              <Eye className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* chamada no hover */}
        <span className="absolute inset-x-0 bottom-0 flex justify-center pb-5">
          <span className="tracking-luxe translate-y-3 rounded-full bg-cream/95 px-5 py-2.5 text-[10px] uppercase text-ink opacity-0 shadow-sm transition-all duration-500 ease-premium group-hover:translate-y-0 group-hover:opacity-100">
            Ver produto
          </span>
        </span>
      </div>

      {/* info */}
      <div className="mt-4 flex flex-col gap-1">
        {brand && (
          <span className="tracking-luxe text-[10px] uppercase text-muted/70">
            {brand}
          </span>
        )}
        <h3 className="font-sans text-sm font-medium text-ink transition-colors group-hover:text-gold-deep">
          {name}
        </h3>
        <span className="mt-0.5 text-[10px] uppercase tracking-wide text-muted/60">
          {categoryName}
        </span>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-sm text-ink">{formatPrice(price)}</span>
          {compareAtPrice && (
            <span className="text-xs text-muted/60 line-through">
              {formatPrice(compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
