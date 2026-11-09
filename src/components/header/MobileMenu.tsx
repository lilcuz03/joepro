// src/components/header/MobileMenu.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Variants,
} from "motion/react";
import { QuoteButton } from "./QuoteButton";
import { siteConfig } from "@/config/site";
import { DURATION, EASE_COURSE, EASE_SETTLE } from "@/lib/motion";
import { cn, isActivePath } from "@/lib/utils";

const { contact } = siteConfig;

type Props = {
  open: boolean;
  onClose: () => void;
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE_SETTLE,
      delay: 0.12 + i * 0.06,
    },
  }),
};

export function MobileMenu({ open, onClose }: Props) {
  const pathname = usePathname();

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_COURSE }}
            // z-[45]: above the floating WhatsApp button (z-40), below the
            // header (z-50) so the logo and close button stay visible.
            className="fixed inset-0 z-[45] bg-steel text-formwork lg:hidden"
          >
            {/* data-lenis-prevent: lets the menu scroll on short screens
                without smooth scroll hijacking it */}
            <div
              data-lenis-prevent
              className="flex h-dvh flex-col overflow-y-auto overscroll-contain px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-24 sm:px-6 sm:pt-28"
            >
              {/* -------------------------------------------------------
                  Links
              ------------------------------------------------------- */}
              <nav aria-label="Mobile">
                <ul className="border-t border-formwork/15">
                  {siteConfig.nav.map((link, i) => {
                    const active = isActivePath(pathname, link.href);
                    return (
                      <motion.li
                        key={link.href}
                        custom={i}
                        variants={item}
                        initial="hidden"
                        animate="show"
                      >
                        <Link
                          href={link.href}
                          onClick={onClose}
                          aria-current={active ? "page" : undefined}
                          className="group flex min-h-16 items-center justify-between gap-4 border-b border-formwork/15 py-3"
                        >
                          <span className="flex items-baseline gap-4">
                            <span
                              aria-hidden
                              className="font-display wdth-wide w-6 text-xs font-bold tracking-widest text-formwork/45"
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={cn(
                                "font-display wdth-wide text-[clamp(1.6rem,7vw,2.25rem)] font-extrabold leading-none tracking-tight transition-colors duration-300 ease-course group-hover:text-hivis",
                                active && "text-hivis",
                              )}
                            >
                              {link.label}
                            </span>
                          </span>
                          <span
                            aria-hidden
                            className={cn(
                              "inline-flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ease-course group-hover:border-hivis group-hover:bg-hivis group-hover:text-steel",
                              active
                                ? "border-hivis bg-hivis text-steel"
                                : "border-formwork/30",
                            )}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="size-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* -------------------------------------------------------
                  Contact + action, pushed to the bottom
              ------------------------------------------------------- */}
              <motion.div
                custom={siteConfig.nav.length}
                variants={item}
                initial="hidden"
                animate="show"
                className="mt-auto pt-10"
              >
                <ul className="space-y-1 text-base text-formwork/75">
                  <li>
                    <a
                      href={`tel:${contact.phoneHref}`}
                      className="inline-flex min-h-11 items-center font-display wdth-wide text-lg font-extrabold tracking-tight text-formwork transition-colors duration-300 ease-course hover:text-hivis"
                    >
                      {contact.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      className="inline-flex min-h-11 items-center break-all transition-colors duration-300 ease-course hover:text-hivis"
                    >
                      {contact.email}
                    </a>
                  </li>
                  <li className="flex min-h-11 items-center text-formwork/60">
                    {contact.region}
                  </li>
                </ul>

                <div className="mt-5">
                  <QuoteButton
                    href={siteConfig.cta.href}
                    label={siteConfig.cta.label}
                    tone="accent"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
