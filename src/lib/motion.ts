// Shared animation tokens so every component moves the same way.
// The CSS equivalents live in globals.css (--ease-course, --ease-settle).

export const EASE_COURSE = [0.76, 0, 0.24, 1] as const;
export const EASE_SETTLE = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
  reveal: 1.1,
} as const;
