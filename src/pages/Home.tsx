import { Link } from "react-router-dom";
import { products } from "../data/products";
import { IMG } from "../data/images";
import Img from "../components/Img";
import ProductCard from "../components/ProductCard";
import Newsletter from "../components/Newsletter";
import ScrollReveal from "../components/ScrollReveal";
const wrap = "mx-auto max-w-7xl px-5";
const cats = [
  ["Bags", "Carry what matters.", "/shop?c=Bags", IMG.catBags],
  ["Shoes", "Step into your everyday.", "/shop?c=Shoes", IMG.catShoes],
  ["New Arrivals", "What's new at KORAE.", "/shop?c=new", IMG.catNew],
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
        <section className="relative h-[88vh] min-h-[560px] bg-ink">
        <Img
          src={IMG.hero}
          alt="KORAE bags and footwear in a Lagos setting"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div
          className={`${wrap} relative flex h-full flex-col justify-end pb-14 text-ivory md:pb-24`}
        >
          <h1 className="max-w-3xl font-serif text-6xl leading-[1.02] md:text-8xl">
            Made for the way you move.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-ivory/90">
            Contemporary bags and footwear designed for everyday movement, from
            Lagos streets to wherever you're headed next.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/shop" className="btn-light">
              Shop the collection
            </Link>
            <Link
              to="/shop?c=new"
              className="btn-ghost border-ivory text-ivory hover:bg-ivory hover:text-ink"
            >
              Explore new arrivals
            </Link>
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
            alt="KORAE editorial"
            className="aspect-[4/5] w-full bg-line"
          />
          <div className="max-w-md">
            <h2 className="font-serif text-4xl leading-tight md:text-6xl">
              Designed in Lagos. Made for everywhere.
            </h2>
            <p className="mt-6 leading-relaxed text-muted">
              KORAE creates refined everyday accessories inspired by movement,
              modern Nigerian life and understated personal style. Each piece is
              cut to be carried often and noticed quietly.
            </p>
            <Link to="/shop" className="btn-ghost mt-8">
              Discover KORAE
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
        cta="View all new arrivals"
      />
      <Row
        title="Bestsellers"
        items={products.filter((p) => p.isBestseller).slice(0, 4)}
        to="/shop?c=best"
        cta="Shop bestsellers"
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
              Less noise. Better pieces.
            </h2>
            <p className="mt-5 max-w-md text-ivory/90">
              KORAE creates considered accessories for people who value good
              design, quality and pieces that move naturally through their
              everyday.
            </p>
          </div>
        </section>
      </ScrollReveal>
      <Newsletter />
    </>
  );
}
