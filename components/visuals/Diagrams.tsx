import type { ReactNode } from "react";
import type { DiagramKind } from "@/content/profile";

/*
 * Architecture sketches for the case studies. These are deliberately diagrams, not screenshots:
 * the products are proprietary, so the visuals show the shape of what was built, labelled with
 * facts from the resume and repositories — nothing more.
 */

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h?: number;
  title: string;
  sub?: string;
  tone?: "default" | "accent" | "muted";
  titleTop?: boolean;
};

function Box({ x, y, w, h = 52, title, sub, tone = "default", titleTop }: BoxProps) {
  const rect =
    tone === "accent"
      ? "fill-signal/[0.08] stroke-signal/70"
      : tone === "muted"
        ? "fill-transparent stroke-fg/20"
        : "fill-raised stroke-fg/[0.14]";
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="10"
        className={rect}
        strokeDasharray={tone === "muted" ? "3 4" : undefined}
      />
      <text
        x={x + 14}
        y={titleTop ? y + 26 : sub ? y + h / 2 - 3 : y + h / 2 + 5}
        className={
          tone === "muted" ? "fill-muted font-sans text-[13px] line-through decoration-fg/30" : "fill-fg font-sans text-[13.5px] font-medium"
        }
      >
        {title}
      </text>
      {sub ? (
        <text x={x + 14} y={y + h / 2 + 14} className="fill-muted font-mono text-[10.5px]">
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function Flow({ d, dim }: { d: string; dim?: boolean }) {
  return (
    <g>
      <path d={d} className="stroke-fg/10" strokeWidth="1.25" fill="none" />
      <path d={d} className={dim ? "flow-path stroke-fg/30" : "flow-path stroke-signal/70"} strokeWidth="1.25" fill="none" />
    </g>
  );
}

function Label({ x, y, children, anchor = "start" }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className="fill-faint font-mono text-[10px] uppercase tracking-[0.14em]">
      {children}
    </text>
  );
}

function Frame({ id, label, desc, children }: { id: string; label: string; desc: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 520 320" className="block h-auto w-full min-w-[520px] sm:min-w-0" role="img" aria-label={label}>
      <desc>{desc}</desc>
      <defs>
        <pattern id={`${id}-dots`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" className="fill-fg/[0.06]" />
        </pattern>
      </defs>
      <rect width="520" height="320" fill={`url(#${id}-dots)`} />
      {children}
    </svg>
  );
}

function IdentityDiagram() {
  return (
    <Frame
      id="dg-identity"
      label="Three login systems consolidated into one mobile-OTP identity layer with SSO and fail-closed RBAC"
      desc="Passwords, Keycloak and per-product OTP are replaced by a single mobile-OTP identity. Single-use SSO handoff codes carry the session into four products, each guarded by a seven-role RBAC check that intersects dealer and user grants and fails closed."
    >
      <Label x={20} y={34}>Before</Label>
      <Box x={20} y={48} w={150} h={44} title="Passwords" tone="muted" />
      <Box x={20} y={104} w={150} h={44} title="Keycloak" tone="muted" />
      <Box x={20} y={160} w={150} h={44} title="Per-product OTP" tone="muted" />

      <Flow d="M170 70 C200 70, 200 128, 226 128" dim />
      <Flow d="M170 126 L226 128" dim />
      <Flow d="M170 182 C200 182, 200 128, 226 128" dim />

      <Label x={226} y={34}>After</Label>
      <Box x={226} y={100} w={146} h={56} title="Mobile OTP" sub="limits · lockout" tone="accent" />
      <Flow d="M372 128 L386 128" />
      <Box x={386} y={100} w={122} h={56} title="SSO" sub="single-use code" />

      <Flow d="M447 156 C447 200, 300 196, 300 232" />
      <Box x={146} y={232} w={308} h={56} title="RBAC · 7 roles · fails closed" sub="server check = UI guard" />

      <Label x={20} y={262}>4 products</Label>
      <g aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={20 + i * 26} y={272} width="20" height="20" rx="5" className="fill-raised stroke-fg/20" />
        ))}
      </g>
      <Flow d="M146 260 L126 282" dim />
    </Frame>
  );
}

function SearchDiagram() {
  return (
    <Frame
      id="dg-search"
      label="Change-data-capture pipeline keeping Typesense search within 60 seconds of PostgreSQL"
      desc="Row-level triggers in PostgreSQL enqueue reindex jobs into separate candidate and job queues. Per-minute cron workers drain them into Typesense, which serves seniority-aware search over 300K+ profiles. LLM features sit beside search and require human approval."
    >
      <Box x={20} y={40} w={150} h={56} title="PostgreSQL" sub="row-level triggers" />
      <Flow d="M170 68 L200 68" />
      <Box x={200} y={24} w={140} h={40} title="candidate queue" />
      <Box x={200} y={72} w={140} h={40} title="job queue" />
      <Flow d="M340 68 L370 68" />
      <Box x={370} y={40} w={130} h={56} title="Cron workers" sub="every minute" />

      <Flow d="M435 96 C435 130, 260 124, 260 150" />
      <Box x={120} y={150} w={280} h={60} title="Typesense · 300K+ profiles" sub="role hierarchy · synonyms · typo" tone="accent" />

      <path d="M20 112 L20 120 L500 120 L500 112" className="stroke-fg/25" fill="none" />
      <Label x={20} y={140}>≤ 60 s behind postgres</Label>

      <Flow d="M200 210 C200 240, 110 236, 110 256" dim />
      <Flow d="M320 210 C320 240, 410 236, 410 256" dim />
      <Box x={20} y={256} w={180} h={48} title="Human-approved LLM" sub="6-stage pipeline" />
      <Box x={320} y={256} w={180} h={48} title="Gemini matching" sub="20 req/min · role-gated" />
    </Frame>
  );
}

function DashboardDiagram() {
  return (
    <Frame
      id="dg-dashboard"
      label="Excel upload becomes a live dashboard of stored queries with server-side tenant filters"
      desc="A dealer uploads an Excel export. AI infers its structure and writes stored queries. Each dashboard tile executes its query against live data, with the tenant filter injected on the server. The next month's upload updates every tile."
    >
      <Box x={20} y={40} w={140} h={56} title="Excel upload" sub="any report shape" />
      <Flow d="M160 68 L190 68" />
      <Box x={190} y={40} w={140} h={56} title="AI infers" sub="what the data means" tone="accent" />
      <Flow d="M330 68 L360 68" />
      <Box x={360} y={40} w={140} h={56} title="Stored queries" sub="no baked values" />

      <Box x={280} y={140} w={226} h={44} title="Tenant filter" sub="server-side, never from AI SQL" />
      <Flow d="M430 96 L430 140" />

      <Flow d="M400 184 C400 214, 260 206, 260 226" />
      <g>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={140 + i * 84} y={226} width="74" height="64" rx="9" className="fill-raised stroke-fg/[0.14]" />
            <rect x={150 + i * 84} y={238} width={24 + i * 8} height="6" rx="3" className="fill-fg/20" />
            <rect x={150 + i * 84} y={254} width="44" height="14" rx="3" className="fill-signal/60" />
            <rect x={150 + i * 84} y={274} width="54" height="4" rx="2" className="fill-fg/10" />
          </g>
        ))}
      </g>
      <Label x={20} y={250}>Live tiles</Label>
      <Label x={20} y={266}>+ grounded “Ask”</Label>

      <Label x={20} y={150}>↻ next month’s file</Label>
      <Label x={20} y={166}>re-runs every query</Label>
    </Frame>
  );
}

function AnalyticsDiagram() {
  return (
    <Frame
      id="dg-analytics"
      label="First-party analytics: a 4 KB tracker, a bot-screening collector and a partitioned warehouse"
      desc="Each product surface loads a pinned version of a dependency-free tracker of about 4 KB. Events go to a collector that validates, screens bots, resolves geography and verifies identity, then writes to a partitioned warehouse."
    >
      <Label x={20} y={34}>Surfaces · pinned tracker</Label>
      {["v1", "v2", "v3"].map((v, i) => (
        <Box key={v} x={20} y={46 + i * 56} w={140} h={44} title={`t.${v}.js`} sub="~4 KB · no deps" tone={i === 2 ? "accent" : "default"} />
      ))}
      <Flow d="M160 68 C190 68, 190 124, 216 124" />
      <Flow d="M160 124 L216 124" />
      <Flow d="M160 180 C190 180, 190 124, 216 124" />

      <Box x={216} y={70} w={140} h={108} title="Collector" titleTop />
      {["validate", "screen bots", "resolve geo", "verify identity"].map((s, i) => (
        <text key={s} x={230} y={116 + i * 16} className="fill-muted font-mono text-[10.5px]">
          · {s}
        </text>
      ))}
      <Flow d="M356 124 L384 124" />

      <Label x={384} y={34}>Warehouse</Label>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={384 + i * 6} y={60 + i * 12} width="104" height="90" rx="9" className="fill-raised stroke-fg/[0.14]" />
      ))}
      <text x={414} y={140} className="fill-fg font-sans text-[13px] font-medium">
        partitioned
      </text>
      <text x={414} y={156} className="fill-muted font-mono text-[10.5px]">
        facts
      </text>

      <path d="M20 240 L500 240" className="stroke-fg/10" />
      <Label x={20} y={268}>pageviews · engaged time · scroll depth · business events</Label>
      <Label x={20} y={290}>visitors · devices · time on page · conversion · drop-off</Label>
    </Frame>
  );
}

export default function Diagram({ kind }: { kind: DiagramKind }) {
  switch (kind) {
    case "identity":
      return <IdentityDiagram />;
    case "search":
      return <SearchDiagram />;
    case "dashboard":
      return <DashboardDiagram />;
    case "analytics":
      return <AnalyticsDiagram />;
  }
}
