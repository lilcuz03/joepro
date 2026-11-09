// src/components/about/AboutHero.tsx
"use client";

import Link from "next/link";
import { MotionConfig, motion, type Variants } from "motion/react";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { DURATION, EASE_SETTLE } from "@/lib/motion";

const { contact, yearsInIndustry } = siteConfig;
const area = contact.region.split(",")[0]; // "Shallcross"

// Proof points. Values come from siteConfig, so they never go stale.
const stats = [
  { value: yearsInIndustry, label: "years in the industry" },
  { value: String(services.length), label: "services, one reliable team" },
  { value: area, label: "Durban, local and on call" },
];

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_SETTLE, delay },
  }),
};

export function AboutHero() {
  return (
    <MotionConfig reducedMotion="user">
      {/* Pale on purpose: the fixed header uses dark text over a transparent
          bar, so a dark hero here would hide it. */}
      <section
        aria-labelledby="about-page-heading"
        className="bg-glow relative isolate overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40 lg:pb-24"
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
                About
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
                About us
              </motion.p>
              <motion.h1
                id="about-page-heading"
                custom={0.3}
                variants={rise}
                initial="hidden"
                animate="show"
                className="font-display wdth-wide text-[clamp(2.1rem,5.4vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em]"
              >
                A local builder you can{" "}
                <span className="box-decoration-clone rounded-lg bg-hivis px-[0.2em] text-steel">
                  trust
                </span>{" "}
                with the whole job.
              </motion.h1>
            </div>

            <motion.p
              custom={0.45}
              variants={rise}
              initial="hidden"
              animate="show"
              className="max-w-[46ch] text-base leading-relaxed text-girder md:text-lg lg:col-span-4 lg:justify-self-end"
            >
              <strong className="font-semibold text-steel">
                {siteConfig.name}
              </strong>{" "}
              is a building and roofing contractor based in {area}, Durban,
              looking after homes and businesses.
            </motion.p>
          </div>

          {/* proof: big numbers, small labels, amber rule as the marker */}
          <motion.ul
            custom={0.6}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-steel/15 pt-8 md:mt-16 xl:gap-x-14"
          >
            {stats.map((stat) => (
              <li
                key={stat.label}
                className="border-l-2 border-hivis pl-4"
              >
                <span className="font-display wdth-wide block text-[clamp(1.8rem,3vw,3rem)] font-extrabold leading-none tracking-tight">
                  {stat.value}
                </span>
                <span className="mt-2 block max-w-[20ch] text-sm leading-snug text-girder">
                  {stat.label}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>
    </MotionConfig>
  );
}
