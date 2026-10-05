import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import { money } from "../utils/format";
import { Line } from "../types";
import Totals from "../components/Totals";
import Img from "../components/Img";
interface Order {
  no: string;
  email: string;
  lines: Line[];
  total: number;
}
function Field({
  id,
  label,
  type = "text",
  defaultValue,
  half,
}: {
  id: string;
  label: string;
  type?: string;
  defaultValue?: string;
  half?: boolean;
}) {
  return (
    <div className={half ? "" : "sm:col-span-2"}>
      <label htmlFor={id} className="mb-1.5 block text-sm text-muted">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        defaultValue={defaultValue}
        className="input"
      />
    </div>
  );
}
export default function Checkout() {
  const { lines, total, clear } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const [busy, setBusy] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email"));
    setBusy(true);
    setTimeout(() => {
      let past: Order[] = [];
      try {
        past = JSON.parse(localStorage.getItem("korae-orders") || "[]");
      } catch {}
      const o: Order = { no: `KOR-${1024 + past.length}`, email, lines, total };
      localStorage.setItem("korae-orders", JSON.stringify([...past, o]));
      setOrder(o);
      clear();
      setBusy(false);
      window.scrollTo(0, 0);
    }, 900);
  };
  if (order)
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <Check className="mx-auto text-olive" size={36} />
        <h1 className="mt-4 font-serif text-5xl">Order received.</h1>
        <p className="mt-3 text-muted">Thank you for shopping with KORAE.</p>

        <p className="mt-2">
          Your order <strong>#{order.no}</strong> has been received. A
          confirmation will be sent to {order.email}.
        </p>

        <ul className="mt-10 border-t border-line text-left">
          {order.lines.map((l) => (
            <li
              key={l.key}
              className="flex items-center gap-4 border-b border-line py-4 text-sm"
            >
              <Img src={l.product.images[0]} alt="" className="h-16 w-14" />
              <span className="flex-1">
                <span className="font-serif text-base">{l.product.name}</span>
                <br />
                <span className="text-muted">
                  {l.color} · Qty {l.qty}
                </span>
              </span>
              <span>{money(l.product.price * l.qty)}</span>
            </li>
          ))}
          
          <li className="flex justify-between py-4 font-medium">
            <span>Total</span>
            <span>{money(order.total)}</span>
          </li>
        </ul>

        <Link to="/shop" className="btn mt-8">
          Continue shopping
        </Link>
      </div>
    );
  if (!lines.length)
    return (
      <div className="py-32 text-center">
        <h1 className="font-serif text-5xl">Your bag is empty.</h1>
        <Link to="/shop" className="btn mt-8">
          Continue shopping
        </Link>
      </div>
    );
  const h = "mb-4 mt-10 text-xs tracking-[0.18em] text-muted first:mt-0";
  return (
    <div className="mx-auto max-w-7xl px-5 py-14">
      <h1 className="font-serif text-5xl">Checkout</h1>
      <div className="mt-10 grid gap-12 md:grid-cols-[1.4fr_1fr]">

        <form onSubmit={submit} className="order-2 md:order-1">
          <h2 className={h}>CONTACT INFORMATION</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="email" label="Email" type="email" />
            <Field id="phone" label="Phone" type="tel" />
          </div>

          <h2 className={h}>SHIPPING ADDRESS</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field half id="first" label="First name" />
            <Field half id="last" label="Last name" />
            <Field id="address" label="Address" />
            <Field half id="city" label="City" />
            <Field half id="state" label="State" />
            <Field id="country" label="Country" defaultValue="Nigeria" />
          </div>

          <p className="mt-6 text-sm text-muted">
            This is a concept store. No payment is taken.
          </p>
          
          <button disabled={busy} className="btn mt-4 w-full">
            {busy ? "Placing order…" : "Place order"}
          </button>
        </form>

        <aside className="order-1 h-fit space-y-5 border border-line p-6 md:order-2">
          <h2 className="font-serif text-2xl">Order summary</h2>
          <ul className="text-sm">
            {lines.map((l) => (
              <li key={l.key} className="flex gap-3 border-b border-line py-3">
                <Img src={l.product.images[0]} alt="" className="h-16 w-14" />
                <span className="flex-1">
                  {l.product.name}
                  <br />
                  <span className="text-muted">
                    {l.color} · Qty {l.qty}
                  </span>
                </span>
                <span>{money(l.product.price * l.qty)}</span>
              </li>
            ))}
          </ul>

          <Totals />
        </aside>
      </div>
    </div>
  );
}
