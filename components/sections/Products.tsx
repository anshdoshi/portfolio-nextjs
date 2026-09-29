import { FiArrowUpRight } from "react-icons/fi";
import { products, type Product } from "@/content/profile";
import { Chip, SectionHeading, cn, delay } from "@/components/ui/primitives";
import BrowserFrame from "@/components/visuals/BrowserFrame";

const depthStyle: Record<Product["depth"], string> = {
  "Core engineer": "border-signal/50 bg-signal/10 text-signal",
  "Primary engineer": "border-signal/50 bg-signal/10 text-signal",
  "Platform integration": "border-line-strong bg-fg/[0.04] text-fg/80",
  "Platform product": "border-line bg-transparent text-muted",
};

function ProductVisual({ product, featured }: { product: Product; featured: boolean }) {
  return (
    <BrowserFrame
      src={product.image.src}
      alt={product.image.alt}
      url={product.image.label}
      sizes={featured ? "(min-width: 1024px) 700px, 100vw" : "(min-width: 1024px) 560px, 100vw"}
      aspect={featured ? "aspect-[2/1]" : "aspect-[16/10]"}
      position={product.image.focus === "center" ? "object-center" : "object-top"}
    />
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const featured = product.id === "autoswitch" || product.id === "dreamdashboard" || product.id === "autoserve";
  const flip = index === 1;

  return (
    <article
      id={`product-${product.id}`}
      aria-labelledby={`product-${product.id}-title`}
      data-reveal
      style={delay(index % 2)}
      className={cn(
        "spotlight group rounded-2xl border border-line bg-ink/60 p-3 transition-colors duration-500 hover:border-line-strong sm:p-4",
        featured && "lg:col-span-2",
      )}
    >
      <div className={cn("grid gap-6", featured && "lg:grid-cols-12 lg:items-stretch lg:gap-10")}>
        <div className={cn("min-w-0", featured && "lg:col-span-7", featured && flip && "lg:order-2")}>
          <ProductVisual product={product} featured={featured} />
        </div>

        <div className={cn("flex min-w-0 flex-col px-2 pb-3 sm:px-3", featured && "lg:col-span-5 lg:py-4")}>
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("rounded-full border px-2.5 py-1 font-mono text-[0.66rem] uppercase tracking-[0.12em]", depthStyle[product.depth])}>
              {product.depth === "Platform product" ? "On the platform" : product.depth}
            </span>
          </div>

          <h3 id={`product-${product.id}-title`} className="mt-4 text-3xl font-medium tracking-tight text-fg">
            {product.name}
          </h3>
          <p className="mt-2 text-lg font-semibold tracking-tight text-fg/85 sm:text-xl">{product.tagline}</p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{product.description}</p>

          {product.contribution ? (
            <div className="mt-5">
              <p className="eyebrow !text-[0.66rem]">What I did</p>
              <ul className="mt-3 space-y-2.5">
                {product.contribution.map((c) => (
                  <li key={c} className="flex gap-3 text-[0.92rem] leading-relaxed text-fg/90">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-signal" aria-hidden />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
            {product.link ? (
              <a
                href={product.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-fg px-4 text-sm font-medium text-ink transition-colors duration-300 hover:bg-signal"
              >
                Visit {product.link.label}
                <FiArrowUpRight
                  aria-hidden
                  className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Products() {
  return (
    <section id="projects" aria-labelledby="products-title" className="border-t border-line py-24 sm:py-32">
      <div className="page-x">
        <SectionHeading
          id="products-title"
          index="02"
          eyebrow="Products"
          title={
            <>
              Products I’ve worked on at <span className="font-serif italic text-muted">Autoverse AI</span>.
            </>
          }
          lede="Five products on one dealer platform. How deep I went differs from product to product, so each card says exactly what I did."
        />

        <nav aria-label="Products" className="mt-12 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] md:ml-[25%] md:pl-2.5">
          {products.map((p) => (
            <a
              key={p.id}
              href={`#product-${p.id}`}
              className="inline-flex min-h-[40px] shrink-0 items-center rounded-full border border-line px-4 text-sm text-muted transition-colors duration-300 hover:border-line-strong hover:text-fg"
            >
              {p.name}
            </a>
          ))}
        </nav>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
