"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { siteConfig } from "@/config/site";
import { DURATION, EASE_COURSE, EASE_SETTLE } from "@/lib/motion";
import { isActivePath } from "@/lib/utils";
import { QuoteButton } from "./QuoteButton";

type Props = { open: boolean; onClose: () => void };

// The menu opens as a circle growing out of the top-right corner (where the
// toggle sits) and closes the same way in reverse.
const panel: Variants = {
  hidden: { clipPath: "circle(0% at 100% 0%)" },
  show: {
    clipPath: "circle(150% at 100% 0%)",
    transition: { duration: DURATION.slow, ease: EASE_COURSE },
  },
  exit: {
    clipPath: "circle(0% at 100% 0%)",
    transition: { duration: DURATION.base, ease: EASE_COURSE, delay: 0.1 },
  },
};

const link: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: {
      duration: DURATION.reveal,
      ease: EASE_SETTLE,
      delay: 0.3 + i * 0.07,
    },
  }),
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const footer: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_SETTLE, delay: 0.65 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const MotionLink = motion.create(Link);

export function MobileMenu({ open, onClose }: Props) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          variants={panel}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed inset-0 z-40 h-dvh overflow-y-auto bg-steel text-formwork lg:hidden"
        >
          <div className="container-site flex min-h-full flex-col justify-between gap-12 pb-8 pt-28">
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {siteConfig.nav.map((item, i) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <li
                      key={item.href}
                      className="overflow-hidden"
                    >
                      <MotionLink
                        custom={i}
                        variants={link}
                        href={item.href}
                        onClick={onClose}
                        ref={
                          i === 0
                            ? (el: HTMLAnchorElement | null) =>
                                el?.focus({ preventScroll: true })
                            : undefined
                        }
                        aria-current={active ? "page" : undefined}
                        className="font-display wdth-wide block py-1 text-[clamp(2.75rem,13vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight transition-colors duration-300 hover:text-hivis focus-visible:text-hivis aria-[current]:text-hivis"
                      >
                        {item.label}
                      </MotionLink>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <motion.div
              variants={footer}
              className="flex flex-col gap-8 border-t border-formwork/15 pt-6 sm:flex-row sm:items-end sm:justify-between"
            >
              <address className="flex flex-col gap-1 text-base not-italic text-formwork/75">
                <a
                  href={`tel:${siteConfig.contact.phoneHref}`}
                  className="w-fit transition-colors hover:text-hivis"
                >
                  {siteConfig.contact.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="w-fit transition-colors hover:text-hivis"
                >
                  {siteConfig.contact.email}
                </a>
                <span>{siteConfig.contact.region}</span>
              </address>
              <QuoteButton
                href={siteConfig.cta.href}
                label={siteConfig.cta.label}
                tone="inverse"
                onClick={onClose}
                className="self-start"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
