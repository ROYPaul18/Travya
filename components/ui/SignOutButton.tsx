"use client";

import { useRouter } from "next/navigation";
import { signOutAction } from "@/lib/signout";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface SignOutButtonProps {
  label: string;
  className?: string;
}

export function SignOutButton({ label, className }: SignOutButtonProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutAction();
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className={cn(
        "flex items-center gap-4 w-full px-0 py-2 text-left group transition-all duration-300",
        className
      )}
    > 
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 group-hover:text-red-400 transition-colors">
        {label}
      </span>
    </button>
  );
}