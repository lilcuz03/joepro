// src/components/contact/ServiceArea.tsx
"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";

const { contact } = siteConfig;

// Only the suburbs you are sure about. Add more as Joe confirms them, e.g.
// "Chatsworth", "Umhlanga". Each one is local-search keyword text.
const AREAS = [contact.region.split(",")[0], contact.city] as const;

const address = `${contact.streetAddress}, ${contact.city}`;
const query = encodeURIComponent(`${siteConfig.name}, ${address}`);
const embedSrc = `https://www.google.com/maps?q=${query}&z=15&output=embed`;
const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

export function ServiceArea() {
  // The map is locked until tapped, so it can't hijack page scrolling.
  const [active, setActive] = useState(false);

  return (
    <section
      aria-labelledby="area-heading"
      className="bg-concrete/35 py-16 md:py-24 lg:py-28"
    >
      {/* Same horizontal padding scale as the header and every section */}
      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
        {/* ---------------------------------------------------------
            Heading
        --------------------------------------------------------- */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-girder sm:text-sm">
              <span
                aria-hidden
                className="h-0.5 w-8 shrink-0 bg-hivis"
              />
              Where we work
            </p>
            <h2
              id="area-heading"
              className="font-display wdth-wide text-[clamp(1.9rem,4.6vw,4.5rem)] font-extrabold leading-[1.04] tracking-[-0.03em]"
            >
              Based in {AREAS[0]},{" "}
              <span className="box-decoration-clone rounded-lg bg-hivis px-[0.2em] text-steel">
                working across Durban
              </span>
              .
            </h2>
          </div>
          <p className="max-w-[46ch] text-base leading-relaxed text-girder md:text-lg lg:col-span-4 lg:justify-self-end">
            Not sure we cover your suburb? Call us with the address and we will
            tell you straight away.
          </p>
        </div>

        {/* ---------------------------------------------------------
            Map on top; the info card sits BELOW it on phones and tablets
            and only floats over the map's bottom left from lg up.
        --------------------------------------------------------- */}
        <div className="relative mt-10 md:mt-14">
          <div className="relative h-[22rem] overflow-hidden rounded-3xl border border-steel/10 bg-concrete shadow-[0_24px_60px_-30px_rgba(31,39,44,0.35)] sm:h-[30rem] lg:h-[min(46rem,80svh)]">
            <iframe
              title={`Map showing ${siteConfig.name} at ${address}`}
              src={embedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className={
                "absolute inset-0 size-full border-0 " +
                (active ? "" : "pointer-events-none")
              }
            />

            {/* locked state: tap to start using the map.
                The pill sits at the bottom (top right from lg) because Google
                puts the pin in the exact centre of the map. */}
            {!active && (
              <button
                type="button"
                onClick={() => setActive(true)}
                aria-label="Activate the map so you can zoom and drag it"
                className="group absolute inset-0 z-10 flex items-end justify-center bg-steel/10 p-4 transition-colors duration-300 ease-course hover:bg-steel/20 focus-visible:outline-offset-[-4px] lg:items-start lg:justify-end"
              >
                <span className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-steel px-6 text-sm font-semibold text-formwork shadow-[0_8px_30px_-8px_rgba(31,39,44,0.6)] transition-colors duration-300 ease-course group-hover:bg-hivis group-hover:text-steel sm:text-base">
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                  </svg>
                  Tap to explore the map
                </span>
              </button>
            )}

            {/* unlocked state: one tap to give page scrolling back */}
            {active && (
              <button
                type="button"
                onClick={() => setActive(false)}
                className="absolute right-3 top-3 z-10 inline-flex min-h-11 items-center rounded-full bg-steel px-5 text-sm font-semibold text-formwork shadow-[0_8px_24px_-8px_rgba(31,39,44,0.6)] transition-colors duration-300 ease-course hover:bg-hivis hover:text-steel sm:right-4 sm:top-4"
              >
                Done
                <span className="sr-only"> exploring the map</span>
              </button>
            )}
          </div>

          {/* info card: full width under the map below lg, floating over the
              map's bottom left from lg */}
          <div className="relative z-20 mt-4 rounded-3xl border border-steel/10 bg-white p-5 shadow-[0_24px_60px_-24px_rgba(31,39,44,0.45)] sm:p-6 md:p-7 lg:absolute lg:bottom-6 lg:left-6 lg:m-0 lg:w-[26rem] xl:bottom-8 xl:left-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-girder">
              Visit or call us
            </p>
            <address className="mt-3 not-italic">
              <p className="font-display wdth-wide text-xl font-extrabold leading-snug tracking-tight md:text-2xl">
                {siteConfig.name}
              </p>
              <p className="mt-1.5 text-base leading-relaxed text-girder">
                {address}
              </p>
            </address>

            <ul
              role="list"
              className="mt-4 flex flex-wrap gap-2"
            >
              {AREAS.map((area) => (
                <li
                  key={area}
                  className="inline-flex min-h-10 items-center rounded-full border border-steel/20 bg-formwork px-4 text-sm font-medium transition-colors duration-300 ease-course hover:border-hivis hover:bg-hivis"
                >
                  {area}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center rounded-full bg-hivis px-6 font-semibold text-steel transition-colors duration-300 ease-course hover:bg-hivis-deep"
              >
                Get directions
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href={`tel:${contact.phoneHref}`}
                className="inline-flex min-h-12 items-center rounded-full border border-steel/25 px-5 font-semibold transition-colors duration-300 ease-course hover:border-hivis hover:bg-hivis hover:text-steel"
              >
                Call {contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
