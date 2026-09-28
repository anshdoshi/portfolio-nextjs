import { skills } from "@/content/profile";
import { SectionHeading, delay } from "@/components/ui/primitives";

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t border-line py-24 sm:py-32">
      <div className="page-x">
        <SectionHeading
          id="skills-title"
          index="05"
          eyebrow="Skills"
          title={
            <>
              The toolkit, <span className="font-serif italic text-muted">grouped by the job it does</span>.
            </>
          }
        />

        <dl className="mt-14 md:ml-[25%] md:pl-2.5">
          {skills.map((g, i) => (
            <div
              key={g.group}
              data-reveal
              style={delay(i, 50)}
              className="group relative grid gap-3 border-t border-line py-6 last:border-b sm:grid-cols-[11rem_1fr] sm:gap-8"
            >
              {/* Animated left accent bar */}
              <span
                aria-hidden
                className="absolute -left-2.5 top-0 w-px origin-top scale-y-0 bg-signal/60 transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
                style={{ height: "100%" }}
              />
              <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors duration-300 group-hover:text-signal">
                <span className="text-faint transition-colors duration-300 group-hover:text-signal/60">{String(i + 1).padStart(2, "0")}</span>
                {g.group}
              </dt>
              <dd className="flex flex-wrap gap-x-1 gap-y-2">
                {g.items.map((item, j) => (
                  <span key={item} className="text-[0.98rem] text-fg/90">
                    {item}
                    {j < g.items.length - 1 ? <span className="mx-2 text-faint" aria-hidden>/</span> : null}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
