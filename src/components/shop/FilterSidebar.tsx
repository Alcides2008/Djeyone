"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { Check } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useCategories } from "@/context/CategoriesContext";
import type { OptionValue } from "@/lib/product-options";

export type Filters = {
  categories: string[];
  brands: string[];
  colors: string[];
  maxPrice: number;
  promoOnly: boolean;
};

export const emptyFilters = (maxPrice: number): Filters => ({
  categories: [],
  brands: [],
  colors: [],
  maxPrice,
  promoOnly: false,
});

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-b border-line py-6 first:pt-0">
      <h3 className="tracking-luxe mb-4 text-[11px] uppercase text-ink">
        {title}
      </h3>
      {children}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onClick,
  count,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 py-1.5 text-left"
    >
      <span
        className={cn(
          "flex h-4 w-4 items-center justify-center rounded-[3px] border transition-colors",
          checked
            ? "border-ink bg-ink text-cream"
            : "border-line group-hover:border-ink",
        )}
      >
        {checked && <Check className="h-3 w-3" />}
      </span>
      <span
        className={cn(
          "flex-1 text-sm transition-colors",
          checked ? "text-ink" : "text-muted group-hover:text-ink",
        )}
      >
        {label}
      </span>
      {typeof count === "number" && (
        <span className="text-xs text-muted/50">{count}</span>
      )}
    </button>
  );
}

export function FilterSidebar({
  filters,
  setFilters,
  brands,
  colors,
  priceBounds,
  categoryCounts,
  brandCounts,
  hideCategories,
  onClear,
}: {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  brands: string[];
  colors: OptionValue[];
  priceBounds: { min: number; max: number };
  categoryCounts: Record<string, number>;
  brandCounts: Record<string, number>;
  hideCategories?: boolean;
  onClear: () => void;
}) {
  const categories = useCategories();
  const toggle = (key: "categories" | "brands" | "colors", value: string) =>
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(value)
        ? f[key].filter((v) => v !== value)
        : [...f[key], value],
    }));

  return (
    <div className="flex flex-col">
      {!hideCategories && (
        <FilterGroup title="Categoria">
          <div className="flex flex-col">
            {categories.map((c) => (
              <CheckRow
                key={c.slug}
                label={c.name}
                count={categoryCounts[c.slug]}
                checked={filters.categories.includes(c.slug)}
                onClick={() => toggle("categories", c.slug)}
              />
            ))}
          </div>
        </FilterGroup>
      )}

      {brands.length > 0 && (
        <FilterGroup title="Marca">
          <div className="flex flex-col">
            {brands.map((b) => (
              <CheckRow
                key={b}
                label={b}
                count={brandCounts[b]}
                checked={filters.brands.includes(b)}
                onClick={() => toggle("brands", b)}
              />
            ))}
          </div>
        </FilterGroup>
      )}

      {colors.length > 0 && (
        <FilterGroup title="Cor">
          <div className="flex flex-wrap gap-2.5">
            {colors.map((c) => {
              const active = filters.colors.includes(c.value);
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => toggle("colors", c.value)}
                  aria-label={c.value}
                  title={c.value}
                  className={cn(
                    "h-7 w-7 rounded-full border transition-all",
                    active
                      ? "ring-2 ring-gold ring-offset-2 ring-offset-cream"
                      : "border-line hover:scale-110",
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              );
            })}
          </div>
        </FilterGroup>
      )}

      <FilterGroup title="Preço máximo">
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          step={500}
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))
          }
          className="w-full"
          style={{ accentColor: "#bfa06a" }}
        />
        <div className="mt-2 flex justify-between text-xs text-muted">
          <span>{formatPrice(priceBounds.min)}</span>
          <span className="font-medium text-ink">
            {formatPrice(filters.maxPrice)}
          </span>
        </div>
      </FilterGroup>

      <FilterGroup title="Promoções">
        <CheckRow
          label="Apenas em promoção"
          checked={filters.promoOnly}
          onClick={() =>
            setFilters((f) => ({ ...f, promoOnly: !f.promoOnly }))
          }
        />
      </FilterGroup>

      <button
        type="button"
        onClick={onClear}
        className="tracking-luxe mt-6 text-[11px] uppercase text-muted underline-offset-4 transition-colors hover:text-gold hover:underline"
      >
        Limpar filtros
      </button>
    </div>
  );
}
