import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const INTRO_SEEN_KEY = "korae-home-intro-seen";
const CIRCLE_LENGTH = 2 * Math.PI * 38;

export default function HomeIntro() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(
    () => pathname === "/" && sessionStorage.getItem(INTRO_SEEN_KEY) !== "true",
  );
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (!visible) return;
    if (pathname !== "/") {
      setVisible(false);
      return;
    }

    if (!started.current) {
      sessionStorage.setItem(INTRO_SEEN_KEY, "true");
      started.current = true;
    }

    setExiting(false);
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 150
      : 1800;
    const startTime = performance.now();
    let exitTimer = 0;
    let hideTimer = 0;
    const interval = window.setInterval(() => {
      const nextProgress = Math.min(
        100,
        Math.floor(((performance.now() - startTime) / duration) * 100),
      );
      setProgress(nextProgress);

      if (nextProgress === 100) {
        window.clearInterval(interval);
        exitTimer = window.setTimeout(() => setExiting(true), 180);
        hideTimer = window.setTimeout(() => setVisible(false), 550);
      }
    }, 25);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, [pathname, visible]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading KORAE, ${progress}%`}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ivory transition-transform duration-700 ease-in-out ${
        exiting ? "pointer-events-none -translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        <span className="font-serif text-4xl tracking-[0.2em]">KORAE</span>
        <div className="relative flex h-24 w-24 items-center justify-center">
          <svg
            aria-hidden="true"
            viewBox="0 0 88 88"
            className="absolute inset-0 h-full w-full -rotate-90"
          >
            <circle
              cx="44"
              cy="44"
              r="38"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-line"
            />
            <circle
              cx="44"
              cy="44"
              r="38"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray={CIRCLE_LENGTH}
              strokeDashoffset={CIRCLE_LENGTH * (1 - progress / 100)}
              strokeLinecap="round"
              className="text-ink transition-[stroke-dashoffset] duration-100"
            />
          </svg>
          <span className="text-xs tracking-[0.12em]">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
