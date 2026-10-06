// Product and editorial image URLs; homepage hero slides live in src/assets.
const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;
const bagA = [
    u("photo-1584917865442-de89df76afd3"),
    u("photo-1548036328-c9fa89d128fa"),
];
const bagB = [
  u("photo-1591561954557-26941169b49e"),
  u("photo-1566150905458-1bf1fc113f0d"),
];

const bagC = [
  u("photo-1591561954557-26941169b49e"),
  u("photo-1566150905458-1bf1fc113f0d"),
];

const bagD = [
  u("photo-1591561954557-26941169b49e"),
  u("photo-1566150905458-1bf1fc113f0d"),
];

const bagE = [
  u("photo-1591561954557-26941169b49e"),
  u("photo-1566150905458-1bf1fc113f0d"),
];

const bagF = [
  u("photo-1591561954557-26941169b49e"),
  u("photo-1566150905458-1bf1fc113f0d"),
];
const shoeA = [
  u("photo-1543163521-1bf539c55dd2"),
  u("photo-1560343090-f0409e92791a"),
];
const shoeB = [
    u("photo-1491553895911-0055eca6402d"),
    u("photo-1549298916-b41d501d3772"),
];
export const IMG = {
  bagA,
  bagB,
  shoeA,
  shoeB,
  about: new URL("../assets/heroImg5.jpg", import.meta.url).href,
  statement: u("photo-1445205170230-053b83016050"),
  catBags: bagA[0],
  catShoes: shoeA[0],
  catNew: bagB[0],
};
