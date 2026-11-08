"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { QuoteButton } from "@/components/header/QuoteButton";
import { siteConfig } from "@/config/site";
import { DURATION, EASE_SETTLE } from "@/lib/motion";
import { BrokenHouse } from "./BrokenHouse";

export function NotFoundContent() {
  return (
    <main
      id="main"
      className="bg-glow relative flex min-h-svh items-center overflow-hidden pb-16 pt-28 md:pt-32"
    >
      <div className="container-site grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: DURATION.slow,
            ease: EASE_SETTLE,
            delay: 0.3,
          }}
          className="order-2 lg:order-1"
        >
          <h1 className="font-display wdth-wide text-[clamp(2.5rem,6.5vw,5.5rem)] font-extrabold leading-[1] tracking-tight">
            Page not found
          </h1>
          <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-girder md:text-lg">
            The page you are looking for has moved, been taken down, or never
            existed. Head back to the start, or contact us and we will point you
            in the right direction.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <QuoteButton
              href="/"
              label="Back to home"
            />
            <Link
              href={siteConfig.cta.href}
              className="group relative inline-block py-2 font-medium"
            >
              Contact us
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-0.5 bg-concrete"
              />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-hivis transition-transform duration-500 ease-course group-hover:scale-x-100"
              />
            </Link>
          </div>
        </motion.div>

        <div className="order-1 mx-auto w-full max-w-sm sm:max-w-md lg:order-2 lg:max-w-none">
          <BrokenHouse className="h-auto w-full" />
        </div>
      </div>
    </main>
  );
}
