/** Página provisória reutilizável (para rotas ainda não construídas). */
export function PagePlaceholder({
  eyebrow = "Em breve",
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <span className="tracking-luxe text-xs uppercase text-gold">
        {eyebrow}
      </span>
      <h1 className="mt-6 font-display text-5xl text-ink md:text-6xl">
        {title}
      </h1>
      <span className="mt-6 block h-px w-16 bg-gold" />
      {description && (
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
          {description}
        </p>
      )}
    </main>
  );
}
