import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Interactions from "@/components/ui/Interactions";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="noise">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
      <Interactions />
    </div>
  );
}
