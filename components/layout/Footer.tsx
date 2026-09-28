import { FiArrowUp } from "react-icons/fi";
import { navItems, person, site } from "@/content/profile";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="page-x flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <Logo className="h-8 w-8" />
          <div>
            <p className="text-sm text-fg">{person.name}</p>
            <p className="mt-1 text-sm text-muted">{person.subtitle}</p>
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-3">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="text-muted transition-colors hover:text-fg">
              {item.label}
            </a>
          ))}
          <a href={site.resumePdf} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-fg">
            Resume
          </a>
        </nav>

        <a
          href="#about-me"
          className="group inline-flex min-h-[44px] items-center gap-2 self-start rounded-full border border-line px-4 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
        >
          Back to top
          <FiArrowUp aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </a>
      </div>
      <div className="border-t border-line">
        <div className="page-x flex flex-col gap-2 py-6 font-mono text-[0.7rem] text-faint sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {person.name}
        </p>
        <p>Built with Next.js · Set in Geist &amp; Instrument Serif</p>
        </div>
      </div>
    </footer>
  );
}
