// src/config/socials.ts
//
// Social profiles and the Google review link. Add each link below when the
// profile is ready. Anything with an empty `href` is hidden everywhere, so a
// half-finished profile never shows up on the site.
//
// Only add profiles that are active and up to date: an abandoned page makes a
// business look closed.

export type Social = {
  name: string;
  /** What people see, e.g. "@joepro" */
  handle: string;
  /** Full link, e.g. "https://www.instagram.com/joepro" */
  href: string;
};

// Paste each link into `href` and the name people see into `handle`.
// Leave `href` empty and that row stays hidden.
export const socials: Social[] = [
  // e.g. { name: "Facebook", handle: "Joepro Construction", href: "https://www.facebook.com/..." }
  { name: "Facebook", handle: "", href: "" },
  // e.g. { name: "Instagram", handle: "@joepro", href: "https://www.instagram.com/..." }
  { name: "Instagram", handle: "", href: "" },
  // e.g. { name: "TikTok", handle: "@joepro", href: "https://www.tiktok.com/@..." }
  { name: "TikTok", handle: "", href: "" },
];

// Google Business Profile -> "Ask for reviews" -> copy the link.
// Reviews are one of the strongest local-ranking signals.
export const googleReviewUrl = "";

export const activeSocials = socials.filter(
  (social) => social.href.trim() !== "",
);
