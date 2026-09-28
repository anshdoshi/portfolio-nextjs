import { certifications, education } from "@/content/profile";
import { ExternalLink, delay } from "@/components/ui/primitives";

export default function Credentials() {
  return (
    <section aria-labelledby="credentials-title" className="border-t border-line py-20 sm:py-24">
      <div className="page-x grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3" data-reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-signal">06</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden />
            Credentials
          </p>
          <h2 id="credentials-title" className="sr-only">
            Education and certifications
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 md:col-span-9">
          <div data-reveal className="flex flex-col bg-ink p-6 sm:p-7">
            <p className="eyebrow">Education</p>
            <h3 className="mt-5 text-lg font-medium leading-snug tracking-tight text-fg">{education.degree}</h3>
            <p className="mt-2 text-sm text-muted">
              {education.school}, {education.location}
            </p>
            <p className="mt-auto pt-6 font-mono text-xs text-faint">{education.year}</p>
          </div>
          {certifications.map((c, i) => (
            <div key={c.name} data-reveal style={delay(i + 1)} className="flex flex-col bg-ink p-6 sm:p-7">
              <p className="eyebrow">Certification</p>
              <h3 className="mt-5 text-lg font-medium leading-snug tracking-tight text-fg">{c.name}</h3>
              <p className="mt-2 text-sm text-muted">{c.issuer}</p>
              <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                <span className="font-mono text-xs text-faint">{c.date}</span>
                <ExternalLink href={c.url}>View certificate</ExternalLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
