import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  label: string;
  /**
   * "solid": steel button for light surfaces (header)
   * "accent": hi-vis amber button, the strongest call to action
   * "inverse": amber button for the dark steel menu
   */
  tone?: "solid" | "accent" | "inverse";
  className?: string;
  onClick?: () => void;
};

const styles = {
  solid: {
    base: "bg-steel text-formwork hover:text-steel",
    fill: "bg-hivis",
    icon: "bg-hivis text-steel group-hover:bg-steel group-hover:text-hivis",
  },
  accent: {
    base: "bg-hivis text-steel hover:text-formwork",
    fill: "bg-steel",
    icon: "bg-steel text-hivis group-hover:bg-hivis group-hover:text-steel",
  },
  inverse: {
    base: "bg-hivis text-steel hover:text-steel",
    fill: "bg-formwork",
    icon: "bg-steel text-hivis",
  },
} as const;

export function QuoteButton({
  href,
  label,
  tone = "solid",
  className,
  onClick,
}: Props) {
  const style = styles[tone];
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full py-2 pl-5 pr-2 text-[0.95rem] font-semibold transition-colors duration-500 ease-course",
        style.base,
        className,
      )}
    >
      {/* fill wipes up from the bottom on hover */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 translate-y-full rounded-[inherit] transition-transform duration-500 ease-course group-hover:translate-y-0",
          style.fill,
        )}
      />
      <span className="relative">{label}</span>
      <span
        aria-hidden
        className={cn(
          "relative grid size-8 place-items-center rounded-full transition-colors duration-500 ease-course",
          style.icon,
        )}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="transition-transform duration-500 ease-course group-hover:-rotate-45"
        >
          <path
            d="M1 6h10M7 2l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      </span>
    </Link>
  );
}
