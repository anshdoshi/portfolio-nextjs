import type { CSSProperties, ReactNode } from "react";
import { person, site } from "@/content/profile";

/**
 * Hero "whoami" card. The typing sequence is pure CSS (each command's width grows one
 * monospace character at a time), so there is no hydration flash, it works without JS,
 * and reduced-motion users see the finished card immediately.
 */

type Step = { cmd: string; out: ReactNode };

const core = ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Typesense"];

const steps: Step[] = [
  {
    cmd: "whoami",
    out: (
      <>
        <span className="text-fg">{person.name}</span>
        <span className="text-muted"> — {person.subtitle}</span>
      </>
    ),
  },
  {
    cmd: "cat focus.txt",
    out: (
      <span className="text-fg/90">
        identity &amp; access <span className="text-faint">·</span> search <span className="text-faint">·</span> applied LLMs
      </span>
    ),
  },
  {
    cmd: "experience --summary",
    out: (
      <span className="text-fg/90">
        <span className="text-signal">4+</span> years <span className="text-faint">·</span> 3 teams{" "}
        <span className="text-faint">·</span> React → full stack
      </span>
    ),
  },
  {
    cmd: "stack --core",
    out: (
      <span className="flex flex-wrap gap-1.5 pt-0.5">
        {core.map((t) => (
          <span key={t} className="rounded-md border border-line bg-fg/[0.04] px-1.5 py-0.5 text-[0.72rem] text-fg/90">
            {t}
          </span>
        ))}
      </span>
    ),
  },
  {
    cmd: "status",
    out: (
      <span className="text-fg/90">
        <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse-dot rounded-full bg-signal align-middle" aria-hidden />
        open to work <span className="text-faint">·</span> {person.location}, {person.relocation.toLowerCase()}
      </span>
    ),
  },
];

const CHAR_MS = 55;
const START_MS = 700;
const OUT_GAP_MS = 220;
const STEP_GAP_MS = 380;

function timeline() {
  let t = START_MS;
  return steps.map((s) => {
    const at = t;
    const dur = s.cmd.length * CHAR_MS;
    const outAt = at + dur + OUT_GAP_MS;
    t = outAt + STEP_GAP_MS;
    return { ...s, at, dur, outAt };
  });
}

const vars = (v: Record<string, string | number>) =>
  Object.fromEntries(Object.entries(v).map(([k, val]) => [`--${k}`, val])) as CSSProperties;

function Prompt() {
  return (
    <span className="select-none text-signal" aria-hidden>
      ❯{" "}
    </span>
  );
}

export default function TerminalCard() {
  const lines = timeline();
  const endAt = lines[lines.length - 1].outAt + 500;

  return (
    <div data-tilt className="relative">
      <div className="glow-border shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]">
        <div className="relative overflow-hidden rounded-[calc(1.25rem-1px)] bg-surface">
          {/* Title bar */}
          <div className="flex items-center gap-3 border-b border-line bg-raised/60 px-4 py-3">
            <div className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
            </div>
            <p className="flex-1 text-center font-mono text-[0.7rem] text-muted">ansh@portfolio: ~</p>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint">zsh</span>
          </div>

          {/* Body */}
          <div className="relative px-4 py-5 font-mono text-[0.8rem] leading-relaxed sm:px-6 sm:py-6 sm:text-[0.85rem]">
            <div
              className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(120%_80%_at_100%_0%,rgb(var(--signal)/0.07),transparent_60%)]"
              aria-hidden
            />
            <ol className="relative space-y-3.5" aria-label={`About ${person.name}`}>
              {lines.map((l) => (
                <li key={l.cmd}>
                  <div className="term-line text-fg" style={vars({ at: `${l.at}ms` })}>
                    <Prompt />
                    <span className="sr-only">$ </span>
                    <span className="term-typed" style={vars({ n: l.cmd.length, dur: `${l.dur}ms`, at: `${l.at}ms` })}>
                      {l.cmd}
                    </span>
                    <span className="term-caret" style={vars({ off: `${l.outAt}ms` })} aria-hidden />
                  </div>
                  <div className="term-out mt-1 pl-[2ch]" style={vars({ at: `${l.outAt}ms` })}>
                    {l.out}
                  </div>
                </li>
              ))}
            </ol>

            {/* Final prompt with quick actions */}
            <div className="term-line relative mt-5 border-t border-line pt-4" style={vars({ at: `${endAt}ms` })}>
              <div className="text-fg">
                <Prompt />
                <span className="text-muted">open</span>
                <span className="term-caret is-last ml-1.5" aria-hidden />
              </div>
              <nav aria-label="Quick links" className="mt-3 flex flex-wrap gap-2">
                {[
                  { label: "work", href: "#projects" },
                  { label: "resume.pdf", href: site.resumePdf, external: true },
                  { label: "contact", href: "#contact" },
                ].map((a) => (
                  <a
                    key={a.label}
                    href={a.href}
                    {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
                    className="group inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-line bg-fg/[0.03] px-3 text-[0.78rem] text-fg/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/60 hover:bg-signal/10 hover:text-fg"
                  >
                    <span className="text-signal transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                    {a.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
