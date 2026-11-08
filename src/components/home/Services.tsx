// src/components/home/Services.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion, type Variants } from "motion/react";
import { QuoteButton } from "@/components/header/QuoteButton";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { DURATION, EASE_SETTLE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const { contact } = siteConfig;

// Gradient placeholders, cycled across the cards. They only show while a
// service has no photo. All are dark enough for light text.
const TONES = [
  "bg-[radial-gradient(80%_70%_at_85%_8%,color-mix(in_oklab,var(--color-hivis)_45%,transparent),transparent_70%),linear-gradient(160deg,var(--color-girder),var(--color-steel))]",
  "bg-[linear-gradient(135deg,var(--color-steel)_0%,var(--color-girder)_100%)]",
  "bg-[radial-gradient(70%_60%_at_10%_95%,color-mix(in_oklab,var(--color-hivis)_35%,transparent),transparent_70%),linear-gradient(135deg,var(--color-steel),color-mix(in_oklab,var(--color-steel)_70%,var(--color-girder)))]",
  "bg-[linear-gradient(160deg,var(--color-girder)_0%,var(--color-steel)_100%)]",
] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE_SETTLE,
      delay: (i % 4) * 0.08,
    },
  }),
};

// Structured data: tells search engines which services this business offers
// and where. Rendered into the server HTML, so crawlers see it.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${siteConfig.name} services`,
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.name,
      description: service.summary,
      url: `${siteConfig.url}/services#${service.slug}`,
      areaServed: { "@type": "City", name: "Durban" },
      provider: {
        "@type": "GeneralContractor",
        name: siteConfig.name,
        url: siteConfig.url,
        telephone: `+${contact.phoneHref.replace(/^\+/, "")}`,
      },
    },
  })),
};

export function Services() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="services"
        aria-labelledby="services-heading"
        className="relative bg-formwork py-20 md:py-28 lg:py-32"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />

        {/* Same horizontal padding scale as the header and hero */}
        <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
          {/* ------------------------------------------------------------
              Section heading: eyebrow, headline, supporting copy
          ------------------------------------------------------------ */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-8">
              <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-girder sm:text-sm">
                <span
                  aria-hidden
                  className="h-0.5 w-8 shrink-0 bg-hivis"
                />
                What we do
              </p>
              <h2
                id="services-heading"
                className="font-display wdth-wide text-[clamp(1.9rem,4.6vw,4.5rem)] font-extrabold leading-[1.04] tracking-[-0.03em]"
              >
                Everything your property needs, from one{" "}
                {/* amber block behind steel text: readable on a pale page */}
                <span className="box-decoration-clone rounded-lg bg-hivis px-[0.2em] text-steel">
                  Durban
                </span>{" "}
                team.
              </h2>
            </div>

            <div className="lg:col-span-4 lg:justify-self-end">
              <p className="max-w-[46ch] text-base leading-relaxed text-girder md:text-lg">
                From brickwork and roofs to paving, tiling and waterproofing,{" "}
                <strong className="font-semibold text-steel">
                  Joepro Construction
                </strong>{" "}
                handles the whole job in Shallcross and across Durban.
              </p>
              <Link
                href="/services"
                className="group mt-5 inline-flex items-center gap-2 py-2 font-semibold text-steel"
              >
                <span className="relative">
                  View all services
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-hivis transition-transform duration-500 ease-course group-hover:scale-x-100 sm:scale-x-50"
                  />
                </span>
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="size-4 transition-transform duration-500 ease-settle group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* ------------------------------------------------------------
              Bento grid: two feature cards, then compact cards
              1 col on phones, 2 on tablets, 12-col bento from lg
          ------------------------------------------------------------ */}
          <ul
            role="list"
            className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-16 md:gap-4 lg:grid-cols-12 lg:gap-5"
          >
            {services.map((service, i) => {
              const feature = i < 2;
              return (
                <motion.li
                  key={service.slug}
                  id={service.slug}
                  custom={i}
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                  className={cn(
                    "group relative isolate flex scroll-mt-24 overflow-hidden rounded-3xl text-formwork transition-transform duration-500 ease-settle hover:-translate-y-1",
                    feature
                      ? "min-h-[20rem] sm:col-span-1 sm:min-h-[24rem] lg:col-span-6 lg:min-h-[30rem]"
                      : "min-h-[15rem] sm:min-h-[17rem] lg:col-span-3 lg:min-h-[18rem]",
                  )}
                >
                  {/* photo when available, gradient until then */}
                  <div
                    aria-hidden={service.image ? undefined : true}
                    className={cn(
                      "absolute inset-0 -z-20 transition-transform duration-700 ease-settle group-hover:scale-105",
                      !service.image && TONES[i % TONES.length],
                    )}
                  >
                    {service.image && (
                      <Image
                        src={service.image.src}
                        alt={service.image.alt}
                        fill
                        sizes={
                          feature
                            ? "(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                            : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        }
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* faint blueprint grid: only on placeholders, so a missing
                      photo looks intentional */}
                  {!service.image && (
                    <div
                      aria-hidden
                      className="absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
                    />
                  )}

                  {/* scrim keeps the text readable on any photo */}
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-steel/90 via-steel/35 to-transparent"
                  />

                  <div className="flex w-full flex-col justify-between p-5 sm:p-6 md:p-8">
                    <span
                      aria-hidden
                      className="font-display wdth-wide text-sm font-bold tracking-widest text-formwork/60"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3
                          className={cn(
                            "font-display wdth-wide font-extrabold leading-tight tracking-tight",
                            feature ? "text-3xl md:text-4xl" : "text-2xl",
                          )}
                        >
                          {/* stretched link: the whole card is clickable */}
                          <Link
                            href={`/services#${service.slug}`}
                            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                          >
                            {service.name}
                            <span className="sr-only"> in Durban</span>
                          </Link>
                        </h3>
                        <p
                          className={cn(
                            "mt-3 text-sm leading-relaxed text-formwork/80 md:text-base",
                            feature ? "max-w-[44ch]" : "max-w-[34ch]",
                          )}
                        >
                          {service.summary}
                        </p>
                      </div>

                      {/* outline at rest, amber fill on hover */}
                      <span
                        aria-hidden
                        className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-formwork/40 text-formwork transition-colors duration-300 ease-course group-hover:border-hivis group-hover:bg-hivis group-hover:text-steel"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="size-4 -rotate-45 transition-transform duration-500 ease-settle group-hover:rotate-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* focus ring on the card, since the link's own outline is hidden */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-3xl ring-hivis group-focus-within:ring-2"
                  />
                </motion.li>
              );
            })}
          </ul>

          {/* ------------------------------------------------------------
              Closing call to action: dark panel so it reads as the action
          ------------------------------------------------------------ */}
          <div className="bg-steel-gradient relative isolate mt-12 overflow-hidden rounded-3xl p-6 text-formwork sm:p-8 md:mt-16 md:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
              <div>
                <p className="font-display wdth-wide max-w-[24ch] text-2xl font-extrabold leading-tight tracking-tight md:text-4xl">
                  Not sure which service you need?
                </p>
                <p className="mt-3 max-w-[48ch] text-base leading-relaxed text-formwork/75 md:text-lg">
                  Tell us about the job and we will point you in the right
                  direction. Quotes are free.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <QuoteButton
                  href={siteConfig.cta.href}
                  label="Get a free quote"
                  tone="accent"
                />
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="group inline-flex min-h-12 items-center gap-2.5 rounded-full border border-formwork/30 bg-formwork/10 px-5 font-medium text-formwork backdrop-blur-sm transition-colors duration-300 ease-course hover:border-hivis hover:bg-hivis hover:text-steel"
                >
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
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>
                    Call <span className="font-semibold">{contact.phone}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
