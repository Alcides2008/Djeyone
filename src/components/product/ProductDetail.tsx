"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Minus, Plus, Truck, ShieldCheck, Heart } from "lucide-react";
import type { Product } from "@/types";
import { cn, formatPrice } from "@/lib/utils";
import { productOptions } from "@/lib/product-options";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { buttonClasses } from "@/components/ui/Button";
import { ShareButtons } from "./ShareButtons";

export function ProductDetail({
  product,
  categoryName,
}: {
  product: Product;
  categoryName: string;
}) {
  const router = useRouter();
  const options = productOptions(product);
  const { addItem } = useCart();
  const wishlist = useWishlist();
  const isFav = wishlist.has(product.id);

  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(options.map((g) => [g.label, g.values[0].value])),
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  const addToCart = () => {
    addItem(product, qty, options.length ? selected : undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };
  const buyNow = () => {
    addItem(product, qty, options.length ? selected : undefined);
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col">
      {product.brand && (
        <span className="tracking-luxe text-xs uppercase text-muted">
          {product.brand}
        </span>
      )}
      <h1 className="mt-2 font-display text-3xl text-ink md:text-4xl lg:text-5xl">
        {product.name}
      </h1>

      {/* Avaliação */}
      {product.rating && (
        <div className="mt-4 flex items-center gap-2">
          <div className="flex text-gold">
            {Array.from({ length: 5 }).map((_, s) => (
              <Star
                key={s}
                className={`h-4 w-4 ${
                  s < Math.round(product.rating!) ? "fill-current" : ""
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted">
            {product.rating} · {product.reviewsCount} avaliações
          </span>
        </div>
      )}

      {/* Preço */}
      <div className="mt-5 flex items-center gap-3">
        <span className="text-2xl text-ink">{formatPrice(product.price)}</span>
        {product.compareAtPrice && (
          <>
            <span className="text-base text-muted/60 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
            <span className="tracking-luxe rounded-full bg-gold px-2.5 py-1 text-[10px] uppercase text-ink">
              -{discount}%
            </span>
          </>
        )}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-muted">
        {product.description}
      </p>

      {/* Opções */}
      {options.map((group) => (
        <div key={group.label} className="mt-7">
          <div className="flex items-center justify-between">
            <span className="tracking-luxe text-[11px] uppercase text-ink">
              {group.label}
            </span>
            <span className="text-xs text-muted">{selected[group.label]}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2.5">
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
                  className={`h-9 w-9 rounded-full border transition-all ${
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
                  className={`min-w-12 rounded-full border px-4 py-2 text-sm transition-colors ${
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

      {/* Stock */}
      <div className="mt-7 flex items-center gap-2 text-sm">
        <span
          className={`h-2 w-2 rounded-full ${
            product.inStock ? "bg-emerald-500" : "bg-red-400"
          }`}
        />
        <span className={product.inStock ? "text-ink" : "text-red-500"}>
          {product.inStock ? "Em stock" : "Esgotado"}
        </span>
      </div>

      {/* Favoritos */}
      <button
        onClick={() => wishlist.toggle(product)}
        className={cn(
          "tracking-luxe mt-5 flex items-center gap-2 self-start text-[11px] uppercase transition-colors",
          isFav ? "text-gold" : "text-muted hover:text-ink",
        )}
      >
        <Heart className={cn("h-4 w-4", isFav && "fill-current")} />
        {isFav ? "Nos favoritos" : "Adicionar aos favoritos"}
      </button>

      {/* Quantidade + ações */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center self-start rounded-full border border-line">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Diminuir"
            className="flex h-12 w-12 items-center justify-center text-ink transition-colors hover:text-gold"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            aria-label="Aumentar"
            className="flex h-12 w-12 items-center justify-center text-ink transition-colors hover:text-gold"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={addToCart}
          disabled={!product.inStock}
          className={buttonClasses("primary", "lg", "flex-1")}
        >
          {added ? "Adicionado ✓" : "Adicionar ao carrinho"}
        </button>
        <button
          onClick={buyNow}
          disabled={!product.inStock}
          className={buttonClasses("gold", "lg", "flex-1")}
        >
          Comprar já
        </button>
      </div>

      {/* Partilha */}
      <div className="mt-8 border-t border-line pt-6">
        <ShareButtons title={`${product.name} — ${categoryName} DJEYONE`} />
      </div>

      {/* Garantias */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-sm border border-line p-4">
          <Truck className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.4} />
          <span className="text-xs text-muted">
            Entrega para todo o país
          </span>
        </div>
        <div className="flex items-center gap-3 rounded-sm border border-line p-4">
          <ShieldCheck className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.4} />
          <span className="text-xs text-muted">
            Pagamento Multicaixa Express
          </span>
        </div>
      </div>
    </div>
  );
}
