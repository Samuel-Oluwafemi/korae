const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const bags = [
  new URL("../assets/bag.jpg", import.meta.url).href,
  new URL("../assets/bag1.jpg", import.meta.url).href,
  new URL("../assets/bag2.jpg", import.meta.url).href,
  new URL("../assets/bag3.jpg", import.meta.url).href,
  new URL("../assets/bag4.jpg", import.meta.url).href,
  new URL("../assets/bag5.jpg", import.meta.url).href,
  new URL("../assets/bag6.jpg", import.meta.url).href,
  new URL("../assets/bag7.jpg", import.meta.url).href,
  new URL("../assets/bag8.jpg", import.meta.url).href,
  new URL("../assets/bag9.jpg", import.meta.url).href,
  new URL("../assets/bag10.jpg", import.meta.url).href,
];
const shoes = [
  new URL("../assets/shoe.jpg", import.meta.url).href,
  new URL("../assets/shoe1.jpg", import.meta.url).href,
  new URL("../assets/shoe2.jpg", import.meta.url).href,
  new URL("../assets/shoe3.jpg", import.meta.url).href,
  new URL("../assets/shoe4.jpg", import.meta.url).href,
  new URL("../assets/shoe5.jpg", import.meta.url).href,
  new URL("../assets/shoe6.jpg", import.meta.url).href,
  new URL("../assets/shoe9.jpg", import.meta.url).href,
  new URL("../assets/slippers.jpg", import.meta.url).href,
  new URL("../assets/shoe-loafer.jpg", import.meta.url).href,
];

export const IMG = {
  bags,
  shoes,
  about: new URL("../assets/heroImg5.jpg", import.meta.url).href,
  statement: u("photo-1445205170230-053b83016050"),
  catBags: bags[0],
  catShoes: shoes[0],
  catNew: bags[1],
  catBest: shoes[8],
};
