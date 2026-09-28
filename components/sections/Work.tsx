import { FiArrowUpRight } from "react-icons/fi";
import { caseStudies, platformServices, type CaseStudy } from "@/content/profile";
import { Chip, SectionHeading, delay } from "@/components/ui/primitives";
import Diagram from "@/components/visuals/Diagrams";
import BrowserFrame from "@/components/visuals/BrowserFrame";
import CountUp from "@/components/ui/CountUp";

function CaseStudyArticle({ study }: { study: CaseStudy }) {
  return (
    <article
      id={`work-${study.id}`}
      aria-labelledby={`work-${study.id}-title`}
      className="grid gap-10 border-t border-line py-16 sm:py-20 lg:grid-cols-12 lg:gap-14"
    >
      <div className="min-w-0 lg:col-span-5">
        <div data-reveal className="flex items-baseline justify-between gap-4">
          <p className="eyebrow">
            <span className="text-signal">{study.index}</span> &nbsp;{study.kicker}
          </p>
          <p className="shrink-0 font-mono text-xs text-faint">{study.period}</p>
        </div>

        <h3 id={`work-${study.id}-title`} data-reveal style={delay(1)} className="mt-5 text-display-md font-medium text-fg">
          {study.name}
        </h3>

        <p data-reveal style={delay(2)} className="mt-5 text-base leading-relaxed text-muted sm:text-[1.05rem]">
          {study.problem}
        </p>

        <p data-reveal style={delay(3)} className="mt-6 border-l-2 border-signal/70 pl-4 text-sm text-fg">
          <span className="eyebrow mr-2 !text-[0.66rem]">Role</span>
          {study.role}
        </p>

        <ul className="mt-8 space-y-3.5">
          {study.built.map((item, i) => (
            <li key={i} data-reveal style={delay(i + 3, 50)} className="flex gap-3 text-[0.95rem] leading-relaxed text-fg/90">
              <span className="mt-[0.7em] h-px w-3 shrink-0 bg-signal" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-8 flex flex-wrap gap-1.5">
          {study.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>

        {study.link ? (
          <a
            href={study.link.href}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
            className="group mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-signal"
          >
            {study.link.label}
            <FiArrowUpRight aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : null}
      </div>

      <div className="min-w-0 lg:col-span-7">
        <div className="space-y-4 lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
          {study.image ? (
            <div data-reveal className="group">
              <BrowserFrame
                src={study.image.src}
                alt={study.image.alt}
                url={study.image.url}
                sizes="(min-width: 1024px) 680px, 100vw"
              />
            </div>
          ) : null}

          <figure data-reveal style={delay(1)} className="spotlight overflow-hidden rounded-xl border border-line bg-surface">
            <div className="overflow-x-auto [scrollbar-width:thin]" tabIndex={0} aria-label={`${study.name} architecture diagram`}>
              <Diagram kind={study.diagram} />
            </div>
            <figcaption className="flex items-center justify-between gap-4 border-t border-line px-4 py-2.5 font-mono text-[0.68rem] text-faint">
              <span>
                architecture sketch<span className="sm:hidden"> · swipe →</span>
              </span>
              <span className="text-right">private codebase</span>
            </figcaption>
          </figure>

          <dl data-reveal style={delay(2)} className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
            {study.outcomes.map((o) => (
              <div key={o.label} className="flex flex-col bg-ink p-4 sm:p-5">
                <dt className="order-2 mt-1.5 text-xs leading-snug text-muted">{o.label}</dt>
                <dd className="order-1 text-lg font-medium tracking-tight text-fg sm:text-2xl">
                  <CountUp value={o.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="engineering" aria-labelledby="work-title" className="border-t border-line pt-24 sm:pt-32">
      <div className="page-x">
        <SectionHeading
          id="work-title"
          index="03"
          eyebrow="Engineering"
          title={
            <>
              How I built it: <span className="font-serif italic text-muted">my part</span>, in depth.
            </>
          }
          lede="The engineering behind those products that I own end to end. The code is private, so each deep dive shows the problem, what I built and the numbers behind it, with the architecture drawn out."
        />

        <nav aria-label="Engineering deep dives" className="mt-12 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] md:ml-[25%] md:pl-2.5">
          {caseStudies.map((s) => (
            <a
              key={s.id}
              href={`#work-${s.id}`}
              className="inline-flex min-h-[40px] shrink-0 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors duration-300 hover:border-line-strong hover:text-fg"
            >
              <span className="font-mono text-[0.7rem] text-signal">{s.index}</span>
              {s.name}
            </a>
          ))}
        </nav>

        <div className="mt-12">
          {caseStudies.map((s) => (
            <CaseStudyArticle key={s.id} study={s} />
          ))}
        </div>

        <div className="border-t border-line py-16 sm:py-20">
          <p data-reveal className="eyebrow">
            Also shipped on the platform
          </p>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {platformServices.map((p, i) => (
              <li key={p.name} data-reveal style={delay(i)} className="spotlight bg-ink p-6 sm:p-7">
                <h3 className="text-lg font-medium tracking-tight text-fg">{p.name}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
