import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Collections from "./pages/Collections";
function ScrollTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash)
      setTimeout(
        () =>
          document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }),
        50,
      );
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
export default function App() {
  const { pathname } = useLocation();
  return (
    <>
      <ScrollTop />
      <Header />
      <main key={pathname} className="min-h-[70vh] animate-[fade_.4s_ease]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="*"
            element={
              <p className="py-32 text-center font-serif text-4xl">
                Page not found.
              </p>
            }
          />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
