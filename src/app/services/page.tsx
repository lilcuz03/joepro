// src/app/services/page.tsx
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { serviceDetails } from "@/config/service-details";
import { ServicesHero } from "@/components/Services/ServicesHero";
import { ServiceSection } from "@/components/Services/ServiceSection";
import { ServicesFaq } from "@/components/Services/ServicesFaq";
import { ServicesCta } from "@/components/Services/ServicesCta";

const pageUrl = `${siteConfig.url}/services`;
const title = "Building & Roofing Services in Durban | Joepro Construction";
const description =
  "Brickwork, roofs, paving, tiling, plumbing, carports, waterproofing, ceilings and driveways in Shallcross and Durban. Get a free quote from Joepro.";

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

// Structured data: where this page sits in the site, and the services on it.
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
        { "@type": "ListItem", position: 2, name: "Services", item: pageUrl },
      ],
    },
    {
      "@type": "ItemList",
      name: `${siteConfig.name} services`,
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.name,
          description: serviceDetails[service.slug]?.intro ?? service.summary,
          url: `${pageUrl}#${service.slug}`,
          areaServed: { "@type": "City", name: "Durban" },
          provider: {
            "@type": "GeneralContractor",
            name: siteConfig.name,
            url: siteConfig.url,
          },
        },
      })),
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <ServicesHero />

      {services.map((service, index) => (
        <ServiceSection
          key={service.slug}
          service={service}
          detail={serviceDetails[service.slug]}
          index={index}
          total={services.length}
        />
      ))}

      <ServicesFaq />
      <ServicesCta />
    </>
  );
}
