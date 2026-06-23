"use client";

import { videos } from "@/data/videos";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { VideoReel } from "./VideoReel";

export function VideosGallery() {
  return (
    <main className="flex-1 py-10 md:py-14">
      <Container>
        <Breadcrumb
          items={[{ label: "Início", href: "/" }, { label: "Vídeos" }]}
        />
        <span className="tracking-luxe mt-5 block text-xs uppercase text-gold">
          Em movimento
        </span>
        <h1 className="mt-2 font-display text-3xl text-ink md:text-4xl">
          Vídeos
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Veja os nossos produtos em ação. Toque no altifalante para ligar o som.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {videos.map((v) => (
            <VideoReel key={v} src={v} />
          ))}
        </div>
      </Container>
    </main>
  );
}
