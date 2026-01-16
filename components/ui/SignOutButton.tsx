"use client";

import { useRouter } from "next/navigation";
import { signOutAction } from "@/lib/signout";
import { LogOut } from "lucide-react";

export function SignOutButton({ label }: { label: string }) {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await signOutAction();
        router.refresh(); 
      }}
      className="flex items-center gap-3 w-full px-3 py-2.5 text-left"
    >
      <LogOut className="h-4 w-4 stroke-[1.5px] text-neutral-500" />
      <span className="text-xs tracking-tight text-neutral-700">
        {label}
      </span>
    </button>
  );
}
