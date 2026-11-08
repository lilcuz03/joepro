// src/components/home/About.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion, type Variants } from "motion/react";
import { QuoteButton } from "@/components/header/QuoteButton";
import { siteConfig } from "@/config/site";
import { DURATION, EASE_SETTLE } from "@/lib/motion";

/* ---------------------------------------------------------------------------
   PHOTO: add a picture of the owner or the team at work to
   /public/images/about.jpg, then replace `null` with:
     { src: "/images/about.jpg", alt: "Joepro Construction builder laying brickwork on a home in Shallcross" }
   Portrait or square photos work best. Write alt text that says what is in
   the photo and where; it helps search and screen readers.
--------------------------------------------------------------------------- */
const ABOUT_IMAGE: { src: string; alt: string } | null = null;

const { contact, yearsInIndustry } = siteConfig;
const area = contact.region.split(",")[0]; // "Shallcross"

const icons = {
  quality: "M20 6 9 17l-5-5",
  time: "M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z",
  price:
    "M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
  local:
    "M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
} as const;

const reasons: { title: string; text: string; icon: keyof typeof icons }[] = [
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
    text: "Clear quotes for small home repairs and larger builds alike.",
    icon: "price",
  },
  {
    title: "Local and on call",
    text: `Based in ${area} and working across Durban, so we are close when you need us.`,
    icon: "local",
  },
];

const steps = [
  {
    title: "Tell us about the job",
    text: "Call or send a message with what you need done.",
  },
  {
    title: "Get a free quote",
    text: "We look at the work and give you a clear price.",
  },
  {
    title: "We get it done",
    text: "The job is completed properly and handed over on time.",
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

function Icon({ path }: { path: string }) {
  return (
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
      <path d={path} />
    </svg>
  );
}

export function About() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="about"
        aria-labelledby="about-heading"
        className="relative scroll-mt-24 bg-concrete/35 py-20 md:py-28 lg:py-32"
      >
        {/* Same horizontal padding scale as the header, hero and services */}
        <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            {/* ---------------------------------------------------------
                Photo panel (gradient until a real photo is added)
            --------------------------------------------------------- */}
            <motion.div
              custom={0}
              variants={reveal}
              {...inView}
              className="relative lg:col-span-5"
            >
              <div className="bg-steel-gradient relative isolate aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[16/11] lg:aspect-[4/5]">
                {ABOUT_IMAGE ? (
                  <>
                    <Image
                      src={ABOUT_IMAGE.src}
                      alt={ABOUT_IMAGE.alt}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="-z-20 object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 -z-10 bg-gradient-to-t from-steel/70 via-transparent to-transparent"
                    />
                  </>
                ) : (
                  <>
                    <div
                      aria-hidden
                      className="absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:36px_36px]"
                    />
                    <span
                      aria-hidden
                      className="font-display wdth-wide absolute inset-0 flex items-center justify-center text-[clamp(6rem,22vw,14rem)] font-extrabold tracking-tighter text-formwork/10"
                    >
                      {siteConfig.initials}
                    </span>
                  </>
                )}
              </div>

              {/* the one amber block on the image: the focal point */}
              <div className="absolute -bottom-5 left-4 rounded-2xl bg-hivis px-6 py-4 text-steel shadow-[0_12px_32px_-12px_rgba(31,39,44,0.5)] sm:left-6 lg:-right-4 lg:left-auto">
                <span className="font-display wdth-wide block text-4xl font-extrabold leading-none tracking-tight md:text-5xl">
                  {yearsInIndustry}
                </span>
                <span className="mt-1.5 block text-sm font-semibold leading-snug">
                  years in the industry
                </span>
              </div>
            </motion.div>

            {/* ---------------------------------------------------------
                Story
            --------------------------------------------------------- */}
            <div className="mt-4 lg:col-span-7 lg:mt-0">
              <motion.div
                custom={1}
                variants={reveal}
                {...inView}
              >
                <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-girder sm:text-sm">
                  <span
                    aria-hidden
                    className="h-0.5 w-8 shrink-0 bg-hivis"
                  />
                  About {siteConfig.shortName}
                </p>
                <h2
                  id="about-heading"
                  className="font-display wdth-wide text-[clamp(1.9rem,4.2vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.03em]"
                >
                  A local builder you can{" "}
                  <span className="box-decoration-clone rounded-lg bg-hivis px-[0.2em] text-steel">
                    trust
                  </span>{" "}
                  with the whole job.
                </h2>
                <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-girder md:text-lg">
                  <strong className="font-semibold text-steel">
                    {siteConfig.name}
                  </strong>{" "}
                  is a building and roofing contractor based in {area}, Durban.
                  With {yearsInIndustry} years in the industry, we take on
                  brickwork, roofs, paving, tiling, plumbing, carports,
                  waterproofing, ceilings and driveways for homes and
                  businesses, from small repairs to larger builds.
                </p>
              </motion.div>

              {/* reasons: 2x2 grid, icon + short title + one line */}
              <ul
                role="list"
                className="mt-10 grid gap-3 sm:grid-cols-2 md:gap-4"
              >
                {reasons.map((reason, i) => (
                  <motion.li
                    key={reason.title}
                    custom={i + 2}
                    variants={reveal}
                    {...inView}
                    className="group rounded-2xl border border-steel/10 bg-formwork p-5 transition-[transform,border-color] duration-500 ease-settle hover:-translate-y-1 hover:border-hivis md:p-6"
                  >
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-steel text-formwork transition-colors duration-300 ease-course group-hover:bg-hivis group-hover:text-steel">
                      <Icon path={icons[reason.icon]} />
                    </span>
                    <h3 className="font-display wdth-wide mt-4 text-lg font-extrabold leading-tight tracking-tight md:text-xl">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-girder md:text-base">
                      {reason.text}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* -----------------------------------------------------------
              How it works: answers "what happens when I get in touch?"
          ----------------------------------------------------------- */}
          <div className="mt-16 border-t border-steel/15 pt-10 md:mt-24 md:pt-14">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h3 className="font-display wdth-wide text-2xl font-extrabold leading-tight tracking-tight md:text-4xl">
                How it works
              </h3>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <QuoteButton
                  href={siteConfig.cta.href}
                  label="Get a free quote"
                  tone="accent"
                />
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 py-2 font-semibold"
                >
                  <span className="relative">
                    More about us
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-50 bg-hivis transition-transform duration-500 ease-course group-hover:scale-x-100"
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

            <ol className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3 md:gap-6">
              {steps.map((step, i) => (
                <motion.li
                  key={step.title}
                  custom={i}
                  variants={reveal}
                  {...inView}
                  className="relative border-l-2 border-hivis pl-5"
                >
                  <span
                    aria-hidden
                    className="font-display wdth-wide text-sm font-bold tracking-widest text-girder"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-display wdth-wide mt-2 text-xl font-extrabold leading-tight tracking-tight">
                    {step.title}
                  </h4>
                  <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-girder md:text-base">
                    {step.text}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
