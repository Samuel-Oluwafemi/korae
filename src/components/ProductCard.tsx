import { Link } from "react-router-dom";
import { Product } from "../types";
import { money } from "../utils/format";
import Img from "./Img";
export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      to={`/product/${p.slug}`}
      className="group block focus-visible:outline-2 focus-visible:outline-olive"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-line">
        {p.images[1] && (
          <Img
            src={p.images[1]}
            alt=""
            className="absolute inset-0 h-full w-full"
          />
        )}
        <Img
          src={p.images[0]}
          alt={p.name}
          className={`absolute inset-0 h-full w-full transition duration-500 
            group-hover:scale-105 ${p.images[1] ? "group-hover:opacity-0" : ""}`}
        />
        {(p.tag || !p.inStock) && (
          <span className="absolute left-3 top-3 bg-ivory px-2 py-1 text-[10px] tracking-widest">
            {p.inStock ? p.tag : "SOLD OUT"}
          </span>
        )}
      </div>
      <div className="mt-4 flex justify-between gap-3 text-sm">
        <div>
          <h3 className="font-medium">{p.name}</h3>
          <p className="mt-0.5 text-muted">{p.category}</p>
        </div>
        <p className="whitespace-nowrap">{money(p.price)}</p>
      </div>
    </Link>
  );
}
