// src/components/header/NavLink.tsx
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  label: string;
  active?: boolean;
};

export function NavLink({ href, label, active = false }: NavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative inline-flex items-center rounded-full px-4 py-2 text-[0.95rem] font-medium leading-none transition-colors duration-300 ease-course xl:px-5",
        active
          ? "bg-steel text-formwork hover:bg-hivis hover:text-steel"
          : "text-steel hover:bg-hivis hover:text-steel",
      )}
    >
      {label}
    </Link>
  );
}
