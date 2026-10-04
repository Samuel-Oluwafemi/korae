import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartLine from "../components/CartLine";
import Totals from "../components/Totals";
export default function Cart() {
  const { lines } = useCart();
  if (!lines.length)
    return (
      <div className="py-32 text-center">
        <h1 className="font-serif text-5xl">Your bag is empty.</h1>
        <Link to="/shop" className="btn mt-8">
          Continue shopping
        </Link>
      </div>
    );
    
  return (
    <div className="mx-auto max-w-7xl px-5 py-14">
      <h1 className="font-serif text-5xl">Your bag</h1>
      <div className="mt-10 grid gap-12 md:grid-cols-[1.6fr_1fr]">
        <ul className="border-t border-line">
          {lines.map((l) => (
            <CartLine key={l.key} l={l} />
          ))}
        </ul>
        
        <div className="h-fit space-y-5 border border-line p-6">
          <Totals />
          <Link to="/checkout" className="btn w-full">
            Proceed to checkout
          </Link>
          <Link to="/shop" className="block text-center text-sm underline">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
