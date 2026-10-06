import { Link } from "react-router-dom";
import { products } from "../data/products";
import { IMG } from "../data/images";
import Img from "../components/Img";
import ProductCard from "../components/ProductCard";
import Newsletter from "../components/Newsletter";
import ScrollReveal from "../components/ScrollReveal";
import HeroSlideshow from "../components/HeroSlideshow";
const wrap = "mx-auto max-w-7xl px-5";
const cats = [
  [
    "Bags",
    "A considered companion, carried everywhere.",
    "/shop?c=Bags",
    IMG.catBags,
  ],
  [
    "Shoes",
    "An assured step, from day to evening.",
    "/shop?c=Shoes",
    IMG.catShoes,
  ],
  [
    "New Arrivals",
    "The latest expressions of KORAE.",
    "/shop?c=new",
    IMG.catNew,
  ],
];
function Row({
  title,
  items,
  to,
  cta,
}: {
  title: string;
  items: typeof products;
  to: string;
  cta: string;
}) {
  return (
    <ScrollReveal>
      <section className={`${wrap} py-20`}>
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="font-serif text-4xl md:text-5xl">{title}</h2>
          <Link to={to} className="text-sm underline">
            {cta}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {items.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}
export default function Home() {
  return (
    <>
      <ScrollReveal>
        <section className="relative h-[88svh] min-h-[560px] bg-ink md:min-h-[620px]">
          <HeroSlideshow />
          <div
            className={`${wrap} relative flex h-full flex-col justify-end pb-14 text-ivory md:max-w-7xl md:justify-center md:pb-0`}
          >
            <div className="max-w-xl md:w-[48%] lg:w-[44%]">
              <h1 className="max-w-3xl font-serif text-6xl leading-[1.02] md:text-6xl lg:text-7xl">
                Quietly distinctive. Made for everywhere.
              </h1>
              <p className="mt-6 max-w-lg text-lg text-ivory/90">
                Refined bags and footwear, shaped by Lagos and designed to move
                with you—wherever the day leads.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                <Link to="/shop" className="btn-light">
                  Explore the collection
                </Link>
                <Link
                  to="/shop?c=new"
                  className="btn-ghost !border-ivory !text-ivory hover:!bg-ivory hover:!text-ink"
                >
                  Discover what’s new
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
      <ScrollReveal>
        <section
          id="about"
          className={`${wrap} grid items-center gap-10 py-24 md:grid-cols-2 md:gap-20`}
        >
          <Img
            src={IMG.about}
            alt="KORAE editorial featuring a structured handbag"
            className="aspect-[4/5] w-full bg-line"
          />
          <div className="max-w-md">
            <h2 className="font-serif text-4xl leading-tight md:text-6xl">
              Rooted in Lagos. Refined for everywhere.
            </h2>
            <p className="mt-6 leading-relaxed text-muted">
              Inspired by the energy of Lagos and a love of considered design,
              KORAE creates bags and footwear with a quiet confidence—made to
              accompany you, wherever life leads.
            </p>
            <Link to="/shop" className="btn-ghost mt-8">
              Explore KORAE
            </Link>
          </div>
        </section>
      </ScrollReveal>
      <ScrollReveal>
        <section className={`${wrap} grid gap-4 pb-20 md:grid-cols-3`}>
          {cats.map(([t, c, to, img]) => (
            <Link
              key={t}
              to={to}
              className="group relative block aspect-[4/5] overflow-hidden bg-line"
            >
              <Img
                src={img}
                alt={t}
                className="h-full w-full transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute bottom-6 left-6 text-ivory">
                <h3 className="font-serif text-4xl">{t}</h3>
                <p className="text-sm">{c}</p>
              </div>
            </Link>
          ))}
        </section>
      </ScrollReveal>
      <Row
        title="New arrivals"
        items={products.filter((p) => p.isNew).slice(0, 4)}
        to="/shop?c=new"
        cta="Discover new arrivals"
      />
      <Row
        title="Bestsellers"
        items={products.filter((p) => p.isBestseller).slice(0, 4)}
        to="/shop?c=best"
        cta="Explore bestsellers"
      />
      <ScrollReveal>
        <section className="relative mt-10 h-[70vh] min-h-[420px] bg-ink">
          <Img
            src={IMG.statement}
            alt=""
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div
            className={`${wrap} relative flex h-full flex-col justify-center text-ivory`}
          >
            <h2 className="max-w-xl font-serif text-5xl md:text-7xl">
              Considered, by design.
            </h2>
            <p className="mt-5 max-w-md text-ivory/90">
              A thoughtful edit of bags and footwear, created to bring a sense
              of ease and intention to the everyday.
            </p>
          </div>
        </section>
      </ScrollReveal>
      <Newsletter />
    </>
  );
}
