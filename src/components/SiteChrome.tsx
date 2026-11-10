// src/components/SiteChrome.tsx
"use client";

import { usePathname } from "next/navigation";

// Wrap anything that should NOT appear on the stand-alone /card page
// (header, footer, floating WhatsApp button).
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/card" || pathname.startsWith("/card/")) return null;
  return <>{children}</>;
}
