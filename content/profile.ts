/**
 * Single source of truth for the portfolio (/) and the printable resume (/resume).
 *
 * Every fact here comes from the resume (Ansh_Doshi_Full_Stack_Developer.pdf) or from
 * repositories Ansh authored. Autoverse work is proprietary, so it is described at the
 * level of what was built and why, never code, schema or internal names.
 */

export const site = {
  url: "https://anshdoshi.vercel.app",
  resumePdf: "/Ansh_Doshi_Resume.pdf",
};

export const person = {
  name: "Ansh Doshi",
  firstName: "Ansh",
  title: "Full Stack Developer",
  subtitle: "Full Stack Developer · Software Engineer",
  location: "India",
  relocation: "Open to relocation",
  email: "doshiansh10@gmail.com",
  phone: "+91 99749 54616",
  phoneHref: "tel:+919974954616",
  links: {
    github: "https://github.com/anshdoshi",
    linkedin: "https://www.linkedin.com/in/ansh-doshi-ba280422b/",
    leetcode: "https://leetcode.com/u/anshdoshi2305/",
    portfolio: "https://anshdoshi.vercel.app",
  },
  summary:
    "Full stack developer with 4+ years of experience in TypeScript, React, Next.js, Node.js and PostgreSQL. Currently own identity, access control and candidate search for a four-product dealer SaaS platform serving 1,000+ dealerships: mobile-OTP login, cross-product SSO, role-based permissions, Typesense search over 300K+ profiles and human-reviewed LLM features. Previously owned the React layer for two client platforms and mentored two junior developers.",
  heroLedeAccent: "4+ years",
  heroLede:
    " of experience building full-stack systems — identity, access control, search infrastructure, and AI features shipped with a human in the loop.",
};

export const stats = [
  { value: "4+", label: "Years full-stack experience" },
  { value: "10+", label: "Production systems shipped" },
  { value: "3+", label: "Companies & product teams" },
  { value: "15+", label: "Technologies in production" },
];

export const focusAreas = [
  {
    key: "identity",
    title: "Identity & access",
    body: "Mobile-OTP sign-in, cross-product SSO and a 7-role permission model that fails closed on the server and mirrors the same rules in the UI.",
    tags: ["SSO", "OTP", "RBAC", "Sessions"],
  },
  {
    key: "search",
    title: "Search & data pipelines",
    body: "Typesense search over 300K+ profiles, kept within 60 seconds of PostgreSQL by a change-data-capture pipeline and queue workers.",
    tags: ["Typesense", "PostgreSQL", "CDC", "Cron"],
  },
  {
    key: "ai",
    title: "Applied LLMs",
    body: "Job descriptions, resume extraction and candidate matching on Gemini, with rate limits, role restrictions and human approval before anything reaches a candidate.",
    tags: ["Gemini", "Vercel AI SDK", "Human-in-the-loop"],
  },
  {
    key: "frontend",
    title: "Frontend architecture",
    body: "Typed, cache-aware React and Next.js data layers with explicit loading and error states — plus the code review and shared standards that keep a team consistent.",
    tags: ["React", "Next.js", "TanStack", "Mentoring"],
  },
];

export type Experience = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  /** The resume's first bullet for this role, shown as the lead line */
  summary: string;
  bullets: string[];
  stack: string[];
};

/** Wording matches the resume (Ansh_Doshi_Resume.pdf) exactly. */
export const experience: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "Autoverse AI",
    location: "Ahmedabad, India",
    start: "Jun 2025",
    end: "Present",
    summary:
      "Own identity, access control and candidate search across a four-product dealer SaaS platform serving 1,000+ dealerships and 300K+ candidate profiles in 28 states and union territories.",
    bullets: [
      "Replaced three incompatible login systems (passwords, Keycloak and per-product OTP) with a single mobile-OTP identity layer, with per-code attempt limits and lockout after repeated failed sign-ins.",
      "Fixed an intermittent cross-product SSO failure: a meta refresh raced a location.assign() call and replayed single-use handoff codes. Found it in 4,000+ production auth codes over 30 days (up to 48% unused on one portal).",
      "Built candidate search on Typesense over 300K+ profiles, with seniority-aware role hierarchies across 5 job families, city and role synonyms and tuned typo tolerance, so a Sales Executive search excludes candidates already promoted past that level.",
      "Designed a 7-role RBAC and entitlement system with dealer-namespaced permissions. A server-side check intersects dealer grants with user grants and fails closed; the same rules drive a guard in the UI.",
      "Built a change-data-capture pipeline that keeps the search index within 60 seconds of PostgreSQL: row-level triggers enqueue reindex jobs, and per-minute cron workers drain separate candidate and job queues.",
      "Integrated LLMs (Gemini and gpt-oss-120b) into a 6-stage recruitment pipeline for job description generation and resume extraction. Every AI output requires human approval before it reaches a candidate.",
      "Designed an LLM-assisted candidate matching pipeline on Gemini: batch match scoring at low temperature for consistent rankings, rate-limited to 20 requests per minute and restricted to HR, admin and interviewer roles.",
      "Built credit billing that charges a dealer only when a paid external lookup returns contact details, never for in-house profiles or failed lookups, with per-search cost estimates to track daily spend.",
      "Run 34 scheduled jobs on Vercel Cron, including per-minute WhatsApp, email and social-post queue workers and 9 staggered analytics cache-warming jobs.",
    ],
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Supabase", "Typesense", "Gemini", "Vercel"],
  },
  {
    role: "Software Engineer",
    company: "N2N Solutions",
    location: "Pune, India",
    start: "Sep 2023",
    end: "May 2025",
    summary: "Owned the React application layer for 2 production client platforms, from component architecture through release.",
    bullets: [
      "Integrated REST APIs into typed, cache-aware data layers with explicit loading and error states, and led refactoring and optimization passes across the React codebase.",
      "Mentored 2 junior React developers through code review and pairing, and set shared standards for component design, state management and Git workflow.",
      "Worked with QA to define test strategy and coverage priorities before releases, reducing the defects that reached production.",
    ],
    stack: ["React", "TypeScript", "REST APIs", "Redux Toolkit", "TanStack Query"],
  },
  {
    role: "Junior React Developer",
    company: "Excellent Web World",
    location: "Ahmedabad, India",
    start: "May 2022",
    end: "Sep 2023",
    summary:
      "Built React frontends for 2 products in an 8–9 person cross-functional team: a Hong Kong logistics and warehousing platform and a salon booking application.",
    bullets: [
      "Built Node.js services behind the salon product's admin portal and its companion React Native app, beyond the original frontend scope.",
      "Delivered the customer-facing app and the internal operations portal for the logistics platform, with responsive, cross-browser layouts and REST API integration.",
    ],
    stack: ["React", "Node.js", "React Native", "REST APIs"],
  },
];

export type DiagramKind = "identity" | "search" | "dashboard" | "analytics";

export type CaseStudy = {
  id: string;
  index: string;
  name: string;
  kicker: string;
  period: string;
  problem: string;
  role: string;
  built: string[];
  outcomes: { value: string; label: string }[];
  stack: string[];
  diagram: DiagramKind;
  image?: { src: string; alt: string; url: string };
  link?: { href: string; label: string };
};

export const caseStudies: CaseStudy[] = [
  {
    id: "identity",
    index: "01",
    name: "Unified identity & SSO",
    kicker: "Platform · All products",
    period: "2025 — now",
    problem:
      "Four dealer products, three incompatible ways to sign in — passwords, Keycloak and per-product OTP — and an SSO hop between products that failed intermittently.",
    role: "Owner of identity and access control across the platform.",
    built: [
      "One mobile-OTP identity layer for every product, with per-code attempt limits and lockout after repeated failures.",
      "Found the intermittent SSO failure in production data: a meta refresh raced location.assign() and replayed single-use handoff codes.",
      "A 7-role RBAC and entitlement model with dealer-namespaced permissions; the server intersects dealer and user grants and fails closed, and the UI guard uses the same rules.",
    ],
    outcomes: [
      { value: "3 → 1", label: "Login systems" },
      { value: "4,000+", label: "Auth codes analysed" },
      { value: "7", label: "Roles, fail-closed" },
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "OTP", "SSO", "RBAC"],
    diagram: "identity",
  },
  {
    id: "autoswitch",
    index: "02",
    name: "Candidate search & AI hiring",
    kicker: "AutoSwitch · Search + LLMs",
    period: "2025 — now",
    problem:
      "Dealerships hiring across 5 job families needed to search 300K+ candidate profiles by role, seniority and city — and wanted AI help without AI talking to candidates unchecked.",
    role: "Built candidate search, the search-index pipeline, the LLM features and credit billing.",
    built: [
      "Typesense search with seniority-aware role hierarchies, city and role synonyms and tuned typo tolerance — a Sales Executive search excludes people already promoted past it.",
      "Change-data-capture: row-level triggers enqueue reindex jobs; per-minute cron workers drain separate candidate and job queues.",
      "A 6-stage recruitment pipeline using Gemini and gpt-oss-120b for job descriptions and resume extraction, with human approval on every AI output.",
      "Gemini candidate matching with low-temperature batch scoring, 20 requests/minute, limited to HR, admin and interviewer roles.",
      "Credit billing that charges only when a paid external lookup returns contact details, with per-search cost estimates.",
    ],
    outcomes: [
      { value: "300K+", label: "Profiles searchable" },
      { value: "≤ 60s", label: "Index lag behind Postgres" },
      { value: "34", label: "Scheduled jobs" },
    ],
    stack: ["Next.js", "Typesense", "PostgreSQL", "Gemini", "Vercel Cron", "Supabase"],
    diagram: "search",
  },
  {
    id: "dreamdashboard",
    index: "03",
    name: "AI dashboards from Excel",
    kicker: "DreamDashboard AI",
    period: "2026 — now",
    problem:
      "Dealers export Excel reports that differ by report type and by dealer management system. Hand-built dashboards go stale the moment next month's file arrives.",
    role: "Primary engineer on the AI dashboard product.",
    built: [
      "Upload an Excel file; AI works out what the data means and builds a dashboard from it.",
      "Every number, chart and tile is a stored query, not a stored value — next month's upload updates the whole dashboard.",
      "Tenant filters are injected server-side on every query and never taken from AI-generated SQL.",
      "“Ask” answers grounded in the dealer's own data and active filters; editable queries with undo; dashboards shared by email.",
    ],
    outcomes: [
      { value: "0", label: "Values baked into tiles" },
      { value: "Server-side", label: "Tenant isolation" },
      { value: "Grounded", label: "AI answers" },
    ],
    stack: ["Next.js", "TypeScript", "Vercel AI SDK", "PostgreSQL", "Excel ingestion"],
    diagram: "dashboard",
  },
  {
    id: "analytics",
    index: "04",
    name: "First-party analytics",
    kicker: "Platform · All products",
    period: "2026",
    problem:
      "Every product surface needed visitors, device split, time-on-page and drop-off — owned in-house rather than borrowed from third-party scripts.",
    role: "Built the tracker, collector and warehouse.",
    built: [
      "A dependency-free tracker of about 4 KB: pageviews, engaged time, scroll depth and business events.",
      "A collector that validates, screens bots, resolves geography and verifies identity before a single write.",
      "A partitioned warehouse, with each product surface pinned to a tracker version so new builds roll out one surface at a time.",
    ],
    outcomes: [
      { value: "~4 KB", label: "Tracker, no dependencies" },
      { value: "Per-surface", label: "Version pinning" },
      { value: "Bot-screened", label: "Ingestion" },
    ],
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Partitioning"],
    diagram: "analytics",
  },
];

export const platformServices = [
  {
    name: "Dealer lifecycle mailer",
    body: "Headless service sending 9 kinds of trial and billing email, with a read-only verification run against live data that never mails a dealership.",
  },
  {
    name: "OTP-gated demo access",
    body: "Real SMS OTP in front of a product demo, with a per-number login quota and 61 unit tests. No SMS can leave a non-production machine.",
  },
  {
    name: "Platform welcome",
    body: "The animated product-selection entry point that routes dealers into each of the platform's modules.",
  },
];

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  /** What Ansh did on it, from his commits. Omitted when there is nothing verifiable. */
  contribution?: string[];
  tags: string[];
  /** Real product screenshot; `label` shows in the frame bar, `focus` picks which part survives cropping */
  image: { src: string; alt: string; label: string; focus?: "top" | "center" };
  link?: { href: string; label: string };
  depth: "Core engineer" | "Primary engineer" | "Platform integration" | "Platform product";
};

/** Products on the Autoverse AI platform that Ansh has worked on. */
export const products: Product[] = [
  {
    id: "autoswitch",
    name: "AutoSwitch",
    tagline: "India's automobile retail job portal",
    description:
      "A hiring platform for automotive dealerships: dealers post jobs and search candidates, job seekers find roles across the dealership network.",
    contribution: [
      "Candidate search on Typesense over 300K+ profiles, kept within 60 s of PostgreSQL",
      "6-stage LLM recruitment pipeline with human approval, and Gemini candidate matching",
      "Credit billing for paid contact lookups, and 34 scheduled jobs on Vercel Cron",
    ],
    tags: ["Next.js", "Typesense", "PostgreSQL", "Gemini"],
    image: { src: "/products/autoswitch.jpg", alt: "AutoSwitch home page: India's only job portal dedicated to automotive retail, with job search and role chips", label: "autoswitch.in" },
    link: { href: "https://autoswitch.in", label: "autoswitch.in" },
    depth: "Core engineer",
  },
  {
    id: "dreamdashboard",
    name: "DreamDashboard",
    tagline: "Business review dashboards, now with AI",
    description:
      "An analytics and business-review tool for dealerships covering sales and after-sales, with controlled access. Its AI dashboards turn a dealer's Excel exports into live dashboards where every tile is a stored query.",
    contribution: [
      "Primary engineer on the AI dashboards: Excel ingestion, stored-query tiles, grounded “Ask”, email sharing",
      "Built and hardened DreamDashboard's report builder and pivot reports",
      "Bridged the AI dashboards into DreamDashboard as an embedded view",
    ],
    tags: ["Next.js", "Vercel AI SDK", "PostgreSQL", "Reporting"],
    image: { src: "/products/dreamdashboard-ai.jpg", alt: "DreamDashboard AI sales report: AI-written highlights and key-number tiles with filters", label: "DreamDashboard · AI dashboard" },
    depth: "Primary engineer",
  },
  {
    id: "automate",
    name: "Automate",
    tagline: "The paperless dealership",
    description:
      "Workflow automation for dealerships: tracks every customer order from booking through finance, insurance, exchange and accessories to delivery, with e-documents and real-time productivity for each department.",
    contribution: [
      "Made the cross-product SSO handoff into Automate reliable: bounded retries, and telling an outage apart from an unknown user",
      "Tuned the tenant database pool and moved shared-database access to the Supabase REST API",
      "Dealer provisioning, subscription access windows and first-party analytics",
    ],
    tags: ["SSO", "PostgreSQL", "Supabase", "Multi-tenant"],
    image: { src: "/products/automate.jpg", alt: "Automate home: order totals and a card per stage, from booking and DP approval through finance, insurance, exchange and delivery", label: "Automate" },
    depth: "Platform integration",
  },
  {
    id: "autosphere",
    name: "AutoSphere",
    tagline: "Cars in 3D, VR and mixed reality",
    description:
      "A virtual dealership: a real-time 3D car configurator (colours, interior, doors and scenes) for large touch screens and VR/MR headsets, giving OEMs a frugal way to expand their network.",
    contribution: [
      "Gated the 3D viewer behind a platform session, preserving app parameters through the sign-in handoff",
      "Built the product switcher, including brand selection for multi-brand users",
      "Support-ticket registration, subscription access windows and analytics",
    ],
    tags: ["Three.js", "SSO", "Session gating"],
    image: { src: "/products/autosphere.jpg", alt: "AutoSphere configurator: a 3D SUV on a road scene with colour swatches and exterior, interior, doors and scene modes", label: "AutoSphere · Configurator", focus: "center" },
    depth: "Platform integration",
  },
  {
    id: "autoserve",
    name: "AutoServe",
    tagline: "Service booking for dealership groups",
    description:
      "Service booking, pickup-and-drop logistics and customer outreach for multi-outlet dealership groups: the booking desk behind an AI voice agent that calls customers when service is due.",
    tags: ["Service booking", "Logistics", "AI calling"],
    image: { src: "/products/autoserve.jpg", alt: "AutoServe calls screen: calls today, answered, typical length and bookings, with the call list (customer details blurred)", label: "AutoServe · Outreach" },
    depth: "Platform product",
  },
];

export type ClientProject = {
  name: string;
  company: "N2N Solutions" | "Excellent Web World";
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  url?: string;
  displayUrl: string;
};

export const clientWork: ClientProject[] = [
  {
    name: "AZ India",
    company: "N2N Solutions",
    category: "Community platform",
    description: "Events, classifieds, jobs board and local directory for a community audience.",
    image: "/project1.jpeg",
    imageAlt: "AZ India homepage with events carousel and “Connecting Communities” headline",
    url: "https://www.azindia.com/",
    displayUrl: "azindia.com",
  },
  {
    name: "All in One Distributions",
    company: "N2N Solutions",
    category: "Wholesale e-commerce",
    description: "Wholesale storefront with category navigation, product search and cart.",
    image: "/project5.jpeg",
    imageAlt: "All in One Distribution storefront with category bar and product search",
    url: "https://allinonedistributions.com/",
    displayUrl: "allinonedistributions.com",
  },
  {
    name: "Silverline Wholesale",
    company: "N2N Solutions",
    category: "Wholesale e-commerce",
    description: "Wholesale storefront with category browsing, favourites, notifications and cart.",
    image: "/project3.jpeg",
    imageAlt: "Silverline Wholesale storefront with category menu and product banners",
    displayUrl: "silverlinewholesale.com",
  },
  {
    name: "Jumppoint",
    company: "Excellent Web World",
    category: "Logistics & warehousing · Hong Kong",
    description: "Customer-facing app and internal operations portal, with responsive, cross-browser layouts and REST API integration.",
    image: "/project4.jpeg",
    imageAlt: "Jumppoint Smart Logistics Network homepage",
    url: "https://www.jumppoint.io/en/home",
    displayUrl: "jumppoint.io",
  },
  {
    name: "Beauty Salon",
    company: "Excellent Web World",
    category: "Salon booking · Web + mobile",
    description: "React frontend, plus the Node.js services behind the admin portal and the companion React Native app.",
    image: "/project2.jpeg",
    imageAlt: "Beauty Salon app listing on Google Play with booking screens",
    url: "https://play.google.com/store/apps/details?id=com.elatheer.beauty_salon",
    displayUrl: "Google Play",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["TypeScript", "JavaScript (ES2022+)", "SQL", "HTML5", "CSS3"] },
  {
    group: "Frontend",
    items: [
      "React 19",
      "Next.js 16 (App Router, Server Components, Server Actions)",
      "Redux Toolkit",
      "TanStack Query / Table / Virtual",
      "React Hook Form",
      "Zod",
      "Tailwind CSS",
      "Radix UI",
      "Material UI",
      "React Native",
    ],
  },
  {
    group: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "Express.js",
      "REST API design",
      "Microservices",
      "Background workers",
      "Cron scheduling",
      "Queue processing",
      "Caching",
      "Apache Kafka",
    ],
  },
  {
    group: "Databases & Search",
    items: [
      "PostgreSQL",
      "Supabase",
      "MySQL",
      "MongoDB",
      "Prisma",
      "Row-level security",
      "Database triggers",
      "Materialized views",
      "Indexing & query optimization",
      "Typesense",
      "Elasticsearch",
    ],
  },
  {
    group: "Security & Identity",
    items: ["SSO", "OAuth2 / OIDC", "JWT", "OTP authentication", "Session management", "RBAC", "Multi-tenant isolation", "Rate limiting", "AES encryption"],
  },
  {
    group: "AI Integration",
    items: ["Google Gemini", "Anthropic Claude", "Vercel AI SDK", "Prompt engineering", "Resume parsing", "LLM-assisted candidate matching", "Retrieval & ranking"],
  },
  {
    group: "Cloud & DevOps",
    items: ["AWS (EC2, S3)", "Vercel", "Docker", "Kubernetes", "Git", "GitHub Actions", "CI/CD", "Linux"],
  },
  { group: "Testing & Tools", items: ["Vitest", "Playwright", "PostHog", "GA4", "Razorpay"] },
];

export const education = {
  degree: "Bachelor of Science, Information Technology",
  school: "GLS University",
  location: "Ahmedabad, India",
  year: "2023",
};

export const certifications = [
  {
    name: "NASSCOM / NCVET Certification",
    issuer: "Ministry of Skill Development & Entrepreneurship, Govt. of India",
    date: "Apr 2025",
    url: "https://drive.google.com/file/d/1PYBmNjvxfMmoevm1nYX6q02Yd9iblCtU/view",
  },
  {
    name: "Introduction to Artificial Intelligence",
    issuer: "IBM",
    date: "Feb 2026",
    url: "https://drive.google.com/file/d/1ucAWg6_FnxUexHE6qpWVCUkvdWKwq9jr/view?usp=drivesdk",
  },
];

export const navItems = [
  { id: "about-me", label: "About" },
  { id: "projects", label: "Products" },
  { id: "engineering", label: "Engineering" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
