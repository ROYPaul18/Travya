// components/navbar/MobileTabBar.tsx
"use client";

import { Link } from "@/components/Link";
import { usePathname } from "next/navigation";
import { Compass, MapPin, User, Globe, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

export const MobileTabBar = ({ nav, isAuthenticated }: { nav: any; isAuthenticated: boolean }) => {
  const pathname = usePathname();

  // Onglets pour utilisateurs connectés
  const authenticatedTabs = [
    {
      label: "Explorer",
      href: "/explore",
      icon: Compass,
    },
    {
      label: nav.myTrips,
      href: "/trips",
      icon: MapPin,
    },
    {
      label: "Globe",
      href: "/globe",
      icon: Globe,
    },
    {
      label: "Profil",
      href: "/profile",
      icon: User,
    },
  ];

  // Onglets pour utilisateurs non connectés
  const guestTabs = [
    {
      label: "Explorer",
      href: "/explore",
      icon: Compass,
    },
    {
      label: "Globe",
      href: "/globe",
      icon: Globe,
    },
    {
      label: "Connexion",
      href: "/login",
      icon: LogIn,
    },
  ];

  const tabs = isAuthenticated ? authenticatedTabs : guestTabs;

  return (
    <div 
      className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-100 px-6 pb-5 pt-4 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]"
      style={{ zIndex: 9999 }}
    >
      <div className="flex justify-between items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = pathname.includes(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center gap-1.5 transition-all duration-300 min-w-[60px]",
                isActive ? "text-black translate-y-[-2px]" : "text-gray-400"
              )}
            >
              <Icon 
                size={22} 
                strokeWidth={isActive ? 2 : 1.5} 
                className="transition-transform duration-300"
              />
              <span className="text-[8px] font-bold uppercase tracking-[0.2em]">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};