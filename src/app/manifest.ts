import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: brand.formwork,
    theme_color: brand.formwork,
    lang: siteConfig.language,
  };
}
