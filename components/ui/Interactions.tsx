"use client";

import { useEffect } from "react";

/**
 * One client island for page-wide micro-interactions, so sections can stay Server Components:
 *  - reveals every [data-reveal] element as it enters the viewport
 *  - feeds the pointer position to .spotlight cards (CSS vars --mx / --my)
 *  - smooth-scrolls in-page #links and moves focus to the target (initial #anchor loads jump instantly)
 */
export default function Interactions() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    targets.forEach((el) => io.observe(el));

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".spotlight");
      if (!card) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    if (finePointer) document.addEventListener("pointermove", onMove, { passive: true });

    // Subtle 3D tilt for [data-tilt] cards (desktop pointers only)
    const tilts = finePointer ? Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]")) : [];
    const tiltMove = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--ry", `${(x * 7).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
    };
    const tiltLeave = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    tilts.forEach((el) => {
      el.addEventListener("pointermove", tiltMove);
      el.addEventListener("pointerleave", tiltLeave);
    });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="#"]');
      const id = link?.getAttribute("href")?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
      if (location.hash !== `#${id}`) history.pushState(null, "", `#${id}`);
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    // Deep links (/#skills): re-align once fonts and images have settled.
    const realign = () => {
      const el = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
      el?.scrollIntoView({ block: "start" });
    };
    if (location.hash) {
      if (document.readyState === "complete") realign();
      else window.addEventListener("load", realign, { once: true });
      document.fonts?.ready.then(realign).catch(() => {});
    }

    return () => {
      io.disconnect();
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", realign);
      document.removeEventListener("pointermove", onMove);
      tilts.forEach((el) => {
        el.removeEventListener("pointermove", tiltMove);
        el.removeEventListener("pointerleave", tiltLeave);
      });
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
