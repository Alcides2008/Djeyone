import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/** Logótipo textual da DJEYONE (serifada editorial, espaçamento amplo). */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — início`}
      className={cn(
        "font-display text-2xl leading-none tracking-[0.28em] text-ink transition-colors hover:text-gold-deep",
        className,
      )}
    >
      {siteConfig.name}
    </Link>
  );
}
