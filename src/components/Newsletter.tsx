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
              <h2 className="font-serif text-5xl">You're on the list.</h2>
              <p className="mt-4 text-muted">
                We'll be in touch when something new arrives.
              </p>
            </>
          ) : (
            <>
              <h2 className="font-serif text-5xl">Stay in the know.</h2>
              <p className="mt-4 text-muted">
                New collections, limited releases and stories from KORAE —
                delivered occasionally.
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
                <button className="btn">Subscribe</button>
              </form>
            </>
          )}
        </div>
      </section>
    </ScrollReveal>
  );
}
