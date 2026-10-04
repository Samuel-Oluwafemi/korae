import { useCart } from "../context/CartContext";
import { money } from "../utils/format";
export default function Totals() {
  const { subtotal, shipping, total } = useCart();
  const r = "flex justify-between";
  return (
    <dl className="space-y-2 text-sm">
      <div className={r}>
        <dt className="text-muted">Subtotal</dt>
        <dd>{money(subtotal)}</dd>
      </div>

      <div className={r}>
        <dt className="text-muted">Shipping</dt>
        <dd>{shipping ? money(shipping) : "Free"}</dd>
      </div>
      
      <div className={`${r} border-t border-line pt-3 text-base font-medium`}>
        <dt>Total</dt>
        <dd>{money(total)}</dd>
      </div>
    </dl>
  );
}
