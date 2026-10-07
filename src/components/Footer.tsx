import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
const cols: [string, [string, string][]][] = [
  [
    "Shop",
    [
      ["New Arrivals", "/shop?c=new"],
      ["Bags", "/shop?c=Bags"],
      ["Shoes", "/shop?c=Shoes"],
      ["Bestsellers", "/shop?c=best"],
    ],
  ],
  [
    "Company",
    [
      ["About", "/#about"],
      ["Our Story", "/#about"],
      ["Journal", "/"],
      ["Contact", "/"],
    ],
  ],
  [
    "Support",
    [
      ["Shipping", "/"],
      ["Returns", "/"],
      ["Size Guide", "/"],
      ["FAQ", "/"],
    ],
  ],
];
const social = [
  ["Instagram", "https://instagram.com/koraeofficial"],
  ["TikTok", "https://tiktok.com/@koraeofficial"],
  ["Pinterest", "https://pinterest.com/koraeofficial"],
];
const h = "mb-4 text-xs tracking-[0.18em] text-ivory/50";
export default function Footer() {
  return (
    <ScrollReveal>
      <footer className="bg-[#171717] px-5 pb-8 pt-16 text-ivory">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <p className="font-serif text-3xl tracking-[0.2em]">KORAE</p>
            <p className="mt-3 text-ivory/60">Made for the way you move.</p>
          </div>
          {cols.map(([t, ls]) => (
            <div key={t}>
              <h4 className={h}>{t.toUpperCase()}</h4>
              <ul className="space-y-2 text-sm">
                {ls.map(([l, to]) => (
                  <li key={l}>
                    <Link to={to} className="text-ivory/80 hover:text-ivory">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className={h}>SOCIAL</h4>
            <ul className="space-y-2 text-sm">
              {social.map(([l, u]) => (
                <li key={l}>
                  <a
                    href={u}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ivory/80 hover:text-ivory"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-14 flex max-w-7xl flex-col justify-between gap-3 border-t border-ivory/15 pt-6 text-xs text-ivory/50 sm:flex-row">
          <p>© 2026 KORAE. All rights reserved.</p>
          <p className="space-x-5">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </p>
        </div>
        <p className="mx-auto mt-5 max-w-7xl text-center text-xs text-ivory/65 sm:text-right">
          Designed &amp; built by{" "}
          <a
            href="https://samueloluwafemi.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="text-ivory/90 underline decoration-ivory/35 underline-offset-4 transition hover:text-ivory hover:decoration-ivory"
          >
            Samuel Oluwafemi
          </a>
        </p>
      </footer>
    </ScrollReveal>
  );
}
