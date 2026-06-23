import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Cabeçalho de secção: sobretítulo dourado + título editorial (+ link opcional). */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  link,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  link?: { label: string; href: string };
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered
          ? "items-center text-center"
          : "items-start md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-3", centered && "items-center")}>
        {eyebrow && (
          <span className="tracking-luxe text-xs uppercase text-gold">
            {eyebrow}
          </span>
        )}
        <h2 className="text-3xl text-ink md:text-4xl lg:text-5xl">{title}</h2>
        {description && (
          <p className="max-w-xl text-sm leading-relaxed text-muted">
            {description}
          </p>
        )}
      </div>

      {link && (
        <Link
          href={link.href}
          className="tracking-luxe group inline-flex items-center gap-2 text-xs uppercase text-ink transition-colors hover:text-gold"
        >
          {link.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
