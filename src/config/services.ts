// src/config/services.ts
// One entry per service. To add a photo later:
//   1. drop it in /public/images/services/
//   2. replace `image: null` with { src: "/images/services/brickwork.jpg", alt: "..." }
// Keep the alt text descriptive and specific (what is in the photo, where).

export type ServiceImage = { src: string; alt: string };

export type Service = {
  slug: string; // used for /services#slug anchors and schema URLs
  name: string;
  summary: string;
  image: ServiceImage | null;
};

export const services: readonly Service[] = [
  {
    slug: "brickwork",
    name: "Brickwork",
    summary:
      "Boundary walls, extensions and new builds laid straight, square and finished to last for homes and businesses across Durban.",
    image: null,
  },
  {
    slug: "roofs",
    name: "Roofs",
    summary:
      "New roofs, tile and sheet replacements and repairs, built to keep the weather out and handle Durban's rain.",
    image: null,
  },
  {
    slug: "roof-cleaning",
    name: "Roof cleaning",
    summary:
      "Moss, algae and grime removed so your roof looks fresh and lasts longer.",
    image: null,
  },
  {
    slug: "paving",
    name: "Paving",
    summary:
      "Neat, level paving for yards, walkways and entrances, properly laid and compacted.",
    image: null,
  },
  {
    slug: "tiling",
    name: "Tiling",
    summary:
      "Floor and wall tiling for kitchens, bathrooms and living areas with clean lines and tidy finishes.",
    image: null,
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    summary:
      "Repairs, fittings and installations done properly, from leaking taps to full bathroom work.",
    image: null,
  },
  {
    slug: "carports",
    name: "Carports",
    summary:
      "Sturdy carports that protect your vehicles from sun and rain, built to suit your property.",
    image: null,
  },
  {
    slug: "waterproofing",
    name: "Waterproofing",
    summary:
      "Stop damp, leaks and water damage on roofs, walls and slabs before they get expensive.",
    image: null,
  },
  {
    slug: "ceilings",
    name: "Ceilings",
    summary:
      "New ceilings and repairs for water-damaged or sagging boards, finished neat and ready to paint.",
    image: null,
  },
  {
    slug: "driveways",
    name: "Driveways",
    summary:
      "Durable driveways built on a solid base so they stay level and drain well.",
    image: null,
  },
] as const;
