"use client";

import { useEffect, useRef } from "react";

/** Vertical rail that fills as the timeline scrolls through the viewport. */
export default function TimelineProgress() {
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    const fill = fillRef.current;
    if (!rail || !fill) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fill.style.transform = "scaleY(1)";
      return;
    }
    let frame = 0;
    let visible = false;
    const update = () => {
      const r = rail.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      const p = Math.min(Math.max((anchor - r.top) / r.height, 0), 1);
      fill.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => {
      if (!visible) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) update();
    });
    io.observe(rail);
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={railRef} aria-hidden className="absolute bottom-0 left-0 top-2 w-px bg-line md:left-2.5">
      <div ref={fillRef} className="h-full w-full origin-top bg-signal/80" style={{ transform: "scaleY(0)" }} />
    </div>
  );
}
