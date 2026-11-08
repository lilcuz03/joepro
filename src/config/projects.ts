// src/config/projects.ts
// PLACEHOLDER CONTENT: replace every entry with a real job before launch.
// To add a photo:
//   1. drop it in /public/images/projects/
//   2. replace `image: null` with { src: "/images/projects/name.jpg", alt: "..." }
// Alt text should say what is in the photo and where, e.g.
// "New clay tile roof on a home in Shallcross, Durban".

export type ProjectImage = { src: string; alt: string };

export type Project = {
  slug: string;
  title: string;
  category: string; // matches a service name
  location: string;
  image: ProjectImage | null;
};

export const projects: readonly Project[] = [
  {
    slug: "tile-roof-replacement",
    title: "Tile roof replacement",
    category: "Roofs",
    location: "Shallcross, Durban",
    image: null,
  },
  {
    slug: "boundary-wall",
    title: "Boundary wall and brickwork",
    category: "Brickwork",
    location: "Durban",
    image: null,
  },
  {
    slug: "paved-driveway",
    title: "Paved driveway",
    category: "Driveways",
    location: "Durban",
    image: null,
  },
  {
    slug: "bathroom-tiling",
    title: "Bathroom tiling",
    category: "Tiling",
    location: "Durban",
    image: null,
  },
  {
    slug: "flat-roof-waterproofing",
    title: "Flat roof waterproofing",
    category: "Waterproofing",
    location: "Durban",
    image: null,
  },
  {
    slug: "carport-build",
    title: "Carport build",
    category: "Carports",
    location: "Durban",
    image: null,
  },
] as const;
