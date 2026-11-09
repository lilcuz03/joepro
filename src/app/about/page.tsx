// src/app/about/page.tsx
import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutValues } from "@/components/about/AboutValues";
import { ServicesCta } from "@/components/Services/ServicesCta";
import { siteConfig } from "@/config/site";

const pageUrl = `${siteConfig.url}/about`;
const title = "About Joepro Construction | Builders in Shallcross, Durban";
const description =
  "Joepro Construction is a building and roofing contractor in Shallcross, Durban, with 5+ years in the industry. Meet the team behind the brickwork, roofs, paving and more.";

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
  twitter: { card: "summary_large_image", title, description },
};

// Structured data: where this page sits in the site, and who it is about.
// The full business details (address, phone, postal code) live in one
// block in layout.tsx, so they are not repeated here.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        { "@type": "ListItem", position: 2, name: "About", item: pageUrl },
      ],
    },
    {
      "@type": "AboutPage",
      name: title,
      url: pageUrl,
      about: {
        "@type": "GeneralContractor",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <ServicesCta />
    </>
  );
}
