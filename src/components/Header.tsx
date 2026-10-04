import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import SearchOverlay from "./SearchOverlay";
const links = [
  ["Shop", "/shop"],
  ["Collections", "/shop?c=new"],
  ["About", "/#about"],
];
export default function Header() {
  const { count, setDrawer, notify } = useCart();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const ib = "p-2 hover:text-olive";
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:grid md:grid-cols-3">
        <Link
          to="/"
          className="font-serif text-2xl font-semibold tracking-[0.2em]"
        >
          KORAE
        </Link>
        <nav
          aria-label="Main"
          className="hidden justify-center gap-10 text-xs tracking-[0.18em] md:flex"
        >
          {links.map(([l, to]) => (
            <NavLink key={l} to={to} className="uppercase hover:text-olive">
              {l}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-1">
          <button
            aria-label="Search"
            className={ib}
            onClick={() => setSearch(true)}
          >
            <Search size={20} />
          </button>
          <button
            aria-label="Account"
            className={`${ib} hidden md:block`}
            onClick={() => notify("Accounts are coming soon.")}
          >
            <User size={20} />
          </button>
          <button
            aria-label={`Open bag, ${count} items`}
            className={`${ib} relative`}
            onClick={() => setDrawer(true)}
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span
                className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center 
              bg-clay px-1 text-[10px] text-ivory"
              >
                {count}
              </span>
            )}
          </button>
          <button
            aria-label="Menu"
            aria-expanded={menu}
            className={`${ib} md:hidden`}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <nav
        aria-label="Mobile"
        className={`overflow-hidden border-t border-line transition-all duration-300 md:hidden 
            ${menu ? "max-h-72" : "max-h-0 border-transparent"}`}
      >
        {links.map(([l, to]) => (
          <Link
            key={l}
            to={to}
            onClick={() => setMenu(false)}
            className="block px-5 py-4 font-serif text-3xl"
          >
            {l}
          </Link>
        ))}
      </nav>
      {search && <SearchOverlay onClose={() => setSearch(false)} />}
    </header>
  );
}
