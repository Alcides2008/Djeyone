"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Package } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import {
  getAllOrders,
  updateOrderStatus,
  type AdminOrder,
} from "@/lib/firestore";

const STATUSES = [
  "Aguarda pagamento",
  "Pago",
  "Em processamento",
  "Enviado",
  "Entregue",
  "Cancelado",
];

const statusColor = (s: string) =>
  s === "Entregue"
    ? "bg-emerald-100 text-emerald-700"
    : s === "Cancelado"
      ? "bg-red-100 text-red-600"
      : s === "Pago" || s === "Enviado"
        ? "bg-gold/15 text-gold-deep"
        : "bg-sand text-muted";

export function OrdersManager() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      setOrders(await getAllOrders());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const changeStatus = async (o: AdminOrder, status: string) => {
    setOrders((prev) =>
      prev.map((x) => (x._docId === o._docId ? { ...x, status } : x)),
    );
    try {
      await updateOrderStatus(o._docId, status);
    } catch (e) {
      console.error(e);
      load();
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Encomendas</h1>
      <p className="mt-1 text-sm text-muted">
        {loading ? "A carregar…" : `${orders.length} encomendas`}
      </p>

      {!loading && orders.length === 0 && (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-sm border border-dashed border-line py-20 text-center">
          <Package className="h-9 w-9 text-muted/40" strokeWidth={1} />
          <p className="text-sm text-muted">Ainda não há encomendas.</p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {orders.map((o) => {
          const isOpen = open === o._docId;
          return (
            <div key={o._docId} className="rounded-sm border border-line">
              <button
                onClick={() => setOpen(isOpen ? null : o._docId)}
                className="flex w-full items-center gap-4 p-4 text-left"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-ink">
                    {o.id}{" "}
                    <span className="text-sm font-normal text-muted">
                      · {o.customer.name}
                    </span>
                  </p>
                  <p className="text-xs text-muted">
                    {new Date(o.date).toLocaleDateString("pt-PT", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    · {o.payment}
                  </p>
                </div>
                <span
                  className={cn(
                    "tracking-luxe rounded-full px-3 py-1 text-[10px] uppercase",
                    statusColor(o.status),
                  )}
                >
                  {o.status}
                </span>
                <span className="hidden text-sm font-medium text-ink sm:block">
                  {formatPrice(o.total)}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              </button>

              {isOpen && (
                <div className="border-t border-line p-4">
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Itens */}
                    <div>
                      <h4 className="tracking-luxe text-[11px] uppercase text-muted">
                        Artigos
                      </h4>
                      <ul className="mt-2 flex flex-col gap-1.5 text-sm">
                        {o.items.map((it, i) => (
                          <li key={i} className="flex justify-between gap-3">
                            <span className="text-ink">
                              {it.quantity}× {it.name}
                              {it.options && (
                                <span className="text-muted">
                                  {" "}
                                  (
                                  {Object.entries(it.options)
                                    .map(([k, v]) => `${k}: ${v}`)
                                    .join(", ")}
                                  )
                                </span>
                              )}
                            </span>
                            <span className="text-ink">
                              {formatPrice(it.price * it.quantity)}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 border-t border-line pt-2 text-sm">
                        <div className="flex justify-between text-muted">
                          <span>Portes</span>
                          <span>
                            {o.shipping === 0
                              ? "Grátis"
                              : formatPrice(o.shipping)}
                          </span>
                        </div>
                        <div className="flex justify-between font-medium text-ink">
                          <span>Total</span>
                          <span>{formatPrice(o.total)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Cliente + entrega + estado */}
                    <div>
                      <h4 className="tracking-luxe text-[11px] uppercase text-muted">
                        Cliente
                      </h4>
                      <p className="mt-2 text-sm text-ink">{o.customer.name}</p>
                      <p className="text-sm text-muted">{o.customer.email}</p>
                      <p className="text-sm text-muted">{o.customer.phone}</p>
                      <p className="mt-2 text-sm text-muted">
                        {o.address.line}, {o.address.city} —{" "}
                        {o.address.province}
                      </p>

                      <h4 className="tracking-luxe mt-5 text-[11px] uppercase text-muted">
                        Estado
                      </h4>
                      <select
                        value={o.status}
                        onChange={(e) => changeStatus(o, e.target.value)}
                        className="mt-2 w-full rounded-sm border border-line bg-cream px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
