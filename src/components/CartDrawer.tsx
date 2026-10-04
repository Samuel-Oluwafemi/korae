import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartLine from "./CartLine";
import Totals from "./Totals";
export default function CartDrawer() {
  const { drawer, setDrawer, lines } = useCart();
  const close = () => setDrawer(false);
  return (
    <>
      <div
        onClick={close}
        className={`fixed inset-0 z-50 bg-ink/40 transition duration-300 
            ${drawer ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        aria-label="Your bag"
        aria-hidden={!drawer}
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col 
            bg-ivory transition-transform duration-300 ${drawer ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-serif text-2xl">Your bag</h2>
          <button aria-label="Close bag" onClick={close}>
            <X />
          </button>
        </div>
        {lines.length ? (
          <>
            <ul className="flex-1 overflow-y-auto px-6">
              {lines.map((l) => (
                <CartLine key={l.key} l={l} />
              ))}
            </ul>
            <div className="space-y-4 border-t border-line p-6">
              <Totals />
              <Link to="/checkout" onClick={close} className="btn w-full">
                Proceed to checkout
              </Link>
              <Link
                to="/cart"
                onClick={close}
                className="block text-center text-sm underline"
              >
                View full bag
              </Link>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-6">
            <p className="font-serif text-3xl">Your bag is empty.</p>
            <Link to="/shop" onClick={close} className="btn">
              Continue shopping
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
