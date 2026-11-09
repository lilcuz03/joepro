// src/app/privacy/page.tsx
import type { Metadata } from "next";
import { PrivacyHero } from "@/components/privacy/PrivacyHero";
import { PrivacyContent } from "@/components/privacy/PrivacyContent";
import { siteConfig } from "@/config/site";

const pageUrl = `${siteConfig.url}/privacy`;
const title = "Privacy Policy | Joepro Construction";
const description =
  "How Joepro Construction collects, uses and protects your personal information when you contact us or request a quote, in line with South Africa's POPIA.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    url: pageUrl,
    title,
    description,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
  twitter: { card: "summary", title, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Privacy policy", item: pageUrl },
  ],
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PrivacyHero />
      <PrivacyContent />
    </>
  );
}
