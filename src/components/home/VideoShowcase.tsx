"use client";

import { videos } from "@/data/videos";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoReel } from "@/components/video/VideoReel";

export function VideoShowcase() {
  const featured = videos.slice(0, 10);

  return (
    <section className="bg-cream py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Em movimento"
          title="DJEYONE em ação"
          align="left"
          link={{ label: "Ver todos os vídeos", href: "/videos" }}
        />

        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featured.map((v) => (
            <VideoReel
              key={v}
              src={v}
              className="w-[58%] shrink-0 snap-start sm:w-[38%] md:w-[28%] lg:w-[20%]"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
