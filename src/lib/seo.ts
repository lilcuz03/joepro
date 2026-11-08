import { siteConfig } from "@/config/site";

export const absoluteUrl = (path = "/") =>
  `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;

// schema.org structured data. Google uses this for local search results and
// the business panel, so keep it truthful and in sync with the site.
export function organizationJsonLd() {
  const { contact } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    image: absoluteUrl("/opengraph-image"),
    logo: absoluteUrl("/icon"),
    email: contact.email,
    telephone: `+${contact.phoneHref.replace(/^\+/, "")}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.streetAddress,
      addressLocality: contact.city,
      addressRegion: contact.province,
      addressCountry: contact.country,
    },
    areaServed: [
      { "@type": "City", name: contact.city },
      { "@type": "AdministrativeArea", name: contact.province },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction services",
      itemListElement: siteConfig.services.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: siteConfig.language,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}
