"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { buttonClasses } from "@/components/ui/Button";
import { EASE_PREMIUM } from "@/lib/motion";
import { getSiteContent, defaultContent, type PromoContent } from "@/lib/content";

export function PromoBanner() {
  const ref = useRef<HTMLElement>(null);
  const [promo, setPromo] = useState<PromoContent>(defaultContent.promo);

  useEffect(() => {
    getSiteContent()
      .then((c) => setPromo(c.promo))
      .catch(() => {});
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section
      ref={ref}
      className="relative my-8 flex min-h-[60vh] items-center overflow-hidden"
    >
      <motion.div
        style={{
          y: bgY,
          backgroundImage:
            "linear-gradient(120deg,#1b1a18 0%,#2b2722 55%,#3b3026 100%)",
        }}
        className="absolute inset-x-0 -top-[18%] h-[136%]"
      />
      <motion.div
        style={{
          y: glowY,
          background:
            "radial-gradient(circle at 70% 50%, rgba(191,160,106,0.35), transparent 60%)",
        }}
        className="absolute inset-0"
      />

      <div className="container-djeyone relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          className="tracking-luxe text-xs uppercase text-gold"
        >
          {promo.eyebrow}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.1 }}
          className="mx-auto mt-5 max-w-3xl font-display text-4xl text-cream md:text-6xl"
        >
          {promo.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.2 }}
          className="mx-auto mt-5 max-w-md text-sm text-cream/70"
        >
          {promo.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.3 }}
          className="mt-9"
        >
          <Link href={promo.ctaHref} className={buttonClasses("gold", "lg")}>
            {promo.ctaLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
