// src/components/home/Projects.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion, type Variants } from "motion/react";
import { QuoteButton } from "@/components/header/QuoteButton";
import { siteConfig } from "@/config/site";
import { projects } from "@/config/projects";
import { DURATION, EASE_SETTLE } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Placeholder gradients, cycled across the cards. They only show while a
// project has no photo. Lighter than the section so the cards stand out.
const TONES = [
  "bg-[radial-gradient(80%_70%_at_85%_8%,color-mix(in_oklab,var(--color-hivis)_40%,transparent),transparent_70%),linear-gradient(160deg,var(--color-girder),color-mix(in_oklab,var(--color-steel)_85%,var(--color-girder)))]",
  "bg-[linear-gradient(135deg,var(--color-girder)_0%,color-mix(in_oklab,var(--color-steel)_80%,var(--color-girder))_100%)]",
  "bg-[radial-gradient(70%_60%_at_10%_95%,color-mix(in_oklab,var(--color-hivis)_32%,transparent),transparent_70%),linear-gradient(135deg,color-mix(in_oklab,var(--color-steel)_75%,var(--color-girder)),var(--color-girder))]",
] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE_SETTLE,
      delay: (i % 3) * 0.08,
    },
  }),
};

// Structured data only for projects that have a real photo, so placeholder
// content never reaches search engines. It switches on by itself as you add
// photos.
const real = projects.filter((project) => project.image);
const jsonLd =
  real.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${siteConfig.name} recent projects`,
        itemListElement: real.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "ImageObject",
            name: project.title,
            caption: `${project.title} in ${project.location}`,
            contentUrl: `${siteConfig.url}${project.image!.src}`,
            url: `${siteConfig.url}/projects#${project.slug}`,
          },
        })),
      }
    : null;

export function Projects() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="bg-steel-gradient relative isolate scroll-mt-24 overflow-hidden py-20 text-formwork md:py-28 lg:py-32"
      >
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
            }}
          />
        )}

        {/* Same horizontal padding scale as the header, hero and other sections */}
        <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
          {/* ---------------------------------------------------------
              Heading
          --------------------------------------------------------- */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-8">
              <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-formwork/70 sm:text-sm">
                <span
                  aria-hidden
                  className="h-0.5 w-8 shrink-0 bg-hivis"
                />
                Our projects
              </p>
              <h2
                id="projects-heading"
                className="font-display wdth-wide text-[clamp(1.9rem,4.6vw,4.5rem)] font-extrabold leading-[1.04] tracking-[-0.03em]"
              >
                Recent{" "}
                <span className="box-decoration-clone rounded-lg bg-hivis px-[0.2em] text-steel">
                  work
                </span>{" "}
                across Shallcross and Durban.
              </h2>
            </div>

            <div className="lg:col-span-4 lg:justify-self-end">
              <p className="max-w-[46ch] text-base leading-relaxed text-formwork/75 md:text-lg">
                A look at roofs, brickwork, paving and more, built and finished
                for homes and businesses around Durban.
              </p>
              <Link
                href="/projects"
                className="group mt-5 inline-flex items-center gap-2 py-2 font-semibold"
              >
                <span className="relative">
                  View all projects
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

          {/* ---------------------------------------------------------
              Grid: 1 col on phones, 2 on tablets, 7+5 then 4+4+4 from lg
          --------------------------------------------------------- */}
          <ul
            role="list"
            className="mt-12 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 md:mt-16 md:gap-x-5 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-12"
          >
            {projects.map((project, i) => {
              const feature = i < 2;
              return (
                <motion.li
                  key={project.slug}
                  id={project.slug}
                  custom={i}
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                  className={cn(
                    "group relative scroll-mt-24",
                    i === 0 && "lg:col-span-7",
                    i === 1 && "lg:col-span-5",
                    i > 1 && "lg:col-span-4",
                  )}
                >
                  {/* photo (gradient until a real one is added) */}
                  <div
                    className={cn(
                      "relative isolate aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-auto",
                      feature ? "lg:h-[28rem]" : "lg:h-[19rem]",
                    )}
                  >
                    <div
                      aria-hidden={project.image ? undefined : true}
                      className={cn(
                        "absolute inset-0 transition-transform duration-700 ease-settle group-hover:scale-105",
                        !project.image && TONES[i % TONES.length],
                      )}
                    >
                      {project.image && (
                        <Image
                          src={project.image.src}
                          alt={project.image.alt}
                          fill
                          sizes={
                            i === 0
                              ? "(min-width: 1024px) 58vw, (min-width: 640px) 50vw, 100vw"
                              : feature
                                ? "(min-width: 1024px) 42vw, (min-width: 640px) 50vw, 100vw"
                                : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          }
                          className="object-cover"
                        />
                      )}
                    </div>

                    {/* blueprint grid + big number: placeholders only */}
                    {!project.image && (
                      <>
                        <div
                          aria-hidden
                          className="absolute inset-0 [background-image:linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:36px_36px]"
                        />
                        <span
                          aria-hidden
                          className="font-display wdth-wide absolute bottom-3 right-5 text-[clamp(4rem,9vw,8rem)] font-extrabold leading-none tracking-tighter text-formwork/10"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </>
                    )}

                    {/* category chip */}
                    <span className="absolute left-4 top-4 rounded-full bg-steel/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-formwork backdrop-blur-sm sm:left-5 sm:top-5">
                      {project.category}
                    </span>
                  </div>

                  {/* caption sits below the photo, so text never fights it */}
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display wdth-wide text-xl font-extrabold leading-tight tracking-tight transition-colors duration-300 ease-course group-hover:text-hivis md:text-2xl">
                        {/* stretched link: the whole card is clickable */}
                        <Link
                          href={`/projects#${project.slug}`}
                          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                        >
                          {project.title}
                          <span className="sr-only">
                            , {project.category.toLowerCase()} project
                          </span>
                        </Link>
                      </h3>
                      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-formwork/65 md:text-base">
                        <svg
                          aria-hidden
                          viewBox="0 0 24 24"
                          className="size-4 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                        </svg>
                        {project.location}
                      </p>
                    </div>

                    {/* outline at rest, amber fill on hover */}
                    <span
                      aria-hidden
                      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-formwork/35 text-formwork transition-colors duration-300 ease-course group-hover:border-hivis group-hover:bg-hivis group-hover:text-steel"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="size-4 -rotate-45 transition-transform duration-500 ease-settle group-hover:rotate-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>

                  {/* focus ring on the whole card */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-2 rounded-[2rem] ring-hivis group-focus-within:ring-2"
                  />
                </motion.li>
              );
            })}
          </ul>

          {/* ---------------------------------------------------------
              Closing action
          --------------------------------------------------------- */}
          <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-formwork/15 pt-8 md:mt-20 md:flex-row md:items-center">
            <p className="font-display wdth-wide max-w-[28ch] text-xl font-extrabold leading-snug tracking-tight md:text-3xl">
              Have a job in mind? Let&apos;s talk about it.
            </p>
            <QuoteButton
              href={siteConfig.cta.href}
              label="Get a free quote"
              tone="accent"
            />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
