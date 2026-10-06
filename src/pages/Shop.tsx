import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import ScrollReveal from "../components/ScrollReveal";
const PRODUCTS_PER_PAGE = 4;

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
  const [carouselEnabled, setCarouselEnabled] = useState(false);
  const [carouselPage, setCarouselPage] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
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
  const pageCount = carouselEnabled
    ? Math.ceil(list.length / PRODUCTS_PER_PAGE)
    : 1;
  const visibleProducts = carouselEnabled
    ? list.slice(
        carouselPage * PRODUCTS_PER_PAGE,
        (carouselPage + 1) * PRODUCTS_PER_PAGE,
      )
    : list;

  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 768px)");
    const updateCarouselLayout = () => setCarouselEnabled(breakpoint.matches);
    updateCarouselLayout();
    breakpoint.addEventListener("change", updateCarouselLayout);
    return () => breakpoint.removeEventListener("change", updateCarouselLayout);
  }, []);

  useEffect(() => {
    setCarouselPage(0);
  }, [c, price, avail, sort, carouselEnabled]);

  useEffect(() => {
    if (
      !carouselEnabled ||
      pageCount < 2 ||
      carouselPaused ||
      prefersReducedMotion
    ) {
      return;
    }
    const interval = window.setInterval(
      () => setCarouselPage((page) => (page + 1) % pageCount),
      5000,
    );
    return () => window.clearInterval(interval);
  }, [carouselEnabled, pageCount, carouselPaused, prefersReducedMotion]);
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
              <div className="mb-6 flex items-center justify-between gap-4">
                <p className="text-sm text-muted">
                  {list.length} {list.length === 1 ? "piece" : "pieces"}
                </p>
                {carouselEnabled && pageCount > 1 && (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Previous products"
                      onClick={() =>
                        setCarouselPage((page) => (page - 1 + pageCount) % pageCount)
                      }
                      className="grid h-9 w-9 place-items-center rounded-full border border-line transition hover:border-ink"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="min-w-16 text-center text-xs text-muted">
                      {carouselPage + 1} / {pageCount}
                    </span>
                    <button
                      type="button"
                      aria-label="Next products"
                      onClick={() =>
                        setCarouselPage((page) => (page + 1) % pageCount)
                      }
                      className="grid h-9 w-9 place-items-center rounded-full border border-line transition hover:border-ink"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
              {list.length ? (
                <div
                  onMouseEnter={() => setCarouselPaused(true)}
                  onMouseLeave={() => setCarouselPaused(false)}
                  onFocusCapture={() => setCarouselPaused(true)}
                  onBlurCapture={(event) => {
                    if (
                      !(event.relatedTarget instanceof Node) ||
                      !event.currentTarget.contains(event.relatedTarget)
                    ) {
                      setCarouselPaused(false);
                    }
                  }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={carouselEnabled ? `page-${carouselPage}` : "all-products"}
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, y: 8 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                      className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4"
                    >
                      {visibleProducts.map((p) => (
                        <ProductCard key={p.id} p={p} />
                      ))}
                    </motion.div>
                  </AnimatePresence>
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
