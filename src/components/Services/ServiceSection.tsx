// src/components/services/ServiceSection.tsx
"use client";

import Image from "next/image";
import { MotionConfig, motion, type Variants } from "motion/react";
import { QuoteButton } from "@/components/header/QuoteButton";
import { siteConfig } from "@/config/site";
import type { Service } from "@/config/services";
import type { ServiceDetail } from "@/config/service-details";
import { DURATION, EASE_SETTLE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const { contact } = siteConfig;

// Placeholder gradients, cycled. They only show while a service has no photo.
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
    transition: { duration: DURATION.slow, ease: EASE_SETTLE, delay: i * 0.1 },
  }),
};

const inView = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "0px 0px -80px 0px" },
} as const;

type Props = {
  service: Service;
  detail: ServiceDetail | undefined;
  index: number;
  total: number;
};

export function ServiceSection({ service, detail, index, total }: Props) {
  const flip = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <MotionConfig reducedMotion="user">
      <section
        id={service.slug}
        aria-labelledby={`${service.slug}-heading`}
        className={cn(
          "scroll-mt-24 border-t border-steel/10 py-16 md:py-24",
          flip ? "bg-concrete/35" : "bg-formwork",
        )}
      >
        {/* Same horizontal padding scale as the header and every section */}
        <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            {/* ---------------------------------------------------------
                Photo (gradient until a real photo is added)
            --------------------------------------------------------- */}
            <motion.div
              custom={0}
              variants={reveal}
              {...inView}
              className={cn("lg:col-span-6", flip && "lg:order-last")}
            >
              <div className="relative isolate aspect-[4/3] overflow-hidden rounded-3xl">
                <div
                  aria-hidden={service.image ? undefined : true}
                  className={cn(
                    "absolute inset-0",
                    !service.image && TONES[index % TONES.length],
                  )}
                >
                  {service.image && (
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>

                {!service.image && (
                  <>
                    <div
                      aria-hidden
                      className="absolute inset-0 [background-image:linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:36px_36px]"
                    />
                    <span
                      aria-hidden
                      className="font-display wdth-wide absolute bottom-3 right-5 text-[clamp(5rem,12vw,10rem)] font-extrabold leading-none tracking-tighter text-formwork/10"
                    >
                      {number}
                    </span>
                  </>
                )}
              </div>
            </motion.div>

            {/* ---------------------------------------------------------
                Content
            --------------------------------------------------------- */}
            <motion.div
              custom={1}
              variants={reveal}
              {...inView}
              className="lg:col-span-6"
            >
              <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-girder sm:text-sm">
                <span
                  aria-hidden
                  className="h-0.5 w-8 shrink-0 bg-hivis"
                />
                Service {number} of {total}
              </p>

              <h2
                id={`${service.slug}-heading`}
                className="font-display wdth-wide text-[clamp(1.8rem,3.8vw,3.5rem)] font-extrabold leading-[1.04] tracking-[-0.03em]"
              >
                {service.name} in Durban
              </h2>

              <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-girder md:text-lg">
                {detail?.intro ?? service.summary}
              </p>

              {detail && detail.includes.length > 0 && (
                <div className="mt-7">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-steel">
                    What&apos;s included
                  </h3>
                  <ul
                    role="list"
                    className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2"
                  >
                    {detail.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-base leading-snug"
                      >
                        <span
                          aria-hidden
                          className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-hivis text-steel"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="size-3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
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
                  <span className="sr-only">
                    {" "}
                    about {service.name.toLowerCase()}
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
