// src/components/header/Header.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { siteConfig } from "@/config/site";
import { getLenis } from "@/lib/lenis";
import { DURATION, EASE_COURSE } from "@/lib/motion";
import { cn, isActivePath } from "@/lib/utils";
import { Logo } from "./Logo";
import { MenuButton } from "./MenuButton";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";
import { QuoteButton } from "./QuoteButton";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  // Hide on scroll down, reveal on scroll up; solid background after the top.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    if (Math.abs(latest - previous) < 4) return;
    setHidden(latest > previous && latest > 160);
  });

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((value) => !value), []);

  // New page: close the menu and make sure the header is visible.
  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  // Lock page scroll (native and Lenis) while the menu is open.
  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      root.style.overflow = "hidden";
      getLenis()?.stop();
    }
    return () => {
      root.style.overflow = "";
      getLenis()?.start();
    };
  }, [open]);

  // Close the menu if the viewport grows to the desktop layout.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = () => query.matches && setOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Keyboard: Escape closes, Tab stays inside the menu while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(
          "#menu-toggle, #mobile-menu a[href]",
        ),
      );
      if (nodes.length === 0) return;
      const index = nodes.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey && index <= 0) {
        event.preventDefault();
        nodes[nodes.length - 1].focus();
      } else if (!event.shiftKey && index === nodes.length - 1) {
        event.preventDefault();
        nodes[0].focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled && !open;

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-hivis px-5 py-2.5 text-sm font-semibold text-steel transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: "-100%" }}
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: DURATION.slow, ease: EASE_COURSE }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-course",
          open ? "text-formwork" : "text-steel",
        )}
      >
        {/* frosted bar, fades in once the page has scrolled */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 border-b border-steel/10 bg-formwork/80 backdrop-blur-xl transition-opacity duration-500 ease-course",
            solid ? "opacity-100" : "opacity-0",
          )}
        />

        {/* full width, with padding that scales per breakpoint */}
        <div
          className={cn(
            "relative grid w-full grid-cols-[1fr_auto] items-center px-4 transition-[padding] duration-500 ease-course sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-10 2xl:px-14",
            scrolled ? "py-2.5" : "py-3 sm:py-4 lg:py-5",
          )}
        >
          <Logo onClick={close} />

          <nav
            aria-label="Primary"
            className="hidden lg:block"
          >
            {/* own frosted pill so links stay readable over the hero photo;
                it melts away once the full header bar is showing */}
            <ul
              className={cn(
                "flex items-center gap-1 rounded-full border p-1.5 transition-all duration-500 ease-course xl:gap-2",
                solid
                  ? "border-transparent bg-transparent shadow-none backdrop-blur-none"
                  : "border-steel/10 bg-formwork/85 shadow-[0_6px_24px_-8px_rgba(31,39,44,0.35)] backdrop-blur-xl",
              )}
            >
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    label={item.label}
                    active={isActivePath(pathname, item.href)}
                  />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-self-end">
            <QuoteButton
              href={siteConfig.cta.href}
              label={siteConfig.cta.label}
              className="hidden lg:inline-flex"
            />
            <MenuButton
              open={open}
              onToggle={toggle}
            />
          </div>
        </div>

        {/* page progress */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-hivis"
        />
      </motion.header>

      {/* Sibling, not child: a transformed header would break position: fixed */}
      <MobileMenu
        open={open}
        onClose={close}
      />
    </>
  );
}
