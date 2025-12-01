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
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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
      <div className="flex items-center gap-3 font-button">
        {/*
          BOUTON 1: INSCRIPTION (Action Primaire)
          - Style: Bleu uni (plus moderne et propre que le dégradé)
          - Taille: Légèrement plus compact (py-2, pas 2.5)
        */}
        <Link
          href="/auth/signup"
          className="flex items-center justify-center bg-gray-950 hover:bg-grey-900 text-white font-semibold px-4 py-2 text-sm rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          {content.signUp}
        </Link>

        {/*
          BOUTON 2: CONNEXION (Action Secondaire)
          - Style: Bouton "Ghost" (Fantôme) ou Lien.
          - On passe à un bouton transparent hover/border pour plus d'élégance.
        */}
        <Link
          href="/auth/signin"
          className="flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-4 py-2 text-sm rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {content.signIn}
        </Link>

        {/* Alternative pour la connexion (plus discret / lien) :
        <Link
          href="/auth/signin"
          className="text-gray-700 hover:text-gray-900 font-medium px-2 py-1 transition-colors duration-200"
        >
          {content.signIn}
        </Link>
        */}
      </div>
    );
  }
  // Reste du code (état connecté) inchangé
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2.5 bg-white hover:!bg-gray-50 border border-gray-300 text-gray-900 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md px-2 py-2 cursor-pointer"
        >
          <Avatar className="h-8 w-8">
            {user.image ? (
              <AvatarImage src={user.image} alt={user.name ?? "User"} />
            ) : (
              <AvatarFallback className="text-gray-900 font-semibold">
                {user.email[0]?.toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <span className="font-normal text-sm">{user.name}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-white border border-gray-200 shadow-xl rounded-sm overflow-hidden"
      >
        <DropdownMenuItem
          asChild
          className="cursor-pointer transition-all duration-200 hover:!bg-gray-100 focus:!bg-gray-100 rounded-sm mb-1"
        >
          <Link href="/profile" className="flex items-center gap-3 w-full px-2 py-2">
            <span className="text-gray-900 font-medium">{content.profile}</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-gray-200" />

        <DropdownMenuItem asChild className="cursor-pointer transition-all duration-200 rounded-sm   mt-1">
          <form className="px-2 py-2">
            <button
              className="flex items-center w-full text-left  text-gray-900  transition-all duration-200 font-medium"
              formAction={async () => {
                "use server";
                await auth.api.signOut({
                  headers: await headers(),
                });
                redirect("/");
              }}
            >
              <span>{content.logout}</span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};