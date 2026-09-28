import { experience } from "@/content/profile";
import { Chip, SectionHeading, delay } from "@/components/ui/primitives";
import TimelineProgress from "./TimelineProgress";

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-line py-24 sm:py-32">
      <div className="page-x">
        <SectionHeading
          id="experience-title"
          index="04"
          eyebrow="Experience"
          title={
            <>
              Four years, three teams, <span className="font-serif italic text-muted">one direction</span>: deeper into the stack.
            </>
          }
        />

        <div className="relative mt-16 md:ml-[25%] md:pl-2.5">
          <TimelineProgress />
          <ol className="space-y-14 sm:space-y-16">
            {experience.map((job) => (
              <li key={job.company} className="relative pl-8 sm:pl-12">
                <span
                  aria-hidden
                  className="absolute left-0 top-2 h-[9px] w-[9px] -translate-x-1/2 rounded-full border border-signal bg-ink"
                />
                <div data-reveal className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h3 className="text-2xl font-medium tracking-tight text-fg">
                    {job.role} <span className="text-muted">· {job.company}</span>
                  </h3>
                  <p className="shrink-0 font-mono text-xs text-faint">
                    {job.start} — {job.end}
                  </p>
                </div>
                <p data-reveal style={delay(1)} className="mt-1 text-sm text-faint">
                  {job.location}
                </p>
                <p data-reveal style={delay(1)} className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
                  {job.summary}
                </p>

                <details className="group mt-5 max-w-3xl">
                  <summary className="inline-flex min-h-[40px] cursor-pointer list-none items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-fg [&::-webkit-details-marker]:hidden">
                    <span className="inline-block transition-transform duration-300 group-open:rotate-45" aria-hidden>
                      +
                    </span>
                    <span className="group-open:hidden">Show {job.bullets.length} more</span>
                    <span className="hidden group-open:inline">Hide highlights</span>
                  </summary>
                  <ul className="mt-4 space-y-3">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[0.95rem] leading-relaxed text-fg/85">
                        <span className="mt-[0.7em] h-px w-3 shrink-0 bg-fg/30" aria-hidden />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </details>

                <div data-reveal className="mt-6 flex flex-wrap gap-1.5">
                  {job.stack.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
