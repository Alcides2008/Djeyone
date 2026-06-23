"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  Tags,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { isAdminEmail } from "@/config/admins";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { buttonClasses } from "@/components/ui/Button";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Produtos", href: "/admin/produtos", icon: Package },
  { label: "Encomendas", href: "/admin/encomendas", icon: ShoppingCart },
  { label: "Conteúdo", href: "/admin/conteudo", icon: FileText },
  { label: "Categorias", href: "/admin/categorias", icon: Tags },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return (
      <main className="flex flex-1 items-center justify-center py-32 text-sm text-muted">
        A carregar…
      </main>
    );
  }

  if (!isAdminEmail(user?.email)) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-32 text-center">
        <span className="tracking-luxe text-xs uppercase text-gold">
          Área reservada
        </span>
        <h1 className="font-display text-3xl text-ink">Acesso restrito</h1>
        <p className="max-w-sm text-sm text-muted">
          O painel de administração é só para administradores.
          {!user && " Inicie sessão com uma conta autorizada."}
        </p>
        <Link
          href={user ? "/" : "/conta"}
          className={buttonClasses("primary", "md", "mt-2")}
        >
          {user ? "Voltar à loja" : "Entrar"}
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <Container className="py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Barra lateral */}
          <aside className="lg:w-56 lg:shrink-0">
            <span className="tracking-luxe text-[11px] uppercase text-gold">
              Painel · DJEYONE
            </span>
            <nav className="mt-4 flex gap-1 overflow-x-auto lg:flex-col">
              {nav.map(({ label, href, icon: Icon }) => {
                const active =
                  href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 whitespace-nowrap rounded-sm px-3 py-2.5 text-sm transition-colors",
                      active
                        ? "bg-ink text-cream"
                        : "text-muted hover:bg-sand/50 hover:text-ink",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>
            <Link
              href="/"
              className="tracking-luxe mt-6 hidden items-center gap-2 text-[11px] uppercase text-muted transition-colors hover:text-ink lg:flex"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Voltar à loja
            </Link>
          </aside>

          {/* Conteúdo */}
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </Container>
    </main>
  );
}
