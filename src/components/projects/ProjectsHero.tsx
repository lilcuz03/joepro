// src/components/projects/ProjectsHero.tsx
// Server component. Pale on purpose: the fixed header uses dark text over a
// transparent bar, so a dark hero here would hide it.
import Link from "next/link";
import { QuoteButton } from "@/components/header/QuoteButton";
import { siteConfig } from "@/config/site";

const area = siteConfig.contact.region.split(",")[0]; // "Shallcross"

export function ProjectsHero() {
  return (
    <section
      aria-labelledby="projects-page-heading"
      className="bg-glow relative isolate overflow-hidden pb-12 pt-32 md:pb-16 md:pt-40"
    >
      {/* Same horizontal padding scale as the header and every section */}
      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 text-sm text-girder"
        >
          <ol className="flex items-center gap-2">
            <li>
              <Link
                href="/"
                className="transition-colors duration-300 ease-course hover:text-steel hover:underline hover:decoration-hivis hover:decoration-2 hover:underline-offset-4"
              >
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li
              aria-current="page"
              className="font-semibold text-steel"
            >
              Projects
            </li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-girder sm:text-sm">
              <span
                aria-hidden
                className="h-0.5 w-8 shrink-0 bg-hivis"
              />
              Our projects
            </p>
            <h1
              id="projects-page-heading"
              className="font-display wdth-wide text-[clamp(2.1rem,5.4vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em]"
            >
              Recent{" "}
              <span className="box-decoration-clone rounded-lg bg-hivis px-[0.2em] text-steel">
                work
              </span>{" "}
              across Durban.
            </h1>
          </div>

          <div className="lg:col-span-4 lg:justify-self-end">
            <p className="max-w-[46ch] text-base leading-relaxed text-girder md:text-lg">
              A look at roofs, brickwork, paving and more, built and finished by{" "}
              <strong className="font-semibold text-steel">
                {siteConfig.name}
              </strong>{" "}
              for homes and businesses in {area} and around Durban.
            </p>
            <div className="mt-6">
              <QuoteButton
                href={siteConfig.cta.href}
                label="Get a free quote"
                tone="accent"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
