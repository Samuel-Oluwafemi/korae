import { Link } from "react-router-dom";
import Img from "../components/Img";
import { products } from "../data/products";
import { IMG } from "../data/images";

const collections = [
  ["Bags", "Carry what matters.", "/shop?c=Bags", IMG.catBags],
  ["Shoes", "Step into your everyday.", "/shop?c=Shoes", IMG.catShoes],
  ["New Arrivals", "What's new at KORAE.", "/shop?c=new", IMG.catNew],
  [
    "Bestsellers",
    "The pieces you reach for most.",
    "/shop?c=best",
    products.find((product) => product.isBestseller)?.images[0] ?? IMG.catBags,
  ],
];

export default function Collections() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-14">
      <h1 className="font-serif text-5xl md:text-7xl">Collections</h1>
      <p className="mt-3 text-muted">
        Explore considered pieces for every part of your day.
      </p>
      <section className="mt-10 grid gap-4 pb-10 sm:grid-cols-2 lg:grid-cols-4">
        {collections.map(([title, description, to, image]) => (
          <Link
            key={title}
            to={to}
            className="group relative block aspect-[4/5] overflow-hidden bg-line"
          >
            <Img
              src={image}
              alt={title}
              className="h-full w-full transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute bottom-6 left-6 text-ivory">
              <h2 className="font-serif text-4xl">{title}</h2>
              <p className="text-sm">{description}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
