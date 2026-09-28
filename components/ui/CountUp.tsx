"use client";

import { useEffect, useRef } from "react";

/**
 * Counts a stat like "1,000+", "300K+" or "≤ 60s" up from zero the first time it scrolls into view.
 * The server renders the final value (no-JS and SEO see the real number); a screen-reader copy
 * always holds the final value while the visible copy animates.
 */
export default function CountUp({ value, duration = 1800 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const match = value.match(/^(\D*?)(\d[\d,]*)(\D*)$/);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!match || reduce) {
      el.dataset.ready = "";
      return;
    }
    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replace(/,/g, ""));
    const grouped = digits.includes(",");
    const format = (n: number) => prefix + (grouped ? n.toLocaleString("en-US") : String(n)) + suffix;

    el.textContent = format(0);
    el.dataset.ready = "";

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p); // easeOutExpo
          el.textContent = format(Math.round(target * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <>
      <span ref={ref} data-count aria-hidden className="tabular-nums">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
