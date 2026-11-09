// src/components/header/Logo.tsx
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type Props = {
  onClick?: () => void;
  /**
   * "dark"  = dark logo, for pale backgrounds (the normal header)
   * "light" = white logo, for dark backgrounds (the open mobile menu)
   * Both are stacked and cross-fade, so switching never flickers.
   */
  tone?: "dark" | "light";
  className?: string;
};

// Files live in /public/images. Both are 800 x 164 (tagline removed for header size).
const WIDTH = 800;
const HEIGHT = 164;

const size = "h-9 w-auto sm:h-10 lg:h-11";
const fade = "transition-opacity duration-500 ease-course";

export function Logo({ onClick, tone = "dark", className }: Props) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${siteConfig.name}, home`}
      className={cn("group inline-block", className)}
    >
      <span className="relative block transition-transform duration-500 ease-course group-hover:scale-[1.03]">
        <Image
          src="/images/logo-black.png"
          alt=""
          width={WIDTH}
          height={HEIGHT}
          priority
          className={cn(
            size,
            fade,
            tone === "light" ? "opacity-0" : "opacity-100",
          )}
        />
        <Image
          src="/images/logo-black.png"
          alt=""
          width={WIDTH}
          height={HEIGHT}
          priority
          aria-hidden
          className={cn(
            "absolute inset-0",
            size,
            fade,
            tone === "light" ? "opacity-100" : "opacity-0",
          )}
        />
      </span>
    </Link>
  );
}
