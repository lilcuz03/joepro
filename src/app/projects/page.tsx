// src/app/projects/page.tsx
import type { Metadata } from "next";
import { ProjectsHero } from "@/components/projects/ProjectsHero";
import { ProjectsGallery } from "@/components/projects/ProjectsGallery";
import { ServicesCta } from "@/components/Services/ServicesCta";
import { siteConfig } from "@/config/site";
import { projects } from "@/config/projects";

const pageUrl = `${siteConfig.url}/projects`;
const title = "Our Projects | Joepro Construction, Shallcross & Durban";
const description =
  "See recent brickwork, roofing, paving, tiling, waterproofing and carport projects by Joepro Construction across Shallcross and Durban. Get a free quote.";

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

// Only projects with a real photo go into structured data, so placeholder
// content never reaches search engines. It switches on by itself as you add
// photos in src/config/projects.ts.
const real = projects.filter((project) => project.image);

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
        { "@type": "ListItem", position: 2, name: "Projects", item: pageUrl },
      ],
    },
    ...(real.length > 0
      ? [
          {
            "@type": "ItemList",
            name: `${siteConfig.name} projects`,
            itemListElement: real.map((project, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "ImageObject",
                name: project.title,
                caption: `${project.title} in ${project.location}`,
                contentUrl: `${siteConfig.url}${project.image!.src}`,
                url: `${pageUrl}#${project.slug}`,
              },
            })),
          },
        ]
      : []),
  ],
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProjectsHero />
      <ProjectsGallery />
      <ServicesCta />
    </>
  );
}
