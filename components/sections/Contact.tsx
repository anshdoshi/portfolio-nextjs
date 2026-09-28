import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { person, site } from "@/content/profile";
import { ButtonLink, delay } from "@/components/ui/primitives";
import CopyEmail from "@/components/ui/CopyEmail";

const channels = [
  { label: "Email", value: person.email, href: `mailto:${person.email}`, icon: FiMail, external: false },
  { label: "Phone", value: person.phone, href: person.phoneHref, icon: FiPhone, external: false },
  { label: "LinkedIn", value: person.name, href: person.links.linkedin, icon: FiLinkedin, external: true },
  { label: "GitHub", value: "anshdoshi", href: person.links.github, icon: FiGithub, external: true },
  { label: "LeetCode", value: "anshdoshi2305", href: person.links.leetcode, icon: SiLeetcode, external: true },
];

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line py-24 sm:py-32">
      <div className="grid-backdrop pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <div className="page-x">
        <p data-reveal className="eyebrow flex items-center gap-3">
          <span className="text-signal">07</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden />
          Contact
        </p>

        <h2 id="contact-title" data-reveal style={delay(1)} className="mt-8 max-w-4xl text-display-lg font-medium text-fg">
          Hiring for identity, search or AI features? <span className="text-accent-gradient font-serif italic">Let’s talk.</span>
        </h2>

        <p data-reveal style={delay(2)} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Open to full stack and software engineering roles. Based in {person.location} and{" "}
          {person.relocation.toLowerCase()}. The fastest way to reach me is email.
        </p>

        <div data-reveal style={delay(3)} className="mt-10 flex flex-wrap items-center gap-3">
          <ButtonLink href={`mailto:${person.email}`} icon={<FiArrowUpRight aria-hidden />}>
            Email me
          </ButtonLink>
          <CopyEmail email={person.email} />
          <ButtonLink href={site.resumePdf} external variant="ghost" icon={<FiArrowUpRight aria-hidden />}>
            Resume (PDF)
          </ButtonLink>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-[1.7fr_1.2fr_1fr_1fr_1fr]">
          {channels.map((c, i) => {
            const Icon = c.icon;
            return (
              <li key={c.label} data-reveal style={delay(i, 50)} className="bg-ink sm:last:col-span-2 lg:last:col-span-1">
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
                  className="group flex h-full min-h-[88px] items-center justify-between gap-4 p-5 transition-colors duration-300 hover:bg-surface"
                >
                  <span className="min-w-0">
                    <span className="eyebrow flex items-center gap-2">
                      <Icon aria-hidden className="h-3.5 w-3.5" />
                      {c.label}
                    </span>
                    <span className="mt-2 block truncate text-sm text-fg">{c.value}</span>
                  </span>
                  <FiArrowUpRight
                    aria-hidden
                    className="h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                  />
                  {c.external ? <span className="sr-only">(opens in a new tab)</span> : null}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
