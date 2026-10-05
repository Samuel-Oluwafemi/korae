import { Link } from "react-router-dom";
import { Line } from "../types";
import { useCart } from "../context/CartContext";
import { money } from "../utils/format";
import Img from "./Img";
import Qty from "./Qty";
export default function CartLine({ l }: { l: Line }) {
  const { setQty, remove } = useCart();
  return (
    <li className="flex gap-4 border-b border-line py-5">
      <Link
        to={`/product/${l.product.slug}`}
        className="h-28 w-24 shrink-0 overflow-hidden bg-line"
      >
        <Img
          src={l.product.images[0]}
          alt={l.product.name}
          className="h-full w-full"
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between text-sm">
        <div className="flex justify-between gap-3">
          <div>
            <p className="font-serif text-base">{l.product.name}</p>
            <p className="text-muted">
              {l.color}
              {l.size && l.size !== "One Size" ? `, size ${l.size}` : ""}
            </p>
          </div>
          <p>{money(l.product.price * l.qty)}</p>
        </div>
        <div className="flex items-center justify-between">
          <Qty value={l.qty} onChange={(n) => setQty(l.key, n)} />
          <button
            onClick={() => remove(l.key)}
            className="text-xs underline text-muted hover:text-ink"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
