import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [onClose]);
  const t = q.trim().toLowerCase();
  const res = t
    ? products.filter((p) =>
        `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(t),
      )
    : [];
  return (
    <div
      role="dialog"
      aria-label="Search"
      className="fixed inset-0 z-[60] overflow-y-auto bg-ivory"
    >
      <div className="mx-auto max-w-7xl px-5 py-6">
        <div className="flex items-center gap-4 border-b border-ink pb-3">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search bags and shoes"
            aria-label="Search products"
            className="w-full bg-transparent font-serif text-3xl outline-none md:text-5xl"
          />
          <button aria-label="Close search" onClick={onClose}>
            <X />
          </button>
        </div>
        {t &&
          (res.length ? (
            <div
              className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4"
              onClick={onClose}
            >
              {res.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          ) : (
            <div className="mt-16 text-center">
              <p className="font-serif text-3xl">No pieces found.</p>
              <Link to="/shop" onClick={onClose} className="btn mt-6">
                View all products
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
