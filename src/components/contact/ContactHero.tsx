// src/components/contact/ContactHero.tsx
"use client";

import Link from "next/link";
import { MotionConfig, motion, type Variants } from "motion/react";
import { siteConfig } from "@/config/site";
import { DURATION, EASE_SETTLE } from "@/lib/motion";

const { contact } = siteConfig;

const whatsappHref = `https://wa.me/${contact.phoneHref.replace(/\D/g, "")}?text=${encodeURIComponent(
  `Hi ${siteConfig.shortName}, I'd like a quote please.`,
)}`;

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_SETTLE, delay },
  }),
};

export function ContactHero() {
  return (
    <MotionConfig reducedMotion="user">
      {/* Pale on purpose: the fixed header uses dark text over a transparent
          bar, so a dark hero here would hide it. */}
      <section
        aria-labelledby="contact-page-heading"
        className="bg-glow relative isolate overflow-hidden pb-12 pt-32 md:pb-16 md:pt-40"
      >
        {/* Same horizontal padding scale as the header and every section */}
        <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
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
                Contact
              </li>
            </ol>
          </motion.nav>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-8">
              <motion.h1
                id="contact-page-heading"
                custom={0.2}
                variants={rise}
                initial="hidden"
                animate="show"
                className="font-display wdth-wide text-[clamp(2.1rem,5.4vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em]"
              >
                Contact{" "}
                <span className="box-decoration-clone rounded-lg bg-hivis px-[0.2em] text-steel">
                  {siteConfig.shortName}
                </span>{" "}
                Construction.
              </motion.h1>
            </div>

            <motion.div
              custom={0.35}
              variants={rise}
              initial="hidden"
              animate="show"
              className="lg:col-span-4 lg:justify-self-end"
            >
              <p className="max-w-[46ch] text-base leading-relaxed text-girder md:text-lg">
                Call, WhatsApp or send the form below. We are based in{" "}
                {contact.region.split(",")[0]} and give{" "}
                <strong className="font-semibold text-steel">
                  free quotes
                </strong>{" "}
                across Durban.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="inline-flex min-h-12 items-center rounded-full bg-hivis px-6 font-semibold text-steel transition-colors duration-300 ease-course hover:bg-hivis-deep"
                >
                  Call {contact.phone}
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center rounded-full border border-steel/25 px-6 font-semibold transition-colors duration-300 ease-course hover:border-hivis hover:bg-hivis hover:text-steel"
                >
                  WhatsApp us
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
