import type { Product } from "@/types";

const P = "/products";

/**
 * Catálogo real da DJEYONE — fotos em public/products.
 * Preços PROVISÓRIOS (a confirmar pela Jacline).
 */
export const products: Product[] = [
  // ======================= PERUCAS =======================
  {
    id: "1",
    slug: "peruca-cacheada-curta",
    name: "Peruca Cacheada Curta",
    category: "perucas",
    price: 22000,
    description:
      "Peruca cacheada curta, leve e cheia de volume — caracóis definidos para um look natural e elegante.",
    images: [`${P}/screenshot_20251201_222515_whatsappbusiness.jpg`],
    inStock: true,
    featured: true,
    bestseller: true,
  },
  {
    id: "2",
    slug: "peruca-pixie-borgonha",
    name: "Peruca Pixie Cacheada Borgonha (99J)",
    category: "perucas",
    price: 24000,
    description:
      "Pixie cacheada na cor borgonha (99J), ousada e moderna. Confortável e fácil de usar no dia a dia.",
    images: [`${P}/img-20260622-wa0059.jpg`],
    inStock: true,
    isNew: true,
  },
  {
    id: "3",
    slug: "peruca-bob-liso",
    name: "Peruca Bob Liso",
    category: "perucas",
    price: 28000,
    description:
      "Bob liso clássico, com brilho e movimento. Um corte intemporal que valoriza qualquer rosto.",
    images: [`${P}/img-20260622-wa0073.jpg`],
    inStock: true,
    bestseller: true,
  },
  {
    id: "4",
    slug: "peruca-lisa-media",
    name: "Peruca Lisa Média",
    category: "perucas",
    price: 30000,
    description:
      "Peruca lisa de comprimento médio, sedosa e natural, com queda perfeita pelos ombros.",
    images: [`${P}/img-20260622-wa0053.jpg`, `${P}/img-20260622-wa0057.jpg`],
    inStock: true,
  },
  {
    id: "5",
    slug: "peruca-cacheada-mel",
    name: "Peruca Cacheada Mel",
    category: "perucas",
    price: 35000,
    description:
      "Cachos longos com reflexos cor de mel — volume e luminosidade para um visual de impacto.",
    images: [`${P}/img-20260622-wa0062.jpg`, `${P}/img-20260622-wa0055.jpg`],
    inStock: true,
    featured: true,
  },
  {
    id: "6",
    slug: "peruca-lace-mechas-loiras",
    name: "Peruca Lace com Mechas Loiras",
    category: "perucas",
    price: 38000,
    description:
      "Peruca lace com risca natural e mechas loiras contrastantes. Acabamento realista e sofisticado.",
    images: [`${P}/img-20260622-wa0061.jpg`],
    inStock: true,
    isNew: true,
  },
  {
    id: "7",
    slug: "peruca-yaki-bob",
    name: "Peruca Yaki Bob",
    category: "perucas",
    price: 30000,
    description:
      "Bob de textura yaki (efeito de cabelo natural alisado), com volume e movimento naturais.",
    images: [`${P}/img-20260622-wa0042.jpg`],
    inStock: true,
    bestseller: true,
  },
  {
    id: "8",
    slug: "peruca-kinky-curly",
    name: "Peruca Kinky Curly Natural",
    category: "perucas",
    price: 36000,
    description:
      "Peruca kinky curly castanho natural, cachos abundantes e textura realista para um look poderoso.",
    images: [`${P}/img-20260622-wa0043.jpg`],
    inStock: true,
    featured: true,
    isNew: true,
  },
  {
    id: "9",
    slug: "peruca-curta-ondulada",
    name: "Peruca Curta Ondulada",
    category: "perucas",
    price: 20000,
    description:
      "Peruca curta com ondas suaves, discreta e elegante — prática para o dia a dia.",
    images: [`${P}/img-20260622-wa0075.jpg`],
    inStock: true,
  },
  {
    id: "10",
    slug: "peruca-water-wave-bob",
    name: "Peruca Water Wave Bob",
    category: "perucas",
    price: 32000,
    description:
      "Bob water wave com lace frontal e risca natural. Cachos molhados definidos e cheios de brilho.",
    images: [`${P}/img-20260622-wa0081.jpg`],
    inStock: true,
    isNew: true,
  },

  // ======================= PERFUMES =======================
  {
    id: "11",
    slug: "camou-classic-pearl",
    name: "Camou Classic Pearl — Desodorizante Perfumado 200ml",
    category: "perfumes",
    price: 6500,
    description:
      "Camou Classic Pearl: desodorizante perfumado de fragrância suave e envolvente, fixação duradoura. 200 ml.",
    images: [`${P}/img-20260622-wa0077.jpg`, `${P}/img-20260622-wa0071.jpg`],
    inStock: true,
    bestseller: true,
  },
  {
    id: "12",
    slug: "camou-gorgeous",
    name: "Camou Gorgeous — Desodorizante Perfumado 200ml",
    category: "perfumes",
    price: 6500,
    description:
      "Camou Gorgeous: fragrância floral marcante num desodorizante perfumado de longa duração. 200 ml.",
    images: [`${P}/img-20260622-wa0078.jpg`],
    inStock: true,
  },
  {
    id: "13",
    slug: "perfume-fine-fragrance",
    name: "Perfume Fine Fragrance Collection",
    category: "perfumes",
    price: 12000,
    description:
      "Perfumes da Fine Fragrance Collection (alto teor de óleo). Vários aromas inspirados: Armani Si, One Million, Scandal, Sauvage e 212 VIP.",
    images: [`${P}/img-20260622-wa0074.jpg`, `${P}/img-20260622-wa0072.jpg`],
    inStock: true,
    featured: true,
    isNew: true,
  },
  {
    id: "14",
    slug: "perfume-matelot",
    name: "Perfume Matelot",
    category: "perfumes",
    price: 15000,
    description:
      "Matelot — fragrância amadeirada aquática, fresca e marcante, com saco de oferta. Uma assinatura sofisticada.",
    images: [`${P}/img-20260622-wa0085.jpg`],
    inStock: true,
    featured: true,
  },

  // ======================= CALÇADO =======================
  {
    id: "15",
    slug: "sapato-verniz-vermelho",
    name: "Sapato Verniz Vermelho",
    category: "calcado",
    price: 18000,
    description:
      "Sapato em verniz vermelho com fivela elegante — um toque de cor poderoso para qualquer ocasião.",
    images: [`${P}/20250111_193622.jpg`],
    inStock: true,
    featured: true,
  },
  {
    id: "16",
    slug: "sapato-verniz-preto-laco",
    name: "Sapato Verniz Preto com Laço",
    category: "calcado",
    price: 18000,
    description:
      "Sapato em verniz preto com laço de strass — clássico, confortável e sempre elegante.",
    images: [`${P}/20250111_195422.jpg`, `${P}/20250111_194444.jpg`],
    inStock: true,
    bestseller: true,
  },
  {
    id: "17",
    slug: "sapato-verniz-nude",
    name: "Sapato Verniz Nude com Laço",
    category: "calcado",
    price: 18000,
    description:
      "Sapato em verniz nude com laço de strass — delicado e versátil, combina com tudo.",
    images: [`${P}/20250111_193817.jpg`],
    inStock: true,
    isNew: true,
  },
  {
    id: "18",
    slug: "sapato-dourado-laco",
    name: "Sapato Dourado com Laço",
    category: "calcado",
    price: 19000,
    description:
      "Sapato dourado metalizado com laço de strass — brilho e sofisticação para ocasiões especiais.",
    images: [`${P}/20250111_193917.jpg`],
    inStock: true,
    featured: true,
  },
  {
    id: "19",
    slug: "mocassim-azul-marinho",
    name: "Mocassim Verniz Azul-Marinho",
    category: "calcado",
    price: 17000,
    description:
      "Mocassim em verniz azul-marinho com fivela dourada — elegante e confortável para o dia a dia.",
    images: [`${P}/20250111_194348.jpg`],
    inStock: true,
  },
  {
    id: "20",
    slug: "sabrina-pop-dots-branca",
    name: "Sabrina Pop Dots Branca",
    category: "calcado",
    price: 14000,
    description:
      "Sabrina em tule com bolinhas e detalhe metalizado dourado. Delicada e cheia de personalidade.",
    images: [`${P}/img-20260622-wa0047.jpg`, `${P}/img-20260622-wa0065.jpg`],
    inStock: true,
    isNew: true,
  },
  {
    id: "21",
    slug: "sabrina-pop-dots-preta",
    name: "Sabrina Pop Dots Preta",
    category: "calcado",
    price: 14000,
    description:
      "Sabrina em tule preto com bolinhas e fecho metalizado. Confortável para o dia inteiro.",
    images: [`${P}/img-20260622-wa0050.jpg`],
    inStock: true,
  },
  {
    id: "22",
    slug: "mocassim-mesh-cinza",
    name: "Mocassim Mesh Cinza",
    category: "calcado",
    price: 15000,
    description:
      "Mocassim em malha respirável cinza com fivela dourada. Leve, fresco e versátil.",
    images: [`${P}/img-20260622-wa0051.jpg`],
    inStock: true,
    bestseller: true,
  },
  {
    id: "23",
    slug: "tenis-fashion-preto-branco",
    name: "Ténis Fashion Preto & Branco",
    category: "calcado",
    price: 16000,
    description:
      "Ténis casual preto e branco com sola confortável — para um look desportivo e moderno.",
    images: [`${P}/img-20260622-wa0054.jpg`],
    inStock: true,
    isNew: true,
  },
  {
    id: "24",
    slug: "sandalia-trancada-branca",
    name: "Sandália Trançada Branca",
    category: "calcado",
    price: 13000,
    description:
      "Sandália rasa com tiras trançadas em tons creme e caramelo. Conforto e estilo para o verão.",
    images: [`${P}/img-20260622-wa0056.jpg`],
    inStock: true,
  },
  {
    id: "25",
    slug: "sandalia-trancada-preta",
    name: "Sandália Trançada Preta",
    category: "calcado",
    price: 13000,
    description:
      "Sandália rasa preta com tiras trançadas e acabamento em contraste. Confortável e elegante.",
    images: [`${P}/img-20260622-wa0084.jpg`],
    inStock: true,
  },
  {
    id: "26",
    slug: "sandalia-fivela-bege",
    name: "Sandália Fivela Dourada Bege",
    category: "calcado",
    price: 12000,
    description:
      "Sandália rasteira bege em camurça com fivela dourada — minimalista e sofisticada.",
    images: [`${P}/img-20260622-wa0044.jpg`],
    inStock: true,
  },
  {
    id: "27",
    slug: "sandalia-fivela-preta",
    name: "Sandália Fivela Dourada Preta",
    category: "calcado",
    price: 12000,
    description:
      "Sandália rasteira preta em camurça com fivela dourada — clássica e confortável.",
    images: [`${P}/img-20260622-wa0046.jpg`],
    inStock: true,
  },
  {
    id: "28",
    slug: "scarpin-slingback-bico-fino",
    name: "Scarpin Slingback Bico Fino",
    category: "calcado",
    price: 17000,
    description:
      "Scarpin slingback de bico fino com laço — salto confortável e silhueta alongada. Disponível em várias cores.",
    images: [`${P}/img-20260622-wa0066.jpg`],
    inStock: true,
    featured: true,
  },

  // ======================= ROUPAS =======================
  {
    id: "29",
    slug: "polo-tricot-canelado",
    name: "Polo Tricot Canelado",
    category: "roupas",
    price: 12000,
    description:
      "Polo masculino em tricot canelado, leve e elegante. Caimento perfeito para um look refinado.",
    images: [`${P}/img-20260622-wa0060.jpg`],
    inStock: true,
    bestseller: true,
  },
  {
    id: "30",
    slug: "polo-tricot-perfurado",
    name: "Polo Tricot Perfurado",
    category: "roupas",
    price: 12000,
    description:
      "Polo masculino em tricot perfurado, fresco e moderno, com gola em contraste. Ideal para o calor.",
    images: [`${P}/img-20260622-wa0069.jpg`],
    inStock: true,
  },
  {
    id: "31",
    slug: "hoodie-branco-estampado",
    name: "Hoodie Branco Estampado",
    category: "roupas",
    price: 14000,
    description:
      "Hoodie branco com estampa minimalista — conforto e estilo urbano para o dia a dia.",
    images: [`${P}/img-20260622-wa0058.jpg`],
    inStock: true,
    isNew: true,
  },
  {
    id: "32",
    slug: "hoodie-new-york",
    name: "Hoodie New York",
    category: "roupas",
    price: 15000,
    description:
      "Hoodie creme com estampa “New York Queens” — tecido macio e quente, visual descontraído.",
    images: [`${P}/img-20260622-wa0076.jpg`],
    inStock: true,
    featured: true,
  },

  // ==================== COSMÉTICOS (cabelo) ====================
  {
    id: "33",
    slug: "kit-onion-zoau",
    name: "Kit Onion ZOáu — Shampoo, Condicionador & Máscara",
    category: "cosmeticos",
    price: 11000,
    description:
      "Kit capilar ZOáu com extrato de cebola e óleo de semente negra — fortalece, combate a queda e dá brilho.",
    images: [`${P}/img-20260622-wa0064.jpg`],
    inStock: true,
    featured: true,
    isNew: true,
  },
  {
    id: "34",
    slug: "kit-mielle-rosemary-mint",
    name: "Mielle Rosemary Mint — Conjunto Capilar",
    category: "cosmeticos",
    price: 18000,
    description:
      "Linha Mielle Rosemary Mint (óleo, máscara, shampoo e leave-in) — fortalece e estimula o crescimento com alecrim e menta.",
    images: [`${P}/img-20260622-wa0052.jpg`],
    inStock: true,
    bestseller: true,
  },
  {
    id: "35",
    slug: "kit-ginger-narv",
    name: "Kit Ginger NARV — Shampoo, Máscara & Condicionador",
    category: "cosmeticos",
    price: 12000,
    description:
      "Kit capilar NARV com extrato de gengibre — fortalece a raiz, hidrata e reduz a quebra. 95% natural.",
    images: [`${P}/img-20260622-wa0079.jpg`],
    inStock: true,
    isNew: true,
  },

  // ======================= ACESSÓRIOS =======================
  {
    id: "36",
    slug: "brincos-pedra-quadrada",
    name: "Brincos Pedra Quadrada",
    category: "acessorios",
    price: 4500,
    description:
      "Brincos de pedra quadrada com aro dourado — disponíveis em várias cores para combinar com tudo.",
    images: [`${P}/img-20260622-wa0067.jpg`],
    inStock: true,
    bestseller: true,
  },
  {
    id: "37",
    slug: "brincos-flor-dourada",
    name: "Brincos Flor Dourada",
    category: "acessorios",
    price: 5000,
    description:
      "Brincos statement com flores douradas sobre pedra preta — elegantes e cheios de presença.",
    images: [`${P}/img-20260622-wa0063.jpg`],
    inStock: true,
    isNew: true,
  },
  {
    id: "38",
    slug: "brincos-folha-dourada",
    name: "Brincos Folha Dourada",
    category: "acessorios",
    price: 5500,
    description:
      "Brincos em leque de folhas douradas — peça arrojada que valoriza qualquer visual.",
    images: [`${P}/img-20260622-wa0080.jpg`],
    inStock: true,
    featured: true,
  },
  {
    id: "39",
    slug: "brincos-leque-dourado",
    name: "Brincos Leque Dourado",
    category: "acessorios",
    price: 5000,
    description:
      "Brincos em forma de leque dourado, com brilho polido — sofisticação imediata.",
    images: [`${P}/img-20260622-wa0083.jpg`],
    inStock: true,
  },
  {
    id: "40",
    slug: "brincos-quadrado-dourado",
    name: "Brincos Quadrado Dourado",
    category: "acessorios",
    price: 4800,
    description:
      "Brincos quadrados dourados de acabamento escovado e polido — modernos e versáteis.",
    images: [`${P}/img-20260622-wa0086.jpg`],
    inStock: true,
    bestseller: true,
  },
  {
    id: "41",
    slug: "oculos-sol-oversized",
    name: "Óculos de Sol Oversized",
    category: "acessorios",
    price: 7500,
    description:
      "Óculos de sol quadrados oversized — proteção com atitude. Disponíveis em várias cores.",
    images: [`${P}/img-20260622-wa0082.jpg`],
    inStock: true,
    featured: true,
    isNew: true,
  },
];

export const getBestsellers = (limit = 8) =>
  products.filter((p) => p.bestseller).slice(0, limit);

export const getNewArrivals = (limit = 8) =>
  products.filter((p) => p.isNew).slice(0, limit);

export const getFeatured = (limit = 8) =>
  products.filter((p) => p.featured).slice(0, limit);

export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category === category);

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
