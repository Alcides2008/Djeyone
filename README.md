# DJEYONE — E-commerce Premium

Loja online premium de cosméticos, perfumes, roupas, perucas e acessórios, com
foco no mercado angolano (preços em Kwanza, pagamento Multicaixa Express).

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** (tema configurado em `src/app/globals.css`)
- **Framer Motion** + **GSAP** (animações premium)
- **lucide-react** (ícones), **clsx** + **tailwind-merge** (utilitário `cn`)

## Como rodar

```bash
npm run dev      # servidor de desenvolvimento em http://localhost:3000
npm run build    # build de produção
npm run start    # roda o build
npm run lint     # verifica o código
```

## Estrutura

```
src/
├── app/                 # rotas (App Router); layout.tsx = <html> raiz
│   ├── layout.tsx       # fontes, metadados, estrutura base
│   ├── page.tsx         # página inicial
│   └── globals.css      # sistema de design (cores, tipografia)
├── components/
│   ├── ui/              # primitivos (botão, input, ...)
│   ├── layout/          # cabeçalho, rodapé, container
│   ├── home/            # secções da página inicial
│   ├── product/         # cartão e galeria de produto
│   └── cart/            # carrinho deslizante
├── config/              # site.ts (categorias, navegação, contactos)
├── data/                # dados de produtos (mock por agora)
├── hooks/               # hooks reutilizáveis
├── lib/                 # utils.ts (cn, formatPrice)
└── types/               # tipos de domínio (Product, Category, ...)
```

## Sistema de design

Estética premium — tons neutros (preto, creme, bege) com acento dourado/champagne.
Títulos em serifada editorial (**Playfair Display**), corpo em sans limpa (**Inter**).
Cores disponíveis como utilitários Tailwind: `ink`, `cream`, `sand`, `champagne`,
`gold`, `gold-deep`, `muted`, `line`.

## Plano de fases

- [x] **Fase 1** — Setup (Next.js + TS + Tailwind), estrutura de pastas, design base
- [ ] **Fase 2** — Cabeçalho, rodapé, layout, sistema de design (componentes)
- [ ] **Fase 3** — Página inicial completa com animações
- [ ] **Fase 4** — Catálogo e página de produto
- [ ] **Fase 5** — Carrinho, checkout e conta
- [ ] **Fase 6** — Backend, base de dados e pagamentos (Multicaixa Express)
- [ ] **Fase 7** — Painel administrativo
