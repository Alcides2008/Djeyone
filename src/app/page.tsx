import { Hero } from "@/components/home/Hero";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { NewArrivals } from "@/components/home/NewArrivals";
import { PromoBanner } from "@/components/home/PromoBanner";
import { Trust } from "@/components/home/Trust";
import { Testimonials } from "@/components/home/Testimonials";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { getAllProducts } from "@/lib/products-db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const all = await getAllProducts();
  const bestsellers = all.filter((p) => p.bestseller).slice(0, 8);
  const novidades = all.filter((p) => p.isNew).slice(0, 8);

  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <CategoryShowcase />
      <ProductCarousel
        eyebrow="Os preferidos"
        title="Mais vendidos"
        products={bestsellers}
        viewAll={{ label: "Ver toda a loja", href: "/loja" }}
      />
      <NewArrivals products={novidades} />
      <PromoBanner />
      <Trust />
      <Testimonials />
      <VideoShowcase />
      <NewsletterSection />
      <InstagramFeed />
    </main>
  );
}
