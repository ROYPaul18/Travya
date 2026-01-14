"use client";

import { Link } from "@/components/Link";
import { usePathname } from "next/navigation";

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 transition-colors duration-300 text-black hover:text-green-950 uppercase font-button  
        ${active ? "decoration-green-95 text-green-950" : ""}
      `}
    >
      {children}
    </Link>
  );
}