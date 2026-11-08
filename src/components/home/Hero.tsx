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
   BACKGROUND IMAGE: the photo sits under a steel scrim so the light text
   stays readable. The top of the photo is left clear for the header.
   Set to `null` to fall back to a plain steel gradient with an amber glow.
--------------------------------------------------------------------------- */
const HERO_IMAGE: { src: string; alt: string } | null = {
  src: "/images/home-hero.png",
  alt: "Joepro Construction team at work on a building project in Durban",
};

// Each line is a list of parts so a single word can carry the accent colour.
const HEADLINE: { text: string; accent?: boolean }[][] = [
  [{ text: "Brickwork to roofing," }],
  [{ text: "done right in " }, { text: "Durban.", accent: true }],
];

// Bold only what customers care about most: price and timing.
const INTRO = (
  <>
    Quality workmanship, reliable service and{" "}
    <strong className="font-semibold text-formwork">
      affordable construction
    </strong>{" "}
    for homes and businesses. From small home improvements to larger builds,{" "}
    <strong className="font-semibold text-formwork">finished on time</strong>.
  </>
);

const { contact, services, yearsInIndustry } = siteConfig;
const area = contact.region.split(",")[0]; // "Shallcross"

// Proof points. Values come from siteConfig, so they never go stale.
const stats = [
  { value: yearsInIndustry, label: "years in the industry" },
  { value: String(services.length), label: "services, one reliable team" },
  { value: area, label: "Durban, local and on call" },
];

// Each headline line rises out of a mask, one after the other.
const line: Variants = {
  hidden: { y: "108%" },
  show: (i: number) => ({
    y: "0%",
    transition: {
      duration: DURATION.reveal,
      ease: EASE_COURSE,
      delay: 0.35 + i * 0.16,
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
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={ref}
        aria-labelledby="hero-heading"
        className="bg-steel-gradient relative isolate flex min-h-svh flex-col justify-end overflow-hidden text-formwork"
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
            {/* Readability scrim: clear at the top so the header and roof
                stay visible, building to solid steel behind the content. */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 top-[8%] -z-10 bg-gradient-to-b from-transparent via-steel/70 via-25% to-steel/95"
            />
          </>
        )}

        {/* soft amber glow, top right (only when there is no photo) */}
        {!HERO_IMAGE && (
          <div
            aria-hidden
            className="pointer-events-none absolute -right-[10%] -top-[15%] -z-10 size-[min(60rem,90vw)] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-hivis)_38%,transparent),transparent)]"
          />
        )}

        {/* Same horizontal padding scale as the header, so edges line up */}
        <div className="w-full px-4 pb-8 pt-32 sm:px-6 md:pb-10 md:pt-36 lg:px-10 2xl:px-14">
          {/* eyebrow: tells people what this is before they read the headline */}
          <motion.p
            custom={0.2}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-formwork/80 sm:text-sm"
          >
            <span
              aria-hidden
              className="h-0.5 w-8 shrink-0 bg-hivis"
            />
            Building and roofing contractor
          </motion.p>

          <h1
            id="hero-heading"
            className="font-display wdth-wide text-[clamp(2.1rem,5.4vw,5.75rem)] font-extrabold leading-[1] tracking-[-0.03em] [text-shadow:0_2px_28px_rgb(0_0_0/0.35)]"
          >
            {HEADLINE.map((parts, i) => (
              <span
                key={i}
                className="block overflow-hidden pb-[0.1em]"
              >
                <motion.span
                  custom={i}
                  variants={line}
                  initial="hidden"
                  animate="show"
                  className="block will-change-transform"
                >
                  {parts.map((part, j) => (
                    <span
                      key={j}
                      className={part.accent ? "text-hivis" : undefined}
                    >
                      {part.text}
                    </span>
                  ))}
                </motion.span>
              </span>
            ))}
          </h1>

          <div className="mt-8 grid gap-8 md:mt-12 lg:grid-cols-12 lg:items-end lg:gap-10">
            {/* message + action, kept together */}
            <div className="lg:col-span-6">
              <motion.p
                custom={0.85}
                variants={rise}
                initial="hidden"
                animate="show"
                className="max-w-[50ch] text-base leading-relaxed text-formwork/80 md:text-lg"
              >
                {INTRO}
              </motion.p>

              <motion.div
                custom={1.0}
                variants={rise}
                initial="hidden"
                animate="show"
                className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4"
              >
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
              </motion.div>
            </div>

            {/* proof: each stat sizes to its content and wraps when space runs
                out, so long values like "Shallcross" can never collide */}
            <motion.ul
              custom={1.15}
              variants={rise}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-x-8 gap-y-6 border-t border-formwork/15 pt-6 lg:col-span-6 lg:justify-self-end lg:border-0 lg:pt-0 xl:gap-x-12"
            >
              {stats.map((stat) => (
                <li
                  key={stat.label}
                  className="border-l-2 border-hivis pl-4"
                >
                  <span className="font-display wdth-wide block text-[clamp(1.5rem,2.4vw,2.4rem)] font-extrabold leading-none tracking-tight">
                    {stat.value}
                  </span>
                  <span className="mt-2 block max-w-[17ch] text-sm leading-snug text-formwork/70">
                    {stat.label}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* services ticker: every service in view, and indexable text */}
        <motion.div
          custom={1.3}
          variants={rise}
          initial="hidden"
          animate="show"
          className="border-t border-formwork/15 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
        >
          <div className="overflow-hidden py-4 md:py-5">
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
                      <span className="font-display wdth-wide px-6 text-xl font-extrabold tracking-tight text-formwork/75 md:px-8 md:text-3xl">
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
