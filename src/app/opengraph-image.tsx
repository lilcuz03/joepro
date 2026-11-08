import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name}: ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social share card, generated at build time. Shows when the link is shared
// on WhatsApp, LinkedIn, X, Facebook and so on.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: brand.steel,
          color: brand.formwork,
          padding: 72,
        }}
      >
        <div
          style={{
            width: 84,
            height: 84,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: brand.hivis,
            color: brand.steel,
            fontSize: 38,
            fontWeight: 800,
            borderRadius: 14,
          }}
        >
          {siteConfig.initials}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.02 }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 38, marginTop: 22, opacity: 0.7 }}>
            {siteConfig.tagline}
          </div>
        </div>
        <div style={{ height: 10, width: 220, background: brand.hivis }} />
      </div>
    ),
    size,
  );
}
