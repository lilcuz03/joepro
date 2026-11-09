// src/components/footer/Footer.tsx
"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { getLenis } from "@/lib/lenis";
import { cn } from "@/lib/utils";

const { contact } = siteConfig;

const year = new Date().getFullYear();
const area = contact.region.split(",")[0]; // "Shallcross"
const address = `${contact.streetAddress}, ${contact.city}`;
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${siteConfig.name}, ${address}`,
)}`;

const developer = { name: "TaaChii", href: "https://tafadzwa.site/" };

// The logo already links home, so "Home" is left out.
const quickLinks = [
  ...siteConfig.nav,
  // TODO: create /privacy (POPIA privacy notice) before launch
  { label: "Privacy policy", href: "/privacy" },
];

// Underline grows from the left on hover, same as the rest of the site.
function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const className =
    "group relative inline-block py-1.5 text-formwork/75 transition-colors duration-300 ease-course hover:text-hivis focus-visible:text-hivis";
  const underline = (
    <span
      aria-hidden
      className="absolute inset-x-0 bottom-0.5 h-px origin-left scale-x-0 bg-hivis transition-transform duration-500 ease-course group-hover:scale-x-100"
    />
  );
  if (external || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={className}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {underline}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={className}
    >
      {children}
      {underline}
    </Link>
  );
}

function backToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { immediate: reduce });
  } else {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-formwork/60">
      <span
        aria-hidden
        className="h-0.5 w-6 bg-hivis"
      />
      {children}
    </h2>
  );
}

export function Footer() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const panelId = useId();

  return (
    <footer className="relative isolate overflow-hidden bg-steel text-formwork">
      {/* soft amber glow, top right: the same one the hero uses */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] -top-[30%] -z-10 size-[min(48rem,90vw)] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-hivis)_20%,transparent),transparent)]"
      />

      {/* Same horizontal padding scale as the header and every section */}
      <div className="w-full px-4 pb-6 pt-16 sm:px-6 md:pt-20 lg:px-10 lg:pt-24 2xl:px-14">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* ---------------------------------------------------------
              Brand
          --------------------------------------------------------- */}
          <div className="sm:col-span-2 lg:col-span-5">
            <Link
              href="/"
              aria-label={`${siteConfig.name}, home`}
              className="group inline-flex items-center gap-3"
            >
              <span
                aria-hidden
                className="font-display wdth-wide inline-flex size-12 items-center justify-center rounded-xl bg-hivis text-lg font-extrabold text-steel transition-transform duration-500 ease-settle group-hover:-rotate-6"
              >
                {siteConfig.initials}
              </span>
              <span>
                <span className="font-display wdth-wide block text-xl font-extrabold leading-none tracking-tight">
                  {siteConfig.shortName}
                </span>
                <span className="mt-1 block text-sm text-formwork/65">
                  Construction
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-[40ch] text-base leading-relaxed text-formwork/75">
              Building and roofing contractor in {area}, serving homes and
              businesses across Durban for {siteConfig.yearsInIndustry} years.
            </p>
          </div>

          {/* ---------------------------------------------------------
              Quick links
          --------------------------------------------------------- */}
          <nav
            aria-label="Footer"
            className="lg:col-span-3"
          >
            <ColumnHeading>Quick links</ColumnHeading>
            <ul>
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------------------------------------------------------
              Contact
          --------------------------------------------------------- */}
          <div className="lg:col-span-4">
            <ColumnHeading>Contact</ColumnHeading>
            <address className="not-italic">
              <ul>
                <li>
                  <a
                    href={`tel:${contact.phoneHref}`}
                    className="font-display wdth-wide inline-block py-1.5 text-xl font-extrabold tracking-tight transition-colors duration-300 ease-course hover:text-hivis focus-visible:text-hivis md:text-2xl"
                  >
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <FooterLink href={`mailto:${contact.email}`}>
                    <span className="break-all">{contact.email}</span>
                  </FooterLink>
                </li>
                <li>
                  <FooterLink
                    href={mapsHref}
                    external
                  >
                    {address}
                  </FooterLink>
                </li>
              </ul>
            </address>
          </div>
        </div>

        {/* -----------------------------------------------------------
            Services dropdown. The links stay in the page HTML while it is
            closed, so search engines still see them; hidden from tab order
            and screen readers until opened.
        ----------------------------------------------------------- */}
        <div className="mt-12 border-y border-formwork/15 md:mt-14">
          <button
            type="button"
            aria-expanded={servicesOpen}
            aria-controls={panelId}
            onClick={() => setServicesOpen((open) => !open)}
            className="group flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left"
          >
            <span className="font-display wdth-wide text-lg font-extrabold tracking-tight transition-colors duration-300 ease-course group-hover:text-hivis md:text-xl">
              Our services{" "}
              <span className="font-sans text-sm font-normal text-formwork/55">
                ({services.length})
              </span>
            </span>
            <span
              aria-hidden
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-formwork/30 transition-colors duration-300 ease-course group-hover:border-hivis group-hover:bg-hivis group-hover:text-steel"
            >
              <svg
                viewBox="0 0 24 24"
                className={cn(
                  "size-4 transition-transform duration-500 ease-settle",
                  servicesOpen && "rotate-45",
                )}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </button>

          <div
            id={panelId}
            className={cn(
              "grid transition-[grid-template-rows,visibility] duration-500 ease-course",
              servicesOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]",
            )}
          >
            <div className="overflow-hidden">
              <ul className="flex flex-wrap gap-2 pb-6 pt-1">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services#${service.slug}`}
                      className="inline-flex min-h-11 items-center rounded-full border border-formwork/25 px-4 text-sm font-medium text-formwork/85 transition-colors duration-300 ease-course hover:border-hivis hover:bg-hivis hover:text-steel focus-visible:border-hivis focus-visible:bg-hivis focus-visible:text-steel"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------------
            Bottom bar: copyright, developer credit, back to top
        ----------------------------------------------------------- */}
        <div className="mt-6 flex flex-col gap-5 text-sm text-formwork/65 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1.5 sm:gap-1">
            <p>
              &copy; {year} {siteConfig.name}. All rights reserved.
            </p>
            <p>
              Developed by{" "}
              <a
                href={developer.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block font-semibold text-formwork transition-colors duration-300 ease-course hover:text-hivis focus-visible:text-hivis"
              >
                {developer.name}
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-hivis transition-transform duration-500 ease-course group-hover:scale-x-100"
                />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>

          <button
            type="button"
            onClick={backToTop}
            className="group inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-formwork/25 px-4 font-medium text-formwork transition-colors duration-300 ease-course hover:border-hivis hover:bg-hivis hover:text-steel sm:self-auto"
          >
            Back to top
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-4 transition-transform duration-500 ease-settle group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Decorative wordmark. Its size comes from the width of this padded
          block (cqw = 1% of the block's width), so all six letters always
          fit with the same side padding as the rest of the page, and the
          bottom padding keeps it off the edge. If it still feels too big or
          too small, change 19cqw: lower = smaller. */}
      <div className="w-full px-4 pb-6 pt-2 sm:px-6 md:pb-8 lg:px-10 2xl:px-14 [container-type:inline-size]">
        <p
          aria-hidden
          className="font-display wdth-wide select-none whitespace-nowrap text-center text-[19cqw] font-extrabold leading-[0.95] tracking-[-0.04em] text-formwork/[0.05]"
        >
          JOEPRO
        </p>
      </div>
    </footer>
  );
}