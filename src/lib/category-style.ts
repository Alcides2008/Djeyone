/**
 * Gradientes (CSS) por categoria — usados como fundo dos cartões e como
 * imagem de reserva quando um produto não tem foto.
 */
export const categoryGradient: Record<string, string> = {
  cosmeticos: "linear-gradient(135deg, #f1d9d0 0%, #e3c4b2 100%)",
  perfumes: "linear-gradient(135deg, #ecdcc0 0%, #d4bd95 100%)",
  roupas: "linear-gradient(135deg, #ddd7cd 0%, #c0b7a8 100%)",
  calcado: "linear-gradient(135deg, #e3d7c8 0%, #c2ad90 100%)",
  perucas: "linear-gradient(135deg, #e6d4c4 0%, #cab39d 100%)",
  acessorios: "linear-gradient(135deg, #ecdcc1 0%, #dac39c 100%)",
};

/** Gradiente neutro para categorias novas (sem gradiente definido). */
export const DEFAULT_GRADIENT =
  "linear-gradient(135deg, #e9ded0 0%, #cbb89c 100%)";

/** Gradiente de uma categoria por slug, com reserva. */
export const gradientForSlug = (slug: string): string =>
  categoryGradient[slug] ?? DEFAULT_GRADIENT;
