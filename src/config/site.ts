import { brand } from "./brand";

// Single source for business details, services, navigation and SEO.
// Metadata, JSON-LD, the header and the pages all read from here.
// TODO: confirm the street address wording ("Burlington Drive" or
// "Burlington Heights") and the postal code before launch.

const url = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://joeproconstruction.co.za"
    : "http://localhost:3000")
).replace(/\/$/, "");

export const siteConfig = {
  url,
  name: "Joepro Construction",
  shortName: "Joepro",
  initials: "JP",
  tagline: "Quality workmanship, built to last.",
  description:
    "Brickwork, roofing, paving, tiling, plumbing, carports, waterproofing, ceilings and driveways for homes and businesses in Shallcross and Durban.",
  keywords: [
    "builders Durban",
    "construction company Shallcross",
    "brickwork Durban",
    "roofing Durban",
    "paving and driveways Durban",
    "tiling Durban",
    "waterproofing Durban",
    "carports Durban",
    "home renovations Durban",
  ],
  locale: "en_ZA",
  language: "en-ZA",
  themeColor: brand.formwork,
  yearsInIndustry: "5+",

  contact: {
    phone: "062 990 0184",
    phoneHref: "+27629900184",
    email: "sabaujoepro@gmail.com",
    region: "Shallcross, Durban",
    streetAddress: "30 Burlington Drive, Shallcross",
    city: "Durban",
    postalCode: "4093", // verify
    province: "KwaZulu-Natal",
    country: "ZA",
  },

  services: [
    "Brickwork",
    "Roofs",
    "Roof cleaning",
    "Paving",
    "Tiling",
    "Plumbing",
    "Carports",
    "Waterproofing",
    "Ceilings",
    "Driveways",
  ],

  nav: [
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  cta: { label: "Get a quote", href: "/contact" },
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
