import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { CartItem, Line, Product } from "../types";
import { products } from "../data/products";
import { shippingFor } from "../utils/format";
interface Ctx {
  lines: Line[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  add: (
    p: Product,
    color: string,
    size: string | undefined,
    qty: number,
  ) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  drawer: boolean;
  setDrawer: (b: boolean) => void;
  notify: (m: string) => void;
}
const CartCtx = createContext<Ctx | null>(null);
const load = (): CartItem[] => {
  try {
    return JSON.parse(localStorage.getItem("korae-cart") || "[]");
  } catch {
    return [];
  }
};
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(load);
  const [drawer, setDrawer] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("korae-cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const notify = useCallback((m: string) => setToast(m), []);

  const lines = useMemo(
    () =>
      items.flatMap((i) => {
        const product = products.find((p) => p.id === i.productId);
        return product ? [{ ...i, product }] : [];
      }),
    [items],
  );

  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = shippingFor(subtotal);

  const add: Ctx["add"] = (p, color, size, qty) => {
    const key = `${p.id}-${color}-${size ?? ""}`;
    setItems((c) =>
      c.some((i) => i.key === key)
        ? c.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
        : [...c, { key, productId: p.id, color, size, qty }],
    );
    notify("Added to your bag.");
  };

  const setQty = (key: string, qty: number) =>
    setItems((c) =>
      c.map((i) =>
        i.key === key ? { ...i, qty: Math.min(10, Math.max(1, qty)) } : i,
      ),
    );
    
  const remove = (key: string) =>
    setItems((c) => c.filter((i) => i.key !== key));
  return (
    <CartCtx.Provider
      value={{
        lines,
        count: lines.reduce((s, l) => s + l.qty, 0),
        subtotal,
        shipping,
        total: subtotal + shipping,
        add,
        setQty,
        remove,
        clear: () => setItems([]),
        drawer,
        setDrawer,
        notify,
      }}
    >
      {children}
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 bg-ink px-6 py-3 text-sm text-ivory transition duration-300 ${toast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
      >
        {toast}
      </div>
    </CartCtx.Provider>
  );
}
export const useCart = () => {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
};
