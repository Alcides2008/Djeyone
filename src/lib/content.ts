import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type HeroSlide = {
  eyebrow: string;
  title: string; // use \n para quebrar linha
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
};

export type PromoContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
};

export type SiteContent = {
  announcement: string;
  hero: HeroSlide[];
  promo: PromoContent;
};

export const defaultContent: SiteContent = {
  announcement: "Entrega em todo o país · Pagamento Multicaixa Express",
  hero: [
    {
      eyebrow: "Nova coleção",
      title: "Beleza que\nfala por si",
      subtitle: "Cosméticos e perfumes premium, selecionados a dedo para si.",
      ctaLabel: "Explorar loja",
      ctaHref: "/loja",
    },
    {
      eyebrow: "Perfumaria",
      title: "Fragrâncias\ninesquecíveis",
      subtitle: "Descubra a sua assinatura olfativa entre marcas de luxo.",
      ctaLabel: "Ver perfumes",
      ctaHref: "/loja/perfumes",
    },
    {
      eyebrow: "Estilo",
      title: "Do look ao\ndetalhe final",
      subtitle: "Roupas, perucas e acessórios para brilhar em qualquer ocasião.",
      ctaLabel: "Ver novidades",
      ctaHref: "/loja",
    },
  ],
  promo: {
    eyebrow: "Oferta de lançamento",
    title: "Até 30% em perfumes selecionados",
    subtitle:
      "Por tempo limitado. Eleve a sua presença com as nossas fragrâncias mais desejadas.",
    ctaLabel: "Aproveitar oferta",
    ctaHref: "/loja/perfumes",
  },
};

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const snap = await getDoc(doc(db, "content", "site"));
    if (snap.exists()) {
      const data = snap.data() as Partial<SiteContent>;
      return {
        announcement: data.announcement ?? defaultContent.announcement,
        hero: data.hero?.length ? data.hero : defaultContent.hero,
        promo: { ...defaultContent.promo, ...(data.promo ?? {}) },
      };
    }
    return defaultContent;
  } catch {
    return defaultContent;
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await setDoc(doc(db, "content", "site"), content);
}
