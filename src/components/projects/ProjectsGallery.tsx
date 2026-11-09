// src/components/projects/ProjectsGallery.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { MotionConfig, motion, type Variants } from "motion/react";
import { projects } from "@/config/projects";
import { DURATION, EASE_SETTLE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ALL = "All";

// Placeholder gradients, cycled. They only show while a project has no
// photo. Dark enough that the number watermark and chip stay readable.
const TONES = [
  "bg-[radial-gradient(80%_70%_at_85%_8%,color-mix(in_oklab,var(--color-hivis)_45%,transparent),transparent_70%),linear-gradient(160deg,var(--color-girder),var(--color-steel))]",
  "bg-[linear-gradient(135deg,var(--color-steel)_0%,var(--color-girder)_100%)]",
  "bg-[radial-gradient(70%_60%_at_10%_95%,color-mix(in_oklab,var(--color-hivis)_35%,transparent),transparent_70%),linear-gradient(135deg,var(--color-steel),color-mix(in_oklab,var(--color-steel)_70%,var(--color-girder)))]",
  "bg-[linear-gradient(160deg,var(--color-girder)_0%,var(--color-steel)_100%)]",
] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
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

export function ProjectsGallery() {
  const [filter, setFilter] = useState<string>(ALL);

  // One chip per service category that actually has a project.
  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(projects.map((p) => p.category)))],
    [],
  );

  const visibleCount = projects.filter(
    (p) => filter === ALL || p.category === filter,
  ).length;

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="gallery-heading"
        className="bg-formwork pb-16 pt-4 md:pb-24"
      >
        {/* Same horizontal padding scale as the header and every section */}
        <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
          <h2
            id="gallery-heading"
            className="sr-only"
          >
            Project gallery
          </h2>

          {/* ---------------------------------------------------------
              Filter chips
          --------------------------------------------------------- */}
          <div className="border-b border-steel/15 pb-6">
            <p className="mb-4 text-sm font-semibold text-girder">
              Filter by service
            </p>
            <ul
              role="list"
              className="flex flex-wrap gap-2"
            >
              {categories.map((category) => {
                const active = filter === category;
                return (
                  <li key={category}>
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => setFilter(category)}
                      className={cn(
                        "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors duration-300 ease-course",
                        active
                          ? "border-steel bg-steel text-formwork"
                          : "border-steel/20 hover:border-hivis hover:bg-hivis hover:text-steel focus-visible:border-hivis focus-visible:bg-hivis",
                      )}
                    >
                      {category}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p
              role="status"
              aria-live="polite"
              className="mt-4 text-sm text-girder"
            >
              Showing {visibleCount} of {projects.length} projects
            </p>
          </div>

          {/* ---------------------------------------------------------
              Grid: 1 col on phones, 2 on tablets, 3 from lg.
              Filtered cards are only hidden, never removed from the HTML
              until a filter is chosen, so "All" shows everything to
              crawlers.
          --------------------------------------------------------- */}
          <ul
            role="list"
            className="mt-10 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 md:gap-x-5 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12"
          >
            {projects.map((project, i) => {
              const hidden = filter !== ALL && project.category !== filter;
              return (
                <motion.li
                  key={project.slug}
                  id={project.slug}
                  hidden={hidden}
                  custom={i}
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                  className="group scroll-mt-28"
                >
                  <article>
                    <div className="relative isolate aspect-[4/3] overflow-hidden rounded-3xl">
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
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
                            className="font-display wdth-wide absolute bottom-3 right-5 text-[clamp(4rem,9vw,7rem)] font-extrabold leading-none tracking-tighter text-formwork/10"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </>
                      )}

                      {/* category chip */}
                      <span className="absolute left-4 top-4 rounded-full bg-steel/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-formwork backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>

                    {/* caption sits below the photo, so text never fights it */}
                    <div className="mt-5">
                      <h3 className="font-display wdth-wide text-xl font-extrabold leading-tight tracking-tight md:text-2xl">
                        <span className="bg-gradient-to-r from-hivis to-hivis bg-[length:0%_3px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-course group-hover:bg-[length:100%_3px]">
                          {project.title}
                        </span>
                      </h3>
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-girder md:text-base">
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
                  </article>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>
    </MotionConfig>
  );
}
