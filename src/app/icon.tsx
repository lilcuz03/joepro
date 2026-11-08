import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";
import { siteConfig } from "@/config/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brand.hivis,
          color: brand.steel,
          fontSize: 32,
          fontWeight: 800,
          borderRadius: 14,
        }}
      >
        {siteConfig.initials}
      </div>
    ),
    size,
  );
}
