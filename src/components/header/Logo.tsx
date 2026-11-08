import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${siteConfig.name}, home`}
      className="group inline-flex items-center gap-3"
    >
      <span
        aria-hidden
        className="font-display wdth-wide grid size-10 place-items-center rounded-[0.55rem] bg-hivis text-[0.95rem] font-extrabold tracking-tight text-steel transition-all duration-500 ease-course group-hover:-rotate-6 group-hover:scale-105"
      >
        {siteConfig.initials}
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display wdth-wide text-[1.05rem] font-extrabold tracking-tight">
          {siteConfig.shortName}
        </span>
        <span className="mt-1 text-[0.8rem] font-medium opacity-60">
          Construction
        </span>
      </span>
    </Link>
  );
}
