"use client";

import { useEffect, useRef, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import { cn } from "./primitives";

export default function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard can be blocked (insecure context, permissions); fall back to the mail client.
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2200);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-fg transition-colors duration-300 hover:border-fg/40 hover:bg-fg/[0.04]",
        className,
      )}
    >
      <span className="relative inline-flex h-4 w-4 items-center justify-center" aria-hidden>
        <FiCopy
          className={cn("absolute h-4 w-4 transition-all duration-300", copied ? "scale-50 opacity-0" : "opacity-100")}
        />
        <FiCheck
          className={cn(
            "absolute h-4 w-4 text-signal transition-all duration-300",
            copied ? "scale-100 opacity-100" : "scale-50 opacity-0",
          )}
        />
      </span>
      {copied ? "Copied" : "Copy email"}
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? `${email} copied to clipboard` : ""}
      </span>
    </button>
  );
}
