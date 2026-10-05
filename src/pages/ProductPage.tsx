import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { money } from "../utils/format";
import Img from "../components/Img";
import Qty from "../components/Qty";
import ProductCard from "../components/ProductCard";
const info = [
  [
    "Details",
    "Full-grain leather with a soft cotton lining. Finished by hand in small batches. Designed in Lagos.",
  ],
  [
    "Shipping & Returns",
    "Delivery within Lagos in 1–3 working days and nationwide in 3–7. Free shipping over ₦150,000, otherwise ₦3,500. Returns accepted within 14 days if unworn.",
  ],
  [
    "Care",
    "Wipe with a soft dry cloth. Keep away from prolonged moisture and direct heat. Store in the dust bag provided.",
  ],
];
export default function ProductPage() {
  const { slug } = useParams();
  const p = products.find((x) => x.slug === slug);
  const { add } = useCart();
  const [img, setImg] = useState(0);
  const [galleryPaused, setGalleryPaused] = useState(false);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  useEffect(() => {
    if (!p || p.images.length < 2 || galleryPaused) return;
    const interval = window.setInterval(
      () => setImg((current) => (current + 1) % p.images.length),
      5000,
    );
    return () => window.clearInterval(interval);
  }, [galleryPaused, img, p]);
  if (!p)
    return (
      <div className="py-32 text-center">
        <p className="font-serif text-4xl">We couldn't find that piece.</p>
        <Link to="/shop" className="btn mt-6">
          View all products
        </Link>
      </div>
    );
  const col = color || p.colors[0];
  const sz = size || (p.sizes?.length === 1 ? p.sizes[0] : "");
  const need = !!p.sizes && !sz;
  const chip = (on: boolean) =>
    `min-w-12 border px-4 py-2.5 text-sm transition 
  ${on ? "border-ink bg-ink text-ivory" : "border-line hover:border-ink"}`;
  const rel = products
    .filter((x) => x.id !== p.id)
    .sort(
      (a, b) =>
        Number(b.category === p.category) - Number(a.category === p.category),
    )
    .slice(0, 4);
  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <Link
        to="/shop"
        className="mb-8 inline-block text-xs tracking-[0.18em] hover:text-olive"
      >
        &lt; SHOP
      </Link>
      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16">
        <div
          className="flex flex-col-reverse gap-3 md:flex-row"
          onMouseEnter={() => setGalleryPaused(true)}
          onMouseLeave={() => setGalleryPaused(false)}
          onFocusCapture={() => setGalleryPaused(true)}
          onBlurCapture={(event) => {
            if (
              !(event.relatedTarget instanceof Node) ||
              !event.currentTarget.contains(event.relatedTarget)
            ) {
              setGalleryPaused(false);
            }
          }}
        >
          <div className="flex gap-3 md:flex-col">
            {p.images.map((s, i) => (
              <button
                key={s}
                onClick={() => setImg(i)}
                aria-label={`View image ${i + 1}`}
                className={`h-20 w-16 overflow-hidden border ${i === img ? "border-ink" : "border-transparent"}`}
              >
                <Img src={s} alt="" className="h-full w-full" />
              </button>
            ))}
          </div>
          <div className="relative">
            <Img
              key={p.images[img]}
              src={p.images[img]}
              alt={p.name}
              className="aspect-[7/5] w-[600px] animate-[fade_.5s_ease] rounded bg-line md:h-[600px]"
            />
            {p.images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() =>
                    setImg(
                      (current) =>
                        (current - 1 + p.images.length) % p.images.length,
                    )
                  }
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/90 transition hover:bg-ivory"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() =>
                    setImg((current) => (current + 1) % p.images.length)
                  }
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/90 transition hover:bg-ivory"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="md:sticky md:top-24 md:self-start">
          <p className="text-xs tracking-[0.18em] text-muted">
            {p.category.toUpperCase()}
          </p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl">{p.name}</h1>
          <p className="mt-3 text-lg">{money(p.price)}</p>
          <p className="mt-5 leading-relaxed text-muted">{p.description}</p>
          <div className="mt-8">
            <p className="mb-2 text-xs tracking-[0.18em] text-muted">
              COLOR: {col.toUpperCase()}
            </p>
            <div className="flex flex-wrap gap-2">
              {p.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={chip(c === col)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-2 text-xs tracking-[0.18em] text-muted">SIZE</p>
            <div className="flex flex-wrap gap-2">
              {p.sizes?.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={chip(s === sz)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-2 text-xs tracking-[0.18em] text-muted">QTY</p>
            <Qty value={qty} onChange={setQty} />
          </div>
          <button
            disabled={!p.inStock || need}
            onClick={() => add(p, col, sz || undefined, qty)}
            className="btn mt-8 w-full"
          >
            {!p.inStock ? "Sold out" : need ? "Select a size" : "Add to bag"}
          </button>
          <div className="mt-10 border-t border-line">
            {info.map(([t, b]) => (
              <details key={t} className="group border-b border-line py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
                  {t}
                  <ChevronDown
                    size={16}
                    className="transition group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{b}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
      <section className="mt-24">
        <h2 className="mb-8 font-serif text-4xl">You may also like</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {rel.map((r) => (
            <ProductCard key={r.id} p={r} />
          ))}
        </div>
      </section>
    </div>
  );
}
