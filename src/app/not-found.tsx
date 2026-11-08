import type { Metadata } from "next";
import { NotFoundContent } from "@/components/not-found/NotFoundContent";

// Shown for any unknown URL. Next.js serves it with a real 404 status, and the
// noindex rule keeps it out of search results.
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundContent />;
}
