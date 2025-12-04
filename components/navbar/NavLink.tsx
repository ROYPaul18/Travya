"use client";

import { Link } from "@/components/Link";
import { usePathname } from "next/navigation";

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 transition-colors duration-300 text-neutral-500 hover:text-green-950
        ${active ? "underline underline-offset-4 decoration-green-95 text-green-950" : ""}
      `}
    >
      {children}
    </Link>
  );
}
