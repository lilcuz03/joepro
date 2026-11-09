// src/components/home/Reviews.tsx
"use client";

import Script from "next/script";
import { MotionConfig, motion, type Variants } from "motion/react";
import { DURATION, EASE_SETTLE } from "@/lib/motion";

/* ---------------------------------------------------------------------------
   GOOGLE LINKS (optional, but worth doing):
   1. Open the Google Business Profile for Joepro Construction.
   2. Copy the "Share review form" link into REVIEW_URL (lets happy customers
      leave a review in one tap).
   3. Copy the Maps listing link into LISTING_URL (shows all reviews).
   While these are `null`, the buttons below are hidden.
--------------------------------------------------------------------------- */
const REVIEW_URL: string | null = null;
const LISTING_URL: string | null = null;

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_SETTLE, delay: i * 0.1 },
  }),
};

const inView = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "0px 0px -80px 0px" },
} as const;

function PillLink({
  href,
  children,
  filled,
}: {
  href: string;
  children: React.ReactNode;
  filled?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        filled
          ? "inline-flex min-h-12 items-center rounded-full bg-hivis px-6 font-semibold text-steel transition-colors duration-300 ease-course hover:bg-hivis-deep"
          : "inline-flex min-h-12 items-center rounded-full border border-steel/25 px-6 font-semibold transition-colors duration-300 ease-course hover:border-hivis hover:bg-hivis hover:text-steel"
      }
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function Reviews() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="reviews"
        aria-labelledby="reviews-heading"
        className="relative scroll-mt-24 bg-concrete/35 py-20 md:py-28 lg:py-32"
      >
        {/* Loaded once, only after the page is idle. Next.js de-duplicates
            it if you ever add a second Elfsight widget elsewhere. */}
        <Script
          src="https://elfsightcdn.com/platform.js"
          strategy="lazyOnload"
        />

        {/* Same horizontal padding scale as the header and other sections */}
        <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
          {/* ---------------------------------------------------------
              Heading
          --------------------------------------------------------- */}
          <motion.div
            custom={0}
            variants={reveal}
            {...inView}
            className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10"
          >
            <div className="lg:col-span-8">
              <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-girder sm:text-sm">
                <span
                  aria-hidden
                  className="h-0.5 w-8 shrink-0 bg-hivis"
                />
                Google reviews
              </p>
              <h2
                id="reviews-heading"
                className="font-display wdth-wide text-[clamp(1.9rem,4.6vw,4.5rem)] font-extrabold leading-[1.04] tracking-[-0.03em]"
              >
                What our{" "}
                <span className="box-decoration-clone rounded-lg bg-hivis px-[0.2em] text-steel">
                  customers
                </span>{" "}
                say about us.
              </h2>
            </div>

            <div className="lg:col-span-4 lg:justify-self-end">
              <p className="max-w-[46ch] text-base leading-relaxed text-girder md:text-lg">
                Real reviews from homes and businesses across Shallcross and
                Durban, straight from Google.
              </p>
            </div>
          </motion.div>

          {/* ---------------------------------------------------------
              Elfsight widget
              The min-height reserves space so the page doesn't jump when
              the widget appears. The placeholder cards are removed
              automatically once the widget has filled its container.
          --------------------------------------------------------- */}
          <motion.div
            custom={1}
            variants={reveal}
            {...inView}
            className="mt-12 min-h-[22rem] md:mt-16"
          >
            <div
              className="elfsight-app-e9d3b786-a4df-426c-8e2b-b7ada30a53d8 peer"
              data-elfsight-app-lazy
            />

            <div
              aria-hidden
              className="grid gap-4 peer-[:not(:empty)]:hidden sm:grid-cols-2 lg:grid-cols-3"
            >
              {[0, 1, 2].map((n) => (
                <div
                  key={n}
                  className={
                    "h-64 animate-pulse rounded-3xl bg-steel/[0.06] " +
                    (n === 2 ? "hidden lg:block" : "")
                  }
                />
              ))}
            </div>
          </motion.div>

          {/* ---------------------------------------------------------
              Links to Google (only shown once you add them above)
          --------------------------------------------------------- */}
          {(REVIEW_URL || LISTING_URL) && (
            <motion.div
              custom={2}
              variants={reveal}
              {...inView}
              className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4 md:mt-12"
            >
              {REVIEW_URL && (
                <PillLink
                  href={REVIEW_URL}
                  filled
                >
                  Leave a review
                </PillLink>
              )}
              {LISTING_URL && (
                <PillLink href={LISTING_URL}>
                  Read all reviews on Google
                </PillLink>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </MotionConfig>
  );
}
