import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import ScrollReveal from "../components/ScrollReveal";
const tabs = [
  ["all", "All"],
  ["Bags", "Bags"],
  ["Shoes", "Shoes"],
  ["new", "New arrivals"],
  ["best", "Bestsellers"],
];
const prices: Record<string, [string, number, number]> = {
  all: ["Any price", 0, Infinity],
  u75: ["Under ₦75,000", 0, 74999],
  m: ["₦75,000 – ₦125,000", 75000, 125000],
  h: ["₦125,000 – ₦200,000", 125001, 200000],
  x: ["₦200,000+", 200001, Infinity],
};
const sorts: [string, string][] = [
  ["featured", "Featured"],
  ["newest", "Newest"],
  ["oldest", "Oldest"],
  ["low", "Price: Low to High"],
  ["high", "Price: High to Low"],
];
export default function Shop() {
  const [sp, setSp] = useSearchParams();
  const c = sp.get("c") || "all";
  const [price, setPrice] = useState("all");
  const [avail, setAvail] = useState(false);
  const [sort, setSort] = useState("featured");
  const [open, setOpen] = useState(false);
  const list = useMemo(() => {
    const [, lo, hi] = prices[price];
    const l = products.filter(
      (p) =>
        (c === "all" ||
          p.category === c ||
          (c === "new" && p.isNew) ||
          (c === "best" && p.isBestseller)) &&
        p.price >= lo &&
        p.price <= hi &&
        (!avail || p.inStock),
    );
    const by: Record<string, (a: (typeof l)[0], b: (typeof l)[0]) => number> = {
      featured: () => 0,
      newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
      oldest: (a, b) => a.createdAt.localeCompare(b.createdAt),
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
    };
    return [...l].sort(by[sort]);
  }, [c, price, avail, sort]);
  const clear = () => {
    setSp({});
    setPrice("all");
    setAvail(false);
    setSort("featured");
  };
  const lbl = "mb-3 text-xs tracking-[0.18em] text-muted";
  const Filters = (
    <div className="space-y-8 text-sm">
      <div>
        <h3 className={lbl}>PRICE</h3>
        {Object.entries(prices).map(([k, [t]]) => (
          <label
            key={k}
            className="flex cursor-pointer items-center gap-2 py-1"
          >
            <input
              type="radio"
              name="price"
              checked={price === k}
              onChange={() => setPrice(k)}
              className="accent-olive"
            />
            {t}
          </label>
        ))}
      </div>
      <div>
        <h3 className={lbl}>AVAILABILITY</h3>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={avail}
            onChange={(e) => setAvail(e.target.checked)}
            className="accent-olive"
          />
          In stock only
        </label>
      </div>
      <div>
        <label htmlFor="sort" className={`block ${lbl}`}>
          SORT BY
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="input"
        >
          {sorts.map(([k, t]) => (
            <option key={k} value={k}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <button onClick={clear} className="underline">
        Clear all
      </button>
    </div>
  );
  return (
    <div className="mx-auto max-w-7xl px-5 py-14">
      <h1 className="font-serif text-5xl md:text-7xl">The collection</h1>
      <p className="mt-3 text-muted">
        Considered bags and footwear designed to move with you.
      </p>
      <ScrollReveal>
        <>
          <div className="mt-10 flex items-center justify-between gap-4 border-b border-line">
            <nav
              aria-label="Categories"
              className="-mb-px flex gap-6 overflow-x-auto text-xs tracking-[0.18em]"
            >
              {tabs.map(([k, t]) => (
                <button
                  key={k}
                  onClick={() => setSp(k === "all" ? {} : { c: k })}
                  aria-current={c === k}
                  className={`whitespace-nowrap border-b py-4 uppercase ${c === k ? "border-ink" : "border-transparent text-muted hover:text-ink"}`}
                >
                  {t}
                </button>
              ))}
            </nav>
            <button
              onClick={() => setOpen(true)}
              className="flex shrink-0 items-center gap-2 text-sm md:hidden"
            >
              <SlidersHorizontal size={16} />
              Filter &amp; Sort
            </button>
          </div>
          <div className="mt-10 grid gap-12 md:grid-cols-[13rem_1fr]">
            <aside className="hidden md:block">{Filters}</aside>
            <div>
              <p className="mb-6 text-sm text-muted">
                {list.length} {list.length === 1 ? "piece" : "pieces"}
              </p>
              {list.length ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
                  {list.map((p) => (
                    <ProductCard key={p.id} p={p} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <p className="font-serif text-3xl">
                    No pieces match those filters.
                  </p>
                  <button onClick={clear} className="btn mt-6">
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      </ScrollReveal>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-ink/40 transition duration-300 md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <div
        aria-hidden={!open}
        className={`fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto bg-ivory p-6 transition-transform duration-300 md:hidden ${open ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-2xl">Filter &amp; Sort</h2>
          <button aria-label="Close filters" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>
        {Filters}
        <button onClick={() => setOpen(false)} className="btn mt-8 w-full">
          Show {list.length} pieces
        </button>
      </div>
    </div>
  );
}
