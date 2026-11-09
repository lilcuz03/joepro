// src/app/contact/page.tsx
import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { Contact } from "@/components/home/Contact";
import { ServiceArea } from "@/components/contact/ServiceArea";
import { siteConfig } from "@/config/site";

const { contact } = siteConfig;
const pageUrl = `${siteConfig.url}/contact`;
const title = "Contact Joepro Construction | Free Quotes in Durban";
const description =
  "Get a free quote from Joepro Construction in Shallcross, Durban. Call 062 990 0184, WhatsApp or send a request online for brickwork, roofing, paving and more.";

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

// Structured data: the page type, where it sits in the site, and how to
// reach the business. Keep these details identical to the LocalBusiness
// block in layout.tsx.
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
        { "@type": "ListItem", position: 2, name: "Contact", item: pageUrl },
      ],
    },
    {
      "@type": "ContactPage",
      name: title,
      url: pageUrl,
      mainEntity: {
        "@type": "GeneralContractor",
        name: siteConfig.name,
        url: siteConfig.url,
        telephone: `+${contact.phoneHref.replace(/^\+/, "")}`,
        email: contact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.streetAddress,
          addressLocality: contact.city,
          addressRegion: contact.province,
          addressCountry: contact.country,
        },
        areaServed: { "@type": "City", name: "Durban" },
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ContactHero />
      <Contact />
      <ServiceArea />
    </>
  );
}
