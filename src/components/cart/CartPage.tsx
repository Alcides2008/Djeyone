"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { productCover } from "@/lib/product-options";
import { shippingFor, FREE_SHIPPING_THRESHOLD } from "@/lib/account";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buttonClasses } from "@/components/ui/Button";

export function CartPage() {
  const { lines, subtotal, count, updateQty, removeItem } = useCart();
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  return (
    <main className="flex-1 py-10 md:py-14">
      <Container>
        <Breadcrumb
          items={[{ label: "Início", href: "/" }, { label: "Carrinho" }]}
        />
        <h1 className="mt-5 font-display text-3xl text-ink md:text-4xl">
          Carrinho
        </h1>

        {count === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-sm border border-dashed border-line py-24 text-center">
            <ShoppingBag className="h-10 w-10 text-muted/40" strokeWidth={1} />
            <p className="font-display text-xl text-ink">
              O seu carrinho está vazio
            </p>
            <Link href="/loja" className={buttonClasses("primary", "md", "mt-2")}>
              Ir para a loja
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
            {/* Linhas */}
            <ul className="flex flex-col divide-y divide-line border-y border-line">
              {lines.map((l) => (
                <li key={l.id} className="flex gap-5 py-6">
                  <Link
                    href={`/produto/${l.product.slug}`}
                    className="h-32 w-24 shrink-0 rounded-sm bg-cover bg-center"
                    style={{ backgroundImage: productCover(l.product) }}
                    aria-label={l.product.name}
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <div>
                        {l.product.brand && (
                          <span className="tracking-luxe text-[10px] uppercase text-muted/70">
                            {l.product.brand}
                          </span>
                        )}
                        <Link
                          href={`/produto/${l.product.slug}`}
                          className="block font-medium text-ink hover:text-gold-deep"
                        >
                          {l.product.name}
                        </Link>
                        {l.options && (
                          <span className="mt-1 block text-xs text-muted">
                            {Object.entries(l.options)
                              .map(([k, v]) => `${k}: ${v}`)
                              .join(" · ")}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(l.id)}
                        aria-label="Remover"
                        className="h-fit text-muted transition-colors hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-end justify-between pt-4">
                      <div className="flex items-center rounded-full border border-line">
                        <button
                          onClick={() => updateQty(l.id, l.quantity - 1)}
                          aria-label="Diminuir"
                          className="flex h-9 w-9 items-center justify-center text-ink hover:text-gold"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm">
                          {l.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(l.id, l.quantity + 1)}
                          aria-label="Aumentar"
                          className="flex h-9 w-9 items-center justify-center text-ink hover:text-gold"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="text-right">
                        <span className="text-base text-ink">
                          {formatPrice(l.product.price * l.quantity)}
                        </span>
                        {l.quantity > 1 && (
                          <span className="block text-xs text-muted">
                            {formatPrice(l.product.price)} cada
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Resumo */}
            <aside className="h-fit lg:sticky lg:top-28">
              <div className="rounded-sm border border-line bg-sand/30 p-6">
                <h2 className="tracking-luxe text-xs uppercase text-ink">
                  Resumo do pedido
                </h2>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted">Subtotal</dt>
                    <dd className="text-ink">{formatPrice(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Portes</dt>
                    <dd className="text-ink">
                      {shipping === 0 ? "Grátis" : formatPrice(shipping)}
                    </dd>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-muted">
                      Portes grátis acima de{" "}
                      {formatPrice(FREE_SHIPPING_THRESHOLD)}.
                    </p>
                  )}
                  <div className="flex justify-between border-t border-line pt-3 text-base">
                    <dt className="font-medium text-ink">Total</dt>
                    <dd className="font-medium text-ink">
                      {formatPrice(total)}
                    </dd>
                  </div>
                </dl>

                <Link
                  href="/checkout"
                  className={buttonClasses("primary", "lg", "mt-6 w-full")}
                >
                  Finalizar compra
                </Link>
                <Link
                  href="/loja"
                  className="tracking-luxe mt-3 block text-center text-[11px] uppercase text-muted underline-offset-4 hover:text-gold hover:underline"
                >
                  Continuar a comprar
                </Link>
              </div>
            </aside>
          </div>
        )}
      </Container>
    </main>
  );
}
