import { experience, focusAreas, person } from "@/content/profile";
import { Chip, SectionHeading, delay } from "@/components/ui/primitives";
import SystemFlow from "@/components/visuals/SystemFlow";

export default function About() {
  const current = experience[0];
  return (
    <section id="profile" aria-labelledby="profile-title" className="border-t border-line py-24 sm:py-32">
      <div className="page-x">
        <SectionHeading
          id="profile-title"
          index="01"
          eyebrow="Profile"
          title={
            <>
              Full stack, with a bias for the parts that <span className="font-serif italic text-muted">have to be right</span>.
            </>
          }
          lede={person.summary}
        />

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3" data-reveal="left">
            <dl className="space-y-6 text-sm">
              <div>
                <dt className="eyebrow">Currently</dt>
                <dd className="mt-2 text-fg">
                  {current.role}
                  <br />
                  <span className="text-muted">{current.company}</span>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Based in</dt>
                <dd className="mt-2 text-fg">
                  {person.location}
                  <br />
                  <span className="text-muted">{person.relocation}</span>
                </dd>
              </div>
            </dl>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 md:col-span-9">
            {focusAreas.map((area, i) => (
              <li
                key={area.key}
                data-reveal
                style={delay(i)}
                className="spotlight group flex flex-col bg-ink p-6 transition-colors duration-500 hover:bg-surface sm:p-8"
              >
                <span className="font-mono text-xs text-faint">0{i + 1}</span>
                <h3 className="mt-6 text-xl font-medium tracking-tight text-fg">{area.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{area.body}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                  {area.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 grid items-center gap-10 md:grid-cols-12 md:gap-10 lg:mt-28">
          <div className="md:col-span-5 lg:col-span-4 lg:col-start-4" data-reveal>
            <p className="eyebrow">What I own</p>
            <h3 className="mt-4 text-3xl font-medium tracking-tight text-fg sm:text-4xl">
              One request, <span className="font-serif italic text-muted">five systems</span> I built.
            </h3>
            <p className="mt-5 leading-relaxed text-muted">
              A dealer signs in with a mobile OTP, moves between products through single-use SSO handoff codes, is
              authorised by a fail-closed 7-role check, searches 300K+ profiles kept fresh by change-data-capture, and uses
              AI features that a human approves first.
            </p>
          </div>
          <div className="md:col-span-7 lg:col-span-5" data-reveal="right" style={delay(1)}>
            <SystemFlow />
          </div>
        </div>
      </div>
    </section>
  );
}
