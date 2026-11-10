// src/app/card/page.tsx
import type { Metadata } from "next";
import { CardPage } from "@/components/card/CardPage";
import { siteConfig } from "@/config/site";

// A utility page for the QR code on the business card. It stays out of Google
// (noindex) so it never competes with the real pages, and it is not in the
// sitemap.
export const metadata: Metadata = {
  title: "Contact card",
  description: `Call, WhatsApp, email or save the contact details for ${siteConfig.name}.`,
  robots: { index: false, follow: false },
};

export default function Card() {
  return <CardPage />;
}
