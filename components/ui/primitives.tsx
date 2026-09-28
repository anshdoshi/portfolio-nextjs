import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { FiArrowUpRight } from "react-icons/fi";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Stagger helper for [data-reveal] children: style={delay(2)} */
export function delay(step: number, base = 70): CSSProperties {
  return { ["--d" as string]: `${step * base}ms` };
}

export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  lede,
  className,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("grid gap-6 md:grid-cols-12 md:gap-10", className)}>
      <div className="md:col-span-3" data-reveal>
        <p className="eyebrow flex items-center gap-3">
          <span className="text-signal text-signal-glow">{index}</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden />
          {eyebrow}
        </p>
      </div>
      <div className="md:col-span-9">
        <h2 id={id} className="text-display-md font-medium text-fg" data-reveal style={delay(1)}>
          {title}
        </h2>
        {lede ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg" data-reveal style={delay(2)}>
            {lede}
          </p>
        ) : null}
      </div>
    </header>
  );
}

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line px-2.5 py-1 font-mono text-[0.7rem] leading-none tracking-wide text-muted transition-[border-color,color,box-shadow] duration-300 hover:border-signal/40 hover:text-fg hover:shadow-[0_0_10px_-2px_rgb(var(--signal)/0.25)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

type ButtonProps = ComponentProps<"a"> & {
  variant?: "primary" | "ghost";
  icon?: ReactNode;
  external?: boolean;
};

export function ButtonLink({ variant = "primary", icon, external, className, children, ...rest }: ButtonProps) {
  return (
    <a
      {...rest}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
      className={cn(
        "group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-300 ease-out-expo active:scale-[0.97]",
        variant === "primary"
          ? "bg-fg text-ink hover:bg-signal"
          : "border border-line-strong text-fg hover:border-fg/40 hover:bg-fg/[0.04]",
        className,
      )}
    >
      {children}
      {icon ? (
        <span className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          {icon}
        </span>
      ) : null}
    </a>
  );
}

/** Inline external link with an arrow that nudges on hover. */
export function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-signal",
        className,
      )}
    >
      {children}
      <FiArrowUpRight
        aria-hidden
        className="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
