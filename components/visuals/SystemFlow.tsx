/**
 * Hero diagram: the path a dealer request takes through the systems Ansh owns.
 * Pure SVG + CSS: dashed edges flow, and each node lights up in sequence.
 * Every label corresponds to a resume bullet.
 */

type Node = { x: number; y: number; w: number; title: string; sub: string; step: number };

const H = 58;
const nodes: Node[] = [
  { x: 16, y: 44, w: 256, title: "Mobile OTP", sub: "attempt limits · lockout", step: 0 },
  { x: 208, y: 138, w: 256, title: "Cross-product SSO", sub: "single-use handoff codes", step: 1 },
  { x: 16, y: 232, w: 256, title: "RBAC · 7 roles", sub: "dealer ∩ user · fails closed", step: 2 },
  { x: 208, y: 326, w: 256, title: "Typesense search", sub: "300K+ profiles · 5 families", step: 3 },
  { x: 16, y: 420, w: 256, title: "LLM, human-approved", sub: "JDs · resumes · matching", step: 4 },
];

const pg = { x: 296, y: 452, w: 164, title: "PostgreSQL", sub: "CDC → index ≤ 60s" };

function edge(a: Node, b: Node) {
  const x1 = a.x + a.w / 2;
  const y1 = a.y + H;
  const x2 = b.x + b.w / 2;
  const y2 = b.y;
  const my = (y1 + y2) / 2;
  return `M${x1} ${y1} C${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
}

function MobileFlow() {
  return (
    <ol className="relative space-y-3 p-4 sm:hidden" aria-label="Systems I own, in request order">
      {nodes.map((n, i) => (
        <li key={n.title} className="relative">
          {i > 0 ? (
            <svg className="absolute -top-3 left-[1.35rem] h-3 w-px overflow-visible" aria-hidden>
              <line x1="0" y1="0" x2="0" y2="12" className="flow-path stroke-signal/70" strokeWidth="1.5" />
            </svg>
          ) : null}
          <div className="flex items-center gap-3 rounded-xl border border-line bg-raised px-3.5 py-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-signal/60 font-mono text-[0.65rem] text-signal">
              {n.step + 1}
            </span>
            <span className="min-w-0">
              <span className="block text-[0.95rem] font-medium text-fg">{n.title}</span>
              <span className="block font-mono text-[0.72rem] text-muted">{n.sub}</span>
            </span>
          </div>
        </li>
      ))}
      <li className="ml-9 font-mono text-[0.72rem] text-muted">
        ↳ {pg.title}: {pg.sub}
      </li>
    </ol>
  );
}

export default function SystemFlow() {
  const cycle = 10; // seconds for a full pass over all nodes
  return (
    <figure className="relative">
      <div className="overflow-hidden rounded-2xl border border-line bg-surface/70 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
          </div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">request path · dealer SaaS</p>
          <span className="flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-signal">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-signal" aria-hidden />
            live
          </span>
        </div>

        <MobileFlow />
        <svg
          viewBox="0 0 480 530"
          className="hidden h-auto w-full sm:block"
          role="img"
          aria-labelledby="sf-title sf-desc"
        >
          <title id="sf-title">Systems I own on a four-product dealer SaaS platform</title>
          <desc id="sf-desc">
            A dealer signs in with mobile OTP, moves between products through single-use SSO handoff codes, is
            authorised by a fail-closed seven-role RBAC check, searches 300K+ candidate profiles in Typesense kept
            within 60 seconds of PostgreSQL by change-data-capture, and uses LLM features that require human approval.
          </desc>

          <defs>
            <pattern id="sf-dots" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" className="fill-fg/[0.07]" />
            </pattern>
          </defs>
          <rect width="480" height="530" fill="url(#sf-dots)" />

          {/* Edges */}
          {nodes.slice(0, -1).map((n, i) => (
            <g key={`e${i}`}>
              <path d={edge(n, nodes[i + 1])} className="stroke-fg/10" strokeWidth="1.5" fill="none" />
              <path d={edge(n, nodes[i + 1])} className="flow-path stroke-signal/70" strokeWidth="1.5" fill="none" />
            </g>
          ))}
          {/* PostgreSQL → search (CDC) */}
          <path
            d={`M${pg.x + pg.w / 2} ${pg.y} C${pg.x + pg.w / 2} ${pg.y - 30}, ${430} ${pg.y - 36}, ${430} ${326 + H}`}
            className="flow-path stroke-fg/35"
            strokeWidth="1.25"
            fill="none"
            style={{ animationDirection: "reverse" }}
          />

          {/* Nodes */}
          {nodes.map((n) => (
            <g key={n.title} style={{ ["--step" as string]: `${(n.step * cycle) / 6}s`, ["--cycle" as string]: `${cycle}s` }}>
              <rect x={n.x} y={n.y} width={n.w} height={H} rx="12" className="fill-raised stroke-fg/[0.14]" strokeWidth="1" />
              <rect x={n.x} y={n.y} width={n.w} height={H} rx="12" fill="none" className="sf-glow stroke-signal" strokeWidth="1.25" />
              <circle cx={n.x + 18} cy={n.y + H / 2} r="3.5" className="sf-dot fill-fg/25" />
              <text x={n.x + 32} y={n.y + 25} className="fill-fg font-sans text-[15px] font-medium">
                {n.title}
              </text>
              <text x={n.x + 32} y={n.y + 43} className="fill-muted font-mono text-[11px]">
                {n.sub}
              </text>
            </g>
          ))}

          {/* Postgres source */}
          <g>
            <rect x={pg.x} y={pg.y} width={pg.w} height={H - 6} rx="10" className="fill-ink stroke-fg/[0.14]" strokeDasharray="3 4" />
            <text x={pg.x + 14} y={pg.y + 22} className="fill-fg font-sans text-[13.5px] font-medium">
              {pg.title}
            </text>
            <text x={pg.x + 14} y={pg.y + 39} className="fill-muted font-mono text-[11px]">
              {pg.sub}
            </text>
          </g>

          {/* Step numbers */}
          {nodes.map((n) => (
            <text key={`s${n.step}`} x={n.x + n.w - 14} y={n.y + 18} textAnchor="end" className="fill-faint font-mono text-[10px]">
              0{n.step + 1}
            </text>
          ))}
        </svg>
      </div>

      <style>{`
        .sf-glow { opacity: 0; animation: sf-glow var(--cycle) var(--step) infinite; }
        .sf-dot { animation: sf-dot var(--cycle) var(--step) infinite; }
        @keyframes sf-glow { 0%, 22% { opacity: 0 } 4%, 14% { opacity: 1 } }
        @keyframes sf-dot { 0%, 22% { fill: rgb(var(--fg) / 0.25) } 4%, 14% { fill: rgb(var(--signal)) } }
      `}</style>
    </figure>
  );
}
