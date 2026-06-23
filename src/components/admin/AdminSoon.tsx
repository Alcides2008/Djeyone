export function AdminSoon({ title }: { title: string }) {
  return (
    <div>
      <h1 className="font-display text-3xl text-ink">{title}</h1>
      <p className="mt-3 max-w-md text-sm text-muted">
        Esta secção do painel chega na próxima etapa. Os produtos já estão
        totalmente editáveis em <strong>Produtos</strong>.
      </p>
    </div>
  );
}
