import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <div className="grid-backdrop pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <Logo className="h-10 w-10" />
      <p className="eyebrow mt-8">404 · not found</p>
      <h1 className="mt-4 text-display-md font-medium text-fg">
        This route <span className="font-serif italic text-muted">fails closed</span>.
      </h1>
      <p className="mt-4 max-w-md text-muted">The page you’re looking for doesn’t exist or has moved.</p>
      <Link
        href="/"
        className="mt-10 inline-flex min-h-[44px] items-center rounded-full bg-fg px-5 text-sm font-medium text-ink transition-colors hover:bg-signal"
      >
        Back to the portfolio
      </Link>
    </main>
  );
}
