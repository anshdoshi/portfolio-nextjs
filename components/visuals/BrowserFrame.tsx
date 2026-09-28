import Image from "next/image";
import { cn } from "@/components/ui/primitives";

/**
 * Wraps an existing full-browser screenshot in a clean, consistent frame.
 * The source screenshots include the capturing browser's own toolbar; a bottom-anchored
 * 16:9 crop removes it (it is the top ~6–10% of every image).
 */
export default function BrowserFrame({
  src,
  alt,
  url,
  sizes,
  priority,
  aspect = "aspect-video",
  position = "object-bottom",
  className,
}: {
  src: string;
  alt: string;
  url: string;
  sizes: string;
  priority?: boolean;
  /** Tailwind aspect class for the image area */
  aspect?: string;
  /** Tailwind object-position class; bottom trims the capturing browser's toolbar */
  position?: string;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-line bg-surface", className)}>
      <div className="flex items-center gap-3 border-b border-line px-3.5 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-fg/15" />
          <span className="h-2 w-2 rounded-full bg-fg/15" />
          <span className="h-2 w-2 rounded-full bg-fg/15" />
        </div>
        <div className="flex min-w-0 flex-1 justify-center">
          <span className="truncate rounded-md bg-fg/[0.05] px-3 py-0.5 font-mono text-[0.68rem] text-muted">{url}</span>
        </div>
        <span className="w-[34px]" aria-hidden />
      </div>
      <div className={cn("relative overflow-hidden bg-raised", aspect)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.035]", position)}
        />
      </div>
    </div>
  );
}
