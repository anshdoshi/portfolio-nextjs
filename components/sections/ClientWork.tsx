import { FiArrowUpRight } from "react-icons/fi";
import { clientWork, experience } from "@/content/profile";
import { delay } from "@/components/ui/primitives";
import BrowserFrame from "@/components/visuals/BrowserFrame";

const companies = ["N2N Solutions", "Excellent Web World"] as const;

export default function ClientWork() {
  return (
    <section aria-labelledby="client-work-title" className="border-t border-line py-24 sm:py-28">
      <div className="page-x">
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <p data-reveal className="eyebrow md:col-span-3">
            Earlier client work
          </p>
          <div className="md:col-span-9">
            <h2 id="client-work-title" data-reveal style={delay(1)} className="text-3xl font-medium tracking-tight text-fg sm:text-4xl">
              Before Autoverse: React for client platforms.
            </h2>
            <p data-reveal style={delay(2)} className="mt-4 max-w-2xl text-muted">
              Production sites and apps I worked on at N2N Solutions and Excellent Web World.
            </p>
          </div>
        </div>

        {companies.map((company) => {
          const job = experience.find((e) => e.company === company);
          const projects = clientWork.filter((p) => p.company === company);
          return (
            <div key={company} className="mt-16 grid gap-8 md:grid-cols-12 md:gap-10">
              <div data-reveal className="md:col-span-3">
                <h3 className="text-base font-medium text-fg">{company}</h3>
                {job ? (
                  <p className="mt-1 font-mono text-xs text-faint">
                    {job.role} · {job.start.split(" ")[1]}–{job.end.split(" ")[1]}
                  </p>
                ) : null}
              </div>
              <ul className="grid gap-6 sm:grid-cols-2 md:col-span-9 lg:gap-8">
                {projects.map((p, i) => {
                  const body = (
                    <>
                      <BrowserFrame src={p.image} alt={p.imageAlt} url={p.displayUrl} sizes="(min-width: 1024px) 420px, (min-width: 640px) 45vw, 100vw" />
                      <div className="mt-4 flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-medium tracking-tight text-fg">{p.name}</h4>
                          <p className="mt-0.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-faint">{p.category}</p>
                        </div>
                        {p.url ? (
                          <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
                            <FiArrowUpRight aria-hidden className="h-4 w-4" />
                          </span>
                        ) : (
                          <span className="mt-1 shrink-0 font-mono text-[0.68rem] text-faint">offline</span>
                        )}
                      </div>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{p.description}</p>
                    </>
                  );
                  return (
                    <li key={p.name} data-reveal style={delay(i)}>
                      {p.url ? (
                        <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block rounded-xl">
                          {body}
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      ) : (
                        <div className="group">{body}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
