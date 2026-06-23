"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { EASE_PREMIUM } from "@/lib/motion";
import { getSiteContent, defaultContent, type HeroSlide } from "@/lib/content";

const GRADIENTS = [
  "linear-gradient(120deg,#f7f0e6 0%,#ecd9bf 58%,#e2c79f 100%)",
  "linear-gradient(120deg,#f4ece1 0%,#e7d7c3 55%,#d8c0a0 100%)",
  "linear-gradient(120deg,#efeae2 0%,#ddd4c6 55%,#c8bca9 100%)",
];

const DURATION = 6500;

export function Hero() {
  const [slides, setSlides] = useState<HeroSlide[]>(defaultContent.hero);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    getSiteContent()
      .then((c) => c.hero.length && setSlides(c.hero))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      DURATION,
    );
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const slide = slides[index % slides.length];
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const lines = slide.title.split("\n");

  return (
    <section
      className="relative flex min-h-[88vh] items-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fundo (crossfade + leve Ken Burns) */}
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0"
          style={{ backgroundImage: gradient }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.1 }, scale: { duration: 7 } }}
        />
      </AnimatePresence>

      {/* Conteúdo */}
      <div className="container-djeyone relative z-10">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={index} className="flex flex-col items-start">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE_PREMIUM }}
                className="tracking-luxe text-xs uppercase text-gold-deep"
              >
                {slide.eyebrow}
              </motion.span>

              <h1 className="mt-5 font-display text-5xl leading-[1.05] text-ink sm:text-6xl md:text-7xl lg:text-8xl">
                {lines.map((line, i) => (
                  <span key={i} className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.8,
                        ease: EASE_PREMIUM,
                        delay: 0.15 + i * 0.12,
                      }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.45 }}
                className="mt-6 max-w-md text-base leading-relaxed text-ink/70"
              >
                {slide.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.6 }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <Link
                  href={slide.ctaHref}
                  className={buttonClasses("primary", "lg")}
                >
                  {slide.ctaLabel}
                </Link>
                <Link href="/sobre" className={buttonClasses("outline", "lg")}>
                  A nossa história
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={cn(
              "h-1 rounded-full transition-all duration-500",
              i === index ? "w-10 bg-ink" : "w-5 bg-ink/30 hover:bg-ink/50",
            )}
          />
        ))}
      </div>
    </section>
  );
}
