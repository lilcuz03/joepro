// src/components/privacy/PrivacyHero.tsx
// Server component. Pale on purpose: the fixed header uses dark text over a
// transparent bar, so a dark hero here would hide it.
import Link from "next/link";

export const LAST_UPDATED = "9 November 2026"; // CONFIRM: update when you change the policy

export function PrivacyHero() {
  return (
    <section
      aria-labelledby="privacy-heading"
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
              Privacy policy
            </li>
          </ol>
        </nav>

        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h1
            id="privacy-heading"
            className="font-display wdth-wide text-[clamp(2.1rem,5.4vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.03em] lg:col-span-8"
          >
            Privacy{" "}
            <span className="box-decoration-clone rounded-lg bg-hivis px-[0.2em] text-steel">
              policy
            </span>
            .
          </h1>
          <div className="lg:col-span-4 lg:justify-self-end">
            <p className="max-w-[46ch] text-base leading-relaxed text-girder md:text-lg">
              How we look after your personal information, in plain English.
            </p>
            <p className="mt-3 text-sm font-semibold text-steel">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
