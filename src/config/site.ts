import type { Category } from "@/types";

/* ============================================================
   DJEYONE — Configuração global do site
   ============================================================ */

export const siteConfig = {
  name: "DJEYONE",
  tagline: "Beleza premium, entregue em Angola",
  description:
    "Cosméticos, perfumes, roupas, perucas e acessórios premium.",
  currency: "Kz",
  locale: "pt-AO",
  contact: {
    email: "geral@djeyone.ao",
    phone: "+244 924 068 151",
    // número usado nos links wa.me (sem + nem espaços)
    whatsapp: "244924068151",
  },
  social: {
    instagram: "https://www.instagram.com/jaclinedomingos_",
    instagramHandle: "@jaclinedomingos_",
    facebook: "https://facebook.com/djeyone",
  },
  /** Dados de pagamento (modelo manual — Angola). */
  payment: {
    expressNumber: "924068151",
    reference: { entity: "10116", reference: "924068151" },
  },
} as const;

export const categories: Category[] = [
  {
    slug: "cosmeticos",
    name: "Cosméticos",
    description: "Maquilhagem e cuidados de pele.",
    gradient: "linear-gradient(135deg, #f1d9d0 0%, #e3c4b2 100%)",
    order: 1,
  },
  {
    slug: "perfumes",
    name: "Perfumes",
    description: "Fragrâncias marcantes.",
    gradient: "linear-gradient(135deg, #ecdcc0 0%, #d4bd95 100%)",
    order: 2,
  },
  {
    slug: "roupas",
    name: "Roupas",
    description: "Moda elegante e atual.",
    gradient: "linear-gradient(135deg, #ddd7cd 0%, #c0b7a8 100%)",
    order: 3,
  },
  {
    slug: "calcado",
    name: "Calçado",
    description: "Sapatos, sandálias e ténis.",
    gradient: "linear-gradient(135deg, #e3d7c8 0%, #c2ad90 100%)",
    order: 4,
  },
  {
    slug: "perucas",
    name: "Perucas",
    description: "Perucas e apliques de qualidade.",
    gradient: "linear-gradient(135deg, #e6d4c4 0%, #cab39d 100%)",
    order: 5,
  },
  {
    slug: "acessorios",
    name: "Acessórios",
    description: "O detalhe que completa o look.",
    gradient: "linear-gradient(135deg, #ecdcc1 0%, #dac39c 100%)",
    order: 6,
  },
];

/** Links principais de navegação (cabeçalho) */
export const mainNav = [
  { label: "Início", href: "/" },
  { label: "Loja", href: "/loja" },
  ...categories.map((c) => ({
    label: c.name,
    href: `/loja/${c.slug}`,
  })),
  { label: "Sobre", href: "/sobre" },
  { label: "Contacto", href: "/contacto" },
];
