import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { person, site, stats } from "@/content/profile";
import { ButtonLink } from "@/components/ui/primitives";
import TerminalCard from "@/components/visuals/TerminalCard";
import CountUp from "@/components/ui/CountUp";

const headline: { text: string; accent?: boolean }[][] = [
  [{ text: "I" }, { text: "build" }, { text: "the" }, { text: "systems" }],
  [{ text: "products" }, { text: "trust.", accent: true }],
];

export default function Hero() {
  let w = 0;
  return (
    <section
      id="about-me"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-20 pt-[calc(var(--nav-h)+3.5rem)] sm:pb-24 lg:pb-28 lg:pt-[calc(var(--nav-h)+5rem)]"
    >
      <div className="grid-backdrop pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[560px] w-[560px] rounded-full bg-signal/[0.10] blur-[130px]"
        aria-hidden
      />

      <div className="page-x grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="eyebrow fade-in flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-accent-gradient text-[0.82rem] font-semibold tracking-[0.22em]">{person.name}</span>
            <span className="h-px w-8 bg-signal/40" aria-hidden />
            <span className="text-fg/80 tracking-[0.18em]">{person.subtitle}</span>
          </p>

          <h1 id="hero-title" className="word-rise mt-7 text-display-xl font-medium text-fg">
            {headline.map((line, li) => (
              <span key={li} className="block">
                {line.map((word) => {
                  const d = 120 + w++ * 70;
                  return (
                    <span key={word.text} className="mr-[0.22em] last:mr-0">
                      <span
                        style={{ ["--d" as string]: `${d}ms` }}
                        className={word.accent ? "text-accent-gradient font-serif font-normal italic" : undefined}
                      >
                        {word.text}
                      </span>
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <p className="fade-in mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg" style={{ ["--d" as string]: "650ms" }}>
            {person.heroLede}
          </p>

          <div className="fade-in mt-10 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "780ms" }}>
            <ButtonLink href="#projects" icon={<FiArrowDown aria-hidden />}>
              See selected work
            </ButtonLink>
            <ButtonLink href={site.resumePdf} external variant="ghost" icon={<FiArrowUpRight aria-hidden />}>
              Resume (PDF)
            </ButtonLink>
            <a
              href={`mailto:${person.email}`}
              className="inline-flex min-h-[44px] items-center px-2 text-sm text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-signal"
            >
              {person.email}
            </a>
          </div>
        </div>

        <div className="fade-in lg:col-span-5" style={{ ["--d" as string]: "300ms" }}>
          <TerminalCard />
        </div>
      </div>

      <div className="page-x mt-20 lg:mt-24">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              style={{ ["--d" as string]: `${i * 80}ms` }}
              className="flex flex-col bg-ink p-5 sm:p-6 lg:p-8"
            >
              <dt className="order-2 mt-2 text-sm leading-snug text-muted">{s.label}</dt>
              <dd className="order-1 text-4xl font-medium tracking-tight text-fg sm:text-5xl">
                <CountUp value={s.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
