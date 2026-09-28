import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { person, site } from "@/content/profile";
import { ButtonLink } from "@/components/ui/primitives";
import TerminalCard from "@/components/visuals/TerminalCard";

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
      {/* Animated ambient orbs */}
      <div
        className="animate-float pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[560px] w-[560px] rounded-full bg-signal/[0.10] blur-[130px]"
        aria-hidden
      />
      <div
        className="animate-float-alt pointer-events-none absolute bottom-[-10%] left-[-8%] -z-10 h-[400px] w-[400px] rounded-full bg-signal-2/[0.07] blur-[110px]"
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
            <span className="text-accent-gradient font-semibold">{person.heroLedeAccent}</span>
            {person.heroLede}
          </p>

          <div className="fade-in mt-10 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "780ms" }}>
            <span data-magnetic>
              <ButtonLink href="#projects" icon={<FiArrowDown aria-hidden />}>
                See selected work
              </ButtonLink>
            </span>
            <span data-magnetic>
              <ButtonLink href={site.resumePdf} external variant="ghost" icon={<FiArrowUpRight aria-hidden />}>
                Resume (PDF)
              </ButtonLink>
            </span>
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
    </section>
  );
}
