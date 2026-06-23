"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Vídeo vertical (reel) que toca sozinho (mudo) quando entra no ecrã
 * e pausa quando sai. Botão para ligar/desligar o som.
 */
export function VideoReel({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    el.play().catch(() => {});
  };

  return (
    <div
      className={cn(
        "group relative aspect-[9/16] overflow-hidden rounded-sm bg-ink",
        className,
      )}
    >
      <video
        ref={ref}
        src={src}
        muted={muted}
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="h-full w-full object-cover"
      />

      {/* indicador de carregamento antes de tocar */}
      {!playing && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-cream/70">
          <Play className="h-10 w-10" />
        </span>
      )}

      {/* som on/off */}
      <button
        onClick={toggleSound}
        aria-label={muted ? "Ligar som" : "Desligar som"}
        className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink/60 text-cream backdrop-blur-sm transition-colors hover:bg-ink/80"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
