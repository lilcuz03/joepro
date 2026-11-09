// src/components/home/Faq.tsx
"use client";

import { useId, useState } from "react";
import { MotionConfig, motion, type Variants } from "motion/react";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd, faqs } from "@/config/faqs";
import { siteConfig } from "@/config/site";
import { DURATION, EASE_SETTLE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const { contact } = siteConfig;

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

export function Faq() {
  const uid = useId();
  // First question open by default so visitors see how it works.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="relative scroll-mt-24 bg-formwork py-20 md:py-28 lg:py-32"
      >
        <JsonLd data={faqJsonLd()} />

        {/* Same horizontal padding scale as the header and other sections */}
        <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* ---------------------------------------------------------
                Left: heading and a way to ask something else
            --------------------------------------------------------- */}
            <motion.div
              custom={0}
              variants={reveal}
              {...inView}
              className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start"
            >
              <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-girder sm:text-sm">
                <span
                  aria-hidden
                  className="h-0.5 w-8 shrink-0 bg-hivis"
                />
                FAQs
              </p>
              <h2
                id="faq-heading"
                className="font-display wdth-wide text-[clamp(1.9rem,4.2vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.03em]"
              >
                Questions,{" "}
                <span className="box-decoration-clone rounded-lg bg-hivis px-[0.2em] text-steel">
                  answered
                </span>
                .
              </h2>
              <p className="mt-6 max-w-[40ch] text-base leading-relaxed text-girder md:text-lg">
                Can&apos;t find what you are looking for? Call us and we will
                help.
              </p>
              <a
                href={`tel:${contact.phoneHref}`}
                className="mt-6 inline-flex min-h-12 items-center rounded-full bg-hivis px-6 font-semibold text-steel transition-colors duration-300 ease-course hover:bg-hivis-deep"
              >
                Call {contact.phone}
              </a>
            </motion.div>

            {/* ---------------------------------------------------------
                Right: accordion
            --------------------------------------------------------- */}
            <motion.div
              custom={1}
              variants={reveal}
              {...inView}
              className="lg:col-span-8"
            >
              <ul
                role="list"
                className="border-t border-steel/15"
              >
                {faqs.map((item, index) => {
                  const open = openIndex === index;
                  const buttonId = `${uid}-q-${index}`;
                  const panelId = `${uid}-a-${index}`;

                  return (
                    <li
                      key={item.question}
                      className="border-b border-steel/15"
                    >
                      <h3>
                        <button
                          type="button"
                          id={buttonId}
                          aria-expanded={open}
                          aria-controls={panelId}
                          onClick={() => setOpenIndex(open ? null : index)}
                          className="group flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left md:py-6"
                        >
                          <span className="font-display wdth-wide text-lg font-bold leading-snug tracking-tight transition-colors duration-300 ease-course group-hover:text-hivis-deep md:text-xl">
                            {item.question}
                          </span>
                          <span
                            aria-hidden
                            className={cn(
                              "relative inline-flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ease-course md:size-11",
                              open
                                ? "border-hivis bg-hivis text-steel"
                                : "border-steel/25 text-steel group-hover:border-hivis group-hover:bg-hivis",
                            )}
                          >
                            <span className="absolute h-0.5 w-4 rounded-full bg-current" />
                            <span
                              className={cn(
                                "absolute h-0.5 w-4 rounded-full bg-current transition-transform duration-500 ease-course",
                                open ? "rotate-0" : "rotate-90",
                              )}
                            />
                          </span>
                        </button>
                      </h3>

                      {/* Answers stay in the page for search engines; the grid
                          row animates the height without removing the text. */}
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        inert={!open}
                        className={cn(
                          "grid transition-[grid-template-rows] duration-500 ease-course",
                          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                        )}
                      >
                        <div className="overflow-hidden">
                          <p className="max-w-[62ch] pb-6 text-base leading-relaxed text-girder md:pb-7 md:text-lg">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
