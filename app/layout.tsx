import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { person, site } from "@/content/profile";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const description =
  "Ansh Doshi — full stack developer (TypeScript, React, Next.js, Node.js, PostgreSQL). Identity, SSO, RBAC, Typesense search over 300K+ profiles and human-reviewed LLM features for a dealer SaaS platform serving 1,000+ dealerships.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${person.name} — ${person.title}`,
    template: `%s — ${person.name}`,
  },
  description,
  keywords: [
    "Ansh Doshi",
    "Full Stack Developer",
    "Software Engineer",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Typesense",
    "SSO",
    "RBAC",
    "LLM",
    "Gemini",
    "Vercel",
    "Supabase",
    "SaaS",
    "Automotive",
    "Dealership",
    "India",
    "Ahmedabad",
    "Portfolio",
  ],
  authors: [{ name: person.name, url: site.url }],
  creator: person.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: person.name,
    locale: "en_US",
    title: `${person.name} — ${person.title}`,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${person.name} — ${person.title}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name} — ${person.title}`,
    description,
    images: ["/opengraph-image"],
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#09090D",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: person.name,
      jobTitle: person.title,
      email: person.email,
      url: site.url,
      image: `${site.url}/opengraph-image`,
      address: { "@type": "PostalAddress", addressCountry: "IN", addressLocality: "Ahmedabad" },
      sameAs: [person.links.github, person.links.linkedin, person.links.leetcode, site.url],
      worksFor: { "@type": "Organization", name: "Autoverse AI" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "GLS University", address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressCountry: "IN" } },
      knowsAbout: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Typesense", "SSO", "RBAC", "LLM integration", "SaaS", "Full Stack Development"],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: person.name,
      description,
      author: { "@id": `${site.url}/#person` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Enables scroll-reveal styles only when JS runs; without JS all content stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
