import React from "react";
import { Link } from "@/components/Link";
import { getUser } from "@/lib/auth-server";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Heart, LogOut, User } from "lucide-react";
import { useIntlayer } from "next-intlayer/server";
import { LocaleModal } from "@/components/ui/LocaleModal";

export const AuthButton = async ({ locale }: { locale: string }) => {
  const content = useIntlayer("auth-button", locale);
  const user = await getUser();

  if (!user) {
    return (
      <div className="flex items-center gap-6">
        <Link
          href="/auth/signin"
          className="text-[14px]  tracking-widest font-medium text-neutral-500 hover:text-neutral-950 transition-colors duration-300"
        >
          {content.signIn}
        </Link>
        
        <Link
          href="/auth/signup"
          className="bg-neutral-950 text-white px-6 py-2.5 text-[14px]  tracking-widest font-medium hover:bg-neutral-800 transition-all duration-300"
        >
          {content.signUp}
        </Link>
      </div>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="outline-none ring-0 cursor-pointer group">
            <div className=" border border-transparent group-hover:border-neutral-200 transition-all duration-500 rounded-full">
                <Avatar className="h-9 w-9 ">
                {user.image ? (
                    <AvatarImage src={user.image} alt={user.name ?? "User"} />
                ) : (
                    <AvatarFallback className="bg-neutral-50 text-neutral-950 font-light text-xs">
                    {user.email[0]?.toUpperCase()}
                    </AvatarFallback>
                )}
                </Avatar>
            </div>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={12}
          className="bg-white border border-neutral-100 shadow-2xl shadow-neutral-200/50 rounded-none min-w-[200px]"
        >
          <div className="px-4 py-3 border-b border-neutral-50">
            <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-0.5">Compte</p>
            <p className="text-xs truncate font-medium text-neutral-950">{user.email}</p>
          </div>

          <div className="p-1">
            <DropdownMenuItem asChild className="focus:bg-neutral-50 cursor-pointer rounded-none transition-colors">
                <Link href="/profile" className="flex items-center gap-3 w-full px-3 py-2.5">
                <User className="h-4 w-4 stroke-[1.5px] text-neutral-500" />
                <span className="text-xs tracking-tight text-neutral-700">{content.profile}</span>
                </Link>
            </DropdownMenuItem>

            <LocaleModal currentLocale={locale} />

            <DropdownMenuItem asChild className="focus:bg-neutral-50 cursor-pointer rounded-none transition-colors">
                <Link href="/favorite" className="flex items-center gap-3 w-full px-3 py-2.5">
                <Heart className="h-4 w-4 stroke-[1.5px] text-neutral-500" />
                <span className="text-xs tracking-tight text-neutral-700">Favoris</span>
                </Link>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator className="bg-neutral-50 mx-1" />

          <div className="p-1">
            <DropdownMenuItem asChild className="focus:bg-neutral-50 cursor-pointer rounded-none transition-colors">
                <form 
                    className="w-full"
                    action={async () => {
                    "use server";
                    await auth.api.signOut({
                        headers: await headers(),
                    });
                    redirect("/");
                    }}
                >
                <button className="flex items-center gap-3 w-full px-3 py-2.5 text-left">
                    <LogOut className="h-4 w-4 stroke-[1.5px] text-neutral-500" />
                    <span className="text-xs tracking-tight text-neutral-700">{content.logout}</span>
                </button>
                </form>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};