"use client";

import React, { useState } from "react";

import { LocaleSwitcher } from "../ui/LocaleSwitcher";
import { Menu, X, LogOut, User2, MapPin, Compass, Globe } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "@/components/Link";
import { SignOutButton } from "../ui/SignOutButton";

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
      {/* Burger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative z-50"
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
          onClick={closeMenu}
        />
      )}

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-light text-gray-900">Menu</h2>
            <button
              onClick={closeMenu}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-12 w-12 ring-2 ring-green-100">
                <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                <AvatarFallback className="bg-green-950 text-white text-base">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900">{user.name || "User"}</span>
                <span className="text-sm text-gray-500">{user.email}</span>
              </div>
            </div>
            <Link href="/profile" onClick={closeMenu}>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium text-gray-700">
                <User2 className="h-4 w-4" />
                Voir le profil
              </button>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-6 space-y-2">
            <Link href="/explore" onClick={closeMenu}>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                <Compass className="h-5 w-5 text-gray-600 group-hover:text-green-950" />
                <span className="text-base font-medium text-gray-900">Explorer</span>
              </div>
            </Link>

            <Link href="/trips" onClick={closeMenu}>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                <MapPin className="h-5 w-5 text-gray-600 group-hover:text-green-950" />
                <span className="text-base font-medium text-gray-900">{nav.myTrips}</span>
              </div>
            </Link>

            <Link href="/globe" onClick={closeMenu}>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                <Globe className="h-5 w-5 text-gray-600 group-hover:text-green-950" />
                <span className="text-base font-medium text-gray-900">{nav.globe}</span>
              </div>
            </Link>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Langue</span>
              <LocaleSwitcher />
            </div>

             <SignOutButton label={"content.logout"} />
          </div>
        </div>
      </div>
    </>
  );
};