/**
 * Persistência local (mock) de utilizador, endereços e pedidos.
 * Substituído por backend real (auth + base de dados) na Fase 6.
 * Apenas para usar no cliente (depende de localStorage).
 */

export type User = { name: string; email: string };

export type Address = {
  id: string;
  name: string;
  phone: string;
  line: string;
  city: string;
  province: string;
};

export type OrderItem = {
  name: string;
  quantity: number;
  price: number;
  options?: Record<string, string>;
};

export type Order = {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: { name: string; email: string; phone: string };
  address: Omit<Address, "id">;
  payment: string;
  status: string;
};

const KEYS = {
  user: "djeyone.user",
  orders: "djeyone.orders",
  addresses: "djeyone.addresses",
};

/* ---- Portes de envio ---- */
export const FREE_SHIPPING_THRESHOLD = 50000;
export const SHIPPING_FEE = 2500;
export const shippingFor = (subtotal: number) =>
  subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  if (typeof window !== "undefined")
    localStorage.setItem(key, JSON.stringify(value));
}

/* ---- Utilizador ---- */
export const getUser = () => read<User | null>(KEYS.user, null);
export const setUser = (u: User) => write(KEYS.user, u);
export const logout = () => {
  if (typeof window !== "undefined") localStorage.removeItem(KEYS.user);
};

/* ---- Endereços ---- */
export const getAddresses = () => read<Address[]>(KEYS.addresses, []);
export const saveAddress = (a: Address) => {
  const all = getAddresses();
  write(KEYS.addresses, [a, ...all.filter((x) => x.id !== a.id)]);
};
export const removeAddress = (id: string) =>
  write(
    KEYS.addresses,
    getAddresses().filter((a) => a.id !== id),
  );

/* ---- Pedidos ---- */
export const getOrders = () => read<Order[]>(KEYS.orders, []);
export const addOrder = (o: Order) => write(KEYS.orders, [o, ...getOrders()]);

/** Gera uma referência de pedido tipo DJ-XXXXXX. */
export const newOrderId = () =>
  "DJ-" + Math.random().toString(36).slice(2, 8).toUpperCase();
