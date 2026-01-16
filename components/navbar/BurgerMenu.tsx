"use client";

import React, { useState } from "react";
import { LocaleSwitcher } from "../ui/LocaleSwitcher";
import { Menu, X, Compass, Globe, MapPin, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "@/components/Link";
import { SignOutButton } from "../ui/SignOutButton";
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  weight: ['400'],
  subsets: ['latin'],
  style: ["italic"]
});

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

  return (
    <>
      {/* Burger Button - Plus discret */}
      <button
        onClick={toggleMenu}
        className="p-2 text-black transition-opacity hover:opacity-60 relative z-50"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
      </button>

      {/* Overlay - Blanc pur ou très léger flou */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/60 backdrop-blur-md z-40 transition-opacity"
          onClick={closeMenu}
        />
      )}

      {/* Slide-in Menu - Plein écran ou largeur max pour l'élégance */}
      <div
        className={`fixed top-0 right-0 h-full w-[100vw] sm:w-[400px] bg-white z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full px-8 pt-24 pb-12">
          
          {/* User Info - Style "Profil de magazine" */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16 rounded-none border border-neutral-100">
                <AvatarImage src={user.image || undefined} className="object-cover" />
                <AvatarFallback className="bg-neutral-50 text-black text-xs font-bold uppercase tracking-widest">
                  {user.name?.[0] || user.email?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className={`${cormorant.className} text-3xl italic text-gray-900`}>
                  {user.name || "Voyageur"}
                </span>
                <Link 
                  href="/profile" 
                  onClick={closeMenu}
                  className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors"
                >
                  Modifier Profil
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation - Liens larges et aérés */}
          <nav className="flex-1 space-y-8">
            <Link href="/trips" onClick={closeMenu} className="group block">
              <div className="flex items-center justify-between">
                <span className={`${cormorant.className} text-4xl italic group-hover:pl-4 transition-all duration-300`}>
                  {nav.myTrips}
                </span>
                
              </div>
            </Link>

            <Link href="/explore" onClick={closeMenu} className="group block">
              <div className="flex items-center justify-between">
                <span className={`${cormorant.className} text-4xl italic group-hover:pl-4 transition-all duration-300`}>
                  Explorer
                </span>
                
              </div>
            </Link>

            <Link href="/globe" onClick={closeMenu} className="group block">
              <div className="flex items-center justify-between">
                <span className={`${cormorant.className} text-4xl italic group-hover:pl-4 transition-all duration-300`}>
                  {nav.globe}
                </span>
               
              </div>
            </Link>
          </nav>

          {/* Footer - Informations secondaires */}
          <div className="pt-12 border-t border-gray-100 space-y-8">
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300">Langue</span>
              <div className="flex justify-start -ml-2">
                <LocaleSwitcher />
              </div>
            </div>

            <div className="pt-4">
              <SignOutButton 
                label={"Déconnexion"} 
                
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};