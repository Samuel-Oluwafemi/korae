import { FormEvent, useState } from "react";
import ScrollReveal from "./ScrollReveal";
export default function Newsletter() {
  const [done, setDone] = useState(() => !!localStorage.getItem("korae-news"));
  const [email, setEmail] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem("korae-news", email);
    setDone(true);
  };
  return (
    <ScrollReveal>
      <section className="border-t border-line px-5 py-24 text-center">
        <div className="mx-auto max-w-xl">
          {done ? (
            <>
              <h2 className="font-serif text-5xl">A note from KORAE.</h2>
              <p className="mt-4 text-muted">
                Thank you. We’ll be in touch when something worth sharing arrives.
              </p>
            </>
          ) : (
            <>
              <h2 className="font-serif text-5xl">A little more KORAE.</h2>
              <p className="mt-4 text-muted">
                Notes on new collections, considered pieces, and the inspiration
                behind them—delivered occasionally.
              </p>
              <form
                onSubmit={submit}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <label htmlFor="nl" className="sr-only">
                  Email address
                </label>
                <input
                  id="nl"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="input"
                />
                <button className="btn">Join the list</button>
              </form>
            </>
          )}
        </div>
      </section>
    </ScrollReveal>
  );
}
