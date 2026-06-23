import type { Product } from "@/types";
import { gradientForSlug } from "@/lib/category-style";

export type OptionValue = { value: string; hex?: string };
export type OptionGroup = {
  label: string;
  type: "color" | "size";
  values: OptionValue[];
};

const sizeGroup = (label: string, sizes: string[]): OptionGroup => ({
  label,
  type: "size",
  values: sizes.map((s) => ({ value: s })),
});

const colorGroup = (values: OptionValue[]): OptionGroup => ({
  label: "Cor",
  type: "color",
  values,
});

/** Opções (cor / tamanho) de um produto — provisórias, por categoria. */
export function productOptions(product: Product): OptionGroup[] {
  switch (product.category) {
    case "roupas":
      return [sizeGroup("Tamanho", ["XS", "S", "M", "L", "XL"])];
    case "calcado":
      return [
        sizeGroup("Tamanho", ["35", "36", "37", "38", "39", "40", "41"]),
      ];
    case "perfumes":
      return [sizeGroup("Volume", ["30ml", "50ml", "100ml"])];
    case "perucas":
      return [
        colorGroup([
          { value: "Preto", hex: "#1c1c1c" },
          { value: "Castanho", hex: "#5a3a23" },
          { value: "Loiro", hex: "#b9925a" },
        ]),
        sizeGroup("Comprimento", ["Curta", "Média", "Longa"]),
      ];
    case "acessorios":
      return [
        colorGroup([
          { value: "Dourado", hex: "#c2a063" },
          { value: "Prateado", hex: "#c9ccd1" },
        ]),
      ];
    case "cosmeticos":
      if (product.slug.includes("batom")) {
        return [
          colorGroup([
            { value: "Vermelho", hex: "#b1342f" },
            { value: "Nude", hex: "#c89a78" },
            { value: "Rosa", hex: "#c76b86" },
            { value: "Vinho", hex: "#6e2233" },
          ]),
        ];
      }
      return [];
    default:
      return [];
  }
}

/**
 * Galeria do produto: fotos reais (como `url(...)`) quando existem;
 * caso contrário, variações do gradiente da categoria.
 */
export function productGallery(product: Product): string[] {
  if (product.images && product.images.length > 0)
    return product.images.map((src) => `url("${src}")`);
  const base = gradientForSlug(product.category);
  return ["135deg", "105deg", "160deg", "90deg"].map((a) =>
    base.replace("135deg", a),
  );
}

/** Imagem de capa (background-image) — foto real ou gradiente da categoria. */
export function productCover(product: Product): string {
  return product.images && product.images.length > 0
    ? `url("${product.images[0]}")`
    : gradientForSlug(product.category);
}

/** Todas as cores existentes no conjunto (para o filtro do catálogo). */
export function allColors(products: Product[]): OptionValue[] {
  const map = new Map<string, string | undefined>();
  for (const p of products) {
    for (const g of productOptions(p)) {
      if (g.type === "color") {
        for (const v of g.values) if (!map.has(v.value)) map.set(v.value, v.hex);
      }
    }
  }
  return [...map].map(([value, hex]) => ({ value, hex }));
}

export function productHasColor(p: Product, color: string): boolean {
  return productOptions(p).some(
    (g) => g.type === "color" && g.values.some((v) => v.value === color),
  );
}
