"use client";

import React, { useState } from "react";
import { NavLink } from "./NavLink";
import { LocaleSwitcher } from "../ui/LocaleSwitcher";
import { Menu, LogOut, User2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/components/Link";

interface BurgerMenuProps {
  locale: string;
  nav: {
    myTrips: string;
    globe: string;
  };
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export const BurgerMenu = ({ locale, nav, user }: BurgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const getUserInitials = () => {
    if (user.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user.email?.[0]?.toUpperCase() || "U";
  };

  return (
    <>
      
      <button
        onClick={toggleMenu}
        className="p-2 text-neutral-950 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>
      
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-green-950">
              Menu
            </AlertDialogTitle>
            <AlertDialogDescription className="sr-only">
              Navigation menu
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Navigation links */}
          <div className="flex flex-col space-y-4 py-4">
            <div onClick={closeMenu} className="text-lg">
              <NavLink href="/explore">Explore</NavLink>
            </div>
            <div onClick={closeMenu} className="text-lg">
              <NavLink href="/trips">{nav.myTrips}</NavLink>
            </div>
            <div onClick={closeMenu} className="text-lg">
              <NavLink href="/globe">{nav.globe}</NavLink>
            </div>
          </div>

          {/* Footer avec LocaleSwitcher et User */}
          <div className="pt-4 border-t border-gray-200 space-y-4">
            <LocaleSwitcher />
            
            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                    <AvatarFallback className="bg-green-100 text-green-950">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium text-neutral-950">{user.name || "User"}</span>
                    <span className="text-xs text-neutral-500">{user.email}</span>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User2 className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form action="/api/auth/signout" method="POST" className="w-full">
                    <button type="submit" className="flex items-center w-full cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Déconnexion</span>
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};