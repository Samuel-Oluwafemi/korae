import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const images = [
  new URL("../assets/heroImg1.jpg", import.meta.url).href,
  new URL("../assets/heroImg6.jpg", import.meta.url).href,
  new URL("../assets/heroImg3.jpg", import.meta.url).href,
  new URL("../assets/heroImg7.jpg", import.meta.url).href,
  new URL("../assets/heroImg4.jpg", import.meta.url).href,
];

export default function HeroSlideshow() {
  const [activeImage, setActiveImage] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    },3500);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-ink">
      {images.map((image, index) => (
        <motion.img
          key={image}
          src={image}
          alt=""
          draggable={false}
          initial={false}
          animate={{
            opacity: index === activeImage ? 1 : 0,
            scale: index === activeImage ? 1.045 : 1,
          }}
          transition={{
            opacity: { duration: reduceMotion ? 0 : 1.8, ease: "easeInOut" },
            scale: { duration: reduceMotion ? 0 : 7, ease: "linear" },
          }}
          className="absolute inset-0 h-full w-full object-cover object-[center_35%] md:left-[38%] md:w-[62%] md:object-top lg:object-[center_20%]"
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/20 md:hidden" />
      <div className="absolute inset-y-0 left-0 hidden w-[72%] bg-gradient-to-r from-ink via-ink/95 to-ink/0 md:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-black/25 via-transparent to-black/10 md:block" />
    </div>
  );
}
