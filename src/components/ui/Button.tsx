import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-cream hover:bg-charcoal",
  gold: "bg-gold text-ink hover:bg-gold-deep",
  outline:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-cream",
  ghost: "text-ink hover:bg-ink/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[11px]",
  md: "h-11 px-6 text-xs",
  lg: "h-14 px-9 text-xs",
};

/** Gera as classes de um botão — útil para aplicar o estilo a <Link> também. */
export function buttonClasses(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string,
): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium uppercase tracking-[0.12em] transition-all duration-300 ease-premium disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button className={buttonClasses(variant, size, className)} {...props} />
  );
}
