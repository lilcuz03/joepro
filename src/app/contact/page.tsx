import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// TEMPORARY: replaced by the real hero and home sections.
export default function Home() {
  return (
    <main
      id="main"
      className="container-site flex min-h-svh items-end pb-16 pt-32"
    >
      <h1 className="font-display wdth-wide max-w-[14ch] text-[clamp(2.5rem,9vw,8rem)] font-extrabold leading-[0.95] tracking-tight">
        {siteConfig.tagline}
      </h1>
    </main>
  );
}
