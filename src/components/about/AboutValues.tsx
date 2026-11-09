// src/components/about/AboutValues.tsx
"use client";

import { MotionConfig, motion, type Variants } from "motion/react";
import { siteConfig } from "@/config/site";
import { DURATION, EASE_SETTLE } from "@/lib/motion";

const area = siteConfig.contact.region.split(",")[0]; // "Shallcross"

const icons = {
  quality: "M20 6 9 17l-5-5",
  time: "M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z",
  price:
    "M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
  local:
    "M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
} as const;

// Only claims already used on the rest of the site.
const values: { title: string; text: string; icon: keyof typeof icons }[] = [
  {
    title: "Quality workmanship",
    text: "Every job is built straight, square and finished to last.",
    icon: "quality",
  },
  {
    title: "Finished on time",
    text: "We agree a schedule up front and work to it, so your project doesn't drag on.",
    icon: "time",
  },
  {
    title: "Affordable pricing",
    text: "Clear, free quotes for small home repairs and larger builds alike.",
    icon: "price",
  },
  {
    title: "Local and on call",
    text: `Based in ${area} and working across Durban, so we are close when you need us.`,
    icon: "local",
  },
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_SETTLE, delay: i * 0.08 },
  }),
};

const inView = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "0px 0px -80px 0px" },
} as const;

export function AboutValues() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="values-heading"
        className="bg-steel-gradient relative isolate overflow-hidden py-16 text-formwork md:py-24 lg:py-28"
      >
        {/* Same horizontal padding scale as the header and every section */}
        <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-8">
              <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-formwork/70 sm:text-sm">
                <span
                  aria-hidden
                  className="h-0.5 w-8 shrink-0 bg-hivis"
                />
                How we work
              </p>
              <h2
                id="values-heading"
                className="font-display wdth-wide text-[clamp(1.9rem,4.6vw,4.5rem)] font-extrabold leading-[1.04] tracking-[-0.03em]"
              >
                What you can{" "}
                <span className="box-decoration-clone rounded-lg bg-hivis px-[0.2em] text-steel">
                  expect
                </span>{" "}
                from us.
              </h2>
            </div>
            <p className="max-w-[46ch] text-base leading-relaxed text-formwork/75 md:text-lg lg:col-span-4 lg:justify-self-end">
              Four things we aim to get right on every job, big or small.
            </p>
          </div>

          <ul
            role="list"
            className="mt-12 grid gap-3 sm:grid-cols-2 md:mt-16 md:gap-4 lg:grid-cols-4 lg:gap-5"
          >
            {values.map((value, i) => (
              <motion.li
                key={value.title}
                custom={i}
                variants={reveal}
                {...inView}
                className="group rounded-3xl border border-formwork/15 bg-formwork/[0.04] p-6 transition-[transform,border-color] duration-500 ease-settle hover:-translate-y-1 hover:border-hivis md:p-7"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-full border border-formwork/30 text-formwork transition-colors duration-300 ease-course group-hover:border-hivis group-hover:bg-hivis group-hover:text-steel">
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={icons[value.icon]} />
                  </svg>
                </span>
                <h3 className="font-display wdth-wide mt-5 text-xl font-extrabold leading-tight tracking-tight md:text-2xl">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-formwork/75 md:text-base">
                  {value.text}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </MotionConfig>
  );
}
