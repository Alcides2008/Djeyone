"use client";

import { useEffect, useState, type InputHTMLAttributes } from "react";
import Link from "next/link";
import { Check, Smartphone, FileText, Truck, ChevronLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn, formatPrice } from "@/lib/utils";
import {
  shippingFor,
  addOrder,
  getAddresses,
  saveAddress,
  newOrderId,
  type Order,
} from "@/lib/account";
import { useAuth } from "@/context/AuthContext";
import { createOrder } from "@/lib/firestore";
import { Container } from "@/components/layout/Container";
import { buttonClasses } from "@/components/ui/Button";
import { PaymentInfo } from "./PaymentInfo";
import { orderWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

const provinces = [
  "Luanda", "Benguela", "Huambo", "Huíla", "Bié", "Cabinda",
  "Cuando Cubango", "Cuanza Norte", "Cuanza Sul", "Cunene",
  "Lunda Norte", "Lunda Sul", "Malanje", "Moxico", "Namibe",
  "Uíge", "Zaire", "Bengo",
];

const payments = [
  { id: "multicaixa-express", label: "Multicaixa Express", icon: Smartphone, hint: "Pague pela app Multicaixa Express." },
  { id: "referencia", label: "Referência Multicaixa", icon: FileText, hint: "Geramos uma referência para pagar no ATM/Internet Banking." },
  { id: "entrega", label: "Pagamento na entrega", icon: Truck, hint: "Pague em numerário no momento da entrega." },
];

const steps = ["Dados", "Entrega", "Pagamento"];

function Field({
  label,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="tracking-luxe text-[11px] uppercase text-muted">
        {label}
      </span>
      <input
        {...props}
        className="mt-2 h-12 w-full rounded-sm border border-line bg-cream px-4 text-sm text-ink placeholder:text-muted/50 focus:border-gold focus:outline-none"
      />
    </label>
  );
}

export function CheckoutFlow() {
  const { lines, subtotal, count, clear } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState<Order | null>(null);

  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [address, setAddress] = useState({ line: "", city: "", province: "" });
  const [payment, setPayment] = useState("multicaixa-express");

  // pré-preencher com dados da conta / endereços guardados
  useEffect(() => {
    if (user)
      setCustomer((c) => ({ ...c, name: user.name, email: user.email }));
    const addr = getAddresses()[0];
    if (addr)
      setAddress({ line: addr.line, city: addr.city, province: addr.province });
  }, [user]);

  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  const validStep =
    step === 0
      ? customer.name && customer.email && customer.phone
      : step === 1
        ? address.line && address.city && address.province
        : !!payment;

  const placeOrder = () => {
    const order: Order = {
      id: newOrderId(),
      date: new Date().toISOString(),
      items: lines.map((l) => ({
        name: l.product.name,
        quantity: l.quantity,
        price: l.product.price,
        options: l.options,
      })),
      subtotal,
      shipping,
      total,
      customer,
      address: { name: customer.name, phone: customer.phone, ...address },
      payment: payments.find((p) => p.id === payment)?.label ?? payment,
      status: "Aguarda pagamento",
    };
    addOrder(order);
    // grava o pedido na nuvem (não bloqueia a confirmação se a rede falhar)
    void createOrder(order, user?.uid ?? null).catch((e) =>
      console.error("Firestore order:", e),
    );
    saveAddress({
      id: newOrderId(),
      name: customer.name,
      phone: customer.phone,
      ...address,
    });
    clear();
    setPlaced(order);
    window.scrollTo({ top: 0 });
  };

  /* ---- Confirmação ---- */
  if (placed) {
    return (
      <main className="flex-1 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-lg text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Check className="h-8 w-8" />
            </span>
            <h1 className="mt-6 font-display text-3xl text-ink md:text-4xl">
              Pedido confirmado
            </h1>
            <p className="mt-3 text-sm text-muted">
              Obrigado, {placed.customer.name.split(" ")[0]}! O seu pedido{" "}
              <span className="font-medium text-ink">{placed.id}</span> foi
              registado.
            </p>
            <div className="mt-8 rounded-sm border border-line bg-sand/30 p-6 text-left text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Total a pagar</span>
                <span className="font-medium text-ink">
                  {formatPrice(placed.total)}
                </span>
              </div>
              <div className="mt-2 flex justify-between">
                <span className="text-muted">Método</span>
                <span className="text-ink">{placed.payment}</span>
              </div>
              <div className="mt-5 border-t border-line pt-5">
                <p className="tracking-luxe text-[11px] uppercase text-ink">
                  Como pagar
                </p>
                <div className="mt-3">
                  <PaymentInfo method={payment} />
                </div>
              </div>
            </div>

            {/* Confirmar por WhatsApp */}
            <a
              href={orderWhatsAppUrl(placed)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("gold", "lg", "mt-6 w-full")}
            >
              <WhatsAppIcon className="h-5 w-5" />
              Confirmar pagamento por WhatsApp
            </a>
            <p className="mt-3 text-xs text-muted">
              Pague por Express ou Referência e envie o comprovativo — o seu
              pedido vai já preenchido na mensagem.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/conta" className={buttonClasses("outline", "lg")}>
                Ver os meus pedidos
              </Link>
              <Link href="/loja" className={buttonClasses("ghost", "lg")}>
                Continuar a comprar
              </Link>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  /* ---- Carrinho vazio ---- */
  if (count === 0) {
    return (
      <main className="flex-1 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-md text-center">
            <h1 className="font-display text-3xl text-ink">
              Não há nada para finalizar
            </h1>
            <p className="mt-3 text-sm text-muted">
              Adicione produtos ao carrinho antes do checkout.
            </p>
            <Link
              href="/loja"
              className={buttonClasses("primary", "lg", "mt-7")}
            >
              Ir para a loja
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  /* ---- Fluxo ---- */
  return (
    <main className="flex-1 py-10 md:py-14">
      <Container>
        <h1 className="font-display text-3xl text-ink md:text-4xl">Checkout</h1>

        {/* Stepper */}
        <ol className="mt-6 flex items-center gap-3">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <button
                onClick={() => i < step && setStep(i)}
                className="flex items-center gap-2"
                disabled={i > step}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full text-xs transition-colors",
                    i < step
                      ? "bg-gold text-ink"
                      : i === step
                        ? "bg-ink text-cream"
                        : "border border-line text-muted",
                  )}
                >
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <span
                  className={cn(
                    "tracking-luxe text-[11px] uppercase",
                    i === step ? "text-ink" : "text-muted",
                  )}
                >
                  {s}
                </span>
              </button>
              {i < steps.length - 1 && (
                <span className="h-px w-6 bg-line sm:w-10" />
              )}
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Formulário */}
          <div>
            {step === 0 && (
              <div className="flex flex-col gap-5">
                <Field
                  label="Nome completo"
                  value={customer.name}
                  onChange={(e) =>
                    setCustomer({ ...customer, name: e.target.value })
                  }
                  placeholder="O seu nome"
                />
                <Field
                  label="Email"
                  type="email"
                  value={customer.email}
                  onChange={(e) =>
                    setCustomer({ ...customer, email: e.target.value })
                  }
                  placeholder="email@exemplo.com"
                />
                <Field
                  label="Telefone"
                  value={customer.phone}
                  onChange={(e) =>
                    setCustomer({ ...customer, phone: e.target.value })
                  }
                  placeholder="+244 9XX XXX XXX"
                />
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col gap-5">
                <Field
                  label="Morada"
                  value={address.line}
                  onChange={(e) =>
                    setAddress({ ...address, line: e.target.value })
                  }
                  placeholder="Rua, número, bairro"
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Cidade / Município"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    placeholder="Cidade"
                  />
                  <label className="block">
                    <span className="tracking-luxe text-[11px] uppercase text-muted">
                      Província
                    </span>
                    <select
                      value={address.province}
                      onChange={(e) =>
                        setAddress({ ...address, province: e.target.value })
                      }
                      className="mt-2 h-12 w-full rounded-sm border border-line bg-cream px-4 text-sm text-ink focus:border-gold focus:outline-none"
                    >
                      <option value="">Selecione…</option>
                      {provinces.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-3">
                {payments.map(({ id, label, icon: Icon, hint }) => (
                  <button
                    key={id}
                    onClick={() => setPayment(id)}
                    className={cn(
                      "flex items-start gap-4 rounded-sm border p-5 text-left transition-colors",
                      payment === id
                        ? "border-gold bg-gold/5"
                        : "border-line hover:border-ink",
                    )}
                  >
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                    <span>
                      <span className="block text-sm font-medium text-ink">
                        {label}
                      </span>
                      <span className="mt-1 block text-xs text-muted">
                        {hint}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "ml-auto mt-1 flex h-5 w-5 items-center justify-center rounded-full border",
                        payment === id
                          ? "border-gold bg-gold text-ink"
                          : "border-line",
                      )}
                    >
                      {payment === id && <Check className="h-3 w-3" />}
                    </span>
                  </button>
                ))}
                <div className="mt-3">
                  <PaymentInfo method={payment} />
                </div>
              </div>
            )}

            {/* Navegação */}
            <div className="mt-8 flex items-center justify-between">
              {step > 0 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="tracking-luxe flex items-center gap-1 text-[11px] uppercase text-muted hover:text-ink"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Voltar
                </button>
              ) : (
                <Link
                  href="/carrinho"
                  className="tracking-luxe flex items-center gap-1 text-[11px] uppercase text-muted hover:text-ink"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Carrinho
                </Link>
              )}

              {step < 2 ? (
                <button
                  onClick={() => validStep && setStep(step + 1)}
                  disabled={!validStep}
                  className={buttonClasses("primary", "lg")}
                >
                  Continuar
                </button>
              ) : (
                <button
                  onClick={placeOrder}
                  disabled={!validStep}
                  className={buttonClasses("gold", "lg")}
                >
                  Confirmar pedido
                </button>
              )}
            </div>
          </div>

          {/* Resumo */}
          <aside className="h-fit lg:sticky lg:top-28">
            <div className="rounded-sm border border-line bg-sand/30 p-6">
              <h2 className="tracking-luxe text-xs uppercase text-ink">
                O seu pedido
              </h2>
              <ul className="mt-5 flex flex-col gap-4">
                {lines.map((l) => (
                  <li key={l.id} className="flex items-center gap-3 text-sm">
                    <span className="text-muted">
                      {l.quantity}×
                    </span>
                    <span className="flex-1 text-ink">{l.product.name}</span>
                    <span className="text-ink">
                      {formatPrice(l.product.price * l.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <dl className="mt-5 space-y-2 border-t border-line pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Subtotal</dt>
                  <dd className="text-ink">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Portes</dt>
                  <dd className="text-ink">
                    {shipping === 0 ? "Grátis" : formatPrice(shipping)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-line pt-2 text-base">
                  <dt className="font-medium text-ink">Total</dt>
                  <dd className="font-medium text-ink">{formatPrice(total)}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
