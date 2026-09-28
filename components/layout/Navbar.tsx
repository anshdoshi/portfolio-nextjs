"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import { navItems, person, site } from "@/content/profile";
import Logo from "@/components/ui/Logo";
import { cn } from "@/components/ui/primitives";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null);

  const progressRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const pendingTarget = useRef<string | null>(null);

  // Scroll state + reading-progress bar (transform only; no re-render per frame)
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Scroll-spy: the section crossing the upper third of the viewport is active
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Sliding indicator under the active desktop link
  const measure = useCallback(() => {
    const link = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    setIndicator(link ? { x: link.offsetLeft, w: link.offsetWidth } : null);
  }, [active]);
  useIsoLayoutEffect(measure, [measure]);
  useEffect(() => {
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Mobile sheet: scroll lock, Escape, focus trap, focus restore
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const sheet = sheetRef.current;
    sheet?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !sheet) return;
      const focusables = Array.from(sheet.querySelectorAll<HTMLElement>("a, button"));
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    const button = menuButtonRef.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      button?.focus({ preventScroll: true });
      // Scroll only after the scroll lock is released, so the smooth scroll isn't cut short.
      const id = pendingTarget.current;
      pendingTarget.current = null;
      if (id) {
        requestAnimationFrame(() => {
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
          history.pushState(null, "", `#${id}`);
        });
      }
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[var(--nav-h)] transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open ? "border-b border-line bg-ink/75 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <nav aria-label="Primary" className="page-x flex h-full items-center justify-between gap-6">
          <a href="#about-me" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <Logo className="h-8 w-8 transition-transform duration-500 ease-out-expo group-hover:rotate-[-8deg]" />
            <span className="font-mono text-[0.78rem] uppercase tracking-[0.2em] text-fg">
              {person.name}
            </span>
          </a>

          <ul ref={listRef} className="relative hidden items-center lg:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  data-id={item.id}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "relative block px-3.5 py-2 text-sm transition-colors duration-300",
                    active === item.id ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-0.5 left-0 h-px bg-signal transition-[transform,width,opacity] duration-500 ease-out-expo"
              style={{
                width: indicator?.w ?? 0,
                transform: `translateX(${indicator?.x ?? 0}px)`,
                opacity: indicator ? 1 : 0,
              }}
            />
          </ul>

          <div className="hidden items-center gap-4 lg:flex">
            <span className="hidden items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted xl:flex">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-signal" aria-hidden />
              Open to work
            </span>
            <a
              href={site.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-line-strong px-4 text-sm text-fg transition-colors duration-300 hover:border-fg/40 hover:bg-fg/[0.04]"
            >
              Resume
              <FiArrowUpRight
                aria-hidden
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="relative -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-5" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-5 bg-fg transition-transform duration-500 ease-out-expo",
                  open && "translate-y-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-px w-5 bg-fg transition-transform duration-500 ease-out-expo",
                  open && "-translate-y-1.5 -rotate-45",
                )}
              />
            </span>
          </button>
        </nav>

        <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden" aria-hidden>
          <div ref={progressRef} className="h-full origin-left bg-signal/70" style={{ transform: "scaleX(0)" }} />
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="fixed inset-0 top-[var(--nav-h)] z-40 bg-ink/95 backdrop-blur-xl lg:hidden"
      >
        <div className="page-x flex h-full flex-col justify-between pb-10 pt-6">
          <ul className="flex flex-col">
            {navItems.map((item, i) => (
              <li
                key={item.id}
                className="fade-in border-b border-line"
                style={{ ["--d" as string]: `${i * 50}ms` }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    pendingTarget.current = item.id;
                    setOpen(false);
                  }}
                  className="flex items-baseline justify-between py-5"
                >
                  <span className="text-3xl font-medium tracking-tight text-fg">{item.label}</span>
                  <span className="font-mono text-xs text-faint">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="fade-in flex flex-col gap-4" style={{ ["--d" as string]: "280ms" }}>
            <a
              href={site.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-fg text-sm font-medium text-ink"
            >
              Download resume <FiArrowUpRight aria-hidden />
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-line-strong text-sm text-muted"
            >
              <FiX aria-hidden /> Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
