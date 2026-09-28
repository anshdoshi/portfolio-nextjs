/** Monogram: the open-crossbar "A" from the original logo, redrawn as a crisp SVG. */
export default function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden fill="none">
      <rect x="0.5" y="0.5" width="31" height="31" rx="9" className="fill-fg/[0.04] stroke-fg/15" />
      <path
        d="M9.2 23 15.1 9.6a1 1 0 0 1 1.8 0L22.8 23"
        className="stroke-fg"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 18.4h5.6" className="stroke-signal" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
