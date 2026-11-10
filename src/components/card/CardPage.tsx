// src/components/card/CardPage.tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MotionConfig,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "motion/react";
import { siteConfig } from "@/config/site";
import { activeSocials, googleReviewUrl } from "@/config/socials";
import { EASE_SETTLE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const { contact } = siteConfig;

const address = `${contact.streetAddress}, ${contact.city}`;
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${siteConfig.name}, ${address}`,
)}`;
const whatsappHref = `https://wa.me/${contact.phoneHref.replace(/\D/g, "")}?text=${encodeURIComponent(
  `Hi ${siteConfig.shortName}, I got your card and I'd like a quote please.`,
)}`;

const icons = {
  phone:
    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
  chat: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6",
  pin: "M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  download: "M12 3v12M7 10l5 5 5-5M5 21h14",
  arrow: "M7 17 17 7M8 7h9v9",
} as const;

const tiles: {
  label: string;
  value: string;
  href: string;
  icon: string;
  external?: boolean;
}[] = [
  {
    label: "Call",
    value: contact.phone,
    href: `tel:${contact.phoneHref}`,
    icon: icons.phone,
  },
  {
    label: "WhatsApp",
    value: "Message us",
    href: whatsappHref,
    icon: icons.chat,
    external: true,
  },
  {
    label: "Email",
    value: "Send an email",
    href: `mailto:${contact.email}`,
    icon: icons.mail,
  },
  {
    label: "Directions",
    value: contact.region,
    href: mapsHref,
    icon: icons.pin,
    external: true,
  },
];

/* ---------------------------------------------------------------------------
   The scan: one orange beam sweeps down the page (SCAN_DURATION seconds), and
   every <Reveal> block appears at the moment the beam reaches it. The timing
   is measured from the block's real position, so it stays in sync at any
   screen size, and with or without socials.
--------------------------------------------------------------------------- */
const SCAN_DELAY = 0.3;
const SCAN_DURATION = 1.6;

function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [delay, setDelay] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    const scan = el?.closest<HTMLElement>("[data-scan]");
    if (!el || !scan) {
      setDelay(0);
      return;
    }
    const fraction =
      (el.getBoundingClientRect().top - scan.getBoundingClientRect().top) /
      Math.max(scan.offsetHeight, 1);
    const clamped = Math.min(Math.max(fraction, 0), 1);
    setDelay(Math.max(0, SCAN_DELAY + clamped * SCAN_DURATION - 0.08));
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 28, filter: "blur(10px)" }}
      animate={
        delay === null
          ? undefined
          : {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.95, ease: EASE_SETTLE, delay },
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Icon({ path, className }: { path: string; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={cn("size-5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}

function Tile({ label, value, href, icon, external }: (typeof tiles)[number]) {
  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group relative flex min-h-36 w-full flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-formwork/15 bg-formwork/[0.05] p-4 backdrop-blur-sm transition-colors duration-500 ease-course hover:border-hivis focus-visible:border-hivis sm:p-5"
    >
      {/* orange fill rises from the bottom on hover / focus */}
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 bg-hivis transition-transform duration-500 ease-course group-hover:scale-y-100 group-focus-visible:scale-y-100"
      />
      <span className="relative inline-flex size-11 items-center justify-center rounded-full bg-hivis text-steel transition-colors duration-500 ease-course group-hover:bg-steel group-hover:text-hivis group-focus-visible:bg-steel group-focus-visible:text-hivis">
        <Icon path={icon} />
      </span>
      <span className="relative block min-w-0">
        <span className="font-display wdth-wide block text-xl font-extrabold leading-none tracking-tight transition-colors duration-500 ease-course group-hover:text-steel group-focus-visible:text-steel">
          {label}
        </span>
        <span className="mt-2 block text-sm leading-snug text-formwork/65 transition-colors duration-500 ease-course group-hover:text-steel/80 group-focus-visible:text-steel/80">
          {value}
        </span>
      </span>
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </motion.a>
  );
}

const starsParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const star: Variants = {
  hidden: { scale: 0, rotate: -40, opacity: 0 },
  show: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 320, damping: 11 },
  },
};

export function CardPage() {
  // Pointer-following glow: the orange light behind the page chases your
  // finger or cursor with a soft spring.
  const px = useMotionValue(220);
  const py = useMotionValue(240);
  const sx = useSpring(px, { stiffness: 80, damping: 20 });
  const sy = useSpring(py, { stiffness: 80, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${sx}px ${sy}px, color-mix(in oklab, var(--color-hivis) 24%, transparent), transparent 70%)`;
  const reduce = useReducedMotion();

  useEffect(() => {
    px.set(window.innerWidth * 0.7);
    py.set(window.innerHeight * 0.3);
    const move = (event: PointerEvent) => {
      px.set(event.clientX);
      py.set(event.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [px, py]);

  return (
    <MotionConfig reducedMotion="user">
      {/* The layout already provides <main id="main">, so this is a div */}
      <div className="bg-steel-gradient relative isolate min-h-svh overflow-hidden text-formwork">
        {/* ---------------- background ---------------- */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          {/* blueprint grid, fading out downwards */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, color-mix(in oklab, var(--color-formwork) 7%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--color-formwork) 7%, transparent) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage:
                "radial-gradient(ellipse 85% 65% at 50% 0%, black, transparent)",
              WebkitMaskImage:
                "radial-gradient(ellipse 85% 65% at 50% 0%, black, transparent)",
            }}
          />
          {/* two slow drifting glows */}
          <motion.div
            animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-[25%] -top-[8%] size-[min(34rem,95vw)] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklab, var(--color-hivis) 30%, transparent), transparent)",
            }}
          />
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-[15%] -left-[25%] size-[min(30rem,90vw)] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklab, var(--color-formwork) 9%, transparent), transparent)",
            }}
          />
          {/* the light that follows the pointer */}
          <motion.div
            className="absolute inset-0"
            style={{ background: spotlight }}
          />
        </div>

        {/* ---------------- content ---------------- */}
        <div
          data-scan
          className="relative"
        >
          {/* the scanning beam */}
          {!reduce && (
            <motion.div
              aria-hidden
              initial={{ top: "0%", opacity: 0 }}
              animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
              transition={{
                delay: SCAN_DELAY,
                duration: SCAN_DURATION,
                ease: "linear",
                opacity: {
                  delay: SCAN_DELAY,
                  duration: SCAN_DURATION,
                  times: [0, 0.06, 0.92, 1],
                },
              }}
              className="pointer-events-none absolute inset-x-0 z-10 h-0.5 bg-gradient-to-r from-transparent via-hivis to-transparent"
              style={{
                boxShadow:
                  "0 0 28px 6px color-mix(in oklab, var(--color-hivis) 65%, transparent)",
              }}
            />
          )}

          <div className="mx-auto flex w-full max-w-[30rem] flex-col gap-5 px-5 pb-12 pt-10 sm:pt-16">
            <Reveal>
              <Image
                src="/images/logo-light.png"
                alt={siteConfig.name}
                width={800}
                height={164}
                priority
                className="h-10 w-auto sm:h-12"
              />
            </Reveal>

            <Reveal className="mt-4">
              <h1 className="font-display wdth-wide text-[clamp(2.2rem,10.5vw,3.25rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
                {siteConfig.tagline}
              </h1>
              <p className="mt-4 max-w-[34ch] text-base leading-relaxed text-formwork/70">
                Tap below to call, message or save our number.
              </p>
            </Reveal>

            {/* Save contact: the main action */}
            <Reveal className="mt-2">
              <motion.a
                href="/card/contact.vcf"
                download="joepro-construction.vcf"
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="group relative flex min-h-[4.75rem] items-center justify-between gap-4 overflow-hidden rounded-3xl bg-hivis px-5 py-4 text-steel transition-colors duration-300 ease-course hover:bg-hivis-deep"
              >
                <span>
                  <span className="font-display wdth-wide block text-xl font-extrabold leading-tight tracking-tight">
                    Save our contact
                  </span>
                  <span className="mt-0.5 block text-sm text-steel/80">
                    Add us to your phone in one tap
                  </span>
                </span>
                <span
                  aria-hidden
                  className="relative inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-steel text-hivis"
                >
                  <Icon
                    path={icons.download}
                    className="transition-transform duration-500 ease-settle group-hover:translate-y-0.5"
                  />
                </span>
                {/* a light glint crosses the button every few seconds */}
                <motion.span
                  aria-hidden
                  initial={{ x: "0%" }}
                  animate={{ x: "480%" }}
                  transition={{
                    duration: 1.3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 3.4,
                    delay: 2.6,
                  }}
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </motion.a>
            </Reveal>

            {/* Four quick actions */}
            <Reveal>
              <ul
                role="list"
                className="grid grid-cols-2 gap-3"
              >
                {tiles.map((tile) => (
                  <li
                    key={tile.label}
                    className="flex"
                  >
                    <Tile {...tile} />
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Quote */}
            <Reveal>
              <Link
                href="/contact"
                className="group relative flex min-h-16 items-center justify-between gap-4 overflow-hidden rounded-3xl border border-formwork/25 px-5 font-semibold transition-colors duration-500 ease-course hover:border-formwork focus-visible:border-formwork"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 bg-formwork transition-transform duration-500 ease-course group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <span className="font-display wdth-wide relative text-lg font-extrabold tracking-tight transition-colors duration-500 ease-course group-hover:text-steel group-focus-visible:text-steel">
                  Get a free quote
                </span>
                <Icon
                  path={icons.arrow}
                  className="relative size-5 transition-all duration-500 ease-course group-hover:rotate-45 group-hover:text-steel group-focus-visible:text-steel"
                />
              </Link>
            </Reveal>

            {/* Socials: hidden until real links are added in config/socials.ts */}
            {activeSocials.length > 0 && (
              <Reveal className="mt-3">
                <p className="mb-3 text-sm text-formwork/60">Follow our work</p>
                <ul
                  role="list"
                  className="border-t border-formwork/15"
                >
                  {activeSocials.map((social) => (
                    <li key={social.name}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-between gap-4 overflow-hidden border-b border-formwork/15 px-1 py-4"
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 origin-left scale-x-0 bg-hivis transition-transform duration-500 ease-course group-hover:scale-x-100 group-focus-visible:scale-x-100"
                        />
                        <span className="font-display wdth-wide relative text-2xl font-extrabold tracking-tight transition-all duration-500 ease-course group-hover:translate-x-2 group-hover:text-steel group-focus-visible:translate-x-2 group-focus-visible:text-steel">
                          {social.name}
                        </span>
                        <span className="relative flex items-center gap-3 text-sm text-formwork/60 transition-colors duration-500 ease-course group-hover:text-steel group-focus-visible:text-steel">
                          {social.handle}
                          <Icon
                            path={icons.arrow}
                            className="size-4 transition-transform duration-500 ease-course group-hover:rotate-45"
                          />
                        </span>
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {/* Google review: hidden until the link is added in config/socials.ts */}
            {googleReviewUrl && (
              <Reveal>
                <motion.a
                  href={googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center justify-between gap-4 rounded-3xl border border-hivis/60 bg-hivis/10 px-5 py-4 transition-colors duration-300 ease-course hover:bg-hivis/20"
                >
                  <span>
                    <span className="font-display wdth-wide block text-lg font-extrabold tracking-tight">
                      Happy with our work?
                    </span>
                    <span className="mt-0.5 block text-sm text-formwork/70">
                      Leave us a Google review
                    </span>
                  </span>
                  <motion.span
                    variants={starsParent}
                    aria-hidden
                    className="flex gap-0.5 text-hivis"
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <motion.svg
                        key={n}
                        variants={star}
                        viewBox="0 0 24 24"
                        className="size-5"
                        fill="currentColor"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </motion.svg>
                    ))}
                  </motion.span>
                  <span className="sr-only">(opens in a new tab)</span>
                </motion.a>
              </Reveal>
            )}

            <Reveal className="mt-4 flex items-center justify-between gap-4 text-sm text-formwork/55">
              <Link
                href="/"
                className="group relative inline-block py-1 font-medium text-formwork/80 transition-colors duration-300 ease-course hover:text-hivis"
              >
                Visit our website
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-hivis transition-transform duration-500 ease-course group-hover:scale-x-100"
                />
              </Link>
              <p>
                &copy; {new Date().getFullYear()} {siteConfig.name}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
