"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import type { Product, CategorySlug } from "@/types";
import { EASE_PREMIUM } from "@/lib/motion";
import { allColors, productHasColor } from "@/lib/product-options";
import { Container } from "@/components/layout/Container";
import { Breadcrumb, type Crumb } from "@/components/ui/Breadcrumb";
import { ProductCard } from "@/components/product/ProductCard";
import { QuickView } from "./QuickView";
import {
  FilterSidebar,
  emptyFilters,
  type Filters,
} from "./FilterSidebar";

type SortKey = "novidades" | "popularidade" | "preco-asc" | "preco-desc";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "novidades", label: "Novidades" },
  { value: "popularidade", label: "Popularidade" },
  { value: "preco-asc", label: "Preço: menor primeiro" },
  { value: "preco-desc", label: "Preço: maior primeiro" },
];

const PAGE = 8;

export function CatalogView({
  products,
  title,
  eyebrow,
  breadcrumb,
  fixedCategory,
}: {
  products: Product[];
  title: string;
  eyebrow?: string;
  breadcrumb: Crumb[];
  fixedCategory?: CategorySlug;
}) {
  // limites e listas derivados do conjunto base
  const priceBounds = useMemo(() => {
    const prices = products.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [products]);

  const brands = useMemo(
    () => [...new Set(products.map((p) => p.brand).filter(Boolean) as string[])],
    [products],
  );
  const colors = useMemo(() => allColors(products), [products]);

  const categoryCounts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const p of products) m[p.category] = (m[p.category] ?? 0) + 1;
    return m;
  }, [products]);
  const brandCounts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const p of products) if (p.brand) m[p.brand] = (m[p.brand] ?? 0) + 1;
    return m;
  }, [products]);

  const [filters, setFilters] = useState<Filters>(() =>
    emptyFilters(priceBounds.max),
  );
  const [sort, setSort] = useState<SortKey>("novidades");
  const [visible, setVisible] = useState(PAGE);
  const [quick, setQuick] = useState<Product | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // produtos filtrados + ordenados
  const filtered = useMemo(() => {
    const out = products.filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.category))
        return false;
      if (filters.brands.length && (!p.brand || !filters.brands.includes(p.brand)))
        return false;
      if (filters.colors.length && !filters.colors.some((c) => productHasColor(p, c)))
        return false;
      if (p.price > filters.maxPrice) return false;
      if (filters.promoOnly && !p.compareAtPrice) return false;
      return true;
    });

    const by: Record<SortKey, (a: Product, b: Product) => number> = {
      novidades: (a, b) => Number(!!b.isNew) - Number(!!a.isNew),
      popularidade: (a, b) =>
        (b.rating ?? 0) - (a.rating ?? 0) ||
        (b.reviewsCount ?? 0) - (a.reviewsCount ?? 0),
      "preco-asc": (a, b) => a.price - b.price,
      "preco-desc": (a, b) => b.price - a.price,
    };
    return [...out].sort(by[sort]);
  }, [products, filters, sort]);

  // repõe a paginação quando muda o filtro/ordenação
  useEffect(() => setVisible(PAGE), [filters, sort]);

  const activeCount =
    filters.categories.length +
    filters.brands.length +
    filters.colors.length +
    (filters.promoOnly ? 1 : 0) +
    (filters.maxPrice < priceBounds.max ? 1 : 0);

  const clear = () => setFilters(emptyFilters(priceBounds.max));

  const sidebar = (
    <FilterSidebar
      filters={filters}
      setFilters={setFilters}
      brands={brands}
      colors={colors}
      priceBounds={priceBounds}
      categoryCounts={categoryCounts}
      brandCounts={brandCounts}
      hideCategories={!!fixedCategory}
      onClear={clear}
    />
  );

  return (
    <main className="flex-1 py-10 md:py-14">
      <Container>
        <Breadcrumb items={breadcrumb} />

        <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
          <div>
            {eyebrow && (
              <span className="tracking-luxe text-xs uppercase text-gold">
                {eyebrow}
              </span>
            )}
            <h1 className="mt-2 font-display text-3xl text-ink md:text-4xl">
              {title}
            </h1>
            <p className="mt-1 text-sm text-muted">
              {filtered.length}{" "}
              {filtered.length === 1 ? "produto" : "produtos"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="tracking-luxe flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[11px] uppercase text-ink transition-colors hover:border-ink lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
              {activeCount > 0 && (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] text-ink">
                  {activeCount}
                </span>
              )}
            </button>

            <label className="relative">
              <span className="sr-only">Ordenar</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="tracking-luxe cursor-pointer appearance-none rounded-full border border-line bg-cream px-4 py-2.5 pr-9 text-[11px] uppercase text-ink transition-colors hover:border-ink focus:outline-none"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">
                ▾
              </span>
            </label>
          </div>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[250px_1fr]">
          {/* Sidebar desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">{sidebar}</div>
          </aside>

          {/* Grelha */}
          <div>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-line py-24 text-center">
                <p className="font-display text-xl text-ink">
                  Nenhum produto encontrado
                </p>
                <p className="mt-2 text-sm text-muted">
                  Experimente ajustar os filtros.
                </p>
                <button
                  onClick={clear}
                  className="tracking-luxe mt-5 text-[11px] uppercase text-gold underline-offset-4 hover:underline"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
                  {filtered.slice(0, visible).map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onQuickView={setQuick}
                    />
                  ))}
                </div>

                {visible < filtered.length && (
                  <div className="mt-12 flex justify-center">
                    <button
                      onClick={() => setVisible((v) => v + PAGE)}
                      className="tracking-luxe rounded-full border border-ink px-8 py-3.5 text-[11px] uppercase text-ink transition-colors hover:bg-ink hover:text-cream"
                    >
                      Carregar mais
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Container>

      {/* Drawer de filtros (mobile) */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 z-[70] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-ink/40"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              className="absolute left-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-cream"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: EASE_PREMIUM }}
            >
              <div className="flex items-center justify-between border-b border-line px-6 py-4">
                <span className="tracking-luxe text-xs uppercase text-ink">
                  Filtros
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Fechar"
                  className="text-muted hover:text-ink"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4">{sidebar}</div>
              <div className="border-t border-line p-4">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="tracking-luxe w-full rounded-full bg-ink py-3.5 text-[11px] uppercase text-cream"
                >
                  Ver {filtered.length} resultados
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </main>
  );
}
