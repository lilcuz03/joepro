// src/components/home/Hero.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  MotionConfig,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { QuoteButton } from "@/components/header/QuoteButton";
import { siteConfig } from "@/config/site";
import { DURATION, EASE_COURSE, EASE_SETTLE } from "@/lib/motion";

/* ---------------------------------------------------------------------------
   BACKGROUND IMAGE: the photo sits inside a rounded card under a steel scrim,
   so the light text stays readable on any photo. Set to `null` to fall back
   to a plain steel gradient.
--------------------------------------------------------------------------- */
const HERO_IMAGE: { src: string; alt: string } | null = {
  src: "/images/home-hero.png",
  alt: "Joepro Construction team at work on a building project in Durban",
};

// One entry per word, so the headline can wrap anywhere and each word still
// rises out of its own mask. `accent` colours a word amber.
const HEADLINE: { text: string; accent?: boolean }[] = [
  { text: "Brickwork" },
  { text: "to" },
  { text: "roofing," },
  { text: "done" },
  { text: "right" },
  { text: "in" },
  { text: "Durban.", accent: true },
];

// Bold only what customers care about most: price and timing.
const INTRO = (
  <>
    Quality workmanship, reliable service and{" "}
    <strong className="font-semibold text-formwork">
      affordable construction
    </strong>{" "}
    for homes and businesses,{" "}
    <strong className="font-semibold text-formwork">finished on time</strong>.
  </>
);

const { contact, services, yearsInIndustry } = siteConfig;
const area = contact.region.split(",")[0]; // "Shallcross"

// Proof points. Values come from siteConfig, so they never go stale.
const stats = [
  { value: yearsInIndustry, label: "years in the industry" },
  { value: String(services.length), label: "services, one team" },
  { value: contact.city, label: `based in ${area}` },
];

// Each word slides up out of its own mask, one after the other.
const word: Variants = {
  hidden: { y: "115%" },
  show: (i: number) => ({
    y: "0%",
    transition: {
      duration: DURATION.reveal,
      ease: EASE_COURSE,
      delay: 0.25 + i * 0.07,
    },
  }),
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_SETTLE, delay },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Photo drifts slower than the page; the card eases in slightly as you scroll.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={ref}
        aria-labelledby="hero-heading"
        className="bg-formwork pb-2 pt-20 md:pt-24"
      >
        {/* Same horizontal padding scale as the header, so edges line up */}
        <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
          <motion.div
            style={{ scale: cardScale, transformOrigin: "50% 0%" }}
            className="bg-steel-gradient relative isolate flex min-h-[max(34rem,calc(100svh_-_6.5rem))] flex-col justify-between gap-12 overflow-hidden rounded-[1.75rem] p-5 text-formwork sm:rounded-[2.25rem] sm:p-8 md:min-h-[max(38rem,calc(100svh_-_8rem))] lg:rounded-[2.75rem] lg:p-12"
          >
            {/* Background photo (optional) */}
            {HERO_IMAGE && (
              <>
                <motion.div
                  style={{ y: imageY, scale: imageScale }}
                  className="absolute inset-0 -z-20"
                >
                  <Image
                    src={HERO_IMAGE.src}
                    alt={HERO_IMAGE.alt}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                  />
                </motion.div>
                {/* Readability scrim: lighter at the top so the photo shows,
                    building to near-solid steel behind the text. */}
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-steel/95 via-steel/65 to-steel/25"
                />
              </>
            )}

            {/* Top: small glass label */}
            <motion.div
              custom={0.1}
              variants={rise}
              initial="hidden"
              animate="show"
            >
              <p className="inline-flex items-center gap-2.5 rounded-full border border-formwork/20 bg-formwork/10 px-3.5 py-2 text-xs font-medium backdrop-blur-md sm:text-sm">
                <span
                  aria-hidden
                  className="relative flex size-2"
                >
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-hivis opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-hivis" />
                </span>
                Building and roofing contractor
              </p>
            </motion.div>

            {/* Bottom: headline, message, action, proof */}
            <div>
              <h1
                id="hero-heading"
                className="font-display wdth-wide text-[clamp(2.25rem,8.4vw,4.5rem)] font-extrabold leading-[1.04] tracking-[-0.03em] [text-shadow:0_2px_28px_rgb(0_0_0/0.3)] lg:text-[clamp(3rem,5.6vw,6rem)]"
              >
                {HEADLINE.map((item, i) => (
                  <span key={i}>
                    <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                      <motion.span
                        custom={i}
                        variants={word}
                        initial="hidden"
                        animate="show"
                        className={
                          "inline-block will-change-transform" +
                          (item.accent ? " text-hivis" : "")
                        }
                      >
                        {item.text}
                      </motion.span>
                    </span>
                    {i < HEADLINE.length - 1 ? " " : null}
                  </span>
                ))}
              </h1>

              <div className="mt-7 grid gap-8 md:mt-10 lg:grid-cols-12 lg:items-end lg:gap-10">
                <div className="lg:col-span-7">
                  <motion.p
                    custom={0.9}
                    variants={rise}
                    initial="hidden"
                    animate="show"
                    className="max-w-[44ch] text-base leading-relaxed text-formwork/80 md:text-lg"
                  >
                    {INTRO}
                  </motion.p>

                  <motion.div
                    custom={1.0}
                    variants={rise}
                    initial="hidden"
                    animate="show"
                    className="mt-6 flex items-center gap-3 sm:gap-4"
                  >
                    <QuoteButton
                      href={siteConfig.cta.href}
                      label="Get a free quote"
                      tone="accent"
                    />
                    {/* round icon on phones, full label from sm up */}
                    <a
                      href={`tel:${contact.phoneHref}`}
                      className="inline-flex size-12 shrink-0 items-center justify-center gap-2.5 rounded-full border border-formwork/30 bg-formwork/10 font-medium text-formwork backdrop-blur-md transition-colors duration-300 ease-course hover:border-hivis hover:bg-hivis hover:text-steel focus-visible:border-hivis focus-visible:bg-hivis focus-visible:text-steel sm:w-auto sm:px-5"
                    >
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        className="size-5 sm:size-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span className="sr-only sm:not-sr-only">
                        Call{" "}
                        <span className="font-semibold">{contact.phone}</span>
                      </span>
                    </a>
                  </motion.div>
                </div>

                {/* proof: one frosted bar, three stats */}
                <motion.ul
                  custom={1.15}
                  variants={rise}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-3 divide-x divide-formwork/15 rounded-2xl border border-formwork/15 bg-formwork/10 backdrop-blur-md lg:col-span-5"
                >
                  {stats.map((stat) => (
                    <li
                      key={stat.label}
                      className="min-w-0 px-3 py-3.5 sm:px-5 sm:py-4"
                    >
                      <span className="font-display block text-xl font-extrabold leading-none tracking-tight sm:text-2xl lg:text-3xl">
                        {stat.value}
                      </span>
                      <span className="mt-1.5 block text-xs leading-snug text-formwork/70 sm:text-sm">
                        {stat.label}
                      </span>
                    </li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* services ticker: every service in view, and indexable text */}
        <motion.div
          custom={1.3}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mt-5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] md:mt-7"
        >
          <div className="overflow-hidden py-3 md:py-4">
            <motion.div
              className="flex w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 45, ease: "linear", repeat: Infinity }}
            >
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  aria-hidden={copy === 1 ? true : undefined}
                  aria-label={copy === 0 ? "Our services" : undefined}
                  className="flex shrink-0 items-center"
                >
                  {services.map((name) => (
                    <li
                      key={name}
                      className="flex items-center"
                    >
                      <span className="font-display wdth-wide px-6 text-xl font-extrabold tracking-tight text-steel/70 md:px-8 md:text-3xl">
                        {name}
                      </span>
                      <span
                        aria-hidden
                        className="h-6 w-0.5 rotate-[20deg] bg-hivis"
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
