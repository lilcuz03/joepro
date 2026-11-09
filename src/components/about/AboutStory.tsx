// src/components/about/AboutStory.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion, type Variants } from "motion/react";
import { QuoteButton } from "@/components/header/QuoteButton";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { DURATION, EASE_SETTLE } from "@/lib/motion";

/* ---------------------------------------------------------------------------
   PHOTO: add a picture of Joe or the team at work to
   /public/images/about-page.jpg, then replace `null` with:
     { src: "/images/about-page.jpg", alt: "Joepro Construction team working on a roof in Shallcross" }
   Portrait or square photos work best. Say what is in the photo and where.

   COPY: the text below only uses facts already on the site. Replace it with
   Joe's real story when you have it: how he started, what he is proud of,
   the kind of jobs he enjoys. Real detail beats polished wording.
--------------------------------------------------------------------------- */
const STORY_IMAGE: { src: string; alt: string } | null = null;

const { contact, yearsInIndustry } = siteConfig;
const area = contact.region.split(",")[0]; // "Shallcross"

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

export function AboutStory() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="story-heading"
        className="bg-concrete/35 py-16 md:py-24 lg:py-28"
      >
        {/* Same horizontal padding scale as the header and every section */}
        <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            {/* ---------------------------------------------------------
                Photo (gradient until a real photo is added)
            --------------------------------------------------------- */}
            <motion.div
              custom={0}
              variants={reveal}
              {...inView}
              className="relative lg:col-span-5"
            >
              <div className="bg-steel-gradient relative isolate aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[16/11] lg:aspect-[4/5]">
                {STORY_IMAGE ? (
                  <>
                    <Image
                      src={STORY_IMAGE.src}
                      alt={STORY_IMAGE.alt}
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
            <motion.div
              custom={1}
              variants={reveal}
              {...inView}
              className="mt-4 lg:col-span-7 lg:mt-0"
            >
              <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-girder sm:text-sm">
                <span
                  aria-hidden
                  className="h-0.5 w-8 shrink-0 bg-hivis"
                />
                Who we are
              </p>
              <h2
                id="story-heading"
                className="font-display wdth-wide text-[clamp(1.8rem,3.8vw,3.5rem)] font-extrabold leading-[1.04] tracking-[-0.03em]"
              >
                One reliable team for the whole job.
              </h2>

              <div className="mt-6 max-w-[60ch] space-y-4 text-base leading-relaxed text-girder md:text-lg">
                <p>
                  <strong className="font-semibold text-steel">
                    {siteConfig.name}
                  </strong>{" "}
                  is a building and roofing contractor based in {area}, Durban.
                  With {yearsInIndustry} years in the industry, we work on homes
                  and businesses across the city, from small home improvements
                  to larger builds.
                </p>
                <p>
                  Instead of hiring a different person for every trade, you deal
                  with one team. We handle brickwork, roofing, paving, tiling,
                  plumbing, carports, waterproofing, ceilings and driveways,
                  with quality workmanship, reliable service and affordable
                  pricing, finished on time.
                </p>
              </div>

              <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-steel">
                What we do
              </h3>
              <ul
                role="list"
                className="mt-4 flex flex-wrap gap-2"
              >
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services#${service.slug}`}
                      className="inline-flex min-h-11 items-center rounded-full border border-steel/20 bg-formwork px-4 text-sm font-medium transition-colors duration-300 ease-course hover:border-hivis hover:bg-hivis hover:text-steel focus-visible:border-hivis focus-visible:bg-hivis"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <QuoteButton
                  href={siteConfig.cta.href}
                  label="Get a free quote"
                  tone="accent"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
