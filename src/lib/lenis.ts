import type Lenis from "lenis";

// Lets any component pause/resume smooth scrolling (e.g. while a menu is open).
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
