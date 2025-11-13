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
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LogOut, User2 } from "lucide-react";
import { useIntlayer } from "next-intlayer/server";

export const AuthButton = async ({ locale }: { locale: string }) => {
  const content = useIntlayer("auth-button", locale);
  const user = await getUser();

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/auth/signup"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium px-4 py-2 rounded-xl transition-all shadow-sm"
        >
          {content.signUp}
        </Link>

        <Link
          href="/auth/signin"
          className="flex items-center gap-2 bg-white/10 hover:bg-blue-500/20 text-blue-100 border border-blue-400/20 px-4 py-2 rounded-xl font-medium transition-all"
        >
          {content.signIn}
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 bg-blue-500/10 hover:!bg-blue-500/20 border border-blue-400/30 text-blue-100 rounded-md transition-all"
        >
          <Avatar className="h-8 w-8">
            {user.image ? (
              <AvatarImage src={user.image} alt={user.name ?? "User"} />
            ) : (
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                {user.email[0]?.toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <span className="font-medium text-sm">{user.name}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="max-w-44 bg-slate-900/95 border border-blue-400/30 text-blue-100 shadow-lg backdrop-blur-sm"
      >
        <DropdownMenuItem
          asChild
          className="cursor-pointer transition-all duration-200 rounded-lg hover:!bg-blue-500/20"
        >
          <Link href="/profile" className="flex items-center gap-2 w-full px-1">
            <User2 className="h-4 w-4 text-cyan-400" />
            <span className="text-blue-100">{content.profile}</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-blue-400/20" />

        <DropdownMenuItem asChild className="mx-1 my-1 cursor-pointer transition-all duration-200 rounded-lg hover:!bg-red-500/20">
          <form>
            <button
              className="flex items-center gap-2 w-full text-left px-1 text-red-400 hover:!text-red-300 transition-all duration-200 rounded-md"
              formAction={async () => {
                "use server";
                await auth.api.signOut({
                  headers: await headers(),
                });
                redirect("/");
              }}
            >
              <LogOut className="h-4 w-4 text-red-400" />
              <span>{content.logout}</span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
