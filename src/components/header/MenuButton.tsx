"use client";

import { motion } from "motion/react";
import { EASE_COURSE } from "@/lib/motion";

type Props = { open: boolean; onToggle: () => void };

const transition = { duration: 0.5, ease: EASE_COURSE };

export function MenuButton({ open, onToggle }: Props) {
  return (
    <button
      id="menu-toggle"
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? "Close menu" : "Open menu"}
      className="relative grid size-11 place-items-center rounded-full lg:hidden"
    >
      <motion.span
        aria-hidden
        className="absolute block h-0.5 w-6 rounded-full bg-current"
        animate={{ y: open ? 0 : -4, rotate: open ? 45 : 0 }}
        transition={transition}
      />
      <motion.span
        aria-hidden
        className="absolute block h-0.5 rounded-full bg-current"
        animate={{
          y: open ? 0 : 4,
          rotate: open ? -45 : 0,
          width: open ? 24 : 15,
          x: open ? 0 : 4.5,
        }}
        transition={transition}
      />
    </button>
  );
}
