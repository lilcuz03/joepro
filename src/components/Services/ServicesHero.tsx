// src/components/services/ServicesHero.tsx
"use client";

import Link from "next/link";
import { MotionConfig, motion, type Variants } from "motion/react";
import { QuoteButton } from "@/components/header/QuoteButton";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { DURATION, EASE_SETTLE } from "@/lib/motion";

const { contact } = siteConfig;

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_SETTLE, delay },
  }),
};

export function ServicesHero() {
  return (
    <MotionConfig reducedMotion="user">
      {/* Pale on purpose: the fixed header uses dark text over a transparent
          bar, so a dark hero here would hide it. */}
      <section
        aria-labelledby="services-page-heading"
        className="bg-glow relative isolate overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40 lg:pb-24"
      >
        {/* Same horizontal padding scale as the header and every section */}
        <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
          {/* breadcrumb: helps people and search engines place the page */}
          <motion.nav
            aria-label="Breadcrumb"
            custom={0.1}
            variants={rise}
            initial="hidden"
            animate="show"
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
                Services
              </li>
            </ol>
          </motion.nav>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-8">
              <motion.p
                custom={0.2}
                variants={rise}
                initial="hidden"
                animate="show"
                className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-girder sm:text-sm"
              >
                <span
                  aria-hidden
                  className="h-0.5 w-8 shrink-0 bg-hivis"
                />
                Our services
              </motion.p>
              <motion.h1
                id="services-page-heading"
                custom={0.3}
                variants={rise}
                initial="hidden"
                animate="show"
                className="font-display wdth-wide text-[clamp(2.1rem,5.4vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em]"
              >
                Building and roofing services in{" "}
                <span className="box-decoration-clone rounded-lg bg-hivis px-[0.2em] text-steel">
                  Durban
                </span>
                .
              </motion.h1>
            </div>

            <motion.div
              custom={0.45}
              variants={rise}
              initial="hidden"
              animate="show"
              className="lg:col-span-4 lg:justify-self-end"
            >
              <p className="max-w-[46ch] text-base leading-relaxed text-girder md:text-lg">
                <strong className="font-semibold text-steel">
                  {siteConfig.name}
                </strong>{" "}
                handles brickwork, roofing, paving, tiling, plumbing and more
                for homes and businesses in {contact.region.split(",")[0]} and
                across Durban, from small repairs to larger builds.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                <QuoteButton
                  href={siteConfig.cta.href}
                  label="Get a free quote"
                  tone="accent"
                />
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="inline-flex min-h-12 items-center rounded-full border border-steel/25 px-5 font-semibold transition-colors duration-300 ease-course hover:border-hivis hover:bg-hivis hover:text-steel"
                >
                  Call {contact.phone}
                </a>
              </div>
            </motion.div>
          </div>

          {/* jump chips: one tap to the service you came for */}
          <motion.nav
            aria-label="Jump to a service"
            custom={0.6}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-12 border-t border-steel/15 pt-6 md:mt-16"
          >
            <p className="mb-4 text-sm font-semibold text-girder">
              Jump to a service
            </p>
            <ul className="flex flex-wrap gap-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <a
                    href={`#${service.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-steel/20 bg-formwork/70 px-4 text-sm font-medium transition-colors duration-300 ease-course hover:border-hivis hover:bg-hivis hover:text-steel focus-visible:border-hivis focus-visible:bg-hivis"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>
      </section>
    </MotionConfig>
  );
}
